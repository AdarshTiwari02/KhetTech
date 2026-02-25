'use client';

import { useState } from 'react';
import { Calendar, Sprout, Droplets, Scissors, Search, ChevronDown, ChevronUp } from 'lucide-react';

const cropsCalendar = [
  {
    id: 1,
    name: 'गेहूं',
    category: 'अनाज',
    season: 'रबी',
    planting: {
      time: 'नवंबर - दिसंबर',
      details: 'बुवाई का सबसे अच्छा समय 15 नवंबर से 15 दिसंबर तक है। बीज दर: 100 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई के समय', details: 'डीएपी 60 किलो/हेक्टेयर, पोटाश 20 किलो/हेक्टेयर' },
      { time: '20-25 दिन बाद', details: 'यूरिया 65 किलो/हेक्टेयर (पहली टॉप ड्रेसिंग)' },
      { time: '40-45 दिन बाद', details: 'यूरिया 65 किलो/हेक्टेयर (दूसरी टॉप ड्रेसिंग)' }
    ],
    irrigation: [
      { time: '20-25 दिन बाद', details: 'पहली सिंचाई (CRI स्टेज)' },
      { time: '40-45 दिन बाद', details: 'दूसरी सिंचाई (टिलरिंग स्टेज)' },
      { time: '60-65 दिन बाद', details: 'तीसरी सिंचाई (जॉइंटिंग स्टेज)' },
      { time: '80-85 दिन बाद', details: 'चौथी सिंचाई (फ्लावरिंग स्टेज)' },
      { time: '100-105 दिन बाद', details: 'पांचवीं सिंचाई (दूध बनने की अवस्था)' }
    ],
    harvesting: {
      time: 'मार्च - अप्रैल',
      details: 'बुवाई के 120-140 दिन बाद। जब दाने सख्त हो जाएं और नमी 20-25% रह जाए।'
    }
  },
  {
    id: 2,
    name: 'धान',
    category: 'अनाज',
    season: 'खरीफ',
    planting: {
      time: 'जून - जुलाई',
      details: 'नर्सरी: मई के अंत। रोपाई: जून-जुलाई (25-30 दिन की पौध)। बीज दर: 20-25 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'रोपाई से पहले', details: 'गोबर की खाद 10-15 टन/हेक्टेयर' },
      { time: 'रोपाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 25 किलो/हेक्टेयर' },
      { time: '20-25 दिन बाद', details: 'यूरिया 75 किलो/हेक्टेयर (पहली टॉप ड्रेसिंग)' },
      { time: '40-45 दिन बाद', details: 'यूरिया 75 किलो/हेक्टेयर (दूसरी टॉप ड्रेसिंग)' }
    ],
    irrigation: [
      { time: 'रोपाई के बाद', details: 'खेत में 2-3 इंच पानी बनाए रखें' },
      { time: 'पूरे मौसम', details: 'लगातार पानी की आवश्यकता, सूखने न दें' },
      { time: 'कटाई से 10 दिन पहले', details: 'पानी बंद कर दें' }
    ],
    harvesting: {
      time: 'अक्टूबर - नवंबर',
      details: 'रोपाई के 90-120 दिन बाद। जब 80% दाने पक जाएं और पीले हो जाएं।'
    }
  },
  {
    id: 3,
    name: 'मक्का',
    category: 'अनाज',
    season: 'खरीफ',
    planting: {
      time: 'जून - जुलाई',
      details: 'बुवाई का सबसे अच्छा समय जून के अंत से जुलाई के पहले सप्ताह तक। बीज दर: 20-25 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई के समय', details: 'डीएपी 60 किलो/हेक्टेयर, पोटाश 20 किलो/हेक्टेयर' },
      { time: '25-30 दिन बाद', details: 'यूरिया 60 किलो/हेक्टेयर (पहली टॉप ड्रेसिंग)' },
      { time: '45-50 दिन बाद', details: 'यूरिया 60 किलो/हेक्टेयर (दूसरी टॉप ड्रेसिंग)' }
    ],
    irrigation: [
      { time: '20-25 दिन बाद', details: 'पहली सिंचाई (घुटने की ऊंचाई)' },
      { time: '40-45 दिन बाद', details: 'दूसरी सिंचाई (फूल आने से पहले)' },
      { time: '60-65 दिन बाद', details: 'तीसरी सिंचाई (दाना बनने की अवस्था)' }
    ],
    harvesting: {
      time: 'सितंबर - अक्टूबर',
      details: 'बुवाई के 80-100 दिन बाद। जब भुट्टे सूख जाएं और दाने सख्त हो जाएं।'
    }
  },
  {
    id: 4,
    name: 'गन्ना',
    category: 'नकदी फसल',
    season: 'बारहमासी',
    planting: {
      time: 'फरवरी - मार्च / अक्टूबर',
      details: 'वसंत: फरवरी-मार्च, शरद: अक्टूबर। बीज दर: 75,000-80,000 कलमें/हेक्टेयर'
    },
    fertilizer: [
      { time: 'रोपाई के समय', details: 'गोबर की खाद 25 टन/हेक्टेयर' },
      { time: 'रोपाई के समय', details: 'डीएपी 100 किलो/हेक्टेयर, पोटाश 60 किलो/हेक्टेयर' },
      { time: '30 दिन बाद', details: 'यूरिया 100 किलो/हेक्टेयर' },
      { time: '60 दिन बाद', details: 'यूरिया 100 किलो/हेक्टेयर' },
      { time: '90 दिन बाद', details: 'यूरिया 100 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'गर्मी में', details: 'हर 7-10 दिन में सिंचाई' },
      { time: 'सर्दी में', details: 'हर 15-20 दिन में सिंचाई' },
      { time: 'बरसात में', details: 'आवश्यकतानुसार' }
    ],
    harvesting: {
      time: 'दिसंबर - मार्च',
      details: 'रोपाई के 10-12 महीने बाद। जब गन्ना पूरी तरह पक जाए और मीठा हो जाए।'
    }
  },
  {
    id: 5,
    name: 'आलू',
    category: 'सब्जी',
    season: 'रबी',
    planting: {
      time: 'अक्टूबर - नवंबर',
      details: 'मैदानी क्षेत्र: अक्टूबर-नवंबर। बीज दर: 25-30 क्विंटल/हेक्टेयर'
    },
    fertilizer: [
      { time: 'रोपाई से पहले', details: 'गोबर की खाद 20-25 टन/हेक्टेयर' },
      { time: 'रोपाई के समय', details: 'डीएपी 80 किलो/हेक्टेयर, पोटाश 100 किलो/हेक्टेयर' },
      { time: '25-30 दिन बाद', details: 'यूरिया 100 किलो/हेक्टेयर (मिट्टी चढ़ाते समय)' }
    ],
    irrigation: [
      { time: 'रोपाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'हर 7-10 दिन में हल्की सिंचाई (5-6 सिंचाई)' },
      { time: 'कटाई से 10 दिन पहले', details: 'सिंचाई बंद कर दें' }
    ],
    harvesting: {
      time: 'फरवरी - मार्च',
      details: 'रोपाई के 90-120 दिन बाद। जब पत्तियां पीली पड़ने लगें।'
    }
  },
  {
    id: 6,
    name: 'टमाटर',
    category: 'सब्जी',
    season: 'रबी/खरीफ',
    planting: {
      time: 'सितंबर - अक्टूबर / फरवरी',
      details: 'नर्सरी: बुवाई से 25-30 दिन पहले। रोपाई: 25-30 दिन की पौध। दूरी: 60x45 सेमी'
    },
    fertilizer: [
      { time: 'रोपाई से पहले', details: 'गोबर की खाद 20 टन/हेक्टेयर' },
      { time: 'रोपाई के समय', details: 'डीएपी 60 किलो/हेक्टेयर, पोटाश 80 किलो/हेक्टेयर' },
      { time: '20 दिन बाद', details: 'यूरिया 50 किलो/हेक्टेयर' },
      { time: '40 दिन बाद', details: 'यूरिया 50 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'रोपाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'गर्मी में', details: 'हर 4-5 दिन में' },
      { time: 'सर्दी में', details: 'हर 7-10 दिन में' }
    ],
    harvesting: {
      time: 'रोपाई के 60-70 दिन बाद',
      details: 'जब फल पूरी तरह लाल हो जाएं। नियमित तुड़ाई करें (हर 3-4 दिन)।'
    }
  },
  {
    id: 7,
    name: 'प्याज',
    category: 'सब्जी',
    season: 'रबी',
    planting: {
      time: 'नवंबर - दिसंबर',
      details: 'नर्सरी: अक्टूबर-नवंबर। रोपाई: 45-50 दिन की पौध। दूरी: 15x10 सेमी'
    },
    fertilizer: [
      { time: 'रोपाई से पहले', details: 'गोबर की खाद 15-20 टन/हेक्टेयर' },
      { time: 'रोपाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 50 किलो/हेक्टेयर' },
      { time: '25-30 दिन बाद', details: 'यूरिया 50 किलो/हेक्टेयर' },
      { time: '50-55 दिन बाद', details: 'यूरिया 50 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'रोपाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'हर 7-10 दिन में हल्की सिंचाई' },
      { time: 'कटाई से 15 दिन पहले', details: 'सिंचाई बंद कर दें' }
    ],
    harvesting: {
      time: 'मार्च - अप्रैल',
      details: 'रोपाई के 120-150 दिन बाद। जब पत्तियां सूखने लगें और गिरने लगें।'
    }
  },
  {
    id: 8,
    name: 'मटर',
    category: 'सब्जी',
    season: 'रबी',
    planting: {
      time: 'अक्टूबर - नवंबर',
      details: 'मैदानी क्षेत्र: अक्टूबर-नवंबर। बीज दर: 80-100 किलो/हेक्टेयर। दूरी: 30x10 सेमी'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 10-15 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 40 किलो/हेक्टेयर, पोटाश 20 किलो/हेक्टेयर' },
      { time: '30 दिन बाद', details: 'यूरिया 20 किलो/हेक्टेयर (हल्की मात्रा)' }
    ],
    irrigation: [
      { time: 'बुवाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'फूल आने से पहले', details: 'दूसरी सिंचाई' },
      { time: 'फली बनते समय', details: 'तीसरी और चौथी सिंचाई (महत्वपूर्ण)' }
    ],
    harvesting: {
      time: 'दिसंबर - फरवरी',
      details: 'बुवाई के 60-70 दिन बाद। जब फलियां भर जाएं लेकिन कोमल हों।'
    }
  },
  {
    id: 9,
    name: 'बैंगन',
    category: 'सब्जी',
    season: 'खरीफ/रबी',
    planting: {
      time: 'जून - जुलाई / अक्टूबर',
      details: 'नर्सरी: बुवाई से 30-35 दिन पहले। रोपाई: 30-35 दिन की पौध। दूरी: 60x60 सेमी'
    },
    fertilizer: [
      { time: 'रोपाई से पहले', details: 'गोबर की खाद 20-25 टन/हेक्टेयर' },
      { time: 'रोपाई के समय', details: 'डीएपी 60 किलो/हेक्टेयर, पोटाश 50 किलो/हेक्टेयर' },
      { time: '25-30 दिन बाद', details: 'यूरिया 60 किलो/हेक्टेयर' },
      { time: '50-55 दिन बाद', details: 'यूरिया 60 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'रोपाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'गर्मी में', details: 'हर 5-7 दिन में' },
      { time: 'सर्दी में', details: 'हर 10-12 दिन में' }
    ],
    harvesting: {
      time: 'रोपाई के 100-120 दिन बाद',
      details: 'जब फल चमकदार और कोमल हों। नियमित तुड़ाई करें (हर 3-4 दिन)।'
    }
  },
  {
    id: 10,
    name: 'मिर्च',
    category: 'सब्जी',
    season: 'खरीफ',
    planting: {
      time: 'जून - जुलाई',
      details: 'नर्सरी: मई-जून। रोपाई: 30-40 दिन की पौध। दूरी: 45x45 सेमी'
    },
    fertilizer: [
      { time: 'रोपाई से पहले', details: 'गोबर की खाद 20 टन/हेक्टेयर' },
      { time: 'रोपाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 50 किलो/हेक्टेयर' },
      { time: '30 दिन बाद', details: 'यूरिया 50 किलो/हेक्टेयर' },
      { time: '60 दिन बाद', details: 'यूरिया 50 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'रोपाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'गर्मी में', details: 'हर 5-7 दिन में' },
      { time: 'बरसात में', details: 'आवश्यकतानुसार' }
    ],
    harvesting: {
      time: 'रोपाई के 120-150 दिन बाद',
      details: 'हरी मिर्च: जब फल पूरी तरह बढ़ जाएं। लाल मिर्च: जब पूरी तरह पक जाएं।'
    }
  },
  {
    id: 11,
    name: 'गोभी',
    category: 'सब्जी',
    season: 'रबी',
    planting: {
      time: 'सितंबर - अक्टूबर',
      details: 'नर्सरी: अगस्त-सितंबर। रोपाई: 25-30 दिन की पौध। दूरी: 45x45 सेमी'
    },
    fertilizer: [
      { time: 'रोपाई से पहले', details: 'गोबर की खाद 20-25 टन/हेक्टेयर' },
      { time: 'रोपाई के समय', details: 'डीएपी 60 किलो/हेक्टेयर, पोटाश 50 किलो/हेक्टेयर' },
      { time: '20-25 दिन बाद', details: 'यूरिया 60 किलो/हेक्टेयर' },
      { time: '40-45 दिन बाद', details: 'यूरिया 60 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'रोपाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'हर 7-10 दिन में नियमित सिंचाई' },
      { time: 'फूल बनते समय', details: 'नियमित नमी बनाए रखें' }
    ],
    harvesting: {
      time: 'दिसंबर - फरवरी',
      details: 'रोपाई के 70-90 दिन बाद। जब फूल कॉम्पैक्ट और सफेद हो जाएं।'
    }
  },
  {
    id: 12,
    name: 'भिंडी',
    category: 'सब्जी',
    season: 'खरीफ/जायद',
    planting: {
      time: 'फरवरी - मार्च / जून - जुलाई',
      details: 'जायद: फरवरी-मार्च, खरीफ: जून-जुलाई। बीज दर: 15-20 किलो/हेक्टेयर। दूरी: 45x30 सेमी'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 15-20 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 40 किलो/हेक्टेयर' },
      { time: '25-30 दिन बाद', details: 'यूरिया 50 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'बुवाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'गर्मी में', details: 'हर 4-5 दिन में' },
      { time: 'बरसात में', details: 'आवश्यकतानुसार' }
    ],
    harvesting: {
      time: 'बुवाई के 50-60 दिन बाद',
      details: 'जब फलियां 8-10 सेमी लंबी और कोमल हों। नियमित तुड़ाई (हर 2-3 दिन)।'
    }
  },
  {
    id: 13,
    name: 'सरसों',
    category: 'तिलहन',
    season: 'रबी',
    planting: {
      time: 'अक्टूबर - नवंबर',
      details: 'बुवाई का सबसे अच्छा समय अक्टूबर के मध्य से नवंबर के पहले सप्ताह तक। बीज दर: 5-6 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई के समय', details: 'डीएपी 40 किलो/हेक्टेयर, पोटाश 20 किलो/हेक्टेयर' },
      { time: '25-30 दिन बाद', details: 'यूरिया 40 किलो/हेक्टेयर (पहली टॉप ड्रेसिंग)' },
      { time: '50-55 दिन बाद', details: 'यूरिया 40 किलो/हेक्टेयर (दूसरी टॉप ड्रेसिंग)' }
    ],
    irrigation: [
      { time: '25-30 दिन बाद', details: 'पहली सिंचाई (शाखा बनते समय)' },
      { time: '50-55 दिन बाद', details: 'दूसरी सिंचाई (फूल आने से पहले)' },
      { time: '70-75 दिन बाद', details: 'तीसरी सिंचाई (फली बनते समय)' }
    ],
    harvesting: {
      time: 'फरवरी - मार्च',
      details: 'बुवाई के 120-140 दिन बाद। जब फलियां पीली पड़ जाएं और दाने सख्त हो जाएं।'
    }
  },
  {
    id: 14,
    name: 'चना',
    category: 'दलहन',
    season: 'रबी',
    planting: {
      time: 'अक्टूबर - नवंबर',
      details: 'बुवाई का सबसे अच्छा समय अक्टूबर के अंत से नवंबर के पहले सप्ताह तक। बीज दर: 80-100 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 8-10 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 40 किलो/हेक्टेयर, पोटाश 20 किलो/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'राइजोबियम कल्चर से बीज उपचार करें' }
    ],
    irrigation: [
      { time: '40-45 दिन बाद', details: 'पहली सिंचाई (फूल आने से पहले)' },
      { time: '70-75 दिन बाद', details: 'दूसरी सिंचाई (फली बनते समय - महत्वपूर्ण)' }
    ],
    harvesting: {
      time: 'मार्च - अप्रैल',
      details: 'बुवाई के 120-140 दिन बाद। जब पत्तियां पीली पड़ जाएं और फलियां सूख जाएं।'
    }
  },
  {
    id: 15,
    name: 'मूंग',
    category: 'दलहन',
    season: 'खरीफ/जायद',
    planting: {
      time: 'मार्च - अप्रैल / जून - जुलाई',
      details: 'जायद: मार्च-अप्रैल, खरीफ: जून-जुलाई। बीज दर: 20-25 किलो/हेक्टेयर। दूरी: 30x10 सेमी'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 5-8 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 30 किलो/हेक्टेयर, पोटाश 15 किलो/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'राइजोबियम कल्चर से बीज उपचार' }
    ],
    irrigation: [
      { time: 'बुवाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'फूल आने से पहले', details: 'दूसरी सिंचाई' },
      { time: 'फली बनते समय', details: 'तीसरी सिंचाई (महत्वपूर्ण)' }
    ],
    harvesting: {
      time: 'बुवाई के 60-70 दिन बाद',
      details: 'जब 70-80% फलियां पक जाएं और भूरी हो जाएं। 2-3 बार में तुड़ाई करें।'
    }
  },
  {
    id: 16,
    name: 'उड़द',
    category: 'दलहन',
    season: 'खरीफ',
    planting: {
      time: 'जून - जुलाई',
      details: 'बुवाई का सबसे अच्छा समय जून के अंत से जुलाई के पहले सप्ताह तक। बीज दर: 20-25 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 8-10 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 30 किलो/हेक्टेयर, पोटाश 15 किलो/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'राइजोबियम कल्चर से बीज उपचार' }
    ],
    irrigation: [
      { time: 'बुवाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'फूल आने से पहले', details: 'दूसरी सिंचाई' },
      { time: 'फली बनते समय', details: 'तीसरी सिंचाई' }
    ],
    harvesting: {
      time: 'सितंबर - अक्टूबर',
      details: 'बुवाई के 75-85 दिन बाद। जब फलियां काली पड़ जाएं और सूख जाएं।'
    }
  },
  {
    id: 17,
    name: 'अरहर',
    category: 'दलहन',
    season: 'खरीफ',
    planting: {
      time: 'जून - जुलाई',
      details: 'बुवाई का सबसे अच्छा समय जून के अंत से जुलाई के पहले सप्ताह तक। बीज दर: 15-20 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 10-12 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 40 किलो/हेक्टेयर, पोटाश 20 किलो/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'राइजोबियम कल्चर से बीज उपचार' }
    ],
    irrigation: [
      { time: 'फूल आने से पहले', details: 'पहली सिंचाई (यदि बारिश न हो)' },
      { time: 'फली बनते समय', details: 'दूसरी सिंचाई (महत्वपूर्ण)' },
      { time: 'दाना भरते समय', details: 'तीसरी सिंचाई' }
    ],
    harvesting: {
      time: 'दिसंबर - जनवरी',
      details: 'बुवाई के 150-180 दिन बाद। जब फलियां सूख जाएं और भूरी हो जाएं।'
    }
  },
  {
    id: 18,
    name: 'मूंगफली',
    category: 'तिलहन',
    season: 'खरीफ',
    planting: {
      time: 'जून - जुलाई',
      details: 'बुवाई का सबसे अच्छा समय जून के अंत से जुलाई के पहले सप्ताह तक। बीज दर: 100-120 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 10-15 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 40 किलो/हेक्टेयर' },
      { time: '30-35 दिन बाद', details: 'जिप्सम 200 किलो/हेक्टेयर (महत्वपूर्ण)' }
    ],
    irrigation: [
      { time: 'बुवाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'फूल आने से पहले', details: 'दूसरी सिंचाई' },
      { time: 'फली बनते समय', details: 'नियमित हल्की सिंचाई (हर 10-12 दिन)' }
    ],
    harvesting: {
      time: 'अक्टूबर - नवंबर',
      details: 'बुवाई के 120-140 दिन बाद। जब पत्तियां पीली पड़ जाएं और फलियां पक जाएं।'
    }
  },
  {
    id: 19,
    name: 'सोयाबीन',
    category: 'तिलहन',
    season: 'खरीफ',
    planting: {
      time: 'जून - जुलाई',
      details: 'बुवाई का सबसे अच्छा समय जून के अंत से जुलाई के पहले सप्ताह तक। बीज दर: 70-80 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 8-10 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 30 किलो/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'राइजोबियम कल्चर से बीज उपचार' }
    ],
    irrigation: [
      { time: 'फूल आने से पहले', details: 'पहली सिंचाई (यदि बारिश न हो)' },
      { time: 'फली बनते समय', details: 'दूसरी सिंचाई (महत्वपूर्ण)' },
      { time: 'दाना भरते समय', details: 'तीसरी सिंचाई' }
    ],
    harvesting: {
      time: 'सितंबर - अक्टूबर',
      details: 'बुवाई के 90-110 दिन बाद। जब पत्तियां पीली पड़ जाएं और फलियां सूख जाएं।'
    }
  },
  {
    id: 20,
    name: 'सूरजमुखी',
    category: 'तिलहन',
    season: 'रबी/खरीफ',
    planting: {
      time: 'फरवरी - मार्च / जुलाई - अगस्त',
      details: 'रबी: फरवरी-मार्च, खरीफ: जुलाई-अगस्त। बीज दर: 8-10 किलो/हेक्टेयर। दूरी: 60x30 सेमी'
    },
    fertilizer: [
      { time: 'बुवाई के समय', details: 'डीएपी 60 किलो/हेक्टेयर, पोटाश 40 किलो/हेक्टेयर' },
      { time: '25-30 दिन बाद', details: 'यूरिया 60 किलो/हेक्टेयर' },
      { time: '45-50 दिन बाद', details: 'यूरिया 60 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'बुवाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'हर 10-12 दिन में सिंचाई (4-5 सिंचाई)' },
      { time: 'फूल आने के समय', details: 'नियमित सिंचाई बनाए रखें' }
    ],
    harvesting: {
      time: 'बुवाई के 90-110 दिन बाद',
      details: 'जब फूल का पिछला भाग भूरा हो जाए और बीज सख्त हो जाएं।'
    }
  },
  {
    id: 21,
    name: 'कपास',
    category: 'नकदी फसल',
    season: 'खरीफ',
    planting: {
      time: 'मई - जून',
      details: 'बुवाई का सबसे अच्छा समय मई के मध्य से जून के पहले सप्ताह तक। बीज दर: 12-15 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 15-20 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 80 किलो/हेक्टेयर, पोटाश 50 किलो/हेक्टेयर' },
      { time: '30 दिन बाद', details: 'यूरिया 80 किलो/हेक्टेयर' },
      { time: '60 दिन बाद', details: 'यूरिया 80 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'बुवाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'हर 12-15 दिन में सिंचाई (6-8 सिंचाई)' },
      { time: 'फूल और टिंडे बनते समय', details: 'नियमित सिंचाई जरूरी' }
    ],
    harvesting: {
      time: 'अक्टूबर - दिसंबर',
      details: 'बुवाई के 150-180 दिन बाद। जब टिंडे खुल जाएं। 3-4 बार में तुड़ाई करें।'
    }
  },
  {
    id: 22,
    name: 'गाजर',
    category: 'सब्जी',
    season: 'रबी',
    planting: {
      time: 'अगस्त - सितंबर',
      details: 'बुवाई का सबसे अच्छा समय अगस्त के अंत से सितंबर तक। बीज दर: 5-6 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 20-25 टन/हेक्टेयर (अच्छी तरह सड़ी हुई)' },
      { time: 'बुवाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 80 किलो/हेक्टेयर' },
      { time: '30 दिन बाद', details: 'यूरिया 50 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'बुवाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'हर 5-7 दिन में हल्की सिंचाई' },
      { time: 'जड़ बनते समय', details: 'नियमित नमी बनाए रखें' }
    ],
    harvesting: {
      time: 'नवंबर - जनवरी',
      details: 'बुवाई के 90-110 दिन बाद। जब जड़ें पूरी तरह विकसित हो जाएं।'
    }
  },
  {
    id: 23,
    name: 'मूली',
    category: 'सब्जी',
    season: 'रबी/जायद',
    planting: {
      time: 'सितंबर - अक्टूबर / फरवरी - मार्च',
      details: 'रबी: सितंबर-अक्टूबर, जायद: फरवरी-मार्च। बीज दर: 8-10 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 15-20 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 40 किलो/हेक्टेयर, पोटाश 50 किलो/हेक्टेयर' },
      { time: '20 दिन बाद', details: 'यूरिया 40 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'बुवाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'हर 4-5 दिन में हल्की सिंचाई' },
      { time: 'जड़ बनते समय', details: 'नियमित नमी जरूरी' }
    ],
    harvesting: {
      time: 'बुवाई के 40-50 दिन बाद',
      details: 'जब जड़ें उचित आकार की हो जाएं। देर से तुड़ाई करने पर कड़ी हो जाती हैं।'
    }
  },
  {
    id: 24,
    name: 'पालक',
    category: 'सब्जी',
    season: 'रबी',
    planting: {
      time: 'सितंबर - फरवरी',
      details: 'बुवाई का सबसे अच्छा समय सितंबर से फरवरी तक। बीज दर: 25-30 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 15-20 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 40 किलो/हेक्टेयर' },
      { time: '20 दिन बाद', details: 'यूरिया 40 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'बुवाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'हर 5-7 दिन में हल्की सिंचाई' }
    ],
    harvesting: {
      time: 'बुवाई के 30-40 दिन बाद',
      details: 'जब पत्तियां 15-20 सेमी लंबी हो जाएं। 2-3 बार कटाई कर सकते हैं।'
    }
  },
  {
    id: 25,
    name: 'धनिया',
    category: 'सब्जी',
    season: 'रबी',
    planting: {
      time: 'अक्टूबर - नवंबर',
      details: 'बुवाई का सबसे अच्छा समय अक्टूबर से नवंबर तक। बीज दर: 20-25 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 10-15 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 30 किलो/हेक्टेयर' },
      { time: '25 दिन बाद', details: 'यूरिया 30 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'बुवाई के तुरंत बाद', details: 'हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'हर 7-10 दिन में हल्की सिंचाई' }
    ],
    harvesting: {
      time: 'फरवरी - मार्च',
      details: 'पत्ती के लिए: 30-40 दिन बाद। बीज के लिए: 100-120 दिन बाद।'
    }
  },
  {
    id: 26,
    name: 'बाजरा',
    category: 'अनाज',
    season: 'खरीफ',
    planting: {
      time: 'जून - जुलाई',
      details: 'बुवाई का सबसे अच्छा समय जून के अंत से जुलाई के पहले सप्ताह तक। बीज दर: 4-5 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 20 किलो/हेक्टेयर' },
      { time: '25-30 दिन बाद', details: 'यूरिया 50 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: '20-25 दिन बाद', details: 'पहली सिंचाई' },
      { time: '40-45 दिन बाद', details: 'दूसरी सिंचाई (फूल आने से पहले)' }
    ],
    harvesting: {
      time: 'सितंबर - अक्टूबर',
      details: 'बुवाई के 70-90 दिन बाद। जब बालियां पक जाएं।'
    }
  },
  {
    id: 27,
    name: 'ज्वार',
    category: 'अनाज',
    season: 'खरीफ',
    planting: {
      time: 'जून - जुलाई',
      details: 'बुवाई का सबसे अच्छा समय जून के अंत से जुलाई के पहले सप्ताह तक। बीज दर: 10-12 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 20 किलो/हेक्टेयर' },
      { time: '25-30 दिन बाद', details: 'यूरिया 50 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: '20-25 दिन बाद', details: 'पहली सिंचाई' },
      { time: '40-45 दिन बाद', details: 'दूसरी सिंचाई' }
    ],
    harvesting: {
      time: 'सितंबर - अक्टूबर',
      details: 'बुवाई के 100-120 दिन बाद। जब दाने सख्त हो जाएं।'
    }
  },
  {
    id: 28,
    name: 'जौ',
    category: 'अनाज',
    season: 'रबी',
    planting: {
      time: 'अक्टूबर - नवंबर',
      details: 'बुवाई का सबसे अच्छा समय अक्टूबर के अंत से नवंबर तक। बीज दर: 100 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 20 किलो/हेक्टेयर' },
      { time: '25-30 दिन बाद', details: 'यूरिया 50 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: '20-25 दिन बाद', details: 'पहली सिंचाई' },
      { time: '50-55 दिन बाद', details: 'दूसरी सिंचाई' }
    ],
    harvesting: {
      time: 'मार्च - अप्रैल',
      details: 'बुवाई के 120-140 दिन बाद। जब दाने पक जाएं।'
    }
  },
  {
    id: 29,
    name: 'मसूर',
    category: 'दलहन',
    season: 'रबी',
    planting: {
      time: 'अक्टूबर - नवंबर',
      details: 'बुवाई का सबसे अच्छा समय अक्टूबर के अंत से नवंबर तक। बीज दर: 30-35 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई के समय', details: 'डीएपी 40 किलो/हेक्टेयर, पोटाश 20 किलो/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'राइजोबियम कल्चर से बीज उपचार' }
    ],
    irrigation: [
      { time: '40-45 दिन बाद', details: 'पहली सिंचाई (फूल आने से पहले)' },
      { time: '70-75 दिन बाद', details: 'दूसरी सिंचाई (फली बनते समय)' }
    ],
    harvesting: {
      time: 'फरवरी - मार्च',
      details: 'बुवाई के 110-130 दिन बाद। जब फलियां सूख जाएं।'
    }
  },
  {
    id: 30,
    name: 'आम',
    category: 'फल',
    season: 'बारहमासी',
    planting: {
      time: 'जुलाई - अगस्त',
      details: 'रोपाई का सबसे अच्छा समय बरसात का मौसम। पौधों की दूरी: 10x10 मीटर'
    },
    fertilizer: [
      { time: 'फरवरी - मार्च', details: 'गोबर की खाद 50 किलो/पेड़, यूरिया 1 किलो, डीएपी 1 किलो' },
      { time: 'जून - जुलाई', details: 'यूरिया 500 ग्राम/पेड़' }
    ],
    irrigation: [
      { time: 'गर्मी में', details: 'हर 10-15 दिन में सिंचाई' },
      { time: 'सर्दी में', details: 'हर 20-25 दिन में सिंचाई' }
    ],
    harvesting: {
      time: 'मई - जुलाई',
      details: 'फल पकने पर तुड़ाई करें। किस्म के अनुसार समय अलग होता है।'
    }
  },
  {
    id: 31,
    name: 'केला',
    category: 'फल',
    season: 'बारहमासी',
    planting: {
      time: 'फरवरी - मार्च / जून - जुलाई',
      details: 'रोपाई: फरवरी-मार्च या जून-जुलाई। पौधों की दूरी: 2x2 मीटर'
    },
    fertilizer: [
      { time: 'रोपाई के समय', details: 'गोबर की खाद 10 किलो/गड्ढा' },
      { time: 'हर महीने', details: 'यूरिया 100 ग्राम, डीएपी 50 ग्राम, पोटाश 100 ग्राम/पौधा' }
    ],
    irrigation: [
      { time: 'गर्मी में', details: 'हर 4-5 दिन में सिंचाई' },
      { time: 'सर्दी में', details: 'हर 7-10 दिन में सिंचाई' }
    ],
    harvesting: {
      time: 'रोपाई के 11-13 महीने बाद',
      details: 'जब फल पूरी तरह विकसित हो जाएं लेकिन हरे हों।'
    }
  },
  {
    id: 32,
    name: 'हल्दी',
    category: 'मसाले',
    season: 'खरीफ',
    planting: {
      time: 'मई - जून',
      details: 'रोपाई का सबसे अच्छा समय मई-जून। बीज दर: 20-25 क्विंटल/हेक्टेयर'
    },
    fertilizer: [
      { time: 'रोपाई से पहले', details: 'गोबर की खाद 25-30 टन/हेक्टेयर' },
      { time: 'रोपाई के समय', details: 'डीएपी 60 किलो/हेक्टेयर, पोटाश 100 किलो/हेक्टेयर' },
      { time: '45 दिन बाद', details: 'यूरिया 100 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'रोपाई के बाद', details: 'तुरंत हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'हर 10-15 दिन में सिंचाई' }
    ],
    harvesting: {
      time: 'जनवरी - फरवरी',
      details: 'रोपाई के 7-9 महीने बाद। जब पत्तियां पीली पड़ जाएं।'
    }
  },
  {
    id: 33,
    name: 'अदरक',
    category: 'मसाले',
    season: 'खरीफ',
    planting: {
      time: 'अप्रैल - मई',
      details: 'रोपाई का सबसे अच्छा समय अप्रैल-मई। बीज दर: 15-20 क्विंटल/हेक्टेयर'
    },
    fertilizer: [
      { time: 'रोपाई से पहले', details: 'गोबर की खाद 25-30 टन/हेक्टेयर' },
      { time: 'रोपाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 100 किलो/हेक्टेयर' },
      { time: '45 दिन बाद', details: 'यूरिया 100 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'रोपाई के बाद', details: 'तुरंत हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'हर 7-10 दिन में सिंचाई' }
    ],
    harvesting: {
      time: 'दिसंबर - जनवरी',
      details: 'रोपाई के 8-9 महीने बाद। जब पत्तियां सूखने लगें।'
    }
  },
  {
    id: 34,
    name: 'लहसुन',
    category: 'मसाले',
    season: 'रबी',
    planting: {
      time: 'अक्टूबर - नवंबर',
      details: 'रोपाई का सबसे अच्छा समय अक्टूबर-नवंबर। बीज दर: 4-5 क्विंटल/हेक्टेयर'
    },
    fertilizer: [
      { time: 'रोपाई से पहले', details: 'गोबर की खाद 20-25 टन/हेक्टेयर' },
      { time: 'रोपाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 100 किलो/हेक्टेयर' },
      { time: '30 दिन बाद', details: 'यूरिया 100 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'रोपाई के बाद', details: 'तुरंत हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'हर 10-12 दिन में सिंचाई' }
    ],
    harvesting: {
      time: 'मार्च - अप्रैल',
      details: 'रोपाई के 140-150 दिन बाद। जब पत्तियां सूखने लगें।'
    }
  },
  {
    id: 35,
    name: 'खीरा',
    category: 'सब्जी',
    season: 'जायद',
    planting: {
      time: 'फरवरी - मार्च',
      details: 'बुवाई का सबसे अच्छा समय फरवरी-मार्च। बीज दर: 2-3 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 20-25 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 50 किलो/हेक्टेयर' },
      { time: '25 दिन बाद', details: 'यूरिया 50 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'बुवाई के बाद', details: 'तुरंत हल्की सिंचाई' },
      { time: 'गर्मी में', details: 'हर 3-4 दिन में सिंचाई' }
    ],
    harvesting: {
      time: 'बुवाई के 50-60 दिन बाद',
      details: 'जब फल कोमल और हरे हों। नियमित तुड़ाई करें।'
    }
  },
  {
    id: 36,
    name: 'लौकी',
    category: 'सब्जी',
    season: 'जायद/खरीफ',
    planting: {
      time: 'फरवरी - मार्च / जून - जुलाई',
      details: 'जायद: फरवरी-मार्च, खरीफ: जून-जुलाई। बीज दर: 4-5 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 20-25 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 50 किलो/हेक्टेयर' },
      { time: '25 दिन बाद', details: 'यूरिया 50 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'बुवाई के बाद', details: 'तुरंत हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'हर 4-5 दिन में सिंचाई' }
    ],
    harvesting: {
      time: 'बुवाई के 60-70 दिन बाद',
      details: 'जब फल कोमल हों। नियमित तुड़ाई करें (हर 2-3 दिन)।'
    }
  },
  {
    id: 37,
    name: 'करेला',
    category: 'सब्जी',
    season: 'जायद/खरीफ',
    planting: {
      time: 'फरवरी - मार्च / जून - जुलाई',
      details: 'जायद: फरवरी-मार्च, खरीफ: जून-जुलाई। बीज दर: 4-5 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई से पहले', details: 'गोबर की खाद 20-25 टन/हेक्टेयर' },
      { time: 'बुवाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 50 किलो/हेक्टेयर' },
      { time: '25 दिन बाद', details: 'यूरिया 50 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'बुवाई के बाद', details: 'तुरंत हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'हर 4-5 दिन में सिंचाई' }
    ],
    harvesting: {
      time: 'बुवाई के 60-70 दिन बाद',
      details: 'जब फल हरे और कोमल हों। नियमित तुड़ाई करें।'
    }
  },
  {
    id: 38,
    name: 'तिल',
    category: 'तिलहन',
    season: 'खरीफ',
    planting: {
      time: 'जून - जुलाई',
      details: 'बुवाई का सबसे अच्छा समय जून के अंत से जुलाई तक। बीज दर: 3-4 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई के समय', details: 'डीएपी 40 किलो/हेक्टेयर, पोटाश 20 किलो/हेक्टेयर' },
      { time: '25-30 दिन बाद', details: 'यूरिया 40 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: '20-25 दिन बाद', details: 'पहली सिंचाई' },
      { time: '40-45 दिन बाद', details: 'दूसरी सिंचाई (फूल आने से पहले)' }
    ],
    harvesting: {
      time: 'सितंबर - अक्टूबर',
      details: 'बुवाई के 90-100 दिन बाद। जब फलियां पीली पड़ जाएं।'
    }
  },
  {
    id: 39,
    name: 'अलसी',
    category: 'तिलहन',
    season: 'रबी',
    planting: {
      time: 'अक्टूबर - नवंबर',
      details: 'बुवाई का सबसे अच्छा समय अक्टूबर के अंत से नवंबर तक। बीज दर: 25-30 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई के समय', details: 'डीएपी 40 किलो/हेक्टेयर, पोटाश 20 किलो/हेक्टेयर' },
      { time: '25-30 दिन बाद', details: 'यूरिया 40 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: '30-35 दिन बाद', details: 'पहली सिंचाई' },
      { time: '60-65 दिन बाद', details: 'दूसरी सिंचाई (फूल आने से पहले)' }
    ],
    harvesting: {
      time: 'मार्च - अप्रैल',
      details: 'बुवाई के 120-140 दिन बाद। जब फलियां सूख जाएं।'
    }
  },
  {
    id: 40,
    name: 'जूट',
    category: 'नकदी फसल',
    season: 'खरीफ',
    planting: {
      time: 'मार्च - अप्रैल',
      details: 'बुवाई का सबसे अच्छा समय मार्च-अप्रैल। बीज दर: 5-6 किलो/हेक्टेयर'
    },
    fertilizer: [
      { time: 'बुवाई के समय', details: 'डीएपी 50 किलो/हेक्टेयर, पोटाश 30 किलो/हेक्टेयर' },
      { time: '25-30 दिन बाद', details: 'यूरिया 80 किलो/हेक्टेयर' }
    ],
    irrigation: [
      { time: 'बुवाई के बाद', details: 'तुरंत हल्की सिंचाई' },
      { time: 'पूरे मौसम', details: 'आवश्यकतानुसार सिंचाई' }
    ],
    harvesting: {
      time: 'जुलाई - अगस्त',
      details: 'बुवाई के 120-150 दिन बाद। जब फूल आने लगें।'
    }
  }
];

export default function CropCalendar() {
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('सभी');

  const categories = ['सभी', 'अनाज', 'सब्जी', 'नकदी फसल', 'दलहन', 'तिलहन', 'फल', 'मसाले'];

  const filteredCrops = cropsCalendar.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'सभी' || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          फसल कैलेंडर
        </h2>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="फसल खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Crops List */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {filteredCrops.map((crop) => (
          <div key={crop.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div
              className="p-4 bg-gradient-to-r from-blue-50 to-green-50 cursor-pointer hover:from-blue-100 hover:to-green-100 transition-colors"
              onClick={() => setSelectedCrop(selectedCrop === crop.id ? null : crop.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Sprout className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">{crop.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        {crop.category}
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        {crop.season}
                      </span>
                    </div>
                  </div>
                </div>
                {selectedCrop === crop.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </div>
            </div>

            {selectedCrop === crop.id && (
              <div className="p-4 bg-white space-y-4">
                {/* Planting */}
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sprout className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-green-800">बुवाई/रोपाई</h4>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{crop.planting.time}</p>
                  <p className="text-sm text-gray-700">{crop.planting.details}</p>
                </div>

                {/* Fertilizer */}
                <div className="border-l-4 border-amber-500 pl-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-5 h-5 text-amber-600">🌾</div>
                    <h4 className="font-bold text-amber-800">खाद/उर्वरक</h4>
                  </div>
                  <div className="space-y-2">
                    {crop.fertilizer.map((fert, index) => (
                      <div key={index} className="bg-amber-50 p-2 rounded">
                        <p className="text-sm font-semibold text-amber-900">{fert.time}</p>
                        <p className="text-sm text-amber-700">{fert.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Irrigation */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-blue-800">सिंचाई</h4>
                  </div>
                  <div className="space-y-2">
                    {crop.irrigation.map((irr, index) => (
                      <div key={index} className="bg-blue-50 p-2 rounded">
                        <p className="text-sm font-semibold text-blue-900">{irr.time}</p>
                        <p className="text-sm text-blue-700">{irr.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Harvesting */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Scissors className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-purple-800">कटाई</h4>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{crop.harvesting.time}</p>
                  <p className="text-sm text-gray-700">{crop.harvesting.details}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>कोई फसल नहीं मिली</p>
        </div>
      )}
    </div>
  );
}
