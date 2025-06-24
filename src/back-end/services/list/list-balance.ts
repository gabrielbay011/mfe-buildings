import { mockBalances } from "../../../utils/mock-data";

//Função para listar o histórico de saldo referente a um usuário específico
export function listBalances(userId: string) {
  return mockBalances.filter((balance) => balance.id === userId);
}
