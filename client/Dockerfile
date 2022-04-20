FROM node:12.18.3

#Install serve
RUN npm install -g serve

# Expose the listening port of your app
EXPOSE 3000

# Bundle APP files
WORKDIR /app
COPY . .

RUN npm install

#Ejecutar servidor
CMD ["npm", "start"]
