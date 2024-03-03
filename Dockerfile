# Use a imagem oficial do Node.js como base
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/app

# Copie os arquivos do projeto para o contêiner
COPY . .

# Instale as dependências do projeto
RUN npm install

# Exponha a porta que a aplicação está ouvindo
EXPOSE 3001

# Comando a ser executado quando o contêiner for iniciado
CMD ["npm", "run", "dev"]
