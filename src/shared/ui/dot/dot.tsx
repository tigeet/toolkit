import { cn } from "@bem-react/classname";

import "./dot.scss";
const cl = cn("dot");

export const Dot = () => {
  return (
    <span aria-hidden className={cl()}>
      ·
    </span>
  );
};
