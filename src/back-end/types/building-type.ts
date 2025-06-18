import { z } from "zod";
import { createBuildingSchema } from "../schemas/create-building-schema";

export type Building = {
  id: string;
  nome: string;
  foto: string;
  dataCriacao: string;
  qtdAndares: string;
  qtdCatracas: string;
  qtdCameras: string;
  qtdElevadores: string;
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
    status: string;
    custo: string;
  }[];
  equipamentosManutencao: {
    tipo: string;
    dataInicio: string;
    dataPrevista: string;
  }[];
  fluxoCompleto: {
    mes: string;
    quantidade: number;
  }[];
};

export type CreateBuildingType = z.infer<typeof createBuildingSchema>;
