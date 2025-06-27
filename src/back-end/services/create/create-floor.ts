import { Floor } from "../../types/building-type";

//função para criar um andar
export function createFloor(
  floors: Floor[],
  setFloors: React.Dispatch<React.SetStateAction<Floor[]>>
) {
  const newFloorNumber = floors.length + 1;

  const newFloor: Floor = {
    name: `${newFloorNumber}º Andar`,
    cameras: 0,
    enterprises: [],
  };

  setFloors([...floors, newFloor]);
  alert("Andar criado com sucesso!");
}
