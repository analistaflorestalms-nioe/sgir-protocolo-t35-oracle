/**
 * SGIR - Protocolo T35 [MODO SEGURO]
 * Aplicação Principal - Oracle v7.0
 * 
 * Arquivo principal que inicializa e coordena todos os módulos
 */

class SGIRApp {
  constructor() {
    this.initialized = false;
    this.modules = {};
  }

  /**
   * Inicializa a aplicação
   */
  async init() {
    if (this.initialized) return;

    try {
      console.log('🚀 Iniciando SGIR - Protocolo T35 Oracle v7.0');
      
      // Verifica dependências
      this.checkDependencies();
      
      // Inicializa módulos
      this.initializeModules();
      
      // Configura event listeners
      this.setupEventListeners();
      
      // Configura UI inicial
      this.setupInitialUI();
      
      // Marca como inicializada
      this.initialized = true;
      
      console.log('✅ SGIR inicializado com sucesso');
      
    } catch (error) {
      console.error('❌ Erro ao inicializar SGIR:', error);
      this.showErrorScreen(error);
    }
  }

  /**
   * Verifica se todas as dependências estão disponíveis
   */
  checkDependencies() {
    const required = [
      { name: 'Lucide Icons', check: () => typeof lucide !== 'undefined' },
      { name: 'Chart.js', check: () => typeof Chart !== 'undefined' },
      { name: 'Leaflet', check: () => typeof L !== 'undefined' },
      { name: 'Database', check: () => typeof database !== 'undefined' }
    ];

    const missing = required.filter(dep => !dep.check());
    
    if (missing.length > 0) {
      throw new Error(Dependências ausentes: );
    }
  }

  /**
   * Inicializa todos os módulos
   */
  initializeModules() {
    // Módulos já estão instanciados globalmente
    this.modules = {
      auth: authManager,
      pages: pageManager,
      modals: modalManager,
      utils: Utils
    };

    console.log('📦 Módulos carregados:', Object.keys(this.modules));
  }

  /**
   * Configura event listeners principais
   */
  setupEventListeners() {
    // Event listener para login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', this.handleLogin.bind(this));
    }

    // Event listener para logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', this.handleLogout.bind(this));
    }

    // Event listeners para navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', this.handleNavigation.bind(this));
    });

    // Event listeners para formulários de modais
    this.setupModalEventListeners();

    // Event listener para busca global
    const globalSearch = document.getElementById('global-search');
    if (globalSearch) {
      globalSearch.addEventListener('input', 
        Utils.debounce(this.handleGlobalSearch.bind(this), 300)
      );
    }

    // Event listener para menu mobile
    this.setupMobileMenu();

    // Event listener para visibilidade da página (pausa timers quando inativa)
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  /**
   * Configura event listeners dos modais
   */
  setupModalEventListeners() {
    // Modal de nova tarefa
    const newTaskForm = document.getElementById('new-task-form');
    if (newTaskForm) {
      newTaskForm.addEventListener('submit', modalManager.submitNewTask.bind(modalManager));
    }

    // Modal de novo RELINFO
    const newRelinfoForm = document.getElementById('new-relinfo-form');
    if (newRelinfoForm) {
      newRelinfoForm.addEventListener('submit', modalManager.submitNewRelinfo.bind(modalManager));
    }

    // Botões de fechar modais
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = e.target.closest('.modal-backdrop')?.id;
        if (modalId) modalManager.closeModal(modalId);
      });
    });
  }

  /**
   * Configura menu mobile
   */
  setupMobileMenu() {
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
    mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));

    const header = document.querySelector('.main-header');
    if (header) {
      header.insertBefore(mobileToggle, header.firstChild);
      lucide.createIcons();
    }

    // Overlay para fechar menu
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    overlay.addEventListener('click', this.closeMobileMenu.bind(this));
    document.body.appendChild(overlay);
  }

  /**
   * Configura UI inicial
   */
  setupInitialUI() {
    // Inicializa ícones Lucide
    lucide.createIcons();

    // Configura tema baseado na preferência do sistema
    this.setInitialTheme();

    // Adiciona classes de dispositivo
    this.setDeviceClasses();

    // Configura scrollbar customizada
    this.setupCustomScrollbar();
  }

  /**
   * Define tema inicial
   */
  setInitialTheme() {
    const savedTheme = localStorage.getItem('sgir-theme');
    const systemDark = Utils.isDarkMode();
    
    const theme = savedTheme || (systemDark ? 'dark' : 'dark'); // Força dark por padrão
    document.documentElement.setAttribute('data-theme', theme);
  }

  /**
   * Adiciona classes baseadas no dispositivo
   */
  setDeviceClasses() {
    const deviceType = Utils.getDeviceType();
    document.body.classList.add(device-);
  }

  /**
   * Configura scrollbar customizada
   */
  setupCustomScrollbar() {
    // Já configurado via CSS, pode adicionar comportamentos adicionais aqui
  }

  /**
   * Manipula login
   * @param {Event} e - Evento do formulário
   */
  async handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.querySelector('input[type="password"]').value;

    if (!username) {
      Utils.showToast('Selecione uma identidade', 'error');
      return;
    }

    try {
      await authManager.login(username, password);
      this.onLoginSuccess();
    } catch (error) {
      Utils.showToast(error.message, 'error');
    }
  }

  /**
   * Manipula logout
   */
  handleLogout() {
    if (confirm('Deseja realmente sair do sistema?')) {
      authManager.logout('USER_LOGOUT');
    }
  }

  /**
   * Manipula navegação
   * @param {Event} e - Evento do clique
   */
  handleNavigation(e) {
    e.preventDefault();
    const pageId = e.currentTarget.dataset.page;
    if (pageId) {
      pageManager.navigateTo(pageId);
      this.closeMobileMenu(); // Fecha menu mobile se aberto
    }
  }

  /**
   * Manipula busca global
   * @param {Event} e - Evento do input
   */
  handleGlobalSearch(e) {
    const query = e.target.value.toLowerCase();
    if (query.length < 2) return;

    // Implementa busca nos dados
    const results = this.performGlobalSearch(query);
    this.showSearchResults(results);
  }

  /**
   * Executa busca global nos dados
   * @param {string} query - Termo de busca
   * @returns {Array} - Resultados da busca
   */
  performGlobalSearch(query) {
    const results = [];

    // Busca em documentos de inteligência
    database.intelDocuments.forEach(doc => {
      if (authManager.hasPermission(doc.regional)) {
        if (doc.title.toLowerCase().includes(query) || 
            doc.content.toLowerCase().includes(query)) {
          results.push({
            type: 'document',
            title: doc.title,
            subtitle: ${doc.type} - ,
            action: () => pageManager.viewDocument(doc.id)
          });
        }
      }
    });

    // Busca em background checks
    database.backgroundChecks.forEach(check => {
      if (authManager.hasPermission(check.regional)) {
        if (check.name.toLowerCase().includes(query) || 
            check.company.toLowerCase().includes(query)) {
          results.push({
            type: 'background',
            title: check.name,
            subtitle: ${check.company} - ,
            action: () => {
              pageManager.navigateTo('background');
              setTimeout(() => pageManager.analyzeCheck(check.id), 100);
            }
          });
        }
      }
    });

    // Busca em tarefas
    database.tasks.forEach(task => {
      if (authManager.hasPermission(task.regional)) {
        if (task.title.toLowerCase().includes(query)) {
          results.push({
            type: 'task',
            title: task.title,
            subtitle: ${task.assignedTo} - ,
            action: () => pageManager.navigateTo('tasks')
          });
        }
      }
    });

    return results.slice(0, 5); // Limita a 5 resultados
  }

  /**
   * Mostra resultados da busca
   * @param {Array} results - Resultados da busca
   */
  showSearchResults(results) {
    // Remove dropdown anterior
    const existingDropdown = document.querySelector('.search-dropdown');
    if (existingDropdown) existingDropdown.remove();

    if (results.length === 0) return;

    // Cria dropdown de resultados
    const dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown absolute top-full left-0 right-0 bg-card border border-border rounded-md mt-1 max-h-64 overflow-y-auto z-50';
    
    dropdown.innerHTML = results.map(result => 
      <div class="search-result p-3 hover:bg-white/5 cursor-pointer border-b border-border last:border-b-0" 
           data-action="">
        <div class="font-medium text-foreground"></div>
        <div class="text-xs text-secondary"></div>
      </div>
    ).join('');

    // Adiciona event listeners
    dropdown.addEventListener('click', (e) => {
      const resultEl = e.target.closest('.search-result');
      if (resultEl) {
        const index = parseInt(resultEl.dataset.action);
        results[index].action();
        dropdown.remove();
        document.getElementById('global-search').value = '';
      }
    });

    // Adiciona ao DOM
    const searchContainer = document.getElementById('global-search').parentElement;
    searchContainer.style.position = 'relative';
    searchContainer.appendChild(dropdown);

    // Remove dropdown ao clicar fora
    setTimeout(() => {
      document.addEventListener('click', function removeDropdown(e) {
        if (!searchContainer.contains(e.target)) {
          dropdown.remove();
          document.removeEventListener('click', removeDropdown);
        }
      });
    }, 100);
  }

  /**
   * Manipula mudança de visibilidade da página
   */
  handleVisibilityChange() {
    if (document.hidden) {
      // Página ficou invisível - pode pausar timers/animações
      console.log('📱 Página invisível - pausando operações');
    } else {
      // Página ficou visível - retoma operações
      console.log('📱 Página visível - retomando operações');
      if (authManager.isAuthenticated()) {
        authManager.extendSession();
      }
    }
  }

  /**
   * Toggle do menu mobile
   */
  toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  }

  /**
   * Fecha menu mobile
   */
  closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }

  /**
   * Executado após login bem-sucedido
   */
  onLoginSuccess() {
    // Configura UI do usuário
    this.setupUserUI();
    
    // Navega para dashboard
    pageManager.navigateTo('dashboard');
    
    // Fecha menu mobile se estiver aberto
    this.closeMobileMenu();
    
    console.log('✅ Login realizado com sucesso');
  }

  /**
   * Configura UI específica do usuário
   */
  setupUserUI() {
    const user = authManager.getCurrentUser();
    if (!user) return;

    // Atualiza informações do usuário
    const userNameEl = document.getElementById('user-name');
    const userRoleEl = document.getElementById('user-role');
    const userAvatarEl = document.getElementById('user-avatar');

    if (userNameEl) userNameEl.textContent = user.name;
    if (userRoleEl) userRoleEl.textContent = ${user.role} ();
    if (userAvatarEl) {
      userAvatarEl.src = https://placehold.co/40x40/010409/2f81f7?text=;
    }

    // Atualiza título da página
    document.title = SGIR -  - Protocolo T35;
  }

  /**
   * Mostra tela de erro
   * @param {Error} error - Erro ocorrido
   */
  showErrorScreen(error) {
    document.body.innerHTML = 
      <div class="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
        <div class="text-center">
          <div class="text-6xl text-accent-red mb-4">⚠️</div>
          <h1 class="text-2xl font-bold mb-2">Erro do Sistema</h1>
          <p class="text-secondary mb-4"></p>
          <button onclick="location.reload()" class="btn btn-primary">
            Recarregar Sistema
          </button>
        </div>
      </div>
    ;
  }

  /**
   * Obtém informações do sistema
   * @returns {Object} - Informações do sistema
   */
  getSystemInfo() {
    return {
      version: database.systemConfig.version,
      codename: database.systemConfig.codename,
      environment: database.systemConfig.environment,
      protocol: database.systemConfig.protocol,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      modules: Object.keys(this.modules)
    };
  }
}

// Inicialização da aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const app = new SGIRApp();
  app.init();
  
  // Expõe globalmente para debug
  window.sgirApp = app;
});

// Export para outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SGIRApp;
}

if (typeof window !== 'undefined') {
  window.SGIRApp = SGIRApp;
}
