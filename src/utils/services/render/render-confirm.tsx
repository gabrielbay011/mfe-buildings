import { RenderConfirmProps } from "../../types/render-confirm-type";
import { confirmBalance } from "../../validators/confirm-balance";

//Função para renderizar a confirmação da operação
export default function RenderConfirm({
  cost,
  onConfirm,
  onClose,
}: RenderConfirmProps) {
  const handleConfirm = () => {
    if (confirmBalance(cost)) {
      onConfirm();
      onClose();
    }
  };

  return (
    <div>
      <button
        className="bg-gray-200 border border-gray-700 p-1 cursor-pointer rounded-sm hover:bg-gray-300"
        onClick={handleConfirm}
      >
        Sim
      </button>
    </div>
  );
}
