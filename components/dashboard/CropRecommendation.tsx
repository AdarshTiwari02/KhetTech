'use client';

import { useState } from 'react';
import { Sprout, Filter, Search, Calendar, Droplets } from 'lucide-react';

const cropsData = [
  {
    id: 1,
    name: 'गेहूं',
    hindiName: 'Wheat',
    category: 'अनाज',
    season: 'रबी',
    soilType: ['दोमट', 'चिकनी'],
    duration: '120-140 दिन',
    yield: '40-50 क्विंटल/एकड़',
    msp: 2125,
    suitability: 'उच्च',
  },
  {
    id: 2,
    name: 'धान',
    hindiName: 'Rice',
    category: 'अनाज',
    season: 'खरीफ',
    soilType: ['चिकनी', 'दोमट'],
    duration: '90-120 दिन',
    yield: '25-30 क्विंटल/एकड़',
    msp: 2040,
    suitability: 'मध्यम',
  },
  {
    id: 3,
    name: 'मक्का',
    hindiName: 'Maize',
    category: 'अनाज',
    season: 'खरीफ',
    soilType: ['रेतीली', 'दोमट'],
    duration: '80-100 दिन',
    yield: '20-25 क्विंटल/एकड़',
    msp: 1870,
    suitability: 'उच्च',
  },
  {
    id: 4,
    name: 'गन्ना',
    hindiName: 'Sugarcane',
    category: 'नकदी फसल',
    season: 'बारहमासी',
    soilType: ['काली', 'दोमट'],
    duration: '10-12 महीने',
    yield: '700-800 क्विंटल/एकड़',
    msp: 3150,
    suitability: 'मध्यम',
  },
  {
    id: 5,
    name: 'आलू',
    hindiName: 'Potato',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '90-120 दिन',
    yield: '80-100 क्विंटल/एकड़',
    msp: 2250,
    suitability: 'उच्च',
  },
  {
    id: 6,
    name: 'टमाटर',
    hindiName: 'Tomato',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '60-80 दिन',
    yield: '100-150 क्विंटल/एकड़',
    msp: 1800,
    suitability: 'उच्च',
  },
  {
    id: 7,
    name: 'प्याज',
    hindiName: 'Onion',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट', 'काली'],
    duration: '120-150 दिन',
    yield: '80-120 क्विंटल/एकड़',
    msp: 2000,
    suitability: 'मध्यम',
  },
  {
    id: 8,
    name: 'मटर',
    hindiName: 'Peas',
    category: 'दलहन',
    season: 'रबी',
    soilType: ['दोमट'],
    duration: '60-70 दिन',
    yield: '15-20 क्विंटल/एकड़',
    msp: 5000,
    suitability: 'उच्च',
  },
  {
    id: 9,
    name: 'बैंगन',
    hindiName: 'Brinjal',
    category: 'सब्जी',
    season: 'खरीफ',
    soilType: ['दोमट', 'रेतीली'],
    duration: '100-120 दिन',
    yield: '60-80 क्विंटल/एकड़',
    msp: 1500,
    suitability: 'मध्यम',
  },
  {
    id: 10,
    name: 'मिर्च',
    hindiName: 'Chilli',
    category: 'सब्जी',
    season: 'खरीफ',
    soilType: ['दोमट', 'रेतीली'],
    duration: '120-150 दिन',
    yield: '20-30 क्विंटल/एकड़',
    msp: 8000,
    suitability: 'उच्च',
  },
  {
    id: 11,
    name: 'गोभी',
    hindiName: 'Cauliflower',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट'],
    duration: '70-90 दिन',
    yield: '80-100 क्विंटल/एकड़',
    msp: 1200,
    suitability: 'उच्च',
  },
  {
    id: 12,
    name: 'भिंडी',
    hindiName: 'Okra',
    category: 'सब्जी',
    season: 'खरीफ',
    soilType: ['दोमट', 'रेतीली'],
    duration: '50-60 दिन',
    yield: '40-50 क्विंटल/एकड़',
    msp: 2500,
    suitability: 'मध्यम',
  },
  {
    id: 13,
    name: 'चना',
    hindiName: 'Chickpea',
    category: 'दलहन',
    season: 'रबी',
    soilType: ['दोमट', 'काली'],
    duration: '100-120 दिन',
    yield: '15-20 क्विंटल/एकड़',
    msp: 5230,
    suitability: 'उच्च',
  },
  {
    id: 14,
    name: 'सरसों',
    hindiName: 'Mustard',
    category: 'तिलहन',
    season: 'रबी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '90-110 दिन',
    yield: '12-15 क्विंटल/एकड़',
    msp: 5050,
    suitability: 'उच्च',
  },
  {
    id: 15,
    name: 'सोयाबीन',
    hindiName: 'Soybean',
    category: 'तिलहन',
    season: 'खरीफ',
    soilType: ['काली', 'दोमट'],
    duration: '90-100 दिन',
    yield: '15-20 क्विंटल/एकड़',
    msp: 4300,
    suitability: 'मध्यम',
  },
  // जायद फसलें (गर्मी की फसलें - मार्च से जून)
  {
    id: 16,
    name: 'खरबूजा',
    hindiName: 'Muskmelon',
    category: 'सब्जी',
    season: 'जायद',
    soilType: ['रेतीली', 'दोमट'],
    duration: '90-100 दिन',
    yield: '100-150 क्विंटल/एकड़',
    msp: 1500,
    suitability: 'उच्च',
  },
  {
    id: 17,
    name: 'तरबूज',
    hindiName: 'Watermelon',
    category: 'सब्जी',
    season: 'जायद',
    soilType: ['रेतीली', 'दोमट'],
    duration: '80-90 दिन',
    yield: '150-200 क्विंटल/एकड़',
    msp: 1200,
    suitability: 'उच्च',
  },
  {
    id: 18,
    name: 'खीरा',
    hindiName: 'Cucumber',
    category: 'सब्जी',
    season: 'जायद',
    soilType: ['दोमट', 'रेतीली'],
    duration: '50-60 दिन',
    yield: '60-80 क्विंटल/एकड़',
    msp: 1800,
    suitability: 'उच्च',
  },
  {
    id: 19,
    name: 'लौकी',
    hindiName: 'Bottle Gourd',
    category: 'सब्जी',
    season: 'जायद',
    soilType: ['दोमट', 'रेतीली'],
    duration: '60-70 दिन',
    yield: '80-100 क्विंटल/एकड़',
    msp: 1500,
    suitability: 'मध्यम',
  },
  {
    id: 20,
    name: 'तोरई',
    hindiName: 'Ridge Gourd',
    category: 'सब्जी',
    season: 'जायद',
    soilType: ['दोमट', 'रेतीली'],
    duration: '50-60 दिन',
    yield: '50-70 क्विंटल/एकड़',
    msp: 2000,
    suitability: 'मध्यम',
  },
  {
    id: 21,
    name: 'करेला',
    hindiName: 'Bitter Gourd',
    category: 'सब्जी',
    season: 'जायद',
    soilType: ['दोमट', 'रेतीली'],
    duration: '55-65 दिन',
    yield: '40-60 क्विंटल/एकड़',
    msp: 2500,
    suitability: 'मध्यम',
  },
  {
    id: 22,
    name: 'कद्दू',
    hindiName: 'Pumpkin',
    category: 'सब्जी',
    season: 'जायद',
    soilType: ['दोमट', 'रेतीली'],
    duration: '90-110 दिन',
    yield: '100-150 क्विंटल/एकड़',
    msp: 1200,
    suitability: 'उच्च',
  },
  {
    id: 23,
    name: 'मूंग',
    hindiName: 'Green Gram',
    category: 'दलहन',
    season: 'जायद',
    soilType: ['दोमट', 'रेतीली'],
    duration: '60-70 दिन',
    yield: '8-10 क्विंटल/एकड़',
    msp: 7275,
    suitability: 'उच्च',
  },
  {
    id: 24,
    name: 'उड़द',
    hindiName: 'Black Gram',
    category: 'दलहन',
    season: 'जायद',
    soilType: ['दोमट', 'काली'],
    duration: '70-80 दिन',
    yield: '8-12 क्विंटल/एकड़',
    msp: 6300,
    suitability: 'मध्यम',
  },
  {
    id: 25,
    name: 'मूंगफली',
    hindiName: 'Groundnut',
    category: 'तिलहन',
    season: 'जायद',
    soilType: ['रेतीली', 'दोमट'],
    duration: '100-120 दिन',
    yield: '15-20 क्विंटल/एकड़',
    msp: 5550,
    suitability: 'उच्च',
  },
  {
    id: 26,
    name: 'सूरजमुखी',
    hindiName: 'Sunflower',
    category: 'तिलहन',
    season: 'जायद',
    soilType: ['दोमट', 'रेतीली'],
    duration: '90-100 दिन',
    yield: '12-15 क्विंटल/एकड़',
    msp: 6015,
    suitability: 'उच्च',
  },
  {
    id: 27,
    name: 'ग्वार',
    hindiName: 'Cluster Bean',
    category: 'सब्जी',
    season: 'जायद',
    soilType: ['रेतीली', 'दोमट'],
    duration: '60-90 दिन',
    yield: '30-40 क्विंटल/एकड़',
    msp: 5500,
    suitability: 'मध्यम',
  },
  {
    id: 28,
    name: 'चौलाई',
    hindiName: 'Amaranth',
    category: 'सब्जी',
    season: 'जायद',
    soilType: ['दोमट', 'रेतीली'],
    duration: '30-40 दिन',
    yield: '20-30 क्विंटल/एकड़',
    msp: 1800,
    suitability: 'उच्च',
  },
  {
    id: 29,
    name: 'पालक (गर्मी)',
    hindiName: 'Summer Spinach',
    category: 'सब्जी',
    season: 'जायद',
    soilType: ['दोमट'],
    duration: '30-40 दिन',
    yield: '25-35 क्विंटल/एकड़',
    msp: 1000,
    suitability: 'मध्यम',
  },
  {
    id: 30,
    name: 'ढेंचा',
    hindiName: 'Sesbania',
    category: 'हरी खाद',
    season: 'जायद',
    soilType: ['दोमट', 'चिकनी'],
    duration: '45-60 दिन',
    yield: '150-200 क्विंटल/एकड़',
    msp: 0,
    suitability: 'उच्च',
  },
  // अतिरिक्त रबी फसलें
  {
    id: 31,
    name: 'जौ',
    hindiName: 'Barley',
    category: 'अनाज',
    season: 'रबी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '110-130 दिन',
    yield: '30-35 क्विंटल/एकड़',
    msp: 1735,
    suitability: 'मध्यम',
  },
  {
    id: 32,
    name: 'मसूर',
    hindiName: 'Lentil',
    category: 'दलहन',
    season: 'रबी',
    soilType: ['दोमट', 'काली'],
    duration: '100-110 दिन',
    yield: '10-12 क्विंटल/एकड़',
    msp: 5500,
    suitability: 'उच्च',
  },
  {
    id: 33,
    name: 'गाजर',
    hindiName: 'Carrot',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '90-100 दिन',
    yield: '100-120 क्विंटल/एकड़',
    msp: 1800,
    suitability: 'उच्च',
  },
  {
    id: 34,
    name: 'मूली',
    hindiName: 'Radish',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '40-50 दिन',
    yield: '80-100 क्विंटल/एकड़',
    msp: 1500,
    suitability: 'उच्च',
  },
  {
    id: 35,
    name: 'पालक',
    hindiName: 'Spinach',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट'],
    duration: '40-50 दिन',
    yield: '30-40 क्विंटल/एकड़',
    msp: 1000,
    suitability: 'उच्च',
  },
  {
    id: 36,
    name: 'मेथी',
    hindiName: 'Fenugreek',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '50-60 दिन',
    yield: '20-25 क्विंटल/एकड़',
    msp: 5000,
    suitability: 'मध्यम',
  },
  {
    id: 37,
    name: 'धनिया',
    hindiName: 'Coriander',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट'],
    duration: '40-50 दिन',
    yield: '15-20 क्विंटल/एकड़',
    msp: 3000,
    suitability: 'उच्च',
  },
  {
    id: 38,
    name: 'लहसुन',
    hindiName: 'Garlic',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '150-180 दिन',
    yield: '60-80 क्विंटल/एकड़',
    msp: 3200,
    suitability: 'मध्यम',
  },
  {
    id: 39,
    name: 'अलसी',
    hindiName: 'Linseed',
    category: 'तिलहन',
    season: 'रबी',
    soilType: ['दोमट', 'काली'],
    duration: '110-130 दिन',
    yield: '8-10 क्विंटल/एकड़',
    msp: 5650,
    suitability: 'मध्यम',
  },
  // अतिरिक्त बारहमासी फसलें
  {
    id: 40,
    name: 'केला',
    hindiName: 'Banana',
    category: 'फल',
    season: 'बारहमासी',
    soilType: ['दोमट', 'चिकनी'],
    duration: '12-15 महीने',
    yield: '400-500 क्विंटल/एकड़',
    msp: 2500,
    suitability: 'उच्च',
  },
  {
    id: 41,
    name: 'पपीता',
    hindiName: 'Papaya',
    category: 'फल',
    season: 'बारहमासी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '10-12 महीने',
    yield: '300-400 क्विंटल/एकड़',
    msp: 2000,
    suitability: 'उच्च',
  },
  {
    id: 42,
    name: 'अनानास',
    hindiName: 'Pineapple',
    category: 'फल',
    season: 'बारहमासी',
    soilType: ['रेतीली', 'दोमट'],
    duration: '18-24 महीने',
    yield: '200-250 क्विंटल/एकड़',
    msp: 3000,
    suitability: 'मध्यम',
  },
  {
    id: 43,
    name: 'हल्दी',
    hindiName: 'Turmeric',
    category: 'मसाला',
    season: 'बारहमासी',
    soilType: ['दोमट', 'चिकनी'],
    duration: '7-9 महीने',
    yield: '150-200 क्विंटल/एकड़',
    msp: 7500,
    suitability: 'उच्च',
  },
  {
    id: 44,
    name: 'अदरक',
    hindiName: 'Ginger',
    category: 'मसाला',
    season: 'बारहमासी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '8-10 महीने',
    yield: '100-150 क्विंटल/एकड़',
    msp: 8000,
    suitability: 'उच्च',
  },
  // अतिरिक्त खरीफ फसलें
  {
    id: 45,
    name: 'बाजरा',
    hindiName: 'Pearl Millet',
    category: 'अनाज',
    season: 'खरीफ',
    soilType: ['रेतीली', 'दोमट'],
    duration: '70-90 दिन',
    yield: '15-20 क्विंटल/एकड़',
    msp: 2350,
    suitability: 'उच्च',
  },
  {
    id: 46,
    name: 'ज्वार',
    hindiName: 'Sorghum',
    category: 'अनाज',
    season: 'खरीफ',
    soilType: ['काली', 'दोमट'],
    duration: '100-120 दिन',
    yield: '18-22 क्विंटल/एकड़',
    msp: 2970,
    suitability: 'मध्यम',
  },
  {
    id: 47,
    name: 'अरहर',
    hindiName: 'Pigeon Pea',
    category: 'दलहन',
    season: 'खरीफ',
    soilType: ['काली', 'दोमट'],
    duration: '150-180 दिन',
    yield: '12-15 क्विंटल/एकड़',
    msp: 6600,
    suitability: 'उच्च',
  },
  {
    id: 48,
    name: 'कपास',
    hindiName: 'Cotton',
    category: 'नकदी फसल',
    season: 'खरीफ',
    soilType: ['काली', 'दोमट'],
    duration: '150-180 दिन',
    yield: '15-20 क्विंटल/एकड़',
    msp: 6620,
    suitability: 'मध्यम',
  },
  {
    id: 49,
    name: 'जूट',
    hindiName: 'Jute',
    category: 'नकदी फसल',
    season: 'खरीफ',
    soilType: ['चिकनी', 'दोमट'],
    duration: '120-150 दिन',
    yield: '20-25 क्विंटल/एकड़',
    msp: 4750,
    suitability: 'मध्यम',
  },
  {
    id: 50,
    name: 'तिल',
    hindiName: 'Sesame',
    category: 'तिलहन',
    season: 'खरीफ',
    soilType: ['दोमट', 'रेतीली'],
    duration: '80-90 दिन',
    yield: '5-7 क्विंटल/एकड़',
    msp: 7307,
    suitability: 'मध्यम',
  },
  // फल फसलें
  {
    id: 51,
    name: 'आम',
    hindiName: 'Mango',
    category: 'फल',
    season: 'बारहमासी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '3-5 साल (पहली फसल)',
    yield: '100-150 क्विंटल/एकड़',
    msp: 3500,
    suitability: 'उच्च',
  },
  {
    id: 52,
    name: 'अमरूद',
    hindiName: 'Guava',
    category: 'फल',
    season: 'बारहमासी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '2-3 साल (पहली फसल)',
    yield: '150-200 क्विंटल/एकड़',
    msp: 2500,
    suitability: 'उच्च',
  },
  {
    id: 53,
    name: 'नींबू',
    hindiName: 'Lemon',
    category: 'फल',
    season: 'बारहमासी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '2-3 साल (पहली फसल)',
    yield: '100-120 क्विंटल/एकड़',
    msp: 3000,
    suitability: 'उच्च',
  },
  {
    id: 54,
    name: 'अंगूर',
    hindiName: 'Grapes',
    category: 'फल',
    season: 'बारहमासी',
    soilType: ['दोमट', 'काली'],
    duration: '2-3 साल (पहली फसल)',
    yield: '150-200 क्विंटल/एकड़',
    msp: 4000,
    suitability: 'मध्यम',
  },
  {
    id: 55,
    name: 'अनार',
    hindiName: 'Pomegranate',
    category: 'फल',
    season: 'बारहमासी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '2-3 साल (पहली फसल)',
    yield: '80-100 क्विंटल/एकड़',
    msp: 5000,
    suitability: 'उच्च',
  },
  // मसाले
  {
    id: 56,
    name: 'मिर्च (लाल)',
    hindiName: 'Red Chilli',
    category: 'मसाला',
    season: 'खरीफ',
    soilType: ['दोमट', 'रेतीली'],
    duration: '150-180 दिन',
    yield: '15-20 क्विंटल/एकड़',
    msp: 8000,
    suitability: 'उच्च',
  },
  {
    id: 57,
    name: 'जीरा',
    hindiName: 'Cumin',
    category: 'मसाला',
    season: 'रबी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '100-120 दिन',
    yield: '4-6 क्विंटल/एकड़',
    msp: 9000,
    suitability: 'मध्यम',
  },
  {
    id: 58,
    name: 'काली मिर्च',
    hindiName: 'Black Pepper',
    category: 'मसाला',
    season: 'बारहमासी',
    soilType: ['दोमट', 'चिकनी'],
    duration: '3-4 साल (पहली फसल)',
    yield: '10-15 क्विंटल/एकड़',
    msp: 50000,
    suitability: 'मध्यम',
  },
  // अतिरिक्त सब्जियां
  {
    id: 59,
    name: 'शिमला मिर्च',
    hindiName: 'Capsicum',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '70-90 दिन',
    yield: '100-150 क्विंटल/एकड़',
    msp: 3000,
    suitability: 'उच्च',
  },
  {
    id: 60,
    name: 'बंद गोभी',
    hindiName: 'Cabbage',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट'],
    duration: '80-100 दिन',
    yield: '150-200 क्विंटल/एकड़',
    msp: 1500,
    suitability: 'उच्च',
  },
  {
    id: 61,
    name: 'ब्रोकली',
    hindiName: 'Broccoli',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट'],
    duration: '70-90 दिन',
    yield: '80-100 क्विंटल/एकड़',
    msp: 2500,
    suitability: 'मध्यम',
  },
  {
    id: 62,
    name: 'चुकंदर',
    hindiName: 'Beetroot',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '60-80 दिन',
    yield: '100-120 क्विंटल/एकड़',
    msp: 2000,
    suitability: 'उच्च',
  },
  {
    id: 63,
    name: 'शकरकंद',
    hindiName: 'Sweet Potato',
    category: 'सब्जी',
    season: 'खरीफ',
    soilType: ['रेतीली', 'दोमट'],
    duration: '100-120 दिन',
    yield: '150-200 क्विंटल/एकड़',
    msp: 2200,
    suitability: 'उच्च',
  },
  {
    id: 64,
    name: 'अरबी',
    hindiName: 'Colocasia',
    category: 'सब्जी',
    season: 'खरीफ',
    soilType: ['चिकनी', 'दोमट'],
    duration: '150-180 दिन',
    yield: '100-150 क्विंटल/एकड़',
    msp: 2500,
    suitability: 'मध्यम',
  },
  {
    id: 65,
    name: 'सेम',
    hindiName: 'French Bean',
    category: 'सब्जी',
    season: 'रबी',
    soilType: ['दोमट', 'रेतीली'],
    duration: '60-70 दिन',
    yield: '50-70 क्विंटल/एकड़',
    msp: 3000,
    suitability: 'उच्च',
  },
];

const categories = ['सभी', 'अनाज', 'दलहन', 'तिलहन', 'सब्जी', 'नकदी फसल', 'हरी खाद', 'फल', 'मसाला'];
const seasons = ['सभी', 'खरीफ', 'रबी', 'जायद', 'बारहमासी'];
const soilTypes = ['सभी', 'चिकनी', 'रेतीली', 'दोमट', 'काली'];

export default function CropRecommendation() {
  const [selectedCategory, setSelectedCategory] = useState('सभी');
  const [selectedSeason, setSelectedSeason] = useState('सभी');
  const [selectedSoil, setSelectedSoil] = useState('सभी');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null);

  const filteredCrops = cropsData.filter(crop => {
    const matchesCategory = selectedCategory === 'सभी' || crop.category === selectedCategory;
    const matchesSeason = selectedSeason === 'सभी' || crop.season === selectedSeason;
    const matchesSoil = selectedSoil === 'सभी' || crop.soilType.includes(selectedSoil);
    const matchesSearch = searchQuery === '' || 
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.hindiName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSeason && matchesSoil && matchesSearch;
  });

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'उच्च': return 'bg-green-100 text-green-800';
      case 'मध्यम': return 'bg-yellow-100 text-yellow-800';
      case 'निम्न': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Sprout className="w-5 h-5 mr-2 text-emerald-500" />
          फसल सुझाव
        </h2>
        <button className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">
          सभी देखें
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">फ़िल्टर:</span>
        </div>
        
        {/* Category Filter */}
        <div>
          <p className="text-xs text-gray-600 mb-2">श्रेणी:</p>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Season Filter */}
        <div>
          <p className="text-xs text-gray-600 mb-2">मौसम:</p>
          <div className="flex flex-wrap gap-2">
            {seasons.map(season => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedSeason === season
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {season}
              </button>
            ))}
          </div>
        </div>

        {/* Soil Type Filter */}
        <div>
          <p className="text-xs text-gray-600 mb-2">मिट्टी का प्रकार:</p>
          <div className="flex flex-wrap gap-2">
            {soilTypes.map(soil => (
              <button
                key={soil}
                onClick={() => setSelectedSoil(soil)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedSoil === soil
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {soil}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="फसल का नाम खोजें..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {/* Crops List */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {filteredCrops.map(crop => (
          <div
            key={crop.id}
            className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
              selectedCrop === crop.id
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-emerald-300'
            }`}
            onClick={() => setSelectedCrop(crop.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold">{crop.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    {crop.category}
                  </span>
                </div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getSuitabilityColor(crop.suitability)}`}>
                  {crop.suitability} उपयुक्तता
                </span>
                
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{crop.season}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Droplets className="w-4 h-4 text-gray-500" />
                    <span>{crop.soilType.join(', ')}</span>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">अवधि: </span>
                    <span className="font-medium">{crop.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">उपज: </span>
                    <span className="font-medium">{crop.yield}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-emerald-700">
                  ₹{crop.msp}/क्विंटल
                </div>
                <div className="text-xs text-gray-500">न्यूनतम समर्थन मूल्य</div>
              </div>
            </div>

            {selectedCrop === crop.id && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                    विवरण देखें
                  </button>
                  <button className="flex-1 border border-emerald-600 text-emerald-600 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors">
                    योजना में जोड़ें
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Sprout className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>आपके मानदंड से मेल खाने वाली कोई फसल नहीं मिली।</p>
          <p className="text-sm mt-1">अपने फ़िल्टर या खोज शब्द को समायोजित करने का प्रयास करें।</p>
        </div>
      )}

      {/* Recommendation Summary */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-1">सुझाव</h4>
        <p className="text-sm text-blue-700">
          आपके स्थान और वर्तमान मौसम ({selectedSeason}) के आधार पर, {filteredCrops.length} फसलें अनुशंसित हैं।
          {filteredCrops.length > 0 && ' इष्टतम उपज के लिए जल्द ही रोपण पर विचार करें।'}
        </p>
      </div>
    </div>
  );
}