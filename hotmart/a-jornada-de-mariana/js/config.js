/**
 * =========================================================================
 * CONFIGURAÇÃO COMERCIAL & DADOS GERAIS — A JORNADA DE MARIANA
 * =========================================================================
 * Altere estas variáveis para atualizar links, valores e informações
 * em toda a landing page automaticamente.
 */

const SITE_CONFIG = {
  // Informações do Produto
  PRODUCT_NAME: "A Jornada de Mariana — Uma Aventura Sobre a Mente Humana",
  PRODUCT_SUBTITLE: "Para Quem Se Sente Invisível Mesmo Fazendo Tudo Certo",
  PRODUCT_ORIGINAL_PRICE: "R$ 67,90",
  PRODUCT_PRICE: "R$ 37,90",
  PRODUCT_INSTALLMENTS: "ou 4x de R$ 10,25",
  PRODUCT_FORMAT: "E-book Digital (PDF de Alta Definição + ePub para Kindle & Celular)",
  
  // Link de Checkout Oficial Hotmart
  CHECKOUT_URL: "https://pay.hotmart.com/K107865401Q",
  
  // Informações do Autor
  AUTHOR_NAME: "Henrique Gomes",
  AUTHOR_ROLE: "Escritor & Pesquisador de Comportamento Humano",
  AUTHOR_EMAIL: "contato@henriquegomes.com.br",
  
  // Recursos Visuais
  COVER_IMAGE: "assets/images/livro-mockup.png",
  MARIANA_IMAGE: "assets/images/mariana.jpg",
  WORKBOOK_IMAGE: "assets/images/caderno-praticas.jpg",
  
  // Links Legais & Suporte
  PRIVACY_URL: "#privacidade",
  TERMS_URL: "#termos",
  SUPPORT_WHATSAPP: "https://wa.me/5500000000000?text=Olá,%20gostaria%20de%20tirar%20uma%20dúvida%20sobre%20o%20livro%20A%20Jornada%20de%20Mariana",
  
  // Garantia
  GUARANTEE_DAYS: 7,
  
  // Ano de Lançamento
  YEAR: 2026
};

// Expor no escopo global para acesso facilitado
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
