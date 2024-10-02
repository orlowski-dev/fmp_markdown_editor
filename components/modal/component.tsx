"use client";

import { useOutsideClick } from "@/hooks";
import { Button } from "../button";
import "./styles.css";
import { useRef } from "react";

export interface ModalProps {
  title: string;
  text: string;
  buttonProps: {
    text: string;
    onClick: () => void;
  };
  onOutsideClick: () => void;
}

const Modal = ({ title, text, buttonProps, onOutsideClick }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, onOutsideClick);
  return (
    <div className="modal-wrapper">
      <div className="modal" ref={modalRef}>
        <h2>{title}</h2>
        <p>{text}</p>
        <Button onClick={buttonProps.onClick}>{buttonProps.text}</Button>
      </div>
    </div>
  );
};

export default Modal;
