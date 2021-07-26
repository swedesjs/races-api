import { IAPIError } from "../api"

export type Response = {
  json(): Promise<{
    error: IAPIError
    response: any
  }>
}
