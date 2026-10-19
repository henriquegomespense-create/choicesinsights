/* ============================================
   CHOICES INSIGHTS — STORAGE (ponte admin ↔ site)
   ============================================ */

   const Storage = (() => {
    const PRODUCTS_KEY   = 'ci_products';
    const CATEGORIES_KEY = 'ci_categories';
    const SETTINGS_KEY   = 'ci_settings';
    const LEADS_KEY      = 'ci_leads';
    const AUTH_KEY       = 'ci_auth';
  
    // ---------------------------------------------------------
    // CREDENCIAIS DO ADMIN  (troque a senha abaixo!)
    // ---------------------------------------------------------
    const ADMIN_EMAIL    = 'henriquegomes.pense@gmail.com';
    const ADMIN_PASSWORD = '{[Co_26$KnSn706984%318.798—;**]}';
  
    // ---------------------------------------------------------
    // CATEGORIAS PADRÃO (O que vai subir no Git)
    // ---------------------------------------------------------
    const DEFAULT_CATEGORIES = [
      { id: 'health', name: { pt: 'Saúde e Boa Forma', en: 'Health & Fitness', es: 'Salud y Forma Física' } },
      { id: 'commerce', name: { pt: 'Comércio Eletrônico', en: 'E-Commerce', es: 'Comercio Electrónico' } },
      { id: 'self', name: { pt: 'Auto-Ajuda', en: 'Self-Help', es: 'Autoayuda' } },
      { id: 'spirituality', name: { pt: 'Espiritualidade', en: 'Spirituality', es: 'Espiritualidad' } },
      { id: 'marketing', name: { pt: 'Marketing Digital', en: 'Digital Marketing', es: 'Marketing Digital' } }
    ];
  
    // ---------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------
    function getFromLS(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        if (raw === null) return fallback;
        const parsed = JSON.parse(raw);
        return parsed === null || parsed === undefined ? fallback : parsed;
      } catch (e) {
        console.warn(`[Storage] Falha ao ler "${key}":`, e);
        return fallback;
      }
    }
  
    function saveToLS(key, data) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
      } catch (e) {
        console.error(`[Storage] Falha ao salvar "${key}":`, e);
        return false;
      }
    }
  
    function uid(prefix = 'id') {
      return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    }
  
    // ---------------------------------------------------------
    // AUTH
    // ---------------------------------------------------------
    function login(email, password) {
      const ok = String(email).trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()
              && String(password) === ADMIN_PASSWORD;
      if (ok) {
        saveToLS(AUTH_KEY, { email: ADMIN_EMAIL, at: Date.now() });
        return { success: true, user: { email: ADMIN_EMAIL } };
      }
      return { success: false, error: 'E-mail ou senha incorretos.' };
    }
  
    function logout() {
      localStorage.removeItem(AUTH_KEY);
    }
  
    function isLogged() {
      const s = getFromLS(AUTH_KEY, null);
      return !!(s && s.email);
    }
  
    // ---------------------------------------------------------
    // PRODUTOS
    // ---------------------------------------------------------
    async function getProducts() {
      return getFromLS(PRODUCTS_KEY, []);
    }
  
    async function getProduct(id) {
      return getFromLS(PRODUCTS_KEY, []).find(p => p.id === id) || null;
    }
  
    async function saveProduct(product) {
      const products = getFromLS(PRODUCTS_KEY, []);
  
      if (typeof product.link === 'string') product.link = product.link.trim();
      product.updatedAt = new Date().toISOString();
      product.id = product.id || uid('prod');
  
      const index = products.findIndex(p => p.id === product.id);
      if (index > -1) products[index] = product;
      else products.push(product);
  
      return saveToLS(PRODUCTS_KEY, products);
    }
  
    async function deleteProduct(id) {
      const products = getFromLS(PRODUCTS_KEY, []).filter(p => p.id !== id);
      return saveToLS(PRODUCTS_KEY, products);
    }
  
    async function moveProduct(id, direction) {
      const products = getFromLS(PRODUCTS_KEY, []);
      const i = products.findIndex(p => p.id === id);
      if (i === -1) return false;
      const j = direction === 'up' ? i - 1 : i + 1;
      if (j < 0 || j >= products.length) return false;
      [products[i], products[j]] = [products[j], products[i]];
      return saveToLS(PRODUCTS_KEY, products);
    }
  
    async function toggleProductActive(id) {
      const products = getFromLS(PRODUCTS_KEY, []);
      const p = products.find(x => x.id === id);
      if (!p) return false;
      p.active = !(p.active !== false);
      return saveToLS(PRODUCTS_KEY, products);
    }
  
    // ---------------------------------------------------------
    // CATEGORIAS
    // ---------------------------------------------------------
    async function getCategories() {
      const existing = getFromLS(CATEGORIES_KEY, null);
      
      // Se não houver nada salvo ainda (primeiro acesso), injeta as categorias padrão do código
      if (existing === null || existing.length === 0) {
        saveToLS(CATEGORIES_KEY, DEFAULT_CATEGORIES);
        return DEFAULT_CATEGORIES;
      }
      return existing;
    }
  
    async function getCategory(id) {
      return getFromLS(CATEGORIES_KEY, []).find(c => c.id === id) || null;
    }
  
    async function saveCategory(category) {
      const categories = getFromLS(CATEGORIES_KEY, []);
      category.id = category.id || uid('cat');
      const index = categories.findIndex(c => c.id === category.id);
      if (index > -1) categories[index] = category;
      else categories.push(category);
      return saveToLS(CATEGORIES_KEY, categories);
    }
  
    async function deleteCategory(id) {
      const categories = getFromLS(CATEGORIES_KEY, []).filter(c => c.id !== id);
      // Limpa a categoria dos produtos que a usavam
      const products = getFromLS(PRODUCTS_KEY, []).map(p =>
        p.category === id ? { ...p, category: '' } : p
      );
      saveToLS(PRODUCTS_KEY, products);
      return saveToLS(CATEGORIES_KEY, categories);
    }
  
    // ---------------------------------------------------------
    // CONFIGURAÇÕES
    // ---------------------------------------------------------
    async function getSettings() {
      return getFromLS(SETTINGS_KEY, {});
    }
  
    async function saveSettings(settings) {
      return saveToLS(SETTINGS_KEY, settings);
    }
  
    // ---------------------------------------------------------
    // LEADS
    // ---------------------------------------------------------
    async function saveLead(lead) {
      if (!lead) return false;
      const leads = getFromLS(LEADS_KEY, []);
      leads.push({
        ...lead,
        id: uid('lead'),
        createdAt: new Date().toISOString()
      });
      return saveToLS(LEADS_KEY, leads);
    }
  
    async function getLeads() {
      return getFromLS(LEADS_KEY, []);
    }
  
    async function deleteLead(id) {
      const leads = getFromLS(LEADS_KEY, []).filter(l => l.id !== id);
      return saveToLS(LEADS_KEY, leads);
    }
  
    // ---------------------------------------------------------
    // API pública
    // ---------------------------------------------------------
    return {
      // auth
      login, logout, isLogged,
      // produtos
      getProducts, getProduct, saveProduct, deleteProduct,
      moveProduct, toggleProductActive,
      // categorias
      getCategories, getCategory, saveCategory, deleteCategory,
      // configurações
      getSettings, saveSettings,
      // leads
      saveLead, getLeads, deleteLead,
      // util
      uid
    };
  })();