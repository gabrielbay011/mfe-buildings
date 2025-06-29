import { Building } from "../../../utils/types/building-type";

//Função para ordenar os edifícios referente ao 'select' da página de edifícios
export function sortBuildings(
  buildings: Building[],
  option: string
): Building[] {
  const sorted = [...buildings];

  switch (option) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));

    case "date-asc":
      return sorted.sort(
        (a, b) =>
          new Date(a.creationDate).getTime() -
          new Date(b.creationDate).getTime()
      );

    case "date-desc":
      return sorted.sort(
        (a, b) =>
          new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime()
      );

    default:
      return buildings;
  }
}
