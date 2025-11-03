# FrontEnd Dockerfile

# Use official Node.js 20 image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Build the app
RUN npm run build

# Expose backend port (adjust if not 3000)
EXPOSE 3000

# Start the backend
CMD ["npm","run", "start"]
