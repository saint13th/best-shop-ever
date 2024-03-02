# Base image
FROM node:20.11.1-alpine3.19

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

ENV PORT=3000
ENV NODE_ENV=Production

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD ["npm", "run", "start:prod"]
