/* ============================================
   CHOICES INSIGHTS — APP (landing page com Firebase)
   ============================================ */

const App = (() => {
  let currentCategory = 'all';

  // Pega o texto traduzido, aceitando se vier como string ou objeto {pt, en, es}
  function getLocalized(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    const lang = I18N.lang || 'pt';
    return obj[lang] || obj.pt || '';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ---------- RENDER: FILTROS ----------
  async function renderFilters() {
    const container = document.getElementById('filters');
    if (!container) return;
    
    const categories = await Storage.getCategories();
    const allLabel = I18N.t('catalog.all') || 'Todos';
    let html = `<button class="filter-btn ${currentCategory === 'all' ? 'active' : ''}" data-cat="all">${escapeHtml(allLabel)}</button>`;
    
    categories.forEach(cat => {
      const name = getLocalized(cat.name);
      html += `<button class="filter-btn ${currentCategory === cat.id ? 'active' : ''}" data-cat="${escapeHtml(cat.id)}">${escapeHtml(name)}</button>`;
    });
    container.innerHTML = html;

    container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.dataset.cat;
        renderFilters();
        renderProducts();
      });
    });
  }

  // ---------- RENDER: CARD DE PRODUTO ----------
  function productCardHTML(product) {
    // Pega o título de forma segura (caso o Firebase retorne formatos diferentes)
    const rawTitle = product.title || 'Produto';
    const title = escapeHtml(getLocalized(rawTitle));
    
    // Pega a descrição de forma segura
    const rawDesc = product.description || '';
    const desc = escapeHtml(getLocalized(rawDesc));

    const badgeMap = { 
      new: { text: 'Novo', cls: 'badge-new' }, 
      promo: { text: 'Promoção', cls: 'badge-promo' }, 
      top: { text: 'Top', cls: 'badge-top' } 
    };
    const badge = badgeMap[product.badge];

    // Verifica se a imagem existe, senão gera o fundo roxo padrão
    const imgUrl = product.imageUrl || '';
    const imageUrl = imgUrl 
      ? escapeHtml(imgUrl) 
      : 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect width="400" height="250" fill="#4A3FD1"/><text x="50%" y="50%" text-anchor="middle" fill="white" font-family="sans-serif" font-size="20">${title.slice(0, 30)}</text></svg>`);

    return `
      <article class="product-card">
                <div class="product-image" style="height: 220px; width: 100%; overflow: hidden;">
          <img src="${imgUrl ? escapeHtml(imgUrl) : fallbackImg}" 
               alt="${title}" 
               loading="lazy"
               style="width: 100%; height: 100%; object-fit: contain;"
               onerror="this.onerror=null; this.src='${fallbackImg}';">
        <div class="product-body">
          <h3 class="product-title">${title}</h3>
          <p class="product-description">${desc}</p>
          <a href="${escapeHtml(product.link || '#')}" class="product-btn" target="_blank" rel="noopener">
            <span>${I18N.t('product.view') || 'Ver oferta'}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </article>
    `;
  }

  // ---------- RENDER: PRODUTOS ----------
  async function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const empty = document.getElementById('emptyProducts');
    if (!grid) return;

    grid.innerHTML = '<p style="text-align:center; width:100%; padding: 20px;">Carregando produtos...</p>';
    
    try {
      let products = await Storage.getProducts();
      
      // Filtra ativos
      if (products && products.length > 0) {
        products = products.filter(p => p.active !== false);
        
        // Filtra por categoria
        if (currentCategory !== 'all') {
          products = products.filter(p => p.category === currentCategory);
        }
      }

      if (!products || products.length === 0) {
        grid.innerHTML = '';
        if (empty) empty.style.display = 'block';
        return;
      }

      if (empty) empty.style.display = 'none';
      grid.innerHTML = products.map(productCardHTML).join('');
      
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      grid.innerHTML = '<p style="text-align:center; width:100%; padding: 20px; color: red;">Erro ao carregar os produtos. Tente novamente.</p>';
    }
  }

  // ---------- FORMULÁRIO ----------
  function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const lgpd = document.getElementById('lgpd').checked;

      if (!name || !email || !message || !lgpd) return alert(I18N.t('form.error'));

      const lead = { name, email, message, lgpd, source: 'form' };
      const saved = await Storage.saveLead(lead);
      if (saved) {
        form.reset();
        alert(I18N.t('form.success'));
      } else {
        alert(I18N.t('form.error'));
      }
    });
  }

  // ---------- HEADER SCROLL ----------
  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => { header.classList.toggle('scrolled', window.scrollY > 10); }, { passive: true });
  }

  // ---------- MENU MOBILE ----------
  function initMenu() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // ---------- SOCIAL LINKS ----------
  async function initSocial() {
    const settings = await Storage.getSettings();
    const map = { channelInstagram: settings.instagram, channelLinkedin: settings.linkedin, channelYoutube: settings.youtube, channelTiktok: settings.tiktok };
    Object.entries(map).forEach(([id, url]) => {
      const el = document.getElementById(id);
      if (el && url) el.href = url;
    });
  }

  function initYear() {
    const el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  async function renderAll() {
    await renderFilters();
    await renderProducts();
    if (typeof WhatsApp !== 'undefined') WhatsApp.updateLinks();
    await initSocial();
  }

  async function init() {
    initYear();
    initHeaderScroll();
    initMenu();
    initForm();
    await renderAll();

    document.addEventListener('langchange', async () => {
      await renderAll();
    });
  }

  return { init, renderAll };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
