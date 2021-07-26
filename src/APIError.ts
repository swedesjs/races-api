import { IAPIError } from "./api"

export class APIError extends Error {
  constructor(options: IAPIError) {
    const messages = `Code №${options.code} - ${options.message}`
    super(messages)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
