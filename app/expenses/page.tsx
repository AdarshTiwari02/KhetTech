'use client';

import ExpenseTracker from '@/components/dashboard/ExpenseTracker';

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">खर्च ट्रैकर</h1>
        <p className="text-gray-600">अपने खेती के खर्चों को ट्रैक और प्रबंधित करें</p>
      </div>
      
      <ExpenseTracker />
    </div>
  );
}
