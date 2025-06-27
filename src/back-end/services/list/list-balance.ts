import { mockBalances } from "../../../utils/mock-data";
import { Balances } from "../../types/balance-types";

//Função para listar o histórico de saldo referente a um usuário específico
export function listBalances(userId: string): Balances[] {
  return mockBalances.filter((balance) => balance.id === userId);
}
