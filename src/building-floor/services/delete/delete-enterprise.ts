import { Floor } from "../../../utils/types/floor-type";

//Função para deletar uma empresa
export function deleteEnterprise(
  enterpriseId: string,
  floorIndex: number,
  setFloors: React.Dispatch<React.SetStateAction<Floor[]>>
) {
  const confirmed = window.confirm("Tem certeza que deseja deletar?");
  if (confirmed) {
    setFloors((prevFloors) => {
      const updatedFloors = [...prevFloors];
      const enterprises = updatedFloors[floorIndex].enterprises;

      if (enterprises) {
        updatedFloors[floorIndex].enterprises = enterprises.filter(
          (ent) => ent.id !== enterpriseId
        );
      }

      return updatedFloors;
    });
  }
}
