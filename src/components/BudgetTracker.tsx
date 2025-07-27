'use client';

import React from 'react';
import { BanknotesIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface BudgetTrackerProps {
  budget: number;
  totalSpent: number;
  remainingBudget: number;
}

export default function BudgetTracker({ budget, totalSpent, remainingBudget }: BudgetTrackerProps) {
  const spentPercentage = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;
  const isOverBudget = totalSpent > budget;

  return (
    <div className="space-y-4">
      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-full">
            <BanknotesIcon className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Budget</p>
            <p className="text-xl font-bold text-green-800">₱{budget.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <ChartBarIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Spent</p>
            <p className="text-xl font-bold text-blue-800">₱{totalSpent.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${isOverBudget ? 'bg-red-100' : 'bg-green-100'}`}>
            <BanknotesIcon className={`h-6 w-6 ${isOverBudget ? 'text-red-600' : 'text-green-600'}`} />
          </div>
          <div>
            <p className="text-sm text-gray-600">
              {isOverBudget ? 'Over Budget' : 'Remaining'}
            </p>
            <p className={`text-xl font-bold ${isOverBudget ? 'text-red-800' : 'text-green-800'}`}>
              {isOverBudget ? '-' : ''}₱{Math.abs(remainingBudget).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Budget Usage</span>
          <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
            {spentPercentage.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              isOverBudget 
                ? 'bg-red-500' 
                : spentPercentage > 80 
                  ? 'bg-yellow-500' 
                  : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          />
        </div>
        {isOverBudget && (
          <p className="text-xs text-red-600 mt-1">
            You have exceeded your budget by ₱{Math.abs(remainingBudget).toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}