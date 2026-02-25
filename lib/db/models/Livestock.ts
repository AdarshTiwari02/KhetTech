import mongoose from 'mongoose';

const livestockSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  animalType: {
    type: String,
    enum: ['cow', 'buffalo', 'goat', 'sheep', 'chicken', 'duck', 'pig', 'other'],
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  tagNumber: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  dateOfBirth: Date,
  purchaseDate: {
    type: Date,
    required: true
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  currentValue: Number,
  weight: {
    current: Number,
    history: [{
      weight: Number,
      date: Date,
      notes: String
    }]
  },
  milkProduction: {
    averagePerDay: Number,
    records: [{
      date: Date,
      morning: Number,
      evening: Number,
      total: Number,
      fat: Number,
      notes: String
    }]
  },
  health: {
    status: {
      type: String,
      enum: ['healthy', 'sick', 'under_treatment', 'pregnant', 'deceased'],
      default: 'healthy'
    },
    vaccinations: [{
      name: String,
      date: Date,
      nextDue: Date,
      veterinarian: String,
      cost: Number,
      notes: String
    }],
    treatments: [{
      disease: String,
      symptoms: String,
      diagnosis: String,
      treatment: String,
      startDate: Date,
      endDate: Date,
      veterinarian: String,
      cost: Number,
      medicines: [{
        name: String,
        dosage: String,
        frequency: String,
        duration: String
      }],
      notes: String
    }],
    checkups: [{
      date: Date,
      veterinarian: String,
      findings: String,
      recommendations: String,
      cost: Number
    }]
  },
  breeding: {
    isBreeding: {
      type: Boolean,
      default: false
    },
    lastBreedingDate: Date,
    expectedDeliveryDate: Date,
    pregnancyStatus: {
      type: String,
      enum: ['not_pregnant', 'pregnant', 'delivered'],
      default: 'not_pregnant'
    },
    offspring: [{
      tagNumber: String,
      dateOfBirth: Date,
      gender: String,
      status: String
    }]
  },
  feeding: {
    dailyFeed: [{
      feedType: String,
      quantity: Number,
      unit: String,
      cost: Number
    }],
    feedingSchedule: String,
    specialDiet: String
  },
  insurance: {
    isInsured: {
      type: Boolean,
      default: false
    },
    provider: String,
    policyNumber: String,
    coverageAmount: Number,
    premium: Number,
    startDate: Date,
    endDate: Date,
    documents: [{
      name: String,
      url: String,
      uploadDate: Date
    }]
  },
  sales: {
    isForSale: {
      type: Boolean,
      default: false
    },
    askingPrice: Number,
    soldDate: Date,
    soldPrice: Number,
    buyer: String,
    notes: String
  },
  documents: [{
    type: String,
    name: String,
    url: String,
    uploadDate: Date
  }],
  notes: String,
  status: {
    type: String,
    enum: ['active', 'sold', 'deceased', 'transferred'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
livestockSchema.index({ userId: 1, status: 1 });
livestockSchema.index({ userId: 1, animalType: 1 });
livestockSchema.index({ tagNumber: 1 });

export default mongoose.models.Livestock || mongoose.model('Livestock', livestockSchema);
