# Leilão Online - Desafio Técnico

Este projeto é um mini sistema de leilão online em tempo real, desenvolvido como parte de um teste de aptidão técnica.

## Tecnologias Utilizadas

### Frontend:

- **Next.js** - Framework React para SSR e SSG
- **React** - Biblioteca para construção de interfaces
- **Tailwind CSS** - Framework CSS utilitário
- **React Query** - Gerenciamento de estados assíncronos
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de dados
- **Socket.IO Client** - Comunicação em tempo real

### Backend:

- **Nest.js** - Framework Node.js para aplicações escaláveis
- **Socket.IO** - WebSockets para comunicação em tempo real
- **Prisma ORM** - Gerenciamento de banco de dados
- **JWT (JSON Web Token)** - Autenticação segura
- **Bcrypt** - Criptografia de senhas

## Funcionalidades

1. **Login**

   - Autenticação via CPF e senha
   - Redirecionamento para a página inicial

2. **Listagem de Leilões**

   - Nome do item
   - Preço inicial
   - Status do leilão (Aguardando, Aberto, Encerrado)
   - Contagem regressiva

3. **Cadastro de Leilão** (Apenas administradores)

   - Nome do item, quantidade, valor inicial, data/hora de início e fim
   - Validação via React Hook Form e Zod

4. **Detalhes do Leilão**

   - Nome do item, preço atual, lances em tempo real, tempo restante

5. **Envio de Lances**

   - Somente leilões abertos
   - Valor maior que o atual
   - Intervalo de 5 segundos entre lances do mesmo participante
   - Leilão encerra após 2 minutos sem lances

6. **Notificações em Tempo Real**

   - Atualização automática da lista de lances
   - Notificações de novos lances
   - Informação do vencedor no encerramento do leilão

## Instalação e Execução

### Clone o Repositório

```bash
git clone git@github.com:augustojaml/test-smartse.git
cd test-smartse
```

### Backend:

#### Requisitos:

- Docker e Docker Compose instalados

```bash
# Acesse a pasta do backend
cd back-nest

# Instale as dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
# Ajuste os valores de DB_USER, DB_PASS e DB_NAME conforme o docker-compose.yml

# Rodar o Docker Compose
pnpm docker:up

# Gerar o cliente Prisma
pnpm prisma generate

# Rodar migrations do Prisma
pnpm prisma migrate dev

# Gerar os usuários iniciais
pnpm prisma:seed

# Executar servidor
pnpm start:dev
```

### Frontend:

```bash
# Acesse a pasta do frontend
cd ../front-next

# Instale as dependências
pnpm install

# Criar o arquivo de variáveis de ambiente
# O IP 192.168.1.14 corresponde à máquina local onde o projeto está rodando, permitindo que outros dispositivos acessem para testes de lances.
# Crie o arquivo .env.local e adicione as seguintes informações:
# NEXT_PUBLIC_API_URL=http://192.168.1.14:3333
# NEXTAUTH_SECRET=uma_chave_segura

# Execute a aplicação
pnpm dev
```

## Usuários Seed

A tabela abaixo apresenta os usuários que serão inseridos no banco de dados pelo script de seed.

| ID     | Full Name        | CPF         | Password (hashed)                   | Role  |
| ------ | ---------------- | ----------- | ----------------------------------- | ----- |
| `UUID` | William Anderson | 12345678909 | Hashed with bcrypt (10 salt rounds) | ADMIN |
| `UUID` | John Smith       | 98765432100 | Hashed with bcrypt (10 salt rounds) | USER  |
| `UUID` | Emily Johnson    | 11122233344 | Hashed with bcrypt (10 salt rounds) | USER  |
| `UUID` | Michael Brown    | 55566677788 | Hashed with bcrypt (10 salt rounds) | USER  |
| `UUID` | Sophia Wilson    | 99988877766 | Hashed with bcrypt (10 salt rounds) | USER  |

**Observações:**

- O campo `ID` será gerado dinamicamente como um **UUID**.
- O `CPF` é válido, mas fictício.
- As senhas devem ser armazenadas de forma segura utilizando **hashing** antes de entrar em produção.

## Testes (Apenas no Backend)

Para rodar os testes unitários no backend:

```bash
pnpm test
```

## Envio do Teste

O projeto deve ser disponibilizado em um repositório público no GitHub e enviado para o email `contratacaosmartse@gmail.com` até o dia **09/03/2025, às 23h59**.
