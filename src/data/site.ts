// ============================================================
// ALL SITE CONTENT LIVES HERE. Edit this file to update the site.
// Items marked TODO are placeholders to replace with real info.
// ============================================================

export const SITE = {
  name: 'Usman Shehu & Yahayah Adam',
  // Set VITE_SITE_URL in .env (see .env.example) to your real domain.
  url: ((import.meta.env.VITE_SITE_URL as string | undefined) || 'https://YOUR-DOMAIN.com').replace(/\/$/, ''),
  ogDefault: '/images/og-default.png',
  email: '', // TODO: business email, e.g. 'contact@yourdomain.com'. Leave '' to hide.
  twitter: '', // TODO: optional @handle for Twitter/X cards
};

export interface Social { label: string; url: string }
export interface Leadership { founderId: string; role: string }

export interface Founder {
  id: string;
  slug: string;
  name: string;
  alternateName?: string;
  otherNames?: string[]; // other names/handles people search for
  jobTitle: string;
  labels: string; // short label line shown under the name
  initials: string;
  // Drop your photo files in public/images/source/ and run `npm run images`,
  // then set photoReady to true.
  photo: string; // base path, no extension
  photoReady: boolean;
  photoAlt: string;
  summary: string;
  bio: string[];
  journey: string[];
  responsibilities: string[];
  skills: string[];
  knowsAbout: string[];
  otherEmployers?: string[];
  socials: Social[]; // TODO: add verified LinkedIn / GitHub / X links
  partnerId: string;
  metaTitle: string;
  metaDescription: string;
}

export const founders: Founder[] = [
  {
    id: 'usman',
    slug: 'usman-shehu',
    name: 'Usman Shehu',
    alternateName: 'Zannur',
    otherNames: ['ussydev'],
    jobTitle: 'CEO and Software Engineer',
    labels: 'CEO · Software Engineer · Entrepreneur',
    initials: 'US',
    photo: '/images/usman-shehu-zannur',
    photoReady: false,
    photoAlt: 'Usman Shehu, also known as Zannur, CEO, software engineer and entrepreneur',
    summary:
      'Technology entrepreneur and software engineer. CEO of Famzuk, founder of RankRush, and founder and chief engineer of Aniaja Company.',
    bio: [
      'Usman Shehu, professionally known as Zannur, is a technology entrepreneur, software engineer, and business leader involved in building digital products, websites, applications, and technology-driven ventures.',
      'He serves as CEO of Famzuk and leads the development of RankRush and other digital projects. He is also a founder and the chief engineer of Aniaja Company, and a co-founder of multiple ventures.',
      'His work focuses on technology, software development, product innovation, entrepreneurship, and building digital businesses.',
    ],
    journey: [
      'Usman builds and leads digital products and businesses alongside his business partner Yahayah Adam. Together they develop websites, applications, and ventures, including Famzuk and RankRush.',
    ],
    responsibilities: [
      'Technology leadership and business direction',
      'Software and product development',
      'Innovation across digital products',
    ],
    skills: ['Software development', 'Website and application development', 'Product development', 'Technology leadership', 'Entrepreneurship'],
    knowsAbout: ['Software development', 'Web development', 'Application development', 'Product innovation', 'Entrepreneurship', 'Educational technology'],
    socials: [],
    partnerId: 'yahayah',
    metaTitle: 'Usman Shehu (Zannur) | CEO, Software Engineer & Entrepreneur',
    metaDescription:
      'Usman Shehu, also known as Zannur and ussydev, is a software engineer and entrepreneur. CEO of Famzuk, founder of RankRush, partner of Yahayah Adam.',
  },
  {
    id: 'yahayah',
    slug: 'yahayah-adam',
    name: 'Yahayah Adam',
    jobTitle: 'Chief Financial Officer',
    labels: 'CFO · Entrepreneur · Co-Founder',
    initials: 'YA',
    photo: '/images/yahayah-adam',
    photoReady: false,
    photoAlt: 'Yahayah Adam, CFO, entrepreneur and co-founder',
    summary:
      'Entrepreneur and Chief Financial Officer of Famzuk and RankRush, and business partner of Usman Shehu.',
    bio: [
      'Yahayah Adam is an entrepreneur, business leader, and Chief Financial Officer involved in the financial management and development of multiple entrepreneurial ventures.',
      'He serves as CFO of Famzuk and RankRush and works alongside Usman Shehu across websites, digital products, businesses, and other projects.',
      'His role involves financial management, business planning, strategic development, and supporting the growth of entrepreneurial ventures.',
    ],
    journey: [
      'Yahayah works with Usman Shehu on the ventures they build together, supporting each one with financial management, planning, and business development.',
    ],
    responsibilities: [
      'Financial management',
      'Business planning and financial strategy',
      'Business development and venture growth',
    ],
    skills: ['Financial management', 'Business planning', 'Strategic development', 'Business development', 'Entrepreneurship'],
    knowsAbout: ['Financial management', 'Business planning', 'Financial strategy', 'Business development', 'Entrepreneurship'],
    socials: [],
    partnerId: 'usman',
    metaTitle: 'Yahayah Adam | CFO, Entrepreneur & Co-Founder',
    metaDescription:
      'Yahayah Adam is an entrepreneur and Chief Financial Officer of Famzuk and RankRush, and co-founder and business partner of Usman Shehu.',
  },
];

export interface Venture {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline?: string;
  description: string; // main description: cards, project page intro, search description
  about: string[]; // extra paragraphs shown on the project page
  features: string[];
  mission?: string;
  email?: string; // public contact email for this venture
  website?: string; // leave out until there is one
  logo: string; // base path; needs .png and .webp
  logoAlt: string;
  leadership: Leadership[];
  founderIds: string[];
  offerings: string[];
}

// To add a venture: copy an entry, add its logo to public/images/, done.
export const ventures: Venture[] = [
  {
    id: "famzuk",
    slug: "famzuk",
    name: "Famzuk",
    category: "Academic learning platform",
    tagline: "Learn Smarter. Achieve More.",
    description:
      "Famzuk is an academic learning platform designed to help students improve their learning experience through educational technology, AI-powered assistance, interactive learning tools, and examination practice.",
    about: [
      "The platform provides students with a centralized learning environment where they can ask academic questions, study scientific laws, explore dictionary definitions, create flashcards, practice examinations, manage study sessions, and summarize educational documents.",
      "Famzuk includes an AI Study Assistant that helps students understand academic concepts and solve questions step by step in English and Hausa. It also provides a scientific laws library, dictionary with text, voice and image search capabilities, flashcards with spaced repetition, a quiz centre for JAMB, WAEC and NECO preparation, a Pomodoro study timer, and a PDF summarization tool.",
      "The platform is designed to make learning more accessible, interactive, and organized, helping students improve their understanding of subjects and prepare for examinations.",
    ],
    features: [
      "AI-powered academic assistant",
      "English and Hausa support",
      "Step-by-step academic explanations",
      "Scientific laws and formulas library",
      "Full dictionary",
      "Text, voice, and camera dictionary search",
      "Flashcards and spaced repetition",
      "Quiz and examination practice",
      "JAMB, WAEC, and NECO preparation",
      "Pomodoro study timer",
      "Study analytics and progress tracking",
      "PDF document summarization",
      "Student dashboard",
      "User authentication",
      "Responsive web application",
      "Educational resources and study tools",
    ],
    mission:
      "Empower students with intelligent, accessible, and interactive educational tools that improve learning, understanding, and academic performance.",
    website: "https://famzuk1.onrender.com",
    logo: "/images/famzuk-logo",
    logoAlt: "Famzuk logo, a golden serif letter F on a navy background",
    leadership: [
      { founderId: "usman", role: "CEO" },
      { founderId: "yahayah", role: "CFO" },
    ],
    founderIds: ["usman", "yahayah"],
    offerings: ["Famzuk academic learning platform"],
  },
  {
    id: "rankrush",
    slug: "rankrush",
    name: "RankRush",
    category: "Quiz, learning and rewards platform",
    tagline: "Compete. Learn. Rise.",
    description:
      "RankRush is a competitive quiz, learning, and rewards platform designed to allow users to participate in quizzes, complete eligible activities, explore available surveys, earn XP and coins, and compete with other users on seasonal leaderboards. The platform combines educational quizzes, progression systems, survey opportunities, rewards, and competitive rankings into one application.",
    about: [
      "Users can create accounts, participate in quizzes, earn XP, complete available surveys, collect coins, track their progress, view rankings, and participate in seasonal competitions. The platform includes features such as a quiz system, survey integration, reward activities, a wallet, leaderboard, referral system, notifications, user profiles, and an admin dashboard.",
      "RankRush is designed to provide an engaging experience where users can learn, compete, progress through the platform, and participate in eligible reward activities. The platform supports web and Android experiences and is built using React, TypeScript, Supabase, and Capacitor.",
    ],
    features: [
      "User registration and authentication",
      "Quiz challenges",
      "XP and progression system",
      "Coins and rewards system",
      "Survey integrations",
      "Seasonal leaderboards",
      "User rankings",
      "Wallet and reward history",
      "Referral system",
      "Notifications",
      "User dashboard",
      "Admin dashboard",
      "Survey and reward management",
      "User management",
      "Responsive web application",
      "Android application",
    ],
    website: "https://rankrush-com.onrender.com",
    logo: "/images/rankrush-logo",
    logoAlt: "RankRush logo, a crowned blue letter P with a golden rising arrow on a red background",
    leadership: [
      { founderId: "usman", role: "Founder / CEO" },
      { founderId: "yahayah", role: "CFO" },
    ],
    founderIds: ["usman", "yahayah"],
    offerings: ["RankRush web and Android application"],
  },
  {
    id: "lot-10-fx",
    slug: "lot-10-fx",
    name: "LOT 10 FX",
    category: "Trading management company (proposed)",
    tagline: "Trade Smarter. Grow Better.",
    description:
      "Lot 10 FX Trading is a proposed trading management company that provides customers with a subscription-based service. Customers register on the website, select a subscription plan (monthly, 2 months, 3 months, 6 months, or yearly), and pay a subscription fee that is separate from their trading capital.",
    about: [
      "The proposed business model involves customers maintaining their own broker accounts while the company provides trading management services through an appropriately authorized arrangement. The company intends to earn subscription fees and a percentage of eligible trading profits, subject to agreed terms.",
      "The website will feature a professional financial dashboard where customers can view their account overview, investment capital, profit/loss, company fees, trading performance, transaction history, reports, subscription status, notifications, and profile settings.",
      "The platform will include user registration and login, mandatory Privacy Policy and Terms of Service acceptance, subscription management, customer support, and a separate admin dashboard for managing users, subscriptions, plans, payment records, reports, notifications, and platform settings.",
      "The website will be built using React, TypeScript, Vite, Tailwind CSS, and Supabase for authentication, database management, and backend services.",
      "The design will follow a premium financial theme using dark navy blue, gold accents, blue charts, green positive indicators, and red negative indicators, with a fully responsive desktop and mobile interface.",
    ],
    features: [],
    email: "hellolot10fx@gmail.com",
    logo: "/images/lot-10-fx-logo",
    logoAlt: "LOT 10 FX logo, a globe with a golden rising arrow beside the letters 10 FX",
    leadership: [
      { founderId: "usman", role: "Founder and Engineer" },
      { founderId: "yahayah", role: "Co-Founder" }, // TODO: confirm Yahayah's role
    ],
    founderIds: ["usman", "yahayah"],
    offerings: [],
  },
  {
    id: "aniaja",
    slug: "aniaja",
    name: "Aniaja Company",
    category: "Social application",
    description:
      "Aniaja is a social application where users can buy and sell, watch reels, and more.", // TODO: expand this description
    about: [],
    features: [],
    // website: "https://...", // TODO: add when available
    logo: "/images/aniaja-logo",
    logoAlt: "Aniaja logo, a neon green rounded play-button shape on a black background",
    leadership: [{ founderId: "usman", role: "Founder and Chief Engineer" }],
    founderIds: ["usman"],
    offerings: [],
  },
];

export interface Project {
  slug: string;
  name: string;
  ventureId: string; // description, features, etc. come from this venture
  technologies: string[];
  website?: string;
  status?: string; // hidden while empty
  involvement: string[];
  image?: string; // optional screenshot path, e.g. "/images/famzuk-screenshot.webp"
}

export const projects: Project[] = [
  {
    slug: "famzuk",
    name: "Famzuk",
    ventureId: "famzuk",
    technologies: [], // TODO: add Famzuk's real tech stack
    website: "https://famzuk1.onrender.com",
    involvement: ["Usman Shehu: CEO, technology and product leadership", "Yahayah Adam: CFO, financial management and business planning"],
  },
  {
    slug: "rankrush",
    name: "RankRush",
    ventureId: "rankrush",
    technologies: ["React", "TypeScript", "Supabase", "Capacitor"],
    website: "https://rankrush-com.onrender.com",
    involvement: ["Usman Shehu: Founder and CEO, development and product direction", "Yahayah Adam: CFO, financial management and business planning"],
  },
  {
    slug: "lot-10-fx",
    name: "LOT 10 FX",
    ventureId: "lot-10-fx",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
    status: "Proposed",
    involvement: ["Usman Shehu: founder and engineer", "Yahayah Adam: co-founder"], // TODO: confirm
  },
  {
    slug: "aniaja",
    name: "Aniaja",
    ventureId: "aniaja",
    technologies: [], // TODO
    involvement: ["Usman Shehu: founder and chief engineer"],
  },
];

export interface Milestone { label: string; date?: string; description: string }

// Add a date later by filling in `date`, e.g. date: '2024'.
export const timeline: Milestone[] = [
  { label: 'Our Beginning', description: 'Usman Shehu and Yahayah Adam start building together as business partners.' },
  { label: 'First Digital Projects', description: 'The first websites and digital products we build as a team.' },
  { label: 'Launching Famzuk', description: 'Famzuk, our educational technology platform.' },
  { label: 'Developing RankRush', description: 'RankRush, our rewards and competitions platform.' },
  { label: 'Expanding Our Ventures', description: 'Further ventures, projects, and digital products.' },
];

export interface Achievement { title: string; detail: string }

// Only verified facts. Add real awards, launches, or milestones here.
export const achievements: Achievement[] = [
  { title: 'CEO of Famzuk', detail: 'Usman Shehu leads Famzuk, an educational technology platform.' },
  { title: 'Founder and CEO of RankRush', detail: 'Usman Shehu founded and leads RankRush, a rewards and competitions platform.' },
  { title: 'CFO of Famzuk and RankRush', detail: 'Yahayah Adam manages finance and business planning across both ventures.' },
  { title: 'Founder and Chief Engineer of Aniaja Company', detail: 'Usman Shehu is a founder and the chief engineer of Aniaja Company.' },
  { title: 'Co-founders of multiple ventures', detail: 'Usman Shehu and Yahayah Adam build and run ventures together.' },
];

export const getFounder = (slug: string) => founders.find((f) => f.slug === slug);
export const founderById = (id: string) => founders.find((f) => f.id === id)!;
export const ventureById = (id: string) => ventures.find((v) => v.id === id)!;
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
