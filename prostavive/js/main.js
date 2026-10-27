/**
 * ProstaVive Landing Page - Scripts
 * Otimizado para Performance, Google Ads & Meta Ads Compliance
 *
 * CORREÇÕES APLICADAS:
 * - Remoção do espaço no início da URL de afiliado.
 * - Substituição correta das macros {keyword}, {creative}, {gclid}
 *   ANTES de instanciar o objeto URL (evita re-encoding %7B/%7D).
 * - Preservação de UTMs, gclid, fbclid, etc. da URL atual.
 * - Datas e modais traduzidos para inglês (consistência com lang="en").
 * - Fallback robusto com try/catch + log de erro.
 */

(function () {
  'use strict';

  // ============================================================================
  // 1. CONFIGURAÇÃO CENTRALIZADA
  // ============================================================================
  window.CONFIG = {
    // URL base do ClickBank. Macros serão substituídas dinamicamente.
    // NUNCA adicione espaço no início ou no fim desta string.
    DEFAULT_AFFILIATE_URL:
      "https://4a876gv9ualo9l8g0maha6ay51.hop.clickbank.net/?tid={keyword}_{creative}&traffic_source=google&traffic_type=cpc&campaign=provive&extclid={gclid}",

    // Macros a serem substituídas (ordem importa: gclid antes de keyword/creative)
    MACRO_GCLID: '{gclid}',
    MACRO_KEYWORD: '{keyword}',
    MACRO_CREATIVE: '{creative}',

    // Parâmetros da URL atual que NÃO devem ser repassados (já substituídos)
    SKIP_PARAMS: ['gclid', 'utm_term', 'utm_content', 'keyword', 'creative']
  };

  // ============================================================================
  // 2. CONSTRUÇÃO DO LINK DE AFILIADO COM SUBSTITUIÇÃO DE MACROS
  // ============================================================================
  /**
   * Constrói a URL final do afiliado:
   *  1. Substitui macros ({gclid}, {keyword}, {creative}) pelos valores
   *     reais da URL atual (gclid, utm_term, utm_content) — sem re-encoding.
   *  2. Remove macros não resolvidas para não vazar literal.
   *  3. Repassa demais parâmetros (utm_source, fbclid, etc.).
   */
  function buildAffiliateLink(baseUrl) {
    try {
      const currentParams = new URLSearchParams(window.location.search);

      // Extrai valores reais (prioriza gclid oficial, depois utm_term)
      const gclid    = currentParams.get('gclid')     || '';
      const keyword  = currentParams.get('utm_term')  || currentParams.get('keyword')  || '';
      const creative = currentParams.get('utm_content') || currentParams.get('creative') || '';

      // Substituição em string (antes de new URL → evita %7B/%7D)
      let urlStr = baseUrl
        .replace(window.CONFIG.MACRO_GCLID,    encodeURIComponent(gclid))
        .replace(window.CONFIG.MACRO_KEYWORD,  encodeURIComponent(keyword))
        .replace(window.CONFIG.MACRO_CREATIVE, encodeURIComponent(creative));

      // Remove macros remanescentes não resolvidas
      urlStr = urlStr.replace(/\{[^}]+\}/g, '');

      // Instancia URL final e repassa UTMs/parâmetros adicionais
      const url = new URL(urlStr);
      currentParams.forEach((value, key) => {
        if (!window.CONFIG.SKIP_PARAMS.includes(key)) {
          url.searchParams.set(key, value);
        }
      });

      return url.toString();
    } catch (err) {
      console.error('[AffiliateLink] Erro ao construir URL:', err);
      return baseUrl;
    }
  }

  // ============================================================================
  // 3. INICIALIZAÇÃO DOS BOTÕES DE AFILIADO
  // ============================================================================
  function initAffiliateLinks() {
    const affiliateButtons = document.querySelectorAll('.affiliate-link-btn');
    if (!affiliateButtons.length) return;

    const finalUrl = buildAffiliateLink(window.CONFIG.DEFAULT_AFFILIATE_URL);

    affiliateButtons.forEach((btn) => {
      // Preserva o href original do HTML como fallback; sobrescreve com URL parametrizada
      btn.setAttribute('href', finalUrl);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer sponsored');

      // Hook de conversão (Google Ads / GA4)
      btn.addEventListener('click', function () {
        // GA4
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'affiliate_click', {
            event_category: 'Affiliate Link',
            event_label: btn.id || 'ProstaVive CTA',
            transport_type: 'beacon'
          });

          // Conversão Google Ads (descomente e ajuste o AW-XXXXXXXXX / label)
          // window.gtag('event', 'conversion', {
          //   send_to: 'AW-XXXXXXXXX/XXXXXXXXXXXXX',
          //   value: 1.0,
          //   currency: 'USD'
          // });
        }
      });
    });
  }

  // ============================================================================
  // 4. DATA DINÂMICA (INGLÊS — consistente com lang="en")
  // ============================================================================
  function initCurrentDate() {
    const now = new Date();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const formattedDate = `${months[now.getMonth()]} ${now.getFullYear()}`;

    document.querySelectorAll('.dynamic-review-date').forEach((el) => {
      el.textContent = formattedDate;
    });

    document.querySelectorAll('.current-year').forEach((el) => {
      el.textContent = now.getFullYear().toString();
    });
  }

  // ============================================================================
  // 5. SCROLL TRIGGERS (PROGRESS BAR + MOBILE STICKY)
  // ============================================================================
  function initScrollTriggers() {
    const progressBar = document.getElementById('readingProgressBar');
    const mobileStickyBar = document.getElementById('mobileStickyBar');
    const heroSection = document.querySelector('.hero-section');

    let ticking = false;

    function updateOnScroll() {
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (progressBar && totalScrollHeight > 0) {
        const pct = Math.min(100, Math.max(0, (currentScroll / totalScrollHeight) * 100));
        progressBar.style.width = pct + '%';
      }

      if (mobileStickyBar) {
        const heroHeight = heroSection ? heroSection.offsetHeight : 450;
        mobileStickyBar.classList.toggle('visible', currentScroll > heroHeight);
      }

      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    }, { passive: true });

    // Executa uma vez para ajustar estado inicial
    updateOnScroll();
  }

  // ============================================================================
  // 6. MODAIS DE COMPLIANCE (INGLÊS)
  // ============================================================================
  function initModals() {
    const modalBackdrop = document.getElementById('complianceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalContent');
    const modalCloseBtns = document.querySelectorAll('.close-modal-trigger');
    const modalTriggers = document.querySelectorAll('[data-modal-target]');

    if (!modalBackdrop) return;

    const modalData = {
      privacy: {
        title: 'Privacy Policy',
        content: `
          <h4>1. Commitment to User Privacy</h4>
          <p>This informational page values and respects your privacy. We collect only anonymous analytical data essential for navigation monitoring, security, technical stability, and compliance with Google Ads and Meta Ads guidelines.</p>
          <h4>2. Cookies and Analytics Tools</h4>
          <p>We use anonymous identifiers (cookies) to analyze site performance, ensure fast loading on mobile devices, and improve user navigation.</p>
          <h4>3. Redirects and Affiliate Links</h4>
          <p>When clicking buttons that direct to the official ProstaVive manufacturer's website, you will be forwarded to a secure, encrypted environment with 256-bit SSL certification, managed by the official payment platform.</p>
          <h4>4. Financial and Payment Data</h4>
          <p>This portal does not collect, process, or store credit card data or financial information. All transactions are processed exclusively within the secure servers of the brand's official processor.</p>
        `
      },
      terms: {
        title: 'Terms of Use',
        content: `
          <h4>1. Informational and Promotional Nature</h4>
          <p>The content on this page is for informational, educational, and promotional purposes regarding the ProstaVive supplement, based on official information provided by the manufacturer.</p>
          <h4>2. Official Manufacturer Channel</h4>
          <p>This page acts as an authorized promotional and affiliate channel. All manufacturing, physical shipping, inventory control, and logistical support are the responsibility of the official manufacturer.</p>
          <h4>3. Prices, Shipping, and 180-Day Guarantee</h4>
          <p>Prices and advertised offers are subject to change without prior notice at the manufacturer's discretion. The unconditional 180-day guarantee strictly follows the return rules and procedures stated on the producer's official website.</p>
        `
      },
      disclaimer: {
        title: 'Legal Notice & Medical Disclaimer',
        content: `
          <h4>Mandatory Health Notice</h4>
          <p>The statements on this page have not been evaluated by ANVISA, FDA, or equivalent regulatory agencies. ProstaVive is not intended to diagnose, treat, cure, or prevent any disease.</p>
          <p>The product is a daily-prep food supplement designed to complement men's nutrition and does not replace consultations with medical specialists, urologists, or recommended clinical treatments.</p>
          <p>We strongly recommend that men undergoing medical treatment, people using continuous medications, or individuals with specific prostate concerns consult their healthcare professional before starting any supplementation.</p>
        `
      },
      contact: {
        title: 'Contact and Support',
        content: `
          <h4>Service Channels</h4>
          <p>For questions about placed orders, tracking codes, shipping times, or requests related to the 180-day guarantee, please use the official manufacturer support indicated in your purchase confirmation email.</p>
          <p>For feedback regarding the informational content of this page, send an email to: <strong>contact@prostavive-oficial.info</strong>.</p>
        `
      }
    };

    function openModal(type) {
      if (!modalData[type]) return;
      modalTitle.textContent = modalData[type].title;
      modalBody.innerHTML = modalData[type].content;
      modalBackdrop.classList.add('open');
      modalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Foco acessível no botão fechar
      const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modalBackdrop.classList.remove('open');
      modalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    modalTriggers.forEach((trigger) => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(this.getAttribute('data-modal-target'));
      });
    });

    modalCloseBtns.forEach((btn) => {
      btn.addEventListener('click', closeModal);
    });

    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // ============================================================================
  // 7. BOOT
  // ============================================================================
  document.addEventListener('DOMContentLoaded', function () {
    initAffiliateLinks();
    initCurrentDate();
    initScrollTriggers();
    initModals();
  });

})();