FROM node:alpine

#Install serve
RUN npm install -g serve

# Expose the listening port of your app
EXPOSE 3010

# Bundle APP files
WORKDIR /app
COPY . .

RUN npm install

#Ejecutar servidor
CMD ["npm", "start"]
