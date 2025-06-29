import { z } from "zod";
import { createBuildingSchema } from "../schemas/create-building-schema";

//Tipo referente ao formulário de criar edifício
export type CreateBuildingType = z.infer<typeof createBuildingSchema>;
