import { type ReactNode } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { MdClose } from "react-icons/md";
import { noScrollDisable, noScrollEnable } from "../../helpers/noScroll";

import s from "./ModalWindow.module.css";

interface IModalWindow {
  children: ReactNode;
  modalIsOpen: boolean;
  closeModal: () => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalWindow = ({ children, modalIsOpen, closeModal }: IModalWindow) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      onAfterOpen={noScrollEnable}
      onAfterClose={noScrollDisable}
    >
      <button className={s.closeBtn} onClick={closeModal}>
        <MdClose size={24} className={s.closeIcon} />
      </button>
      <div className={s.modal}>{children}</div>
    </Modal>
  );
};

export default ModalWindow;
