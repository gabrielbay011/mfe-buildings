import { z } from "zod";
import { createBuildingSchema } from "../schemas/create-building-schema";

//Tipo referente a empresa
type Empresa = {
  id: string;
  nome: string;
  trafego: number;
};

//Tipo referente ao andar
export type Andar = {
  nome: string;
  cameras: number;
  atendentes?: number;
  empresas?: Empresa[];
};

//Tipo referente ao edifício
export type Building = {
  id: string;
  nome: string;
  foto: string;
  dataCriacao: string;
  qtdAndares: string;
  qtdCatracas: string;
  qtdCameras: string;
  qtdElevadores: string;
  totalCapturaHora: number;
  totalCapturaHoje: number;
  totalCapturaMes: number;
  totalCaptura: number;
  andares: Andar[];
  cameras: {
    id: string;
    qtdCapturaHora: number;
    qtdCapturaHoje: number;
    qtdCapturaMes: number;
    totalCapturas: number;
    horarioCaptura: string;
  }[];
  fluxoPessoas: {
    hora: number;
    dia: number;
    semana: number;
    mes: number;
  };
  entradasESaidas: {
    foto: string;
    nome: string;
    entrou: boolean;
    saiu: boolean;
    cpf: string;
    rg: string;
    sobrenome: string;
    telefone: string;
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    qrCode: string;
    dataCadastro: string;
  }[];
  equipamentosQuebrados: {
    id: string;
    tipo: string;
    andar?: string;
    status: string;
    custo: number;
  }[];
  equipamentosManutencao: {
    id: string;
    tipo: string;
    andar?: string;
    dataInicio: string;
    dataPrevista: string;
  }[];
  fluxoCompleto: {
    mes: string;
    quantidade: number;
  }[];
};

//Tipo referente ao formulário de criar edifício
export type CreateBuildingType = z.infer<typeof createBuildingSchema>;
