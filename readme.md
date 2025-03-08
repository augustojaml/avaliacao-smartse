# 🎯 Leilão Online - Desafio Técnico

Bem-vindo ao **Leilão Online**, um mini sistema de leilão em tempo real desenvolvido como parte de um teste técnico. O objetivo é permitir que os usuários participem de leilões de forma dinâmica, transparente e segura. Administradores podem criar e gerenciar leilões, enquanto participantes disputam produtos através de lances em tempo real! 🚀🔥

## 🖥️ Demonstração

### 🔐 Login e Acesso

![Tela de Login](1-signin.png)

### ⚡ Leilão em Tempo Real

![Tela de Leilão](2-leilao.png)

### 📋 Detalhes do Leilão

![Tela de Detalhes](3-detalhe.png)

### 🎛️ Painel Administrativo

![Painel Administrativo](5-admin.png)

### ➕ Cadastro de Leilão

![Tela de Cadastro de Leilão](4-admin-add.png)

### 🎥 Video Demonstrativo

[![Assista ao Vídeo](https://img.youtube.com/vi/kloEt-IPjL4/0.jpg)](https://www.youtube.com/watch?v=kloEt-IPjL4)

---

## 🛠️ Tecnologias Utilizadas

### **Frontend:**

- ⚡ **Next.js** - Framework React para SSR e SSG
- 🎨 **Tailwind CSS** - Estilização rápida e eficiente
- 🗄️ **React Query** - Gerenciamento de cache e estados assíncronos
- 📜 **React Hook Form + Zod** - Controle de formulários e validação
- 🔗 **Socket.IO Client** - Conexão WebSocket para lances em tempo real

### **Backend:**

- 🚀 **Nest.js** - Framework escalável para Node.js
- 🔄 **Socket.IO** - WebSockets para interações em tempo real
- 🛢️ **Prisma ORM** - Gerenciamento de banco de dados
- 🔑 **JWT** - Autenticação segura via tokens
- 🔒 **Bcrypt** - Hash de senhas

---

## 👤 Usuários para Testes

| ID   | Nome Completo    | CPF         | Senha  | Role  |
| ---- | ---------------- | ----------- | ------ | ----- |
| UUID | William Anderson | 12345678909 | 123456 | ADMIN |
| UUID | John Smith       | 31674099088 | 123456 | USER  |
| UUID | Emily Johnson    | 45544995028 | 123456 | USER  |
| UUID | Michael Brown    | 00045353085 | 123456 | USER  |
| UUID | Sophia Wilson    | 97558955076 | 123456 | USER  |

**Observações:**

- IDs são gerados automaticamente como UUIDs.
- CPFs fictícios, criados apenas para testes.
- Senhas criptografadas no banco de dados. Para login, utilize `123456`.

---

## 🚀 Funcionalidades

✅ **Login Seguro** via CPF e senha
✅ **Listagem de Leilões** com detalhes e contagem regressiva
✅ **Cadastro de Leilões** (Apenas Admins)
✅ **Detalhes do Leilão** com lances em tempo real
✅ **Envio de Lances** com regras específicas
✅ **Painel Administrativo** para gestão de leilões e participantes
✅ **Notificações em Tempo Real**

---

## 📦 Instalação e Execução

### 🔄 Clone o Repositório

```bash
git clone git@github.com:augustojaml/test-smartse.git
cd test-smartse
```

### ⚙️ Configuração do Backend

#### 📌 Requisitos:

- **Docker e Docker Compose instalados**

```bash
# Acesse a pasta do backend
cd back-nest

# Instale as dependências
npm install

# Copie o arquivo de variáveis de ambiente e ajuste os valores
# Ajuste os valores de DB_USER, DB_PASS e DB_NAME conforme o docker-compose.yml
cp .env.example .env

# Rodar os containers Docker
docker compose up -d

# Gerar cliente Prisma
npm run prisma generate

# Rodar migrations do Prisma
npm run prisma migrate dev

# Gerar usuários iniciais no banco de dados
npm run prisma:seed

# Executar o servidor
npm run start:dev
```

### 🎨 Configuração do Frontend

```bash
# Voltar para a pasta raiz
d cd ..

# Acesse a pasta do frontend
cd front-next

# Instale as dependências
npm install

# Copie o arquivo de variáveis de ambiente
cp .env.example .env.local

# Defina a URL da API no .env.local
# Exemplo:
# NEXT_PUBLIC_API_URL=http://192.168.1.14:3333
# NEXTAUTH_SECRET=uma_chave_segura

# Execute o projeto
npm run dev
```

---

## 🧪 Testes (Backend)

Para rodar os testes unitários no backend:

```bash
npm test
```

---
