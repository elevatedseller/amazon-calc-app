# Use official Node.js LTS image
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --production

# Copy app source
COPY . .

# Build Next.js
RUN npm run build

EXPOSE 3000

# Start the app
CMD ["npm", "start"]
