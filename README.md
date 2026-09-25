# Task API

API REST desenvolvida para estudos de desenvolvimento backend.

O projeto está sendo construído do zero com foco em aprender na prática conceitos de APIs REST, desenvolvimento backend, banco de dados, validação e organização de código.

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Zod

## Funcionalidades

Atualmente a API possui um CRUD completo de usuários:

- Criar usuário
- Listar usuários
- Buscar usuário por ID
- Atualizar usuário
- Deletar usuário
- Validação dos dados com Zod
- Validação dos parâmetros da URL
- Tratamento de erros
- Persistência de dados com PostgreSQL

## Endpoints

### Usuários

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/users` | Criar usuário |
| GET | `/users` | Listar usuários |
| GET | `/users/:id` | Buscar usuário por ID |
| PUT | `/users/:id` | Atualizar usuário |
| DELETE | `/users/:id` | Deletar usuário |

## Estrutura do projeto

```text
src/
├── controllers/
│   └── user-controller.ts
├── generated/
│   └── prisma/
├── lib/
│   └── prisma.ts
├── routes/
│   └── user-routes.ts
├── validators/
│   └── user-validator.ts
└── server.ts