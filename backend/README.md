<br />
<div align="center">

  <h3 align="center">TOTEM-INTERATIVO-REST-API</h3>

  <p align="center">
    Backend do projeto Totem Interativo desenvolvido na AGES no primeiro semestre de 2025.
    <br />
		<br />
		<a href="#-getting-started">Getting Started</a>
    ·
    <a href="#-installation">Installation</a>
    ·
		<a href="#-run">Run</a>
    ·
		<a href="#-developing">Developing</a>
    ·
    <a href="#-processo-de-desenvolvimento">Processo de Desenvolvimento</a>
    ·
    <a href="#-convenções">Convenções</a>
		<br />
		<br />
  </p>
</div>

---

## 🛠 Getting Started

Instale os pré‑requisitos

[<img src="https://nodejs.org/static/images/logo.svg" width="80">](https://nodejs.org/)

`v22.14.*`

---

## 1. Clone o repositório

```bash
git clone https://github.com/MateusAlvesBittencourt/Totem-Interativo.git
cd Totem-Interativo/backend
```

---

## ⚙️ Installation

Instale as dependências:

```shell
npm ci
```

---

## 🚀 Run

Antes de iniciar, copie `.env.example` para `.env` (`copy .env.example .env` no CMD do Windows).

Modo desenvolvimento (hot‑reload):

```bash
npm run start:dev
```

Modo produção:

```bash
npm run build
npm run start:prod
```

API disponível em `http://localhost:3001`.

---

## 🧑🏼‍💻 Developing

### Estrutura principal

```
src/
├── controllers/        # Endpoints HTTP
├── services/           # Lógica de negócio
├── entities/           # Models TypeORM
├── dtos/               # Validation DTOs
├── modules/            # Módulos NestJS
├── main.ts             # Bootstrap da aplicação
└── app.module.ts       # Módulo raiz
```

---

## 🌳 Processo de Desenvolvimento

### 📌 Branches

**Nomes das branches:**
- User Story: `<numeroDaUS>/<nomeDoItem>-<detalheDoItem>`
- Componente: `<tipoDeItem>-<nomeDoItem>`

**Exemplos:**
- `US01/TelaDeBusca-filtroPorCategoria`
- `component-mapa3D`
- `page-relatorios`

**Criação de Branch:**
```bash
git pull origin develop
git checkout -b <nomeDaBranch>
git push --set-upstream origin <nomeDaBranch>
```

### 📦 Commits

- Adicione arquivos específicos:
```bash
git add <nomeDoArquivo>
```
- Faça commits claros e frequentes:
```bash
git commit -m 'descrição breve da tarefa'
```
- Envie alterações:
```bash
git push
```

---

## 📝 Convenções

Para garantir consistência e legibilidade no projeto, adotamos as seguintes convenções:

| Contexto                   | Convenção         | Exemplo                            |
|----------------------------|-------------------|------------------------------------|
| **Arquivos**               | kebab-case        | `search-bar.service.ts`            |
| **Classes/Entidades**      | PascalCase        | `CategoryController`               |
| **Métodos/Variáveis**      | camelCase         | `findAll()`, `categoryId`          |
| **Rotas/Endpoints**        | kebab-case        | `@Controller('sub-categories')`    |
| **Colunas no Banco**       | snake_case        | `category_id`, `created_at`        |
| **Variáveis de Ambiente**  | UPPER_SNAKE_CASE  | `DATABASE_PATH`, `JWT_EXPIRES_IN`  |

---

