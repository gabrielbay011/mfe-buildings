import { Andar } from "../../types/building-type";

//Função para adicionar um novo atendente
export function addAttendant(floors: Andar[], index: number): Andar[] {
  const newAttendant = [...floors];

  newAttendant[index] = {
    ...newAttendant[index],
    atendentes: (newAttendant[index].atendentes ?? 0) + 1,
  };

  return newAttendant;
}
