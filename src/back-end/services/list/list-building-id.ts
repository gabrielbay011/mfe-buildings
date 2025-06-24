import { mockBuildings } from "../../../utils/mock-data";

//Função para listar as informações de um edifício específico
export function listBuildingsId(buildingId: string) {
  return mockBuildings.find((building) => building.id === buildingId);
}
