/* ============================================
   CHOICES INSIGHTS — APP (landing page)
   ============================================ */

const App = (() => {
  let currentCategory = 'all';

  // ---------- HELPERS ----------
  function getLocalized(obj) {
    if (!obj) return '';
    const lang = I18N.lang || 'pt';
    return obj[lang] || obj.pt || '';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // ---------- RENDER: FILTROS ----------
  function renderFilters() {
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
    const title = escapeHtml(getLocalized(product.title));
    const desc = escapeHtml(getLocalized(product.description));
    const cat = Storage.getCategory(product.category);
    const catName = cat ? escapeHtml(getLocalized(cat.name)) : '';

    const badgeMap = {
      new:   { text: 'Novo',      cls: 'badge-new' },
      promo: { text: 'Promoção',  cls: 'badge-promo' },
      top:   { text: 'Top',       cls: 'badge-top' }
    };
    const badge = badgeMap[product.badge];

    const imageUrl = product.imageUrl
      ? escapeHtml(product.imageUrl)
      : 'data:image/svg+xml;utf8,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#3A3AC8"/>
                <stop offset="100%" stop-color="#F5633E"/>
              </linearGradient>
            </defs>
            <rect width="400" height="250" fill="url(#g)"/>
            <text x="50%" y="52%" text-anchor="middle" fill="white" font-family="sans-serif" font-size="20" font-weight="600">${title.slice(0, 30) || 'Produto'}</text>
          </svg>
        `);

    return `
      <article class="product-card">
        <div class="product-image">
          <img src="${imageUrl}" alt="${title}" loading="lazy">
          ${badge ? `<span class="product-badge ${badge.cls}">${badge.text}</span>` : ''}
        </div>
        <div class="product-body">
          ${catName ? `<span class="product-category">${catName}</span>` : ''}
          <h3 class="product-title">${title}</h3>
          <p class="product-description">${desc}</p>
          <a href="${escapeHtml(product.link)}" class="product-btn" target="_blank" rel="noopener">
            <span>${I18N.t('product.view') || 'Ver oferta'}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </article>
    `;
  }

  // ---------- RENDER: PRODUTOS ----------
  function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const empty = document.getElementById('emptyProducts');
    if (!grid) return;

    let products = (await Storage.getProducts()).filter(p => p.active);

    if (currentCategory !== 'all') {
      products = products.filter(p => p.category === currentCategory);
    }

    if (products.length === 0) {
      grid.innerHTML = '';
      empty.style.display = 'block';
      return;
    }

    empty.style.display = 'none';
    grid.innerHTML = products.map(productCardHTML).join('');
  }

 

  // ---------- FORMULÁRIO ----------
  function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const lgpd = document.getElementById('lgpd').checked;

      if (!name || !email || !message || !lgpd) {
        showToast(I18N.t('form.error'), 'error');
        return;
      }

      const lead = { name, email, message, lgpd, source: 'form' };
      const saved = Storage.saveLead(lead);

      if (saved) {
        form.reset();
        showToast(I18N.t('form.success'), 'success');
      } else {
        showToast(I18N.t('form.error'), 'error');
      }
    });
  }

  // ---------- HEADER SCROLL ----------
  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
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

    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- SOCIAL LINKS ----------
  async function initSocial() {
    const settings = await Storage.getSettings();

    const map = {
      channelInstagram: settings.instagram,
      channelLinkedin: settings.linkedin,
      channelYoutube: settings.youtube,
      channelTiktok: settings.tiktok
    };

    Object.entries(map).forEach(([id, url]) => {
      const el = document.getElementById(id);
      if (el && url) el.href = url;
    });
  }

  // ---------- YEAR ----------
  function initYear() {
    const el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ---------- RENDER GERAL ----------
  function  await renderAll() {
    renderFilters();
    renderProducts();
    WhatsApp.updateLinks();
    await initSocial();
  }

  // ---------- INIT ----------
  function init() {
    initYear();
    initHeaderScroll();
    initMenu();
    initForm();
    renderAll();

    // Re-renderiza quando o idioma muda
    document.addEventListener('langchange', renderAll);
  }

  return { init, renderAll };
})();

document.addEventListener('DOMContentLoaded', () => App.init());