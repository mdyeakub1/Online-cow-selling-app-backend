import { IGenericErrorMessage } from './error'

export type IGenericPesponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}
export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}