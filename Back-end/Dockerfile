FROM php:8.2-cli

# Installer dépendances système
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    mariadb-client \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copier le projet
WORKDIR /var/www/html
COPY . .

# Installer les dépendances Laravel
RUN composer install --no-dev --optimize-autoloader

# Générer clé si manquant
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=${PORT}
