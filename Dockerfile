FROM node:16.13.0
ARG GITHUB_TOKEN  
WORKDIR /app
ENV PATH /app/node_modules:$PATH
USER $user
COPY .npmrc .npmrc  
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc
COPY package.json ./
RUN npm install
EXPOSE 3333
COPY . .
CMD ["npm", "run", "dev", "--", "--host"]
