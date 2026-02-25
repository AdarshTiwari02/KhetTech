'use client';

import MandiPrices from '@/components/dashboard/MandiPrices';

export default function PricesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">मंडी भाव</h1>
        <p className="text-gray-600">अपनी फसलों के लिए वास्तविक समय बाजार भाव देखें</p>
      </div>
      
      <MandiPrices />
    </div>
  );
}
