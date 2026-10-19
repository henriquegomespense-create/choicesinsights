/* ============================================
   CHOICES INSIGHTS — SISTEMA DE TRADUÇÃO (i18n)
   Traduções embutidas (funciona sem servidor local)
   ============================================ */

const I18N = (() => {
  const SUPPORTED = ['pt', 'en', 'es'];
  const DEFAULT = 'en';
  const STORAGE_KEY = 'ci_lang';

  let currentLang = DEFAULT;

  // Traduções embutidas diretamente no JavaScript
  const dictionary = {
    pt: {
      nav: { products: "Produtos", about: "Sobre", contact: "Contato" },
      hero: {
        title_part1: "Os Melhores Produtos",
        title_part2: "Selecionados Para Você",
        subtitle: "Curadoria global para quem busca resultados reais.",
        trust_1: "+2.000 escolhas feitas", trust_2: "5★ no Google", trust_3: "Compra segura"
      },
      catalog: {
        tag: "Catálogo", title: "Produtos", subtitle: "Tudo o que você precisa em um só lugar",
        empty: "Nenhum produto cadastrado ainda. Volte em breve!", all: "Todos"
      },
      why: {
        tag: "Diferenciais", title: "Por que a Choices Insights", subtitle: "Curadoria que economiza seu tempo e dinheiro",
        item1_title: "Você economiza 20h de pesquisa", item1_desc: "Em vez de garimpar em 50 sites diferentes, encontra tudo curado em um só lugar.",
        item2_title: "Só indicamos o que testamos", item2_desc: "Nada entra na nossa lista sem passar por análise real de qualidade e resultado."
      },
      contact: {
        tag: "Contato", title: "Nossos canais", subtitle: "Fale com a gente pelo canal que preferir",
        whatsapp_label: "WhatsApp", email_label: "E-mail"
      },
      form: {
        name: "Nome", email: "E-mail", message: "Mensagem", send: "Enviar mensagem",
        lgpd: "Aceito receber comunicações e concordo com a Política de Privacidade.",
        success: "Mensagem enviada com sucesso!", error: "Erro ao enviar."
      },
      product: { view: "Ver oferta", featured: "Destaque" },
      footer: {
        tagline: "Insights que transformam escolhas inteligentes em resultados.",
        nav_title: "Navegação", social_title: "Redes sociais", rights: "Todos os direitos reservados.",
        privacy: "Política de Privacidade", terms: "Termos de Uso"
      }
    },
    en: {
      nav: { products: "Products", about: "About", contact: "Contact" },
      hero: {
        title_part1: "The best digital products,",
        title_part2: "curated for you.",
        subtitle: "Global curation for those seeking real results.",
        trust_1: "+2,000 choices made", trust_2: "5★ on Google", trust_3: "Secure purchase"
      },
      catalog: {
        tag: "Catalog", title: "Products", subtitle: "Everything you need in one place",
        empty: "No products yet. Come back soon!", all: "All"
      },
      why: {
        tag: "Why us", title: "Why Choices Insights", subtitle: "Curation that saves you time and money",
        item1_title: "You save 20h of research", item1_desc: "Instead of digging through 50 different sites, you find everything curated in one place.",
        item2_title: "We only recommend what we test", item2_desc: "Nothing gets on our list without a real quality and results analysis."
      },
      contact: {
        tag: "Contact", title: "Our channels", subtitle: "Reach out through your favorite channel",
        whatsapp_label: "WhatsApp", email_label: "E-mail"
      },
      form: {
        name: "Name", email: "E-mail", message: "Message", send: "Send message",
        lgpd: "I agree to receive communications and accept the Privacy Policy.",
        success: "Message sent successfully!", error: "Error sending."
      },
      product: { view: "See offer", featured: "Featured" },
      footer: {
        tagline: "Global curation of the best digital products for those seeking real results.",
        nav_title: "Navigation", social_title: "Social media", rights: "All rights reserved.",
        privacy: "Privacy Policy", terms: "Terms of Use"
      }
    },
    es: {
      nav: { products: "Productos", about: "Sobre nosotros", contact: "Contacto" },
      hero: {
        title_part1: "Los mejores productos digitales,",
        title_part2: "seleccionados para ti.",
        subtitle: "Curaduría global para quienes buscan resultados reales.",
        trust_1: "+2.000 decisiones tomadas", trust_2: "5★ en Google", trust_3: "Compra segura"
      },
      catalog: {
        tag: "Catálogo", title: "Productos", subtitle: "Todo lo que necesitas en un solo lugar",
        empty: "Aún no hay productos. ¡Vuelve pronto!", all: "Todos"
      },
      why: {
        tag: "Diferenciales", title: "Por qué Choices Insights", subtitle: "Curaduría que te ahorra tiempo y dinero",
        item1_title: "Ahorras 20h de investigación", item1_desc: "En lugar de buscar en 50 sitios diferentes, encuentras todo curado en un solo lugar.",
        item2_title: "Solo recomendamos lo que probamos", item2_desc: "Nada entra en nuestra lista sin un análisis real de calidad y resultados."
      },
      contact: {
        tag: "Contacto", title: "Nuestros canales", subtitle: "Contáctanos por el canal que prefieras",
        whatsapp_label: "WhatsApp", email_label: "Correo"
      },
      form: {
        name: "Nombre", email: "Correo", message: "Mensaje", send: "Enviar mensaje",
        lgpd: "Acepto recibir comunicaciones y acepto la Política de Privacidad.",
        success: "¡Mensaje enviado con éxito!", error: "Error al enviar."
      },
      product: { view: "Ver oferta", featured: "Destacado" },
      footer: {
        tagline: "Curaduría global de los mejores productos digitales para quienes buscan resultados reales.",
        nav_title: "Navegación", social_title: "Redes sociales", rights: "Todos los derechos reservados.",
        privacy: "Política de Privacidad", terms: "Términos de Uso"
      }
    }
  };

  function detectLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    // Se o usuário já escolheu um idioma antes, respeita a escolha
    if (saved && SUPPORTED.includes(saved)) return saved;
    
    // Força o inglês como padrão para novos visitantes
    return 'en'; 
  }

  function get(obj, path) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

  function applyToDOM() {
    const translations = dictionary[currentLang];
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const value = get(translations, key);
      if (value !== undefined) {
        el.textContent = value;
      }
    });

    document.documentElement.lang = currentLang;
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    applyToDOM();

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Avisa o app.js para traduzir os produtos (product.view, etc)
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function t(key) {
    return get(dictionary[currentLang], key) || key;
  }

  function init() {
    currentLang = detectLang();
    document.documentElement.lang = currentLang; // Define o idioma do HTML
    applyToDOM();

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
      
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      
      newBtn.addEventListener('click', () => setLang(newBtn.dataset.lang));
    });
  }

  return {
    init,
    setLang,
    t,
    get lang() { return currentLang; }
  };
})();

document.addEventListener('DOMContentLoaded', () => I18N.init());