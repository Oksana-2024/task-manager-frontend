import { CiEdit } from "react-icons/ci";
import type { ITodo } from "../../types/todoTypes.mts";
import { createAxios } from "../../helpers/axios";

import { RiDeleteBinLine } from "react-icons/ri";
import BaseButton from "../BaseButton/BaseButton";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import s from "./Todocard.module.css";
import { useState } from "react";
import { OverlayLoader } from "../OverlayLoader/OverlayLoader";

const TodoCard = ({
  title,
  description,
  isCompleted,
  _id,
  onDelete,
  onEdit,
  onToggle,
}: ITodo & {
  onDelete: () => Promise<void>;
  onEdit: () => void;
  onToggle: () => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await createAxios().delete(`/todo/${_id}`);
      await onDelete();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async () => {
    try {
      setIsLoading(true);
      await createAxios().patch(`/todo/${_id}`, {
        title,
        description,
        isCompleted: !isCompleted,
      });
      await onToggle();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OverlayLoader isLoading={isLoading}>
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
    </OverlayLoader>
  );
};

export default TodoCard;
