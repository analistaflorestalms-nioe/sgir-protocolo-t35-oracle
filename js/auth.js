/**
 * SGIR - Protocolo T35 [MODO SEGURO]
 * Módulo de Autenticação - Oracle v7.0
 * 
 * Gerencia login, logout e permissões do sistema
 */

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.sessionTimeout = 30 * 60 * 1000; // 30 minutos
    this.sessionTimer = null;
    this.loginAttempts = 0;
    this.maxLoginAttempts = 3;
    this.lockoutTime = 5 * 60 * 1000; // 5 minutos
  }

  /**
   * Autentica um usuário no sistema
   * @param {string} username - Nome do usuário
   * @param {string} password - Senha (não validada na simulação)
   * @returns {Promise<boolean>} - True se login bem-sucedido
   */
  async login(username, password = null) {
    try {
      // Verifica se o usuário existe na base de dados
      if (!database.users[username]) {
        this.handleFailedLogin();
        throw new Error('Usuário não encontrado');
      }

      // Simula verificação de senha (em sistema real seria validada)
      if (password !== null && password.length < 8) {
        this.handleFailedLogin();
        throw new Error('Credenciais inválidas');
      }

      // Define usuário atual
      this.currentUser = {
        name: username,
        ...database.users[username],
        loginTime: new Date().toISOString(),
        sessionId: this.generateSessionId()
      };

      // Inicia sequência de boot
      await this.playBootSequence();

      // Configura timeout de sessão
      this.startSessionTimer();

      // Reset contador de tentativas
      this.loginAttempts = 0;

      // Log de auditoria
      this.logSecurityEvent('LOGIN_SUCCESS', username);

      return true;
    } catch (error) {
      this.logSecurityEvent('LOGIN_FAILED', username, error.message);
      throw error;
    }
  }

  /**
   * Executa a sequência de boot visual
   * @returns {Promise<void>}
   */
  async playBootSequence() {
    const bootSequence = document.getElementById('boot-sequence');
    const loginContainer = document.getElementById('login-form-container');
    const bootStatus = document.getElementById('boot-status');
    const hiddenBootMsgs = document.querySelectorAll('.boot-hidden');

    return new Promise((resolve) => {
      // Esconde form de login e mostra boot
      loginContainer.style.display = 'none';
      bootSequence.style.display = 'block';

      // Sequência de boot com delays
      setTimeout(() => {
        bootStatus.textContent = "OK";
        this.playBootSound();
      }, 500);

      setTimeout(() => {
        hiddenBootMsgs[0].style.display = 'block';
        this.playBootSound();
      }, 1000);

      setTimeout(() => {
        hiddenBootMsgs[1].style.display = 'block';
        this.playBootSound();
      }, 1500);

      setTimeout(() => {
        hiddenBootMsgs[2].style.display = 'block';
        this.playBootSound();
      }, 2000);

      setTimeout(() => {
        // Transição para interface principal
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('app').classList.remove('hidden');
        
        // Reset elementos do boot para próximo login
        this.resetBootSequence();
        
        resolve();
      }, 2500);
    });
  }

  /**
   * Reset da sequência de boot
   */
  resetBootSequence() {
    const loginContainer = document.getElementById('login-form-container');
    const bootSequence = document.getElementById('boot-sequence');
    const bootStatus = document.getElementById('boot-status');
    const hiddenBootMsgs = document.querySelectorAll('.boot-hidden');

    loginContainer.style.display = 'block';
    bootSequence.style.display = 'none';
    bootStatus.textContent = "CONNECTING...";
    hiddenBootMsgs.forEach(msg => msg.style.display = 'none');
  }

  /**
   * Simula som de boot (seria implementado com Web Audio API)
   */
  playBootSound() {
    // Em uma implementação real, usaria Web Audio API ou HTML5 Audio
    console.log('🔊 Boot sound played');
  }

  /**
   * Gera ID único para sessão
   * @returns {string} - Session ID
   */
  generateSessionId() {
    return 'SGIR_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Gerencia tentativas de login falhadas
   */
  handleFailedLogin() {
    this.loginAttempts++;
    
    if (this.loginAttempts >= this.maxLoginAttempts) {
      this.lockoutUser();
    }
  }

  /**
   * Bloqueia temporariamente novos logins
   */
  lockoutUser() {
    const loginForm = document.getElementById('login-form');
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'SISTEMA BLOQUEADO';
    
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i data-lucide="arrow-right-circle" class="mr-2 h-5 w-5"></i> INICIAR SESSÃO';
      this.loginAttempts = 0;
      lucide.createIcons();
    }, this.lockoutTime);

    this.logSecurityEvent('USER_LOCKOUT', 'system', Max attempts reached: );
  }

  /**
   * Inicia timer de sessão
   */
  startSessionTimer() {
    this.clearSessionTimer();
    
    this.sessionTimer = setTimeout(() => {
      this.logout('SESSION_TIMEOUT');
    }, this.sessionTimeout);
  }

  /**
   * Limpa timer de sessão
   */
  clearSessionTimer() {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
      this.sessionTimer = null;
    }
  }

  /**
   * Estende sessão (chamado em atividade do usuário)
   */
  extendSession() {
    if (this.currentUser) {
      this.startSessionTimer();
    }
  }

  /**
   * Realiza logout do sistema
   * @param {string} reason - Motivo do logout
   */
  logout(reason = 'USER_LOGOUT') {
    if (this.currentUser) {
      this.logSecurityEvent('LOGOUT', this.currentUser.name, reason);
      this.currentUser = null;
    }

    this.clearSessionTimer();
    
    // Limpa dados sensíveis do sessionStorage
    sessionStorage.clear();
    
    // Recarrega página para reset completo
    location.reload();
  }

  /**
   * Verifica se usuário tem permissão para acessar recurso
   * @param {string} itemRegional - Regional do item
   * @param {string|Array} requiredPermissions - Permissões necessárias
   * @returns {boolean} - True se tem permissão
   */
  hasPermission(itemRegional, requiredPermissions = []) {
    if (!this.currentUser) return false;

    const user = this.currentUser;
    
    // Usuários globais ou com permissões elevadas têm acesso total
    const elevatedPermissions = ['supervisor', 'manager', 'director'];
    const hasElevatedAccess = elevatedPermissions.some(perm => 
      user.permissions.includes(perm)
    );

    if (user.regional === 'Global' || hasElevatedAccess) {
      return true;
    }

    // Verifica regional
    if (user.regional !== itemRegional) {
      return false;
    }

    // Verifica permissões específicas se fornecidas
    if (requiredPermissions.length > 0) {
      const permArray = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];
      return permArray.some(perm => user.permissions.includes(perm));
    }

    return true;
  }

  /**
   * Verifica se usuário é administrador
   * @returns {boolean}
   */
  isAdmin() {
    return this.currentUser && 
           ['supervisor', 'manager', 'director'].some(perm => 
             this.currentUser.permissions.includes(perm)
           );
  }

  /**
   * Obtem informações do usuário atual
   * @returns {Object|null} - Dados do usuário ou null
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Verifica se usuário está autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.currentUser !== null;
  }

  /**
   * Log de eventos de segurança
   * @param {string} event - Tipo do evento
   * @param {string} user - Usuário envolvido
   * @param {string} details - Detalhes adicionais
   */
  logSecurityEvent(event, user, details = '') {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event: event,
      user: user,
      details: details,
      sessionId: this.currentUser?.sessionId || 'NO_SESSION',
      userAgent: navigator.userAgent,
      ip: 'SIMULATED' // Em produção seria obtido do servidor
    };

    // Em produção, enviaria para servidor de logs
    console.log('🔒 Security Event:', logEntry);
    
    // Armazena localmente para debug (removeria em produção)
    const securityLogs = JSON.parse(localStorage.getItem('sgir_security_logs') || '[]');
    securityLogs.push(logEntry);
    
    // Mantém apenas últimos 100 logs
    if (securityLogs.length > 100) {
      securityLogs.splice(0, securityLogs.length - 100);
    }
    
    localStorage.setItem('sgir_security_logs', JSON.stringify(securityLogs));
  }

  /**
   * Obtém logs de segurança (para debug)
   * @returns {Array} - Array de logs
   */
  getSecurityLogs() {
    return JSON.parse(localStorage.getItem('sgir_security_logs') || '[]');
  }

  /**
   * Limpa logs de segurança
   */
  clearSecurityLogs() {
    localStorage.removeItem('sgir_security_logs');
  }
}

// Instância global do gerenciador de autenticação
const authManager = new AuthManager();

// Event listeners para atividade do usuário (estende sessão)
const userActivityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
userActivityEvents.forEach(event => {
  document.addEventListener(event, () => {
    if (authManager.isAuthenticated()) {
      authManager.extendSession();
    }
  }, { passive: true });
});

// Export para outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AuthManager;
}

if (typeof window !== 'undefined') {
  window.AuthManager = AuthManager;
  window.authManager = authManager;
}
