#!/bin/bash

WORDPRESS_PATH="/var/www/html"
COMMAND="sudo -u www-data wp --path=${WORDPRESS_PATH}"
WORDPRESS_URL=$(php -r "echo preg_replace('#^http?://|\"|\'#', '', rtrim('${WORDPRESS_URL}','/'));")

# Wait for WordPress to be ready with 200 OK
until curl -s -o /dev/null -w "%{http_code}" http://localhost/wp-admin/install.php | grep -E "^(200|301|302)$" > /dev/null; do
  echo "Waiting for WordPress to be ready..."
  sleep 5
done

if [ ! "$(${COMMAND} core is-installed)" ]; then
  echo "Generating a default user."
  ${COMMAND} --admin_user="${WORDPRESS_ADMIN_USERNAME}" --admin_password="${WORDPRESS_ADMIN_PASSWORD}" --admin_email="${WORDPRESS_ADMIN_EMAIL}" --title="${WORDPRESS_TITLE}" --url="${WORDPRESS_URL}" core install
fi

${COMMAND} plugin update-all

if ! ${COMMAND} plugin is-installed wp-graphql --allow-root; then
  echo "WPGraphQL not installed. Installing..."
  ${COMMAND} plugin install wp-graphql --activate --allow-root
else
  echo "WPGraphQL already installed. Checking for updates..."
  ${COMMAND} plugin update wp-graphql --allow-root
fi
