const mongoose = require('mongoose');
require('dotenv').config();

const cropData = [
  {
    name: 'Wheat',
    hindiName: 'गेहूं',
    category: 'cereal',
    season: 'rabi',
    soilTypes: ['loamy', 'clay'],
    climate: {
      temperature: { min: 10, max: 25 },
      rainfall: { min: 500, max: 1000 },
      humidity: { min: 50, max: 80 }
    },
    cultivation: {
      sowingTime: 'November',
      harvestingTime: 'March-April',
      duration: 120,
      spacing: '20-25 cm',
      irrigation: '4-6 times',
      fertilizer: 'NPK 120:60:40 kg/ha'
    },
    diseases: [
      {
        name: 'Leaf Rust',
        hindiName: 'पत्ती किट्ट',
        symptoms: 'Orange-brown pustules on leaves',
        treatment: 'Apply propiconazole 25% EC',
        prevention: 'Use resistant varieties'
      }
    ],
    yield: {
      average: 45,
      unit: 'quintal/acre',
      factors: ['soil fertility', 'irrigation', 'pest control']
    },
    market: {
      msp: 2125,
      averagePrice: 2200,
      unit: 'per quintal',
      demand: 'high'
    }
  },
  {
    name: 'Rice',
    hindiName: 'धान',
    category: 'cereal',
    season: 'kharif',
    soilTypes: ['clay', 'loamy'],
    climate: {
      temperature: { min: 20, max: 35 },
      rainfall: { min: 1000, max: 2000 },
      humidity: { min: 70, max: 90 }
    },
    cultivation: {
      sowingTime: 'June-July',
      harvestingTime: 'October-November',
      duration: 100,
      spacing: '20x15 cm',
      irrigation: 'Continuous standing water',
      fertilizer: 'NPK 100:50:50 kg/ha'
    },
    diseases: [
      {
        name: 'Blast',
        hindiName: 'ब्लास्ट',
        symptoms: 'Spindle-shaped lesions on leaves',
        treatment: 'Apply tricyclazole 75% WP',
        prevention: 'Use certified seeds'
      }
    ],
    yield: {
      average: 30,
      unit: 'quintal/acre',
      factors: ['water management', 'variety', 'nutrient management']
    },
    market: {
      msp: 2040,
      averagePrice: 2500,
      unit: 'per quintal',
      demand: 'high'
    }
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-farmer');
    console.log('Connected to MongoDB');

    // Clear existing data
    const { CropData } = require('../lib/db/models/CropData');
    await CropData.deleteMany({});
    console.log('Cleared existing crop data');

    // Insert new data
    await CropData.insertMany(cropData);
    console.log(`Inserted ${cropData.length} crop records`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();