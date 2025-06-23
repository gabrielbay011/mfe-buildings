import { RenderConfirmProps } from "../../types/building-type";
import { confirmBalance } from "../../validators/confirm-balance";

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
      <button onClick={handleConfirm}>Sim</button>
    </div>
  );
}
