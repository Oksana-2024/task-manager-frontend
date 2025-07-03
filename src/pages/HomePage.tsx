import { useState } from "react";
import Container from "../components/Container/Container";
import TodoList from "../components/TodoList/TodoList";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className={s.home}>
      <Container>
        <button className={s.todoBtn} onClick={() => setIsOpen(true)}>
          Add todo
        </button>
        <TodoList modal={isOpen} setModal={setIsOpen} />
      </Container>
    </section>
  );
};

export default HomePage;
