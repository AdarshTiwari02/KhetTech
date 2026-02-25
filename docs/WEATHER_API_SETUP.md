# Weather API Setup Guide

## Overview
The KhetTech application uses OpenWeatherMap API for weather data. The location detection works independently using free services, so users will always see their location even if weather data is unavailable.

## Features
- **Location Detection**: Uses free Nominatim (OpenStreetMap) service - no API key needed
- **Weather Data**: Uses OpenWeatherMap API (requires free API key)
- **Fallback**: Location always displays even if weather API fails

## Getting Your Free OpenWeatherMap API Key

### Step 1: Sign Up
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" in the top right
3. Fill in your details and create an account
4. Verify your email address

### Step 2: Get API Key
1. Log in to your OpenWeatherMap account
2. Go to [API Keys](https://home.openweathermap.org/api_keys)
3. Your default API key will be shown
4. Copy the API key (it may take a few hours to activate)

### Step 3: Add to Environment Variables
1. Open `.env.local` file in your project root
2. Replace the placeholder with your actual API key:
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=your_actual_api_key_here
   ```
3. Save the file
4. Restart your development server

## Free Tier Limits
- **1,000 API calls per day**
- **60 API calls per minute**
- Perfect for development and small-scale production

## How It Works

### Location Detection (Always Works)
1. Browser requests user's GPS coordinates
2. Coordinates sent to Nominatim (free, no API key)
3. Returns city name and country
4. Displayed in header and weather card

### Weather Data (Requires API Key)
1. Uses coordinates to fetch weather from OpenWeatherMap
2. Shows temperature, humidity, wind speed, etc.
3. Provides farming advice based on conditions

### Error Handling
- If weather API fails: Location still displays with error message
- If geolocation denied: User can search for city manually
- If API key invalid: Shows clear error with instructions

## Development Mode
- Location detection works without any API key
- Weather data requires valid OpenWeatherMap API key
- All errors are logged to console for debugging

## Production Deployment
1. Get your OpenWeatherMap API key
2. Add to your hosting platform's environment variables:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment
   - Other: Add `NEXT_PUBLIC_WEATHER_API_KEY` to your platform

## Alternative Free Weather APIs
If you need alternatives to OpenWeatherMap:

1. **WeatherAPI.com** - 1M calls/month free
2. **Tomorrow.io** - 500 calls/day free
3. **Open-Meteo** - Unlimited, no API key needed

## Troubleshooting

### Location Not Showing
- Check browser console for geolocation errors
- Ensure HTTPS (geolocation requires secure context)
- Check if user denied location permission

### Weather Data Not Loading
- Verify API key is correct in `.env.local`
- Check if API key is activated (can take 1-2 hours)
- Verify you haven't exceeded free tier limits
- Check browser console for 401 errors

### API Key Not Working
- Wait 1-2 hours after creating account
- Regenerate API key from OpenWeatherMap dashboard
- Ensure `.env.local` file is in project root
- Restart development server after changing `.env.local`

## Support
- OpenWeatherMap Docs: https://openweathermap.org/api
- Nominatim Docs: https://nominatim.org/release-docs/latest/
