import { Floor } from "../../../utils/types/floor-type";

//Função para adicionar um novo atendente
export function addAttendant(floors: Floor[], index: number): Floor[] {
  if (index < 0 || index >= floors.length) {
    throw new Error(`Índice ${index} fora dos limites do array de andares`);
  }

  const updatedFloors = [...floors];

  updatedFloors[index] = {
    ...updatedFloors[index],
    attendants: (updatedFloors[index].attendants ?? 0) + 1,
  };

  return updatedFloors;
}
