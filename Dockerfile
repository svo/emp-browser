FROM jmferrer/apache2-reverse-proxy
MAINTAINER Sean Van Osselaer <svo@qual.is>

RUN rm -rf /var/www/html

COPY ./build /var/www/html
COPY ./virtualhost /etc/apache2/sites-enabled/emp.conf

EXPOSE 80
