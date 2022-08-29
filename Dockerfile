FROM node:16-alpine
WORKDIR /opt/app
ADD package.json  package.json
RUN npm install --force
ADD . .
ENV NODE_ENV production
RUN npm run build
RUN npm prune --force --production
CMD ["npm", "start"]
EXPOSE 3000