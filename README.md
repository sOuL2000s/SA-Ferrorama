# SA-Ferrorama

## Sobre o Projeto

O **Red Rush** é um sistema de monitoramento de trens através de sensores. Os sensores capturam informações como velocidade, localização e horário de partida, permitindo que os usuários monitorem os trens de forma fácil e intuitiva através de um aplicativo web.

## Objetivo

Criar uma aplicação web responsiva e acessível para que as pessoas possam monitorar os trens usando qualquer dispositivo, sem dificuldade.

## Equipe

| Integrante | Responsabilidade |
|------------|------------------|
| Marcos | Tela de login, página home, dashboard |
| Ramon | Mockup, dashboard, design |
| Davi Rosa | README, documentação |
| Rebeca | CRUD, banco de dados |

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: Bootstrap 5.3.8
- **Icons**: Material Icons
- **Backend** (planejado): PHP com XAMPP
- **Banco de Dados** (planejado): MySQL/MariaDB

## Estrutura do Projeto

```
SA-Ferrorama/
├── index.html              # Página inicial (redirecionamento)
├── assets/
│   ├── imag/               # Imagens e ícones
│   │   ├── Logo_red_rush.png
│   │   ├── person.png
│   │   ├── person2.webp
│   │   ├── trem.png
│   │   └── trem_gif.gif
│   └── style/
│       └── style.css       # Estilos principais
├── public/
│   ├── home.html           # Página inicial do app
│   ├── login.html          # Página de login
│   ├── cadastro.html       # Página de cadastro
│   ├── sensor.html         # Adicionar sensores
│   ├── sensor2.html        # Visualizar sensores
│   └── cadastro2.html      # Lista de usuários
├── script/
│   └── script.js           # JavaScript principal
└── doc/
    ├── Presquisa-crud.md   # Pesquisa sobre CRUD
    ├── pesquisa-scrum.md   # Pesquisa sobre Scrum
    └── pesquisa-xampp.md   # Pesquisa sobre XAMPP
```

## Funcionalidades

### Implementadas
- ✅ Sistema de login com validação
- ✅ Cadastro de usuários com validação
- ✅ Dashboard para administradores
- ✅ Visualização de sensores em tempo real
- ✅ Lista de usuários cadastrados
- ✅ Design responsivo
- ✅ Menu hambúrguer para dispositivos móveis
- ✅ Validação de formulários (frontend)
- ✅ Busca de usuários

### Planejadas
- 🔲 Integração com banco de dados
- 🔲 Autenticação real (backend)
- 🔲 CRUD completo para sensores
- 🔲 Gráficos e estatísticas
- 🔲 Notificações em tempo real
- 🔲 API para integração com sensores físicos

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/marcosvoltolini/SA-Ferrorama.git
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd SA-Ferrorama
   ```

3. Abra o arquivo `public/home.html` em seu navegador.

## Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.txt) para mais detalhes.

---

**Red Rush** © 2026 - Todos os direitos reservados.
