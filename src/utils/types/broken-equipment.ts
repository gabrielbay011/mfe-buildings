import { EquipmentStatus } from "./equipment-status";
import { EquipmentType } from "./equipment-type";

//Tipo referente ao equipamento
export type BrokenEquipment = {
  id: string;
  type: EquipmentType;
  status: EquipmentStatus;
  cost: number;
  floor?: string;
};
