import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Building2,
  Car,
  HeartPulse,
  Home,
  Plane,
  Scale,
  ShieldCheck,
} from "lucide-react";

export type InsuranceProduct = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  featured?: boolean;
  highlights: readonly string[];
  benefits: readonly string[];
  idealFor: readonly string[];
  whatsappMessage: string;
};

export const insuranceProducts: readonly InsuranceProduct[] = [
  {
    slug: "responsabilidade-civil",
    title: "Seguro de Responsabilidade Civil Profissional",
    shortTitle: "Responsabilidade Civil",
    description:
      "Proteção para sua carreira, sua reputação e seu patrimônio diante de reclamações relacionadas à atividade profissional.",
    eyebrow: "Proteção profissional",
    icon: Scale,
    featured: true,
    highlights: [
      "Defesa e despesas judiciais conforme a cobertura contratada",
      "Indenizações autorizadas pela seguradora",
      "Danos materiais, corporais, morais ou à imagem, conforme o produto",
    ],
    benefits: [
      "Ajuda a preservar o patrimônio pessoal e profissional",
      "Permite trabalhar com mais tranquilidade",
      "Cobertura personalizada para a realidade da atividade",
    ],
    idealFor: [
      "Profissionais da saúde",
      "Advogados e contadores",
      "Engenheiros e arquitetos",
      "Consultores e prestadores de serviços especializados",
    ],
    whatsappMessage:
      "Olá, gostaria de conhecer o Seguro de Responsabilidade Civil Profissional para minha atividade.",
  },
  {
    slug: "seguro-de-vida",
    title: "Seguro de Vida",
    shortTitle: "Seguro de Vida",
    description:
      "Planejamento de proteção financeira para você e sua família em diferentes momentos da vida.",
    eyebrow: "Vida e renda",
    icon: HeartPulse,
    highlights: [
      "Coberturas definidas conforme perfil e necessidade",
      "Possibilidades de proteção por morte, invalidez ou eventos cobertos",
      "Opções voltadas à continuidade de renda e planejamento familiar",
    ],
    benefits: [
      "Mais segurança para quem depende de você",
      "Solução ajustada ao orçamento e às prioridades",
      "Orientação clara antes da contratação",
    ],
    idealFor: [
      "Famílias",
      "Profissionais liberais",
      "Empresários e sócios",
      "Pessoas que desejam proteger renda e projetos",
    ],
    whatsappMessage:
      "Olá, gostaria de receber uma orientação sobre Seguro de Vida.",
  },
  {
    slug: "seguro-empresarial",
    title: "Seguro Empresarial",
    shortTitle: "Seguro Empresarial",
    description:
      "Coberturas sob medida para ajudar a proteger patrimônio, operação e continuidade do seu negócio.",
    eyebrow: "Proteção para empresas",
    icon: Building2,
    highlights: [
      "Incêndio, raio e explosão, conforme contratação",
      "Danos elétricos e eventos cobertos",
      "Roubo ou furto qualificado, responsabilidade civil e outras opções",
    ],
    benefits: [
      "Proteção compatível com o segmento e o porte",
      "Apoio na análise dos principais riscos",
      "Mais previsibilidade diante de imprevistos",
    ],
    idealFor: [
      "Comércios",
      "Escritórios e clínicas",
      "Prestadores de serviços",
      "Empresas de diferentes portes e segmentos",
    ],
    whatsappMessage:
      "Olá, gostaria de avaliar uma proteção de Seguro Empresarial para meu negócio.",
  },
  {
    slug: "seguro-residencial",
    title: "Seguro Residencial",
    shortTitle: "Residencial",
    description:
      "Proteção para o imóvel e assistência para situações que podem interromper a tranquilidade da sua casa.",
    eyebrow: "Casa protegida",
    icon: Home,
    highlights: [
      "Coberturas escolhidas conforme o perfil do imóvel",
      "Possibilidades para incêndio, danos elétricos e eventos previstos",
      "Serviços de assistência de acordo com o plano contratado",
    ],
    benefits: [
      "Proteção do patrimônio familiar",
      "Assistência para imprevistos do dia a dia",
      "Custo ajustado às coberturas selecionadas",
    ],
    idealFor: [
      "Proprietários",
      "Inquilinos",
      "Casas e apartamentos",
      "Imóveis de uso habitual ou conforme aceitação da seguradora",
    ],
    whatsappMessage:
      "Olá, gostaria de cotar um Seguro Residencial.",
  },
  {
    slug: "seguro-garantia",
    title: "Seguro Garantia",
    shortTitle: "Seguro Garantia",
    description:
      "Soluções para garantir obrigações contratuais, judiciais ou relacionadas a licitações, conforme análise do risco.",
    eyebrow: "Contratos e obrigações",
    icon: BriefcaseBusiness,
    highlights: [
      "Modalidades para contratos e licitações",
      "Possibilidades para processos judiciais",
      "Estrutura analisada conforme obrigação e tomador",
    ],
    benefits: [
      "Alternativa para diferentes tipos de garantia",
      "Análise especializada da necessidade",
      "Acompanhamento durante a contratação",
    ],
    idealFor: [
      "Empresas contratadas",
      "Participantes de licitações",
      "Organizações com obrigações judiciais ou contratuais",
      "Negócios que precisam apresentar garantias",
    ],
    whatsappMessage:
      "Olá, gostaria de entender qual modalidade de Seguro Garantia atende minha necessidade.",
  },
  {
    slug: "seguro-auto",
    title: "Seguro Automóvel",
    shortTitle: "Seguro Auto",
    description:
      "Proteção para o veículo com coberturas e assistências escolhidas de acordo com o seu perfil de uso.",
    eyebrow: "Mobilidade",
    icon: Car,
    highlights: [
      "Opções de cobertura para colisão, roubo ou furto, conforme contratação",
      "Responsabilidade civil e assistência, conforme o plano",
      "Comparação de alternativas de diferentes seguradoras",
    ],
    benefits: [
      "Mais tranquilidade no dia a dia",
      "Cobertura ajustada ao veículo e ao condutor",
      "Orientação para comparar franquias e serviços",
    ],
    idealFor: [
      "Veículos particulares",
      "Famílias",
      "Profissionais que utilizam o veículo no trabalho",
      "Empresas com necessidades de mobilidade",
    ],
    whatsappMessage:
      "Olá, gostaria de receber uma cotação de Seguro Automóvel.",
  },
] as const;

export const travelProduct = {
  title: "Viagens",
  description:
    "Seguro Viagem, Carta Verde e orientação para o Kit de Segurança em um só lugar.",
  icon: Plane,
  href: "/viagens",
} as const;

export const additionalInsuranceGroups = [
  {
    title: "Seguros gerais",
    icon: ShieldCheck,
    items: [
      "Máquinas e equipamentos",
      "Condomínio",
      "Bike",
      "Eventos",
      "Equipamentos médicos",
      "Riscos de engenharia",
    ],
  },
  {
    title: "Responsabilidades e garantias",
    icon: Scale,
    items: [
      "Responsabilidade Civil Geral",
      "Responsabilidade Civil para motoristas",
      "Garantia judicial",
      "Garantia para licitações",
      "Fiança locatícia",
    ],
  },
  {
    title: "Vida e planejamento",
    icon: HeartPulse,
    items: [
      "Vida para empresas",
      "Vida por convenção coletiva",
      "Renda para profissionais liberais",
      "Previdência privada",
      "Capitalização",
    ],
  },
] as const;

export function getInsuranceProduct(
  slug: string,
): InsuranceProduct | undefined {
  return insuranceProducts.find((product) => product.slug === slug);
}
