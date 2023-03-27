
import { CustomError, ValidationError } from './errors';


const { origin } = window.location;

export const BASE_URL = origin.startsWith('https') ? origin : 'http://159.223.19.19:30082';

const cancel = {};

export const request = async ({
  url,
  params = {},
  body = {},
  method = 'get',
  contentType = 'application/json',
  shouldCancel = false,
  ...rest
}) => {
  try {

    const response = await request({
      url,
      undefined,
      data: body instanceof FormData ? body : JSON.stringify(body),

      method,
      params,
      headers: {
        'Content-Type': contentType,
      },
      ...rest,
    });

    return response.data;
  } catch (err) {
    switch (err?.response?.status) {
      case 500:
        throw new CustomError({ message: 'Internal server error' });
      case 401:
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/unauthorized`;
        break;
      case 400:
        throw new ValidationError({
          message: 'Validation error',
          props: err?.response?.data?.detail,
        });
      case 403:
        window.location.href = process.env.REACT_APP_AUTH_URL;
        break;
      default:
        throw new CustomError({ message: err.message });
    }
  }
};
