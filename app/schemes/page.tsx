'use client';

import Schemes from '@/components/dashboard/Schemes';

export default function SchemesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">सरकारी योजनाएं</h1>
        <p className="text-gray-600">किसानों के लिए सरकारी योजनाओं और सब्सिडी का अन्वेषण करें</p>
      </div>
      
      <Schemes />
    </div>
  );
}
