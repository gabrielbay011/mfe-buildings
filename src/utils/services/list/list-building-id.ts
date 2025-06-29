import { mockBuildings } from "../../mock-data";
import { Building } from "../../types/building-type";

//Função para listar as informações de um edifício específico
export function listBuildingsId(buildingId: string): Building {
  const buildingById = mockBuildings.find(
    (building) => building.id === buildingId
  );

  if (!buildingById) {
    throw new Error("Edifício não encontrado");
  }

  return buildingById;
}
