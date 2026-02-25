'use client';

import WeatherCard from '@/components/dashboard/WeatherCard';

export default function WeatherPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">मौसम पूर्वानुमान</h1>
        <p className="text-gray-600">विस्तृत मौसम जानकारी और खेती की सलाह प्राप्त करें</p>
      </div>
      
      <WeatherCard />
    </div>
  );
}
