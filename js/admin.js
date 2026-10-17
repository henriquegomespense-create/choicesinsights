/* ============================================
   CHOICES INSIGHTS — ADMIN
   ============================================ */

   const Admin = (() => {
    let currentTab = 'products';
    let editingProductId = null;
    let editingCategoryId = null;
  
    // ---------- HELPERS ----------
    function getLocalized(obj) {
      if (!obj) return '';
      return obj.pt || obj.en || obj.es || '';
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
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  
    // ============================================
    // AUTH
    // ============================================
    function initAuth() {
      const loginScreen = document.getElementById('loginScreen');
      const adminPanel = document.getElementById('adminPanel');
      const loginForm = document.getElementById('loginForm');
      const loginError = document.getElementById('loginError');
      const logoutBtn = document.getElementById('logoutBtn');
      const adminEmail = document.getElementById('adminEmail');
  
      if (Storage.isLoggedIn()) {
        loginScreen.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        adminEmail.textContent = Storage.getSession().email;
        initPanel();
      }
  
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
  
        const result = Storage.login(email, password);
  
        if (result.success) {
          loginScreen.classList.add('hidden');
          adminPanel.classList.remove('hidden');
          adminEmail.textContent = result.user.email;
          loginError.classList.remove('show');
          initPanel();
        } else {
          loginError.textContent = result.error;
          loginError.classList.add('show');
        }
      });
  
      logoutBtn.addEventListener('click', () => {
        Storage.logout();
        location.reload();
      });
    }
  
    // ============================================
    // TABS
    // ============================================
    function initTabs() {
      document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          currentTab = tab.dataset.tab;
  
          document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
  
          tab.classList.add('active');
          document.querySelector(`[data-content="${currentTab}"]`).classList.add('active');
  
          if (currentTab === 'products') renderProductsList();
          if (currentTab === 'categories') renderCategoriesList();
          if (currentTab === 'settings') loadSettings();
          if (currentTab === 'leads') renderLeadsList();
        });
      });
    }
  
    // ============================================
    // PRODUTOS
    // ============================================
    function renderProductsList() {
      const container = document.getElementById('adminProductList');
      const products = Storage.getProducts();
  
      if (products.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <p>Nenhum produto cadastrado. Clique em "Novo produto" para começar.</p>
          </div>
        `;
        return;
      }
  
      container.innerHTML = products.map(p => {
        const title = escapeHtml(getLocalized(p.title));
        const cat = Storage.getCategory(p.category);
        const catName = cat ? escapeHtml(getLocalized(cat.name)) : 'Sem categoria';
        const img = p.imageUrl
          ? `<img src="${escapeHtml(p.imageUrl)}" alt="">`
          : `<div style="width:100%;height:100%;background:linear-gradient(135deg,var(--primary-500),var(--accent-500));"></div>`;
  
        return `
          <div class="admin-product-item">
            <div class="admin-product-img">${img}</div>
            <div class="admin-product-info">
              <h3>${title || '(sem título)'}</h3>
              <p>${catName}</p>
              <div class="admin-product-meta">
                ${p.active ? '<span class="admin-tag">Ativo</span>' : '<span class="admin-tag inactive">Inativo</span>'}
                ${p.featured ? '<span class="admin-tag featured">Destaque</span>' : ''}
                ${p.badge ? `<span class="admin-tag">${p.badge}</span>` : ''}
              </div>
            </div>
            <div class="admin-product-actions">
              <button class="icon-btn" data-action="up" data-id="${p.id}" title="Mover para cima">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>
              </button>
              <button class="icon-btn" data-action="down" data-id="${p.id}" title="Mover para baixo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <button class="icon-btn" data-action="toggle-active" data-id="${p.id}" title="Ativar/Desativar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">${p.active ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>' : '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'}</svg>
              </button>
              <button class="icon-btn" data-action="edit" data-id="${p.id}" title="Editar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="icon-btn danger" data-action="delete" data-id="${p.id}" title="Excluir">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        `;
      }).join('');
  
      // Handlers
      container.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
          const { action, id } = btn.dataset;
          if (action === 'edit') openProductModal(id);
          if (action === 'delete') deleteProduct(id);
          if (action === 'up') { Storage.moveProduct(id, 'up'); renderProductsList(); }
          if (action === 'down') { Storage.moveProduct(id, 'down'); renderProductsList(); }
          if (action === 'toggle-active') { Storage.toggleProductActive(id); renderProductsList(); }
        });
      });
    }
  
    function deleteProduct(id) {
      if (!confirm('Tem certeza que deseja excluir este produto?')) return;
      Storage.deleteProduct(id);
      renderProductsList();
      showToast('Produto excluído');
    }
  
    function openProductModal(id = null) {
      editingProductId = id;
      const modal = document.getElementById('productModal');
      const title = document.getElementById('productModalTitle');
  
      // Reset form
      ['productId','productImage','productImageUrl','productLink','productTitlePt','productDescPt','productTitleEn','productDescEn','productTitleEs','productDescEs'].forEach(fid => {
        const el = document.getElementById(fid);
        if (el) el.value = '';
      });
      document.getElementById('productImagePreview').style.display = 'none';
      document.getElementById('productImagePreview').src = '';
      document.getElementById('productActive').checked = true;
      document.getElementById('productFeatured').checked = false;
      document.getElementById('productBadge').value = '';
  
      // Popula categorias
      populateCategorySelect();
  
      if (id) {
        title.textContent = 'Editar produto';
        const p = Storage.getProduct(id);
        if (!p) return;
  
        document.getElementById('productId').value = p.id;
        document.getElementById('productLink').value = p.link || '';
        document.getElementById('productCategory').value = p.category || '';
        document.getElementById('productBadge').value = p.badge || '';
        document.getElementById('productActive').checked = p.active !== false;
        document.getElementById('productFeatured').checked = !!p.featured;
  
        document.getElementById('productTitlePt').value = p.title?.pt || '';
        document.getElementById('productDescPt').value  = p.description?.pt || '';
        document.getElementById('productTitleEn').value = p.title?.en || '';
        document.getElementById('productDescEn').value  = p.description?.en || '';
        document.getElementById('productTitleEs').value = p.title?.es || '';
        document.getElementById('productDescEs').value  = p.description?.es || '';
  
        if (p.imageUrl) {
          document.getElementById('productImagePreview').src = p.imageUrl;
          document.getElementById('productImagePreview').style.display = 'block';
          document.getElementById('productImageUrl').value = p.imageUrl;
        }
      } else {
        title.textContent = 'Novo produto';
      }
  
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  
    function closeProductModal() {
      document.getElementById('productModal').classList.remove('show');
      document.body.style.overflow = '';
      editingProductId = null;
    }
  
    function populateCategorySelect() {
      const sel = document.getElementById('productCategory');
      const cats = Storage.getCategories();
      sel.innerHTML = '<option value="">Sem categoria</option>' +
        cats.map(c => `<option value="${escapeHtml(c.id)}">${escapeHtml(getLocalized(c.name))}</option>`).join('');
    }
  
    function saveProduct() {
      const id = document.getElementById('productId').value || Storage.uid();
  
      const link = document.getElementById('productLink').value.trim();
      if (!link) {
        showToast('O link de destino é obrigatório', 'error');
        return;
      }
  
      const product = {
        id,
        link,
        category: document.getElementById('productCategory').value,
        badge: document.getElementById('productBadge').value,
        active: document.getElementById('productActive').checked,
        featured: document.getElementById('productFeatured').checked,
        imageUrl: document.getElementById('productImageUrl').value.trim() || document.getElementById('productImagePreview').src || '',
        title: {
          pt: document.getElementById('productTitlePt').value.trim(),
          en: document.getElementById('productTitleEn').value.trim(),
          es: document.getElementById('productTitleEs').value.trim()
        },
        description: {
          pt: document.getElementById('productDescPt').value.trim(),
          en: document.getElementById('productDescEn').value.trim(),
          es: document.getElementById('productDescEs').value.trim()
        }
      };
  
      Storage.saveProduct(product);
      closeProductModal();
      renderProductsList();
      showToast('Produto salvo com sucesso!');
    }
  
    // ============================================
    // CATEGORIAS
    // ============================================
    function renderCategoriesList() {
      const container = document.getElementById('adminCategoryList');
      const cats = Storage.getCategories();
  
      if (cats.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Nenhuma categoria cadastrada.</p></div>';
        return;
      }
  
      container.innerHTML = cats.map(c => `
        <div class="admin-product-item" style="grid-template-columns: 1fr auto;">
          <div class="admin-product-info">
            <h3>${escapeHtml(getLocalized(c.name))}</h3>
            <p>ID: ${escapeHtml(c.id)}</p>
          </div>
          <div class="admin-product-actions">
            <button class="icon-btn" data-cat-action="edit" data-id="${c.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="icon-btn danger" data-cat-action="delete" data-id="${c.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
            </button>
          </div>
        </div>
      `).join('');
  
      container.querySelectorAll('[data-cat-action]').forEach(btn => {
        btn.addEventListener('click', () => {
          const { catAction, id } = btn.dataset;
          if (catAction === 'edit') openCategoryModal(id);
          if (catAction === 'delete') {
            if (confirm('Excluir esta categoria?')) {
              Storage.deleteCategory(id);
              renderCategoriesList();
              showToast('Categoria excluída');
            }
          }
        });
      });
    }
  
    function openCategoryModal(id = null) {
      editingCategoryId = id;
      const modal = document.getElementById('categoryModal');
      const title = document.getElementById('categoryModalTitle');
  
      ['categoryId','categoryNamePt','categoryNameEn','categoryNameEs'].forEach(fid => {
        document.getElementById(fid).value = '';
      });
  
      if (id) {
        title.textContent = 'Editar categoria';
        const c = Storage.getCategory(id);
        if (!c) return;
        document.getElementById('categoryId').value = c.id;
        document.getElementById('categoryNamePt').value = c.name?.pt || '';
        document.getElementById('categoryNameEn').value = c.name?.en || '';
        document.getElementById('categoryNameEs').value = c.name?.es || '';
      } else {
        title.textContent = 'Nova categoria';
      }
  
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  
    function closeCategoryModal() {
      document.getElementById('categoryModal').classList.remove('show');
      document.body.style.overflow = '';
      editingCategoryId = null;
    }
  
    function saveCategory() {
      const id = document.getElementById('categoryId').value || Storage.uid();
      const namePt = document.getElementById('categoryNamePt').value.trim();
      if (!namePt) {
        showToast('O nome em português é obrigatório', 'error');
        return;
      }
  
      const category = {
        id,
        name: {
          pt: namePt,
          en: document.getElementById('categoryNameEn').value.trim() || namePt,
          es: document.getElementById('categoryNameEs').value.trim() || namePt
        }
      };
  
      Storage.saveCategory(category);
      closeCategoryModal();
      renderCategoriesList();
      showToast('Categoria salva!');
    }
  
    // ============================================
    // SETTINGS
    // ============================================
    function loadSettings() {
      const s = Storage.getSettings();
      document.getElementById('settingWhatsapp').value = s.whatsapp || '';
      document.getElementById('settingWhatsappMsgPt').value = s.whatsappMessage?.pt || '';
      document.getElementById('settingWhatsappMsgEn').value = s.whatsappMessage?.en || '';
      document.getElementById('settingWhatsappMsgEs').value = s.whatsappMessage?.es || '';
      document.getElementById('settingInstagram').value = s.instagram || '';
      document.getElementById('settingLinkedin').value = s.linkedin || '';
      document.getElementById('settingYoutube').value = s.youtube || '';
      document.getElementById('settingTiktok').value = s.tiktok || '';
      document.getElementById('settingEmail').value = s.email || '';
    }
  
    function saveSettings() {
      const settings = {
        whatsapp: document.getElementById('settingWhatsapp').value.trim(),
        whatsappMessage: {
          pt: document.getElementById('settingWhatsappMsgPt').value.trim(),
          en: document.getElementById('settingWhatsappMsgEn').value.trim(),
          es: document.getElementById('settingWhatsappMsgEs').value.trim()
        },
        email: document.getElementById('settingEmail').value.trim(),
        instagram: document.getElementById('settingInstagram').value.trim(),
        linkedin: document.getElementById('settingLinkedin').value.trim(),
        youtube: document.getElementById('settingYoutube').value.trim(),
        tiktok: document.getElementById('settingTiktok').value.trim()
      };
  
      Storage.saveSettings(settings);
      showToast('Configurações salvas!');
    }
  
    // ============================================
    // LEADS
    // ============================================
    function renderLeadsList() {
      const container = document.getElementById('adminLeadList');
      const leads = Storage.getLeads();
  
      if (leads.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Nenhum lead recebido ainda.</p></div>';
        return;
      }
  
      container.innerHTML = leads.map(l => `
        <div class="admin-product-item" style="grid-template-columns: 1fr auto;">
          <div class="admin-product-info">
            <h3>${escapeHtml(l.name)}</h3>
            <p>${escapeHtml(l.email)} · ${new Date(l.createdAt).toLocaleString('pt-BR')}</p>
            <p style="color: var(--gray-800); margin-top: 6px;">${escapeHtml(l.message)}</p>
          </div>
          <div class="admin-product-actions">
            <button class="icon-btn danger" data-lead-action="delete" data-id="${l.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
            </button>
          </div>
        </div>
      `).join('');
  
      container.querySelectorAll('[data-lead-action="delete"]').forEach(btn => {
        btn.addEventListener('click', () => {
          if (confirm('Excluir este lead?')) {
            Storage.deleteLead(btn.dataset.id);
            renderLeadsList();
          }
        });
      });
    }
  
    function exportLeadsCSV() {
      const leads = Storage.getLeads();
      if (leads.length === 0) {
        showToast('Nenhum lead para exportar', 'error');
        return;
      }
  
      const header = ['Nome', 'E-mail', 'Mensagem', 'Data'];
      const rows = leads.map(l => [
        l.name, l.email, l.message, new Date(l.createdAt).toLocaleString('pt-BR')
      ]);
  
      const csv = [header, ...rows]
        .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
        .join('\n');
  
      const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-choices-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  
    // ============================================
    // UPLOAD DE IMAGEM (base64 temporário)
    // ============================================
    function initImageUpload() {
      const input = document.getElementById('productImage');
      const preview = document.getElementById('productImagePreview');
      const urlInput = document.getElementById('productImageUrl');
  
      if (!input) return;
  
      input.addEventListener('change', () => {
        const file = input.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
          showToast('Imagem muito grande (máx. 2MB)', 'error');
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          preview.src = e.target.result;
          preview.style.display = 'block';
          urlInput.value = ''; // limpa URL manual
        };
        reader.readAsDataURL(file);
      });
    }
  
    // ============================================
    // LANG TABS (modal produto)
    // ============================================
    function initLangTabs() {
      document.querySelectorAll('[data-langtab]').forEach(tab => {
        tab.addEventListener('click', () => {
          const lang = tab.dataset.langtab;
          document.querySelectorAll('[data-langtab]').forEach(t => t.classList.remove('active'));
          document.querySelectorAll('[data-langfield]').forEach(f => f.classList.remove('active'));
          tab.classList.add('active');
          document.querySelector(`[data-langfield="${lang}"]`).classList.add('active');
        });
      });
    }
  
    // ============================================
    // INIT DO PAINEL
    // ============================================
    function initPanel() {
      initTabs();
      initImageUpload();
      initLangTabs();
  
      document.getElementById('newProductBtn').addEventListener('click', () => openProductModal());
      document.getElementById('saveProductBtn').addEventListener('click', saveProduct);
      document.getElementById('newCategoryBtn').addEventListener('click', () => openCategoryModal());
      document.getElementById('saveCategoryBtn').addEventListener('click', saveCategory);
      document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);
      document.getElementById('exportLeadsBtn').addEventListener('click', exportLeadsCSV);
            // --- SISTEMA DE BACKUP ---
      const exportBtn = document.getElementById('exportDataBtn');
      const importInput = document.getElementById('importDataInput');

      if (exportBtn) {
        exportBtn.addEventListener('click', () => {
          const data = {
            products: Storage.getProducts(),
            categories: Storage.getCategories(),
            settings: Storage.getSettings()
          };
          const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `choices-backup-${new Date().toISOString().split('T')[0]}.json`;
          a.click();
          URL.revokeObjectURL(url);
          showToast('Backup exportado!');
        });
      }

      if (importInput) {
        importInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const data = JSON.parse(event.target.result);
              if (data.products) localStorage.setItem('ci_products', JSON.stringify(data.products));
              if (data.categories) localStorage.setItem('ci_categories', JSON.stringify(data.categories));
              if (data.settings) localStorage.setItem('ci_settings', JSON.stringify(data.settings));
              showToast('Backup importado com sucesso!');
              setTimeout(() => location.reload(), 1500);
            } catch (err) {
              showToast('Erro ao ler o arquivo.', 'error');
            }
          };
          reader.readAsText(file);
        });
      }
      // --- FIM DO SISTEMA DE BACKUP ---
  
      renderProductsList();
    }
  
    // Expõe funções globais usadas no HTML
    window.closeProductModal = closeProductModal;
    window.closeCategoryModal = closeCategoryModal;
  
    return { initAuth };
  })();
  
  document.addEventListener('DOMContentLoaded', () => Admin.initAuth());