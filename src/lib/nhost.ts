import { NhostClient } from "@nhost/nhost-js";
import { subdomain, region } from "../../env.js";

// Conexão com o nhost
export const nhost = new NhostClient({
  subdomain,
  region,
});

// Exportação de variáveis
export const nhostConfig = {
  subdomain,
  region,
};
