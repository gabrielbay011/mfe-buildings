import { mockBuildings } from "../../../utils/mock-data";

export function listBuildingsId(buildingId: string) {
  return mockBuildings.find((building) => building.id === buildingId);
}
