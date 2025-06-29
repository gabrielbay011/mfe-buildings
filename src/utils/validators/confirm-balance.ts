import { mockUsers } from "../mock-data";

//Função para verifiar se o usuário tem saldo suficiente
export function confirmBalance(cost: number): boolean {
  const hasInsufficientBalance = mockUsers.some((user) => user.profit < cost);

  if (hasInsufficientBalance) {
    alert("Erro: Saldo insuficiente");
    return false;
  }
  alert("Operação realizada com sucesso");
  return true;
}
