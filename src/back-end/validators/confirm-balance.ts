import { mockUsers } from "../../utils/mock-data";

export function confirmBalance(cost: number): boolean {
  const hasInsufficientBalance = mockUsers.some((user) => user.saldo < cost);
  if (hasInsufficientBalance) {
    alert("Erro: Saldo insuficiente");
    return false;
  }
  alert("Operação realizada com sucesso");
  return true;
}
