'use client';

import DiseaseDetection from '@/components/dashboard/DiseaseDetection';

export default function DiseasesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">रोग पहचान</h1>
        <p className="text-gray-600">फसल की तस्वीरें अपलोड करें और रोगों की पहचान करें तथा उपचार सुझाव प्राप्त करें</p>
      </div>
      
      <DiseaseDetection />
    </div>
  );
}
