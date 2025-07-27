'use client';

import React, { useState, useEffect } from 'react';
import { GroceryItem } from '@/types/grocery';
import BudgetInput from '@/components/BudgetInput';
import AddItemForm from '@/components/AddItemForm';
import GroceryList from '@/components/GroceryList';
import BudgetTracker from '@/components/BudgetTracker';
import OverBudgetWarning from '@/components/OverBudgetWarning';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function GroceryTracker() {
  const [budget, setBudget] = useState<number>(0);
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [showBudgetInput, setShowBudgetInput] = useState(false);

  // Calculate totals
  const totalSpent = items.reduce((sum, item) => 
    sum + (item.price || 0) * item.quantity, 0
  );

  const remainingBudget = budget - totalSpent;
  const isOverBudget = totalSpent > budget && budget > 0;

  const handleSetBudget = (newBudget: number) => {
    setBudget(newBudget);
    setShowBudgetInput(false);
  };

  const handleAddItem = (item: Omit<GroceryItem, 'id'>) => {
    const newItem: GroceryItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    setItems(prev => [...prev, newItem]);
  };

  const handleEditItem = (id: string, updatedItem: Partial<GroceryItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleResetList = () => {
    if (confirm('Are you sure you want to reset the entire list and budget?')) {
      setBudget(0);
      setItems([]);
      setShowBudgetInput(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingCartIcon className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-green-800">Grocery Tracker</h1>
          </div>
          <p className="text-green-600">Track your grocery budget and spending</p>
        </div>

        {/* Budget Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {budget === 0 || showBudgetInput ? (
            <BudgetInput
              onSetBudget={handleSetBudget}
              currentBudget={budget}
              onCancel={() => setShowBudgetInput(false)}
            />
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-green-800 mb-2">Budget Overview</h2>
                <BudgetTracker
                  budget={budget}
                  totalSpent={totalSpent}
                  remainingBudget={remainingBudget}
                />
              </div>
              <button
                onClick={() => setShowBudgetInput(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Edit Budget
              </button>
            </div>
          )}
        </div>

        {/* Over Budget Warning */}
        {isOverBudget && (
          <OverBudgetWarning 
            budget={budget} 
            totalSpent={totalSpent} 
          />
        )}

        {/* Add Item Form */}
        {budget > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Add Grocery Item</h2>
            <AddItemForm onAddItem={handleAddItem} />
          </div>
        )}

        {/* Grocery List */}
        {budget > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-green-800">Grocery List</h2>
              {items.length > 0 && (
                <button
                  onClick={handleResetList}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Reset List
                </button>
              )}
            </div>
            <GroceryList
              items={items}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
            />
          </div>
        )}
      </div>
    </div>
  );
}