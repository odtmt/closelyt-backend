# Use official Node.js image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build NestJS project
RUN npm run build

# Render will provide PORT automatically
ENV NODE_ENV=production

# Expose application port
EXPOSE 3000

# Start application
CMD ["npm", "run", "start:prod"]