# FROM node:20-alpine AS development-dependencies-env
# COPY . /app
# WORKDIR /app
# RUN npm ci

# FROM node:20-alpine AS production-dependencies-env
# COPY ./package.json package-lock.json /app/
# WORKDIR /app
# RUN npm ci --omit=dev

# FROM node:20-alpine AS build-env
# COPY . /app/
# COPY --from=development-dependencies-env /app/node_modules /app/node_modules
# WORKDIR /app
# RUN npm run build

# FROM node:20-alpine
# COPY ./package.json package-lock.json /app/
# COPY --from=production-dependencies-env /app/node_modules /app/node_modules
# COPY --from=build-env /app/build /app/build
# WORKDIR /app
# CMD ["npm", "run", "start"]

FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm install --force

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm install --force --omit=dev

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
ARG VITE_ERP_URL
ENV VITE_ERP_URL=$VITE_ERP_URL
RUN npm run build

FROM node:20-alpine
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app

# Set environment variable
ARG VITE_ERP_URL
ENV VITE_ERP_URL=$VITE_ERP_URL

# Expose port 5173
EXPOSE 3000

CMD ["npm", "run", "start"]