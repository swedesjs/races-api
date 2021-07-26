export interface merchatEdit {
  /**
   * Название Вашего проекта
   */
  name?: string
  /**
   * Описание Вашего проекта
   */
  description?: string
  /**
   * ID сообщества VK, которое принадлежит проекту
   */
  groupId?: number
  /**
   * Url аватара проекта, принимаются URL только от источника {@link https://imgur.com/ imgur}, и только png\jpg\jpeg форматы
   */
  avatar?: string
}

export interface paymentGetHistory {
  /**
   * Количество записей, от 1 до 100, по дефолту 100
   */
  count?: number
  /**
   * Входящие - in, исходящие - out, по дефолту - все сразу
   */
  type?: "in" | "out"
  /**
   * Сместить поиск на указанное количество записей
   */
  offset?: number
}

export interface IAPIError {
  /**
   * Описание ошибки на русском
   */
  message: string
  /**
   * Внутренний код ошибки
   */
  code: number
}

export interface paymentGetHistoryByIds {
  /**
   * Список ID платежей, информацию о которых нужно получить
   */
  ids: number | number[]
  /**
   * Входящие - in, исходящие - out, по дефолту - все сразу
   */
  type?: "in" | "out"
}

export interface paymentSend {
  /**
   * Передаваемая валюта, coin - доллары, diamonds - алмазы
   */
  field: "coin" | "diamonds"
  /**
   * Сумма перевода
   */
  id: number
  /**
   * ID человека, которому нужно передать валюту
   */
  amount: number
}

export interface usersGet {
  /**
   * ID пользователя или пользователей, информацию о которых Вы хотите получить
   */
  userIds: number | number[]
}

export interface webhooksCreate {
  /**
   * URL, на который будут присылаться уведомления. Должен иметь протокол http или https, может быть указан как домен, так и IP адрес.
   */
  url: string
}
