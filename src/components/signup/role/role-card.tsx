import { useId, type ReactNode } from "react";
import {
  Check,
  ClipboardCheck,
  FileSignature,
  Scale,
  ShieldCheck,
  Upload,
  type LucideIcon,
} from "lucide-react";
import { BUYER_LOOP, NETWORK_LOOP, type Loop } from "./loops";
import { SceneBuyer } from "./scene-buyer";
import { SceneNetwork } from "./scene-network";
import { ScaledCanvas } from "./scaled-canvas";
import { useInView, useLoop } from "./use-loop";
import r from "./role.module.css";

export type Role = "buyer" | "network";

const ROLES: Record<
  Role,
  {
    tag: string;
    title: string;
    text: string;
    caps: readonly [string, LucideIcon][];
    loop: Loop;
    Scene: (props: { step: number }) => ReactNode;
  }
> = {
  buyer: {
    tag: "Buyer",
    title: "I buy calls",
    text: "Check every call against the rules you signed, then accept the verdict or appeal it. Each decision comes with a receipt you can verify offline.",
    caps: [
      ["Review and accept", ClipboardCheck],
      ["Appeal", Scale],
      ["Signed receipts", ShieldCheck],
    ],
    loop: BUYER_LOOP,
    Scene: SceneBuyer,
  },
  network: {
    tag: "Network",
    title: "I sell calls",
    text: "Upload your calls, see how they hold up against the agreement before the buyer does, and appeal rejections with the same evidence.",
    caps: [
      ["Upload batches", Upload],
      ["Draft the rules", FileSignature],
      ["Appeal rejections", Scale],
    ],
    loop: NETWORK_LOOP,
    Scene: SceneNetwork,
  },
};

/** One selectable side. A real radio sits under the card, so keyboards and screen readers work as usual. */
export function RoleCard({
  role,
  selected,
  otherSelected,
  onSelect,
}: {
  role: Role;
  selected: boolean;
  otherSelected: boolean;
  onSelect: (role: Role) => void;
}) {
  const { tag, title, text, caps, loop, Scene } = ROLES[role];
  const id = useId();
  const [ref, inView] = useInView<HTMLDivElement>();
  const step = useLoop(loop, inView);
  return (
    <div
      ref={ref}
      data-testid={`role-card-${role}`}
      data-selected={String(selected)}
      data-dim={String(otherSelected)}
      className={r.card}
    >
      <input
        type="radio"
        name="role"
        value={role}
        id={`${id}-radio`}
        checked={selected}
        onChange={() => onSelect(role)}
        aria-describedby={`${id}-text`}
        className={r.input}
      />
      <span className={r.indicator} aria-hidden="true">
        <Check strokeWidth={3} />
      </span>
      <div className={r.well} aria-hidden="true">
        <ScaledCanvas width={400} height={200}>
          <Scene step={step} />
        </ScaledCanvas>
      </div>
      <div className={r.body}>
        <span className={r.tag}>{tag}</span>
        <label htmlFor={`${id}-radio`} className={r.title}>
          {title}
        </label>
        <p id={`${id}-text`} className={r.text}>
          {text}
        </p>
        <ul className={r.caps} aria-label={`What a ${tag.toLowerCase()} can do`}>
          {caps.map(([label, Icon]) => (
            <li key={label}>
              <Icon aria-hidden="true" strokeWidth={1.6} />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
