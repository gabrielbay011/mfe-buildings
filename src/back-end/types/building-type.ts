import { z } from "zod";
import { createBuildingSchema } from "../schemas/create-building-schema";

type Empresa = {
  nome: string;
  trafego: number;
};

export type Andar = {
  nome: string;
  cameras: number;
  atendentes?: number;
  empresas?: Empresa[];
};

export type RenderConfirmProps = {
  cost: number;
  onConfirm: () => void;
  onClose: () => void;
};

export type Building = {
  id: string;
  nome: string;
  foto: string;
  dataCriacao: string;
  qtdAndares: string;
  qtdCatracas: string;
  qtdCameras: string;
  qtdElevadores: string;
  andares: Andar[];
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
    tipo: string;
    andar?: string;
    status: string;
    custo: number;
  }[];
  equipamentosManutencao: {
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

export type CreateBuildingType = z.infer<typeof createBuildingSchema>;
