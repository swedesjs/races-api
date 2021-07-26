import fetch from "node-fetch"
import fastify from "fastify"
import md5 from "md5"
import { webhooksHandler, APIMethod } from "./api"
import { APIError } from "./APIError"
import { Response } from "./types"

const MethodName = ["merchant", "payment", "users", "webhooks"]

export class Races {
  /**
   * @param token Для отправки любого запроса Вам понадобится access_token, его можно получить в разделе «{@link https://vk.com/app7679912 Прочее}», нажав на клавишу «{@link https://vk.com/app7679912 API}».
   */
  constructor(public token: string) {
    for (const method of MethodName) {
      this[method] = new Proxy(Object.create(null), {
        get:
          (_, props: string) =>
          async (params = {}) => {
            const body = JSON.stringify({
              access_token: this.token,
              ...params
            })
            let response: Response = await fetch(`https://race.danyarub.ru/api/${method}.${props}`, {
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
   */
  async startPollingPayment(handler: webhooksHandler) {
    return new Promise(resolve => {
      const server = fastify()
      server.post("/", req => {
        const { userId, fieId, amount, id, sig } = req.body as Parameters<webhooksHandler>[0]
        if (md5(this.token + amount + userId + id) === sig) handler({ userId, fieId, amount, id, sig })
      })
      server.listen(3000, async (err, url) => {
        if (err) {
          resolve(0)
          throw err
        }
        this.webhooks.create({ url })
      })
    })
  }
}

export interface Races extends APIMethod {}