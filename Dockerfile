FROM node:alpine AS build
RUN apk add --update --no-cache \
  python \
  make \
  g++
COPY . /src
WORKDIR /src
RUN yarn install
RUN yarn run build


FROM node:alpine
EXPOSE 4000
WORKDIR /server
COPY --from=build /src/node_modules node_modules
COPY --from=build /src/dist dist
USER node
CMD ["node", "./dist/index.js"]