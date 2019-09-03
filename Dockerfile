FROM datica/node-js-example:latest


# Создать директорию app
WORKDIR /node-js

# Установить зависимости приложения
# Используется символ подстановки для копирования как package.json, так и package-lock.json,
# работает с npm@5+
COPY package*.json ./

RUN npm install
# Используется при сборке кода в продакшене
# RUN npm install --only=production

# Скопировать исходники приложения
COPY . /node-js

CMD ["node", "index.js" ]