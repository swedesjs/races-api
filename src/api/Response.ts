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

export interface merchantEditResponse extends merchatGet {}

export interface paymentGetHistoryResponse {
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

export interface paymentGetHistoryByIdsResponse extends paymentGetHistoryResponse {}

export interface paymentSendResponse {
  /**
   * Логический признак того, выполнился ли платеж успешно
   */
  result: boolean
  /**
   * ID человека, которому вы передали валюту
   */
  userId: number
}

export interface usersGetResponse {
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

export interface webhooksCreateResponse {
  /**
   * Логический признак того, была ли привязка вебхука
   */
  result: boolean
  /**
   * Новый URL вебхука
   */
  url: string
}

export interface webhooksGetResponse {
  /**
   * URL вашего вебхука
   */
  webhookUrl: string
}

export type webhooksHandler = (callack: {
  /**
   * ID VK переводящего пользователя
   */
  userId: number
  /**
   * Валюта перевода, coin - доллары, diamonds - алмазы
   */
  field: "coin" | "diamonds"
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
