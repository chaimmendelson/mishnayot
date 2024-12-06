# Step 1: Use an official Node.js image as a base
FROM node:18-alpine AS base

# Step 2: Install dependencies and build the frontend
FROM base AS frontend-builder
WORKDIR /app/frontend
ARG REACT_APP_API_URL='/'
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
COPY frontend/package*.json ./
RUN npm install
COPY ./frontend ./
RUN npm run build

# Step 3: Install dependencies and build the backend
FROM base AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY ./backend ./
RUN npm run build

# Step 4: Create the final image for running the application
FROM node:18-alpine AS final
WORKDIR /app/backend

# Copy the built backend
COPY --from=backend-builder /app/backend ./

# Move built frontend files to the backend's 'public' directory
COPY --from=frontend-builder /app/frontend/build/ ./public/

# Expose the server's port
EXPOSE 4000

# Start the backend application
CMD ["npm", "start"]
