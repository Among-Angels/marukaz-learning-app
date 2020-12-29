FROM registry.access.redhat.com/ubi8/ubi

ENV NODE_ENV production
ENV PORT 3000
ENV INLINE_RUNTIME_CHUNK false

RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash -
RUN yum install -y nodejs
RUN npm i lerna -g

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install --only=prod
COPY packages/server /app/packages/server
COPY packages/client /app/packages/client

COPY lerna.json /app
RUN lerna run build



EXPOSE 3000

CMD ["npm", "start"]

