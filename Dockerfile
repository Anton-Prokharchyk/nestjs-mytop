FROM node:22.14-alpine
WORKDIR /opt/nestjs-mytop
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "dist/main.js"]