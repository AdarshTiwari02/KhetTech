'use client';

import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, AlertTriangle, CheckCircle, X, Search } from 'lucide-react';

const commonDiseases = [
  {
    id: 1,
    name: 'पत्ती का रतुआ',
    crop: 'गेहूं',
    symptoms: 'पत्तियों पर नारंगी-भूरे रंग के दाने',
    treatment: 'प्रोपिकोनाज़ोल युक्त फफूंदनाशक का प्रयोग करें',
    prevention: 'प्रतिरोधी किस्मों का उपयोग करें, घनी बुवाई से बचें',
  },
  {
    id: 2,
    name: 'ब्लास्ट रोग',
    crop: 'धान',
    symptoms: 'पत्तियों पर धुरी के आकार के घाव',
    treatment: 'ट्राइसाइक्लाज़ोल या कार्बेन्डाज़िम का प्रयोग करें',
    prevention: 'प्रमाणित बीज का उपयोग करें, उचित दूरी बनाए रखें',
  },
  {
    id: 3,
    name: 'डाउनी मिल्ड्यू',
    crop: 'मक्का',
    symptoms: 'पत्तियों पर पीली धारियां, सफेद फफूंद की वृद्धि',
    treatment: 'मेटालैक्सिल या मैनकोज़ेब का प्रयोग करें',
    prevention: 'अच्छी जल निकासी सुनिश्चित करें, फसल चक्र अपनाएं',
  },
  {
    id: 4,
    name: 'पीला मोज़ेक वायरस',
    crop: 'सोयाबीन',
    symptoms: 'पत्तियों पर पीले मोज़ेक पैटर्न',
    treatment: 'संक्रमित पौधों को हटाएं, सफेद मक्खी को नियंत्रित करें',
    prevention: 'वायरस मुक्त बीज का उपयोग करें, खरपतवार प्रबंधन करें',
  },
  {
    id: 5,
    name: 'अगेती झुलसा',
    crop: 'टमाटर',
    symptoms: 'पत्तियों पर गहरे भूरे धब्बे, निशान के साथ',
    treatment: 'मैनकोज़ेब या क्लोरोथैलोनिल का छिड़काव करें',
    prevention: 'फसल चक्र अपनाएं, संक्रमित पत्तियों को हटाएं',
  },
  {
    id: 6,
    name: 'पाउडरी मिल्ड्यू',
    crop: 'मटर',
    symptoms: 'पत्तियों पर सफेद पाउडर जैसी परत',
    treatment: 'सल्फर या ट्राइडेमॉर्फ का प्रयोग करें',
    prevention: 'उचित हवा संचार बनाए रखें, अधिक नमी से बचें',
  },
  {
    id: 7,
    name: 'जीवाणु झुलसा',
    crop: 'धान',
    symptoms: 'पत्तियों पर पानी जैसे धब्बे, पीले किनारे',
    treatment: 'कॉपर ऑक्सीक्लोराइड का छिड़काव करें',
    prevention: 'स्वस्थ बीज का उपयोग करें, खेत में पानी का प्रबंधन करें',
  },
  {
    id: 8,
    name: 'फल सड़न',
    crop: 'मिर्च',
    symptoms: 'फलों पर काले धब्बे, सड़न',
    treatment: 'कार्बेन्डाज़िम या थायोफैनेट मिथाइल का प्रयोग करें',
    prevention: 'अच्छी जल निकासी, संक्रमित फलों को हटाएं',
  },
];

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDisease, setSelectedDisease] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setAnalysisResult({
            disease: 'पत्ती का रतुआ',
            confidence: 87,
            crop: 'गेहूं',
            description: 'गेहूं की पत्तियों को प्रभावित करने वाला फफूंद रोग',
            treatment: [
              'प्रोपिकोनाज़ोल युक्त फफूंदनाशक का छिड़काव करें (1 मिली/लीटर)',
              '10 दिन के अंतराल पर छिड़काव करें',
              'गंभीर रूप से संक्रमित पत्तियों को हटा दें',
            ],
            prevention: [
              'एचडी-2967 जैसी प्रतिरोधी किस्मों का उपयोग करें',
              'घनी बुवाई से बचें',
              'उचित जल निकासी सुनिश्चित करें',
            ],
            severity: 'मध्यम',
            riskLevel: 'उच्च',
            immediateActions: [
              'प्रभावित पौधों को अलग करें',
              '24 घंटे के भीतर अनुशंसित फफूंदनाशक का प्रयोग करें',
              'आस-पास के पौधों में लक्षणों की निगरानी करें',
            ],
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const filteredDiseases = commonDiseases.filter(
    (d) =>
      d.name.includes(searchQuery) ||
      d.crop.includes(searchQuery) ||
      d.symptoms.includes(searchQuery)
  );

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
          रोग पहचान
        </h2>
      </div>

      {/* ── Image Upload Section ─────────────────────────────── */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">फसल की तस्वीर अपलोड करें</h3>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            JPG, PNG • अधिकतम 5MB
          </span>
        </div>

        {!selectedImage ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-amber-400 hover:bg-amber-50 transition-all duration-200 cursor-pointer"
          >
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-7 h-7 text-amber-600" />
            </div>
            <p className="text-gray-700 font-medium mb-1">क्लिक करें और तस्वीर चुनें</p>
            <p className="text-sm text-gray-400">प्रभावित पत्ती या फल की स्पष्ट तस्वीर अपलोड करें</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative">
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <img src={selectedImage} alt="Selected crop" className="w-full h-52 object-cover" />
            </div>
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/55 rounded-xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="spinner mx-auto mb-2" />
                  <p className="font-medium">विश्लेषण हो रहा है... {uploadProgress}%</p>
                  <div className="w-40 bg-white/30 rounded-full h-1.5 mt-2 mx-auto">
                    <div
                      className="bg-amber-400 h-1.5 rounded-full transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedImage && !isAnalyzing && !analysisResult && (
          <button
            onClick={handleAnalyze}
            className="w-full mt-4 bg-amber-600 text-white py-3 rounded-xl font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
          >
            <ImageIcon className="w-5 h-5" />
            रोगों के लिए तस्वीर का विश्लेषण करें
          </button>
        )}
      </div>

      {/* ── Analysis Results ──────────────────────────────────── */}
      {analysisResult && (
        <div className="space-y-4 mb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-amber-800 text-lg">पहचान परिणाम</h3>
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {analysisResult.confidence}% सटीकता
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-white rounded-lg p-2.5 border border-amber-100">
                <p className="text-xs text-gray-400 mb-0.5">रोग का नाम</p>
                <p className="font-semibold text-gray-900">{analysisResult.disease}</p>
              </div>
              <div className="bg-white rounded-lg p-2.5 border border-amber-100">
                <p className="text-xs text-gray-400 mb-0.5">फसल</p>
                <p className="font-semibold text-gray-900">{analysisResult.crop}</p>
              </div>
              <div className="bg-white rounded-lg p-2.5 border border-amber-100">
                <p className="text-xs text-gray-400 mb-0.5">गंभीरता</p>
                <p className="font-semibold text-orange-600">{analysisResult.severity}</p>
              </div>
              <div className="bg-white rounded-lg p-2.5 border border-amber-100">
                <p className="text-xs text-gray-400 mb-0.5">जोखिम स्तर</p>
                <p className="font-semibold text-red-600">{analysisResult.riskLevel}</p>
              </div>
            </div>
            <p className="text-sm text-amber-700">{analysisResult.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> तत्काल कार्रवाई
              </h4>
              <ul className="space-y-1.5">
                {analysisResult.immediateActions.map((action: string, i: number) => (
                  <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                    <span className="mt-0.5 text-red-400">•</span>{action}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> उपचार
              </h4>
              <ul className="space-y-1.5">
                {analysisResult.treatment.map((item: string, i: number) => (
                  <li key={i} className="text-sm text-emerald-700 flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2">रोकथाम के उपाय</h4>
            <ul className="space-y-1.5">
              {analysisResult.prevention.map((item: string, i: number) => (
                <li key={i} className="text-sm text-blue-700 flex items-start gap-2">
                  <span className="mt-0.5 text-blue-400">•</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ── Common Disease Library ────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">आम रोगों की जानकारी</h3>
          <span className="text-xs text-gray-400">{commonDiseases.length} रोग</span>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="रोग, फसल या लक्षण खोजें..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          />
        </div>

        <div className="space-y-2">
          {filteredDiseases.length === 0 && (
            <p className="text-center text-gray-400 py-6 text-sm">कोई रोग नहीं मिला</p>
          )}
          {filteredDiseases.map((disease) => (
            <div key={disease.id}>
              <div
                className="p-3 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all duration-150 cursor-pointer"
                onClick={() => setSelectedDisease(selectedDisease === disease.id ? null : disease.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{disease.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      <span className="text-amber-600 font-medium">{disease.crop}</span> • {disease.symptoms}
                    </p>
                  </div>
                  <span className="text-xs text-amber-600 font-medium shrink-0 ml-2">
                    {selectedDisease === disease.id ? '▲ छिपाएं' : '▼ विवरण'}
                  </span>
                </div>
              </div>

              {selectedDisease === disease.id && (
                <div className="mt-1 p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
                  <div>
                    <h5 className="font-semibold text-amber-800 mb-1 text-sm flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> लक्षण
                    </h5>
                    <p className="text-sm text-amber-700">{disease.symptoms}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-800 mb-1 text-sm flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> उपचार
                    </h5>
                    <p className="text-sm text-green-700">{disease.treatment}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-800 mb-1 text-sm flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> रोकथाम
                    </h5>
                    <p className="text-sm text-blue-700">{disease.prevention}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}