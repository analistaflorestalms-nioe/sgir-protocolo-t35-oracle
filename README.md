# SGIR - Sistema de Gestão de Inteligência e Riscos
## Protocolo T35 [MODO SEGURO] - Oracle v7.0

[![Status](https://img.shields.io/badge/Status-Operational-green)](https://github.com)
[![Version](https://img.shields.io/badge/Version-7.0_Oracle-blue)](https://github.com)
[![Security](https://img.shields.io/badge/Security-T35_Protocol-red)](https://github.com)

> Sistema avançado de gestão de inteligência e análise de riscos desenvolvido para ambientes corporativos de alta segurança. Implementa protocolo T35 com autenticação multi-camada e monitoramento em tempo real.

## 🛡️ Características de Segurança

- **Protocolo T35**: Sistema de autenticação avançado
- **Glassmorphism UI**: Interface moderna com efeitos visuais
- **Scanline Effect**: Efeito visual cyberpunk para ambiente seguro
- **Session Management**: Controle rigoroso de sessões ativas
- **Audit Logs**: Registro completo de atividades do sistema
- **Role-Based Access**: Controle de acesso baseado em funções

## 🚀 Funcionalidades

### 📊 Dashboard Executivo
- Visão geral de ameaças por regional
- Análise climática para prevenção de riscos
- Gráficos interativos em tempo real
- Ticker de alertas críticos
- Mapa de calor de riscos

### 🔍 Inteligência
- Gestão de documentos RELINT/RELINFO
- Sistema de compartilhamento regional
- Análise de impacto e classificação
- Tracking semanal automatizado
- Clipping nacional e internacional

### ✅ Central de Tarefas
- Delegação inteligente de tarefas
- Controle de prioridades (Baixa → Crítica)
- Timeline e prazos automáticos
- Notificações em tempo real
- Dashboard de produtividade

### 👤 Background Check
- Verificação automática de antecedentes
- Análise de vínculos cruzados
- Detecção de padrões suspeitos
- Integração com base de inteligência
- Relatórios de compliance

### 🗺️ Mapa de Operações
- Visualização geográfica em tempo real
- Marcadores de ocorrências por tipo
- Sobreposição de ativos estratégicos
- Análise de proximidade e riscos
- Controle de camadas interativo

### 📡 OSINT Tracker
- Monitoramento de fontes abertas
- Análise automática de impacto
- Geração de RELINFO assistida
- Detecção de tendências
- Alertas de palavras-chave

## 🏗️ Arquitetura

### Frontend Modular
`
src/
├── css/
│   ├── variables.css    # Variáveis CSS e temas
│   ├── base.css        # Reset e estilos base
│   ├── components.css  # Componentes reutilizáveis
│   └── layout.css      # Layout e responsividade
├── js/
│   ├── app.js         # Aplicação principal
│   ├── auth.js        # Autenticação e sessões
│   ├── pages.js       # Gerenciamento de páginas
│   ├── modals.js      # Sistema de modais
│   └── utils.js       # Utilitários e helpers
├── data/
│   └── database.js    # Dados simulados
└── index.html         # Estrutura HTML principal
`

### Tecnologias Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **UI Framework**: TailwindCSS
- **Icons**: Lucide Icons + Font Awesome
- **Charts**: Chart.js
- **Maps**: Leaflet.js
- **Architecture**: Modular ES6 Classes

## 🔧 Instalação e Uso

### Pré-requisitos
- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+)
- Servidor web local (Python, Node.js, ou similar)

### Instalação Local
`ash
# Clone o repositório
git clone https://github.com/seu-usuario/sgir-protocolo-t35.git

# Navegue para o diretório
cd sgir-protocolo-t35

# Inicie um servidor local
python -m http.server 8000
# ou
npx serve .

# Acesse no navegador
http://localhost:8000
`

### Deploy em Produção
1. Configure servidor HTTPS (obrigatório)
2. Ajuste CSP headers para segurança
3. Configure variáveis de ambiente
4. Implemente backend real para dados
5. Configure monitoramento e logs

## 👥 Usuários de Demonstração

| Usuário | Função | Regional | Permissões |
|---------|--------|----------|------------|
| Aleluia | Analista Industrial | SP | Standard, Industrial |
| Fábio | Analista Florestal | SP | Standard, Florestal |
| G. Silva | Analista Florestal | MS | Standard, Florestal |
| Keven | Analista Industrial | BA | Standard, Industrial |
| Geovana | Analista Portuária | SP-Porto | Standard, Portuário |
| Gideonis | Supervisor Geral | Global | Supervisor |
| Laio | Gerente Geral | Global | Manager |
| Pithon | Diretor | Global | Director |

### Login
- Selecione qualquer usuário da lista
- A senha é simulada (qualquer valor)
- Sistema executa sequência de boot automática

## 🔒 Protocolos de Segurança

### Autenticação
- Session timeout: 30 minutos
- Login attempts: máximo 3 tentativas
- Lockout time: 5 minutos após bloqueio
- Session extension: atividade do usuário

### Auditoria
- Todos os logins são registrados
- Ações críticas geram logs
- Tentativas de acesso negado são monitoradas
- Dados armazenados localmente (localStorage)

### Permissões
- **Standard**: Acesso à regional específica
- **Industrial/Florestal/Portuário**: Permissões específicas por setor
- **Supervisor**: Acesso a todas as regionais
- **Manager/Director**: Acesso administrativo completo

## 📱 Responsividade

- **Desktop** (1024px+): Experiência completa
- **Tablet** (768px-1023px): Layout adaptativo
- **Mobile** (320px-767px): Interface otimizada com menu lateral

## 🎨 Temas e Personalização

### Temas Disponíveis
- **Dark Mode** (padrão): Interface escura cyberpunk
- **Darker Mode**: Versão ainda mais escura
- **Light Mode**: Versão clara (opcional)

### Personalização
- Variáveis CSS centralizadas
- Sistema de cores consistente
- Componentes modulares
- Fácil extensibilidade

## 🧪 Testes e Qualidade

### Funcionalidades Testadas
- ✅ Sistema de autenticação
- ✅ Navegação entre páginas
- ✅ Modais e formulários
- ✅ Busca global
- ✅ Responsividade
- ✅ Acessibilidade básica

### Performance
- First Contentful Paint: < 1s
- Largest Contentful Paint: < 2s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

## 🔄 Roadmap

### v7.1 (Próxima)
- [ ] Backend real com API REST
- [ ] Websockets para atualizações em tempo real
- [ ] Sistema de notificações push
- [ ] Exportação de relatórios PDF
- [ ] Dashboard customizável

### v8.0 (Futuro)
- [ ] Machine Learning para análise de padrões
- [ ] Integração com sistemas externos
- [ ] App mobile nativo
- [ ] API GraphQL
- [ ] Microserviços

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (git checkout -b feature/AmazingFeature)
3. Commit suas mudanças (git commit -m 'Add some AmazingFeature')
4. Push para a branch (git push origin feature/AmazingFeature)
5. Abra um Pull Request

### Padrões de Código
- ESLint configurado para ES6+
- Prettier para formatação
- Comentários em português
- Conventional Commits

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

- **Email**: suporte@sgir.com.br
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/sgir-protocolo-t35/issues)
- **Documentação**: [Wiki](https://github.com/seu-usuario/sgir-protocolo-t35/wiki)

## 🙏 Agradecimentos

- Equipe NIOE Security Systems
- Comunidade open-source
- Beta testers e colaboradores

---

<div align="center">

**🛡️ SGIR - Protocolo T35 - Segurança e Inteligência em Primeiro Lugar 🛡️**

*Desenvolvido com ❤️ para ambientes corporativos de alta segurança*

</div>
