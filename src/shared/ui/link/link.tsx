import clsx from "clsx";
import { LinkProps } from "react-router-dom";
import { cn } from "@bem-react/classname";
import { Link as RouterLink } from "react-router-dom";

const cl = cn("link");
import "./link.scss";

export const Link = ({ children, className, ...rest }: LinkProps) => {
  return (
    <RouterLink {...rest} className={clsx(className, cl())}>
      {children}
    </RouterLink>
  );
};
