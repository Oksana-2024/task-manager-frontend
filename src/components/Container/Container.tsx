import clsx from "clsx";
import type { ReactNode } from "react";
import s from "./Container.module.css";

interface IContainer {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: IContainer) => {
  return <div className={clsx(s.container, className)}>{children}</div>;
};

export default Container;
