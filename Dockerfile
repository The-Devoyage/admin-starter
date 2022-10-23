FROM node:16.13.0
WORKDIR /app
ENV PATH /app/node_modules:$PATH
USER $user
COPY .npmrc .npmrc  
COPY package.json ./
RUN npm install
EXPOSE 3333
COPY . .
CMD ["npm", "run", "dev", "--", "--host"]
