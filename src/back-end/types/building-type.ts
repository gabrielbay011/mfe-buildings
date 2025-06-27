import { z } from "zod";
import { createBuildingSchema } from "../schemas/create-building-schema";

//Tipo referente a empresa
export type Enterprise = {
  id: string;
  name: string;
  traffic: number;
};

//Tipo referente ao andar
export type Floor = {
  name: string;
  cameras: number;
  attendants?: number;
  enterprises?: Enterprise[];
};

//Tipo referente ao edifício
export type Building = {
  id: string;
  name: string;
  photo: string;
  creationDate: string;
  qtyFloors: number;
  qtyTurnstiles: number;
  qtyCameras: number;
  qtyElevators: number;
  totalCaptureTime: number;
  totalCaptureToday: number;
  totalCaptureMonth: number;
  totalCaptures: number;
  floors: Floor[];
  cameras: {
    id: string;
    qtyCaptureTime: number;
    qtyCaptureToday: number;
    qtyCaptureMonth: number;
    totalCaptures: number;
    scheduledCapture: string;
  }[];
  flowPeople: {
    time: number;
    day: number;
    week: number;
    month: number;
  };
  inputsAndOutput: {
    idTurnstile: string;
    photo: string;
    name: string;
    entered: boolean;
    exit: boolean;
    cpf: string;
    rg: string;
    surname: string;
    telphone: string;
    cep: string;
    state: string;
    city: string;
    district: string;
    road: string;
    number: string;
    qrCode: string;
    dateRegistration: string;
  }[];
  equipmentBroken: {
    id: string;
    type: string;
    floor?: string;
    status: string;
    cost: number;
  }[];
  equipmentMaintenance: {
    id: string;
    type: string;
    floor?: string;
    dateStart: string;
    scheduledDate: string;
  }[];
  flowComplete: {
    month: string;
    amount: number;
  }[];
};

//Tipo referente ao formulário de criar edifício
export type CreateBuildingType = z.infer<typeof createBuildingSchema>;
