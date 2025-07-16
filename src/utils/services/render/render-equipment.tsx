import { mockUsers } from "../../mock-data";
import { BrokenEquipment } from "../../types/broken-equipment";
import { MaintenanceEquipment } from "../../types/maintenance-equipment";

export function renderEquipment(
  equipment: BrokenEquipment | null,
  brokenEquipments: BrokenEquipment[],
  setBrokenEquipments: (items: BrokenEquipment[]) => void,
  maintenanceEquipments: MaintenanceEquipment[],
  setMaintenanceEquipments: (items: MaintenanceEquipment[]) => void,
  closeModal: () => void
) {
  if (!equipment) return <p>Equipamento não encontrado</p>;

  const handleEquipment = () => {
    if (mockUsers[0].profit < equipment.cost) {
      alert("Erro: Saldo insuficiente");
      return;
    }

    const now = new Date();
    const dateStart = now.toISOString().split("T")[0];
    const scheduledDate = new Date(now.setDate(now.getDate() + 5))
      .toISOString()
      .split("T")[0];

    //Remove equipamento dos quebrados
    const updatedBroken = brokenEquipments.filter((e) => e !== equipment);
    setBrokenEquipments(updatedBroken);

    //Adiciona equipamento na manutenção
    const newEquipment = {
      ...equipment,
      dateStart,
      scheduledDate,
    };
    setMaintenanceEquipments([...maintenanceEquipments, newEquipment]);

    alert("Equipamento foi movido para manutenção");
    closeModal();
  };

  return (
    <div>
      <p>Equipamento: {equipment.type}</p>
      <p>Status: {equipment.status}</p>
      <p>Custo: {equipment.cost}</p>
      <button
        className="bg-gray-200 border border-gray-700 p-1 cursor-pointer rounded-sm hover:bg-gray-300"
        onClick={handleEquipment}
      >
        Sim
      </button>
    </div>
  );
}
