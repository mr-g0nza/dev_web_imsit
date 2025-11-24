# Используем официальный образ Node.js
FROM node:20

# Устанавливаем рабочую директорию в контейнере
WORKDIR /usr/src/app

# Копируем файлы package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости проекта
RUN npm install

# Копируем остальной код проекта в рабочую директорию
COPY . .

# Собираем приложение для production
RUN npm run build

# Указываем порт, который будет открыт
EXPOSE 9002
EXPOSE 4000

# Команда для запуска приложения
CMD ["npm", "start"]
