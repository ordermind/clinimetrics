FROM ubuntu:latest

WORKDIR /application

RUN apt update
RUN apt install -y git zip unzip nano sudo apache2 apache2-utils

# Generate SSL certificate

RUN openssl req -x509 -new -out /etc/ssl/certs/mycert.crt -keyout /etc/ssl/private/mycert.key -days 825 -newkey rsa:4096 -sha256 -nodes -subj "/C=../ST=...../L=..../O=..../CN=..."

# Create user

RUN useradd -rm -d /home/kristofer -s /bin/bash -g root -G sudo -u 1000 kristofer
RUN mkdir -p /home/kristofer/.ssh

# Overwrite configuration

RUN sed -i 's/APACHE_RUN_USER:=www-data/APACHE_RUN_USER:=kristofer/g' /etc/apache2/envvars
RUN sed -i 's/APACHE_RUN_GROUP:=www-data/APACHE_RUN_GROUP:=root/g' /etc/apache2/envvars
RUN sed -i 's/DocumentRoot \/var\/www\/html/DocumentRoot \/application/g' /etc/apache2/sites-available/000-default.conf
RUN sed -i 's/DocumentRoot \/var\/www\/html/DocumentRoot \/application/g' /etc/apache2/sites-available/default-ssl.conf
RUN sed -i '/SSLCertificateFile.*snakeoil\.pem/c\SSLCertificateFile \/etc\/ssl\/certs\/mycert.crt' /etc/apache2/sites-available/default-ssl.conf
RUN sed -i '/SSLCertificateKeyFile.*snakeoil\.key/cSSLCertificateKeyFile /etc/ssl/private/mycert.key\' /etc/apache2/sites-available/default-ssl.conf
RUN sed -i 's/\/var\/www/\/application/g' /etc/apache2/apache2.conf

COPY resources/apache2-conf.patch /tmp/
RUN patch < /tmp/apache2-conf.patch /etc/apache2/apache2.conf
RUN rm /tmp/apache2-conf.patch

# Enable modules

RUN a2enmod rewrite
RUN a2enmod ssl
RUN a2ensite default-ssl

RUN chown -R kristofer:users /home/kristofer/
RUN chown -R kristofer:users /application/

CMD ["apache2ctl", "-D", "FOREGROUND"]
