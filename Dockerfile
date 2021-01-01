FROM node:14 AS build

ENV NODE_ENV production
ENV PORT 3000
ENV INLINE_RUNTIME_CHUNK false

WORKDIR /app

COPY package.json /app
RUN npm install -g lerna
COPY packages/server /app/packages/server
COPY packages/client /app/packages/client

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
COPY lerna.json /app
RUN lerna bootstrap --hoist
RUN lerna run build

FROM node:14-slim

WORKDIR /app
COPY package.json /app
COPY --from=build /app/packages/server/dist /app/packages/server/dist
COPY --from=build /app/packages/server/package.json /app/packages/server/
RUN cd /app/packages/server && npm install --production
COPY --from=build /app/packages/client/build /app/packages/client/build
COPY --from=build /app/packages/client/package.json /app/packages/client/
RUN cd /app/packages/client && npm install --production

EXPOSE 3000

CMD ["npm", "start"]

