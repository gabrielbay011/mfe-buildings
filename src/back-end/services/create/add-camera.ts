import { Andar } from "../../types/building-type";

//Função para adicionar uma câmera
export function AddCamera(floors: Andar[], index: number): Andar[] {
  const newCamera = [...floors];

  newCamera[index] = {
    ...newCamera[index],
    cameras: (newCamera[index].cameras ?? 0) + 1,
  };

  return newCamera;
}
