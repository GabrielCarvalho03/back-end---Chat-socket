# 💬 Chat App

Bem-vindo ao Chat App, uma aplicação de chat em tempo real construída com Node.js, MongoDB e Socket.io.

## Pré-requisitos

Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina antes de começar.

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Configuração 🛠️

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2. **Instale as dependências:**

    ```bash
    cd seu-repositorio
    npm install
    ```

3. **Configure as variáveis de ambiente.** Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

    ```env
    MONGODB_URI=sua_url_do_mongo
    PORT=3000
    ```

    Substitua `sua_url_do_mongo` pela URL do seu banco de dados MongoDB.

4. **Inicie o servidor:**

    ```bash
    npm start
    ```

    O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).

## Funcionalidades 🚀

- **Chat em Tempo Real:** 🕒 Conversa em tempo real com outros usuários.
- **Armazenamento no MongoDB:** 💾 Mensagens são armazenadas no MongoDB para persistência.
- **Socket.io:** 🌐 Comunicação em tempo real habilitada por meio do Socket.io.

## Contribuição 🤝

Sinta-se à vontade para contribuir. Abra problemas ou envie pull requests.
