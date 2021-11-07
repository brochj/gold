FROM node:16
# Create app directory
WORKDIR /usr/app
COPY package*.json ./
RUN npm install -g npm@8.1.3
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
EXPOSE 3333
ENTRYPOINT [ "npm", "run", "dev" ]