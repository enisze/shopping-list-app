import { useShoppingItems } from '@/hooks/useShoppingItems';
import { AddItemForm } from './AddItemForm';
import { ShoppingItemRow } from './ShoppingItemRow';
import { ShoppingListSkeleton } from './ShoppingItemSkeleton';

export function ShoppingList() {
  const { items, isLoading, error } = useShoppingItems();

  const boughtCount = items.filter((item) => item.bought).length;
  const totalCount = items.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-8 px-4">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Shopping List
          </h1>
          <p className="text-gray-500 h-6">
            {totalCount > 0 && `${boughtCount} of ${totalCount} items checked`}
          </p>
        </header>

        <div className="bg-white/80 backdrop-blur rounded-xl shadow-lg p-6 mb-6">
          <AddItemForm />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <ShoppingListSkeleton />
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-white/60 rounded-xl">
            <p className="text-gray-500 text-lg">Your shopping list is empty</p>
            <p className="text-gray-400 mt-1">Add your first item above!</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <ShoppingItemRow key={item._id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
