import { useEffect, useState } from "react";
import type { ITodo } from "../../types/todoTypes.mts";
import TodoCard from "../TodoCard/TodoCard";
import { createAxios } from "../../helpers/axios";
import Select from "react-select";
import s from "./TodoList.module.css";
import TodoForm from "../TodoForm/TodoForm";
import ModalWindow from "../ModalWindow/ModalWindow";

const options = [
  { value: "", label: "All" },
  { value: "false", label: "Active" },
  { value: "true", label: "Completed" },
];

const TodoList = ({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: (state: boolean) => void;
}) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState<string | undefined>("");
  const [currentTodo, setCurrentTodo] = useState<ITodo | null>(null);

  const getTodos = async () => {
    try {
      const { data } = await createAxios().get("/todo", {
        params: { isCompleted: status },
      });
      return setTodos(data.todo);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (value: string | undefined) => {
    setStatus(value);
  };

  const handleEdit = (item: ITodo) => {
    setCurrentTodo(item);
    setModal(true);
  };

  const handleUpdate = () => {
    setCurrentTodo(null);
    getTodos();
  };

  const handleModalClose = () => {
    setModal(false);
    setCurrentTodo(null);
  };

  useEffect(() => {
    getTodos();
  }, [status]);

  return (
    <>
      <Select
        defaultValue={options[0]}
        options={options}
        onChange={(option) => handleChange(option?.value)}
        classNamePrefix={"select"}
      />
      <ul className={s.todoList}>
        {todos.map((item, index) => (
          <li key={index} className={s.todoItem}>
            <TodoCard
              onToggle={getTodos}
              onDelete={getTodos}
              onEdit={() => handleEdit(item)}
              {...item}
            />
          </li>
        ))}
      </ul>
      <ModalWindow closeModal={handleModalClose} modalIsOpen={modal}>
        <TodoForm
          onClose={handleModalClose}
          onCreate={handleUpdate}
          onUpdate={handleUpdate}
          currentTodo={currentTodo!}
        ></TodoForm>
      </ModalWindow>
    </>
  );
};

export default TodoList;
