import { toast } from 'react-toastify';
import i18n from '../../translations/i18n';

export class ValidationError extends Error {
  constructor({ message, props }) {
    super(message);
    this.props = props;
  }
}

export class AuthError extends Error {
  constructor({ message }) {
    super(message);
  }
}

export class CustomError extends Error {
  constructor({ message }) {
    super(message);
  }
}

export class CancelError extends Error {}

const ERRORS = {
  INVALID_PROJECT_ID: 'INVALID_PROJECT_ID',
  INVALID_DISCOUNT: 'INVALID_DISCOUNT',
  INVALID_PRICE: 'INVALID_PRICE',
  WARNING_INVALID_INPUT: 'WARNING_INVALID_INPUT',
  OUTCOME_BASED_MODEL_NOT_SELECTED: 'OUTCOME_BASED_MODEL_NOT_SELECTED',
  INVALID_INPUT: 'INVALID_INPUT',
  FINANCIAL_BASED_MODEL_NOT_SELECTED: 'FINANCIAL_BASED_MODEL_NOT_SELECTED',
  DUPLICATE_VALUE: 'DUPLICATE_VALUE',
};
const ERROR_TEXTS = {
  [ERRORS.INVALID_PROJECT_ID]: (id) => i18n.t(`projectErrors.${ERRORS.INVALID_PROJECT_ID}`, { id }),
  [ERRORS.INVALID_DISCOUNT]: (country) => i18n.t(`projectErrors.${ERRORS.INVALID_DISCOUNT}`, { country }),
  [ERRORS.DUPLICATE_VALUE]: (cause) => i18n.t(`projectErrors.${ERRORS.DUPLICATE_VALUE}`, { cause }),
  [ERRORS.INVALID_PRICE]: (country) => i18n.t(`projectErrors.${ERRORS.INVALID_PRICE}`, { country }),
  [ERRORS.OUTCOME_BASED_MODEL_NOT_SELECTED]: (cause) =>
    i18n.t(`projectErrors.${ERRORS.OUTCOME_BASED_MODEL_NOT_SELECTED}`, { cause }),
  [ERRORS.INVALID_INPUT]: (cause) => i18n.t(`projectErrors.${ERRORS.INVALID_INPUT}`, { cause }),
  [ERRORS.FINANCIAL_BASED_MODEL_NOT_SELECTED]: (cause) =>
    i18n.t(`projectErrors.${ERRORS.FINANCIAL_BASED_MODEL_NOT_SELECTED}`, { cause }),
};

const parseError = (jsonStr) => {
  const parsedResponse = JSON.parse(jsonStr);
  const fn = ERROR_TEXTS[parsedResponse.error];
  return typeof fn === 'function' ? fn(parsedResponse.cause) : 'Unhandled Error';
};

export const checkError = (err) => {
  if (err.warning === ERRORS.WARNING_INVALID_INPUT) {
    toast.warn(i18n.t(`projectErrors.${ERRORS.WARNING_INVALID_INPUT}`, { cause: err.cause }));
    return false;
  }

  if (err instanceof ValidationError) {
    const message = parseError(err.props);

    toast.error(message);
    return false;
  }

  if (err instanceof CancelError) {
    // don't show any error messages
    return false;
  }

  if (err instanceof AuthError) {
    toast.error(err.message);
    return false;
  }

  // default show message
  console.error(err);
  toast.error(err.message);
};
