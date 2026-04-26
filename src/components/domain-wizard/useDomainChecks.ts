import { useCallback, useState } from "react";
import { LOVABLE_IP } from "./registrars";

export type CheckStatus = "idle" | "checking" | "ok" | "fail";

export interface DomainCheckState {
  publish: CheckStatus;
  dnsRoot: CheckStatus;
  dnsWww: CheckStatus;
  dnsTxt: CheckStatus;
  ssl: CheckStatus;
  rootIps: string[];
  wwwIps: string[];
  txtValues: string[];
  publishedUrl?: string;
  sslUrl?: string;
  lastChecked?: number;
  error?: string;
}

const initialState: DomainCheckState = {
  publish: "idle",
  dnsRoot: "idle",
  dnsWww: "idle",
  dnsTxt: "idle",
  ssl: "idle",
  rootIps: [],
  wwwIps: [],
  txtValues: [],
};

/**
 * Resolve DNS via Cloudflare DoH (works from the browser).
 * Returns array of record values (IPs for A, strings for TXT).
 */
async function resolveDoh(name: string, type: "A" | "TXT"): Promise<string[]> {
  const res = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`,
    { headers: { Accept: "application/dns-json" } }
  );
  if (!res.ok) throw new Error(`DoH ${res.status}`);
  const data = await res.json();
  if (!data.Answer) return [];
  return data.Answer
    .filter((a: { type: number }) => (type === "A" ? a.type === 1 : a.type === 16))
    .map((a: { data: string }) =>
      type === "TXT" ? a.data.replace(/^"|"$/g, "") : a.data
    );
}

async function checkUrlReachable(url: string): Promise<boolean> {
  try {
    // no-cors: we can't read the body but a successful fetch (opaque) implies reachable.
    await fetch(url, { mode: "no-cors", cache: "no-store" });
    return true;
  } catch {
    return false;
  }
}

export function useDomainChecks() {
  const [state, setState] = useState<DomainCheckState>(initialState);

  const reset = useCallback(() => setState(initialState), []);

  const runChecks = useCallback(
    async (domain: string, lovableUrl?: string) => {
      const cleaned = domain.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
      if (!cleaned) return;

      setState({
        ...initialState,
        publish: "checking",
        dnsRoot: "checking",
        dnsWww: "checking",
        dnsTxt: "checking",
        ssl: "checking",
      });

      // 1. Publish check
      let publishOk = false;
      let publishedUrl: string | undefined;
      if (lovableUrl) {
        publishedUrl = lovableUrl.startsWith("http") ? lovableUrl : `https://${lovableUrl}`;
        publishOk = await checkUrlReachable(publishedUrl);
      }

      // 2. DNS A root
      let rootIps: string[] = [];
      let dnsRootOk = false;
      try {
        rootIps = await resolveDoh(cleaned, "A");
        dnsRootOk = rootIps.includes(LOVABLE_IP);
      } catch {
        rootIps = [];
      }

      // 3. DNS A www
      let wwwIps: string[] = [];
      let dnsWwwOk = false;
      try {
        wwwIps = await resolveDoh(`www.${cleaned}`, "A");
        dnsWwwOk = wwwIps.includes(LOVABLE_IP);
      } catch {
        wwwIps = [];
      }

      // 4. DNS TXT _lovable
      let txtValues: string[] = [];
      let dnsTxtOk = false;
      try {
        txtValues = await resolveDoh(`_lovable.${cleaned}`, "TXT");
        dnsTxtOk = txtValues.some((v) => v.toLowerCase().includes("lovable"));
      } catch {
        txtValues = [];
      }

      // 5. SSL: try HTTPS on the custom domain
      const sslUrl = `https://${cleaned}`;
      const sslOk = dnsRootOk ? await checkUrlReachable(sslUrl) : false;

      setState({
        publish: publishOk ? "ok" : "fail",
        dnsRoot: dnsRootOk ? "ok" : "fail",
        dnsWww: dnsWwwOk ? "ok" : "fail",
        dnsTxt: dnsTxtOk ? "ok" : "fail",
        ssl: sslOk ? "ok" : "fail",
        rootIps,
        wwwIps,
        txtValues,
        publishedUrl,
        sslUrl,
        lastChecked: Date.now(),
      });
    },
    []
  );

  return { state, runChecks, reset };
}