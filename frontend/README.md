# 🖥️ Totem Interativo - Frontend (Next.js + TypeScript)

Este é o projeto **frontend** do **Totem Interativo**, desenvolvido com **Next.js** e **TypeScript**, utilizando o sistema de **App Router**, que permite a criação automática de rotas com base na estrutura de pastas.

---

## ✅ Requisitos para rodar a aplicação

Antes de iniciar o projeto, você precisa ter os seguintes softwares instalados na sua máquina:

### 📌 Node.js

- Versão utilizada: **22.14.0 (LTS)**
- Download: [https://nodejs.org/en/download](https://nodejs.org/en/download)

### 📌 npm

- Gerenciador de pacotes (instalado automaticamente com o Node.js)

### 📌 Git

- Para clonar o repositório
- Download: [https://git-scm.com/downloads](https://git-scm.com/downloads)

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/MateusAlvesBittencourt/Totem-Interativo.git
cd Totem-Interativo/frontend
```

### 2. Instale as dependências do projeto

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### 4. Acesse a aplicação no navegador

```
http://localhost:3000
```

---

## 📁 Estrutura de Pastas

```plaintext
frontend/
├── public/                  # Assets públicos (imagens, ícones, arquivos estáticos)
├── src/
│   ├── app/                 # App Router: define as rotas da aplicação
│   ├── components/          # Componentes reutilizáveis
│   └── services/            # Requisições e integrações com a API
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧭 Como funcionam as rotas no Next.js (App Router)

Com o **App Router**, o Next cria as rotas automaticamente com base na estrutura de pastas dentro de `src/app/`.

### Exemplo de comportamento automático de rotas:

| Caminho do Arquivo                | Rota gerada          |
|----------------------------------|----------------------|
| `src/app/page.tsx`               | `/` (rota principal) |
| `src/app/admin/page.tsx`         | `/admin`             |
| `src/app/relatorios/page.tsx`    | `/relatorios`        |

Você **não precisa configurar as rotas manualmente**. O Next.js faz isso automaticamente com base nos arquivos `.tsx` dentro da pasta `app`.

---

## 🖼️ Pasta `public/` como assets

A pasta `public/` serve como o local centralizado de **assets estáticos**, como:

- Imagens (`.jpg`, `.png`, `.svg`)
- PDFs
- Ícones (`favicon.ico`)
- Arquivos de fonte (`.woff`, `.ttf`, etc.)

### Como usar arquivos da pasta public:

```tsx
<img src="/img/logo.png" alt="Logo" />
```

Ou usando o componente `Image` do Next:

```tsx
import Image from 'next/image';

<Image src="/img/logo.png" alt="Logo" width={200} height={100} />
```

---

## 🎨 Biblioteca de Componentes - Material UI

Este projeto utiliza a biblioteca de componentes [Material UI (MUI)](https://mui.com/) como **facilitador no desenvolvimento da interface**.

O MUI oferece uma ampla gama de componentes prontos para uso, como botões, cards, modais, grids, inputs e muito mais, todos baseados no design system do Google.

---

## 🧱 Criando um componente padrão reutilizável

```tsx
// src/components/BotaoPadrao/BotaoPadrao.tsx

import { Button } from '@mui/material';

interface BotaoPadraoProps {
  texto: string;
  [key: string]: any; // restante das props, como onClick, sx, etc.
}

export default function BotaoPadrao({
  texto,
  ...rest
}: BotaoPadraoProps) {
  return (
    <Button variant="contained" color="primary" {...rest}>
      {texto}
    </Button>
  );
}
```

## 🎨 Styles

- Vamos utilizar como standard no nosso projeto o https://styled-components.com/
- Nome do arquivo de exemplo: - Button.styles.tsx
```tsx
// Button.styles.tsx
import styled from 'styled-components';

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
```
Agora, utilize o componente no seu arquivo principal:
```tsx
// App.tsx
import React from 'react';
import { Button } from './Button.styles';

const App: React.FC = () => {
  return <Button>Clique aqui</Button>;
};

export default App;
```

### Explicação:

- `interface BotaoPadraoProps`: define as **propriedades (props)** que o componente pode receber.
  - `texto: string`: define o **texto que será exibido dentro do botão**.
  - `[key: string]: any`: permite que o componente aceite **quaisquer outras props adicionais**, como `onClick`, `sx`, `type`, `disabled`, etc.
- `export default function BotaoPadrao(...)`: declara a função do componente, já exportando ela como padrão (`default`).
- `texto` e `...rest`: desestrutura as props recebidas. `texto` é usado diretamente no conteúdo do botão, enquanto `...rest` passa o restante das props para o botão do Material UI.
- `<Button variant="contained" color="primary" {...rest}>`: renderiza o botão estilizado e funcional com Material UI.
- `{texto}`: define o conteúdo visível dentro do botão.

---

## 📁 Organização dos componentes

### 1. Componentes globais

Ficam em `src/components/`. São utilizados em várias partes da aplicação (ex: Header, Footer, Botões).

### 2. Componentes locais

Criados dentro da pasta da página onde são utilizados.

```plaintext
src/
├── app/
│   └── relatorios/
│       ├── page.tsx
│       └── components/
│           └── TabelaDeRelatorios.tsx
```

---

## 🛠 Tecnologias Utilizadas

- [React](https://react.dev/)
- [Next.js 13+](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Node.js 22.14.0](https://nodejs.org/)

