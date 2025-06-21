import { mockBuildings } from "../../utils/mock-data";

export function buildingAlreadyExists(building: string): boolean {
  const nameBuilding = building;
  return mockBuildings.some((building) => building.nome === nameBuilding);
}
