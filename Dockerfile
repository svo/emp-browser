FROM alpine
MAINTAINER Sean Van Osselaer <svo@qual.is>

RUN apk update && apk upgrade \
    && apk add bash \
    && apk add apache2 apache2-proxy \
    && sed -i 's/^LoadModule proxy_fdpass_module/#LoadModule proxy_fdpass_module/' /etc/apache2/conf.d/proxy.conf \
    && sed -i 's/^#LoadModule slotmem_shm_module/LoadModule slotmem_shm_module/' /etc/apache2/httpd.conf \
    && sed -i 's/^#ServerName.*/ServerName localhost/' /etc/apache2/httpd.conf

RUN rm -rf /var/www/localhost/htdocs \
    && mkdir -p /run/apache2

COPY ./build /var/www/localhost/htdocs
COPY ./virtualhost /etc/apache2/conf.d/emp.conf

CMD httpd -D FOREGROUND

EXPOSE 80
