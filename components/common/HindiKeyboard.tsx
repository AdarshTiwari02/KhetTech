'use client';

import { useState } from 'react';
import { Keyboard, X } from 'lucide-react';

interface HindiKeyboardProps {
  onInsert: (text: string) => void;
  onClose: () => void;
}

export default function HindiKeyboard({ onInsert, onClose }: HindiKeyboardProps) {
  const [shift, setShift] = useState(false);

  const hindiKeys = [
    ['ौ', 'ै', 'ा', 'ी', 'ू', 'ब', 'ह', 'ग', 'द', 'ज', 'ड', '़'],
    ['ो', 'े', '्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च', 'ट'],
    ['ॉ', 'ं', 'म', 'न', 'व', 'ल', 'स', ',', '.', 'य'],
    ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ'],
    ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ'],
    ['ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न'],
    ['प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श'],
    ['ष', 'स', 'ह', 'क्ष', 'त्र', 'ज्ञ', 'श्र', 'ऋ', 'ॐ'],
    ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']
  ];

  const handleKeyPress = (key: string) => {
    onInsert(key);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 p-4">
      <div className="bg-white rounded-t-2xl shadow-xl w-full max-w-4xl p-4 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Keyboard className="w-5 h-5 text-orange-600" />
            <h3 className="font-bold text-gray-900">हिंदी कीबोर्ड</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Keyboard */}
        <div className="space-y-2">
          {hindiKeys.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-1">
              {row.map((key, keyIndex) => (
                <button
                  key={keyIndex}
                  onClick={() => handleKeyPress(key)}
                  className="px-3 py-2 bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-300 rounded-lg hover:bg-gradient-to-b hover:from-orange-50 hover:to-orange-100 hover:border-orange-300 transition-all shadow-sm active:shadow-none active:translate-y-0.5 font-medium text-gray-800 min-w-[40px]"
                >
                  {key}
                </button>
              ))}
            </div>
          ))}

          {/* Special Keys Row */}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              onClick={() => onInsert(' ')}
              className="px-20 py-2 bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-300 rounded-lg hover:bg-gradient-to-b hover:from-orange-50 hover:to-orange-100 hover:border-orange-300 transition-all shadow-sm active:shadow-none active:translate-y-0.5 font-medium text-gray-800"
            >
              Space
            </button>
            <button
              onClick={() => onInsert('\n')}
              className="px-8 py-2 bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-300 rounded-lg hover:bg-gradient-to-b hover:from-orange-50 hover:to-orange-100 hover:border-orange-300 transition-all shadow-sm active:shadow-none active:translate-y-0.5 font-medium text-gray-800"
            >
              Enter
            </button>
            <button
              onClick={() => onInsert('backspace')}
              className="px-8 py-2 bg-gradient-to-b from-red-50 to-red-100 border border-red-300 rounded-lg hover:bg-gradient-to-b hover:from-red-100 hover:to-red-200 hover:border-red-400 transition-all shadow-sm active:shadow-none active:translate-y-0.5 font-medium text-red-800"
            >
              ⌫ Delete
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            💡 <strong>टिप:</strong> अक्षरों पर क्लिक करके हिंदी में टाइप करें। Space, Enter और Delete बटन का उपयोग करें।
          </p>
        </div>
      </div>
    </div>
  );
}
