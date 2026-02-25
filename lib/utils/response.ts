import { ApiResponse } from '../types';

export function createSuccessResponse<T = any>(message: string, data?: T, count?: number): ApiResponse<T> {
  const response: ApiResponse<T> = {
    success: true,
    message
  };

  if (data !== undefined) {
    response.data = data;
  }

  if (count !== undefined) {
    response.count = count;
  }

  return response;
}

export function createErrorResponse(message: string, error?: string): ApiResponse {
  const response: ApiResponse = {
    success: false,
    message
  };

  if (error) {
    response.error = error;
  }

  return response;
}