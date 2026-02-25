'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, Keyboard } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'नमस्ते! मैं आपका AI किसान सहायक हूं। मैं खेती से जुड़े सवालों में आपकी मदद कर सकता हूं। 🌾' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showHindiKeyboard, setShowHindiKeyboard] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'hi-IN';
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Handle insert from Hindi keyboard
  const handleHindiInsert = (key: string) => {
    if (key === 'backspace') {
      setInput(prev => prev.slice(0, -1));
    } else if (key === '\n') {
      handleSend();
    } else {
      setInput(prev => prev + key);
    }
    inputRef.current?.focus();
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('गेहूं') || lowerMessage.includes('wheat'))
      return 'गेहूं रबी की प्रमुख फसल है। बुवाई: नवंबर-दिसंबर, कटाई: मार्च-अप्रैल। उपयुक्त तापमान: 20-25°C। दोमट मिट्टी सबसे अच्छी है। MSP: ₹2,125/क्विंटल।';
    if (lowerMessage.includes('धान') || lowerMessage.includes('चावल') || lowerMessage.includes('rice'))
      return 'धान खरीफ की मुख्य फसल है। बुवाई: जून-जुलाई, कटाई: अक्टूबर-नवंबर। पानी की अधिक आवश्यकता। MSP: ₹2,183/क्विंटल। उपयुक्त तापमान: 25-35°C।';
    if (lowerMessage.includes('मक्का') || lowerMessage.includes('corn'))
      return 'मक्का खरीफ और रबी दोनों में उगाई जा सकती है। बुवाई: जून-जुलाई या फरवरी-मार्च। 90-100 दिन में तैयार। MSP: ₹2,090/क्विंटल।';
    if (lowerMessage.includes('सरसों') || lowerMessage.includes('mustard'))
      return 'सरसों रबी की तिलहन फसल है। बुवाई: अक्टूबर-नवंबर, कटाई: फरवरी-मार्च। 120-150 दिन में तैयार। MSP: ₹5,650/क्विंटल।';
    if (lowerMessage.includes('आलू') || lowerMessage.includes('potato'))
      return 'आलू रबी की सब्जी फसल है। बुवाई: अक्टूबर-नवंबर, कटाई: जनवरी-फरवरी। ठंडी जलवायु उपयुक्त। 90-120 दिन में तैयार।';
    if (lowerMessage.includes('टमाटर') || lowerMessage.includes('tomato'))
      return 'टमाटर साल भर उगाया जा सकता है। रोपाई के 60-80 दिन बाद फल आना शुरू। नियमित सिंचाई जरूरी। बाजार मांग अच्छी।';
    if (lowerMessage.includes('प्याज') || lowerMessage.includes('onion'))
      return 'प्याज रबी और खरीफ दोनों में उगाई जाती है। 120-150 दिन में तैयार। भंडारण संभव। अच्छी कीमत मिलती है।';
    if (lowerMessage.includes('गन्ना') || lowerMessage.includes('sugarcane'))
      return 'गन्ना नकदी फसल है। 10-12 महीने में तैयार। अधिक पानी चाहिए। MSP: ₹315/क्विंटल। FRP के अनुसार भुगतान।';
    if (lowerMessage.includes('मौसम') || lowerMessage.includes('weather') || lowerMessage.includes('बारिश'))
      return 'मौसम की जानकारी के लिए "मौसम" सेक्शन देखें। वहां आपको 7 दिन का पूर्वानुमान और खेती सलाह मिलेगी।';
    if (lowerMessage.includes('भाव') || lowerMessage.includes('कीमत') || lowerMessage.includes('price') || lowerMessage.includes('मंडी'))
      return 'आज के ताजा मंडी भाव देखने के लिए "मंडी भाव" सेक्शन में जाएं। वहां 700+ जिलों के भाव उपलब्ध हैं।';
    if (lowerMessage.includes('रोग') || lowerMessage.includes('बीमारी') || lowerMessage.includes('disease') || lowerMessage.includes('कीट'))
      return 'फसल रोग की पहचान के लिए "रोग पहचान" सेक्शन देखें। वहां लक्षण, उपचार और रोकथाम की जानकारी है।';
    if (lowerMessage.includes('खाद') || lowerMessage.includes('उर्वरक') || lowerMessage.includes('fertilizer'))
      return 'मुख्य उर्वरक: यूरिया (नाइट्रोजन), DAP (फास्फोरस), MOP (पोटाश)। मिट्टी परीक्षण के अनुसार उपयोग करें। जैविक खाद भी फायदेमंद।';
    if (lowerMessage.includes('सिंचाई') || lowerMessage.includes('पानी') || lowerMessage.includes('irrigation'))
      return 'सिंचाई फसल के अनुसार करें। ड्रिप सिंचाई से 40-50% पानी बचता है। सुबह या शाम को सिंचाई करें।';
    if (lowerMessage.includes('पशु') || lowerMessage.includes('गाय') || lowerMessage.includes('भैंस') || lowerMessage.includes('livestock'))
      return 'पशुपालन की पूरी जानकारी के लिए "पशुपालन" सेक्शन देखें। वहां सभी पशुओं की नस्ल, कीमत और देखभाल की जानकारी है।';
    if (lowerMessage.includes('योजना') || lowerMessage.includes('सरकारी') || lowerMessage.includes('scheme') || lowerMessage.includes('सब्सिडी'))
      return 'सरकारी योजनाओं की जानकारी के लिए "सरकारी योजनाएं" सेक्शन देखें। PM-KISAN, फसल बीमा, KCC आदि योजनाएं उपलब्ध हैं।';
    if (lowerMessage.includes('लोन') || lowerMessage.includes('कर्ज') || lowerMessage.includes('loan'))
      return 'किसान क्रेडिट कार्ड (KCC) से 3 लाख तक का लोन मिलता है। 7% ब्याज दर। समय पर चुकाने पर 3% छूट। नजदीकी बैंक से संपर्क करें।';
    if (lowerMessage.includes('बीमा') || lowerMessage.includes('insurance'))
      return 'प्रधानमंत्री फसल बीमा योजना (PMFBY) में फसल नुकसान पर मुआवजा मिलता है। प्रीमियम: खरीफ 2%, रबी 1.5%। बुवाई के 10 दिन में आवेदन करें।';
    return 'मैं आपकी मदद करना चाहता हूं! आप मुझसे पूछ सकते हैं:\n• फसलों के बारे में (गेहूं, धान, मक्का आदि)\n• मौसम और सिंचाई\n• मंडी भाव और कीमतें\n• फसल रोग और उपचार\n• सरकारी योजनाएं\n• पशुपालन\n• खाद और उर्वरक';
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      const assistantMessage: Message = { role: 'assistant', content: aiResponse };
      setMessages(prev => [...prev, assistantMessage]);
      if (!isSpeaking) speak(aiResponse);
    }, 500);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Inline Hindi keyboard rows (compact version for chatbot)
  const hindiRows = [
    ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],
    ['क', 'ख', 'ग', 'घ', 'च', 'छ', 'ज', 'झ', 'ट', 'ठ', 'ड', 'ढ'],
    ['त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र'],
    ['ल', 'व', 'श', 'ष', 'स', 'ह', 'क्ष', 'त्र', 'ज्ञ', 'श्र', 'ऋ', 'ॐ'],
    ['ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ', 'ं', '्', '़'],
    ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९', ',', '.'],
  ];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 animate-bounce"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200"
          style={{ height: showHindiKeyboard ? '700px' : '600px', transition: 'height 0.3s ease' }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-t-2xl flex items-center justify-between flex-shrink-0">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold">AI किसान सहायक</h3>
                <p className="text-xs text-emerald-100">हमेशा आपकी मदद के लिए</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-emerald-600 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${message.role === 'user'
                      ? 'bg-emerald-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200'
                    }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Hindi On-Screen Keyboard Panel ── */}
          {showHindiKeyboard && (
            <div className="flex-shrink-0 border-t border-orange-200 bg-orange-50 p-2">
              <div className="space-y-1">
                {hindiRows.map((row, ri) => (
                  <div key={ri} className="flex justify-center gap-0.5 flex-wrap">
                    {row.map((key, ki) => (
                      <button
                        key={ki}
                        onMouseDown={(e) => { e.preventDefault(); handleHindiInsert(key); }}
                        className="px-2 py-1.5 bg-white border border-orange-300 rounded-md hover:bg-orange-100 active:bg-orange-200 active:scale-95 transition-all text-sm font-medium text-gray-800 shadow-sm min-w-[28px]"
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                ))}

                {/* Special keys */}
                <div className="flex justify-center gap-1 mt-1">
                  <button
                    onMouseDown={(e) => { e.preventDefault(); handleHindiInsert(' '); }}
                    className="px-10 py-1.5 bg-white border border-orange-300 rounded-md hover:bg-orange-100 active:bg-orange-200 text-sm font-medium text-gray-700 shadow-sm"
                  >
                    स्पेस
                  </button>
                  <button
                    onMouseDown={(e) => { e.preventDefault(); handleHindiInsert('backspace'); }}
                    className="px-3 py-1.5 bg-red-50 border border-red-300 rounded-md hover:bg-red-100 active:bg-red-200 text-sm font-medium text-red-700 shadow-sm"
                  >
                    ⌫
                  </button>
                  <button
                    onMouseDown={(e) => { e.preventDefault(); handleSend(); }}
                    className="px-3 py-1.5 bg-emerald-50 border border-emerald-300 rounded-md hover:bg-emerald-100 active:bg-emerald-200 text-sm font-medium text-emerald-700 shadow-sm"
                  >
                    भेजें ↵
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 bg-white rounded-b-2xl flex-shrink-0">
            {/* Toolbar */}
            <div className="flex items-center space-x-1 mb-2">
              {/* Hindi Keyboard Toggle */}
              <button
                onClick={() => setShowHindiKeyboard(v => !v)}
                title="हिंदी कीबोर्ड"
                className={`flex items-center space-x-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${showHindiKeyboard
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-orange-50 text-orange-600 border border-orange-300 hover:bg-orange-100'
                  }`}
              >
                <Keyboard className="w-4 h-4" />
                <span>हिंदी</span>
              </button>

              {/* Mic */}
              <button
                onClick={toggleListening}
                className={`p-1.5 rounded-lg transition-colors ${isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                title={isListening ? 'सुनना बंद करें' : 'बोलें'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Speaker */}
              <button
                onClick={isSpeaking ? stopSpeaking : () => speak(messages[messages.length - 1]?.content || '')}
                className={`p-1.5 rounded-lg transition-colors ${isSpeaking
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                title={isSpeaking ? 'बोलना बंद करें' : 'सुनें'}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Text input + Send */}
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="अपना सवाल पूछें..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-emerald-500 text-white p-2.5 rounded-full hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center mt-1.5">
              ⌨️ हिंदी • 🎤 बोलकर • ✍️ टाइप करके पूछें
            </p>
          </div>
        </div>
      )}
    </>
  );
}
