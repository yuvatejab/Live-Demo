import { Building2, Network } from "lucide-react";

/** The network is a hub of connected nodes; the buyer is a company building. */
export function PartyIcon({ side }: { side: "network" | "buyer" }) {
  const Icon = side === "network" ? Network : Building2;
  return <Icon aria-hidden="true" strokeWidth={1.6} />;
}
