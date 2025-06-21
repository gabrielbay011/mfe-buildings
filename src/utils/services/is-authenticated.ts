import { mockUsers } from "../mock-data";

export function isAuthenticated(userId: string): boolean {
  const user = mockUsers.find((user) => user.id === userId);
  return user?.isAuthenticated ?? false;
}
