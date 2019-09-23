FROM node:10.16.0
WORKDIR /app
COPY public public
COPY src src
COPY package-lock.json package.json ./
ENTRYPOINT ["/usr/local/bin/npm"]
CMD ["start"]
EXPOSE 3000
