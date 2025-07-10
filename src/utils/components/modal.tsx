import { ModalProps } from "../types/modal-type";

//Componente modal reutilizável
export default function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center bg-white/30 backdrop-blur-[1px] items-center z-[1000]">
      <div className="bg-white rounded-[20px] relative p-5 shadow-md/30 md:w-100">
        {children}
      </div>
    </div>
  );
}
