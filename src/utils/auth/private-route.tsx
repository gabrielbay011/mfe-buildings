import { useAuthenticationStatus } from "@nhost/react";

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    window.location.href = "/auth";
    return null;
  }

  return children;
}
