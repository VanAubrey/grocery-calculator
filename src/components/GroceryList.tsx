'use client';

import React, { useState } from 'react';
import { GroceryItem } from '@/types/grocery';
import { 
  PencilIcon, 
  TrashIcon, 
  CheckIcon, 
  XMarkIcon,
  ShoppingBagIcon 
} from '@heroicons/react/24/outline';
import ConfirmationModal from './ConfirmationModal';

interface GroceryListProps {
  items: GroceryItem[];
  onEditItem: (id: string, updatedItem: Partial<GroceryItem>) => void;
  onDeleteItem: (id: string) => void;
}

interface EditingItem {
  id: string;
  name: string;
  price: string;
  quantity: string;
}

export default function GroceryList({ items, onEditItem, onDeleteItem }: GroceryListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; itemId: string; itemName: string }>({
    isOpen: false,
    itemId: '',
    itemName: ''
  });

  const startEditing = (item: GroceryItem) => {
    setEditingId(item.id);
    setEditingItem({
      id: item.id,
      name: item.name,
      price: item.price?.toString() || '',
      quantity: item.quantity.toString(),
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingItem(null);
  };

  const saveEdit = () => {
    if (!editingItem) return;

    const updatedItem: Partial<GroceryItem> = {
      name: editingItem.name.trim(),
      price: editingItem.price ? parseFloat(editingItem.price) : undefined,
      quantity: parseInt(editingItem.quantity) || 1,
    };

    onEditItem(editingId!, updatedItem);
    cancelEditing();
  };

  const handleDelete = (id: string, name: string) => {
    setDeleteModal({
      isOpen: true,
      itemId: id,
      itemName: name
    });
  };

  const confirmDelete = () => {
    onDeleteItem(deleteModal.itemId);
    setDeleteModal({ isOpen: false, itemId: '', itemName: '' });
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBagIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No items in your grocery list yet.</p>
        <p className="text-gray-400 text-sm">Add your first item above to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          {editingId === item.id && editingItem ? (
            // Edit Mode
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Price</label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₱</span>
                    <input
                      type="number"
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({...editingItem, price: e.target.value})}
                      className="w-full pl-6 pr-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Qty</label>
                  <input
                    type="number"
                    value={editingItem.quantity}
                    onChange={(e) => setEditingItem({...editingItem, quantity: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="1"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={saveEdit}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                >
                  <CheckIcon className="h-4 w-4" />
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View Mode
            <div className="flex items-center justify-between">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Unit Price</p>
                  <p className="font-medium text-green-600">
                    {item.price ? `₱${item.price.toFixed(2)}` : 'Not set'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-medium text-green-800">
                    {item.price ? `₱${(item.price * item.quantity).toFixed(2)}` : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => startEditing(item)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit item"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete item"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, itemId: '', itemName: '' })}
        onConfirm={confirmDelete}
        title="Delete Item"
        message={`Are you sure you want to delete "${deleteModal.itemName}" from your grocery list?`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}