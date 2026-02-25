'use client';

import { useState } from 'react';
import { 
  Beef, Syringe, Apple, Milk, Shield, Store, Award, BookOpen,
  ChevronDown, ChevronUp, Phone, Egg, Fish, Bird
} from 'lucide-react';

const livestockCategories = [
  {
    id: 1,
    title: 'दुधारू पशु (Dairy Animals)',
    icon: Milk,
    color: 'blue',
    description: 'दूध उत्पादन के लिए पशु',
    animals: [
      { name: 'देसी गाय', breeds: ['साहीवाल', 'गिर', 'थारपारकर', 'राठी', 'हरियाणवी'], milk: '8-15 लीटर/दिन', price: '₹30,000-80,000' },
      { name: 'संकर गाय', breeds: ['जर्सी क्रॉस', 'HF क्रॉस', 'ब्राउन स्विस'], milk: '15-30 लीटर/दिन', price: '₹40,000-1,20,000' },
      { name: 'भैंस', breeds: ['मुर्रा', 'नीली रावी', 'जाफराबादी', 'मेहसाना'], milk: '10-18 लीटर/दिन', price: '₹60,000-2,00,000' },
      { name: 'बकरी', breeds: ['जमुनापारी', 'बीटल', 'बरबरी', 'सिरोही'], milk: '1-3 लीटर/दिन', price: '₹8,000-25,000' },
      { name: 'भेड़', breeds: ['मेरिनो', 'मारवाड़ी', 'नाली'], milk: '0.5-1 लीटर/दिन', price: '₹5,000-15,000' }
    ]
  },
  {
    id: 2,
    title: 'मांस उत्पादन (Meat Production)',
    icon: Beef,
    color: 'red',
    description: 'मांस के लिए पशुपालन',
    animals: [
      { name: 'ब्रॉयलर मुर्गी', breeds: ['कॉब', 'रॉस', 'हबर्ड'], production: '1.5-2 kg (6-7 सप्ताह)', price: '₹40-80/चूजा' },
      { name: 'बकरा', breeds: ['बोअर', 'सिरोही', 'ब्लैक बंगाल'], production: '25-40 kg (8-10 महीने)', price: '₹8,000-20,000' },
      { name: 'भेड़', breeds: ['दोर्पर', 'मंडया', 'बोनपाला'], production: '30-50 kg (10-12 महीने)', price: '₹6,000-18,000' },
      { name: 'सुअर', breeds: ['लार्ज व्हाइट', 'लैंड्रेस', 'हैम्पशायर'], production: '80-100 kg (6-8 महीने)', price: '₹3,000-8,000' },
      { name: 'खरगोश', breeds: ['न्यूजीलैंड व्हाइट', 'कैलिफोर्निया'], production: '2-3 kg (4-5 महीने)', price: '₹500-1,500' }
    ]
  },
  {
    id: 3,
    title: 'अंडा उत्पादन (Egg Production)',
    icon: Egg,
    color: 'amber',
    description: 'अंडे के लिए मुर्गी पालन',
    animals: [
      { name: 'लेयर मुर्गी', breeds: ['BV-300', 'HH-260', 'ILI-80'], production: '280-320 अंडे/वर्ष', price: '₹80-150/चूजा' },
      { name: 'देसी मुर्गी', breeds: ['कड़कनाथ', 'असील', 'चिटागोंग'], production: '100-150 अंडे/वर्ष', price: '₹200-500' },
      { name: 'बत्तख', breeds: ['खाकी कैंपबेल', 'इंडियन रनर'], production: '250-300 अंडे/वर्ष', price: '₹100-300' },
      { name: 'बटेर', breeds: ['जापानी', 'व्हाइट ब्रेस्टेड'], production: '280-300 अंडे/वर्ष', price: '₹20-40' }
    ]
  },
  {
    id: 4,
    title: 'मछली पालन (Fish Farming)',
    icon: Fish,
    color: 'cyan',
    description: 'मत्स्य पालन और जलीय कृषि',
    animals: [
      { name: 'रोहू', production: '1-1.5 kg (1 वर्ष)', price: '₹80-120/kg', benefits: ['तेज वृद्धि', 'उच्च मांग'] },
      { name: 'कतला', production: '1.5-2 kg (1 वर्ष)', price: '₹100-150/kg', benefits: ['बड़ी मछली', 'अच्छा स्वाद'] },
      { name: 'मृगल', production: '0.8-1.2 kg (1 वर्ष)', price: '₹70-100/kg', benefits: ['मिश्रित पालन', 'तालाब सफाई'] },
      { name: 'सिल्वर कार्प', production: '1-1.5 kg (1 वर्ष)', price: '₹60-90/kg', benefits: ['शाकाहारी', 'कम खर्च'] },
      { name: 'ग्रास कार्प', production: '2-3 kg (1 वर्ष)', price: '₹80-120/kg', benefits: ['खरपतवार नियंत्रण'] }
    ]
  },
  {
    id: 5,
    title: 'मधुमक्खी पालन (Beekeeping)',
    icon: Bird,
    color: 'yellow',
    description: 'शहद और मोम उत्पादन',
    animals: [
      { name: 'इटालियन मधुमक्खी', production: '25-40 kg शहद/बॉक्स/वर्ष', price: '₹2,500-4,000/बॉक्स', benefits: ['अधिक उत्पादन', 'कम आक्रामक'] },
      { name: 'देसी मधुमक्खी', production: '8-12 kg शहद/बॉक्स/वर्ष', price: '₹1,500-2,500/बॉक्स', benefits: ['स्थानीय अनुकूलन', 'औषधीय शहद'] }
    ]
  },
  {
    id: 6,
    title: 'पशु चिकित्सा सेवाएं',
    icon: Syringe,
    color: 'green',
    description: 'पशुओं के स्वास्थ्य की देखभाल',
    services: [
      { name: 'टीकाकरण', schedule: 'हर 6 महीने', cost: '₹50-200/पशु' },
      { name: 'डीवर्मिंग', schedule: 'हर 3 महीने', cost: '₹30-100/पशु' },
      { name: 'स्वास्थ्य जांच', schedule: 'मासिक', cost: '₹200-500' },
      { name: 'आपातकालीन सेवा', schedule: '24/7', cost: 'परामर्श आधारित' }
    ],
    contacts: [
      { name: 'पशु चिकित्सालय', phone: '1962' },
      { name: 'आपातकालीन सेवा', phone: '108' }
    ]
  },
  {
    id: 7,
    title: 'पशु आहार प्रबंधन',
    icon: Apple,
    color: 'emerald',
    description: 'संतुलित आहार और चारा योजना',
    feeds: [
      { name: 'हरा चारा', quantity: '25-30 किलो/दिन', cost: '₹2-3/किलो' },
      { name: 'सूखा चारा', quantity: '5-7 किलो/दिन', cost: '₹5-8/किलो' },
      { name: 'दाना मिश्रण', quantity: '2-4 किलो/दिन', cost: '₹20-30/किलो' },
      { name: 'खनिज मिश्रण', quantity: '50 ग्राम/दिन', cost: '₹100-150/किलो' }
    ]
  },
  {
    id: 8,
    title: 'दूध व्यापार',
    icon: Milk,
    color: 'indigo',
    description: 'दूध उत्पादन और बिक्री प्रबंधन',
    rates: [
      { type: 'गाय का दूध', rate: '₹45-55/लीटर', fat: '3.5-4.5%' },
      { type: 'भैंस का दूध', rate: '₹55-70/लीटर', fat: '6-8%' },
      { type: 'बकरी का दूध', rate: '₹80-100/लीटर', fat: '4-5%' }
    ],
    dairies: [
      { name: 'अमूल डेयरी', contact: '1800-258-3333' },
      { name: 'मदर डेयरी', contact: '1800-180-6455' }
    ]
  },
  {
    id: 9,
    title: 'पशु बीमा',
    icon: Shield,
    color: 'purple',
    description: 'पशुओं की सुरक्षा के लिए बीमा',
    schemes: [
      { name: 'पशुधन बीमा योजना', coverage: '₹50,000-2,00,000', premium: '₹500-2,000/वर्ष' },
      { name: 'डेयरी बीमा', coverage: '₹1,00,000-5,00,000', premium: '₹1,000-5,000/वर्ष' }
    ]
  },
  {
    id: 10,
    title: 'पशु बाजार',
    icon: Store,
    color: 'orange',
    description: 'पशु खरीदें और बेचें',
    info: 'स्थानीय पशु मेलों और बाजारों में पशु खरीद-बिक्री करें। पशु चिकित्सक से परामर्श लेकर ही खरीदें।'
  },
  {
    id: 11,
    title: 'सरकारी योजनाएं',
    icon: Award,
    color: 'rose',
    description: 'पशुपालन के लिए सरकारी सहायता',
    schemes: [
      { name: 'राष्ट्रीय गोकुल मिशन', benefit: 'देसी नस्ल संरक्षण', subsidy: '50-90% सब्सिडी' },
      { name: 'डेयरी उद्यमिता विकास योजना', benefit: 'डेयरी स्थापना', subsidy: '25-33% सब्सिडी' },
      { name: 'पशुधन बीमा योजना', benefit: 'बीमा प्रीमियम सब्सिडी', subsidy: '50% सब्सिडी' }
    ]
  },
  {
    id: 12,
    title: 'प्रशिक्षण और जानकारी',
    icon: BookOpen,
    color: 'teal',
    description: 'पशुपालन में सुधार के लिए ज्ञान',
    topics: [
      { title: 'दूध उत्पादन बढ़ाने के तरीके', points: ['संतुलित आहार', 'स्वच्छता', 'नियमित दुहाई'] },
      { title: 'बेहतर नस्ल चयन', points: ['स्थानीय जलवायु', 'दूध उत्पादन क्षमता', 'रोग प्रतिरोधक'] },
      { title: 'पशु स्वास्थ्य संकेत', points: ['भूख में कमी', 'दूध में गिरावट', 'असामान्य व्यवहार'] }
    ]
  }
];

export default function Livestock() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const getColorClasses = (color: string) => {
    const colors: any = {
      blue: 'from-blue-400 to-blue-600 border-blue-300',
      red: 'from-red-400 to-red-600 border-red-300',
      amber: 'from-amber-400 to-amber-600 border-amber-300',
      cyan: 'from-cyan-400 to-cyan-600 border-cyan-300',
      yellow: 'from-yellow-400 to-yellow-600 border-yellow-300',
      green: 'from-green-400 to-green-600 border-green-300',
      emerald: 'from-emerald-400 to-emerald-600 border-emerald-300',
      indigo: 'from-indigo-400 to-indigo-600 border-indigo-300',
      purple: 'from-purple-400 to-purple-600 border-purple-300',
      orange: 'from-orange-400 to-orange-600 border-orange-300',
      rose: 'from-rose-400 to-rose-600 border-rose-300',
      teal: 'from-teal-400 to-teal-600 border-teal-300'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Beef className="w-5 h-5 mr-2 text-blue-500" />
          पशुपालन प्रबंधन
        </h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        सभी प्रकार के पशुपालन की जानकारी - दुधारू पशु, मांस उत्पादन, अंडा उत्पादन, मछली पालन और मधुमक्खी पालन
      </p>

      <div className="space-y-4">
        {livestockCategories.map((category) => {
          const Icon = category.icon;
          const isExpanded = expandedSection === category.id;

          return (
            <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div
                className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 cursor-pointer"
                onClick={() => setExpandedSection(isExpanded ? null : category.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getColorClasses(category.color)} rounded-lg flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 bg-white">
                  {/* Animals List */}
                  {category.animals && (
                    <div className="space-y-3">
                      {category.animals.map((animal: any, index: number) => (
                        <div key={index} className={`p-4 bg-${category.color}-50 border border-${category.color}-200 rounded-lg`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{animal.name}</h4>
                            <span className="text-sm font-medium text-gray-700">{animal.price}</span>
                          </div>
                          {animal.breeds && (
                            <p className="text-sm text-gray-700 mb-1">
                              <span className="font-medium">नस्लें:</span> {animal.breeds.join(', ')}
                            </p>
                          )}
                          {animal.milk && (
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">दूध उत्पादन:</span> {animal.milk}
                            </p>
                          )}
                          {animal.production && (
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">उत्पादन:</span> {animal.production}
                            </p>
                          )}
                          {animal.benefits && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {animal.benefits.map((benefit: string, idx: number) => (
                                <span key={idx} className="text-xs bg-white px-2 py-1 rounded-full border">
                                  ✓ {benefit}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Services */}
                  {category.services && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">सेवाएं:</h4>
                        <div className="space-y-2">
                          {category.services.map((service: any, index: number) => (
                            <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-gray-900">{service.name}</p>
                                  <p className="text-sm text-gray-700">समय: {service.schedule}</p>
                                </div>
                                <span className="text-sm font-medium text-gray-700">{service.cost}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {category.contacts && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">आपातकालीन संपर्क:</h4>
                          <div className="space-y-2">
                            {category.contacts.map((contact: any, index: number) => (
                              <div key={index} className="p-3 bg-green-100 border border-green-300 rounded-lg flex items-center justify-between">
                                <span className="font-medium text-gray-900">{contact.name}</span>
                                <a href={`tel:${contact.phone}`} className="flex items-center space-x-2 text-green-700 hover:text-green-900">
                                  <Phone className="w-4 h-4" />
                                  <span className="font-semibold">{contact.phone}</span>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Feeds */}
                  {category.feeds && (
                    <div className="space-y-2">
                      {category.feeds.map((feed: any, index: number) => (
                        <div key={index} className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">{feed.name}</p>
                              <p className="text-sm text-gray-700">मात्रा: {feed.quantity}</p>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{feed.cost}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Rates */}
                  {category.rates && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">आज के दूध के रेट:</h4>
                        <div className="space-y-2">
                          {category.rates.map((rate: any, index: number) => (
                            <div key={index} className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-gray-900">{rate.type}</p>
                                  <p className="text-sm text-gray-700">वसा: {rate.fat}</p>
                                </div>
                                <span className="text-lg font-bold text-gray-900">{rate.rate}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {category.dairies && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">डेयरी संपर्क:</h4>
                          <div className="space-y-2">
                            {category.dairies.map((dairy: any, index: number) => (
                              <div key={index} className="p-3 bg-indigo-100 border border-indigo-300 rounded-lg flex items-center justify-between">
                                <span className="font-medium text-gray-900">{dairy.name}</span>
                                <a href={`tel:${dairy.contact}`} className="text-indigo-700 hover:text-indigo-900 font-semibold">
                                  {dairy.contact}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Schemes */}
                  {category.schemes && (
                    <div className="space-y-3">
                      {category.schemes.map((scheme: any, index: number) => (
                        <div key={index} className={`p-4 bg-${category.color}-50 border border-${category.color}-200 rounded-lg`}>
                          <h4 className="font-semibold text-gray-900 mb-2">{scheme.name}</h4>
                          <div className="space-y-1">
                            {scheme.benefit && (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">लाभ:</span> {scheme.benefit}
                              </p>
                            )}
                            {scheme.subsidy && (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">सब्सिडी:</span> {scheme.subsidy}
                              </p>
                            )}
                            {scheme.coverage && (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">कवरेज:</span> {scheme.coverage}
                              </p>
                            )}
                            {scheme.premium && (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">प्रीमियम:</span> {scheme.premium}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Topics */}
                  {category.topics && (
                    <div className="space-y-3">
                      {category.topics.map((topic: any, index: number) => (
                        <div key={index} className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">{topic.title}</h4>
                          <ul className="space-y-1">
                            {topic.points.map((point: string, idx: number) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start">
                                <span className="mr-2">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Info */}
                  {category.info && (
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-gray-700">{category.info}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          <span className="font-semibold">नोट:</span> पशुपालन में सफलता के लिए नियमित देखभाल, 
          संतुलित आहार और समय पर चिकित्सा सेवाएं बहुत जरूरी हैं। किसी भी समस्या के लिए 
          तुरंत पशु चिकित्सक से संपर्क करें।
        </p>
      </div>
    </div>
  );
}
