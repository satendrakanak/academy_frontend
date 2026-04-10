export type ApiErrorResponse = {
  message: string | string[];
  statusCode?: number;
  error?: string;
};

export type ApiResponse<T> = {
  apiVersion: string;
  data: T;
};
