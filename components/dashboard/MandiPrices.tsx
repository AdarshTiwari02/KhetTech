'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Filter, Download, MapPin, Calendar, Navigation, Phone, Clock, Truck } from 'lucide-react';
import { statesAndDistricts } from '@/lib/utils/districts';

const cropPrices = {
  'अनाज': {
    'गेहूं': { msp: 2125, unit: 'क्विंटल' },
    'धान': { msp: 2040, unit: 'क्विंटल' },
    'मक्का': { msp: 1870, unit: 'क्विंटल' },
    'बाजरा': { msp: 2350, unit: 'क्विंटल' },
    'ज्वार': { msp: 2970, unit: 'क्विंटल' },
    'रागी': { msp: 3377, unit: 'क्विंटल' },
    'जौ': { msp: 1635, unit: 'क्विंटल' },
    'कोदो': { msp: 3000, unit: 'क्विंटल' },
    'कुटकी': { msp: 3500, unit: 'क्विंटल' }
  },
  'दलहन': {
    'चना': { msp: 5230, unit: 'क्विंटल' },
    'मूंग': { msp: 7275, unit: 'क्विंटल' },
    'उड़द': { msp: 6300, unit: 'क्विंटल' },
    'अरहर': { msp: 6600, unit: 'क्विंटल' },
    'मसूर': { msp: 5500, unit: 'क्विंटल' },
    'मटर': { msp: 5000, unit: 'क्विंटल' },
    'मोठ': { msp: 6930, unit: 'क्विंटल' },
    'कुलथी': { msp: 5100, unit: 'क्विंटल' },
    'लोबिया': { msp: 5500, unit: 'क्विंटल' },
    'राजमा': { msp: 5800, unit: 'क्विंटल' }
  },
  'तिलहन': {
    'सरसों': { msp: 5050, unit: 'क्विंटल' },
    'मूंगफली': { msp: 5550, unit: 'क्विंटल' },
    'सोयाबीन': { msp: 4300, unit: 'क्विंटल' },
    'सूरजमुखी': { msp: 6015, unit: 'क्विंटल' },
    'तिल': { msp: 7307, unit: 'क्विंटल' },
    'अलसी': { msp: 5650, unit: 'क्विंटल' },
    'कुसुम': { msp: 5441, unit: 'क्विंटल' },
    'नाइजर': { msp: 6930, unit: 'क्विंटल' },
    'रेपसीड': { msp: 5050, unit: 'क्विंटल' },
    'तोरिया': { msp: 5050, unit: 'क्विंटल' }
  },
  'सब्जियां': {
    'आलू': { msp: 2250, unit: 'क्विंटल' },
    'टमाटर': { msp: 1800, unit: 'क्विंटल' },
    'प्याज': { msp: 2000, unit: 'क्विंटल' },
    'गोभी': { msp: 1200, unit: 'क्विंटल' },
    'बैंगन': { msp: 1500, unit: 'क्विंटल' },
    'मिर्च': { msp: 8000, unit: 'क्विंटल' },
    'भिंडी': { msp: 2500, unit: 'क्विंटल' },
    'गाजर': { msp: 1800, unit: 'क्विंटल' },
    'मूली': { msp: 1500, unit: 'क्विंटल' },
    'पालक': { msp: 1000, unit: 'क्विंटल' },
    'धनिया': { msp: 3000, unit: 'क्विंटल' },
    'हरी मिर्च': { msp: 5000, unit: 'क्विंटल' },
    'फूलगोभी': { msp: 1500, unit: 'क्विंटल' },
    'पत्तागोभी': { msp: 1200, unit: 'क्विंटल' },
    'शिमला मिर्च': { msp: 3000, unit: 'क्विंटल' },
    'खीरा': { msp: 1500, unit: 'क्विंटल' },
    'लौकी': { msp: 1200, unit: 'क्विंटल' },
    'तोरई': { msp: 1500, unit: 'क्विंटल' },
    'करेला': { msp: 2000, unit: 'क्विंटल' },
    'कद्दू': { msp: 1000, unit: 'क्विंटल' },
    'टिंडा': { msp: 1500, unit: 'क्विंटल' },
    'परवल': { msp: 2500, unit: 'क्विंटल' },
    'सेम': { msp: 2000, unit: 'क्विंटल' },
    'मेथी': { msp: 2500, unit: 'क्विंटल' },
    'बथुआ': { msp: 1500, unit: 'क्विंटल' },
    'सरसों साग': { msp: 1200, unit: 'क्विंटल' },
    'चौलाई': { msp: 1500, unit: 'क्विंटल' },
    'शलजम': { msp: 1200, unit: 'क्विंटल' },
    'चुकंदर': { msp: 1800, unit: 'क्विंटल' },
    'अदरक': { msp: 8000, unit: 'क्विंटल' },
    'लहसुन': { msp: 6000, unit: 'क्विंटल' }
  },
  'फल': {
    'आम': { msp: 3000, unit: 'क्विंटल' },
    'केला': { msp: 2500, unit: 'क्विंटल' },
    'अमरूद': { msp: 2000, unit: 'क्विंटल' },
    'पपीता': { msp: 1500, unit: 'क्विंटल' },
    'संतरा': { msp: 3500, unit: 'क्विंटल' },
    'नींबू': { msp: 4000, unit: 'क्विंटल' },
    'अनार': { msp: 5000, unit: 'क्विंटल' },
    'सेब': { msp: 6000, unit: 'क्विंटल' },
    'अंगूर': { msp: 5500, unit: 'क्विंटल' },
    'तरबूज': { msp: 1200, unit: 'क्विंटल' },
    'खरबूजा': { msp: 1500, unit: 'क्विंटल' },
    'लीची': { msp: 4000, unit: 'क्विंटल' },
    'अनानास': { msp: 2500, unit: 'क्विंटल' },
    'चीकू': { msp: 2000, unit: 'क्विंटल' },
    'बेर': { msp: 1800, unit: 'क्विंटल' },
    'आंवला': { msp: 2500, unit: 'क्विंटल' },
    'बेल': { msp: 1500, unit: 'क्विंटल' },
    'जामुन': { msp: 2000, unit: 'क्विंटल' },
    'कटहल': { msp: 1800, unit: 'क्विंटल' },
    'शरीफा': { msp: 3000, unit: 'क्विंटल' }
  },
  'मसाले': {
    'हल्दी': { msp: 7500, unit: 'क्विंटल' },
    'धनिया बीज': { msp: 7000, unit: 'क्विंटल' },
    'जीरा': { msp: 12000, unit: 'क्विंटल' },
    'मेथी': { msp: 6500, unit: 'क्विंटल' },
    'सौंफ': { msp: 8000, unit: 'क्विंटल' },
    'अजवाइन': { msp: 9000, unit: 'क्विंटल' },
    'काली मिर्च': { msp: 45000, unit: 'क्विंटल' },
    'इलायची': { msp: 100000, unit: 'क्विंटल' },
    'लौंग': { msp: 80000, unit: 'क्विंटल' },
    'दालचीनी': { msp: 50000, unit: 'क्विंटल' },
    'तेजपत्ता': { msp: 30000, unit: 'क्विंटल' },
    'सूखी मिर्च': { msp: 15000, unit: 'क्विंटल' }
  },
  'नकदी फसल': {
    'गन्ना': { msp: 315, unit: 'क्विंटल' },
    'कपास': { msp: 6620, unit: 'क्विंटल' },
    'जूट': { msp: 4750, unit: 'क्विंटल' },
    'तंबाकू': { msp: 5000, unit: 'क्विंटल' },
    'चाय': { msp: 3500, unit: 'क्विंटल' },
    'कॉफी': { msp: 8000, unit: 'क्विंटल' },
    'रबर': { msp: 15000, unit: 'क्विंटल' }
  },
  'चारा फसल': {
    'बरसीम': { msp: 800, unit: 'क्विंटल' },
    'रिजका': { msp: 900, unit: 'क्विंटल' },
    'ज्वार चारा': { msp: 700, unit: 'क्विंटल' },
    'मक्का चारा': { msp: 750, unit: 'क्विंटल' },
    'नेपियर घास': { msp: 600, unit: 'क्विंटल' }
  },
  'फूल': {
    'गुलाब': { msp: 5000, unit: 'क्विंटल' },
    'गेंदा': { msp: 3000, unit: 'क्विंटल' },
    'गुलदाउदी': { msp: 3500, unit: 'क्विंटल' },
    'रजनीगंधा': { msp: 4000, unit: 'क्विंटल' },
    'ग्लेडियोलस': { msp: 4500, unit: 'क्विंटल' },
    'कमल': { msp: 6000, unit: 'क्विंटल' }
  }
};

// Generate random prices based on MSP
const generatePrice = (msp: number) => {
  const variation = (Math.random() - 0.5) * 0.2; // -10% to +10%
  return Math.round(msp * (1 + variation));
};

const generateChange = () => {
  const change = (Math.random() - 0.5) * 10; // -5% to +5%
  return change;
};

export default function MandiPrices() {
  const [selectedState, setSelectedState] = useState('हरियाणा');
  const [selectedDistrict, setSelectedDistrict] = useState('करनाल');
  const [selectedCrop, setSelectedCrop] = useState('सभी');
  const [showGraph, setShowGraph] = useState(false);
  const [selectedCropForGraph, setSelectedCropForGraph] = useState<string | null>(null);

  const districts = statesAndDistricts[selectedState] || [];

  // Generate price history for last 30 days
  const generatePriceHistory = (baseMSP: number, cropName: string) => {
    const history = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate realistic price fluctuation
      const randomChange = (Math.random() - 0.5) * 0.15; // -7.5% to +7.5%
      const trendChange = Math.sin(i / 5) * 0.05; // Slight trend
      const price = Math.round(baseMSP * (1 + randomChange + trendChange));
      
      history.push({
        date: date.toLocaleDateString('hi-IN', { day: '2-digit', month: 'short' }),
        fullDate: date.toLocaleDateString('hi-IN'),
        price: price
      });
    }
    
    return history;
  };

  // Generate prices for selected district
  const generateMandiPrices = () => {
    const allPrices: any[] = [];
    
    Object.entries(cropPrices).forEach(([category, crops]) => {
      Object.entries(crops).forEach(([crop, data]) => {
        const price = generatePrice(data.msp);
        const change = generateChange();
        const trend = change > 0.5 ? 'up' : change < -0.5 ? 'down' : 'stable';
        
        allPrices.push({
          crop,
          category,
          market: selectedDistrict,
          price,
          change: change.toFixed(1),
          trend,
          msp: data.msp,
          unit: data.unit
        });
      });
    });
    
    return allPrices;
  };

  const prices = generateMandiPrices();
  
  const filteredPrices = selectedCrop === 'सभी' 
    ? prices 
    : prices.filter(p => p.crop === selectedCrop);

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'bg-green-100 text-green-800';
    if (trend === 'down') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const handleViewGraph = (cropName: string, category: string) => {
    setSelectedCropForGraph(cropName);
    setShowGraph(true);
  };

  const getGraphData = () => {
    if (!selectedCropForGraph) return null;
    
    // Find the crop's MSP
    let msp = 2000;
    Object.entries(cropPrices).forEach(([cat, crops]) => {
      Object.entries(crops).forEach(([crop, data]) => {
        if (crop === selectedCropForGraph) {
          msp = data.msp;
        }
      });
    });
    
    return generatePriceHistory(msp, selectedCropForGraph);
  };

  const graphData = getGraphData();
  const maxPrice = graphData ? Math.max(...graphData.map(d => d.price)) : 0;
  const minPrice = graphData ? Math.min(...graphData.map(d => d.price)) : 0;
  const priceRange = maxPrice - minPrice;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
          मंडी भाव
        </h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            <span>आज</span>
          </div>
        </div>
      </div>

      {/* State and District Selection */}
      <div className="mb-4 space-y-3">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">स्थान चुनें:</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-2">
              <span className="font-bold text-gray-800 bg-green-100 px-2 py-1 rounded text-base">राज्य</span>
            </label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict(statesAndDistricts[e.target.value][0]);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {Object.keys(statesAndDistricts).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">
              <span className="font-bold text-gray-800 bg-green-100 px-2 py-1 rounded text-base">जिला/मंडी</span>
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Crop Filter */}
        <div>
          <label className="block text-sm mb-2">
            <span className="font-bold text-gray-800 bg-green-100 px-2 py-1 rounded text-base">फसल चुनें</span>
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="सभी">सभी फसलें</option>
            
            <optgroup label="🌾 अनाज">
              {Object.keys(cropPrices['अनाज']).map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </optgroup>
            
            <optgroup label="🫘 दलहन">
              {Object.keys(cropPrices['दलहन']).map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </optgroup>
            
            <optgroup label="🌻 तिलहन">
              {Object.keys(cropPrices['तिलहन']).map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </optgroup>
            
            <optgroup label="🥬 सब्जियां">
              {Object.keys(cropPrices['सब्जियां']).map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </optgroup>
            
            <optgroup label="🍎 फल">
              {Object.keys(cropPrices['फल']).map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </optgroup>
            
            <optgroup label="🌶️ मसाले">
              {Object.keys(cropPrices['मसाले']).map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </optgroup>
            
            <optgroup label="💰 नकदी फसल">
              {Object.keys(cropPrices['नकदी फसल']).map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </optgroup>
            
            <optgroup label="🌿 चारा फसल">
              {Object.keys(cropPrices['चारा फसल']).map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </optgroup>
            
            <optgroup label="🌸 फूल">
              {Object.keys(cropPrices['फूल']).map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Prices List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredPrices.map((item, index) => (
          <div key={index} className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900">{item.crop}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-xs text-gray-500">बाजार भाव</p>
                <p className="font-bold text-green-700">₹{item.price}</p>
                <p className="text-xs text-gray-500">प्रति {item.unit}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">न्यूनतम समर्थन मूल्य</p>
                <p className="font-semibold text-gray-700">₹{item.msp}</p>
                <p className="text-xs text-gray-500">प्रति {item.unit}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">मंडी</p>
                <p className="font-semibold text-gray-700">{item.market}</p>
                <p className="text-xs text-gray-500">{selectedState}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Footer */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          <span className="font-semibold">नोट:</span> मंडी भाव दैनिक बदलते रहते हैं। 
          सटीक जानकारी के लिए अपनी स्थानीय मंडी से संपर्क करें या e-NAM पोर्टल देखें।
        </p>
      </div>
    </div>
  );
}
