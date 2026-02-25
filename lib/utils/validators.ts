export function validateMobile(mobile: string): boolean {
  return /^[0-9]{10}$/.test(mobile);
}

export function validateEmail(email: string): boolean {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function validateOTP(otp: string): boolean {
  return /^[0-9]{6}$/.test(otp);
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  return { valid: true };
}

export function validateCropData(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!data.name) errors.push('Crop name is required');
  if (!data.hindiName) errors.push('Hindi name is required');
  if (!data.category) errors.push('Category is required');
  if (!data.season) errors.push('Season is required');

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}

export function validateExpenseData(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!data.type) errors.push('Type (income/expense) is required');
  if (!data.category) errors.push('Category is required');
  if (!data.amount || data.amount <= 0) errors.push('Valid amount is required');
  if (!data.date) errors.push('Date is required');

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}