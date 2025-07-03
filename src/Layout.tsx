import type { ReactNode } from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
interface ILayout {
  children?: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Outlet />
    </div>
  );
};

export default Layout;
