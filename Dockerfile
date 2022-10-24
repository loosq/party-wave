FROM node:14

EXPOSE 3000 9229

WORKDIR /home/app

COPY nginx.conf /etc/nginx/nginx.conf
COPY client.conf /etc/nginx/sites-enabled/client.conf

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm i

COPY . /usr/share/nginx/html
#COPY . /home/app

RUN npm run build
RUN npm run start