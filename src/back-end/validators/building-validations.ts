import { mockBuildings } from "../../utils/mock-data";

//Função para verificar se o edifício já existe
export function buildingAlreadyExists(building: string): boolean {
  const nameBuilding = building;
  return mockBuildings.some((building) => building.name === nameBuilding);
}
