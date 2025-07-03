import { ErrorMessage, Field, Form, Formik } from "formik";

import clsx from "clsx";
import { schema } from "../../helpers/schemaTodo";

import s from "./TodoForm.module.css";
import { createAxios } from "../../helpers/axios";
import type { ITodo } from "../../types/todoTypes.mts";
import { useState } from "react";
const TodoForm = ({
  currentTodo,
  onCreate,
  onUpdate,
  onClose,
}: {
  currentTodo: ITodo;
  onCreate: () => void;
  onUpdate: () => void;
  onClose: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const createTodo = async (payload: Omit<ITodo, "_id">) => {
    await createAxios().post("/todo", payload);
    onCreate();
  };

  const updateTodo = async (payload: ITodo) => {
    await createAxios().patch(`/todo/${currentTodo._id}`, payload);
    onUpdate();
  };
  return (
    <>
      <Formik
        onSubmit={async (values, actions) => {
          try {
            setIsLoading(true);
            if (currentTodo) {
              await updateTodo(values as ITodo);
              actions.resetForm();
              onClose();
              return;
            }

            await createTodo(values as ITodo);
            actions.resetForm();
            onClose();
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        }}
        initialValues={{
          title: currentTodo?.title || "",
          description: currentTodo?.description || "",
        }}
        enableReinitialize
        validationSchema={schema}
      >
        <Form className={s.formBox}>
          <Field
            className={s.input}
            type="text"
            name="title"
            placeholder="Please, enter the title of your TODO..."
          />

          <div className={s.divError}>
            <ErrorMessage name="title" component="div" />
          </div>

          <Field
            className={s.input}
            type="text"
            name="description"
            placeholder="Add some details here..."
          />

          <div className={s.divError}>
            <ErrorMessage name="description" component="div" />
          </div>

          <div className={s.divButton}>
            {currentTodo && (
              <button className={s.cancel} type="button" onClick={onClose}>
                Cancel
              </button>
            )}
            <button
              className={clsx(s.button, s.addTodo, isLoading && s.disabled)}
              disabled={isLoading}
              type="submit"
            >
              {currentTodo ? "Edit todo" : "Add todo"}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default TodoForm;
