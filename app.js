/* ============================================================
   ARQUIVO: app.js
   TIPO: JAVASCRIPT (NÃO É CSS!)
   
   ⚠️ SE ESTE ARQUIVO COMEÇAR COM ":root {" OU CONTIVER
      "--primary:" NO INÍCIO, VOCÊ ESTÁ COM O ARQUIVO ERRADO.
      Apague TUDO e cole o JavaScript correto abaixo.
   
   Este arquivo DEVE começar com /** e terminar com }
   ============================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyAP8Ze2JTy-J_M12pn6Ma66kZ966uAcob8",
  authDomain: "choices-insights.firebaseapp.com",
  projectId: "choices-insights",
  storageBucket: "choices-insights.firebasestorage.app",
  messagingSenderId: "317288103777",
  appId: "1:317288103777:web:a87a8e64cff6e853264f20"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.enablePersistence({ synchronizeTabs: true }).catch(e => console.warn('[Choices] offline:', e.code));

const translations = {
  pt: {
    meta_title: "Choices Insights | Escolhas mais inteligentes. Vendas mais fortes.",
    meta_desc: "Escolhas mais inteligentes | Vendas mais fortes | Vendas online.",
    nav_about: "Sobre", nav_resources: "Recursos", nav_links: "Links", nav_contact_btn: "Fale conosco",
    hero_title_choices: "Choices", hero_title_insights: "Insights",
    hero_slogan: "Insights que transformam escolhas Inteligentes em resultados.",
    about_tag: "Por que nós", about_title: "Por que Choices Insights?",
    about_subtitle: "Combinamos análise de dados e estratégia de vendas para você tomar as melhores decisões no e-commerce.",
    about_card1_title: "Decisões Baseadas em Dados",
    about_card1_desc: "Elimine o 'achismo'. Utilizamos métricas concretas de mercado e comportamento do consumidor para direcionar cada passo.",
    about_card2_title: "Curadoria de Alto Impacto",
    about_card2_desc: "Selecionamos e estruturamos infoprodutos com alta demanda e retenção para maximizar seu retorno sobre o investimento.",
    about_card3_title: "Escala & Otimização Contínua",
    about_card3_desc: "Processos e funis desenhados para crescer de forma sustentável, mantendo a rentabilidade e a experiência do cliente.",
    about_visual_title: "Painel de Performance em Tempo Real",
    infoproducts_title: "Produtos em Destaque",
    resources_tag: "O que entregamos", resources_title: "Produtos, Ferramentas e Insights",
    resources_subtitle: "Produtos, Ferramentas e Insights que geram resultados reais.",
    marketing_title: "Marketing Digital de Alta Performance",
    marketing_card1_title: "2.1 Análise de Dados", marketing_card1_desc: "Relatórios claros e acionáveis para entender o comportamento do seu cliente.",
    marketing_card2_title: "2.2 Decisões Inteligentes", marketing_card2_desc: "Recomendações baseadas em dados para aumentar conversão e ticket médio.",
    marketing_card3_title: "2.3 Otimização Contínua", marketing_card3_desc: "Acompanhamento constante para manter suas vendas sempre em crescimento.",
    links_tag: "Contatos & Conexões", links_title: "Nossos canais & recursos",
    links_subtitle: "Acesse nossos conteúdos, lojas e redes.",
    channel_email_title: "E-mail Oficial", channel_whatsapp_title: "WhatsApp - Atendimento rápido",
    channel_whatsapp_status: "Online agora para te atender",
    btn_copy: "Copiar", btn_copied: "Copiado!", btn_open_chat: "Conversar no WhatsApp",
    form_title: "Fale com um Especialista", form_subtitle: "Preencha o formulário abaixo e retornaremos em até 2 horas.",
    form_label_name: "Nome Completo", form_placeholder_name: "Seu nome completo",
    form_label_email: "E-mail", form_placeholder_email: "seu.email@empresa.com",
    form_label_phone: "Telefone / WhatsApp", form_placeholder_phone: "(17) 98143-4509",
    form_label_company: "Empresa / Negócio", form_placeholder_company: "Nome do seu negócio (opcional)",
    form_label_subject: "Assunto", form_subj_select: "Selecione o assunto...",
    form_subj_opt1: "Dúvida sobre produto", form_subj_opt2: "Suporte", form_subj_opt3: "Parceria", form_subj_opt4: "Orçamento", form_subj_opt5: "Outro",
    form_label_source: "Como nos Conheceu?", form_src_select: "Selecione uma opção...",
    form_src_opt1: "Google / Pesquisa", form_src_opt2: "Instagram", form_src_opt3: "Indicação de Amigo / Colega",
    form_src_opt4: "YouTube", form_src_opt5: "WhatsApp", form_src_opt6: "Outro canal",
    form_label_message: "Mensagem", form_placeholder_message: "Como podemos ajudar você a tomar melhores decisões?",
    form_btn_submit: "Enviar Mensagem", form_btn_sending: "Enviando...",
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
    meta_title: "Choices Insights | Smarter Choices. Stronger Sales.", meta_desc: "Smarter choices | Stronger sales.",
    nav_about: "About", nav_resources: "Solutions", nav_links: "Links", nav_contact_btn: "Contact Us",
    hero_title_choices: "Choices", hero_title_insights: "Insights", hero_slogan: "Insights that transform smart choices into results.",
    about_tag: "Why Us", about_title: "Why Choices Insights?", about_subtitle: "We combine data analytics and sales strategy for smarter e-commerce decisions.",
    about_card1_title: "Data-Driven Decisions", about_card1_desc: "Eliminate guesswork. We use concrete metrics to guide every step.",
    about_card2_title: "High-Impact Curation", about_card2_desc: "We handpick digital products with proven demand to maximize ROI.",
    about_card3_title: "Scale & Continuous Optimization", about_card3_desc: "Processes engineered for sustainable growth and retention.",
    about_visual_title: "Real-Time Performance Dashboard",
    infoproducts_title: "Featured Products", resources_tag: "What We Deliver", resources_title: "Products, Tools and Insights", resources_subtitle: "Real, measurable results.",
    marketing_title: "High-Performance Digital Marketing",
    marketing_card1_title: "2.1 Data Analysis", marketing_card1_desc: "Clear, actionable reports.",
    marketing_card2_title: "2.2 Smart Decisions", marketing_card2_desc: "Data-backed recommendations.",
    marketing_card3_title: "2.3 Continuous Optimization", marketing_card3_desc: "Ongoing monitoring.",
    links_tag: "Channels", links_title: "Our Channels & Resources", links_subtitle: "Access our content, stores, and hubs.",
    channel_email_title: "Official Email", channel_whatsapp_title: "WhatsApp - Fast Support", channel_whatsapp_status: "Online right now",
    btn_copy: "Copy", btn_copied: "Copied!", btn_open_chat: "Chat on WhatsApp",
    form_title: "Talk to a Specialist", form_subtitle: "Fill out the form and we will get back within 2 hours.",
    form_label_name: "Full Name", form_placeholder_name: "Your full name",
    form_label_email: "Email Address", form_placeholder_email: "your.name@company.com",
    form_label_phone: "Phone / WhatsApp", form_placeholder_phone: "+1 (555) 000-0000",
    form_label_company: "Company / Business", form_placeholder_company: "Your company (optional)",
    form_label_subject: "Subject", form_subj_select: "Select a subject...",
    form_subj_opt1: "Product Question", form_subj_opt2: "Support", form_subj_opt3: "Partnership", form_subj_opt4: "Quote", form_subj_opt5: "Other",
    form_label_source: "How did you hear about us?", form_src_select: "Select an option...",
    form_src_opt1: "Google / Search", form_src_opt2: "Instagram", form_src_opt3: "Friend Referral",
    form_src_opt4: "YouTube", form_src_opt5: "WhatsApp", form_src_opt6: "Other",
    form_label_message: "Message", form_placeholder_message: "How can we help you make smarter decisions?",
    form_btn_submit: "Send Message", form_btn_sending: "Sending...", form_send_whatsapp_check: "Also send copy via WhatsApp",
    cta_title: "Ready for smarter decisions?", cta_text: "Get in touch and discover how we can boost your sales.", cta_btn: "Contact us now",
    footer_rights: "© 2026 Choices Insights. All rights reserved.", footer_admin_link: "Admin Panel (Restricted)",
    toast_form_success: "Message sent successfully!", toast_form_error: "Please fill in all required fields."
  },
  es: {
    meta_title: "Choices Insights | Decisiones más inteligentes.", meta_desc: "Ventas más fuertes.",
    nav_about: "Sobre Nosotros", nav_resources: "Recursos", nav_links: "Enlaces", nav_contact_btn: "Contáctanos",
    hero_title_choices: "Choices", hero_title_insights: "Insights", hero_slogan: "Insights que transforman elecciones en resultados.",
    about_tag: "Por qué elegirnos", about_title: "¿Por qué Choices Insights?", about_subtitle: "Combinamos datos y estrategia para mejores decisiones en e-commerce.",
    about_card1_title: "Decisiones Basadas en Datos", about_card1_desc: "Elimina las dudas. Usamos métricas precisas.",
    about_card2_title: "Curaduría de Alto Impacto", about_card2_desc: "Infoproductos con alta demanda para maximizar tu retorno.",
    about_card3_title: "Escala & Optimización Continua", about_card3_desc: "Procesos para crecer de forma sostenible.",
    about_visual_title: "Panel de Rendimiento en Tiempo Real",
    infoproducts_title: "InfoProductos Destacados", resources_tag: "Lo que entregamos", resources_title: "Productos, Herramientas e Insights", resources_subtitle: "Resultados reales.",
    marketing_title: "Marketing Digital de Alto Rendimiento",
    marketing_card1_title: "2.1 Análisis de Datos", marketing_card1_desc: "Informes claros y accionables.",
    marketing_card2_title: "2.2 Decisiones Inteligentes", marketing_card2_desc: "Recomendaciones basadas en datos.",
    marketing_card3_title: "2.3 Optimización Continua", marketing_card3_desc: "Seguimiento constante.",
    links_tag: "Contactos", links_title: "Nuestros canales & recursos", links_subtitle: "Accede a nuestros contenidos.",
    channel_email_title: "Correo Electrónico", channel_whatsapp_title: "WhatsApp - Atención rápida", channel_whatsapp_status: "En línea ahora",
    btn_copy: "Copiar", btn_copied: "¡Copiado!", btn_open_chat: "Chatear por WhatsApp",
    form_title: "Habla con un Especialista", form_subtitle: "Completa el formulario y te responderemos en 2 horas.",
    form_label_name: "Nombre Completo", form_placeholder_name: "Tu nombre completo",
    form_label_email: "Correo", form_placeholder_email: "tu.nombre@empresa.com",
    form_label_phone: "Teléfono / WhatsApp", form_placeholder_phone: "+34 600 000 000",
    form_label_company: "Empresa / Negocio", form_placeholder_company: "Tu empresa (opcional)",
    form_label_subject: "Asunto", form_subj_select: "Selecciona el asunto...",
    form_subj_opt1: "Duda sobre producto", form_subj_opt2: "Soporte", form_subj_opt3: "Alianza", form_subj_opt4: "Presupuesto", form_subj_opt5: "Otro",
    form_label_source: "¿Cómo nos conociste?", form_src_select: "Selecciona una opción...",
    form_src_opt1: "Google / Búsqueda", form_src_opt2: "Instagram", form_src_opt3: "Recomendación",
    form_src_opt4: "YouTube", form_src_opt5: "WhatsApp", form_src_opt6: "Otro canal",
    form_label_message: "Mensaje", form_placeholder_message: "¿Cómo podemos ayudarte?",
    form_btn_submit: "Enviar Mensaje", form_btn_sending: "Enviando...", form_send_whatsapp_check: "Enviar también copia por WhatsApp",
    cta_title: "¿Listo para decisiones más inteligentes?", cta_text: "Ponte en contacto y descubre cómo podemos impulsar tus ventas.", cta_btn: "Habla con nosotros ahora",
    footer_rights: "© 2026 Choices Insights. Todos los derechos reservados.", footer_admin_link: "Área Administrativa (Privada)",
    toast_form_success: "¡Mensaje enviado con éxito!", toast_form_error: "Por favor, completa todos los campos obligatorios."
  }
};

const defaultProducts = [
  { id: "prod-1", title: "E-commerce Data Master", badge: "Mais Vendido", category: "Inteligência de Dados", rating: "4.9 (184)", price: "R$ 97,00", description: "Guia estratégico passo a passo para analisar métricas vitais e dobrar a conversão.", link: "https://wa.me/5517981434509?text=Olá!%20Tenho%20interesse%20no%20E-commerce%20Data%20Master.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80", active: true, order: 1 },
  { id: "prod-2", title: "Funil de Vendas Invisível", badge: "Destaque", category: "Automação & Conversão", rating: "4.8 (142)", price: "R$ 147,00", description: "Estruturas de automação para transformar visitantes em clientes recorrentes.", link: "https://wa.me/5517981434509?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Funil%20de%20Vendas%20Invisível.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80", active: true, order: 2 },
  { id: "prod-3", title: "Copywriting para Alta Conversão", badge: "Essencial", category: "Comunicação Persuasiva", rating: "5.0 (98)", price: "R$ 67,00", description: "Modelos e fórmulas de copy validadas para eliminar objeções de compra.", link: "https://wa.me/5517981434509?text=Olá!%20Quero%20adquirir%20o%20Copywriting%20para%20Alta%20Conversão.", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=80", active: true, order: 3 },
  { id: "prod-4", title: "Gestão de Tráfego 360°", badge: "Avançado", category: "Tráfego Pago & ROI", rating: "4.9 (210)", price: "R$ 197,00", description: "Metodologia completa para otimizar Meta Ads e Google Ads, reduzindo CPA.", link: "https://wa.me/5517981434509?text=Olá!%20Gostaria%20de%20conhecer%20o%20Gestão%20de%20Tráfego%20360.", image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=700&q=80", active: true, order: 4 },
  { id: "prod-5", title: "Dashboard Executivo de Vendas", badge: "Prático", category: "Planilhas & Dashboards", rating: "4.8 (76)", price: "R$ 47,00", description: "Template pronto para monitoramento de faturamento, ticket médio e metas.", link: "https://wa.me/5517981434509?text=Olá!%20Tenho%20interesse%20no%20Dashboard%20Executivo%20de%20Vendas.", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=700&q=80", active: true, order: 5 }
];

const DEFAULT_PWD_HASH = 'fa3b31e701850e337e5ea1c6a02ea743740613e4831132827cdb719c4da46b35';
const AppState = {
  currentLang: localStorage.getItem('ci_lang') || 'pt',
  adminPasswordHash: DEFAULT_PWD_HASH,
  whatsappNumber: '5517981434509',
  contactEmail: 'henriquegomes.pense@gmail.com',
  products: [], leads: [], stats: { pageViews: 0, productClicks: 0 }
};

function normalizeProduct(p) {
  return {
    id: p.id || ('prod-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7)),
    title: p.title || 'Produto sem título', badge: p.badge || 'Novo', category: p.category || 'Geral',
    rating: p.rating || '5.0', price: p.price || 'R$ 0,00', description: p.description || '',
    link: p.link || '#', image: p.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80',
    active: p.active !== false, order: typeof p.order === 'number' ? p.order : Date.now()
  };
}

async function sha256(str) {
  try {
    if (window.crypto && window.crypto.subtle) {
      const buf = new TextEncoder().encode(str);
      const h = await crypto.subtle.digest('SHA-256', buf);
      return Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) { console.warn('[Choices] SHA-256:', e); }
  let h = 0; for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
  return 'simple-' + Math.abs(h).toString(16).padStart(8, '0');
}

async function seedIfEmpty() {
  try {
    const snap = await db.collection('products').limit(1).get();
    if (!snap.empty) { console.log('[Choices] Firestore já possui dados.'); return; }
    console.log('[Choices] Populando Firestore...');
    const b = db.batch();
    defaultProducts.forEach((p, i) => b.set(db.collection('products').doc(p.id), { ...p, order: i + 1 }));
    b.set(db.collection('config').doc('site'), { whatsapp: '5517981434509', email: 'henriquegomes.pense@gmail.com', pageViews: 0, productClicks: 0 });
    b.set(db.collection('config').doc('auth'), { passwordHash: DEFAULT_PWD_HASH });
    await b.commit();
    console.log('[Choices] ✅ Firestore populado.');
  } catch (e) { console.error('[Choices] Seed:', e); }
}

function startRealtimeListeners() {
  db.collection('products').orderBy('order').onSnapshot(s => {
    AppState.products = s.docs.map(d => ({ ...d.data(), id: d.id }));
    renderProducts();
    if (document.getElementById('adminDashContainer')?.classList.contains('active')) { renderAdminProducts(); updateAdminStats(); }
  }, e => console.error('[Choices] produtos:', e));
  db.collection('leads').orderBy('timestamp', 'desc').limit(200).onSnapshot(s => {
    AppState.leads = s.docs.map(d => ({ ...d.data(), id: d.id }));
    if (document.getElementById('adminDashContainer')?.classList.contains('active')) { renderAdminLeads(); updateAdminStats(); }
    const b = document.getElementById('leadsBadgeCount'); if (b) b.textContent = AppState.leads.length;
  }, e => console.error('[Choices] leads:', e));
  db.collection('config').doc('site').onSnapshot(d => {
    if (!d.exists) return;
    const x = d.data();
    if (x.whatsapp) { AppState.whatsappNumber = x.whatsapp; document.getElementById('mainWaLink')?.setAttribute('href', `https://wa.me/${x.whatsapp}`); }
    if (x.email) { AppState.contactEmail = x.email; document.getElementById('mainMailLink')?.setAttribute('href', `mailto:${x.email}`); const mt = document.getElementById('mainMailText'); if (mt) mt.textContent = x.email; }
    if (typeof x.pageViews === 'number') AppState.stats.pageViews = x.pageViews;
    if (typeof x.productClicks === 'number') AppState.stats.productClicks = x.productClicks;
    updateAdminStats();
  }, e => console.error('[Choices] config:', e));
  db.collection('config').doc('auth').onSnapshot(d => {
    if (d.exists && d.data().passwordHash) AppState.adminPasswordHash = d.data().passwordHash;
  }, e => console.error('[Choices] auth:', e));
}

document.addEventListener('DOMContentLoaded', async () => {
  applyLanguage(AppState.currentLang);
  setupLanguageSelector(); setupNavigation(); setupContactForm(); setupAdminPanel(); setupCopyButtons();
  try {
    await seedIfEmpty();
    db.collection('config').doc('site').set({ pageViews: firebase.firestore.FieldValue.increment(1) }, { merge: true }).catch(() => {});
    startRealtimeListeners();
    console.log('✅ Choices Insights v3.0 pronto.');
  } catch (e) { console.error('[Choices] Init:', e); }
});

function setupLanguageSelector() {
  const b = document.getElementById('langBtn'), d = document.getElementById('langDropdown');
  if (!b || !d) return;
  b.addEventListener('click', e => { e.stopPropagation(); d.classList.toggle('active'); });
  document.addEventListener('click', () => d.classList.remove('active'));
  document.querySelectorAll('.lang-option').forEach(o => o.addEventListener('click', () => {
    const l = o.getAttribute('data-lang');
    if (l && translations[l]) { AppState.currentLang = l; localStorage.setItem('ci_lang', l); applyLanguage(l); d.classList.remove('active'); }
  }));
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.pt;
  document.title = dict.meta_title;
  const md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', dict.meta_desc);
  const ll = document.getElementById('currentLangLabel');
  if (ll) { const f = { pt: '🇧🇷 PT', en: '🇺🇸 EN', es: '🇪🇸 ES' }; ll.textContent = f[lang] || '🇧🇷 PT'; }
  document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.getAttribute('data-i18n'); if (dict[k]) el.textContent = dict[k]; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { const k = el.getAttribute('data-i18n-placeholder'); if (dict[k]) el.setAttribute('placeholder', dict[k]); });
}

function renderProducts() {
  const c = document.getElementById('productListSimple');
  if (!c) return;
  const a = AppState.products.filter(p => p.active !== false);
  if (a.length === 0) { c.innerHTML = '<li style="padding:20px;text-align:center;color:#94A3B8;font-size:0.92rem;">Carregando produtos...</li>'; return; }
  c.innerHTML = a.map(p => `
    <li class="product-list-item">
      <img src="${p.image}" alt="${p.title}" class="product-list-thumb" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80'">
      <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="product-list-link" onclick="trackProductClick('${p.id}')">${p.title}</a>
    </li>`).join('');
}

function trackProductClick(id) { db.collection('config').doc('site').set({ productClicks: firebase.firestore.FieldValue.increment(1) }, { merge: true }).catch(() => {}); }

function setupNavigation() {
  const h = document.querySelector('.site-header'), mt = document.getElementById('mobileToggle'), nl = document.getElementById('navLinks');
  window.addEventListener('scroll', () => { if (window.scrollY > 30) h?.classList.add('scrolled'); else h?.classList.remove('scrolled'); });
  if (mt && nl) { mt.addEventListener('click', () => nl.classList.toggle('mobile-open')); nl.querySelectorAll('a').forEach(l => l.addEventListener('click', () => nl.classList.remove('mobile-open'))); }
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', function(e) {
    const hh = this.getAttribute('href'); if (hh === '#' || hh === '#admin') return;
    const t = document.querySelector(hh); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }));
}

function setupContactForm() {
  const f = document.getElementById('contactForm'), pi = document.getElementById('contactPhone');
  if (pi) pi.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, ''); if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 10) e.target.value = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length > 5) e.target.value = `(${v.slice(0,2)}) ${v.slice(2,6)}-${v.slice(6)}`;
    else if (v.length > 2) e.target.value = `(${v.slice(0,2)}) ${v.slice(2)}`;
    else if (v.length > 0) e.target.value = `(${v}`;
  });
  if (!f) return;
  f.addEventListener('submit', async e => {
    e.preventDefault();
    const g = id => document.getElementById(id)?.value.trim();
    const name = g('contactName'), email = g('contactEmail'), phone = g('contactPhone');
    const company = g('contactCompany') || 'Não informada', subject = document.getElementById('contactSubject')?.value;
    const message = g('contactMessage'), source = document.getElementById('contactSource')?.value || 'Não informado';
    const sendWa = document.getElementById('sendWhatsappCheck')?.checked;
    const dict = translations[AppState.currentLang] || translations.pt;
    if (!name || !email || !phone || !message || !subject) { showToast(dict.toast_form_error, 'error'); return; }
    const btn = f.querySelector('button[type="submit"]'), orig = btn.innerHTML;
    btn.disabled = true; btn.textContent = dict.form_btn_sending;
    try {
      const fd = new FormData(f);
      const r = await fetch(f.action, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } });
      const res = await r.json();
      await db.collection('leads').add({ name, email, phone, company, subject, source, message, date: new Date().toLocaleString('pt-BR'), timestamp: Date.now(), status: 'Novo' });
      if (res.success) {
        showToast(dict.toast_form_success, 'success'); f.reset();
        if (sendWa) {
          const t = `*Novo Contato - Choices Insights*%0A*Nome:* ${encodeURIComponent(name)}%0A*E-mail:* ${encodeURIComponent(email)}%0A*Telefone:* ${encodeURIComponent(phone)}%0A*Empresa:* ${encodeURIComponent(company)}%0A*Assunto:* ${encodeURIComponent(subject)}%0A*Como conheceu:* ${encodeURIComponent(source)}%0A*Mensagem:* ${encodeURIComponent(message)}`;
          window.open(`https://wa.me/${AppState.whatsappNumber}?text=${t}`, '_blank');
        }
      } else showToast('Erro ao enviar e-mail.', 'error');
    } catch (e) { console.error(e); showToast('Erro de conexão.', 'error'); }
    finally { btn.disabled = false; btn.innerHTML = orig; }
  });
}

function setupCopyButtons() {
  document.querySelectorAll('.btn-copy-action').forEach(b => b.addEventListener('click', () => {
    const t = b.getAttribute('data-copy-target');
    if (t) navigator.clipboard.writeText(t).then(() => {
      const d = translations[AppState.currentLang] || translations.pt, o = b.textContent;
      b.textContent = d.btn_copied; setTimeout(() => { b.textContent = o; }, 2000);
    });
  }));
}

function showToast(m, type = 'success') {
  const c = document.getElementById('toastContainer'); if (!c) return;
  const t = document.createElement('div'); t.className = `toast ${type}`;
  t.innerHTML = `<span>${type === 'success' ? '✓' : '⚠'}</span><span>${m}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(10px)'; t.style.transition = 'all 0.3s ease'; setTimeout(() => t.remove(), 300); }, 4000);
}

function setupAdminPanel() {
  const ov = document.getElementById('adminModalOverlay'), ac = document.getElementById('adminAuthCard'), dc = document.getElementById('adminDashContainer');
  const af = document.getElementById('adminAuthForm'), ai = document.getElementById('adminAuthPassword');
  const acb = document.getElementById('adminAuthClose'), dcb = document.getElementById('adminDashClose'), lb = document.getElementById('adminLogoutBtn'), ft = document.getElementById('adminAccessTrigger');
  if (!ov || !ac || !dc) return;
  let attempts = 0, lock = 0;
  const open = () => { ov.classList.add('active'); ac.style.display = 'block'; dc.classList.remove('active'); ai?.focus(); };
  const close = () => { ov.classList.remove('active'); if (ai) ai.value = ''; };
  if (ft) ft.addEventListener('click', e => { e.preventDefault(); open(); });
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) { e.preventDefault(); open(); }
    if (e.key === 'Escape' && ov.classList.contains('active')) close();
  });
  acb?.addEventListener('click', close); dcb?.addEventListener('click', close); lb?.addEventListener('click', close);
  ov.addEventListener('click', e => { if (e.target === ov) close(); });
  af?.addEventListener('submit', async e => {
    e.preventDefault();
    try {
      if (Date.now() < lock) { showToast('Aguarde ' + Math.ceil((lock - Date.now()) / 60000) + ' min.', 'error'); return; }
      const h = await sha256(ai.value);
      if (h === AppState.adminPasswordHash) {
        attempts = 0; lock = 0; ac.style.display = 'none'; dc.classList.add('active'); renderAdminDashboard();
      } else {
        attempts++; ai.value = '';
        if (attempts >= 5) { lock = Date.now() + 5 * 60 * 1000; attempts = 0; showToast('⛔ Bloqueado por 5 min.', 'error'); }
        else showToast(`Senha incorreta. ${attempts}/5.`, 'error');
      }
    } catch (e) { console.error(e); showToast('Erro ao autenticar.', 'error'); }
  });
  document.querySelectorAll('.admin-nav-item').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.admin-nav-item').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(t => t.classList.remove('active'));
    b.classList.add('active');
    const t = document.getElementById(b.getAttribute('data-tab')); if (t) t.classList.add('active');
  }));
  setupAdminActions();
}

function renderAdminDashboard() { updateAdminStats(); renderAdminLeads(); renderAdminProducts(); loadAdminSettings(); }

function updateAdminStats() {
  const tl = document.getElementById('statTotalLeads'), lb = document.getElementById('leadsBadgeCount');
  const tv = document.getElementById('statPageViews'), tp = document.getElementById('statTotalProducts');
  if (tl) tl.textContent = AppState.leads.length;
  if (lb) lb.textContent = AppState.leads.length;
  if (tv) tv.textContent = AppState.stats.pageViews;
  if (tp) tp.textContent = AppState.products.length;
}

function renderAdminLeads() {
  const tb = document.getElementById('adminLeadsTbody'); if (!tb) return;
  if (AppState.leads.length === 0) { tb.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94A3B8;">Nenhum contato registrado ainda.</td></tr>'; return; }
  tb.innerHTML = AppState.leads.map(l => `
    <tr>
      <td><strong>${l.date || ''}</strong></td>
      <td><div style="font-weight:700;">${l.name || ''}</div><div style="font-size:0.8rem;color:#64748B;">${l.company || ''}</div></td>
      <td><a href="mailto:${l.email}" style="color:var(--primary);">${l.email || ''}</a></td>
      <td>${l.phone || ''}</td>
      <td><span style="font-size:0.82rem;background:#F1F5F9;padding:3px 8px;border-radius:4px;">${l.subject || ''}</span></td>
      <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${l.message || ''}">${l.message || ''}</td>
      <td><div class="lead-actions">
        <a href="https://wa.me/55${(l.phone || '').replace(/\D/g, '')}?text=Olá%20${encodeURIComponent(l.name || '')}!" target="_blank" class="btn-icon whatsapp-btn" title="WhatsApp"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
        <button class="btn-icon delete-btn" onclick="deleteLead('${l.id}')" title="Excluir"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
      </div></td>
    </tr>`).join('');
}

window.deleteLead = async function(id) {
  if (!confirm('Deseja realmente remover este contato?')) return;
  try { await db.collection('leads').doc(id).delete(); showToast('Lead excluído.'); }
  catch (e) { console.error(e); showToast('Erro ao excluir.', 'error'); }
};

function renderAdminProducts() {
  const c = document.getElementById('adminProductsList'); if (!c) return;
  if (AppState.products.length === 0) { c.innerHTML = '<p style="text-align:center;color:#94A3B8;padding:20px;">Nenhum produto no catálogo.</p>'; return; }
  c.innerHTML = AppState.products.map(p => `
    <div class="admin-product-item">
      <div class="admin-product-item-header">
        <img src="${p.image}" class="admin-prod-thumb" alt="${p.title}" onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80'">
        <div style="flex:1;"><h4 style="font-size:1rem;margin-bottom:2px;">${p.title}</h4><span style="font-size:0.8rem;color:var(--text-subtle);">${p.price} • ${p.category}</span></div>
      </div>
      <p style="font-size:0.85rem;color:var(--text-muted);">${p.description}</p>
      <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #E2E8F0;padding-top:10px;">
        <span style="font-size:0.82rem;font-weight:700;color:${p.active !== false ? '#10B981' : '#EF4444'};">${p.active !== false ? '● Ativo' : '○ Oculto'}</span>
        <div style="display:flex;gap:6px;">
          <button class="btn btn-secondary btn-sm" onclick="openProductEditModal('${p.id}')">Editar</button>
          <button class="btn btn-outline btn-sm" onclick="toggleProductActive('${p.id}')">${p.active !== false ? 'Desativar' : 'Ativar'}</button>
          <button class="btn btn-outline btn-sm" onclick="deleteProduct('${p.id}')" style="color:#EF4444;border-color:#FCA5A5;">Excluir</button>
        </div>
      </div>
    </div>`).join('');
}

window.toggleProductActive = async function(id) {
  const p = AppState.products.find(x => x.id === id); if (!p) return;
  try { await db.collection('products').doc(id).update({ active: p.active === false }); showToast('Produto atualizado.'); }
  catch (e) { console.error(e); showToast('Erro ao atualizar.', 'error'); }
};

window.deleteProduct = async function(id) {
  if (!confirm('Deseja realmente excluir este produto? Isso afeta todos os dispositivos.')) return;
  try { await db.collection('products').doc(id).delete(); showToast('Produto excluído.'); }
  catch (e) { console.error(e); showToast('Erro ao excluir.', 'error'); }
};

function loadAdminSettings() {
  const p = document.getElementById('adminSetPhone'), e = document.getElementById('adminSetEmail');
  if (p) p.value = AppState.whatsappNumber;
  if (e) e.value = AppState.contactEmail;
}

function setupAdminActions() {
  document.getElementById('adminExportLeadsBtn')?.addEventListener('click', () => {
    if (AppState.leads.length === 0) { showToast('Não há leads.', 'error'); return; }
    const headers = ["Data","Nome","Email","Telefone","Empresa","Assunto","Origem","Mensagem"];
    const rows = AppState.leads.map(l => [`"${l.date||''}"`,`"${l.name||''}"`,`"${l.email||''}"`,`"${l.phone||''}"`,`"${l.company||''}"`,`"${l.subject||''}"`,`"${l.source||''}"`,`"${(l.message||'').replace(/"/g,'""')}"`]);
    const csv = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const a = document.createElement("a"); a.setAttribute("href", encodeURI(csv)); a.setAttribute("download", `choices_leads_${Date.now()}.csv`);
    document.body.appendChild(a); a.click(); document.body.removeChild(a); showToast('Exportação concluída.');
  });
  document.getElementById('adminClearLeadsBtn')?.addEventListener('click', async () => {
    if (!confirm('Atenção: isso apaga TODOS os leads em TODOS os dispositivos. Confirma?')) return;
    try { const b = db.batch(); const s = await db.collection('leads').get(); s.forEach(d => b.delete(d.ref)); await b.commit(); showToast('Histórico limpo.'); }
    catch (e) { console.error(e); showToast('Erro ao limpar.', 'error'); }
  });
  document.getElementById('adminAddProductBtn')?.addEventListener('click', () => openProductEditModal(null));
  document.getElementById('adminSettingsForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const np = document.getElementById('adminSetPhone').value.trim(), ne = document.getElementById('adminSetEmail').value.trim(), npwd = document.getElementById('adminSetPassword').value.trim();
    try {
      const u = {};
      if (np) { const c = np.replace(/\D/g, ''); u.whatsapp = c; AppState.whatsappNumber = c; document.getElementById('mainWaLink')?.setAttribute('href', `https://wa.me/${c}`); }
      if (ne) { u.email = ne; AppState.contactEmail = ne; document.getElementById('mainMailLink')?.setAttribute('href', `mailto:${ne}`); const mt = document.getElementById('mainMailText'); if (mt) mt.textContent = ne; }
      if (Object.keys(u).length > 0) await db.collection('config').doc('site').set(u, { merge: true });
      if (npwd) { const nh = await sha256(npwd); await db.collection('config').doc('auth').set({ passwordHash: nh }, { merge: true }); document.getElementById('adminSetPassword').value = ''; showToast('Senha atualizada!'); return; }
      showToast('Configurações salvas!');
    } catch (e) { console.error(e); showToast('Erro ao salvar.', 'error'); }
  });
}

function openProductEditModal(id) {
  const isNew = !id;
  const prod = isNew
    ? normalizeProduct({ id: "prod-" + Date.now(), title: "", badge: "Novo", category: "Estratégia Digital", rating: "5.0 (10)", price: "R$ 97,00", description: "", link: `https://wa.me/${AppState.whatsappNumber}`, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80", active: true, order: AppState.products.length + 1 })
    : AppState.products.find(p => p.id === id);
  if (!prod) return;
  document.getElementById('productEditModal')?.remove();
  const m = document.createElement('div');
  m.id = 'productEditModal';
  m.style.cssText = 'position:fixed;inset:0;background:rgba(11,15,25,0.85);backdrop-filter:blur(10px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;overflow-y:auto;';
  m.innerHTML = `
    <div style="background:#FFF;border-radius:16px;padding:28px;max-width:640px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 25px 50px -12px rgba(0,0,0,0.4);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <h3 style="margin:0;font-size:1.2rem;color:#111827;">${isNew ? '➕ Adicionar Novo Produto' : '✏️ Editar Produto'}</h3>
        <button id="peClose" style="background:none;border:none;font-size:1.7rem;cursor:pointer;color:#64748B;line-height:1;">&times;</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div><label style="font-size:0.85rem;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Título *</label>
        <input id="peTitle" value="${(prod.title||'').replace(/"/g,'&quot;')}" style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:0.95rem;"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div><label style="font-size:0.85rem;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Preço</label>
          <input id="pePrice" value="${prod.price}" style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:0.95rem;"></div>
          <div><label style="font-size:0.85rem;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Categoria</label>
          <input id="peCategory" value="${prod.category}" style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:0.95rem;"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div><label style="font-size:0.85rem;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Selo</label>
          <input id="peBadge" value="${prod.badge}" style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:0.95rem;"></div>
          <div><label style="font-size:0.85rem;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Avaliação</label>
          <input id="peRating" value="${prod.rating}" style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:0.95rem;"></div>
        </div>
        <div><label style="font-size:0.85rem;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Descrição</label>
        <textarea id="peDesc" style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:0.95rem;min-height:70px;resize:vertical;">${prod.description}</textarea></div>
        <div><label style="font-size:0.85rem;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Link de Vendas</label>
        <input id="peLink" value="${(prod.link||'').replace(/"/g,'&quot;')}" style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:0.95rem;"></div>
        <div><label style="font-size:0.85rem;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Imagem</label>
          <div style="display:flex;gap:12px;align-items:flex-start;">
            <img id="pePreview" src="${prod.image}" style="width:90px;height:90px;object-fit:cover;border-radius:10px;border:2px solid #E5E7EB;" onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80'">
            <div style="flex:1;">
              <input id="peImageUrl" value="${prod.image.startsWith('data:') ? '' : prod.image.replace(/"/g,'&quot;')}" placeholder="URL da imagem..." style="width:100%;padding:9px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:0.85rem;margin-bottom:8px;">
              <label style="display:inline-block;padding:8px 14px;background:#EEF2FF;color:#3142DB;border-radius:8px;font-size:0.82rem;font-weight:600;cursor:pointer;border:1.5px solid #C7D2FE;">📁 Enviar do computador
              <input type="file" id="peImageFile" accept="image/*" style="display:none;"></label>
            </div>
          </div>
        </div>
        <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:8px;">
          <button id="peCancel" class="btn btn-secondary btn-sm">Cancelar</button>
          <button id="peSave" class="btn btn-primary btn-sm">${isNew ? '➕ Criar' : '💾 Salvar'}</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(m);
  const pv = m.querySelector('#pePreview'), ui = m.querySelector('#peImageUrl'), fi = m.querySelector('#peImageFile');
  let newImg = prod.image;
  ui.addEventListener('input', () => { const v = ui.value.trim(); if (v) { pv.src = v; newImg = v; } });
  fi.addEventListener('change', async e => {
    const f = e.target.files[0]; if (!f) return;
    if (!f.type.startsWith('image/')) { showToast('Selecione uma imagem.', 'error'); return; }
    if (f.size > 10 * 1024 * 1024) { showToast('Máx 10MB.', 'error'); return; }
    try { const c = await compressImage(f, 800, 0.82); newImg = c; pv.src = c; ui.value = ''; showToast('✅ Imagem otimizada.', 'success'); }
    catch (e) { console.error(e); showToast('Erro ao processar.', 'error'); }
  });
  const close = () => m.remove();
  m.querySelector('#peClose').addEventListener('click', close);
  m.querySelector('#peCancel').addEventListener('click', close);
  m.addEventListener('click', e => { if (e.target === m) close(); });
  m.querySelector('#peSave').addEventListener('click', async () => {
    const t = m.querySelector('#peTitle').value.trim();
    if (!t) { showToast('O título é obrigatório.', 'error'); return; }
    const upd = normalizeProduct({ ...prod, title: t,
      price: m.querySelector('#pePrice').value.trim() || prod.price,
      category: m.querySelector('#peCategory').value.trim() || prod.category,
      badge: m.querySelector('#peBadge').value.trim() || prod.badge,
      rating: m.querySelector('#peRating').value.trim() || prod.rating,
      description: m.querySelector('#peDesc').value.trim() || prod.description,
      link: m.querySelector('#peLink').value.trim() || prod.link,
      image: newImg || prod.image
    });
    try { await db.collection('products').doc(upd.id).set(upd, { merge: true }); showToast(isNew ? '✅ Produto criado!' : '✅ Produto atualizado!'); close(); }
    catch (e) { console.error(e); showToast('Erro ao salvar.', 'error'); }
  });
}

function compressImage(file, maxDim = 800, q = 0.82) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onerror = () => rej(new Error('Falha ao ler'));
    r.onload = e => {
      const img = new Image();
      img.onerror = () => rej(new Error('Inválida'));
      img.onload = () => {
        const c = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width >= height) { height = Math.round((maxDim / width) * height); width = maxDim; }
          else { width = Math.round((maxDim / height) * width); height = maxDim; }
        }
        c.width = width; c.height = height;
        c.getContext('2d').drawImage(img, 0, 0, width, height);
        res(c.toDataURL('image/jpeg', q));
      };
      img.src = e.target.result;
    };
    r.readAsDataURL(file);
  });
}