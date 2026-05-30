# Use Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies (INCLUDING devDependencies for build)
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build NestJS app
RUN npm run build

# Set production env
ENV NODE_ENV=production

# Render port
EXPOSE 3000

# Start app
CMD ["node", "dist/main"]