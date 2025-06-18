import sha512 from "crypto-js/sha512";

export const mockUsers = [
  {
    id: "1",
    email: "mikewillbento@gmail.com",
    passwordHash: sha512("Teste1234!@#").toString(),
    isAuthenticated: true,
    accessToken: "12345",
  },
];

export const mockBuildings = [
  {
    id: "1",
    foto: "FotoPredio1",
    nome: "Baymetrics",
    dataCriacao: "2024-06-01",
    qtdAndares: "3",
    qtdCatracas: "2",
    qtdCameras: "10",
    qtdElevadores: "1",

    fluxoPessoas: {
      hora: 25,
      dia: 300,
      semana: 1500,
      mes: 6000,
    },

    entradasESaidas: [
      {
        foto: "FotoPessoa1",
        nome: "João Silva",
        entrou: false,
        saiu: true,
        cpf: "123.456.789-00",
        rg: "12.345.678-9",
        sobrenome: "Silva",
        telefone: "(11) 98765-4321",
        cep: "01234-567",
        estado: "SP",
        cidade: "São Paulo",
        bairro: "Centro",
        rua: "Rua das Flores",
        numero: "123",
        qrCode: "123456",
        dataCadastro: "2024-10-15T14:30:00Z",
      },
      {
        foto: "FotoPessoa2",
        nome: "Maria Souza",
        entrou: true,
        saiu: false,
        cpf: "987.654.321-00",
        rg: "98.765.432-1",
        sobrenome: "Souza",
        telefone: "(21) 99876-5432",
        cep: "22040-002",
        estado: "RJ",
        cidade: "Rio de Janeiro",
        bairro: "Copacabana",
        rua: "Avenida Atlântica",
        numero: "456",
        qrCode: "987654",
        dataCadastro: "2023-07-22T09:15:00Z",
      },
    ],

    equipamentosQuebrados: [
      {
        tipo: "Câmera",
        status: "Baixo",
        custo: "R$ 200,00",
      },
      {
        tipo: "Catraca",
        status: "Moderado",
        custo: "R$ 400,00",
      },
      {
        tipo: "Catraca",
        status: "Grave",
        custo: "R$ 400,00",
      },
    ],

    equipamentosManutencao: [
      {
        tipo: "Elevador",
        dataInicio: "2025-06-15",
        dataPrevista: "2025-06-20",
      },
      {
        tipo: "Câmera",
        dataInicio: "2025-06-17",
        dataPrevista: "2025-06-22",
      },
    ],

    fluxoCompleto: [
      { mes: "Jan/2025", quantidade: 1200 },
      { mes: "Fev/2025", quantidade: 1100 },
      { mes: "Mar/2025", quantidade: 1400 },
      { mes: "Abr/2025", quantidade: 1000 },
      { mes: "Mai/2025", quantidade: 1350 },
      { mes: "Jun/2025", quantidade: 1600 },
    ],
  },
  {
    id: "2",
    foto: "FotoPredio2",
    nome: "The members",
    dataCriacao: "2024-03-21",
    qtdAndares: "3",
    qtdCatracas: "2",
    qtdCameras: "10",
    qtdElevadores: "1",

    fluxoPessoas: {
      hora: 25,
      dia: 300,
      semana: 1500,
      mes: 6000,
    },

    entradasESaidas: [
      {
        foto: "FotoPessoa1",
        nome: "João Silva",
        entrou: false,
        saiu: true,
        cpf: "987.654.321-00",
        rg: "98.765.432-1",
        sobrenome: "Souza",
        telefone: "(21) 99876-5432",
        cep: "22040-002",
        estado: "RJ",
        cidade: "Rio de Janeiro",
        bairro: "Copacabana",
        rua: "Avenida Atlântica",
        numero: "456",
        qrCode: "987654",
        dataCadastro: "2023-07-22T09:15:00Z",
      },
      {
        foto: "FotoPessoa2",
        nome: "Maria Souza",
        entrou: true,
        saiu: false,
        cpf: "987.654.321-00",
        rg: "98.765.432-1",
        sobrenome: "Souza",
        telefone: "(21) 99876-5432",
        cep: "22040-002",
        estado: "RJ",
        cidade: "Rio de Janeiro",
        bairro: "Copacabana",
        rua: "Avenida Atlântica",
        numero: "456",
        qrCode: "987654",
        dataCadastro: "2023-07-22T09:15:00Z",
      },
    ],

    equipamentosQuebrados: [
      {
        tipo: "Câmera",
        status: "Baixo",
        custo: "R$ 200,00",
      },
      {
        tipo: "Catraca",
        status: "Moderado",
        custo: "R$ 400,00",
      },
      {
        tipo: "Catraca",
        status: "Grave",
        custo: "R$ 400,00",
      },
    ],

    equipamentosManutencao: [
      {
        tipo: "Elevador",
        dataInicio: "2025-06-15",
        dataPrevista: "2025-06-20",
      },
      {
        tipo: "Câmera",
        dataInicio: "2025-06-17",
        dataPrevista: "2025-06-22",
      },
    ],

    fluxoCompleto: [
      { mes: "Jan/2025", quantidade: 1200 },
      { mes: "Fev/2025", quantidade: 1100 },
      { mes: "Mar/2025", quantidade: 1400 },
      { mes: "Abr/2025", quantidade: 1000 },
      { mes: "Mai/2025", quantidade: 1350 },
      { mes: "Jun/2025", quantidade: 1600 },
    ],
  },
  {
    id: "3",
    foto: "FotoPredio3",
    nome: "Empire State",
    dataCriacao: "2024-12-07",
    qtdAndares: "3",
    qtdCatracas: "2",
    qtdCameras: "10",
    qtdElevadores: "1",

    fluxoPessoas: {
      hora: 25,
      dia: 300,
      semana: 1500,
      mes: 6000,
    },

    entradasESaidas: [
      {
        foto: "FotoPessoa1",
        nome: "João Silva",
        entrou: false,
        saiu: true,
        cpf: "987.654.321-00",
        rg: "98.765.432-1",
        sobrenome: "Souza",
        telefone: "(21) 99876-5432",
        cep: "22040-002",
        estado: "RJ",
        cidade: "Rio de Janeiro",
        bairro: "Copacabana",
        rua: "Avenida Atlântica",
        numero: "456",
        qrCode: "987654",
        dataCadastro: "2023-07-22T09:15:00Z",
      },
      {
        foto: "FotoPessoa2",
        nome: "Maria Souza",
        entrou: true,
        saiu: false,
        cpf: "987.654.321-00",
        rg: "98.765.432-1",
        sobrenome: "Souza",
        telefone: "(21) 99876-5432",
        cep: "22040-002",
        estado: "RJ",
        cidade: "Rio de Janeiro",
        bairro: "Copacabana",
        rua: "Avenida Atlântica",
        numero: "456",
        qrCode: "987654",
        dataCadastro: "2023-07-22T09:15:00Z",
      },
    ],

    equipamentosQuebrados: [
      {
        tipo: "Câmera",
        status: "Baixo",
        custo: "R$ 200,00",
      },
      {
        tipo: "Catraca",
        status: "Moderado",
        custo: "R$ 400,00",
      },
      {
        tipo: "Catraca",
        status: "Grave",
        custo: "R$ 400,00",
      },
    ],

    equipamentosManutencao: [
      {
        tipo: "Elevador",
        dataInicio: "2025-06-15",
        dataPrevista: "2025-06-20",
      },
      {
        tipo: "Câmera",
        dataInicio: "2025-06-17",
        dataPrevista: "2025-06-22",
      },
    ],

    fluxoCompleto: [
      { mes: "Jan/2025", quantidade: 1200 },
      { mes: "Fev/2025", quantidade: 1100 },
      { mes: "Mar/2025", quantidade: 1400 },
      { mes: "Abr/2025", quantidade: 1000 },
      { mes: "Mai/2025", quantidade: 1350 },
      { mes: "Jun/2025", quantidade: 1600 },
    ],
  },
];

export const mockBalances = [
  {
    id: "1",
    tipo: "Manutenção",
    data: "24/04/2025",
    valor: "1000.0",
    hora: "12h00",
    saldoAtual: "3000",
  },
  {
    id: "1",
    tipo: "Compra",
    data: "30/04/2025",
    valor: "2000.0",
    hora: "18h00",
    saldoAtual: "3000",
  },
  {
    id: "1",
    tipo: "Pagamento",
    data: "27/08/2025",
    valor: "1000.0",
    hora: "21h00",
    saldoAtual: "3000",
  },
];
