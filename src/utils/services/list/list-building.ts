import { mockBuildings } from "../../mock-data";
import { Building } from "../../types/building-type";

//Função para listar todos os edifícios
export function listBuildings(): Building[] {
  return mockBuildings;
}
