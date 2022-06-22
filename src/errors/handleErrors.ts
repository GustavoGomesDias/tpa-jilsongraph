/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
import JilsonGraphError from '@jpgErrors/JilsoGraphError';
import BadRequestErr from './BadRequestError';

export interface HttpError {
  error: string
  statusCode: number
}

const handleErrors = (err: Error): HttpError => {
  if (err instanceof BadRequestErr) {
    return {
      error: err.message,
      statusCode: err.statusCode,
    };
  }

  if (err instanceof JilsonGraphError) {
    return {
      error: err.message,
      statusCode: 400,
    };
  }

  return {
    error: 'Erro de servidor, tente novamente mais tarde.',
    statusCode: 500,
  };
};

export default handleErrors;
