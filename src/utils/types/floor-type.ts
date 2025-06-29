import { Enterprise } from "../../utils/types/enterprise";

//Tipo referente ao andar
export type Floor = {
  name: string;
  cameras: number;
  attendants?: number;
  enterprises?: Enterprise[];
};
