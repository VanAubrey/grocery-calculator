'use client';

import React, { useState } from 'react';
import { CurrencyDollarIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface BudgetInputProps {
  onSetBudget: (budget: number) => void;
  currentBudget: number;
  onCancel?: () => void;
}

export default function BudgetInput({ onSetBudget, currentBudget, onCancel }: BudgetInputProps) {
  const [budgetValue, setBudgetValue] = useState(currentBudget.toString());
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budget = parseFloat(budgetValue);
    
    if (isNaN(budget) || budget <= 0) {
      setError('Please enter a valid budget amount');
      return;
    }
    
    setError('');
    onSetBudget(budget);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-medium text-green-800">
          {currentBudget === 0 ? 'Set Your Budget' : 'Update Budget'}
        </h3>
      </div>
      
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
            <input
              type="number"
              value={budgetValue}
              onChange={(e) => setBudgetValue(e.target.value)}
              placeholder="Enter your budget"
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="0"
              step="0.01"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          {currentBudget === 0 ? 'Set Budget' : 'Update'}
        </button>
        
        {onCancel && currentBudget > 0 && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </form>
  );
}