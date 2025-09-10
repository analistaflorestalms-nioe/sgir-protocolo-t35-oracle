/**
 * SGIR - Protocolo T35 [MODO SEGURO]
 * Módulo de Utilitários - Oracle v7.0
 * 
 * Funções auxiliares e utilitários diversos
 */

class Utils {
  /**
   * Formata data para exibição
   * @param {string|Date} date - Data para formatar
   * @param {string} format - Formato desejado ('short', 'long', 'datetime')
   * @returns {string} - Data formatada
   */
  static formatDate(date, format = 'short') {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const options = {
      short: { day: '2-digit', month: '2-digit', year: 'numeric' },
      long: { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      },
      datetime: { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    };

    return dateObj.toLocaleDateString('pt-BR', options[format]);
  }

  /**
   * Calcula tempo relativo (ex: "há 2 horas")
   * @param {string|Date} date - Data de referência
   * @returns {string} - Tempo relativo
   */
  static timeAgo(date) {
    const now = new Date();
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const diffMs = now - dateObj;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return 'agora mesmo';
    if (diffMins < 60) return há  min;
    if (diffHours < 24) return há h;
    if (diffDays < 7) return há  dias;
    return this.formatDate(dateObj, 'short');
  }

  /**
   * Debounce para limitar execução de funções
   * @param {Function} func - Função a ser executada
   * @param {number} wait - Tempo de espera em ms
   * @returns {Function} - Função com debounce
   */
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Sanitiza string para evitar XSS
   * @param {string} str - String para sanitizar
   * @returns {string} - String sanitizada
   */
  static sanitizeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Gera cor baseada em string (para avatares, etc)
   * @param {string} str - String base
   * @returns {string} - Cor em hex
   */
  static stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.abs(hash).toString(16).substring(0, 6);
    return "#" + "000000".substring(0, 6 - color.length) + color;
  }

  /**
   * Copia texto para clipboard
   * @param {string} text - Texto para copiar
   * @returns {Promise<boolean>} - True se copiado com sucesso
   */
  static async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        return true;
      } catch (fallbackErr) {
        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }

  /**
   * Valida CPF brasileiro
   * @param {string} cpf - CPF para validar
   * @returns {boolean} - True se válido
   */
  static validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    return remainder === parseInt(cpf.substring(10, 11));
  }

  /**
   * Formata CPF para exibição
   * @param {string} cpf - CPF para formatar
   * @returns {string} - CPF formatado
   */
  static formatCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '..-');
  }

  /**
   * Gera ID único
   * @param {string} prefix - Prefixo opcional
   * @returns {string} - ID único
   */
  static generateId(prefix = '') {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return prefix ? ${prefix}__ : ${timestamp}_;
  }

  /**
   * Calcula distância entre duas coordenadas
   * @param {number} lat1 - Latitude 1
   * @param {number} lon1 - Longitude 1
   * @param {number} lat2 - Latitude 2
   * @param {number} lon2 - Longitude 2
   * @returns {number} - Distância em km
   */
  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  /**
   * Converte graus para radianos
   * @param {number} degrees - Graus
   * @returns {number} - Radianos
   */
  static toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Filtra array por múltiplos critérios
   * @param {Array} array - Array para filtrar
   * @param {Object} filters - Objeto com filtros
   * @returns {Array} - Array filtrado
   */
  static filterArray(array, filters) {
    return array.filter(item => {
      return Object.keys(filters).every(key => {
        if (!filters[key]) return true;
        
        const itemValue = item[key];
        const filterValue = filters[key];
        
        if (typeof filterValue === 'string') {
          return itemValue.toLowerCase().includes(filterValue.toLowerCase());
        }
        
        return itemValue === filterValue;
      });
    });
  }

  /**
   * Ordena array por campo
   * @param {Array} array - Array para ordenar
   * @param {string} field - Campo para ordenação
   * @param {string} direction - 'asc' ou 'desc'
   * @returns {Array} - Array ordenado
   */
  static sortArray(array, field, direction = 'asc') {
    return [...array].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      
      if (typeof aVal === 'string') {
        const result = aVal.localeCompare(bVal);
        return direction === 'asc' ? result : -result;
      }
      
      if (typeof aVal === 'number') {
        const result = aVal - bVal;
        return direction === 'asc' ? result : -result;
      }
      
      return 0;
    });
  }

  /**
   * Agrupa array por campo
   * @param {Array} array - Array para agrupar
   * @param {string} field - Campo para agrupamento
   * @returns {Object} - Objeto com grupos
   */
  static groupBy(array, field) {
    return array.reduce((groups, item) => {
      const key = item[field];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {});
  }

  /**
   * Verifica se elemento está visível na viewport
   * @param {Element} element - Elemento para verificar
   * @returns {boolean} - True se visível
   */
  static isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Scroll suave para elemento
   * @param {Element|string} target - Elemento ou seletor
   * @param {Object} options - Opções de scroll
   */
  static smoothScrollTo(target, options = {}) {
    const element = typeof target === 'string' ? 
      document.querySelector(target) : target;
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
        ...options
      });
    }
  }

  /**
   * Obtém parâmetros da URL
   * @returns {Object} - Objeto com parâmetros
   */
  static getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  }

  /**
   * Atualiza parâmetro na URL sem recarregar página
   * @param {string} key - Chave do parâmetro
   * @param {string} value - Valor do parâmetro
   */
  static updateUrlParam(key, value) {
    const url = new URL(window.location);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.replaceState({}, '', url);
  }

  /**
   * Detecta tipo de dispositivo
   * @returns {string} - 'mobile', 'tablet' ou 'desktop'
   */
  static getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  /**
   * Verifica se está em modo escuro
   * @returns {boolean} - True se modo escuro
   */
  static isDarkMode() {
    return window.matchMedia && 
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Mostra notificação toast
   * @param {string} message - Mensagem
   * @param {string} type - Tipo ('info', 'success', 'warning', 'error')
   * @param {number} duration - Duração em ms
   */
  static showToast(message, type = 'info', duration = 3000) {
    // Remove toast anterior se existir
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 	oast-notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full opacity-0;
    
    const typeClasses = {
      info: 'bg-blue-600 text-white',
      success: 'bg-green-600 text-white',
      warning: 'bg-yellow-600 text-black',
      error: 'bg-red-600 text-white'
    };
    
    toast.className += ' ' + typeClasses[type];
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Anima entrada
    requestAnimationFrame(() => {
      toast.classList.remove('translate-x-full', 'opacity-0');
    });
    
    // Remove após duração
    setTimeout(() => {
      toast.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  /**
   * Armazena dados no localStorage com expiração
   * @param {string} key - Chave
   * @param {any} value - Valor
   * @param {number} expiresInMs - Expiração em ms
   */
  static setLocalStorageWithExpiry(key, value, expiresInMs) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiresInMs
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  /**
   * Obtém dados do localStorage verificando expiração
   * @param {string} key - Chave
   * @returns {any} - Valor ou null se expirado
   */
  static getLocalStorageWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
      const item = JSON.parse(itemStr);
      const now = new Date();
      
      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      
      return item.value;
    } catch (e) {
      return null;
    }
  }
}

// Export para outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}

if (typeof window !== 'undefined') {
  window.Utils = Utils;
}
