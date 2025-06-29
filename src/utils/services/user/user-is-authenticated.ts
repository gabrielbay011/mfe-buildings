import { mockUsers } from "../../mock-data";

//Função para vertificar se o usuário está autenticado
export function userIsAuthenticated(userId: string): boolean {
  const user = mockUsers.find((user) => user.id === userId);
  return user?.isAuthenticated ?? false;
}
