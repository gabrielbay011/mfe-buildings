import { Building } from "../types/building-type";

export function sortBuildings(
  buildings: Building[],
  option: string
): Building[] {
  const sorted = [...buildings];

  switch (option) {
    case "name-asc":
      return sorted.sort((a, b) => a.nome.localeCompare(b.nome));
    case "name-desc":
      return sorted.sort((a, b) => b.nome.localeCompare(a.nome));
    case "date-asc":
      return sorted.sort(
        (a, b) =>
          new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime()
      );
    case "date-desc":
      return sorted.sort(
        (a, b) =>
          new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()
      );
    default:
      return buildings;
  }
}
