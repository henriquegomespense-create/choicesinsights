/* ============================================
   CHOICES INSIGHTS — STORAGE COM FIREBASE
   ============================================ */

const Storage = (() => {
  // Função auxiliar para pegar o Firestore (que foi criado no HTML)
  function getDb() {
    if (!window.db) {
      console.error("Firebase não inicializado!");
      return null;
    }
    return window.db;
  }

  // Importação dinâmica das funções do Firestore
  const F = async () => {
    return await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js");
  };

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  // ============================================
  // PRODUTOS
  // ============================================
  async function getProducts() {
    const db = getDb();
    if (!db) return [];
    const { collection, getDocs, query, orderBy } = await F();
    
    try {
      const q = query(collection(db, "products"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error("Erro ao buscar produtos:", e);
      return [];
    }
  }

  async function getProduct(id) {
    const products = await getProducts();
    return products.find(p => p.id === id);
  }

  async function saveProduct(product) {
    const db = getDb();
    if (!db) return null;
    const { doc, setDoc, updateDoc, collection, getDocs } = await F();

    try {
      if (product.id) {
        // Atualizar existente
        product.updatedAt = new Date().toISOString();
        await setDoc(doc(db, "products", product.id), product, { merge: true });
        return product;
      } else {
        // Criar novo
        product.id = uid();
        product.createdAt = new Date().toISOString();
        // Calcula a ordem
        const snap = await getDocs(collection(db, "products"));
        product.order = snap.size + 1;
        await setDoc(doc(db, "products", product.id), product);
        return product;
      }
    } catch (e) {
      console.error("Erro ao salvar produto:", e);
      return null;
    }
  }

  async function deleteProduct(id) {
    const db = getDb();
    if (!db) return false;
    const { doc, deleteDoc } = await F();
    try {
      await deleteDoc(doc(db, "products", id));
      return true;
    } catch (e) {
      console.error("Erro ao deletar produto:", e);
      return false;
    }
  }

  async function toggleProductActive(id) {
    const p = await getProduct(id);
    if (!p) return false;
    p.active = !p.active;
    return await saveProduct(p);
  }

  async function moveProduct(id, direction) {
    // Para simplificar no Firebase, a movimentação troca a ordem dos documentos
    const products = await getProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx < 0) return false;
    
    const target = direction === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= products.length) return false;

    // Troca as ordens no array
    const tempOrder = products[idx].order;
    products[idx].order = products[target].order;
    products[target].order = tempOrder;

    // Salva os dois no Firebase
    await saveProduct(products[idx]);
    await saveProduct(products[target]);
    return true;
  }

  // ============================================
  // CATEGORIAS
  // ============================================
  async function getCategories() {
    const db = getDb();
    if (!db) return [];
    const { collection, getDocs, query, orderBy } = await F();
    try {
      const q = query(collection(db, "categories"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      
      // Se não houver categorias, cria as iniciais
      if (snapshot.empty) {
        const defaultCats = [
          { id: 'marketing', name: { pt: 'Marketing Digital', en: 'Digital Marketing', es: 'Marketing Digital' }, order: 1 },
          { id: 'tools', name: { pt: 'Ferramentas', en: 'Tools', es: 'Herramientas' }, order: 2 },
          { id: 'courses', name: { pt: 'Cursos', en: 'Courses', es: 'Cursos' }, order: 3 },
          { id: 'insights', name: { pt: 'Insights', en: 'Insights', es: 'Insights' }, order: 4 }
        ];
        for (const cat of defaultCats) {
          const { doc, setDoc } = await F();
          await setDoc(doc(db, "categories", cat.id), cat);
        }
        return defaultCats;
      }
      
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error("Erro ao buscar categorias:", e);
      return [];
    }
  }

  async function getCategory(id) {
    const cats = await getCategories();
    return cats.find(c => c.id === id);
  }

  async function saveCategory(category) {
    const db = getDb();
    if (!db) return null;
    const { doc, setDoc, collection, getDocs } = await F();
    try {
      if (!category.id) {
        category.id = uid();
        const snap = await getDocs(collection(db, "categories"));
        category.order = snap.size + 1;
      }
      await setDoc(doc(db, "categories", category.id), category, { merge: true });
      return category;
    } catch (e) {
      console.error("Erro ao salvar categoria:", e);
      return null;
    }
  }

  async function deleteCategory(id) {
    const db = getDb();
    if (!db) return false;
    const { doc, deleteDoc } = await F();
    try {
      await deleteDoc(doc(db, "categories", id));
      return true;
    } catch (e) {
      return false;
    }
  }

  // ============================================
  // SETTINGS
  // ============================================
  async function getSettings() {
    const db = getDb();
    if (!db) return {};
    const { doc, getDoc, setDoc } = await F();
    try {
      const docRef = doc(db, "settings", "global");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // Cria as configurações padrão se não existirem
        const defaults = {
          whatsapp: '5517981434509',
          whatsappMessage: {
            pt: 'Olá! Vim pelo site Choices Insights e gostaria de saber mais.',
            en: 'Hi! I came from the Choices Insights website and would like to know more.',
            es: '¡Hola! Vengo del sitio web Choices Insights y me gustaría saber más.'
          },
          email: 'contato@choicesinsights.com',
          instagram: '', linkedin: '', youtube: '', tiktok: ''
        };
        await setDoc(docRef, defaults);
        return defaults;
      }
    } catch (e) {
      return {};
    }
  }

  async function saveSettings(settings) {
    const db = getDb();
    if (!db) return false;
    const { doc, setDoc } = await F();
    try {
      await setDoc(doc(db, "settings", "global"), settings, { merge: true });
      return true;
    } catch (e) {
      return false;
    }
  }

  // ============================================
  // LEADS
  // ============================================
  async function getLeads() {
    const db = getDb();
    if (!db) return [];
    const { collection, getDocs, query, orderBy } = await F();
    try {
      const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      return [];
    }
  }

  async function saveLead(lead) {
    const db = getDb();
    if (!db) return null;
    const { collection, addDoc } = await F();
    try {
      lead.createdAt = new Date().toISOString();
      const docRef = await addDoc(collection(db, "leads"), lead);
      return { id: docRef.id, ...lead };
    } catch (e) {
      return null;
    }
  }

  async function deleteLead(id) {
    const db = getDb();
    if (!db) return false;
    const { doc, deleteDoc } = await F();
    try {
      await deleteDoc(doc(db, "leads", id));
      return true;
    } catch (e) {
      return false;
    }
  }

  // ============================================
  // AUTH (MANTIDO LOCAL POR ENQUANTO)
  // ============================================
  const ADMIN_CREDENTIALS = {
    email: 'henriquegomes.pense@gmail.com',
    password: '{[Co_26$KnSn706984%318.798—;**]}'
  };

  function login(email, password) {
    if (email.trim().toLowerCase() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const session = { email, loggedInAt: Date.now() };
      localStorage.setItem('ci_auth', JSON.stringify(session));
      return { success: true, user: session };
    }
    return { success: false, error: 'E-mail ou senha inválidos' };
  }

  function logout() {
    localStorage.removeItem('ci_auth');
  }

  function getSession() {
    return JSON.parse(localStorage.getItem('ci_auth'));
  }

  function isLoggedIn() {
    return !!getSession();
  }

  // ============================================
  // EXPORT
  // ============================================
  return {
    getProducts, getProduct, saveProduct, deleteProduct, toggleProductActive, moveProduct,
    getCategories, getCategory, saveCategory, deleteCategory,
    getSettings, saveSettings,
    getLeads, saveLead, deleteLead,
    login, logout, getSession, isLoggedIn, uid
  };
})();