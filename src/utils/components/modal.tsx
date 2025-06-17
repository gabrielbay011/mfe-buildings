import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalStyle: React.CSSProperties = {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "300px",
    position: "relative",
  };

  const closeStyle: React.CSSProperties = {
    position: "absolute",
    top: 10,
    right: 10,
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button onClick={onClose} style={closeStyle}>
          x
        </button>
        {children}
      </div>
    </div>
  );
}
