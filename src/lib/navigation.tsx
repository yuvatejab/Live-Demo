import type { AnchorHTMLAttributes } from "react";
import { Link as RouterLink } from "react-router";

/** The preview only needs client-side links; the app's prefetching and session logic are not part of it. */
export function Link({
  href,
  ...props
}: { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return <RouterLink to={href} {...props} />;
}
