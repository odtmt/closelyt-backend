# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Enable production environment early
ENV NODE_ENV=production

# Copy package files first (for caching)
COPY package*.json ./

# Install ONLY production dependencies first (faster + safer)
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Build NestJS app
RUN npm run build

# Ensure Render port compatibility
EXPOSE 3000

# Start production server
CMD ["node", "dist/main"]