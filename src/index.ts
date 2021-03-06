import fetch from "node-fetch"
import fastify from "fastify"
import crypto from "crypto"
import { webhooksHandler, APIMethod } from "./api"
import { APIError } from "./APIError"
import { Response } from "./types"

const MethodName = ["merchant", "payment", "users", "webhooks"]

export class Races {
  /**
   * @param token Для отправки любого запроса Вам понадобится access_token, его можно получить в разделе «{@link https://vk.com/app7679912 Прочее}», нажав на клавишу «{@link https://vk.com/app7679912 API}».
   */
  constructor(private token: string) {
    for (const method of MethodName) {
      this[method] = new Proxy(Object.create(null), {
        get:
          (_, props: string) =>
          async (params = {}) => {
            const body = JSON.stringify({
              access_token: this.token,
              ...params
            })
            const response: Response = await fetch(`https://race.danyarub.ru/api/${method}.${props}`, {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body
            })

            const result = await response.json()
            if (result.error) throw new APIError(result.error)
            return result.response
          }
      })
    }
  }

  /**
   * Получить входящие платежи
   * @param handler Callback функция
   * @param url Свой URL (по желанию)
   */
  startPollingPayment(handler: webhooksHandler, url?: string) {
    return new Promise(resolve => {
      const server = fastify()
      server.post("/", (req, res) => {
        res.status(200).send("OK")
        const { userId, field, amount, id, sig } = req.body as Parameters<webhooksHandler>[0]
        if (
          crypto
            .createHash("md5")
            .update(this.token + amount + userId + id)
            .digest("hex") === sig
        )
          handler({ userId, field, amount, id, sig })
      })
      server.listen(3000, (err, urls) => {
        if (err) {
          resolve(0)
          throw err
        }
        this.webhooks.create({ url: url || urls })
      })
    })
  }
  /**
   * Получить ссылку на ваш проект
   */
  async getLink() {
    return "https://vk.com/app7679912#pay=-" + (await this.merchant.get()).id
  }
}

export interface Races extends APIMethod {}
