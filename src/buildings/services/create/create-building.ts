import { CreateBuildingType } from "../../types/create-building-type";
import { buildingAlreadyExists } from "../../validators/building-validations";

//Função para criar um edifício
export function createBuilding(data: CreateBuildingType): CreateBuildingType {
  const newBuilding: CreateBuildingType = {
    name: data.name,
  };

  if (buildingAlreadyExists(data.name)) {
    throw new Error("Prédio já cadastrado");
  }

  return newBuilding;
}
