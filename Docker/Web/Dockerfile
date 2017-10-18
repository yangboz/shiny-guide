FROM nginx

MAINTAINER z [at] smartkit [dot] info

COPY landingPage /usr/share/nginx/html
COPY www /usr/share/nginx/html/www

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]