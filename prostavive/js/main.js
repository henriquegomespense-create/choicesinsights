/**
 * ProstaVive Landing Page - Scripts Interativos & Rastreamento
 * Otimizado para Performance, Google Ads & Meta Ads Compliance
 */

(function () {
  'use strict';

  // 1. CONFIGURAÇÃO: Link de Afiliado Centralizado
  // Insira seu link de afiliado oficial (ClickBank, BuyGoods, etc.)
  window.CONFIG = {
   
   DEFAULT_AFFILIATE_URL: "https://4a876gv9ualo9l8g0maha6ay51.hop.clickbank.net/?tid={keyword}_{creative}&traffic_source=google&traffic_type=cpc&campaign=provive&extclid={gclid}",
    OFFICIAL_DISCOUNT_PARAM: "discount=true"
  };

  /**
   * Preserva parâmetros de URL de campanhas de tráfego (UTM, gclid, fbclid, etc.)
   * em todos os links e botões de chamada para ação (CTA).
   */
  function buildAffiliateLink(baseUrl) {
    try {
      const currentParams = new URLSearchParams(window.location.search);
      const url = new URL(baseUrl);

      currentParams.forEach((value, key) => {
        url.searchParams.set(key, value);
      });

      return url.toString();
    } catch (e) {
      return baseUrl;
    }
  }

  // 2. Inicializa todos os botões de afiliado com os links parametrizados
  function initAffiliateLinks() {
    const affiliateButtons = document.querySelectorAll('.affiliate-link-btn');
    const finalUrl = buildAffiliateLink(window.CONFIG.DEFAULT_AFFILIATE_URL);

    affiliateButtons.forEach(btn => {
      btn.setAttribute('href', finalUrl);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer sponsored');

      // Hook de conversão / Analytics para Google Ads ou Tag Manager
      btn.addEventListener('click', function () {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            'event_category': 'Affiliate Link',
            'event_label': 'ProstaVive CTA Click'
          });
        }
      });
    });
  }

  // 3. Atualização Dinâmica de Mês e Ano (Frescor & Confiança)
  function initCurrentDate() {
    const dateElements = document.querySelectorAll('.dynamic-review-date');
    const now = new Date();
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const formattedDate = `${meses[now.getMonth()]} de ${now.getFullYear()}`;

    dateElements.forEach(el => {
      el.textContent = formattedDate;
    });

    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
      el.textContent = now.getFullYear().toString();
    });
  }

  // 4. Barra de Progresso de Leitura & Barra Fixa no Mobile
  function initScrollTriggers() {
    const progressBar = document.getElementById('readingProgressBar');
    const mobileStickyBar = document.getElementById('mobileStickyBar');
    const heroSection = document.querySelector('.hero-section');

    window.addEventListener('scroll', function () {
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      // Barra de progresso de leitura no topo
      if (progressBar && totalScrollHeight > 0) {
        const progressPercentage = Math.min(100, Math.max(0, (currentScroll / totalScrollHeight) * 100));
        progressBar.style.width = progressPercentage + '%';
      }

      // Exibição suave da barra fixa inferior no mobile
      if (mobileStickyBar) {
        const heroHeight = heroSection ? heroSection.offsetHeight : 450;
        if (currentScroll > heroHeight) {
          mobileStickyBar.classList.add('visible');
        } else {
          mobileStickyBar.classList.remove('visible');
        }
      }
    }, { passive: true });
  }

  // 5. Modais de Compliance Legal em Português
  function initModals() {
    const modalBackdrop = document.getElementById('complianceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalContent');
    const modalCloseBtns = document.querySelectorAll('.close-modal-trigger');
    const modalTriggers = document.querySelectorAll('[data-modal-target]');

    const modalData = {
      privacy: {
        title: "Política de Privacidade",
        content: `
          <h4>1. Compromisso com a Privacidade do Usuário</h4>
          <p>Esta página informativa valoriza e respeita a sua privacidade. Coletamos apenas dados analíticos anônimos essenciais para monitoramento de navegação, segurança, estabilidade técnica e conformidade com as diretrizes do Google Ads e Meta Ads.</p>
          <h4>2. Cookies e Ferramentas de Estatística</h4>
          <p>Utilizamos identificadores anônimos (cookies) para analisar a performance do site, assegurar o carregamento ágil em dispositivos móveis e melhorar a navegação do usuário.</p>
          <h4>3. Redirecionamento e Links de Afiliado</h4>
          <p>Ao clicar nos botões direcionando para o site oficial do fabricante do ProstaVive, você será encaminhado a um ambiente seguro e criptografado com certificação SSL de 256 bits, gerenciado pela plataforma oficial de pagamentos.</p>
          <h4>4. Dados Financeiros e de Pagamento</h4>
          <p>Este portal não coleta, não processa e não armazena dados de cartão de crédito ou informações financeiras. Todas as transações são efetuadas exclusivamente dentro dos servidores seguros do processador oficial da marca.</p>
        `
      },
      terms: {
        title: "Termos de Uso",
        content: `
          <h4>1. Natureza Informativa e Publicitária</h4>
          <p>O conteúdo desta página possui finalidade informativa, educacional e de divulgação promocional do suplemento ProstaVive, fundamentado nas informações oficiais disponibilizadas pelo produtor.</p>
          <h4>2. Canal Oficial do Fabricante</h4>
          <p>Esta página atua como canal autorizado de divulgação e afiliação. Toda a fabricação, expedição física, controle de estoque e suporte logístico são de responsabilidade do fabricante oficial.</p>
          <h4>3. Preços, Frete e Garantia de 180 Dias</h4>
          <p>Os valores e as ofertas anunciadas estão sujeitos à alteração sem aviso prévio por determinação do fabricante. A garantia incondicional de 180 dias obedece estritamente às normas e procedimentos de devolução informados no site oficial do produtor.</p>
        `
      },
      disclaimer: {
        title: "Aviso Legal & Isenção de Responsabilidade Médica",
        content: `
          <h4>Aviso Obrigatório de Saúde</h4>
          <p>As declarações presentes nesta página não foram avaliadas pela ANVISA, FDA ou órgãos reguladores equivalentes. O suplemento ProstaVive não tem a finalidade de diagnosticar, tratar, curar ou prevenir qualquer doença.</p>
          <p>O produto é um suplemento alimentar de preparo diário desenvolvido para complementar a nutrição masculina e não substitui consultas com médicos especialistas, urologistas ou tratamentos clínicos recomendados.</p>
          <p>Recomendamos enfaticamente que homens em tratamento médico, pessoas que utilizem medicamentos contínuos ou indivíduos com dúvidas específicas sobre a próstata consultem seu profissional de saúde antes de iniciar qualquer suplementação.</p>
        `
      },
      contact: {
        title: "Contato e Suporte",
        content: `
          <h4>Canais de Atendimento</h4>
          <p>Para dúvidas sobre pedidos efetuados, código de rastreamento, prazos de envio ou solicitações relativas à garantia de 180 dias, utilize o suporte oficial do produtor indicado no e-mail de confirmação da sua compra.</p>
          <p>Para feedbacks sobre o conteúdo informativo desta página, envie um e-mail para: <strong>contato@prostavive-oficial.info</strong>.</p>
        `
      }
    };

    function openModal(type) {
      if (!modalBackdrop || !modalData[type]) return;
      modalTitle.textContent = modalData[type].title;
      modalBody.innerHTML = modalData[type].content;
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!modalBackdrop) return;
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const targetType = this.getAttribute('data-modal-target');
        openModal(targetType);
      });
    });

    modalCloseBtns.forEach(btn => {
      btn.addEventListener('click', closeModal);
    });

    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // Inicialização no DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    initAffiliateLinks();
    initCurrentDate();
    initScrollTriggers();
    initModals();
  });

})();
