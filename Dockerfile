FROM node:16.13.0
ARG GITHUB_TOKEN  
WORKDIR /app
ENV PATH /app/node_modules:$PATH
USER $user
COPY .npmrc .npmrc  
COPY package.json ./
RUN npm install
EXPOSE 3000
COPY . .
CMD ["npm", "run", "dev"]
