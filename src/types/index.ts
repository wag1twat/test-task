interface BaseRequestError {
  message: string;
}

interface BaseListResponse {
  count: number;
  limit: number;
  offset: number;
  total: number;
}

export type { BaseListResponse, BaseRequestError };
