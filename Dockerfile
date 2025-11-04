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

#Pass environment variable for backend URL during build
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_CLOUD_NAME
ARG NEXT_PUBLIC_UPLOAD_PRESET

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_CLOUD_NAME=${NEXT_PUBLIC_CLOUD_NAME}
ENV NEXT_PUBLIC_UPLOAD_PRESET=${NEXT_PUBLIC_UPLOAD_PRESET}

# Build the app
RUN npm run build

# Expose backend port (adjust if not 3000)
EXPOSE 3000

# Start the backend
CMD ["npm","run", "start"]
