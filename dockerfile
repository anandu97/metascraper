# Specify a base image
FROM node:12.18.3-alpine AS alpine
WORKDIR /app
# Install dependencies
COPY package.json .
RUN npm install 
COPY . .
EXPOSE 3000
# Default command
CMD ["npm","start"]