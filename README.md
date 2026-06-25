# Poções e Soluções

Projeto desenvolvido para a disciplina **SCC0219 - Introdução ao Desenvolvimento Web**, referente à **Atividade Prática 2**.

O sistema representa o website da loja fictícia **Poções e Soluções**, pertencente à personagem **Annabelle Merigold**. A loja vende poções mágicas e precisava de uma solução web para exibir seus produtos e permitir que a administradora cadastre, liste e remova poções.

## Objetivo do Projeto

Desenvolver um site com duas partes principais:

1. **Página pública da loja**
   - Apresenta a loja Poções e Soluções.
   - Mostra uma seção de histórico da loja, fundada em 1867.
   - Exibe as poções disponíveis para compra.
   - Cada poção apresenta nome, imagem, descrição, preço e botão "Comprar".

2. **Página administrativa**
   - Permite cadastrar novas poções.
   - Permite listar as poções cadastradas.
   - Permite remover poções do catálogo.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- AJAX com Fetch API
- Node.js
- Express.js
- Sequelize
- SQLite em memória
- CORS
- Nodemon

## Funcionalidades

### Site público

- Exibição da descrição da loja.
- Seção histórica da loja.
- Carrossel visual com poções.
- Listagem dinâmica das poções cadastradas.
- Botão "Comprar" em cada poção.
- Layout responsivo para desktop e dispositivos móveis.

### Painel administrativo

- Cadastro de poções com:
  - nome;
  - descrição;
  - URL ou caminho da imagem;
  - preço.

- Listagem das poções cadastradas.
- Remoção de poções.
- Validação de formulário.
- Mensagens de sucesso e erro.

## Estrutura do Projeto

```txt
pocoes_solucoes/
│
├── package.json
├── README.md
├── .gitignore
│
├── src/
│   ├── server.js
│   │
│   ├── database/
│   │   └── sequelize.js
│   │
│   ├── models/
│   │   └── Potion.js
│   │
│   ├── seed/
│   │   └── potionsSeed.js
│   │
│   ├── controllers/
│   │   └── potionsController.js
│   │
│   ├── routes/
│   │   └── potionsRoutes.js
│   │
│   └── middlewares/
│       └── errorHandler.js
│
└── public/
    ├── index.html
    ├── admin.html
    │
    ├── css/
    │   └── styles.css
    │
    └── js/
        ├── api.js
        ├── home.js
        ├── admin.js
        └── carousel.js
```

## Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone LINK_DO_REPOSITORIO
```

Depois, entre na pasta do projeto:

```bash
cd pocoes-e-solucoes
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Rodar o servidor em modo de desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em:

```txt
http://localhost:3000
```

## Páginas do Sistema

### Página pública

```txt
http://localhost:3000
```

Essa página mostra a loja, sua história e as poções disponíveis.

### Página administrativa

```txt
http://localhost:3000/admin.html
```

Essa página permite cadastrar, listar e remover poções.

## Endpoints da API

### Listar poções

```http
GET /api/potions
```

Retorna todas as poções cadastradas.

### Cadastrar poção

```http
POST /api/potions
```

Exemplo de corpo da requisição:

```json
{
  "name": "Poção da Coragem",
  "description": "Ajuda o usuário a enfrentar grandes desafios por 12 horas.",
  "image": "https://exemplo.com/imagem.png",
  "price": 250
}
```

### Remover poção

```http
DELETE /api/potions/:id
```

Remove a poção correspondente ao ID informado.

## Banco de Dados

O projeto utiliza **SQLite em memória**, conforme solicitado na atividade.

A conexão é criada com Sequelize usando:

```js
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});
```

Como o banco está em memória, os dados não ficam salvos após encerrar o servidor. Por isso, sempre que o servidor é iniciado, o sistema popula novamente o banco com as poções iniciais.

## Poções Iniciais

O banco é iniciado com as seguintes poções:

- Poção Blue Sky
- Poção do Perfume Misterioso
- Poção de Pinus
- Poção da Beleza Eterna
- Poção do Arco Íro
- Caldeirão das Verdades Secretas

## Observações

- A funcionalidade real de compra não foi implementada, pois não era exigida nesta entrega.
- O botão "Comprar" aparece visualmente nos cards das poções.
- O site utiliza JavaScript e AJAX para buscar as poções do Web Service.
- A página administrativa permite gerenciar os produtos disponíveis no catálogo.

## Autor

Gabriel Demba
