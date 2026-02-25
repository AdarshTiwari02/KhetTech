export interface User {
  _id: string;
  name: string;
  email: string;
  state?: string;
  isVerified: boolean;
  profile?: {
    farmSize?: number;
    soilType?: 'clay' | 'sandy' | 'loamy' | 'black';
    crops?: string[];
    location?: {
      latitude: number;
      longitude: number;
      address: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CropData {
  _id: string;
  name: string;
  hindiName: string;
  category: 'cereal' | 'pulse' | 'oilseed' | 'cash_crop' | 'vegetable' | 'fruit';
  season: 'kharif' | 'rabi' | 'zaid' | 'perennial';
  soilTypes: Array<'clay' | 'sandy' | 'loamy' | 'black'>;
  climate: {
    temperature: {
      min: number;
      max: number;
    };
    rainfall: {
      min: number;
      max: number;
    };
    humidity: {
      min: number;
      max: number;
    };
  };
  cultivation: {
    sowingTime: string;
    harvestingTime: string;
    duration: number;
    spacing: string;
    irrigation: string;
    fertilizer: string;
  };
  diseases: Array<{
    name: string;
    hindiName: string;
    symptoms: string;
    treatment: string;
    prevention: string;
  }>;
  yield: {
    average: number;
    unit: string;
    factors: string[];
  };
  market: {
    msp: number;
    averagePrice: number;
    unit: string;
    demand: 'high' | 'medium' | 'low';
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  _id: string;
  userId: string;
  type: 'income' | 'expense';
  category: 
    | 'seeds' | 'fertilizer' | 'pesticides' | 'labor' | 'irrigation' 
    | 'machinery' | 'transport' | 'storage' | 'market_fees' | 'loan_interest'
    | 'crop_sale' | 'government_subsidy' | 'other_income' | 'other_expense';
  amount: number;
  description?: string;
  date: Date;
  crop?: string;
  quantity?: number;
  unit?: 'kg' | 'quintal' | 'ton' | 'acre' | 'hectare' | 'piece' | 'hour' | 'day' | 'litre';
  paymentMethod?: 'cash' | 'bank_transfer' | 'upi' | 'cheque' | 'credit';
  attachments?: Array<{
    url: string;
    name: string;
    type: string;
  }>;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  count?: number;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  forecast: Array<{
    date: string;
    temp: number;
    condition: string;
  }>;
  farmingAdvice: string;
}

export interface MandiPrice {
  crop: string;
  englishName: string;
  variety: string;
  market: string;
  state: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  date: string;
  unit: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  msp: number;
}

export interface GovernmentScheme {
  name: string;
  hindiName: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  applicationProcess: string[];
  website: string;
  helpline: string;
}