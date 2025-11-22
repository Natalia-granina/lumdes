# Taurim Design - Frontend

Премиальный дизайн интерьеров. Статический фронтенд на HTML/CSS/JS.

## Структура проекта

```
src/
├── pages/          # HTML страницы
├── assets/
│   ├── css/        # Стили
│   ├── js/         # JavaScript
│   └── images/     # Изображения
config/             # Конфигурационные файлы
docker/             # Docker конфигурация
public/             # Статические файлы
```

## Docker

### Сборка и запуск

```bash
docker-compose up --build
```

Сайт будет доступен на `http://localhost`

### Остановка

```bash
docker-compose down
```
