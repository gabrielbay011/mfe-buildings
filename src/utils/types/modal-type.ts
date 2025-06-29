//Tipo referente as props esperada pela modal
export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
