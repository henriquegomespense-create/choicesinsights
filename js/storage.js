/* ============================================
   CHOICES INSIGHTS — STORAGE (mock do Firebase)
   --------------------------------------------
   Este arquivo simula o Firebase usando localStorage.
   Quando plugar o Firebase real, basta reescrever as
   funções abaixo mantendo a MESMA assinatura.
   ============================================ */

const Storage = (() => {
  const KEYS = {
    PRODUCTS:   'ci_products',
    CATEGORIES: 'ci_categories',
    SETTINGS:   'ci_settings',
    LEADS:      'ci_leads',
    AUTH:       'ci_auth'
  };

  // ---------- HELPERS ----------
  function read(key, fallback = []) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      console.error('[Storage] Erro ao ler', key, err);
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error('[Storage] Erro ao escrever', key, err);
      return false;
    }
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  // ---------- SEED (dados iniciais na 1ª vez) ----------
  function seedIfEmpty() {
    if (!localStorage.getItem(KEYS.CATEGORIES)) {
      const defaultCats = [
        { id: 'marketing',   name: { pt: 'Marketing Digital',  en: 'Digital Marketing', es: 'Marketing Digital' },   order: 1 },
        { id: 'tools',       name: { pt: 'Ferramentas',        en: 'Tools',             es: 'Herramientas' },       order: 2 },
        { id: 'courses',     name: { pt: 'Cursos',             en: 'Courses',           es: 'Cursos' },             order: 3 },
        { id: 'insights',    name: { pt: 'Insights',           en: 'Insights',          es: 'Insights' },           order: 4 }
      ];
      write(KEYS.CATEGORIES, defaultCats);
    }

    if (!localStorage.getItem(KEYS.PRODUCTS)) {
      const defaultProducts = [
        {
          id: uid(),
          order: 1,
          imageUrl: '',
          link: 'https://example.com/produto-1',
          category: 'marketing',
          badge: 'new',
          featured: true,
          active: true,
          title: {
            pt: 'Curso de Tráfego Pago',
            en: 'Paid Traffic Course',
            es: 'Curso de Tráfico Pago'
          },
          description: {
            pt: 'Aprenda a escalar campanhas no Google e Meta Ads do zero ao avançado.',
            en: 'Learn to scale Google and Meta Ads campaigns from zero to advanced.',
            es: 'Aprende a escalar campañas en Google y Meta Ads de cero a avanzado.'
          },
          createdAt: new Date().toISOString()
        },
        {
          id: uid(),
          order: 2,
          imageUrl: '',
          link: 'https://example.com/produto-2',
          category: 'tools',
          badge: 'promo',
          featured: true,
          active: true,
          title: {
            pt: 'Ferramenta de Automação',
            en: 'Automation Tool',
            es: 'Herramienta de Automatización'
          },
          description: {
            pt: 'Automatize tarefas repetitivas e ganhe 10h por semana.',
            en: 'Automate repetitive tasks and save 10h per week.',
            es: 'Automatiza tareas repetitivas y gana 10h por semana.'
          },
          createdAt: new Date().toISOString()
        },
        {
          id: uid(),
          order: 3,
          imageUrl: '',
          link: 'https://example.com/produto-3',
          category: 'insights',
          badge: 'top',
          featured: false,
          active: true,
          title: {
            pt: 'Guia de Produtividade',
            en: 'Productivity Guide',
            es: 'Guía de Productividad'
          },
          description: {
            pt: 'Métodos comprovados para fazer mais em menos tempo.',
            en: 'Proven methods to do more in less time.',
            es: 'Métodos comprobados para hacer más en menos tiempo.'
          },
          createdAt: new Date().toISOString()
        }
      ];
      write(KEYS.PRODUCTS, defaultProducts);
    }

    if (!localStorage.getItem(KEYS.SETTINGS)) {
      const defaultSettings = {
        whatsapp: '5517981434509',
        whatsappMessage: {
          pt: 'Olá! Vim pelo site Choices Insights e gostaria de saber mais sobre os produtos.',
          en: 'Hi! I came from the Choices Insights website and would like to know more.',
          es: '¡Hola! Vengo del sitio web Choices Insights y me gustaría saber más.'
        },
        email: 'contato@choicesinsights.com',
        instagram: '',
        linkedin: '',
        youtube: '',
        tiktok: ''
      };
      write(KEYS.SETTINGS, defaultSettings);
    }

    if (!localStorage.getItem(KEYS.LEADS)) {
      write(KEYS.LEADS, []);
    }
  }

  // ============================================
  // PRODUTOS
  // ============================================
  function getProducts() {
    return read(KEYS.PRODUCTS, []).sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  function getProduct(id) {
    return getProducts().find(p => p.id === id);
  }

  function saveProduct(product) {
    const list = read(KEYS.PRODUCTS, []);
    const idx = list.findIndex(p => p.id === product.id);

    if (idx >= 0) {
      product.updatedAt = new Date().toISOString();
      list[idx] = product;
    } else {
      product.id = product.id || uid();
      product.order = list.length + 1;
      product.createdAt = new Date().toISOString();
      list.push(product);
    }

    return write(KEYS.PRODUCTS, list) ? product : null;
  }

  function deleteProduct(id) {
    const list = read(KEYS.PRODUCTS, []).filter(p => p.id !== id);
    // Reordena
    list.forEach((p, i) => p.order = i + 1);
    return write(KEYS.PRODUCTS, list);
  }

  function toggleProductActive(id) {
    const p = getProduct(id);
    if (!p) return false;
    p.active = !p.active;
    return !!saveProduct(p);
  }

  function toggleProductFeatured(id) {
    const p = getProduct(id);
    if (!p) return false;
    p.featured = !p.featured;
    return !!saveProduct(p);
  }

  function moveProduct(id, direction) {
    const list = getProducts();
    const idx = list.findIndex(p => p.id === id);
    if (idx < 0) return false;

    const target = direction === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= list.length) return false;

    [list[idx].order, list[target].order] = [list[target].order, list[idx].order];
    return write(KEYS.PRODUCTS, list);
  }

  // ============================================
  // CATEGORIAS
  // ============================================
  function getCategories() {
    return read(KEYS.CATEGORIES, []).sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  function getCategory(id) {
    return getCategories().find(c => c.id === id);
  }

  function saveCategory(category) {
    const list = read(KEYS.CATEGORIES, []);
    const idx = list.findIndex(c => c.id === category.id);

    if (idx >= 0) {
      list[idx] = category;
    } else {
      category.id = category.id || uid();
      category.order = list.length + 1;
      list.push(category);
    }

    return write(KEYS.CATEGORIES, list) ? category : null;
  }

  function deleteCategory(id) {
    const list = read(KEYS.CATEGORIES, []).filter(c => c.id !== id);
    list.forEach((c, i) => c.order = i + 1);
    return write(KEYS.CATEGORIES, list);
  }

  // ============================================
  // SETTINGS
  // ============================================
  function getSettings() {
    return read(KEYS.SETTINGS, {});
  }

  function saveSettings(settings) {
    return write(KEYS.SETTINGS, settings);
  }

  // ============================================
  // LEADS
  // ============================================
  function getLeads() {
    return read(KEYS.LEADS, []).sort((a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  function saveLead(lead) {
    const list = read(KEYS.LEADS, []);
    lead.id = uid();
    lead.createdAt = new Date().toISOString();
    list.push(lead);
    return write(KEYS.LEADS, list) ? lead : null;
  }

  function deleteLead(id) {
    const list = read(KEYS.LEADS, []).filter(l => l.id !== id);
    return write(KEYS.LEADS, list);
  }

  // ============================================
  // AUTH (mock — a substituir pelo Firebase Auth)
  // ============================================
  const ADMIN_CREDENTIALS = {
    email: 'henriquegomes.pense@gmail.com',
    // ⚠️ SENHA EM TEXTO PURO APENAS PARA DEMO
    // No Firebase isso será gerenciado com hash pelo próprio Google
    password: '{[Co_26$KnSn706984%318.798—;**]}'
  };

  function login(email, password) {
    if (email.trim().toLowerCase() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const session = { email, loggedInAt: Date.now() };
      write(KEYS.AUTH, session);
      return { success: true, user: session };
    }
    return { success: false, error: 'E-mail ou senha inválidos' };
  }

  function logout() {
    localStorage.removeItem(KEYS.AUTH);
  }

  function getSession() {
    return read(KEYS.AUTH, null);
  }

  function isLoggedIn() {
    return !!getSession();
  }

  // ============================================
  // EXPORT
  // ============================================
  return {
    // Init
    seedIfEmpty,

    // Produtos
    getProducts, getProduct, saveProduct, deleteProduct,
    toggleProductActive, toggleProductFeatured, moveProduct,

    // Categorias
    getCategories, getCategory, saveCategory, deleteCategory,

    // Settings
    getSettings, saveSettings,

    // Leads
    getLeads, saveLead, deleteLead,

    // Auth
    login, logout, getSession, isLoggedIn,

    // Utils
    uid
  };
})();

// Seed na primeira carga
Storage.seedIfEmpty();