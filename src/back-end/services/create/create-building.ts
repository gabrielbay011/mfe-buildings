import { Building, CreateBuildingType } from "../../types/building-type";
import { buildingAlreadyExists } from "../../validators/building-validations";

//Função para criar um edifício
export function createBuilding(data: CreateBuildingType): CreateBuildingType {
  const newBuilding: CreateBuildingType = {
    name: data.name,
  };

  if (buildingAlreadyExists(data.name)) {
    throw new Error("Prédio já cadastrado");
  }

  alert("Edifício criado com sucesso");
  return newBuilding;
}
