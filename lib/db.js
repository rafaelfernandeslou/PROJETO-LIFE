/**
 * Life & Health Web - Sistema de Banco de Dados Relacional e Persistente
 * Suporta Next.js (SSR safe fallback + Browser localStorage persistente + Sincronização Reativa)
 */

const DB_PREFIX = "lifehealth_db_";
const TABLES = ["usuarios", "agendamentos", "medicos", "produtos", "pedidos"];
const SESSION_KEY = "lifehealth_sessao_ativa";

// Dados iniciais padrão (Seed completo para teste e demonstração imediata)
export const DADOS_INICIAIS = {
  usuarios: [
    {
      id: 1,
      nome: "Administrador Life & Health",
      email: "admin@lifehealth.com",
      telefone: "(11) 99999-1111",
      senha: "admin123",
      tipo: "admin",
      criadoEm: "2026-01-01T08:00:00.000Z",
    },
    {
      id: 2,
      nome: "Maria Silva Oliveira",
      email: "paciente@lifehealth.com",
      telefone: "(11) 98765-4321",
      senha: "123456",
      tipo: "paciente",
      criadoEm: "2026-01-10T10:30:00.000Z",
    },
    {
      id: 3,
      nome: "Carlos Eduardo Souza",
      email: "carlos.souza@gmail.com",
      telefone: "(11) 97123-4567",
      senha: "123456",
      tipo: "paciente",
      criadoEm: "2026-01-15T14:20:00.000Z",
    },
  ],

  medicos: [
    {
      id: 1,
      nome: "Dr. Roberto Alvarez",
      crm: "CRM/SP 123456",
      especialidade: "Clínica Geral",
      avaliacao: 4.9,
      totalAvaliacoes: 128,
      experiencia: "14 anos de experiência",
      formacao: "Faculdade de Medicina da USP",
      valorConsulta: 180,
      atendimento: "Presencial e Online",
      dias: "Segunda a Sexta",
      horarios: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      bio: "Especialista em medicina preventiva, check-up integral e acompanhamento contínuo da saúde da família.",
      foto: "👨‍⚕️",
    },
    {
      id: 2,
      nome: "Dra. Juliana Costa",
      crm: "CRM/SP 987654",
      especialidade: "Cardiologia",
      avaliacao: 5.0,
      totalAvaliacoes: 184,
      experiencia: "12 anos de experiência",
      formacao: "Instituto do Coração (InCor) - HCFMUSP",
      valorConsulta: 250,
      atendimento: "Presencial e Online",
      dias: "Terça, Quinta e Sexta",
      horarios: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00", "17:00"],
      bio: "Foco em prevenção cardiovascular, controle de hipertensão, arritmias e exames de ecocardiograma.",
      foto: "👩‍⚕️",
    },
    {
      id: 3,
      nome: "Dr. André Martins",
      crm: "CRM/SP 456789",
      especialidade: "Ortopedia",
      avaliacao: 4.8,
      totalAvaliacoes: 96,
      experiencia: "10 anos de experiência",
      formacao: "Universidade Federal de São Paulo (UNIFESP)",
      valorConsulta: 220,
      atendimento: "Presencial",
      dias: "Segunda, Quarta e Sexta",
      horarios: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      bio: "Traumatologia esportiva, dores articulares na coluna, ombro e joelhos, com abordagem integrativa.",
      foto: "👨‍⚕️",
    },
    {
      id: 4,
      nome: "Dra. Camila Fernandes",
      crm: "CRN-3 54321",
      especialidade: "Nutrição",
      avaliacao: 4.9,
      totalAvaliacoes: 142,
      experiencia: "8 anos de experiência",
      formacao: "Universidade Estadual de Campinas (UNICAMP)",
      valorConsulta: 160,
      atendimento: "Presencial e Online",
      dias: "Terça a Sábado",
      horarios: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      bio: "Nutrição clínica funcional, reeducação alimentar sustentável, emagrecimento saudável e ganho de massa.",
      foto: "👩‍⚕️",
    },
    {
      id: 5,
      nome: "Dr. Lucas Ribeiro",
      crm: "CREFITO-3 78912",
      especialidade: "Fisioterapia",
      avaliacao: 4.9,
      totalAvaliacoes: 110,
      experiencia: "9 anos de experiência",
      formacao: "Pontifícia Universidade Católica (PUC-SP)",
      valorConsulta: 170,
      atendimento: "Presencial",
      dias: "Segunda a Quinta",
      horarios: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
      bio: "Reabilitação ortopédica e postural, alívio de dores crônicas, recuperação funcional e pilates clínico.",
      foto: "👨‍⚕️",
    },
    {
      id: 6,
      nome: "Dra. Beatriz Moreira",
      crm: "CRP 06/65432",
      especialidade: "Psicologia",
      avaliacao: 5.0,
      totalAvaliacoes: 156,
      experiencia: "11 anos de experiência",
      formacao: "Universidade de São Paulo (USP)",
      valorConsulta: 190,
      atendimento: "Online e Presencial",
      dias: "Segunda a Sexta",
      horarios: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
      bio: "Terapia Cognitivo-Comportamental (TCC) para ansiedade, estresse, autoconhecimento e desenvolvimento pessoal.",
      foto: "👩‍⚕️",
    },
  ],

  agendamentos: [
    {
      id: 1,
      pacienteNome: "Maria Silva Oliveira",
      pacienteEmail: "paciente@lifehealth.com",
      pacienteTelefone: "(11) 98765-4321",
      medicoId: 2,
      medicoNome: "Dra. Juliana Costa",
      especialidade: "Cardiologia",
      modalidade: "Presencial",
      data: "2026-11-10",
      horario: "09:00",
      observacoes: "Check-up preventivo anual e acompanhamento cardiovascular de rotina.",
      status: "Confirmado",
      criadoEm: "2026-10-20T14:30:00.000Z",
    },
    {
      id: 2,
      pacienteNome: "Maria Silva Oliveira",
      pacienteEmail: "paciente@lifehealth.com",
      pacienteTelefone: "(11) 98765-4321",
      medicoId: 5,
      medicoNome: "Dr. Lucas Ribeiro",
      especialidade: "Fisioterapia",
      modalidade: "Presencial",
      data: "2026-11-14",
      horario: "14:00",
      observacoes: "Sessão de reabilitação e fortalecimento da região lombar.",
      status: "Confirmado",
      criadoEm: "2026-10-21T09:15:00.000Z",
    },
    {
      id: 3,
      pacienteNome: "Carlos Eduardo Souza",
      pacienteEmail: "carlos.souza@gmail.com",
      pacienteTelefone: "(11) 97123-4567",
      medicoId: 1,
      medicoNome: "Dr. Roberto Alvarez",
      especialidade: "Clínica Geral",
      modalidade: "Online",
      data: "2026-11-05",
      horario: "10:00",
      observacoes: "Avaliação de exames de sangue recentes e orientação nutricional inicial.",
      status: "Pendente",
      criadoEm: "2026-10-22T16:45:00.000Z",
    },
  ],

  produtos: [
    {
      id: 1,
      nome: "Colágeno Hidrolisado Verisol Plus",
      categoria: "Suplementos",
      preco: 119.9,
      precoOriginal: 149.9,
      desconto: "20% OFF",
      descricao: "Peptídeos bioativos de colágeno enriquecido com biotina, zinco e vitamina C. Fortalecimento da pele, unhas e articulações.",
      icone: "🧬",
      avaliacao: 4.9,
      totalAvaliacoes: 89,
      estoque: 45,
    },
    {
      id: 2,
      nome: "Whey Protein Isolado 100% Puro (900g)",
      categoria: "Nutrição",
      preco: 169.9,
      precoOriginal: 199.9,
      desconto: "15% OFF",
      descricao: "Proteína de altíssimo valor biológico e rápida absorção. Zero lactose, zero glúten com 27g de proteína por porção.",
      icone: "🥛",
      avaliacao: 5.0,
      totalAvaliacoes: 134,
      estoque: 30,
    },
    {
      id: 3,
      nome: "Polivitamínico A-Z Ultra Concentrado",
      categoria: "Vitaminas",
      preco: 59.9,
      precoOriginal: 79.9,
      desconto: "25% OFF",
      descricao: "Complexo completo com 23 vitaminas e minerais essenciais. Máxima imunidade, energia e suporte antioxidante.",
      icone: "💊",
      avaliacao: 4.8,
      totalAvaliacoes: 62,
      estoque: 80,
    },
    {
      id: 4,
      nome: "Ômega 3 TG 1000mg Ultra Puro (120 caps)",
      categoria: "Saúde Cardiovascular",
      preco: 89.9,
      precoOriginal: 110.0,
      desconto: "18% OFF",
      descricao: "Óleo de peixe de águas frias, rico em EPA e DHA. Certificação internacional de pureza livre de metais pesados.",
      icone: "🐟",
      avaliacao: 4.9,
      totalAvaliacoes: 77,
      estoque: 50,
    },
    {
      id: 5,
      nome: "Kit Faixas Elásticas de Resistência (5 intensidades)",
      categoria: "Reabilitação & Fisioterapia",
      preco: 49.9,
      precoOriginal: 69.9,
      desconto: "28% OFF",
      descricao: "Conjunto completo com 5 níveis de resistência látex 100% natural. Perfeito para fisioterapia, pilates e treino em casa.",
      icone: "🎗️",
      avaliacao: 4.7,
      totalAvaliacoes: 41,
      estoque: 60,
    },
    {
      id: 6,
      nome: "Medidor de Pressão Arterial Digital Automático",
      categoria: "Equipamentos Médicos",
      preco: 149.9,
      precoOriginal: 189.9,
      desconto: "21% OFF",
      descricao: "Monitor de braço com display LCD iluminado, detecção de arritmia cardíaca e memória para 90 medições com data e hora.",
      icone: "🩺",
      avaliacao: 5.0,
      totalAvaliacoes: 58,
      estoque: 25,
    },
  ],

  pedidos: [
    {
      id: 1001,
      usuarioId: 2,
      clienteNome: "Maria Silva Oliveira",
      clienteEmail: "paciente@lifehealth.com",
      itens: [
        {
          nome: "Colágeno Hidrolisado Verisol Plus",
          preco: 119.9,
          quantidade: 1,
        },
      ],
      total: 119.9,
      status: "Aprovado",
      data: "2026-10-18",
      criadoEm: "2026-10-18T11:20:00.000Z",
    },
  ],
};

function isClient() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function initDB() {
  if (!isClient()) return;

  TABLES.forEach((tabela) => {
    const storageKey = DB_PREFIX + tabela;
    const existente = localStorage.getItem(storageKey);
    if (!existente || existente === "[]" || existente === "null") {
      localStorage.setItem(
        storageKey,
        JSON.stringify(DADOS_INICIAIS[tabela] || [])
      );
    }
  });
}

export function tabela(nome) {
  if (!TABLES.includes(nome)) {
    throw new Error(`Tabela "${nome}" não existe no banco de dados.`);
  }
  const storageKey = DB_PREFIX + nome;

  function lerDados() {
    if (!isClient()) {
      return DADOS_INICIAIS[nome] || [];
    }
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) {
        const seed = DADOS_INICIAIS[nome] || [];
        localStorage.setItem(storageKey, JSON.stringify(seed));
        return seed;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error(`Erro ao ler tabela ${nome}:`, e);
      return DADOS_INICIAIS[nome] || [];
    }
  }

  function salvarDados(dados) {
    if (!isClient()) return;
    localStorage.setItem(storageKey, JSON.stringify(dados));
    window.dispatchEvent(
      new CustomEvent("lifehealth_db_change", { detail: { tabela: nome } })
    );
  }

  return {
    listar: function (filtroFn) {
      const dados = lerDados();
      return typeof filtroFn === "function" ? dados.filter(filtroFn) : dados;
    },

    obterPorId: function (id) {
      const dados = lerDados();
      return dados.find((item) => String(item.id) === String(id)) || null;
    },

    inserir: function (novoItem) {
      const dados = lerDados();
      if (!novoItem.id) {
        const maxId = dados.reduce(
          (max, item) => Math.max(max, Number(item.id) || 0),
          0
        );
        novoItem.id = maxId > 0 ? maxId + 1 : Date.now();
      }
      if (!novoItem.criadoEm) {
        novoItem.criadoEm = new Date().toISOString();
      }
      const atualizados = [novoItem, ...dados];
      salvarDados(atualizados);
      return novoItem;
    },

    atualizar: function (id, camposAtualizados) {
      const dados = lerDados();
      const index = dados.findIndex((item) => String(item.id) === String(id));
      if (index === -1) return null;
      dados[index] = { ...dados[index], ...camposAtualizados };
      salvarDados(dados);
      return dados[index];
    },

    deletar: function (id) {
      let dados = lerDados();
      const initialLength = dados.length;
      dados = dados.filter((item) => String(item.id) !== String(id));
      if (dados.length !== initialLength) {
        salvarDados(dados);
        return true;
      }
      return false;
    },

    contar: function () {
      return lerDados().length;
    },
  };
}

export function autenticar(email, senha) {
  const usuarios = tabela("usuarios").listar();
  const user = usuarios.find(
    (u) =>
      u.email.toLowerCase().trim() === email.toLowerCase().trim() &&
      String(u.senha).trim() === String(senha).trim()
  );

  if (user) {
    const sessaoData = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      tipo: user.tipo || "paciente",
      telefone: user.telefone || "",
      loginEm: new Date().toISOString(),
    };
    if (isClient()) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessaoData));
      window.dispatchEvent(
        new CustomEvent("lifehealth_auth_change", { detail: sessaoData })
      );
    }
    return { sucesso: true, usuario: sessaoData };
  }
  return { sucesso: false, mensagem: "E-mail ou senha incorretos." };
}

export function cadastrarUsuario(dados) {
  const usuarios = tabela("usuarios").listar();
  const existe = usuarios.some(
    (u) => u.email.toLowerCase().trim() === dados.email.toLowerCase().trim()
  );

  if (existe) {
    return {
      sucesso: false,
      mensagem: "Este e-mail já está cadastrado em nosso sistema!",
    };
  }

  const novoUsuario = tabela("usuarios").inserir({
    nome: dados.nome.trim(),
    email: dados.email.toLowerCase().trim(),
    telefone: dados.telefone ? dados.telefone.trim() : "",
    senha: dados.senha,
    tipo: "paciente",
  });

  const sessaoData = {
    id: novoUsuario.id,
    nome: novoUsuario.nome,
    email: novoUsuario.email,
    tipo: novoUsuario.tipo,
    telefone: novoUsuario.telefone,
    loginEm: new Date().toISOString(),
  };

  if (isClient()) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessaoData));
    window.dispatchEvent(
      new CustomEvent("lifehealth_auth_change", { detail: sessaoData })
    );
  }

  return { sucesso: true, usuario: sessaoData };
}

export function obterUsuarioLogado() {
  if (!isClient()) return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function fazerLogout() {
  if (!isClient()) return;
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(
    new CustomEvent("lifehealth_auth_change", { detail: null })
  );
}

export function resetarBancoParaPadrao() {
  if (!isClient()) return;
  TABLES.forEach((tabelaNome) => {
    localStorage.setItem(
      DB_PREFIX + tabelaNome,
      JSON.stringify(DADOS_INICIAIS[tabelaNome] || [])
    );
  });
  window.dispatchEvent(
    new CustomEvent("lifehealth_db_change", { detail: { tabela: "all" } })
  );
}

export const DB = {
  init: initDB,
  tabela,
  tabelasDisponiveis: () => [...TABLES],
  autenticar,
  cadastrarUsuario,
  obterUsuarioLogado,
  fazerLogout,
  resetarPadrao: resetarBancoParaPadrao,
};

// Inicialização automática se estiver no cliente
if (isClient()) {
  initDB();
  window.DB = DB;
}

export default DB;
