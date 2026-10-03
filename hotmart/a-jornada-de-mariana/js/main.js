/**
 * =========================================================================
 * MAIN JAVASCRIPT — A JORNADA DE MARIANA
 * Interatividade Acessível, Modais Literários e Gestão de Conversão
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. INICIALIZAÇÃO DE DADOS DINÂMICOS A PARTIR DE SITE_CONFIG
  const cfg = window.SITE_CONFIG || {};

  // Atualizar textos e links dinâmicos
  document.querySelectorAll('[data-config]').forEach(el => {
    const key = el.getAttribute('data-config');
    if (cfg[key]) {
      el.textContent = cfg[key];
    }
  });

  // Atualizar todos os botões de Checkout
  document.querySelectorAll('.js-checkout-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (cfg.CHECKOUT_URL && !cfg.CHECKOUT_URL.includes('INSIRA_AQUI')) {
        window.open(cfg.CHECKOUT_URL, '_blank', 'noopener,noreferrer');
      } else {
        // Se ainda for placeholder, rola suavemente até a seção de oferta
        const offerSec = document.getElementById('oferta');
        if (offerSec) {
          offerSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 2. HEADER SCROLL & MOBILE STICKY BAR
  const header = document.querySelector('.site-header');
  const stickyMobileBar = document.getElementById('sticky-mobile-bar');
  const heroSection = document.getElementById('hero');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Header fixo com efeito de fundo
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Sticky Mobile Bar (aparece após passar pelo Hero)
    if (stickyMobileBar && heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - 200;
      if (scrollY > heroBottom && window.innerWidth <= 768) {
        stickyMobileBar.classList.add('visible');
      } else {
        stickyMobileBar.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
  handleScroll();

  // 3. FAQ ACCORDION ACESSÍVEL (WAI-ARIA)
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Fechar outros itens abertos para manter visual limpo e focado
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isExpanded) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Abrir o primeiro item do FAQ por padrão para demonstração
  if (faqItems.length > 0) {
    const firstTrigger = faqItems[0].querySelector('.faq-trigger');
    const firstContent = faqItems[0].querySelector('.faq-content');
    if (firstTrigger && firstContent) {
      faqItems[0].classList.add('active');
      firstTrigger.setAttribute('aria-expanded', 'true');
      firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
    }
  }

  // 4. SISTEMA DE MODAIS (LEITOR DE DEGUSTAÇÃO & LEGAIS)
  const modals = {
    sample: document.getElementById('sample-modal'),
    privacy: document.getElementById('privacy-modal'),
    terms: document.getElementById('terms-modal'),
    contact: document.getElementById('contact-modal')
  };

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focar botão de fechar para acessibilidade
    const closeBtn = modal.querySelector('.js-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Triggers para abrir modais
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(targetModalId);
      if (targetModal) openModal(targetModal);
    });
  });

  // Triggers para fechar modais
  document.querySelectorAll('.js-modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });

  // Fechar ao clicar no backdrop escuro
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Fechar ao pressionar tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(modal => {
        closeModal(modal);
      });
    }
  });

  // 5. INTERSECTION OBSERVER (REVEAL ON SCROLL SUAVE)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback caso navegador não suporte IntersectionObserver
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 6. NAVEGAÇÃO SUAVE PARA LINKS INTERNOS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.startsWith('#modal-') || this.hasAttribute('data-open-modal')) {
        return;
      }

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
});
