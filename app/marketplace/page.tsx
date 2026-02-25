'use client';

import Marketplace from '@/components/dashboard/Marketplace';

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">बाजार</h1>
        <p className="text-gray-600">खेती के उत्पाद और उपकरण खरीदें और बेचें</p>
      </div>
      
      <Marketplace />
    </div>
  );
}
