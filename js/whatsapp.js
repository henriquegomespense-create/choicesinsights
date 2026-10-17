/* ============================================
   CHOICES INSIGHTS — WHATSAPP
   ============================================ */

const WhatsApp = (() => {
  /**
   * Monta URL do WhatsApp com mensagem pré-preenchida no idioma atual
   */
  function buildUrl() {
    const settings = Storage.getSettings();
    const phone = (settings.whatsapp || '').replace(/\D/g, '');
    const lang = I18N.lang || 'pt';
    const message = settings.whatsappMessage?.[lang] || '';
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  /**
   * Atualiza todos os links de WhatsApp da página
   */
  function updateLinks() {
    const url = buildUrl();
    ['whatsappFloat', 'heroWhatsapp', 'channelWhatsapp'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.href = url;
    });
  }

  /**
   * Init
   */
  function init() {
    updateLinks();
    // Atualiza quando o idioma muda
    document.addEventListener('langchange', updateLinks);
  }

  return { init, updateLinks, buildUrl };
})();

document.addEventListener('DOMContentLoaded', () => WhatsApp.init());