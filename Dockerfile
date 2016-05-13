FROM alpine:3.3

MAINTAINER Fusion Alliance <code@fusionalliance.com>

RUN apk add --update nginx && rm -rf /var/cache/apk/*
RUN mkdir -p /tmp/nginx/client-body

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/default.conf /etc/nginx/conf.d/defult.conf

CMD ["nginx", "-g", "daemon off;"]
