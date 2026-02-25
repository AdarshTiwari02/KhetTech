# 🌾 खेतटेक (KhetTech)

एक comprehensive farming application जो किसानों को आधुनिक तकनीक से सशक्त बनाता है। पूरी तरह से हिंदी में।

## ✨ Features

### 🌦️ मौसम पूर्वानुमान
- Real-time weather data with OpenWeatherMap API
- Device location-based accurate forecasts
- Farming advice based on weather conditions
- Weather alerts and warnings

### 🌱 फसल सुझाव
- 65+ crops database (अनाज, दलहन, तिलहन, सब्जी, फल, मसाला)
- Season-wise recommendations (खरीफ, रबी, जायद, बारहमासी)
- Soil type filtering
- MSP (Minimum Support Price) information
- Yield and duration details

### 💰 मंडी भाव
- Live market prices for 700+ districts across India
- All states and districts covered
- MSP comparison
- Category-wise crop prices

### 🦠 रोग पहचान
- AI-based disease detection
- 8+ common crop diseases
- Symptoms, treatment, and prevention in Hindi
- Expandable detailed information

### 📅 फसल कैलेंडर
- 25+ crops with complete farming schedule
- Planting, fertilizer, irrigation, and harvesting timelines
- Category-wise organization
- Search and filter functionality

### 💵 खर्च ट्रैकर
- Income and expense management
- Real-time profit/loss calculation
- Monthly statistics
- Transaction history with categories
- LocalStorage persistence

### 🐄 पशुपालन प्रबंधन (Livestock Management)
- Complete information for all farming animals
- Dairy animals (गाय, भैंस, बकरी, भेड़)
- Meat production (ब्रॉयलर, बकरा, भेड़, सुअर, खरगोश)
- Egg production (लेयर मुर्गी, देसी मुर्गी, बत्तख, बटेर)
- Fish farming (रोहू, कतला, मृगल, कार्प)
- Beekeeping (मधुमक्खी पालन)
- Veterinary services and contacts
- Feed management information
- Insurance schemes
- Government schemes for livestock
- Training and best practices

### 🛒 बाजार (Marketplace)
- Buy and sell agricultural products
- Add advertisements with complete details
- 10+ categories (अनाज, सब्जी, उर्वरक, बीज, कीटनाशक, उपकरण, फल, दलहन, तिलहन, मसाला)
- Contact sellers directly
- Filter by type and category

### 📢 सरकारी योजनाएं
- 10+ government schemes for farmers
- Direct application links
- Eligibility and benefits information
- PM-KISAN, Fasal Bima, KCC, and more

### 💬 AI सहायक
- Voice-to-voice chat in Hindi
- Speech recognition and text-to-speech
- Comprehensive farming knowledge base
- 24/7 assistance

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Database:** MongoDB (ready for integration)
- **APIs:** OpenWeatherMap API
- **Authentication:** JWT-based (ready)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/adarsh0119/smartFarmerProject.git

# Navigate to project directory
cd smartFarmerProject

# Install dependencies
npm install

# Set up environment variables
# Copy .env.local and add your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Weather API
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key

# Database (Optional)
MONGODB_URI=your_mongodb_connection_string

# JWT Secret (Optional)
JWT_SECRET=your_jwt_secret_key
```

Get your free OpenWeatherMap API key from: https://openweathermap.org/api

## 📱 Features Overview

### For Guest Users
- View all features and information
- Access weather, crop recommendations, mandi prices
- Browse marketplace and government schemes
- No login required for basic features

### For Registered Users
- Save farm data and preferences
- Track expenses and income
- Personalized crop recommendations
- Store transaction history
- Access to all premium features

## 🌍 Coverage

- **States:** All 36 states and UTs of India
- **Districts:** 700+ districts
- **Crops:** 65+ varieties
- **Languages:** Hindi (primary), English support planned

## 📸 Screenshots

[Add screenshots of your application here]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Adarsh**
- GitHub: [@adarsh0119](https://github.com/adarsh0119)

## 🙏 Acknowledgments

- OpenWeatherMap for weather API
- All farmers who inspired this project
- Open source community

## 📞 Support

For support, email: [your-email@example.com] or create an issue in this repository.

---

Made with ❤️ for Indian Farmers 🇮🇳
