'use client';

import { Award, CheckCircle, ExternalLink, Search } from 'lucide-react';
import { useState } from 'react';

const governmentSchemes = [
  {
    id: 1,
    name: 'पीएम-किसान सम्मान निधि योजना',
    description: 'सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की आर्थिक सहायता',
    benefits: '₹2,000 की तीन किस्तों में सालाना ₹6,000',
    eligibility: 'सभी भूमिधारक किसान परिवार',
    applyLink: 'https://pmkisan.gov.in/',
    category: 'आर्थिक सहायता'
  },
  {
    id: 2,
    name: 'प्रधानमंत्री फसल बीमा योजना',
    description: 'प्राकृतिक आपदाओं से फसल के नुकसान पर बीमा कवरेज',
    benefits: 'फसल नुकसान पर पूर्ण बीमा कवरेज',
    eligibility: 'सभी किसान (भूमिधारक और किरायेदार)',
    applyLink: 'https://pmfby.gov.in/',
    category: 'बीमा'
  },
  {
    id: 3,
    name: 'किसान क्रेडिट कार्ड योजना',
    description: 'किसानों को कम ब्याज दर पर ऋण सुविधा',
    benefits: '4% ब्याज दर पर ₹3 लाख तक का ऋण',
    eligibility: 'सभी किसान जिनके पास खेती योग्य भूमि है',
    applyLink: 'https://www.india.gov.in/spotlight/kisan-credit-card-scheme',
    category: 'ऋण'
  },
  {
    id: 4,
    name: 'प्रधानमंत्री कृषि सिंचाई योजना',
    description: 'सिंचाई सुविधाओं के विकास के लिए सहायता',
    benefits: 'ड्रिप और स्प्रिंकलर सिंचाई पर सब्सिडी',
    eligibility: 'सभी किसान',
    applyLink: 'https://pmksy.gov.in/',
    category: 'सिंचाई'
  },
  {
    id: 5,
    name: 'मृदा स्वास्थ्य कार्ड योजना',
    description: 'मिट्टी की गुणवत्ता की जांच और सुधार के लिए',
    benefits: 'मुफ्त मिट्टी परीक्षण और सिफारिशें',
    eligibility: 'सभी किसान',
    applyLink: 'https://soilhealth.dac.gov.in/',
    category: 'मिट्टी स्वास्थ्य'
  },
  {
    id: 6,
    name: 'पशुधन बीमा योजना',
    description: 'पशुओं की मृत्यु पर बीमा कवरेज',
    benefits: 'पशु की मृत्यु पर मुआवजा',
    eligibility: 'पशुपालक किसान',
    applyLink: 'https://dahd.nic.in/',
    category: 'पशुपालन'
  },
  {
    id: 7,
    name: 'राष्ट्रीय कृषि बाजार (e-NAM)',
    description: 'ऑनलाइन कृषि उत्पाद बाजार',
    benefits: 'बेहतर मूल्य और पारदर्शी व्यापार',
    eligibility: 'सभी किसान',
    applyLink: 'https://www.enam.gov.in/',
    category: 'बाजार'
  },
  {
    id: 8,
    name: 'प्रधानमंत्री किसान मानधन योजना',
    description: '60 वर्ष की आयु के बाद पेंशन योजना',
    benefits: '₹3,000 प्रति माह पेंशन',
    eligibility: '18-40 वर्ष के छोटे और सीमांत किसान',
    applyLink: 'https://maandhan.in/',
    category: 'पेंशन'
  },
  {
    id: 9,
    name: 'कृषि यंत्रीकरण योजना',
    description: 'कृषि उपकरणों की खरीद पर सब्सिडी',
    benefits: 'कृषि मशीनरी पर 40-50% सब्सिडी',
    eligibility: 'सभी किसान',
    applyLink: 'https://agrimachinery.nic.in/',
    category: 'यंत्रीकरण'
  },
  {
    id: 10,
    name: 'पीएम कुसुम योजना',
    description: 'सौर ऊर्जा पंप और ग्रिड कनेक्टेड सोलर पावर प्लांट',
    benefits: 'सोलर पंप पर 60% सब्सिडी',
    eligibility: 'सभी किसान',
    applyLink: 'https://pmkusum.mnre.gov.in/',
    category: 'ऊर्जा'
  }
];

export default function Schemes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('सभी');

  const categories = ['सभी', 'आर्थिक सहायता', 'बीमा', 'ऋण', 'सिंचाई', 'पेंशन', 'बाजार'];

  const filteredSchemes = governmentSchemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'सभी' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Award className="w-5 h-5 mr-2 text-purple-500" />
          सरकारी योजनाएं
        </h2>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="योजना खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
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

      {/* Schemes List */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <h3 className="font-bold text-gray-900">{scheme.name}</h3>
                </div>
                <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full mb-2">
                  {scheme.category}
                </span>
                <p className="text-sm text-gray-700 mb-2">{scheme.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">लाभ</p>
                <p className="text-sm font-semibold text-gray-900">{scheme.benefits}</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">पात्रता</p>
                <p className="text-sm font-semibold text-gray-900">{scheme.eligibility}</p>
              </div>
            </div>

            <a
              href={scheme.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              <span>अभी आवेदन करें</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>कोई योजना नहीं मिली</p>
        </div>
      )}
    </div>
  );
}