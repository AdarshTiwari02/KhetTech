export interface Livestock {
  _id: string;
  userId: string;
  animalType: 'cow' | 'buffalo' | 'goat' | 'sheep' | 'chicken' | 'duck' | 'pig' | 'other';
  breed: string;
  tagNumber: string;
  name?: string;
  gender: 'male' | 'female';
  dateOfBirth?: Date;
  purchaseDate: Date;
  purchasePrice: number;
  currentValue?: number;
  weight?: {
    current?: number;
    history: Array<{
      weight: number;
      date: Date;
      notes?: string;
    }>;
  };
  milkProduction?: {
    averagePerDay?: number;
    records: Array<{
      date: Date;
      morning: number;
      evening: number;
      total: number;
      fat?: number;
      notes?: string;
    }>;
  };
  health: {
    status: 'healthy' | 'sick' | 'under_treatment' | 'pregnant' | 'deceased';
    vaccinations: Array<{
      name: string;
      date: Date;
      nextDue?: Date;
      veterinarian?: string;
      cost?: number;
      notes?: string;
    }>;
    treatments: Array<{
      disease: string;
      symptoms?: string;
      diagnosis?: string;
      treatment: string;
      startDate: Date;
      endDate?: Date;
      veterinarian?: string;
      cost?: number;
      medicines?: Array<{
        name: string;
        dosage: string;
        frequency: string;
        duration: string;
      }>;
      notes?: string;
    }>;
    checkups: Array<{
      date: Date;
      veterinarian?: string;
      findings: string;
      recommendations?: string;
      cost?: number;
    }>;
  };
  breeding?: {
    isBreeding: boolean;
    lastBreedingDate?: Date;
    expectedDeliveryDate?: Date;
    pregnancyStatus: 'not_pregnant' | 'pregnant' | 'delivered';
    offspring?: Array<{
      tagNumber: string;
      dateOfBirth: Date;
      gender: string;
      status: string;
    }>;
  };
  feeding?: {
    dailyFeed: Array<{
      feedType: string;
      quantity: number;
      unit: string;
      cost: number;
    }>;
    feedingSchedule?: string;
    specialDiet?: string;
  };
  insurance?: {
    isInsured: boolean;
    provider?: string;
    policyNumber?: string;
    coverageAmount?: number;
    premium?: number;
    startDate?: Date;
    endDate?: Date;
    documents?: Array<{
      name: string;
      url: string;
      uploadDate: Date;
    }>;
  };
  sales?: {
    isForSale: boolean;
    askingPrice?: number;
    soldDate?: Date;
    soldPrice?: number;
    buyer?: string;
    notes?: string;
  };
  documents?: Array<{
    type: string;
    name: string;
    url: string;
    uploadDate: Date;
  }>;
  notes?: string;
  status: 'active' | 'sold' | 'deceased' | 'transferred';
  createdAt: Date;
  updatedAt: Date;
}

export interface LivestockStats {
  totalAnimals: number;
  byType: Record<string, number>;
  totalValue: number;
  milkProduction: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    average: number;
  };
  healthStatus: {
    healthy: number;
    sick: number;
    underTreatment: number;
    pregnant: number;
  };
  upcomingVaccinations: Array<{
    animalId: string;
    tagNumber: string;
    vaccineName: string;
    dueDate: Date;
  }>;
}
