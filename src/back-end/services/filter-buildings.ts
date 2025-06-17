import { Building } from "../types/building-type";

export function filterBuildings(
  buildings: Building[],
  searchTerm: string
): Building[] {
  const lowerSearch = searchTerm.toLowerCase();
  return buildings.filter((b) => b.nome.toLowerCase().includes(lowerSearch));
}
