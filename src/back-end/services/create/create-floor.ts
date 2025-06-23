import { Andar } from "../../types/building-type";

export function createFloor(
  floors: Andar[],
  setFloors: React.Dispatch<React.SetStateAction<Andar[]>>
) {
  const newFloorNumber = floors.length + 1;

  const newFloor: Andar = {
    nome: `${newFloorNumber}º Andar`,
    cameras: 0,
    empresas: [],
  };

  setFloors([...floors, newFloor]);
  alert("Andar criado com sucesso!");
}
