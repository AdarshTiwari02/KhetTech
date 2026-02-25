import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  category: {
    type: String,
    enum: [
      'seeds', 'fertilizer', 'pesticides', 'labor', 'irrigation', 
      'machinery', 'transport', 'storage', 'market_fees', 'loan_interest',
      'crop_sale', 'government_subsidy', 'other_income', 'other_expense'
    ],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  crop: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    min: 0
  },
  unit: {
    type: String,
    enum: ['kg', 'quintal', 'ton', 'acre', 'hectare', 'piece', 'hour', 'day', 'litre']
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank_transfer', 'upi', 'cheque', 'credit']
  },
  attachments: [{
    url: String,
    name: String,
    type: String
  }],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for faster queries
ExpenseSchema.index({ userId: 1, date: -1 });
ExpenseSchema.index({ userId: 1, type: 1 });
ExpenseSchema.index({ userId: 1, category: 1 });

export const Expense = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);