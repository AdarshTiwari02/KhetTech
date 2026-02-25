export const CROP_CATEGORIES = [
  'cereal',
  'pulse', 
  'oilseed',
  'cash_crop',
  'vegetable',
  'fruit'
] as const;

export const SEASONS = [
  'kharif',
  'rabi',
  'zaid',
  'perennial'
] as const;

export const SOIL_TYPES = [
  'clay',
  'sandy',
  'loamy',
  'black'
] as const;

export const EXPENSE_CATEGORIES = {
  income: [
    'crop_sale',
    'government_subsidy',
    'other_income'
  ],
  expense: [
    'seeds',
    'fertilizer',
    'pesticides',
    'labor',
    'irrigation',
    'machinery',
    'transport',
    'storage',
    'market_fees',
    'loan_interest',
    'other_expense'
  ]
} as const;

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

export const CROP_UNITS = [
  'kg',
  'quintal',
  'ton',
  'acre',
  'hectare'
] as const;

export const PAYMENT_METHODS = [
  'cash',
  'bank_transfer',
  'upi',
  'cheque',
  'credit'
] as const;

export const API_RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
};

export const FILE_UPLOAD_LIMITS = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/jpg']
};