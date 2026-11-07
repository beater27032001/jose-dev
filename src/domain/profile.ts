// Fonte única dos fatos do portfólio (CV + josepaivadev.com, ver PRODUCT.md).

export const PERSON = {
  name: 'José Paiva',
  fullName: 'José Carlos Paiva Santos',
  role: 'Engenheiro de Software Full-Stack',
  level: 'Pleno',
  company: 'SouvTech',
  city: 'Recife, PE',
  photo: '/eu.png',
}

export const CONTACT = {
  email: 'josecarlospaivasantos2001@gmail.com',
  linkedin: 'https://www.linkedin.com/in/josec-paivas',
  github: 'https://github.com/beater27032001',
  cv: '/cv-jose-paiva.pdf',
}

export const NUMBERS = [
  '2 anos em produção',
  '20+ projetos',
  '10+ tecnologias',
  '3000+ commits',
]

export interface Role {
  company: string
  title: string
  from: string
  to: string
  place: string
  done: string[]
}

export const EXPERIENCE: Role[] = [
  {
    company: 'SouvTech',
    title: 'Engenheiro de Software Full-Stack Pleno',
    from: '2026-10',
    to: 'atual',
    place: 'Recife',
    done: [
      'Aplicações web e mobile em produção com React Native, Expo, React, Next.js, Node.js, TypeScript e Firebase',
      'Serviços back-end com NestJS: arquitetura modular, injeção de dependências e APIs escaláveis',
      'Vários projetos ao mesmo tempo, como dev e como referência técnica em frentes específicas',
      'Code review, correção de bugs e melhorias de performance e manutenibilidade',
      'Deploys e manutenção em AWS, Vercel e Render',
    ],
  },
  {
    company: 'SouvTech',
    title: 'Engenheiro de Software Full-Stack Júnior (2 a 5)',
    from: '2025-08',
    to: '2026-10',
    place: 'Recife',
    done: [
      'Liderou a reformulação dos boilerplates web e mobile: dependências, arquitetura e módulos reutilizáveis que reduziram o tempo de setup de novos projetos',
      'Sistema de planejamento e otimização de produção (APS) com Python e OR-Tools: programação linear e restrições para scheduling e alocação de recursos',
      'Ciclo completo de um modelo de machine learning, do pré-processamento e feature engineering à avaliação e deploy',
      'Apps mobile com React Native, NativeWind, TanStack Query e Context API, publicados na App Store e na Google Play',
      'Validação de dados com Zod; ambientes Docker e PostgreSQL para APIs internas',
      'Evolução de serviços Node.js e NestJS com integrações de APIs de terceiros',
    ],
  },
  {
    company: 'SouvTech',
    title: 'Engenheiro de Software Full-Stack, estágio (nível 2 a 4)',
    from: '2024-10',
    to: '2025-07',
    place: 'Recife',
    done: [
      'Início no desenvolvimento web e mobile com React, React Native, Expo e Next.js, em times Scrum',
      'Promovido do nível 2 ao 4 e efetivado como Júnior',
    ],
  },
  {
    company: 'Colégio Visão',
    title: 'Técnico de Robótica',
    from: '2024-10',
    to: '2025-03',
    place: 'Recife',
    done: [
      'Ensino de programação e mecânica de robôs para alunos e equipe de competição',
      'Preparação da equipe para a First Lego League (FLL)',
    ],
  },
  {
    company: 'Colégio Visão',
    title: 'Estagiário de Educação Tecnológica',
    from: '2022-10',
    to: '2024-10',
    place: 'Recife',
    done: [
      'Ensino de robótica e apoio ao professor na sala maker',
      'Projetos educacionais e preparação para torneios',
    ],
  },
]

export const EDUCATION = [
  ['Análise e Desenvolvimento de Sistemas', 'Estácio', '2026, em andamento'],
  [
    'Técnico em Manutenção e Suporte em Informática',
    'SENAI Areias',
    '2021 a 2024',
  ],
  ['Desenvolvimento Full-Stack', 'Cubos Academy', '2024'],
  ['Desenvolvimento Full-Stack', 'Qualiti Innovative Learning', '2022'],
  ['Formação Acelerada em Techdesign Front-End', 'CESAR School', ''],
]

export const COURSES = {
  Alura: [
    'Git e GitHub',
    'JavaScript',
    'TypeScript',
    'React',
    'TDD',
    'POO',
    'Express',
    'Node.js',
    'Docker',
    'PostgreSQL',
  ],
  DIO: ['JavaScript', 'TypeScript', 'Spring Boot', 'APIs REST'],
}

export const STACK = {
  linguagens: ['TypeScript', 'JavaScript', 'Python', 'Java'],
  front: [
    'React',
    'Next.js',
    'Tailwind CSS',
    'TanStack Query',
    'React Hook Form',
    'Zod',
  ],
  mobile: ['React Native', 'Expo', 'NativeWind'],
  back: ['Node.js', 'NestJS', 'Express', 'Spring Boot', 'Prisma'],
  dados: ['PostgreSQL', 'MySQL', 'Firebase', 'OR-Tools'],
  deploy: ['AWS', 'Vercel', 'Render', 'Docker'],
  processo: ['Git', 'Scrum', 'Clean Code', 'TDD', 'CI/CD'],
}

export const ACHIEVEMENTS = [
  'Finalista do RiseUp, Porto Digital (dez/2024)',
  'Finalista do Kickoff, Porto Digital (jun/2024)',
  'Monitor de Programação Orientada a Objetos (set a dez/2024)',
  'Finalista da FLL, etapas regional e nacional (2023 a 2025)',
  'Líder e integrante do marketing da Evolt Racing UFRPE (2021 a 2023)',
]

export const LANGUAGES =
  'Português (nativo) · Inglês (intermediário) · Espanhol (básico)'

export interface Work {
  slug: string
  name: string
  where: string
  platforms: string[]
  description: string[]
  stack: string[]
  testimonial?: boolean
}

export const WORK: Work[] = [
  {
    slug: 'gestao-arquitetonica',
    name: 'Plataforma de Gestão Arquitetônica',
    where: 'SouvTech',
    platforms: ['web', 'mobile'],
    description: [
      'Sistema completo web e mobile desenvolvido para empresa de arquitetura.',
      'Painel administrativo com CRUD completo para arquitetos, colaboradores, campanhas, indicações e catálogos de produtos.',
      'App em que os arquitetos acompanham campanhas ativas, gerenciam indicações e acessam catálogos.',
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Firebase',
      'React Native',
      'Expo',
      'Tailwind CSS',
      'NativeWind',
    ],
  },
  {
    slug: 'relacionamento-pets',
    name: 'Aplicativo de Relacionamento para Pets',
    where: 'SouvTech',
    platforms: ['web', 'mobile'],
    description: [
      'Conecta pets (cachorros e gatos) por um sistema de match parecido com o Tinder.',
      'Painel administrativo para usuários, eventos e denúncias.',
      'App com cadastro de usuários e pets, match interativo, chat entre donos e eventos para encontros presenciais.',
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Firebase',
      'React Native',
      'Expo',
      'Tailwind CSS',
      'NativeWind',
    ],
  },
  {
    slug: 'startups-e-socios',
    name: 'Plataforma de Conexão para Startups e Sócios',
    where: 'SouvTech',
    platforms: ['web', 'mobile'],
    description: [
      'Conecta startups a potenciais sócios e colaboradores por um sistema de match.',
      'Cadastro como startup ou como sócio; parcerias por investimento ou troca de habilidades.',
      'Pagamentos integrados via Stripe e painel administrativo de usuários.',
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Firebase',
      'React Native',
      'Expo',
      'Tailwind CSS',
      'NativeWind',
      'Stripe',
    ],
  },
  {
    slug: 'educacao-gamificada',
    name: 'Plataforma de Educação Gamificada',
    where: 'SouvTech',
    platforms: ['web', 'mobile'],
    description: [
      'Painel administrativo com CRUD de módulos, lições e questões de vários tipos, além de gestão de usuários.',
      'App em formato de jogo: questões, trilhas de conhecimento, conquistas e dias de ofensiva.',
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Firebase',
      'React Native',
      'Expo',
      'Tailwind CSS',
      'NativeWind',
      'Stripe',
    ],
  },
  {
    slug: 'transparencia-municipal',
    name: 'Portal de Transparência Municipal',
    where: 'SouvTech',
    platforms: ['web'],
    description: [
      'Área administrativa para municípios, metas, notícias, eventos e vídeos.',
      'Gestores cadastram gastos públicos, realizações e estratégias para cumprir metas; a área pública permite consultar tudo isso.',
      'Integração com IA para resumo automático de documentos.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
  },
  {
    slug: 'novocred',
    name: 'NovoCred',
    where: 'Sous Clinic',
    platforms: ['android', 'ios'],
    description: [
      'App mobile para Android e iOS.',
      'Front em React Native, TypeScript e Tailwind, com várias integrações por APIs.',
      'Back-end com Node e Docker, preparado para testes e publicação nas lojas.',
    ],
    stack: ['React Native', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Docker'],
    testimonial: true,
  },
]

export interface Experiment {
  slug: string
  name: string
  idea: string
  stack: string[]
  site: string
}

export const github = (slug: string) =>
  `https://github.com/beater27032001/${slug}`

export const EXPERIMENTS: Experiment[] = [
  {
    slug: 'halcyon-h9',
    name: 'Halcyon H9',
    idea: 'Placa de vídeo fictícia que se desmonta em 3D conforme o scroll, com visão térmica.',
    stack: ['Next.js', 'React Three Fiber', 'Motion', 'Lenis'],
    site: 'https://halcyon-h9.vercel.app',
  },
  {
    slug: 'fio-modular',
    name: 'Fio Modular FM-6',
    idea: 'Sintetizador modular fictício: cabos com física que mudam o áudio de verdade.',
    stack: ['Next.js', 'Tone.js', 'Canvas', 'Motion'],
    site: 'https://fio-modular.vercel.app',
  },
  {
    slug: 'halo-lampada',
    name: 'Halo',
    idea: 'Lâmpada inteligente fictícia: a página começa apagada e o painel muda cor e brilho de verdade.',
    stack: ['Next.js', 'React Three Fiber', 'Motion'],
    site: 'https://halo-lampada.vercel.app',
  },
  {
    slug: 'takt-65',
    name: 'TAKT 65',
    idea: 'Teclado mecânico fictício em 3D e jogável, com som diferente para cada tipo de switch.',
    stack: ['Next.js', 'React Three Fiber', 'Web Audio API', 'Motion'],
    site: 'https://takt-65.vercel.app',
  },
  {
    slug: 'raiko',
    name: 'Raikō',
    idea: 'Anime fictício apresentado como mangá: capítulo de 11 páginas ilustradas, lido da direita para a esquerda.',
    stack: ['Next.js', 'Canvas', 'SVG', 'Motion', 'Lenis'],
    site: 'https://raiko-ashy.vercel.app',
  },
  {
    slug: 'lance-prancheta',
    name: 'Lance Prancheta',
    idea: 'Prancheta tática com jogadas animadas, narração passo a passo e jogadores arrastáveis.',
    stack: ['Next.js', 'SVG', 'Motion'],
    site: 'https://lance-prancheta.vercel.app',
  },
]

export const TESTIMONIAL = {
  author: 'André Campos',
  role: 'CEO, Sous Clinic',
  project: 'NovoCred',
  text: 'Eu gerenciei José Paiva no projeto NovoCred. Um projeto mobile tanto para Android quanto iOS e ele se demonstrou super capaz e atendeu muito mais que as necessidades. O desafio não foi simples, porém ele demonstrou segurança nas habilidades fullstack. No front, com habilidades em React Native, Typescript e Tailwind, demonstrou como podemos deixar uma interface simples para os usuários. Além disso, conseguiu trazer várias integrações para o aplicativo através de APIs. Com sua experiência em Node e Docker, garantimos que o back estava em ordem para poder testar e subir nas lojas virtuais. Com a organização dele conseguimos entregar dentro do prazo, com o que o cliente esperava, e uma solução estável e escalável. Super recomendo o seu trabalho!',
}

export const SERVICES = [
  [
    'Desenvolvimento Mobile',
    'Aplicativos móveis nativos e híbridos',
    'React Native, Expo, Firebase',
  ],
  [
    'Desenvolvimento Web',
    'Sites e aplicações web modernas e responsivas',
    'React, Next.js, TypeScript, Firebase',
  ],
  [
    'Desenvolvimento Back-end',
    'Servidores e APIs escaláveis',
    'Node.js, NestJS, Express, Docker, PostgreSQL',
  ],
  [
    'Desenvolvimento Full-Stack',
    'Soluções completas integrando front-end e back-end',
    'React, Node.js, TypeScript, Next.js',
  ],
]
