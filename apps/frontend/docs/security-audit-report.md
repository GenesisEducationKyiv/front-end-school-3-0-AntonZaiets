# Security Audit Report: Frontend Dependencies

## Загальні дані

- Усього залежностей: **437**
- Продакшн залежності: **127**
- Dev-залежності: **282**
- Optional: **47**
- Peer: **4**

---

## 1. Аудит вразливостей

Після виконання `npm audit` (після оновлення залежностей):

- Info: **0**
- Low: **0**
- Moderate: **0**
- High: **0**
- Critical: **0**
- **Усі вразливості усунено.**

> ⚙️ Оновлено такі ключові пакети:
> - `vite` → безпечна версія `>=4.5.14`
> - `esbuild` → безпечна версія `>=0.24.3`
> - `brace-expansion` → застосовано через `overrides` у `package.json`

---

## 2. Перевірка на Zero-Day вразливості

Проведено ручну перевірку через сторонні сервіси для оцінки пакетів:

### Інструменти:

- [Snyk Advisor](https://security.snyk.io)
- [Socket.dev](https://socket.dev)
- [OSV.dev](https://osv.dev/list)
- [npms.io](https://npms.io)

### Результат:

Жодна з наявних залежностей не має **відомих або підозрюваних zero-day** вразливостей на момент перевірки (`13-06-2025`).

---

## 3. Пропозиція заміни одного з пакетів

### Поточний пакет: `axios`

- Популярна бібліотека для HTTP-запитів.
- Має вразливості в історії, наприклад: [Security Vulnerability](https://github.com/axios/axios/issues/6545)
- Великий обʼєм, має багато залежностей.

### Альтернатива: [`ky`](https://github.com/sindresorhus/ky)

#### Переваги:

- Базується на `fetch` (вбудований API)
- Мінімалістична (менше залежностей)
- Повна підтримка TypeScript
- Регулярні оновлення
- Жодних відомих CVE

#### Перевірка безпеки:

| Інструмент | Результат |
|-----------|-----------|
| Snyk | Без вразливостей |
| Socket | 0 suspicious code |
| OSV.dev | Nothing found |
| GitHub | Немає Security Advisories |

### Інструкція для заміни `axios` на `ky`

#### 1. Встановити:

```bash
npm uninstall axios
npm install ky
```

#### 2. Замінити імпорти:

```ts
// Було:
import axios from 'axios';

// Стало:
import ky from 'ky';
```

#### 3. Приклад використання:

```ts
// Axios:
const data = await axios.get('/api/tracks');

// Ky:
const data = await ky.get('/api/tracks').json();
```

#### 4. Обробка помилок:

```ts
try {
  const json = await ky.get('/api/tracks').json();
} catch (error) {
  if (error.response?.status === 404) {
    console.log('Not found');
  }
}
```

---


