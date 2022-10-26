FROM nginx:latest

RUN rm /etc/nginx/conf.d/*

COPY teamfive-cosmobot-15-ya-praktikum.tech.crt /etc/nginx/
COPY teamfive-cosmobot-15-ya-praktikum.tech-privateKey.key /etc/nginx/
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]