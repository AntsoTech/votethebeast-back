import 'dotenv/config';

import { Request, Response } from 'express';

class ErrorHandler extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
const handleError = (err: ErrorHandler, req: Request, res: Response) => {
  // gèrer l'environnement PROD/DEV
  const { statusCode = 500, message } = err;
  // On affiche le message uniquement en environnement de DEV
  if (process.env.NODE_ENV === 'DEV') {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message: message,
    });
  } else {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
    });
  }
};

export { ErrorHandler, handleError };
