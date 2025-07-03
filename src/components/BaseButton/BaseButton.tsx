import type { ReactNode } from "react";
import s from "./BaseButton.module.css";
import clsx from "clsx";

interface IBaseButton {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}

const BaseButton = ({ children, onClick, className }: IBaseButton) => {
  return (
    <button
      className={clsx(s.baseBtn, className)}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BaseButton;
