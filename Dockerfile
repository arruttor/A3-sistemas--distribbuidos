# Use uma imagem Node.js oficial
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos do projeto para o container
COPY package*.json ./
RUN npm install
COPY . .

# Porta exposta
EXPOSE 3000

# Comando para rodar o servidor
CMD ["npm", "start"]
