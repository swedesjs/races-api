import * as Params from "./Params"
import * as Response from "./Response"

export interface Merchant {
  /**
   * Получить информацию о вашем проекте
   */
  get(): Promise<Response.merchatGet>
  /**
   * Отредактировать ваш проект
   */
  edit(params?: Params.merchatEdit): Promise<Response.merchantEditResponse>
}

export interface Payment {
  /**
   * Получить историю платежей
   */
  getHistory(params: Params.paymentGetHistory): Promise<Response.paymentGetHistoryResponse>
  /**
   * Получить информацию о платеже по его ID
   */
  getHistoryByIds(params: Params.paymentGetHistoryByIds): Promise<Response.paymentGetHistoryByIdsResponse>
  /**
   * Совершить перевод другому пользователю
   */
  send(params: Params.paymentSend): Promise<Response.paymentSendResponse>
}

export interface Users {
  /**
   * Получить информацию о пользователях
   */
  get(params: Params.usersGet): Promise<Response.usersGetResponse>
}

export interface Webhooks {
  /**
   * Установить адрес вебхука, на который будут присылаться уведомления о новых платежах
   */
  create(params: Params.webhooksCreate): Promise<Response.webhooksCreateResponse>
  /**
   * Получить URL текущего вебхука
   */
  get(): Promise<Response.webhooksGetResponse>
}

export interface APIMethod {
  merchant: Merchant
  payment: Payment
  users: Users
  webhooks: Webhooks
}
