import type { ReactNode } from "react";

export interface TrikiInfo {
  content: string;
  position: number;
  className?: string;
}

export type SquareProps = {
  onClick: () => void;
  content: string;
  position: number;
  className?: string;
  children?: ReactNode
};
