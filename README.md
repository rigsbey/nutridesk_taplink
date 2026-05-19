# nutridesk_taplink

Одностраничный мини-лендинг в стиле Taplink для нутрициолога. Статический HTML/CSS, без сборки.

## Локальный просмотр

```bash
cd /Users/kamil/PycharmProjects/nutridesk_taplink
python3 -m http.server 8765
```

Откройте http://localhost:8765

## Настройка

1. Имя и ссылки — в `config.js` (`name`, `bookingUrl`, `contactUrl`).
2. Тексты и имя в разметке — в `index.html` при необходимости.
3. Цвета и шрифты — в `styles.css` (`:root`).

## Деплой

- **Vercel / Netlify**: корень проекта, без build command.
- **GitHub Pages**: включите Pages для репозитория, папка `/` (root).
- **Taplink**: можно вставить ссылку на этот сайт как основную кнопку «Сайт».

## Структура

| Файл        | Назначение              |
|-------------|-------------------------|
| `index.html`| Разметка блоков         |
| `styles.css`| Стили (milk, sage)      |
| `config.js` | Имя и ссылки            |
