import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'

const handleDuplicateKeyError = (error: mongoose.Error) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: '',
      message: error?.message,
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: error.message,
    errorMessages: errors,
  }
}

export default handleDuplicateKeyError
