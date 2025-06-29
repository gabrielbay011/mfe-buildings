import { Building } from "../../../utils/types/building-type";

//Função para adicionar uma catraca
export function addTurnstile(building: Building): Building {
  return {
    ...building,
    qtyTurnstiles: building.qtyTurnstiles + 1,
  };
}
