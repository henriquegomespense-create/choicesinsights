/**
 * Choices Insights - Core Logic & Internationalization
 * Multi-language, Lead Management, InfoProducts CRUD & Hidden Admin Panel
 * + SHA-256 Password Hash + Rate Limiting
 */

// --- I18N TRANSLATIONS DICTIONARY ---
const translations = {
  pt: {
    meta_title: "Choices Insights | Escolhas mais inteligentes. Vendas mais fortes.",
    meta_desc: "Escolhas mais inteligentes | Vendas mais fortes | Vendas online.",
    nav_about: "Sobre",
    nav_resources: "Recursos",
    nav_links: "Links",
    nav_contact_btn: "Fale conosco",
    
    hero_badge: "Plataforma de Inteligência & Estratégia",
    hero_title_choices: "Choices",
    hero_title_insights: "Insights",
    hero_slogan: "Insights que transformam escolhas Inteligêntes em resultados.",
    hero_support: "Decisões Inteligentes Transformando Produtos em Resultados",
    hero_btn_infoproducts: "InfoProdutos: Explorar soluções",
    hero_btn_marketing: "Marketing Digital",
    
    metric_sales_lift: "+248% em Conversão",
    metric_sales_sub: "Média de otimização",
    metric_curation: "Curadoria Premium",
    metric_curation_sub: "Produtos Validados",
    metric_support: "Atendimento 1:1",
    metric_support_sub: "Estratégia personalizada",

    about_tag: "Por que nós",
    about_title: "Por que Choices Insights?",
    about_subtitle: "Combinamos análise de dados e estratégia de vendas para você tomar as melhores decisões no e-commerce.",
    about_card1_title: "Decisões Baseadas em Dados",
    about_card1_desc: "Elimine o 'achismo'. Utilizamos métricas concretas de mercado e comportamento do consumidor para direcionar cada passo.",
    about_card2_title: "Curadoria de Alto Impacto",
    about_card2_desc: "Selecionamos e estruturamos infoprodutos com alta demanda e retenção para maximizar seu retorno sobre o investimento.",
    about_card3_title: "Escala & Otimização Contínua",
    about_card3_desc: "Processos e funis desenhados para crescer de forma sustentável, mantendo a rentabilidade e a experiência do cliente.",
    about_visual_title: "Painel de Performance em Tempo Real",
    about_stat1: "+3.4x",
    about_stat1_desc: "Aumento médio em ROI",
    about_stat2: "99.4%",
    about_stat2_desc: "Satisfação dos clientes",

    resources_tag: "O que entregamos",
    resources_title: "Produtos, Ferramentas e Insights",
    resources_subtitle: "Produtos, Ferramentas e Insights que geram resultados reais.",
    
    infoproducts_title: "InfoProdutos em Destaque",
    infoproducts_desc: "Produtos Escolhidos com cuidado para garantir tranquilidade na hora da compra",
    product_cta: "Acessar Solução",
    product_price_label: "A partir de",

    marketing_tag: "Estratégia Digital",
    marketing_title: "Marketing Digital de Alta Performance",
    marketing_card1_title: "2.1 Análise de Dados",
    marketing_card1_desc: "Relatórios claros e acionáveis para entender o comportamento do seu cliente.",
    marketing_card2_title: "2.2 Decisões Inteligentes",
    marketing_card2_desc: "Recomendações baseadas em dados para aumentar conversão e ticket médio.",
    marketing_card3_title: "2.3 Otimização Contínua",
    marketing_card3_desc: "Acompanhamento constante para manter suas vendas sempre em crescimento.",

    links_tag: "Contatos & Conexões",
    links_title: "Nossos canais & recursos",
    links_subtitle: "Acesse nossos conteúdos, lojas e redes.",
    channel_email_title: "E-mail Oficial",
    channel_whatsapp_title: "WhatsApp - Atendimento rápido",
    channel_whatsapp_status: "Online agora para te atender",
    btn_copy: "Copiar",
    btn_copied: "Copiado!",
    btn_open_chat: "Conversar no WhatsApp",

    form_title: "Fale com um Especialista",
    form_subtitle: "Preencha o formulário abaixo e retornaremos em até 2 horas.",
    form_label_name: "Nome Completo",
    form_placeholder_name: "Seu nome completo",
    form_label_email: "E-mail",
    form_placeholder_email: "seu.email@empresa.com",
    form_label_phone: "Telefone / WhatsApp",
    form_placeholder_phone: "(17) 98143-4509",
    form_label_company: "Empresa / Negócio",
    form_placeholder_company: "Nome do seu negócio (opcional)",
    form_label_subject: "Assunto",
    form_subj_select: "Selecione o assunto...",
    form_subj_opt1: "Dúvida sobre produto",
    form_subj_opt2: "Suporte",
    form_subj_opt3: "Parceria",
    form_subj_opt4: "Orçamento",
    form_subj_opt5: "Outro",
    form_label_source: "Como nos Conheceu?",
    form_src_select: "Selecione uma opção...",
    form_src_opt1: "Google / Pesquisa",
    form_src_opt2: "Instagram",
    form_src_opt3: "Indicação de Amigo / Colega",
    form_src_opt4: "YouTube",
    form_src_opt5: "WhatsApp",
    form_src_opt6: "Outro canal",
    form_label_message: "Mensagem",
    form_placeholder_message: "Como podemos ajudar você a tomar melhores decisões?",
    form_btn_submit: "Enviar Mensagem",
    form_btn_sending: "Enviando...",
    form_send_whatsapp_check: "Enviar cópia formatada também via WhatsApp",

    cta_title: "Pronto para decisões mais inteligentes?",
    cta_text: "Entre em contato e descubra como o Choices Insights pode impulsionar suas vendas.",
    cta_btn: "Fale conosco agora",

    footer_rights: "© 2026 Choices Insights. Todos os direitos reservados.",
    footer_admin_link: "Área Administrativa (Restrita)",

    toast_form_success: "Mensagem enviada com sucesso! Em breve entraremos em contato.",
    toast_form_error: "Por favor, preencha todos os campos obrigatórios."
  },

  en: {
    meta_title: "Choices Insights | Smarter Choices. Stronger Sales.",
    meta_desc: "Smarter choices | Stronger sales | Online sales growth.",
    nav_about: "About",
    nav_resources: "Solutions",
    nav_links: "Links",
    nav_contact_btn: "Contact Us",
    
    hero_badge: "Intelligence & Strategy Platform",
    hero_title_choices: "Choices",
    hero_title_insights: "Insights",
    hero_slogan: "Insights that transform smart choices into results.",
    hero_support: "Smart Decisions Transforming Products into Results",
    hero_btn_infoproducts: "InfoProducts: Explore Solutions",
    hero_btn_marketing: "Digital Marketing",
    
    metric_sales_lift: "+248% Conversion Lift",
    metric_sales_sub: "Optimization Average",
    metric_curation: "Premium Curation",
    metric_curation_sub: "Validated Products",
    metric_support: "1:1 Strategy Support",
    metric_support_sub: "Custom execution",

    about_tag: "Why Us",
    about_title: "Why Choices Insights?",
    about_subtitle: "We combine data analytics and sales strategy so you can make the smartest decisions in e-commerce.",
    about_card1_title: "Data-Driven Decisions",
    about_card1_desc: "Eliminate guesswork. We leverage concrete market analytics and consumer behavior data to guide every step.",
    about_card2_title: "High-Impact Curation",
    about_card2_desc: "We handpick and structure digital products with proven demand to maximize your return on investment.",
    about_card3_title: "Scale & Continuous Optimization",
    about_card3_desc: "Processes and funnels engineered for sustainable growth while maintaining high profitability and retention.",
    about_visual_title: "Real-Time Performance Dashboard",
    about_stat1: "+3.4x",
    about_stat1_desc: "Average ROI Increase",
    about_stat2: "99.4%",
    about_stat2_desc: "Client Satisfaction",

    resources_tag: "What We Deliver",
    resources_title: "Products, Tools and Insights",
    resources_subtitle: "Products, Tools, and Insights that generate real, measurable results.",
    
    infoproducts_title: "Featured InfoProducts",
    infoproducts_desc: "Products carefully selected to guarantee peace of mind during your purchase",
    product_cta: "Access Solution",
    product_price_label: "Starting at",

    marketing_tag: "Digital Strategy",
    marketing_title: "High-Performance Digital Marketing",
    marketing_card1_title: "2.1 Data Analysis",
    marketing_card1_desc: "Clear, actionable reports to understand your customer's behavior and purchase triggers.",
    marketing_card2_title: "2.2 Smart Decisions",
    marketing_card2_desc: "Data-backed recommendations to boost conversion rates and average order value.",
    marketing_card3_title: "2.3 Continuous Optimization",
    marketing_card3_desc: "Ongoing monitoring and iterative enhancements to keep your sales on a consistent growth curve.",

    links_tag: "Channels & Connections",
    links_title: "Our Channels & Resources",
    links_subtitle: "Access our content, stores, and contact hubs.",
    channel_email_title: "Official Email",
    channel_whatsapp_title: "WhatsApp - Fast Support",
    channel_whatsapp_status: "Online right now to assist you",
    btn_copy: "Copy",
    btn_copied: "Copied!",
    btn_open_chat: "Chat on WhatsApp",

    form_title: "Talk to a Specialist",
    form_subtitle: "Fill out the form below and we will get back to you within 2 hours.",
    form_label_name: "Full Name",
    form_placeholder_name: "Your full name",
    form_label_email: "Email Address",
    form_placeholder_email: "your.name@company.com",
    form_label_phone: "Phone / WhatsApp",
    form_placeholder_phone: "+1 (555) 000-0000",
    form_label_company: "Company / Business",
    form_placeholder_company: "Your company name (optional)",
    form_label_subject: "Subject",
    form_subj_select: "Select a subject...",
    form_subj_opt1: "Product Question",
    form_subj_opt2: "Support",
    form_subj_opt3: "Partnership",
    form_subj_opt4: "Quote / Pricing",
    form_subj_opt5: "Other",
    form_label_source: "How did you hear about us?",
    form_src_select: "Select an option...",
    form_src_opt1: "Google / Search",
    form_src_opt2: "Instagram",
    form_src_opt3: "Friend / Colleague Referral",
    form_src_opt4: "YouTube",
    form_src_opt5: "WhatsApp",
    form_src_opt6: "Other Channel",
    form_label_message: "Message",
    form_placeholder_message: "How can we help you make smarter decisions?",
    form_btn_submit: "Send Message",
    form_btn_sending: "Sending...",
    form_send_whatsapp_check: "Also send formatted copy via WhatsApp",

    cta_title: "Ready for smarter decisions?",
    cta_text: "Get in touch and discover how Choices Insights can accelerate your sales growth.",
    cta_btn: "Contact us now",

    footer_rights: "© 2026 Choices Insights. All rights reserved.",
    footer_admin_link: "Admin Panel (Restricted)",

    toast_form_success: "Message sent successfully! We will contact you shortly.",
    toast_form_error: "Please fill in all required fields."
  },

  es: {
    meta_title: "Choices Insights | Decisiones más inteligentes. Ventas más fuertes.",
    meta_desc: "Elecciones más inteligentes | Ventas más fuertes | Crecimiento de ventas online.",
    nav_about: "Sobre Nosotros",
    nav_resources: "Recursos",
    nav_links: "Enlaces",
    nav_contact_btn: "Contáctanos",
    
    hero_badge: "Plataforma de Inteligencia & Estrategia",
    hero_title_choices: "Choices",
    hero_title_insights: "Insights",
    hero_slogan: "Insights que transforman elecciones inteligentes en resultados.",
    hero_support: "Decisiones Inteligentes Transformando Productos en Resultados",
    hero_btn_infoproducts: "InfoProductos: Explorar soluciones",
    hero_btn_marketing: "Marketing Digital",
    
    metric_sales_lift: "+248% en Conversión",
    metric_sales_sub: "Promedio de optimización",
    metric_curation: "Curaduría Premium",
    metric_curation_sub: "Productos Validados",
    metric_support: "Atención 1:1",
    metric_support_sub: "Estrategia personalizada",

    about_tag: "Por qué elegirnos",
    about_title: "¿Por qué Choices Insights?",
    about_subtitle: "Combinamos análisis de datos y estrategia de ventas para que tomes las mejores decisiones en e-commerce.",
    about_card1_title: "Decisiones Basadas en Datos",
    about_card1_desc: "Elimina las dudas. Usamos métricas precisas de mercado y comportamiento del comprador para orientar cada paso.",
    about_card2_title: "Curaduría de Alto Impacto",
    about_card2_desc: "Seleccionamos y estructuramos infoproductos con alta demanda para maximizar tu retorno de inversión.",
    about_card3_title: "Escala & Optimización Continua",
    about_card3_desc: "Procesos y embudos diseñados para crecer de forma sostenible manteniendo alta rentabilidad y retención.",
    about_visual_title: "Panel de Rendimiento en Tiempo Real",
    about_stat1: "+3.4x",
    about_stat1_desc: "Aumento promedio en ROI",
    about_stat2: "99.4%",
    about_stat2_desc: "Satisfacción del cliente",

    resources_tag: "Lo que entregamos",
    resources_title: "Productos, Herramientas e Insights",
    resources_subtitle: "Productos, Herramientas e Insights que generan resultados reales.",
    
    infoproducts_title: "InfoProductos Destacados",
    infoproducts_desc: "Productos Elegidos con cuidado para garantizar tranquilidad a la hora de comprar",
    product_cta: "Acceder a la Solución",
    product_price_label: "A partir de",

    marketing_tag: "Estrategia Digital",
    marketing_title: "Marketing Digital de Alto Rendimiento",
    marketing_card1_title: "2.1 Análisis de Datos",
    marketing_card1_desc: "Informes claros y accionables para comprender el comportamiento de tus clientes.",
    marketing_card2_title: "2.2 Decisiones Inteligentes",
    marketing_card2_desc: "Recomendaciones basadas en datos para aumentar la tasa de conversión y el ticket promedio.",
    marketing_card3_title: "2.3 Optimización Continua",
    marketing_card3_desc: "Seguimiento constante para mantener tus ventas siempre en crecimiento continuo.",

    links_tag: "Contactos & Canales",
    links_title: "Nuestros canales & recursos",
    links_subtitle: "Accede a nuestros contenidos, tiendas y redes de contacto.",
    channel_email_title: "Correo Electrónico",
    channel_whatsapp_title: "WhatsApp - Atención rápida",
    channel_whatsapp_status: "En línea ahora para atenderte",
    btn_copy: "Copiar",
    btn_copied: "¡Copiado!",
    btn_open_chat: "Chatear por WhatsApp",

    form_title: "Habla con un Especialista",
    form_subtitle: "Completa el formulario y te responderemos en un plazo máximo de 2 horas.",
    form_label_name: "Nombre Completo",
    form_placeholder_name: "Tu nombre completo",
    form_label_email: "Correo Electrónico",
    form_placeholder_email: "tu.nombre@empresa.com",
    form_label_phone: "Teléfono / WhatsApp",
    form_placeholder_phone: "+34 600 000 000",
    form_label_company: "Empresa / Negocio",
    form_placeholder_company: "Nombre de tu empresa (opcional)",
    form_label_subject: "Asunto",
    form_subj_select: "Selecciona el asunto...",
    form_subj_opt1: "Duda sobre producto",
    form_subj_opt2: "Soporte",
    form_subj_opt3: "Alianza / Asociación",
    form_subj_opt4: "Presupuesto",
    form_subj_opt5: "Otro",
    form_label_source: "¿Cómo nos conociste?",
    form_src_select: "Selecciona una opción...",
    form_src_opt1: "Google / Búsqueda",
    form_src_opt2: "Instagram",
    form_src_opt3: "Recomendación de Amigo / Colega",
    form_src_opt4: "YouTube",
    form_src_opt5: "WhatsApp",
    form_src_opt6: "Otro canal",
    form_label_message: "Mensaje",
    form_placeholder_message: "¿Cómo podemos ayudarte a tomar mejores decisiones?",
    form_btn_submit: "Enviar Mensaje",
    form_btn_sending: "Enviando...",
    form_send_whatsapp_check: "Enviar también copia formateada por WhatsApp",

    cta_title: "¿Listo para decisiones más inteligentes?",
    cta_text: "Ponte en contacto y descubre cómo Choices Insights puede impulsar tus ventas.",
    cta_btn: "Habla con nosotros ahora",

    footer_rights: "© 2026 Choices Insights. Todos los derechos reservados.",
    footer_admin_link: "Área Administrativa (Privada)",

    toast_form_success: "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.",
    toast_form_error: "Por favor, completa todos los campos obligatorios."
  }
};

// --- DEFAULT 5 CURATED INFOPRODUCTS ---
const defaultProducts = [
  {
    id: "prod-1",
    title: "E-commerce Data Master",
    badge: "Mais Vendido",
    category: "Inteligência de Dados",
    rating: "4.9 (184)",
    price: "R$ 97,00",
    description: "Guia estratégico passo a passo para analisar métricas vitais, descobrir padrões de compra e dobrar a taxa de conversão da sua loja.",
    link: "https://wa.me/5517981434509?text=Olá!%20Tenho%20interesse%20no%20E-commerce%20Data%20Master.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80",
    active: true
  },
  {
    id: "prod-2",
    title: "Funil de Vendas Invisível",
    badge: "Destaque",
    category: "Automação & Conversão",
    rating: "4.8 (142)",
    price: "R$ 147,00",
    description: "Estruturas e roteiros prontos de automação para transformar visitantes casuais em clientes recorrentes de forma previsível.",
    link: "https://wa.me/5517981434509?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Funil%20de%20Vendas%20Invisível.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80",
    active: true
  },
  {
    id: "prod-3",
    title: "Copywriting para Alta Conversão",
    badge: "Essencial",
    category: "Comunicação Persuasiva",
    rating: "5.0 (98)",
    price: "R$ 67,00",
    description: "Modelos e fórmulas de copy validadas para páginas de vendas, anúncios e mensagens que eliminam objeções de compra.",
    link: "https://wa.me/5517981434509?text=Olá!%20Quero%20adquirir%20o%20Copywriting%20para%20Alta%20Conversão.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=80",
    active: true
  },
  {
    id: "prod-4",
    title: "Gestão de Tráfego 360°",
    badge: "Avançado",
    category: "Tráfego Pago & ROI",
    rating: "4.9 (210)",
    price: "R$ 197,00",
    description: "Metodologia completa para otimizar campanhas no Meta Ads e Google Ads, reduzindo CPA e escalando o faturamento.",
    link: "https://wa.me/5517981434509?text=Olá!%20Gostaria%20de%20conhecer%20o%20Gestão%20de%20Tráfego%20360°.",
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=700&q=80",
    active: true
  },
  {
    id: "prod-5",
    title: "Dashboard Executivo de Vendas",
    badge: "Prático",
    category: "Planilhas & Dashboards",
    rating: "4.8 (76)",
    price: "R$ 47,00",
    description: "Template pronto para monitoramento em tempo real de faturamento, ticket médio, CAC e metas de vendas mensais.",
    link: "https://wa.me/5517981434509?text=Olá!%20Tenho%20interesse%20no%20Dashboard%20Executivo%20de%20Vendas.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=700&q=80",
    active: true
  }
];

// --- APP STATE & LOCALSTORAGE WRAPPERS ---
const AppState = {
  currentLang: localStorage.getItem('ci_lang') || 'pt',
  // 🔒 COLE AQUI O HASH SHA-256 DA SUA SENHA (veja instruções abaixo do arquivo)
  adminPasswordHash: localStorage.getItem('ci_admin_pwd') || 'ce05432bc57b2d59edf41b01f7ac4f77638ce71ef0a99105bb6cef9a09352f42',
  whatsappNumber: localStorage.getItem('ci_whatsapp') || '5517981434509',
  contactEmail: localStorage.getItem('ci_email') || 'henriquegomes.pense@gmail.com',
  products: JSON.parse(localStorage.getItem('ci_products')) || defaultProducts,
  leads: JSON.parse(localStorage.getItem('ci_leads')) || [
    {
      id: "lead-demo-1",
      date: "03/10/2026 11:20",
      name: "Carlos Eduardo Silva",
      email: "carlos.silva@exemplo.com",
      phone: "(17) 99876-5432",
      company: "Silva E-commerce",
      subject: "Dúvida sobre produto",
      source: "Google / Pesquisa",
      message: "Gostaria de saber como o E-commerce Data Master se integra com a plataforma Shopify.",
      status: "Novo"
    }
  ],
  stats: JSON.parse(localStorage.getItem('ci_stats')) || {
    pageViews: 1248,
    productClicks: 412
  }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initStats();
  applyLanguage(AppState.currentLang);
  renderProducts();
  setupLanguageSelector();
  setupNavigation();
  setupContactForm();
  setupAdminPanel();
  setupCopyButtons();
});

// Increment page views
function initStats() {
  AppState.stats.pageViews += 1;
  localStorage.setItem('ci_stats', JSON.stringify(AppState.stats));
}

// --- LANGUAGE SWITCHER ---
function setupLanguageSelector() {
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  const langOptions = document.querySelectorAll('.lang-option');

  if (!langBtn || !langDropdown) return;

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('active');
  });

  document.addEventListener('click', () => {
    langDropdown.classList.remove('active');
  });

  langOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const selectedLang = opt.getAttribute('data-lang');
      if (selectedLang && translations[selectedLang]) {
        AppState.currentLang = selectedLang;
        localStorage.setItem('ci_lang', selectedLang);
        applyLanguage(selectedLang);
        langDropdown.classList.remove('active');
      }
    });
  });
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.pt;
  
  document.title = dict.meta_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', dict.meta_desc);

  const langLabel = document.getElementById('currentLangLabel');
  if (langLabel) {
    const flags = { pt: '🇧🇷 PT', en: '🇺🇸 EN', es: '🇪🇸 ES' };
    langLabel.textContent = flags[lang] || '🇧🇷 PT';
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  renderProducts();
}

// --- RENDER INFOPRODUCTS AS SIMPLE LIST (dinâmico) ---
function renderProductList() {
  const container = document.getElementById('productListSimple');
  if (!container) return;

  const activeProducts = AppState.products.filter(p => p.active !== false);

  if (activeProducts.length === 0) {
    container.innerHTML = `
      <li style="padding: 20px; text-align: center; color: #94A3B8; font-size: 0.92rem;">
        Nenhum produto disponível no momento.
      </li>
    `;
    return;
  }

  container.innerHTML = activeProducts.map(p => `
    <li class="product-list-item">
      <img
        src="${p.image}"
        alt="${p.title}"
        class="product-list-thumb"
        loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80'"
      >
      <a
        href="${p.link}"
        target="_blank"
        rel="noopener noreferrer"
        class="product-list-link"
        onclick="trackProductClick('${p.id}')"
      >
        ${p.title}
      </a>
    </li>
  `).join('');
}

function renderProducts() {
  renderProductList();
}

function trackProductClick(id) {
  AppState.stats.productClicks = (AppState.stats.productClicks || 0) + 1;
  localStorage.setItem('ci_stats', JSON.stringify(AppState.stats));
}

// --- NAVIGATION & INTERACTIONS ---
function setupNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#admin') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// --- CONTACT FORM & LEAD CAPTURE (Web3Forms) ---
function setupContactForm() {
  const form = document.getElementById('contactForm');
  const phoneInput = document.getElementById('contactPhone');

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 11) val = val.slice(0, 11);
      
      if (val.length > 10) {
        e.target.value = `(${val.slice(0,2)}) ${val.slice(2,7)}-${val.slice(7)}`;
      } else if (val.length > 5) {
        e.target.value = `(${val.slice(0,2)}) ${val.slice(2,6)}-${val.slice(6)}`;
      } else if (val.length > 2) {
        e.target.value = `(${val.slice(0,2)}) ${val.slice(2)}`;
      } else if (val.length > 0) {
        e.target.value = `(${val}`;
      }
    });
  }

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const phone = document.getElementById('contactPhone')?.value.trim();
    const company = document.getElementById('contactCompany')?.value.trim() || 'Não informada';
    const subject = document.getElementById('contactSubject')?.value;
    const message = document.getElementById('contactMessage')?.value.trim();
    const source = document.getElementById('contactSource')?.value || 'Não informado';
    const sendWhatsapp = document.getElementById('sendWhatsappCheck')?.checked;

    const dict = translations[AppState.currentLang] || translations.pt;

    if (!name || !email || !phone || !message || !subject) {
      showToast(dict.toast_form_error, 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = dict.form_btn_sending;

    const newLead = {
      id: "lead-" + Date.now(),
      date: new Date().toLocaleString('pt-BR'),
      name,
      email,
      phone,
      company,
      subject,
      source,
      message,
      status: "Novo"
    };

    AppState.leads.unshift(newLead);
    localStorage.setItem('ci_leads', JSON.stringify(AppState.leads));

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      const result = await response.json();

      if (result.success) {
        showToast(dict.toast_form_success, 'success');
        form.reset();

        if (sendWhatsapp) {
          const textMsg = `*Novo Contato - Choices Insights*%0A` +
            `*Nome:* ${encodeURIComponent(name)}%0A` +
            `*E-mail:* ${encodeURIComponent(email)}%0A` +
            `*Telefone:* ${encodeURIComponent(phone)}%0A` +
            `*Empresa:* ${encodeURIComponent(company)}%0A` +
            `*Assunto:* ${encodeURIComponent(subject)}%0A` +
            `*Como conheceu:* ${encodeURIComponent(source)}%0A` +
            `*Mensagem:* ${encodeURIComponent(message)}`;

          const waUrl = `https://wa.me/${AppState.whatsappNumber}?text=${textMsg}`;
          window.open(waUrl, '_blank');
        }

        renderAdminLeads();
        updateAdminStats();
      } else {
        console.error('Erro no Web3Forms:', result);
        showToast('Ocorreu um erro ao enviar. Tente novamente.', 'error');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      showToast('Erro de conexão. Verifique sua internet.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// --- CLIPBOARD HELPER ---
function setupCopyButtons() {
  document.querySelectorAll('.btn-copy-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy-target');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const dict = translations[AppState.currentLang] || translations.pt;
          const original = btn.textContent;
          btn.textContent = dict.btn_copied;
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove('copied');
          }, 2000);
        });
      }
    });
  });
}

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : '⚠'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// --- SHA-256 HELPER (para hash de senha) ---
async function sha256(str) {
  const buf = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// --- HIDDEN ADMIN PANEL CONTROLLER (com hash + rate limiting) ---
function setupAdminPanel() {
  const modalOverlay = document.getElementById('adminModalOverlay');
  const authCard = document.getElementById('adminAuthCard');
  const dashContainer = document.getElementById('adminDashContainer');
  const authForm = document.getElementById('adminAuthForm');
  const authPasswordInput = document.getElementById('adminAuthPassword');
  const authCloseBtn = document.getElementById('adminAuthClose');
  const dashCloseBtn = document.getElementById('adminDashClose');
  const logoutBtn = document.getElementById('adminLogoutBtn');

  const footerTrigger = document.getElementById('adminAccessTrigger');
  const heroLogo = document.getElementById('heroLogoBadge');

  let logoClickCount = 0;
  let logoClickTimer;

  // 🔒 Variáveis de rate limiting
  let loginAttempts = 0;
  let lockoutUntil = 0;

  const openAdminLogin = () => {
    modalOverlay.classList.add('active');
    authCard.style.display = 'block';
    dashContainer.classList.remove('active');
    authPasswordInput?.focus();
  };

  const closeAdmin = () => {
    modalOverlay.classList.remove('active');
    if (authPasswordInput) authPasswordInput.value = '';
  };

  if (footerTrigger) footerTrigger.addEventListener('click', (e) => { e.preventDefault(); openAdminLogin(); });

  if (heroLogo) {
    heroLogo.addEventListener('click', () => {
      logoClickCount++;
      clearTimeout(logoClickTimer);
      if (logoClickCount >= 3) {
        logoClickCount = 0;
        openAdminLogin();
      } else {
        logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 800);
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      openAdminLogin();
    }
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeAdmin();
    }
  });

  authCloseBtn?.addEventListener('click', closeAdmin);
  dashCloseBtn?.addEventListener('click', closeAdmin);
  logoutBtn?.addEventListener('click', () => {
    authCard.style.display = 'block';
    dashContainer.classList.remove('active');
    if (authPasswordInput) authPasswordInput.value = '';
  });

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeAdmin();
  });

  // 🔒 SUBMIT DE LOGIN — com hash + rate limiting
  authForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Verifica se está bloqueado por tentativas erradas
    if (Date.now() < lockoutUntil) {
      const restante = Math.ceil((lockoutUntil - Date.now()) / 60000);
      showToast(`Muitas tentativas. Aguarde ${restante} min.`, 'error');
      return;
    }

    // 2. Gera o hash da senha digitada
    const entered = authPasswordInput.value;
    const enteredHash = await sha256(entered);

    // 3. Compara com o hash armazenado
    if (enteredHash === AppState.adminPasswordHash) {
      // ✅ Login correto → reseta tentativas
      loginAttempts = 0;
      lockoutUntil = 0;
      authCard.style.display = 'none';
      dashContainer.classList.add('active');
      renderAdminDashboard();
    } else {
      // ❌ Login errado → incrementa tentativas
      loginAttempts++;
      authPasswordInput.value = '';

      if (loginAttempts >= 5) {
        // Bloqueia por 5 minutos
        lockoutUntil = Date.now() + 5 * 60 * 1000;
        loginAttempts = 0;
        showToast('⛔ Muitas tentativas. Bloqueado por 5 minutos.', 'error');
      } else {
        showToast(`Senha incorreta. Tentativa ${loginAttempts}/5.`, 'error');
      }
    }
  });

  // Sidebar Tab Navigation
  document.querySelectorAll('.admin-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-tab-content').forEach(tab => tab.classList.remove('active'));

      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      const targetTab = document.getElementById(tabId);
      if (targetTab) targetTab.classList.add('active');
    });
  });

  setupAdminActions();
}

function renderAdminDashboard() {
  updateAdminStats();
  renderAdminLeads();
  renderAdminProducts();
  loadAdminSettings();
}

function updateAdminStats() {
  const totalLeadsEl = document.getElementById('statTotalLeads');
  const leadsBadge = document.getElementById('leadsBadgeCount');
  const totalViewsEl = document.getElementById('statPageViews');
  const totalProductsEl = document.getElementById('statTotalProducts');

  if (totalLeadsEl) totalLeadsEl.textContent = AppState.leads.length;
  if (leadsBadge) leadsBadge.textContent = AppState.leads.length;
  if (totalViewsEl) totalViewsEl.textContent = AppState.stats.pageViews;
  if (totalProductsEl) totalProductsEl.textContent = AppState.products.length;
}

function renderAdminLeads() {
  const tbody = document.getElementById('adminLeadsTbody');
  if (!tbody) return;

  if (AppState.leads.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color:#94A3B8;">Nenhum contato ou lead registrado até o momento.</td></tr>`;
    return;
  }

  tbody.innerHTML = AppState.leads.map((lead, idx) => `
    <tr>
      <td><strong>${lead.date}</strong></td>
      <td>
        <div style="font-weight:700;">${lead.name}</div>
        <div style="font-size:0.8rem; color:#64748B;">${lead.company || ''}</div>
      </td>
      <td><a href="mailto:${lead.email}" style="color:var(--primary);">${lead.email}</a></td>
      <td>${lead.phone}</td>
      <td><span style="font-size:0.82rem; background:#F1F5F9; padding:3px 8px; border-radius:4px;">${lead.subject}</span></td>
      <td style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${lead.message}">${lead.message}</td>
      <td>
        <div class="lead-actions">
          <a href="https://wa.me/55${lead.phone.replace(/\D/g, '')}?text=Olá%20${encodeURIComponent(lead.name)},%20recebemos%20sua%20mensagem%20no%20Choices%20Insights!" target="_blank" class="btn-icon whatsapp-btn" title="Conversar no WhatsApp">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
          <button class="btn-icon delete-btn" onclick="deleteLead('${lead.id}')" title="Excluir Lead">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.deleteLead = function(id) {
  if (confirm('Deseja realmente remover este contato da lista?')) {
    AppState.leads = AppState.leads.filter(l => l.id !== id);
    localStorage.setItem('ci_leads', JSON.stringify(AppState.leads));
    renderAdminLeads();
    updateAdminStats();
    showToast('Lead excluído.');
  }
};

function renderAdminProducts() {
  const container = document.getElementById('adminProductsList');
  if (!container) return;

  container.innerHTML = AppState.products.map((p, idx) => `
    <div class="admin-product-item">
      <div class="admin-product-item-header">
        <img src="${p.image}" class="admin-prod-thumb" alt="${p.title}" onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80'">
        <div style="flex:1;">
          <h4 style="font-size:1rem; margin-bottom:2px;">${p.title}</h4>
          <span style="font-size:0.8rem; color:var(--text-subtle);">${p.price} • ${p.category}</span>
        </div>
      </div>
      <p style="font-size:0.85rem; color:var(--text-muted);">${p.description}</p>
      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #E2E8F0; padding-top:10px;">
        <span style="font-size:0.82rem; font-weight:700; color:${p.active !== false ? '#10B981' : '#EF4444'};">
          ${p.active !== false ? '● Ativo no Site' : '○ Oculto'}
        </span>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-secondary btn-sm" onclick="editProductModal('${p.id}')">Editar</button>
          <button class="btn btn-outline btn-sm" onclick="toggleProductActive('${p.id}')">
            ${p.active !== false ? 'Desativar' : 'Ativar'}
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

window.toggleProductActive = function(id) {
  const prod = AppState.products.find(p => p.id === id);
  if (prod) {
    prod.active = prod.active === false ? true : false;
    localStorage.setItem('ci_products', JSON.stringify(AppState.products));
    renderAdminProducts();
    renderProducts();
    showToast(`Produto "${prod.title}" atualizado.`);
  }
};

window.editProductModal = function(id) {
  const prod = AppState.products.find(p => p.id === id);
  if (!prod) return;

  const newTitle = prompt('Título do Produto:', prod.title);
  if (newTitle === null) return;
  const newPrice = prompt('Preço (ex: R$ 97,00):', prod.price);
  if (newPrice === null) return;
  const newDesc = prompt('Descrição curta:', prod.description);
  if (newDesc === null) return;
  const newLink = prompt('Link de Vendas/Checkout:', prod.link);
  if (newLink === null) return;

  prod.title = newTitle.trim() || prod.title;
  prod.price = newPrice.trim() || prod.price;
  prod.description = newDesc.trim() || prod.description;
  prod.link = newLink.trim() || prod.link;

  localStorage.setItem('ci_products', JSON.stringify(AppState.products));
  renderAdminProducts();
  renderProducts();
  showToast('Produto atualizado com sucesso!');
};

function loadAdminSettings() {
  const phoneInput = document.getElementById('adminSetPhone');
  const emailInput = document.getElementById('adminSetEmail');
  if (phoneInput) phoneInput.value = AppState.whatsappNumber;
  if (emailInput) emailInput.value = AppState.contactEmail;
}

function setupAdminActions() {
  // Export Leads to CSV
  const exportBtn = document.getElementById('adminExportLeadsBtn');
  exportBtn?.addEventListener('click', () => {
    if (AppState.leads.length === 0) {
      showToast('Não há leads para exportar.', 'error');
      return;
    }
    const headers = ["Data", "Nome", "Email", "Telefone", "Empresa", "Assunto", "Origem", "Mensagem"];
    const rows = AppState.leads.map(l => [
      `"${l.date}"`, `"${l.name}"`, `"${l.email}"`, `"${l.phone}"`, `"${l.company}"`, `"${l.subject}"`, `"${l.source}"`, `"${l.message.replace(/"/g, '""')}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `choices_insights_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exportação concluída.');
  });

  // Clear all leads
  const clearLeadsBtn = document.getElementById('adminClearLeadsBtn');
  clearLeadsBtn?.addEventListener('click', () => {
    if (confirm('Atenção: deseja limpar TODO o histórico de leads? Esta ação não pode ser desfeita.')) {
      AppState.leads = [];
      localStorage.setItem('ci_leads', JSON.stringify([]));
      renderAdminLeads();
      updateAdminStats();
      showToast('Histórico de leads limpo.');
    }
  });

  // Add Product Button
  const addProdBtn = document.getElementById('adminAddProductBtn');
  addProdBtn?.addEventListener('click', () => {
    const title = prompt('Título do Novo Produto:');
    if (!title) return;
    const price = prompt('Preço (ex: R$ 97,00):', 'R$ 97,00') || 'R$ 97,00';
    const category = prompt('Categoria (ex: Estratégia Digital):', 'Estratégia Digital') || 'Estratégia Digital';
    const description = prompt('Descrição do Produto:', 'Estratégias e ferramentas para alavancar suas vendas.') || '';
    const link = prompt('Link do Produto/Checkout:', `https://wa.me/${AppState.whatsappNumber}`) || `https://wa.me/${AppState.whatsappNumber}`;

    const newProd = {
      id: "prod-" + Date.now(),
      title,
      badge: "Novo",
      category,
      rating: "5.0 (10)",
      price,
      description,
      link,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80",
      active: true
    };

    AppState.products.push(newProd);
    localStorage.setItem('ci_products', JSON.stringify(AppState.products));
    renderAdminProducts();
    renderProducts();
    updateAdminStats();
    showToast('Novo produto cadastrado com sucesso!');
  });

  // Export Products Configuration Button
  const exportProductsBtn = document.getElementById('adminExportProductsBtn');
  exportProductsBtn?.addEventListener('click', () => {
    if (AppState.products.length === 0) {
      showToast('Não há produtos para exportar.', 'error');
      return;
    }

    const code = 'const defaultProducts = ' + JSON.stringify(AppState.products, null, 2) + ';';

    navigator.clipboard.writeText(code).then(() => {
      showToast('✅ Configuração copiada! Cole no app.js substituindo o bloco defaultProducts.', 'success');
      openExportModal(code);
    }).catch(err => {
      console.error('Falha ao copiar:', err);
      openExportModal(code);
    });
  });

  // Save Settings Form (com hash de senha)
  const settingsForm = document.getElementById('adminSettingsForm');
  settingsForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newPhone = document.getElementById('adminSetPhone').value.trim();
    const newEmail = document.getElementById('adminSetEmail').value.trim();
    const newPwd = document.getElementById('adminSetPassword').value.trim();

    if (newPhone) {
      AppState.whatsappNumber = newPhone.replace(/\D/g, '');
      localStorage.setItem('ci_whatsapp', AppState.whatsappNumber);
      const waLink = document.getElementById('mainWaLink');
      if (waLink) waLink.setAttribute('href', `https://wa.me/${AppState.whatsappNumber}`);
    }

    if (newEmail) {
      AppState.contactEmail = newEmail;
      localStorage.setItem('ci_email', AppState.contactEmail);
      const mailLink = document.getElementById('mainMailLink');
      if (mailLink) mailLink.setAttribute('href', `mailto:${AppState.contactEmail}`);
      const mailText = document.getElementById('mainMailText');
      if (mailText) mailText.textContent = AppState.contactEmail;
    }

    if (newPwd) {
      const newHash = await sha256(newPwd);
      AppState.adminPasswordHash = newHash;
      localStorage.setItem('ci_admin_pwd', newHash);
      document.getElementById('adminSetPassword').value = '';
    }

    showToast('Configurações salvas com sucesso!');
  });
}

// Modal que mostra o código copiado (com opções de re-copiar e baixar)
function openExportModal(code) {
  document.getElementById('exportConfigModal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'exportConfigModal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(11,15,25,0.85);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;';

  modal.innerHTML = `
    <div style="background:#FFFFFF;border-radius:16px;padding:24px;max-width:820px;width:100%;max-height:85vh;display:flex;flex-direction:column;gap:16px;box-shadow:0 20px 35px -5px rgba(15,23,42,0.3);">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
        <h3 style="font-size:1.15rem;margin:0;color:#111827;">✅ Configuração dos InfoProdutos</h3>
        <button id="closeExportModal" style="background:none;border:none;font-size:1.6rem;cursor:pointer;color:#64748B;line-height:1;padding:0 4px;">&times;</button>
      </div>
      <p style="font-size:0.9rem;color:#4B5563;margin:0;line-height:1.6;">
        O código já foi <strong>copiado para sua área de transferência</strong>. Agora:
        <br>1. Abra o arquivo <code style="background:#F1F5F9;padding:2px 6px;border-radius:4px;font-family:monospace;">app.js</code>
        <br>2. Localize o bloco <code style="background:#F1F5F9;padding:2px 6px;border-radius:4px;font-family:monospace;">const defaultProducts = [...]</code>
        <br>3. Selecione tudo (do <code style="background:#F1F5F9;padding:2px 6px;border-radius:4px;font-family:monospace;">const</code> até o <code style="background:#F1F5F9;padding:2px 6px;border-radius:4px;font-family:monospace;">];</code>)
        <br>4. Cole com <strong>Ctrl+V</strong> e salve o arquivo
      </p>
      <textarea id="exportCodeArea" readonly style="width:100%;height:340px;font-family:'Courier New',monospace;font-size:0.78rem;padding:14px;border:1.5px solid #E5E7EB;border-radius:8px;background:#F8FAFC;resize:none;outline:none;color:#111827;line-height:1.5;"></textarea>
      <div style="display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;">
        <button id="copyExportBtn" class="btn btn-primary btn-sm">📋 Copiar Novamente</button>
        <button id="downloadExportBtn" class="btn btn-secondary btn-sm">💾 Baixar Arquivo</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const textarea = modal.querySelector('#exportCodeArea');
  textarea.value = code;

  const closeModal = () => modal.remove();
  modal.querySelector('#closeExportModal').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  modal.querySelector('#copyExportBtn').addEventListener('click', () => {
    textarea.select();
    navigator.clipboard.writeText(code).then(() => {
      showToast('✅ Código copiado novamente!', 'success');
    }).catch(() => {
      textarea.select();
      showToast('Pressione Ctrl+C para copiar.', 'success');
    });
  });

  modal.querySelector('#downloadExportBtn').addEventListener('click', () => {
    const blob = new Blob([code], { type: 'text/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'defaultProducts.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('✅ Arquivo baixado!', 'success');
  });
}
