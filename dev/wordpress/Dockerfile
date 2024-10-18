FROM wordpress:latest

RUN apt-get update && apt-get install -y msmtp sudo curl sed less default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Install WP-CLI
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp

# Prepare setup
COPY setup.sh /usr/local/bin/setup.sh
RUN chmod +x /usr/local/bin/setup.sh

# Modify entrypoint to run setup script
RUN sed -i '/exec "\$@"/i /usr/local/bin/setup.sh &' /usr/local/bin/docker-entrypoint.sh
