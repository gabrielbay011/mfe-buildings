import { z } from "zod";

//Validação do campo do fomulário de criar edifícios
export const createBuildingSchema = z.object({
  //Validação nome: campo obrigatório
  name: z.string().min(1, "O campo nome é obrigatório"),
});
