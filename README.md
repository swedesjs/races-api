# Установка

```console
npm install races-api
```

# Использование

```ts
import { Races } from "races-api"
const race = new Races("token")
```

> Все ниже перечисленные функции возвращают Promise

## merchant

### merchant.get

---

Получить информацию о вашем проекте

```ts
race.merchant.get()
```

[Пример ответа](./src/api/Response.ts#L1)

### merchat.edit

---

Отредактировать ваш проект

```ts
race.merchant.edit({
  name: "swedesjs",
  description: "Project description",
  groupId: 1,
  avatar: "https://imgur.com/letter.png"
})
```

| Опция        | Тип    | Описание                                                                                                            |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------- |
| name?        | string | Название Вашего проекта                                                                                             |
| description? | string | Описание Вашего проекта                                                                                             |
| groupId?     | number | ID сообщества VK, которое принадлежит проекту                                                                       |
| avatar?      | string | URL аватара проекта, принимаются URL только от источника [imgur](https://imgur.com/), и только png\jpg\jpeg форматы |

[Пример ответа](./src/api/Response.ts#L44)

## payment

### payment.getHistory

---

Получить историю переводов

```ts
race.payment.getHistory({
  count: 5,
  type: "out",
  offset: 5
})
```

| Опция   | Тип           | Описание                                               |
| ------- | ------------- | ------------------------------------------------------ |
| count?  | number        | Количество записей, от 1 до 100, по дефолту 100        |
| type?   | "in" \| "out" | Входящие - in, исходящие - out, по дефолту - все сразу |
| offset? | number        | Сместить поиск на указанное количество записей         |

[Пример ответа](./src/api/Response.ts#L46)

### payment.getHistoryByIds

---

Получить информацию о платеже по его ID

```ts
race.payment.getHistoryByIds({
  ids: [1, 3],
  type: "in"
})
```

| Опция | Тип                | Описание                                                |
| ----- | ------------------ | ------------------------------------------------------- |
| ids   | number \| number[] | Список ID платежей, информацию о которых нужно получить |
| type: | "in" \| "out"      | Входящие - in, исходящие - out, по дефолту - все сразу  |

[Пример ответа](./src/api/Response.ts#L81)

### payment.send

---

Совершить перевод другому пользователю

```ts
race.payment.send({
  field: "coin",
  id: 1,
  amount: 1000
})
```

| Опция  | Тип                  | Описание                                               |
| ------ | -------------------- | ------------------------------------------------------ |
| field  | "coin" \| "diamonds" | Передаваемая валюта, coin - доллары, diamonds - алмазы |
| id     | number               | ID человека, которому нужно передать валюту            |
| amount | number               | Сумма перевода                                         |

[Пример ответа](./src/Response.ts#L83)

## users

### users.get

---

Получить информацию о пользователе

```ts
race.users.get({
  userIds: 1
})
```

| Опция    | Тип                | Описание                                                                   |
| -------- | ------------------ | -------------------------------------------------------------------------- |
| userIds? | number \| number[] | ID пользователя или пользователей, информацию о которых Вы хотите получить |

[Пример ответа](./src/api/Response.ts#L94)

## webhooks

### webhooks.create

---

Установить адрес вебхука, на который будут присылаться уведомления о новых платежах

```ts
race.webhooks.create({
  url: "https://vk.com"
})
```

| Опция | Тип    | Описание                                                                                                                          |
| ----- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| url   | string | URL, на который будут присылаться уведомления. Должен иметь протокол http или https, может быть указан как домен, так и IP адрес. |

[Пример ответа](./src/api/Response.ts#L130)

</details>

### webhooks.get

---

Получить URL текущего вебхука

```ts
race.webhooks.get()
```

[Пример ответа](./src/api/Response.ts#L141)

# startPollingPayment

Получать входящие платежи

[Описание параметров](./src/index.ts#42)

```ts
race.startPollingPayment(ctx => {
  console.log(ctx)
}, "https://ngrok.io")
```

[Тип параметров функции](./src/api/Response.ts#L148)

# getLink

Получить ссылку на проект

```ts
race.getLink()
```

> Если нашли ошибку напишите [мне](https://t.me/swedesjs)
