import { CiEdit } from "react-icons/ci";
import type { ITodo } from "../../types/todoTypes.mts";
import { createAxios } from "../../helpers/axios";

import { RiDeleteBinLine } from "react-icons/ri";
import BaseButton from "../BaseButton/BaseButton";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import s from "./Todocard.module.css";

const TodoCard = ({
  title,
  description,
  isCompleted,
  _id,
  onDelete,
  onEdit,
  onToggle,
}: ITodo & {
  onDelete: () => void;
  onEdit: () => void;
  onToggle: () => void;
}) => {
  const handleDelete = async () => {
    try {
      await createAxios().delete(`/todo/${_id}`);
      onDelete();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async () => {
    try {
      await createAxios().patch(`/todo/${_id}`, {
        title,
        description,
        isCompleted: !isCompleted,
      });
      onToggle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BaseButton className={s.checkmark} onClick={handleToggle}>
        {isCompleted ? (
          <MdCheckBox className={s.checkIcon} size={24} />
        ) : (
          <MdCheckBoxOutlineBlank className={s.circleIcon} size={24} />
        )}
      </BaseButton>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={s.wrapperBtn}>
        <BaseButton onClick={onEdit}>
          <CiEdit size={24} />
        </BaseButton>
        <BaseButton onClick={handleDelete}>
          <RiDeleteBinLine size={24} />
        </BaseButton>
      </div>
    </>
  );
};

export default TodoCard;
