FROM node:latest

RUN npm i pkg

ENTRYPOINT [ "/etc/bin/pkg" ]
