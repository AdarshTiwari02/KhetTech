'use client';

import CropRecommendation from '@/components/dashboard/CropRecommendation';
import CropRotationPlanner from '@/components/dashboard/CropRotationPlanner';

export default function CropsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">फसल सुझाव</h1>
        <p className="text-gray-600">अपने स्थान और मिट्टी के प्रकार के आधार पर व्यक्तिगत फसल सुझाव प्राप्त करें</p>
      </div>
      
      <CropRotationPlanner />
      
      <CropRecommendation />
    </div>
  );
}
