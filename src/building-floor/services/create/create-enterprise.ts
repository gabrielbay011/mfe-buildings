import { Floor } from "../../../utils/types/floor-type";

//Função para criar uma empresa no andar
export function createEnterprise(
  floorIndex: number,
  setFloors: React.Dispatch<React.SetStateAction<Floor[]>>
) {
  setFloors((prevFloors) => {
    const updatedFloors = [...prevFloors];
    const floor = updatedFloors[floorIndex];
    const qtyEnterprises = floor.enterprises ?? [];

    if (qtyEnterprises.length >= 2) {
      alert("Erro: Limite de empresas atingido");
      return prevFloors;
    }

    const lastId =
      qtyEnterprises.length > 0
        ? Number(qtyEnterprises[qtyEnterprises.length - 1].id)
        : 0;

    const newEnterprise = {
      id: String(lastId + 1),
      name: `Empresa ${qtyEnterprises.length + 1}`,
      traffic: 0,
    };

    if (floor.enterprises) {
      floor.enterprises.push(newEnterprise);
    } else {
      floor.enterprises = [newEnterprise];
    }

    alert("Empresa criada com sucesso");
    return updatedFloors;
  });
}
