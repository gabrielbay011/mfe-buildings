import { mockBuildings } from "../../../utils/mock-data";

export function listFlowHistory(buildingId: string) {
  return mockBuildings.find((building) => building.id === buildingId);
}
