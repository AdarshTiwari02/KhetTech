import mongoose from 'mongoose';

const CropDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  hindiName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['cereal', 'pulse', 'oilseed', 'cash_crop', 'vegetable', 'fruit'],
    required: true
  },
  season: {
    type: String,
    enum: ['kharif', 'rabi', 'zaid', 'perennial'],
    required: true
  },
  soilTypes: [{
    type: String,
    enum: ['clay', 'sandy', 'loamy', 'black']
  }],
  climate: {
    temperature: {
      min: Number,
      max: Number
    },
    rainfall: {
      min: Number,
      max: Number
    },
    humidity: {
      min: Number,
      max: Number
    }
  },
  cultivation: {
    sowingTime: String,
    harvestingTime: String,
    duration: Number, // in days
    spacing: String,
    irrigation: String,
    fertilizer: String
  },
  diseases: [{
    name: String,
    hindiName: String,
    symptoms: String,
    treatment: String,
    prevention: String
  }],
  yield: {
    average: Number,
    unit: String,
    factors: [String]
  },
  market: {
    msp: Number,
    averagePrice: Number,
    unit: String,
    demand: {
      type: String,
      enum: ['high', 'medium', 'low']
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const CropData = mongoose.models.CropData || mongoose.model('CropData', CropDataSchema);