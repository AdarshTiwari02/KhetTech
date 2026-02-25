'use client';

import { useState } from 'react';
import { RefreshCw, TrendingUp, Leaf, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

const cropRotationData = {
  'खरीफ': {
    'धान': {
      next: ['गेहूं', 'सरसों', 'चना', 'मटर', 'आलू'],
      benefits: 'धान के बाद रबी फसलें मिट्टी में नाइट्रोजन संतुलन बनाती हैं',
      avoid: ['धान', 'मक्का'],
      reason: 'लगातार धान से मिट्टी की उर्वरता कम होती है'
    },
    'मक्का': {
      next: ['गेहूं', 'चना', 'मटर', 'सरसों'],
      benefits: 'मक्का के बाद दलहन या तिलहन फसलें मिट्टी को समृद्ध करती हैं',
      avoid: ['मक्का', 'ज्वार'],
      reason: 'एक ही परिवार की फसलें रोग बढ़ाती हैं'
    },
    'कपास': {
      next: ['गेहूं', 'चना', 'सरसों', 'जौ'],
      benefits: 'कपास के बाद अनाज या दलहन मिट्टी संरचना सुधारती है',
      avoid: ['कपास', 'भिंडी'],
      reason: 'कपास परिवार की फसलें कीट समस्या बढ़ाती हैं'
    },
    'सोयाबीन': {
      next: ['गेहूं', 'चना', 'सरसों'],
      benefits: 'सोयाबीन नाइट्रोजन स्थिर करती है, अगली फसल को लाभ',
      avoid: ['मूंग', 'उड़द', 'अरहर'],
      reason: 'दलहन के बाद दलहन से रोग का खतरा'
    },
    'बाजरा': {
      next: ['चना', 'मटर', 'सरसों', 'गेहूं'],
      benefits: 'बाजरा सूखा सहनशील, मिट्टी को आराम देता है',
      avoid: ['बाजरा', 'ज्वार'],
      reason: 'मोटे अनाज बार-बार लगाने से पोषक तत्व कम होते हैं'
    }
  },
  'रबी': {
    'गेहूं': {
      next: ['धान', 'मक्का', 'कपास', 'सोयाबीन', 'मूंग'],
      benefits: 'गेहूं के बाद खरीफ फसलें मिट्टी में विविधता लाती हैं',
      avoid: ['गेहूं', 'जौ'],
      reason: 'लगातार गेहूं से खरपतवार और रोग बढ़ते हैं'
    },
    'चना': {
      next: ['धान', 'मक्का', 'कपास', 'गन्ना'],
      benefits: 'चना नाइट्रोजन जोड़ता है, अगली फसल को उर्वरक कम चाहिए',
      avoid: ['मटर', 'मसूर', 'अरहर'],
      reason: 'दलहन के बाद दलहन से जड़ रोग का खतरा'
    },
    'सरसों': {
      next: ['धान', 'मक्का', 'बाजरा', 'कपास'],
      benefits: 'सरसों की जड़ें गहरी, मिट्टी की संरचना सुधारती है',
      avoid: ['सरसों', 'तोरिया'],
      reason: 'तिलहन बार-बार लगाने से कीट समस्या'
    },
    'आलू': {
      next: ['धान', 'मक्का', 'कपास'],
      benefits: 'आलू के बाद अनाज फसलें मिट्टी को संतुलित करती हैं',
      avoid: ['टमाटर', 'बैंगन', 'मिर्च'],
      reason: 'सोलेनेसी परिवार की फसलें रोग फैलाती हैं'
    },
    'मटर': {
      next: ['धान', 'मक्का', 'गन्ना'],
      benefits: 'मटर नाइट्रोजन स्थिर करती है, मिट्टी उपजाऊ बनाती है',
      avoid: ['चना', 'मसूर', 'अरहर'],
      reason: 'दलहन रोटेशन से बचें'
    }
  },
  'जायद': {
    'मूंग': {
      next: ['धान', 'गेहूं', 'सरसों'],
      benefits: 'मूंग तेज फसल, मिट्टी में नाइट्रोजन जोड़ती है',
      avoid: ['उड़द', 'चना', 'अरहर'],
      reason: 'दलहन परिवार में रोटेशन जरूरी'
    },
    'उड़द': {
      next: ['धान', 'गेहूं', 'मक्का'],
      benefits: 'उड़द मिट्टी सुधारक, कम समय में तैयार',
      avoid: ['मूंग', 'चना', 'मटर'],
      reason: 'दलहन के बाद अनाज लगाएं'
    },
    'तरबूज': {
      next: ['धान', 'गेहूं', 'सब्जियां'],
      benefits: 'तरबूज के बाद कोई भी फसल ली जा सकती है',
      avoid: ['खरबूजा', 'ककड़ी'],
      reason: 'कुकुरबिट परिवार में रोटेशन करें'
    }
  }
};

const rotationBenefits = [
  {
    icon: Leaf,
    title: 'मिट्टी स्वास्थ्य',
    description: 'विभिन्न फसलें मिट्टी में पोषक तत्वों का संतुलन बनाती हैं'
  },
  {
    icon: TrendingUp,
    title: 'उत्पादन वृद्धि',
    description: 'सही रोटेशन से 15-20% तक उत्पादन बढ़ता है'
  },
  {
    icon: AlertCircle,
    title: 'रोग नियंत्रण',
    description: 'फसल बदलने से कीट और रोग कम होते हैं'
  },
  {
    icon: CheckCircle,
    title: 'लागत बचत',
    description: 'उर्वरक और कीटनाशक की जरूरत कम होती है'
  }
];

export default function CropRotationPlanner() {
  const [selectedSeason, setSelectedSeason] = useState<'खरीफ' | 'रबी' | 'जायद'>('खरीफ');
  const [selectedCrop, setSelectedCrop] = useState('धान');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const currentCropData = cropRotationData[selectedSeason][selectedCrop as keyof typeof cropRotationData[typeof selectedSeason]] as { next: string[], benefits: string, avoid: string[], reason: string };

  const handleGetRecommendations = () => {
    setShowRecommendations(true);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <RefreshCw className="w-5 h-5 mr-2 text-green-500" />
          फसल रोटेशन प्लानर
        </h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        सही फसल चक्र से मिट्टी की उर्वरता बढ़ाएं और उत्पादन बढ़ाएं
      </p>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {rotationBenefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div key={index} className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <Icon className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{benefit.title}</h3>
              <p className="text-xs text-gray-600">{benefit.description}</p>
            </div>
          );
        })}
      </div>

      {/* Selection Form */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">अपनी वर्तमान फसल चुनें</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              सीजन
            </label>
            <select
              value={selectedSeason}
              onChange={(e) => {
                setSelectedSeason(e.target.value as 'खरीफ' | 'रबी' | 'जायद');
                setShowRecommendations(false);
                const firstCrop = Object.keys(cropRotationData[e.target.value as 'खरीफ' | 'रबी' | 'जायद'])[0];
                setSelectedCrop(firstCrop);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="खरीफ">खरीफ (जून-अक्टूबर)</option>
              <option value="रबी">रबी (नवंबर-मार्च)</option>
              <option value="जायद">जायद (मार्च-जून)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              वर्तमान फसल
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => {
                setSelectedCrop(e.target.value);
                setShowRecommendations(false);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {Object.keys(cropRotationData[selectedSeason]).map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleGetRecommendations}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          अगली फसल के सुझाव देखें
        </button>
      </div>

      {/* Recommendations */}
      {showRecommendations && currentCropData && (
        <div className="space-y-4 animate-fadeIn">
          {/* Recommended Crops */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-300">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="font-bold text-green-900 text-lg">
                {selectedCrop} के बाद लगाएं
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
              {currentCropData.next.map((crop, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-green-200 text-center hover:shadow-md transition-shadow">
                  <ArrowRight className="w-5 h-5 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">{crop}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-green-700">लाभ:</span> {currentCropData.benefits}
              </p>
            </div>
          </div>

          {/* Crops to Avoid */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg border-2 border-red-300">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
              <h3 className="font-bold text-red-900 text-lg">
                इन फसलों से बचें
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
              {currentCropData.avoid.map((crop, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-red-200 text-center">
                  <p className="font-semibold text-red-700">❌ {crop}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded-lg border border-red-200">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-red-700">कारण:</span> {currentCropData.reason}
              </p>
            </div>
          </div>

          {/* General Tips */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center">
              <Leaf className="w-5 h-5 mr-2" />
              फसल रोटेशन के सामान्य नियम
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>दलहन के बाद अनाज लगाएं - मिट्टी में नाइट्रोजन बढ़ता है</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>गहरी जड़ वाली फसल के बाद उथली जड़ वाली फसल लगाएं</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>एक ही परिवार की फसलें लगातार न लगाएं</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>3-4 साल में फसल चक्र पूरा करें</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>हरी खाद की फसलें बीच में लगाएं (ढैंचा, सनई)</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Info Note */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <span className="font-semibold">नोट:</span> फसल रोटेशन से मिट्टी की उर्वरता बनी रहती है,
          रोग और कीट कम होते हैं, और उत्पादन लगातार अच्छा मिलता है। अपने क्षेत्र की जलवायु
          और मिट्टी के अनुसार फसल चुनें।
        </p>
      </div>
    </div>
  );
}
