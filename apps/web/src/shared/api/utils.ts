import { isAxiosError } from 'axios';

interface ApiError {
  code: string;
  message: string;
  displayMessage: string;
}

interface ApiErrorData {
  code?: string | number;
  message?: string;
  errors?: Record<string, string>;
}

const formatError = (code: unknown, message: unknown): ApiError => {
  const normalizedCode = String(code ?? 'Unknown code');
  const normalizedMessage = String(message);

  return {
    code: normalizedCode,
    message: normalizedMessage,
    displayMessage: `${normalizedCode} ${normalizedMessage}`,
  };
};

export const getApiError = (error: unknown): ApiError => {
  if (isAxiosError<ApiErrorData>(error)) {
    const errData = error.response?.data;

    const errors = Object.entries(errData?.errors ?? {})
      .map(([key, value]) => `${key}: ${value}`)
      .join('. ');

    const message = [errData?.message, errors].filter(Boolean).join('. ');
    return formatError(errData?.code ?? error, message);
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  ) {
    return formatError(error.code, error.message);
  }

  return formatError('Unknown code', error);
};
