'use client';

import CropCalendar from '@/components/dashboard/CropCalendar';

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">फसल कैलेंडर</h1>
        <p className="text-gray-600">हमारे इंटरैक्टिव कैलेंडर के साथ अपनी खेती की गतिविधियों की योजना बनाएं</p>
      </div>
      
      <CropCalendar />
    </div>
  );
}
