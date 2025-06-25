import { mockUsers } from "../../../utils/mock-data";

//Função para renderizar
export function renderEquipment(equipment: any) {
  if (!equipment) {
    return <p>Equipment não encontrados</p>;
  }

  const handleEquipment = () => {
    if (mockUsers.some((user) => user.saldo < equipment.custo)) {
      alert("Erro: Saldo insuficiente");
    } else {
      alert("Equipamento foi para manutenção");
      // eslint-disable-next-line no-console
      console.log(equipment);
    }
  };

  return (
    <div>
      <p>Equipamento: {equipment.tipo}</p>
      <p>Status: {equipment.status}</p>
      <p>Custo: {equipment.custo}</p>
      <button style={{ cursor: "pointer" }} onClick={handleEquipment}>
        Sim
      </button>
    </div>
  );
}
