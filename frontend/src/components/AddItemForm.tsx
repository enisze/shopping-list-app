import { useState } from 'react';
import { useAddItem } from '@/hooks/useShoppingItems';

export function AddItemForm() {
  const [name, setName] = useState('');
  const addItem = useAddItem();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || addItem.isPending) return;

    addItem.mutate(trimmedName, {
      onSuccess: () => setName(''),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add a product (e.g., Butter)"
        className="flex-1 min-w-0 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 placeholder-gray-400"
        disabled={addItem.isPending}
      />
      <button
        type="submit"
        disabled={addItem.isPending || !name.trim()}
        className="shrink-0 w-[88px] py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {addItem.isPending ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
