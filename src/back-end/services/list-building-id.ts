import { mockBuildings } from "../../utils/mock-users";

export function listBuildingsId(buildingId: string) {
  return mockBuildings.find((building) => building.id === buildingId);
}
