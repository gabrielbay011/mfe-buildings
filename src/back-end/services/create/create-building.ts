import { buildingAlreadyExists } from "../../validators/building-validations";

export async function createBuilding(data: any) {
  try {
    const newBuilding = {
      nome: data.nome,
    };

    if (buildingAlreadyExists(data.nome)) {
      throw new Error("Prédio já cadastrado");
    }

    // eslint-disable-next-line no-console
    console.log("Prédio cadastrado: ", newBuilding);

    return newBuilding;
  } catch (err) {
    throw err;
  }
}
