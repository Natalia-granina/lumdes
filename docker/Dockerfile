FROM nginx:alpine

COPY src/pages /usr/share/nginx/html/
COPY src/assets /usr/share/nginx/html/assets

COPY config/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
