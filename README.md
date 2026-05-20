# Валерия — taplink-лендинг

Мобильная визитка нутрициолога: запросы → обо мне → форматы → запись.

## Запуск

Порт **8771** — чтобы не пересекаться с другим проектом на `8765` (`http://127.0.0.1:8765/len/`).

```bash
cd "/Users/vam_svetlo/nutridesk_taplink_master/nutridesk_taplink-master"
./serve.sh
```

Или вручную:

```bash
python3 -m http.server 8771 --directory .
```

Открыть: **http://127.0.0.1:8771/index.html**

Другой порт: `PORT=8780 ./serve.sh`

## Шрифты

- **Montserrat** — текст (Google Fonts)
- **Kudryashev Display** — заголовки → `fonts/KudryashevDisplay-Regular.woff2`
- **Sloop Script** — подписи → `fonts/SloopScript-Regular.woff2`

## Настройка

`config.js` — ссылки, `waitlistTelegram` (username для формы курса), пути к фото.

**Лист ожидания:** кнопка открывает форму → «Отправить в Telegram» → чат `@vam_svetlo` с готовым текстом заявки (нужно нажать «Отправить» в Telegram).

## Ветки

| Ветка | Описание |
|-------|----------|
| `main` | Актуальный бежевый editorial |
| `master` | Прежняя основная ветка на GitHub |
| `v1-original-no-photos` | Снимок после подстановки портрета (hero), до крупного редизайна |
