/* ============================================
   CHOICES INSIGHTS — STORAGE (LocalStorage)
   ============================================ */

const Storage = (() => {
  const KEYS = {
    PRODUCTS:   'ci_products',
    CATEGORIES: 'ci_categories',
    SETTINGS:   'ci_settings',
    LEADS:      'ci_leads',
    AUTH:       'ci_auth'
  };

  function read(key, fallback = []) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) { return fallback; }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) { return false; }
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function seedIfEmpty() {
    if (!localStorage.getItem(KEYS.CATEGORIES)) {
      write(KEYS.CATEGORIES, [
        { id: 'marketing', name: { pt: 'Marketing Digital', en: 'Digital Marketing', es: 'Marketing Digital' }, order: 1 },
        { id: 'tools', name: { pt: 'Ferramentas', en: 'Tools', es: 'Herramientas' }, order: 2 }
      ]);
    }
    if (!localStorage.getItem(KEYS.PRODUCTS)) {
      write(KEYS.PRODUCTS, [
        {
          id: uid(), order: 1, imageUrl: '', link: 'https://example.com', category: 'marketing', badge: 'new', active: true,
          title: { pt: 'Curso de Tráfego', en: 'Paid Traffic', es: 'Curso de Tráfico' },
          description: { pt: 'Aprenda a escalar campanhas.', en: 'Learn to scale.', es: 'Aprende a escalar.' },
          createdAt: new Date().toISOString()
        }
      ]);
    }
    if (!localStorage.getItem(KEYS.SETTINGS)) {
      write(KEYS.SETTINGS, {
        whatsapp: '5517981434509',
        whatsappMessage: { pt: 'Olá!', en: 'Hi!', es: '¡Hola!' },
        email: 'contato@choicesinsights.com'
      });
    }
  }

  // PRODUTOS
  function getProducts() { return read(KEYS.PRODUCTS, []).sort((a, b) => (a.order || 0) - (b.order || 0)); }
  function getProduct(id) { return getProducts().find(p => p.id === id); }
  
  function saveProduct(product) {
    const list = read(KEYS.PRODUCTS, []);
    const idx = list.findIndex(p => p.id === product.id);
    if (idx >= 0) {
      list[idx] = product;
    } else {
      product.id = product.id || uid();
      product.order = list.length + 1;
      list.push(product);
    }
    return write(KEYS.PRODUCTS, list) ? product : null;
  }

  function deleteProduct(id) {
    const list = read(KEYS.PRODUCTS, []).filter(p => p.id !== id);
    list.forEach((p, i) => p.order = i + 1);
    return write(KEYS.PRODUCTS, list);
  }

  function toggleProductActive(id) {
    const p = getProduct(id);
    if (p) { p.active = !p.active; saveProduct(p); }
  }

  // CATEGORIAS
  function getCategories() { return read(KEYS.CATEGORIES, []).sort((a, b) => (a.order || 0) - (b.order || 0)); }
  function getCategory(id) { return getCategories().find(c => c.id === id); }
  
  function saveCategory(cat) {
    const list = read(KEYS.CATEGORIES, []);
    const idx = list.findIndex(c => c.id === cat.id);
    if (idx >= 0) { list[idx] = cat; } 
    else { cat.id = cat.id || uid(); cat.order = list.length + 1; list.push(cat); }
    return write(KEYS.CATEGORIES, list) ? cat : null;
  }

  function deleteCategory(id) {
    const list = read(KEYS.CATEGORIES, []).filter(c => c.id !== id);
    list.forEach((c, i) => c.order = i + 1);
    return write(KEYS.CATEGORIES, list);
  }

  // SETTINGS & LEADS
  function getSettings() { return read(KEYS.SETTINGS, {}); }
  function saveSettings(s) { return write(KEYS.SETTINGS, s); }
  function getLeads() { return read(KEYS.LEADS, []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); }
  
  function saveLead(lead) {
    const list = read(KEYS.LEADS, []);
    lead.id = uid(); lead.createdAt = new Date().toISOString();
    list.push(lead);
    return write(KEYS.LEADS, list) ? lead : null;
  }
  
  function deleteLead(id) {
    const list = read(KEYS.LEADS, []).filter(l => l.id !== id);
    return write(KEYS.LEADS, list);
  }

  // AUTH (simplificado)
  const ADMIN_EMAIL = 'henriquegomes.pense@gmail.com';
  const ADMIN_PASS = '{[Co_26$KnSn706984%318.798—;**]}';

  function login(email, password) {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASS) {
      const session = { email, loggedInAt: Date.now() };
      write(KEYS.AUTH, session);
      return { success: true, user: session };
    }
    return { success: false, error: 'E-mail ou senha inválidos' };
  }
  function logout() { localStorage.removeItem(KEYS.AUTH); }
  function getSession() { return read(KEYS.AUTH, null); }
  function isLoggedIn() { return !!getSession(); }

  return {
    seedIfEmpty, getProducts, getProduct, saveProduct, deleteProduct, toggleProductActive,
    getCategories, getCategory, saveCategory, deleteCategory,
    getSettings, saveSettings, getLeads, saveLead, deleteLead,
    login, logout, getSession, isLoggedIn, uid
  };
})();

Storage.seedIfEmpty();