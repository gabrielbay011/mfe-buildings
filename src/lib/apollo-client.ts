import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { nhostConfig } from "./nhost";

// Montagem da URL manualmente com base no subdomínio e região
const graphqlUrl = `https://${nhostConfig.subdomain}.hasura.${nhostConfig.region}.nhost.run/v1/graphql`;

//Configuração do ApolloClient
export const apolloPublicClient = new ApolloClient({
  link: new HttpLink({
    uri: graphqlUrl,
    headers: {
      "x-hasura-role": "usr_no_user",
      "x-hasura-admin-secret": "zn(--fiv5Rk7LSBrruDsQV,h#UTu_s7*",
    },
  }),
  cache: new InMemoryCache(),
});
