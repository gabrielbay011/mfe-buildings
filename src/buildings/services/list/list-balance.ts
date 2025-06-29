import { mockBalances } from "../../../utils/mock-data";
import { Balance } from "../../types/balance-type";

//Função para listar o histórico de saldo referente a um usuário específico
export function listBalances(userId: string): Balance[] {
  return mockBalances.filter((balance) => balance.id === userId);
}
