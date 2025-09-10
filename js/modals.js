/**
 * SGIR - Protocolo T35 [MODO SEGURO]
 * Módulo de Modais - Oracle v7.0
 * 
 * Gerenciamento de modais e formulários
 */

class ModalManager {
  constructor() {
    this.activeModal = null;
    this.setupEventListeners();
  }

  /**
   * Configura event listeners globais
   */
  setupEventListeners() {
    // Fecha modal ao clicar no backdrop
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        this.closeActiveModal();
      }
    });

    // Fecha modal com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.closeActiveModal();
      }
    });
  }

  /**
   * Abre modal específico
   * @param {string} modalId - ID do modal
   */
  openModal(modalId) {
    this.closeActiveModal(); // Fecha modal ativo se houver
    
    const modal = document.getElementById(modalId);
    if (!modal) return;

    this.activeModal = modalId;
    
    // Popula dados específicos do modal
    this.populateModalData(modalId);
    
    // Mostra modal
    modal.classList.add('show');
    
    // Foca no primeiro input se existir
    const firstInput = modal.querySelector('input, textarea, select');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }

  /**
   * Fecha modal específico
   * @param {string} modalId - ID do modal
   */
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('show');
    
    if (this.activeModal === modalId) {
      this.activeModal = null;
    }

    // Reset formulários
    const forms = modal.querySelectorAll('form');
    forms.forEach(form => form.reset());
  }

  /**
   * Fecha modal ativo
   */
  closeActiveModal() {
    if (this.activeModal) {
      this.closeModal(this.activeModal);
    }
  }

  /**
   * Popula dados específicos do modal
   * @param {string} modalId - ID do modal
   */
  populateModalData(modalId) {
    switch (modalId) {
      case 'new-task-modal':
        this.populateTaskModal();
        break;
      case 'new-relinfo-modal':
        this.populateRelinfoModal();
        break;
    }
  }

  /**
   * Popula modal de nova tarefa
   */
  populateTaskModal() {
    const userSelect = document.querySelector('#new-task-modal select');
    if (userSelect) {
      userSelect.innerHTML = '<option value="">Designar para...</option>' +
        Object.keys(database.users).map(user => 
          <option value=""></option>
        ).join('');
    }
  }

  /**
   * Popula modal de novo RELINFO
   */
  populateRelinfoModal() {
    // Limpa campos se não foram preenchidos externamente
    const titleInput = document.getElementById('relinfo-title');
    const contentTextarea = document.getElementById('relinfo-content');
    
    if (titleInput && !titleInput.value) {
      titleInput.value = '';
    }
    
    if (contentTextarea && !contentTextarea.value) {
      contentTextarea.value = '';
    }
  }

  /**
   * Submete formulário de nova tarefa
   * @param {Event} e - Evento do formulário
   */
  submitNewTask(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const taskData = {
      id: Utils.generateId('TASK'),
      title: formData.get('title'),
      assignedTo: formData.get('assignedTo'),
      priority: formData.get('priority'),
      description: formData.get('description') || '',
      status: 'Pendente',
      regional: authManager.getCurrentUser().regional,
      createdAt: new Date().toISOString(),
      dueDate: formData.get('dueDate') || this.getDefaultDueDate()
    };

    // Validação básica
    if (!taskData.title || !taskData.assignedTo || !taskData.priority) {
      Utils.showToast('Preencha todos os campos obrigatórios', 'error');
      return;
    }

    // Simula salvamento (em produção enviaria para API)
    database.tasks.push(taskData);
    
    Utils.showToast('Tarefa criada com sucesso', 'success');
    this.closeModal('new-task-modal');
    
    // Atualiza página se estiver na aba de tarefas
    if (pageManager.currentPage === 'tasks') {
      pageManager.renderPage('tasks');
    }
  }

  /**
   * Submete formulário de novo RELINFO
   * @param {Event} e - Evento do formulário
   */
  submitNewRelinfo(e) {
    e.preventDefault();
    
    const title = document.getElementById('relinfo-title').value;
    const content = document.getElementById('relinfo-content').value;
    
    if (!title || !content) {
      Utils.showToast('Preencha todos os campos', 'error');
      return;
    }

    const user = authManager.getCurrentUser();
    const relinfoData = {
      id: Utils.generateId('RELINFO'),
      type: 'RELINFO',
      title: title,
      author: user.name,
      regional: user.regional,
      status: 'Pendente',
      content: content,
      sharedWith: [],
      createdAt: new Date().toISOString(),
      priority: 'Média',
      classification: 'Interno'
    };

    // Simula salvamento
    database.intelDocuments.push(relinfoData);
    
    Utils.showToast('RELINFO submetido para análise', 'success');
    this.closeModal('new-relinfo-modal');
    
    // Atualiza página se estiver na aba de inteligência
    if (pageManager.currentPage === 'intel') {
      pageManager.renderPage('intel');
    }
  }

  /**
   * Obtém data padrão para prazo (7 dias)
   * @returns {string} - Data em formato ISO
   */
  getDefaultDueDate() {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  }
}

// Instância global do gerenciador de modais
const modalManager = new ModalManager();

// Export para outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ModalManager;
}

if (typeof window !== 'undefined') {
  window.ModalManager = ModalManager;
  window.modalManager = modalManager;
}
