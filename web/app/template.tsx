import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  // Direct render without opacity flashes or blitzing
  return <>{children}</>;
}
