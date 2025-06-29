import { EquipmentType } from "./equipment-type";

//Tipo referente ao equipamento
export type MaintenanceEquipment = {
  id: string;
  type: EquipmentType;
  dateStart: string;
  scheduledDate: string;
  floor?: string;
};
