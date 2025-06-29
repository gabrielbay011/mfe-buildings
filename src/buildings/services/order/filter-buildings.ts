import { Building } from "../../../utils/types/building-type";

//Função para filtrar os edifícios pelo que o usuário pesquisou
export function filterBuildings(
  buildings: Building[],
  searchTerm: string
): Building[] {
  const lowerSearch = searchTerm.toLowerCase();
  return buildings.filter((b) => b.name.toLowerCase().includes(lowerSearch));
}
