import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import Container from "../Container/Container";

const Header = () => {
  return (
    <header className={s.header}>
      <Container>
        <nav>
          <NavLink to="/">Home</NavLink>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
