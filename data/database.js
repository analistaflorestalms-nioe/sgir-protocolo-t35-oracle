/**
 * SGIR - Protocolo T35 [MODO SEGURO]
 * Base de Dados Simulada - Oracle v7.0
 * 
 * Dados mockados para demonstração do sistema
 */

// === CONFIGURAÇÃO DO SISTEMA ===
const systemConfig = {
  version: '7.0',
  codename: 'Oracle',
  environment: 'SECURE',
  protocol: 'T35'
};

// === BASE DE USUÁRIOS ===
const users = {
  "Aleluia": { 
    role: "Analista Industrial", 
    regional: "SP", 
    permissions: ['standard', 'industrial'],
    avatar: "A",
    email: "aleluia@sgir.com.br"
  },
  "Fábio": { 
    role: "Analista Florestal", 
    regional: "SP", 
    permissions: ['standard', 'florestal'],
    avatar: "F",
    email: "fabio@sgir.com.br"
  },
  "G. Silva": { 
    role: "Analista Florestal", 
    regional: "MS", 
    permissions: ['standard', 'florestal'],
    avatar: "G",
    email: "gsilva@sgir.com.br"
  },
  "Keven": { 
    role: "Analista Industrial", 
    regional: "BA", 
    permissions: ['standard', 'industrial'],
    avatar: "K",
    email: "keven@sgir.com.br"
  },
  "Geovana": { 
    role: "Analista Portuária", 
    regional: "SP-Porto", 
    permissions: ['standard', 'portuario'],
    avatar: "G",
    email: "geovana@sgir.com.br"
  },
  "Gideonis": { 
    role: "Supervisor Geral", 
    regional: "Global", 
    permissions: ['supervisor'],
    avatar: "GI",
    email: "gideonis@sgir.com.br"
  },
  "Laio": { 
    role: "Gerente Geral", 
    regional: "Global", 
    permissions: ['manager'],
    avatar: "L",
    email: "laio@sgir.com.br"
  },
  "Pithon": { 
    role: "Diretor", 
    regional: "Global", 
    permissions: ['director'],
    avatar: "P",
    email: "pithon@sgir.com.br"
  }
};

// === VERIFICAÇÕES DE BACKGROUND ===
const backgroundChecks = [
  { 
    id: 1, 
    name: "Carlos Pereira", 
    cpf: "123.456.789-00", 
    company: "TransLog", 
    status: "Comprometido", 
    regional: "SP", 
    registeredBy: "Fábio", 
    notes: "Visto em atividades suspeitas próximas aos ativos.",
    registeredAt: "2024-01-15",
    riskLevel: "Alto"
  },
  { 
    id: 2, 
    name: "Mariana Costa", 
    cpf: "987.654.321-00", 
    company: "Bracell (Orgânico)", 
    status: "Aprovado", 
    regional: "MS", 
    registeredBy: "G. Silva", 
    notes: "Sem antecedentes. Documentação em ordem.",
    registeredAt: "2024-01-10",
    riskLevel: "Baixo"
  },
  { 
    id: 3, 
    name: "José Almeida", 
    cpf: "111.222.333-44", 
    company: "GuardSecure", 
    status: "Aprovado", 
    regional: "SP", 
    registeredBy: "Aleluia", 
    notes: "Verificação completa. Histórico limpo.",
    registeredAt: "2024-01-08",
    riskLevel: "Baixo"
  },
  { 
    id: 4, 
    name: "Ana Beatriz", 
    cpf: "444.555.666-77", 
    company: "CleanFast", 
    status: "Em Análise", 
    regional: "BA", 
    registeredBy: "Keven", 
    notes: "Aguardando certidões negativas finais.",
    registeredAt: "2024-01-20",
    riskLevel: "Médio"
  }
];

// === DOCUMENTOS DE INTELIGÊNCIA ===
const intelDocuments = [
  { 
    id: "RELINT-001", 
    type: "RELINT", 
    title: "Atividade Suspeita Próxima à Fazenda A", 
    author: "Fábio", 
    regional: "SP", 
    status: "Aprovado", 
    content: "Monitoramento de veículo não identificado (Placa XYZ-1234) rondando a área de colheita durante horários noturnos. Indivíduo 'Carlos Pereira', funcionário da TransLog, foi observado em conversas com ocupantes do veículo. Avaliação indica potencial risco de furto de madeira ou sabotagem de equipamentos. Recomenda-se intensificação do patrulhamento noturno e monitoramento contínuo do suspeito.", 
    sharedWith: ["MS"],
    createdAt: "2024-01-16",
    priority: "Alta",
    classification: "Confidencial"
  },
  { 
    id: "RELINFO-002", 
    type: "RELINFO", 
    title: "Bloqueio de Rodovia BR-163", 
    author: "G. Silva", 
    regional: "MS", 
    status: "Aprovado", 
    content: "Fonte confiável reporta possível manifestação do sindicato dos transportadores programada para a próxima semana na BR-163, km 485. A ação pode impactar significativamente a logística de escoamento da produção de celulose. Estimativa de duração: 48-72 horas. Recomenda-se acionamento de rotas alternativas e comunicação prévia com clientes sobre possíveis atrasos.", 
    sharedWith: ["SP"],
    createdAt: "2024-01-14",
    priority: "Média",
    classification: "Restrito"
  },
  { 
    id: "TRACK-SEP-W1", 
    type: "Tracking", 
    title: "Tracking Semanal - Setembro S1", 
    author: "G. Silva", 
    regional: "MS", 
    status: "Pendente", 
    content: "Resumo de inteligência da primeira semana de setembro: (1) Aumento de 12% no preço do diesel impacta diretamente custos de frete. (2) Governo de MS anuncia novo pacote de infraestrutura rodoviária com investimento de R$ 2,3 bi. (3) Queimadas na região do Pantanal registram alta de 20% comparado ao mesmo período do ano anterior. (4) Greve de caminhoneiros em discussão para próxima quinzena. (5) Preço da celulose no mercado internacional apresenta estabilidade.", 
    sharedWith: [],
    createdAt: "2024-09-07",
    priority: "Baixa",
    classification: "Interno"
  },
  { 
    id: "CLIP-015", 
    type: "Clipping", 
    title: "Clipping Nacional e Internacional", 
    author: "Fábio", 
    regional: "SP", 
    status: "Em Análise", 
    content: "Análise de impacto das mudanças no mercado asiático de celulose na competitividade da Bracell. Relatórios indicam queda de 8% na demanda chinesa devido a políticas ambientais mais restritivas. Mercado europeu apresenta crescimento de 3%, mas com exigências de certificação mais rigorosas. Recomenda-se diversificação de mercados e investimento em certificações sustentáveis para manutenção da competitividade.", 
    sharedWith: ["MS", "BA"],
    createdAt: "2024-01-12",
    priority: "Média",
    classification: "Confidencial"
  },
  { 
    id: "RELINFO-003", 
    type: "RELINFO", 
    title: "Atividade Portuária Incomum", 
    author: "Geovana", 
    regional: "SP-Porto", 
    status: "Aprovado", 
    content: "Detectado aumento significativo de drones não autorizados sobrevoando terminal portuário durante período noturno (22h-04h). Equipamentos apresentam características de uso comercial/industrial, não recreativo. Possível atividade de espionagem industrial ou reconnaissance de concorrentes. Implementadas medidas de contramedidas eletrônicas e intensificado patrulhamento. Recomenda-se investigação sobre origem dos equipamentos.", 
    sharedWith: ["SP"],
    createdAt: "2024-01-18",
    priority: "Alta",
    classification: "Confidencial"
  }
];

// === TAREFAS ===
const tasks = [
  { 
    id: 1, 
    title: "Aprovar TRACK-SEP-W1", 
    assignedTo: "Gideonis", 
    status: "Pendente", 
    regional: "Global", 
    priority: "Alta",
    description: "Revisar e aprovar relatório semanal de tracking para distribuição às regionais.",
    dueDate: "2024-09-15",
    createdAt: "2024-09-08"
  },
  { 
    id: 2, 
    title: "Monitorar Carlos Pereira", 
    assignedTo: "Fábio", 
    status: "Em Andamento", 
    regional: "SP", 
    priority: "Crítica",
    description: "Manter vigilância discreta sobre atividades do suspeito próximo aos ativos florestais.",
    dueDate: "2024-09-20",
    createdAt: "2024-09-05"
  },
  { 
    id: 3, 
    title: "Coletar informações sobre sindicato", 
    assignedTo: "G. Silva", 
    status: "Em Andamento", 
    regional: "MS", 
    priority: "Média",
    description: "Obter detalhes sobre possível manifestação na BR-163 através de fontes locais.",
    dueDate: "2024-09-12",
    createdAt: "2024-09-06"
  },
  { 
    id: 4, 
    title: "Finalizar Background Check de Ana Beatriz", 
    assignedTo: "Keven", 
    status: "Pendente", 
    regional: "BA", 
    priority: "Baixa",
    description: "Aguardar documentação final e emitir parecer sobre contratação.",
    dueDate: "2024-09-18",
    createdAt: "2024-09-03"
  },
  { 
    id: 5, 
    title: "Revisar segurança contra drones", 
    assignedTo: "Geovana", 
    status: "Concluída", 
    regional: "SP-Porto", 
    priority: "Alta",
    description: "Implementar contramedidas eletrônicas e protocolos de resposta a incursões aéreas.",
    dueDate: "2024-09-10",
    createdAt: "2024-09-01",
    completedAt: "2024-09-09"
  }
];

// === OCORRÊNCIAS NO MAPA ===
const occurrences = [
  { 
    id: 1, 
    type: "furto", 
    lat: -22.3146, 
    lon: -49.058, 
    regional: "SP", 
    description: "Furto de 500L de diesel de maquinário florestal durante madrugada. Autores não identificados.",
    reportedAt: "2024-09-05T03:30:00Z",
    severity: "Média",
    status: "Investigando"
  },
  { 
    id: 2, 
    type: "incendio_criminoso", 
    lat: -20.468, 
    lon: -54.622, 
    regional: "MS", 
    description: "Foco de incêndio de origem criminosa contido pela brigada. Área afetada: 2 hectares de eucalipto jovem.",
    reportedAt: "2024-09-03T14:20:00Z",
    severity: "Alta",
    status: "Resolvido"
  },
  { 
    id: 3, 
    type: "invasao", 
    lat: -22.35, 
    lon: -49.1, 
    regional: "SP", 
    description: "Invasão de propriedade por grupo de caçadores. Interceptados pela segurança privada.",
    reportedAt: "2024-09-07T19:45:00Z",
    severity: "Baixa",
    status: "Resolvido"
  },
  { 
    id: 4, 
    type: "acidente", 
    lat: -12.97, 
    lon: -38.5, 
    regional: "BA", 
    description: "Acidente envolvendo caminhão da frota carregado com celulose na BR-101. Sem feridos.",
    reportedAt: "2024-09-06T11:15:00Z",
    severity: "Média",
    status: "Resolvido"
  },
  { 
    id: 5, 
    type: "suspeita", 
    lat: -23.99, 
    lon: -46.3, 
    regional: "SP-Porto", 
    description: "Atividade suspeita de drone sobrevoando terminal durante operação noturna.",
    reportedAt: "2024-09-08T02:10:00Z",
    severity: "Alta",
    status: "Investigando"
  },
  { 
    id: 6, 
    type: "ambiental", 
    lat: -20.5, 
    lon: -54.7, 
    regional: "MS", 
    description: "Descarte irregular de resíduos químicos próximo a nascente. Acionado órgão ambiental.",
    reportedAt: "2024-09-04T08:30:00Z",
    severity: "Alta",
    status: "Em Andamento"
  }
];

// === NOTÍCIAS OSINT ===
const osintNews = [
  { 
    title: "Bracell anuncia novo investimento em SP", 
    source: "Valor Econômico", 
    regional: "SP", 
    keywords: ["Investimento", "Celulose", "Expansão"], 
    content: "A Bracell confirmou um novo ciclo de investimentos na sua planta industrial em Lençóis Paulista (SP), visando aumentar a capacidade de produção em 15% nos próximos dois anos. O investimento de R$ 800 milhões incluirá modernização de equipamentos e ampliação da linha de produção. A empresa espera gerar 300 novos empregos diretos durante a fase de implementação.",
    publishedAt: "2024-09-08T10:30:00Z",
    impact: "Positivo",
    relevance: "Alta"
  },
  { 
    title: "Logística na BR-163 em MS é desafio para setor florestal", 
    source: "Correio do Estado", 
    regional: "MS", 
    keywords: ["Logística", "Transporte", "Infraestrutura"], 
    content: "Produtores de celulose de Mato Grosso do Sul apontam as condições precárias da BR-163 como o principal gargalo logístico para o escoamento da produção até os portos. Trechos em obras há mais de dois anos causam atrasos de até 6 horas no transporte. Setor pede urgência na conclusão das obras federais.",
    publishedAt: "2024-09-07T16:45:00Z",
    impact: "Negativo",
    relevance: "Alta"
  },
  { 
    title: "Porto de Santos bate recorde de movimentação de celulose", 
    source: "A Tribuna", 
    regional: "SP-Porto", 
    keywords: ["Logística", "Porto", "Exportação"], 
    content: "O Porto de Santos registrou um aumento de 22% na movimentação de celulose no último trimestre, impulsionado pela alta demanda internacional e pela conclusão de melhorias na infraestrutura portuária. O volume chegou a 2,8 milhões de toneladas, estabelecendo novo recorde histórico para o período.",
    publishedAt: "2024-09-06T14:20:00Z",
    impact: "Positivo",
    relevance: "Alta"
  },
  { 
    title: "Governo da Bahia discute incentivos para indústria de papel e celulose", 
    source: "Correio da Bahia", 
    regional: "BA", 
    keywords: ["Política", "Legislação", "Incentivos"], 
    content: "Uma nova proposta de incentivos fiscais para o setor de papel e celulose está em pauta na assembleia legislativa da Bahia. O projeto prevê redução de 60% no ICMS para empresas que investirem em tecnologias sustentáveis e geração de energia renovável. Setor vê iniciativa como oportunidade para atrair novos investimentos.",
    publishedAt: "2024-09-05T09:15:00Z",
    impact: "Positivo",
    relevance: "Média"
  },
  { 
    title: "Sindicato dos caminhoneiros ameaça nova paralisação", 
    source: "Agência Brasil", 
    regional: "Global", 
    keywords: ["Sindicato", "Transporte", "Greve"], 
    content: "Lideranças do sindicato dos caminhoneiros criticam o aumento do preço do diesel e não descartam uma nova paralisação nacional nas próximas duas semanas. A categoria pede tabela de frete mínimo e subsídio para combustível. Setores dependentes de logística rodoviária demonstram preocupação com possíveis impactos.",
    publishedAt: "2024-09-04T18:30:00Z",
    impact: "Negativo",
    relevance: "Crítica"
  },
  { 
    title: "ONG aponta aumento de desmatamento ilegal em MS", 
    source: "G1", 
    regional: "MS", 
    keywords: ["Ambiental", "Movimentos Sociais", "Sustentabilidade"], 
    content: "Relatório de ONG ambiental indica um aumento de 30% no desmatamento ilegal em áreas próximas a plantações de eucalipto em MS. A organização pede maior fiscalização e responsabilização de empresas do setor. Governo estadual nega irregularidades e destaca programas de monitoramento.",
    publishedAt: "2024-09-03T12:00:00Z",
    impact: "Negativo",
    relevance: "Média"
  }
];

// === ATIVOS ESTRATÉGICOS ===
const assets = [
  { 
    id: 'bracell-sp', 
    name: 'Bracell Industrial SP', 
    lat: -22.61, 
    lon: -48.78, 
    type: 'industrial',
    description: 'Unidade industrial principal - Lençóis Paulista',
    capacity: '1.5M tons/ano',
    employees: 1200,
    securityLevel: 'Alto'
  },
  { 
    id: 'bracell-ba', 
    name: 'Bracell Industrial BA', 
    lat: -12.75, 
    lon: -38.31, 
    type: 'industrial',
    description: 'Unidade industrial - Camaçari',
    capacity: '1.3M tons/ano',
    employees: 980,
    securityLevel: 'Alto'
  },
  { 
    id: 'ms-florestal', 
    name: 'MS Florestal', 
    lat: -20.77, 
    lon: -51.65, 
    type: 'florestal',
    description: 'Base florestal - Três Lagoas',
    area: '250.000 hectares',
    employees: 450,
    securityLevel: 'Médio'
  },
  { 
    id: 'porto-santos', 
    name: 'Terminal Porto de Santos', 
    lat: -23.98, 
    lon: -46.31, 
    type: 'portuario',
    description: 'Terminal portuário especializado',
    capacity: '3M tons/ano',
    employees: 320,
    securityLevel: 'Alto'
  }
];

// === DADOS CLIMÁTICOS ===
const weatherData = {
  SP: { 
    temp: 28, 
    humidity: 45, 
    wind: 15, 
    risk: "Elevado",
    forecast: "Tempo seco com ventos moderados. Risco de incêndio aumentado.",
    lastUpdate: "2024-09-09T08:00:00Z"
  },
  MS: { 
    temp: 32, 
    humidity: 30, 
    wind: 25, 
    risk: "Crítico",
    forecast: "Tempo muito seco com ventos fortes. Máxima atenção para prevenção de incêndios.",
    lastUpdate: "2024-09-09T08:00:00Z"
  },
  BA: { 
    temp: 30, 
    humidity: 60, 
    wind: 10, 
    risk: "Moderado",
    forecast: "Tempo estável com umidade adequada. Condições favoráveis.",
    lastUpdate: "2024-09-09T08:00:00Z"
  },
  'SP-Porto': { 
    temp: 25, 
    humidity: 75, 
    wind: 20, 
    risk: "Baixo",
    forecast: "Tempo úmido típico da região costeira. Condições normais para operação portuária.",
    lastUpdate: "2024-09-09T08:00:00Z"
  },
  Global: { 
    temp: '--', 
    humidity: '--', 
    wind: '--', 
    risk: "N/A",
    forecast: "Dados agregados não disponíveis.",
    lastUpdate: "2024-09-09T08:00:00Z"
  }
};

// === EXPORT DOS DADOS ===
const database = {
  users,
  backgroundChecks,
  intelDocuments,
  tasks,
  occurrences,
  osintNews,
  assets,
  weatherData,
  systemConfig
};

// Para compatibilidade com diferentes sistemas de módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = database;
}

if (typeof window !== 'undefined') {
  window.database = database;
}
