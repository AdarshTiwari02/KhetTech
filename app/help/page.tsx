'use client';

import { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MessageCircle, HelpCircle, Send, X, User, Mic, MicOff, Volume2 } from 'lucide-react';

export default function HelpPage() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: number, text: string, sender: 'user' | 'support', time: string }>>([
    {
      id: 1,
      text: 'नमस्ते! खेतटेक में आपका स्वागत है। मैं आपकी कैसे मदद कर सकता हूं?',
      sender: 'support',
      time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'hi-IN'; // Hindi language

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setNewMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize Speech Synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (synthesisRef.current) {
      // Cancel any ongoing speech
      synthesisRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN'; // Hindi language
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthesisRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Greetings
    if (lowerMessage.includes('नमस्ते') || lowerMessage.includes('हेलो') || lowerMessage.includes('हाय')) {
      return 'नमस्ते! मैं आपकी खेती से जुड़े किसी भी सवाल में मदद कर सकता हूं। आप मुझसे फसल, खाद, पानी, रोग, योजना या मंडी भाव के बारे में पूछ सकते हैं।';
    }

    // Crop related
    if (lowerMessage.includes('गेहूं')) {
      return 'गेहूं की बुवाई नवंबर में करें। बीज दर 100 किलो प्रति हेक्टेयर। यूरिया 130 किलो, डीएपी 60 किलो प्रति हेक्टेयर डालें। 4-5 सिंचाई की जरूरत होती है। कटाई मार्च-अप्रैल में करें।';
    }
    if (lowerMessage.includes('धान') || lowerMessage.includes('चावल')) {
      return 'धान की रोपाई जून-जुलाई में करें। 25-30 दिन की पौध लगाएं। यूरिया 150 किलो, डीएपी 50 किलो प्रति हेक्टेयर। खेत में 2-3 इंच पानी रखें। कटाई अक्टूबर-नवंबर में करें।';
    }
    if (lowerMessage.includes('मक्का')) {
      return 'मक्का की बुवाई जून-जुलाई में करें। बीज दर 20-25 किलो प्रति हेक्टेयर। यूरिया 120 किलो, डीएपी 60 किलो डालें। 3-4 सिंचाई करें। कटाई सितंबर-अक्टूबर में करें।';
    }
    if (lowerMessage.includes('आलू')) {
      return 'आलू की बुवाई अक्टूबर-नवंबर में करें। बीज 25-30 क्विंटल प्रति हेक्टेयर। गोबर की खाद 20-25 टन डालें। 5-6 सिंचाई करें। कटाई फरवरी-मार्च में करें।';
    }
    if (lowerMessage.includes('टमाटर')) {
      return 'टमाटर की रोपाई सितंबर-अक्टूबर में करें। पौधों की दूरी 60x45 सेमी रखें। जैविक खाद और NPK उर्वरक डालें। नियमित सिंचाई करें। फल 60-70 दिन में तैयार होते हैं।';
    }
    if (lowerMessage.includes('प्याज')) {
      return 'प्याज की रोपाई नवंबर-दिसंबर में करें। पौधों की दूरी 15x10 सेमी। यूरिया 100 किलो, डीएपी 50 किलो प्रति हेक्टेयर। हल्की सिंचाई करें। कटाई मार्च-अप्रैल में करें।';
    }
    if (lowerMessage.includes('फसल') || lowerMessage.includes('बुवाई')) {
      return 'फसल चुनने से पहले: 1) मिट्टी की जांच करें 2) मौसम देखें 3) पानी की उपलब्धता जांचें 4) बाजार मांग देखें। कौन सी फसल के बारे में जानना चाहते हैं - गेहूं, धान, मक्का, आलू, टमाटर या प्याज?';
    }

    // Fertilizer
    if (lowerMessage.includes('खाद') || lowerMessage.includes('उर्वरक')) {
      return 'खाद के प्रकार: 1) जैविक - गोबर खाद, कम्पोस्ट, वर्मीकम्पोस्ट 2) रासायनिक - यूरिया (नाइट्रोजन), डीएपी (फास्फोरस), पोटाश। पहले मिट्टी परीक्षण करें, फिर जरूरत के अनुसार डालें। जैविक खाद ज्यादा फायदेमंद है।';
    }
    if (lowerMessage.includes('यूरिया')) {
      return 'यूरिया में 46% नाइट्रोजन होता है। पत्तियों की वृद्धि के लिए जरूरी है। बुवाई के 20-25 दिन बाद पहली बार डालें। दूसरी बार 40-45 दिन बाद। ज्यादा मात्रा में न डालें, नुकसान हो सकता है।';
    }
    if (lowerMessage.includes('डीएपी') || lowerMessage.includes('dap')) {
      return 'डीएपी में 18% नाइट्रोजन और 46% फास्फोरस होता है। जड़ों की मजबूती के लिए जरूरी है। बुवाई के समय मिट्टी में मिलाएं। 50-60 किलो प्रति हेक्टेयर डालें।';
    }

    // Irrigation
    if (lowerMessage.includes('पानी') || lowerMessage.includes('सिंचाई')) {
      return 'सिंचाई के तरीके: 1) ड्रिप सिंचाई - सबसे अच्छी, 50% पानी बचाती है 2) स्प्रिंकलर - अच्छी, 30% पानी बचाती है 3) फव्वारा सिंचाई। सुबह या शाम को सिंचाई करें। गर्मी में ज्यादा पानी दें।';
    }
    if (lowerMessage.includes('ड्रिप')) {
      return 'ड्रिप सिंचाई सबसे बेहतर है। फायदे: 1) 50% पानी की बचत 2) खाद के साथ दे सकते हैं 3) खरपतवार कम होते हैं 4) उपज 20-30% बढ़ती है। सरकार 60% सब्सिडी देती है। पीएम कुसुम योजना में आवेदन करें।';
    }

    // Disease and Pest
    if (lowerMessage.includes('रोग') || lowerMessage.includes('बीमारी')) {
      return 'आम फसल रोग: 1) पत्ती का रतुआ - नारंगी दाने 2) ब्लास्ट - धुरी के घाव 3) झुलसा - भूरे धब्बे। उपचार: फफूंदनाशक का छिड़काव करें। रोकथाम: स्वस्थ बीज, फसल चक्र, साफ-सफाई। हमारे रोग पहचान टूल का उपयोग करें।';
    }
    if (lowerMessage.includes('कीट') || lowerMessage.includes('कीड़े')) {
      return 'आम कीट: 1) तना छेदक 2) पत्ती खाने वाले 3) फल छेदक 4) सफेद मक्खी। उपचार: नीम का तेल, जैविक कीटनाशक। रासायनिक कीटनाशक सावधानी से उपयोग करें। नियमित निगरानी करें।';
    }

    // Government Schemes
    if (lowerMessage.includes('योजना') || lowerMessage.includes('सब्सिडी') || lowerMessage.includes('सरकारी')) {
      return 'मुख्य योजनाएं: 1) पीएम-किसान - ₹6000/साल 2) फसल बीमा - नुकसान पर मुआवजा 3) किसान क्रेडिट कार्ड - 4% ब्याज पर लोन 4) पीएम कुसुम - सोलर पंप पर 60% सब्सिडी। सरकारी योजनाएं सेक्शन में जाकर आवेदन करें।';
    }
    if (lowerMessage.includes('किसान') || lowerMessage.includes('pm-kisan')) {
      return 'पीएम-किसान योजना: सभी किसानों को ₹6000 प्रति वर्ष तीन किस्तों में। आवेदन: pmkisan.gov.in पर जाएं। जरूरी दस्तावेज: आधार कार्ड, बैंक खाता, जमीन के कागजात। हेल्पलाइन: 155261 या 011-24300606।';
    }
    if (lowerMessage.includes('बीमा') || lowerMessage.includes('फसल बीमा')) {
      return 'प्रधानमंत्री फसल बीमा योजना: प्राकृतिक आपदा से फसल नुकसान पर बीमा। प्रीमियम: खरीफ 2%, रबी 1.5%। आवेदन: pmfby.gov.in या नजदीकी बैंक। बुवाई के 10 दिन के अंदर आवेदन करें।';
    }
    if (lowerMessage.includes('लोन') || lowerMessage.includes('कर्ज') || lowerMessage.includes('क्रेडिट')) {
      return 'किसान क्रेडिट कार्ड: ₹3 लाख तक का लोन 4% ब्याज पर। समय पर चुकाने पर 3% ब्याज माफी। आवेदन: नजदीकी बैंक में जाएं। जरूरी: आधार, जमीन के कागजात, बैंक खाता।';
    }

    // Weather
    if (lowerMessage.includes('मौसम') || lowerMessage.includes('बारिश')) {
      return 'मौसम की जानकारी के लिए हमारे मौसम सेक्शन को देखें। बारिश से पहले: 1) जल निकासी की व्यवस्था करें 2) खड़ी फसल को सहारा दें 3) कीटनाशक न छिड़कें। मौसम अलर्ट के लिए SMS सेवा: 1800-180-1551।';
    }

    // Market Price
    if (lowerMessage.includes('कीमत') || lowerMessage.includes('भाव') || lowerMessage.includes('मंडी')) {
      return 'मंडी भाव देखने के लिए: 1) हमारे मंडी भाव सेक्शन में जाएं 2) agmarknet.gov.in पर देखें 3) e-NAM ऐप डाउनलोड करें। बेहतर मूल्य के लिए: सही समय पर बेचें, ग्रेडिंग करें, सीधे मंडी में बेचें।';
    }
    if (lowerMessage.includes('बेचना') || lowerMessage.includes('बिक्री')) {
      return 'फसल बेचने के तरीके: 1) मंडी में सीधे बेचें 2) e-NAM पोर्टल पर ऑनलाइन बेचें 3) FPO/सहकारी समिति के माध्यम से। MSP से कम में न बेचें। ग्रेडिंग करके बेचें, ज्यादा दाम मिलेगा।';
    }

    // Help and Support
    if (lowerMessage.includes('मदद') || lowerMessage.includes('सहायता') || lowerMessage.includes('हेल्प')) {
      return 'मैं आपकी मदद के लिए यहां हूं! आप मुझसे पूछ सकते हैं: फसल की बुवाई, खाद-उर्वरक, सिंचाई, रोग-कीट, सरकारी योजनाएं, मंडी भाव। विशेषज्ञ से बात करने के लिए: 1800-123-4567 पर कॉल करें।';
    }
    if (lowerMessage.includes('धन्यवाद') || lowerMessage.includes('थैंक्स')) {
      return 'आपका स्वागत है! खेती से जुड़ा कोई भी सवाल हो तो बेझिझक पूछें। मैं हमेशा आपकी मदद के लिए यहां हूं। शुभ खेती! 🌾';
    }

    // Default response
    return 'मैं आपकी मदद करना चाहता हूं। कृपया अपना सवाल और स्पष्ट करें। आप पूछ सकते हैं: फसल (गेहूं, धान, मक्का), खाद-उर्वरक, पानी-सिंचाई, रोग-कीट, सरकारी योजनाएं, मंडी भाव। या फोन करें: 1800-123-4567';
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user' as const,
      time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    const userText = newMessage;
    setNewMessage('');

    // Get AI response
    setTimeout(() => {
      const aiResponseText = getAIResponse(userText);
      const supportMessage = {
        id: messages.length + 2,
        text: aiResponseText,
        sender: 'support' as const,
        time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, supportMessage]);

      // Speak the response
      speakText(aiResponseText);
    }, 500);
  };

  const handleStartChat = () => {
    setShowChat(true);
    // Speak welcome message
    setTimeout(() => {
      speakText('नमस्ते! खेतटेक में आपका स्वागत है। मैं आपकी कैसे मदद कर सकता हूं?');
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">मदद और सहायता</h1>
        <p className="text-gray-600">अपनी खेती की जरूरतों के लिए सहायता प्राप्त करें</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Options */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">हमसे संपर्क करें</h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-emerald-50 rounded-lg">
              <Phone className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">फोन सहायता</h3>
                <p className="text-sm text-gray-600 mt-1">हमें 24/7 कॉल करें</p>
                <p className="text-lg font-bold text-emerald-600 mt-2">1800-123-4567</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">ईमेल सहायता</h3>
                <p className="text-sm text-gray-600 mt-1">हम 24 घंटे के भीतर जवाब देंगे</p>
                <p className="text-lg font-bold text-blue-600 mt-2">khettechofficial@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
              <MessageCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">लाइव चैट</h3>
                <p className="text-sm text-gray-600 mt-1">हमारी सहायता टीम से चैट करें</p>
                <button
                  onClick={handleStartChat}
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  चैट शुरू करें
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            <HelpCircle className="inline w-6 h-6 mr-2 text-emerald-600" />
            अक्सर पूछे जाने वाले प्रश्न
          </h2>

          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">मैं अपने खेत का विवरण कैसे जोड़ूं?</h3>
              <p className="text-sm text-gray-600">सेटिंग्स में जाएं और अपने खेत की जानकारी जैसे स्थान और आकार भरें।</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">फसल सुझाव कितने सटीक हैं?</h3>
              <p className="text-sm text-gray-600">हमारे सुझाव मिट्टी के प्रकार, मौसम डेटा और स्थानीय खेती प्रथाओं पर आधारित हैं।</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">क्या मैं कई खेतों को ट्रैक कर सकता हूं?</h3>
              <p className="text-sm text-gray-600">वर्तमान में, आप प्रति खाता एक खेत प्रबंधित कर सकते हैं। मल्टी-फार्म एक्सेस के लिए सहायता से संपर्क करें।</p>
            </div>

            <div className="pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">मैं बग की रिपोर्ट कैसे करूं?</h3>
              <p className="text-sm text-gray-600">आपके सामने आने वाली समस्या के विवरण के साथ हमें khettechofficial@gmail.com पर ईमेल करें।</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Modal */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">खेतटेक</h3>
                <p className="text-xs text-purple-100">ऑनलाइन</p>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="p-1 hover:bg-purple-500 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`p-3 rounded-lg ${message.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-br-none'
                        : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
                      }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {message.time}
                  </p>
                </div>
                {message.sender === 'support' && (
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex items-center space-x-2">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-2 rounded-lg transition-colors ${isListening
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                title={isListening ? 'बोलना बंद करें' : 'बोलना शुरू करें'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isListening ? 'सुन रहा हूं...' : 'अपना संदेश लिखें या बोलें...'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />

              <button
                onClick={isSpeaking ? stopSpeaking : handleSendMessage}
                disabled={!newMessage.trim() && !isSpeaking}
                className={`p-2 rounded-lg transition-colors ${isSpeaking
                    ? 'bg-orange-600 text-white'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isSpeaking ? 'बोलना बंद करें' : 'भेजें'}
              >
                {isSpeaking ? <Volume2 className="w-5 h-5" /> : <Send className="w-5 h-5" />}
              </button>
            </div>

            {isListening && (
              <div className="mt-2 text-center">
                <p className="text-xs text-red-600 font-medium animate-pulse">
                  🎤 सुन रहा हूं... कृपया बोलें
                </p>
              </div>
            )}

            {isSpeaking && (
              <div className="mt-2 text-center">
                <p className="text-xs text-orange-600 font-medium animate-pulse">
                  🔊 बोल रहा हूं...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
