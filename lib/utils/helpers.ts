import { ApiResponse } from '../types';

export function createApiResponse<T = any>(
  success: boolean,
  message: string,
  data?: T,
  count?: number
): ApiResponse<T> {
  const response: ApiResponse<T> = {
    success,
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

export function createSuccessResponse<T = any>(message: string, data?: T, count?: number): ApiResponse<T> {
  return createApiResponse(true, message, data, count);
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

export function handleApiError(error: any): ApiResponse {
  console.error('API Error:', error);

  if (error.name === 'ValidationError') {
    return createErrorResponse('Validation failed', error.message);
  }

  if (error.code === 11000) {
    return createErrorResponse('Duplicate entry found');
  }

  if (error.name === 'JsonWebTokenError') {
    return createErrorResponse('Invalid token');
  }

  if (error.name === 'TokenExpiredError') {
    return createErrorResponse('Token expired');
  }

  return createErrorResponse('Something went wrong', 
    process.env.NODE_ENV === 'development' ? error.message : undefined
  );
}

export function paginate<T>(array: T[], page: number, limit: number) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return {
    data: array.slice(startIndex, endIndex),
    page,
    limit,
    total: array.length,
    totalPages: Math.ceil(array.length / limit),
    hasNext: endIndex < array.length,
    hasPrev: startIndex > 0
  };
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function getFarmingAdvice(weather: any): string {
  const temp = weather.temperature;
  const humidity = weather.humidity;
  const condition = weather.description.toLowerCase();

  if (condition.includes('rain')) {
    return 'Avoid irrigation today. Good time for sowing rain-fed crops.';
  }

  if (temp > 35) {
    return 'High temperature alert! Water crops in early morning or late evening.';
  }

  if (temp < 10) {
    return 'Low temperature. Protect sensitive crops with covers.';
  }

  if (humidity > 80) {
    return 'High humidity. Watch for fungal diseases. Apply preventive fungicides.';
  }

  return 'Normal weather conditions. Continue regular farming activities.';
}