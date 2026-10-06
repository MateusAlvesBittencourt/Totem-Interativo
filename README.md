# Totem Interativo

Protótipo acadêmico de um totem para consulta de expositores em eventos, com visualização de um mapa 3D e API para informações de expositores, produtos, categorias e visitantes.

Desenvolvido em equipe na **AGES / PUCRS**, no primeiro semestre de 2025. Esta cópia reúne o front-end e o back-end para apresentação no portfólio de Mateus Alves Bittencourt. A autoria do projeto é coletiva; a publicação neste perfil não representa autoria exclusiva.

## Tecnologias

| Camada | Tecnologias presentes no projeto |
| --- | --- |
| Interface | Next.js 15, React 19, TypeScript, Material UI e styled-components |
| Mapa 3D | Three.js, React Three Fiber e Drei |
| API | NestJS 11, TypeScript e Swagger |
| Persistência | TypeORM e SQLite |
| Testes do back-end | Jest e Supertest |

## Recursos presentes no código

- Mapa 3D com estandes identificados e controles de câmera.
- Interface lateral com seleção de categorias e expositores.
- Endpoints para consulta de produtos, categorias e expositores.
- Busca de expositores por filtros.
- Registro de leads e exportação em CSV.
- Importação de dados CSV e documentação de endpoints pelo Swagger.

## Estado do projeto

Este é um **protótipo acadêmico**, com funcionalidades em diferentes estágios. A interface lateral utiliza listas demonstrativas fixas; não foi identificada integração HTTP entre essa interface e a API nesta versão. A presença dos endpoints e dos testes não significa que todos os fluxos estejam validados.

O banco de dados e os dados de eventos não acompanham o repositório. A configuração local abaixo cria as tabelas em modo de desenvolvimento; não popula dados automaticamente. Consulte [VALIDACAO.md](VALIDACAO.md) para saber o que foi verificado nesta organização.

## Organização

- `backend/`: API, entidades, serviços e testes.
- `frontend/`: interface web, mapa 3D e recursos estáticos.
- `backend/.env.example`: configuração local de exemplo, sem credenciais.
- `PUBLICAR_GITHUB.cmd`: publicação desta cópia no repositório de portfólio.
- `COMO_PUBLICAR.md`: instruções de publicação no Windows.

## Executar localmente

Pré-requisitos: Git, Node.js 22.14 ou superior compatível com os pacotes do projeto, npm e navegador com WebGL.

```bash
git clone https://github.com/MateusAlvesBittencourt/Totem-Interativo.git
cd Totem-Interativo
```

Se você recebeu o ZIP, extraia-o e abra a pasta `Totem-Interativo` no VS Code.

### Back-end — primeiro terminal

```bash
cd backend
npm ci
```

Copie `.env.example` para `.env`. No terminal CMD do Windows:

```cmd
copy .env.example .env
npm run start:dev
```

No Linux/macOS, use `cp .env.example .env` antes de iniciar.

- API: http://localhost:3001
- Swagger: http://localhost:3001/swagger

`NODE_ENV=development` habilita a sincronização automática do esquema do SQLite. Essa configuração é destinada ao desenvolvimento local.

### Front-end — segundo terminal

Abra outro terminal na raiz do projeto:

```bash
cd frontend
npm ci
npm run dev
```

Acesse http://localhost:3000. A demonstração visual usa dados locais e pode ser explorada separadamente da API.

### Comandos de verificação

```bash
npm --prefix backend run build
npm --prefix backend test -- --runInBand
npm --prefix frontend run build
```

## Contexto e autoria

O projeto original foi desenvolvido colaborativamente na AGES/PUCRS. Os READMEs de cada aplicação preservam o contexto original. Os históricos Git originais não fazem parte deste pacote de portfólio. Não foi adicionada uma nova licença de uso nesta organização.
