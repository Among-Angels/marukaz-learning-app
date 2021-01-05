FROM brockreece/lerna-builder AS build

ENV NODE_ENV production
ENV PORT 3000
ENV INLINE_RUNTIME_CHUNK false

WORKDIR /app

COPY package.json /app
COPY packages /app/packages

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
COPY lerna.json /app
RUN lerna bootstrap --hoist
RUN lerna run build

FROM pierrickb/lerna-alpine

ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
COPY package.json .
COPY packages/server/package.json packages/server/
COPY packages/client/package.json packages/client/
COPY lerna.json /app
RUN lerna bootstrap --hoist -- --production --cache /tmp/empty-cache && rm -rf /tmp/empty-cache
COPY --from=build /app/packages/dist /app/packages/dist


EXPOSE 3000

CMD ["npm", "start"]

