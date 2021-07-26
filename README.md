# Установка

```console
npm install races-api
```

# Использование

```ts
import { Races } from "races-api"
const race = new Races("token")
```

## merchant

### merchant.get

---

Получить информацию о вашем проекте

```ts
const result = await race.merchant.get()
```

<details markdown='1'><summary>Пример ответа</summary>

```ts
export interface merchatGet {
  /**
   * ID создателя проекта
   */
  ownerVkid: number
  /**
   * Количество алмазов на балансе
   */
  diamonds: number
  /**
   * Количество долларов на балансе
   */
  coin: number
  /**
   * Имя
   */
  name: string
  /**
   * Описание проекта
   */
  description: string
  /**
   * URL аватара проекта
   */
  avatar: string
  /**
   * ID привязанного сообщества
   */
  groupId: number
  /**
   * Логический признак того допущен ли проект в каталог
   */
  isAllowed: boolean
  /**
   *  URL, на который поступают уведомления о платежах
   */
  webhookUrl: string
  /**
   * ID проекта, нужен для генерации ссылки на перевод
   */
  id: number
}
```

</details>

### merchat.edit

---

Отредактировать ваш проект

```ts
const result = await race.merchant.edit(options)
```

| Опция        | Тип    |
| ------------ | ------ |
| name?        | string |
| description? | string |
| groupId?     | number |
| avatar?      | string |

<details markdown='1'><summary>Пример ответа</summary>

```ts
export interface merchantEdit extends merchatGet {}
```

</details>

## payment

### payment.getHistory

---

Получить историю переводов

```ts
const result = await race.payment.getHistory(options)
```

| Опция   | Тип           |
| ------- | ------------- |
| count?  | number        |
| type?   | "in" \| "out" |
| offset? | number        |

<details markdown='1'><summary>Пример ответа</summary>

```ts
export interface paymentGetHistory {
  /**
   * Длина items
   */
  count: number
  items:
    | {
        /**
         * ID платежа
         */
        id: number
        /**
         * ID отправляющего, ваш ID будет отрицательным
         */
        formId: number
        /**
         * ID принимающего, ваш ID будет отрицательным
         */
        toId: number
        /**
         * Сумма перевода
         */
        amount: number
        /**
         * Валюта coin - доллары, diamonds - алмазы
         */
        fieId: "coin" | "diamonds"
        /**
         * UnixTime платежа
         */
        date: string
      }[]
    | []
}
```

</details>

### payment.getHistoryByIds

---

Получить информацию о платеже по его ID

```ts
const result = await race.payment.getHistoryByIds(options)
```

| Опция | Тип                |
| ----- | ------------------ |
| ids   | number \| number[] |
| type: | "in" \| "out"      |

<details markdown='1'><summary>Пример ответа</summary>

```ts
export interface paymentGetHistoryByIds extends paymentGetHistory {}
```

</details>

### payment.send

---

Совершить перевод другому пользователю

```ts
const result = await race.payment.send(options)
```

| Опция  | Тип                  |
| ------ | -------------------- |
| field  | "coin" \| "diamonds" |
| id     | number               |
| amount | number               |

<details markdown='1'><summary>Пример ответа</summary>

```ts
export interface paymentSend {
  /**
   * Логический признак того, выполнился ли платеж успешно
   */
  result: boolean
  /**
   * ID человека, которому вы передали валюту
   */
  userId: number
}
```

</details>

## users

### users.get

---

Получить информацию о пользователе

```ts
const result = await race.users.get(options)
```

| Опция    | Тип                |
| -------- | ------------------ |
| userIds? | number \| number[] |

<details markdown='1'><summary>Пример ответа</summary>

```ts
export interface usersGet {
  /**
   * Длина items
   */
  count: number
  items:
    | {
        /**
         * Количество долларов у пользователя
         */
        coin: number
        /**
         * Количество алмазов у пользователя
         */
        diamonds: number
        /**
         * Уровень пользователя
         */
        lvl: number
        /**
         * Опыт пользователя
         */
        xp: number
        /**
         * ID VK пользователя
         */
        vkid: number
        /**
         * ID VK пользователя, который пригласил текущего пользователя в игру
         * Если referalVkid = 0, то у пользователя не указан реферальный код
         */
        referalVkid: number
      }[]
    | []
}
```

</details>

## webhooks

### webhooks.create

---

Установить адрес вебхука, на который будут присылаться уведомления о новых платежах

```ts
const result = await race.webhooks.create(options)
```

| Опция | Тип    |
| ----- | ------ |
| url?  | string |
| port? | number |

<details markdown='1'><summary>Пример ответа</summary>

```ts
export interface webhooksCreate {
  /**
   * Логический признак того, была ли привязка вебхука
   */
  result: boolean
  /**
   * Новый URL вебхука
   */
  url: string
}
```

</details>

### webhooks.get

---

Получить URL текущего вебхука

```ts
const result = await race.webhooks.get()
```

<details markdown='1'><summary>Пример ответа</summary>

```ts
export interface webhooksGet {
  /**
   * URL вашего вебхука
   */
  webhookUrl: string
}
```

</details>

# startPollingPayment

Получать входящие платежи

```ts
race.startPollingPayment(ctx => {
  console.log(ctx)
})
```

<details markdown='1'><summary>Тип параметров функции</summary>

```ts
export type webhooksHandler = (callack: {
  /**
   * ID VK переводящего пользователя
   */
  userId: number
  /**
   * Валюта перевода, coin - доллары, diamonds - алмазы
   */
  fieId: "coin" | "diamonds"
  /**
   * Сумма перевода
   */
  amount: number
  /**
   * ID перевода
   */
  id: number
  /**
   * Подпись MD5-хешем (token + amount + userId + id)
   */
  sig: string
}) => void
```

</details>

> Если нашли ошибку напишите [мне](https://t.me/swedesjs)
