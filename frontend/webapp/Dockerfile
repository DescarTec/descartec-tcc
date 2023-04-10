# Escolha uma imagem base do Node.js
FROM node:16-alpine

# Crie um diretório de trabalho para o aplicativo
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do aplicativo para o diretório de trabalho
COPY . .

# Compila o aplicativo Angular com o Angular CLI
RUN npm run build

# Exponha a porta do aplicativo
EXPOSE 5006

# Inicie o aplicativo com o servidor web do Node.js
CMD ["npm", "run", "serve"]