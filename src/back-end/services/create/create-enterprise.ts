import { Andar } from "../../types/building-type";

export function createEnterprise(floor: Andar) {
  const qtyEnterprises = floor.empresas?.length ?? 0;

  if (qtyEnterprises < 2) {
    alert("Empresa criada com sucesso");
  } else {
    alert("Erro: Limite de empresas atingido");
  }
}
