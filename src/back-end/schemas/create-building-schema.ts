import { z } from "zod";

export const createBuildingSchema = z.object({
  nome: z.string().min(1, "O campo nome é origatório"),
});
