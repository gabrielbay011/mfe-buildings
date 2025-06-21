import { mockBalances } from "../../../utils/mock-data";

export function listBalances(userId: string) {
  return mockBalances.filter((balance) => balance.id === userId);
}
