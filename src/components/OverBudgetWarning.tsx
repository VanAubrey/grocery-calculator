'use client';

import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface OverBudgetWarningProps {
  budget: number;
  totalSpent: number;
}

export default function OverBudgetWarning({ budget, totalSpent }: OverBudgetWarningProps) {
  const overAmount = totalSpent - budget;
  const overPercentage = ((overAmount / budget) * 100).toFixed(1);

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Budget Exceeded!
          </h3>
          <div className="space-y-1 text-sm text-red-700">
            <p>
              You have exceeded your budget of <span className="font-semibold">₱{budget.toFixed(2)}</span>
            </p>
            <p>
              Current spending: <span className="font-semibold">₱{totalSpent.toFixed(2)}</span>
            </p>
            <p>
              Over budget by: <span className="font-semibold">₱{overAmount.toFixed(2)} ({overPercentage}%)</span>
            </p>
          </div>
          <div className="mt-3 p-3 bg-red-100 rounded-lg">
            <p className="text-xs text-red-600">
              💡 <strong>Tip:</strong> Consider removing some items or look for alternatives to stay within budget.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}