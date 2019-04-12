FROM node:10.15.3-alpine as builder
COPY . /shuzhinetfrontend
WORKDIR /shuzhinetfrontend
RUN npm install -g yarn && yarn && yarn build

FROM nginx:1.15.11-alpine
COPY --from=builder /shuzhinetfrontend/dist/ /usr/share/nginx/html/
COPY config.conf /etc/nginx/conf.d/default.conf
CMD ["nginx","-g daemon off;"]
EXPOSE 80
