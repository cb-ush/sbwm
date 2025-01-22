# Dockerfile

# Use an official Node runtime as a parent image
FROM node:23.1-alpine3.19

# Set environment variable to suppress warnings
ENV NODE_OPTIONS=--no-warnings

# Install necessary build tools for native modules
RUN apk add --no-cache make g++ python3

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Copy app source
COPY . .

# Install dependencies
RUN npm ci

# Build TypeScript code
RUN npx tsc

# Expose necessary ports if needed
#EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]