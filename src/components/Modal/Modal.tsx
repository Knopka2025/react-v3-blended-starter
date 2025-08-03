import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "./Modal.module.css";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root")!;

export default function Modal({ children, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).dataset.backdrop) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styled.backdrop}
      role="dialog"
      aria-modal="true"
      data-backdrop
    >
      <div className={styled.modal}>
        <button
          className={styled.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
