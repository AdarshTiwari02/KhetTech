'use client';

import Header from '@/components/common/Header';
import Navigation from '@/components/common/Navigation';

export default function AnalyticsPage() {
  const monthlyData = [
    { month: 'Jan', income: 45000, expense: 28000 },
    { month: 'Feb', income: 52000, expense: 31000 },
    { month: 'Mar', income: 48000, expense: 29000 },
    { month: 'Apr', income: 61000, expense: 35000 }
  ];

  const totalIncome = monthlyData.reduce((sum, m) => sum + m.income, 0);
  const totalExpense = monthlyData.reduce((sum, m) => sum + m.expense, 0);
  const profit = totalIncome - totalExpense;
  const roi = ((profit / totalExpense) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Farm Analytics</h1>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-sm text-gray-600 mb-2">Total Income</h3>
            <p className="text-2xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="text-sm text-gray-600 mb-2">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-600">₹{totalExpense.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-sm text-gray-600 mb-2">Net Profit</h3>
            <p className="text-2xl font-bold text-blue-600">₹{profit.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-sm text-gray-600 mb-2">ROI</h3>
            <p className="text-2xl font-bold text-purple-600">{roi}%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>
          <div className="space-y-4">
            {monthlyData.map((data) => {
              const monthProfit = data.income - data.expense;
              return (
                <div key={data.month} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{data.month}</span>
                    <span className={`font-bold ${monthProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{monthProfit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-green-100 rounded-full h-6 flex items-center justify-center text-xs">
                      Income: ₹{data.income.toLocaleString()}
                    </div>
                    <div className="flex-1 bg-red-100 rounded-full h-6 flex items-center justify-center text-xs">
                      Expense: ₹{data.expense.toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Seeds & Fertilizers</span>
                <span className="font-semibold">35%</span>
              </div>
              <div className="flex justify-between">
                <span>Labor</span>
                <span className="font-semibold">28%</span>
              </div>
              <div className="flex justify-between">
                <span>Machinery</span>
                <span className="font-semibold">20%</span>
              </div>
              <div className="flex justify-between">
                <span>Irrigation</span>
                <span className="font-semibold">12%</span>
              </div>
              <div className="flex justify-between">
                <span>Others</span>
                <span className="font-semibold">5%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Income Sources</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Crop Sales</span>
                <span className="font-semibold">72%</span>
              </div>
              <div className="flex justify-between">
                <span>Livestock</span>
                <span className="font-semibold">18%</span>
              </div>
              <div className="flex justify-between">
                <span>Government Subsidies</span>
                <span className="font-semibold">7%</span>
              </div>
              <div className="flex justify-between">
                <span>Others</span>
                <span className="font-semibold">3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
}
