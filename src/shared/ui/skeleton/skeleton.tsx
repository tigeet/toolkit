import clsx from "clsx";
import { cn } from "@bem-react/classname";

import "./skeleton.scss";
import { normalizeSizeProp } from "@shared/utils";
const cl = cn("skeleton");

type Props = {
  variant?: "rectangular" | "circular" | "rounded";
  width?: string | number;
  height?: string | number;
  className?: string;
};

export const Skeleton = ({
  variant = "rounded",
  width,
  height,
  className,
}: Props) => {
  return (
    <span
      className={clsx(className, cl({ variant }))}
      style={{
        width: normalizeSizeProp(width),
        height: normalizeSizeProp(height),
      }}
    />
  );
};
