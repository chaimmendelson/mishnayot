# Step 1: Use an official Node.js image as a base
FROM node:18-alpine

# Step 2: Set working directory for frontend
WORKDIR /app/frontend

# Step 3: Copy frontend package.json and install dependencies
COPY frontend/package*.json ./

RUN npm install

COPY ./frontend .

# Step 4: Build the frontend (assuming the frontend build outputs to 'frontend/build')
RUN npm run build

# Step 5: Set working directory for backend
WORKDIR /app/backend

# Step 6: Copy backend package.json and install dependencies
COPY backend/package*.json ./

RUN npm install

COPY ./backend .

# Step 7: Build the backend (assuming TypeScript build is set in backend/package.json)
RUN npm run build

# Step 8: Move the built frontend files to the 'public' directory of the backend
RUN mkdir -p /app/backend/public && cp -r /app/frontend/build/* /app/backend/public/

# Step 9: Expose the port that the server will run on
EXPOSE 3000

# Step 10: Start the backend application
CMD ["npm", "run", "start", "--prefix", "/app/backend"]
