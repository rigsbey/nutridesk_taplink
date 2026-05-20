# Валерия — taplink-лендинг

Мобильная визитка нутрициолога: запросы → обо мне → форматы → запись.

## Запуск

```bash
cd /Users/kamil/PycharmProjects/nutridesk_taplink
python3 -m http.server 8765
```

http://localhost:8765

## Шрифты

- **Montserrat** — текст (Google Fonts)
- **Kudryashev Display** — заголовки → `fonts/KudryashevDisplay-Regular.woff2`
- **Sloop Script** — подписи → `fonts/SloopScript-Regular.woff2`

## Настройка

`config.js` — ссылки и пути к фото (`portrait`, `lifestyle`, `food`, `detail`, `flowers`, `footer`).

## Ветки

| Ветка | Описание |
|-------|----------|
| `master` | Актуальный бежевый editorial |
| `v1-original-no-photos` | Снимок после подстановки портрета (hero), до крупного редизайна |
