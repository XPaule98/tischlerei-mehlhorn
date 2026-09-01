import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  // Clean, persistent rendering with subtle CSS enter animation (zero white-flash blitz)
  return <div className="page-fade-in">{children}</div>;
}
