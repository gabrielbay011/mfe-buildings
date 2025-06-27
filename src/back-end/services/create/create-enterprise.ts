import { Floor } from "../../types/building-type";

//Função para criar uma empresa no andar
export function createEnterprise(floor: Floor) {
  const qtyEnterprises = floor.enterprises?.length ?? 0;

  if (qtyEnterprises < 2) {
    alert("Empresa criada com sucesso");
  } else {
    alert("Erro: Limite de empresas atingido");
  }
}
