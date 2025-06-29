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
      <button style={{ cursor: "pointer" }} onClick={handleConfirm}>
        Sim
      </button>
    </div>
  );
}
