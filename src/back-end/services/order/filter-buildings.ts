import { Building } from "../../types/building-type";

//Função para fitrar os edifícios pelo que o usuario pesquisou
export function filterBuildings(
  buildings: Building[],
  searchTerm: string
): Building[] {
  const lowerSearch = searchTerm.toLowerCase();
  return buildings.filter((b) => b.nome.toLowerCase().includes(lowerSearch));
}
