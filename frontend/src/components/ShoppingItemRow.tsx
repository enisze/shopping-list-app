import { useDeleteItem, useToggleItem } from '@/hooks/useShoppingItems';
import { cn } from '@/lib/utils';
import type { ShoppingItem } from '@/types/ShoppingItem';

interface ShoppingItemRowProps {
  item: ShoppingItem;
}

export function ShoppingItemRow({ item }: ShoppingItemRowProps) {
  const toggleItem = useToggleItem();
  const deleteItem = useDeleteItem();

  return (
    <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={item.bought}
        onChange={(e) =>
          toggleItem.mutate({ id: item._id, bought: e.target.checked })
        }
        className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
      />
      <span
        className={cn(
          'flex-1 text-gray-800',
          item.bought && 'line-through text-gray-400',
        )}
      >
        {item.name}
      </span>
      <button
        type="button"
        onClick={() => deleteItem.mutate(item._id)}
        className="px-3 py-1.5 text-sm text-red-600 hover:text-white hover:bg-red-500 rounded-md transition-colors border border-red-200 hover:border-red-500"
        aria-label={`Delete ${item.name}`}
      >
        Delete
      </button>
    </li>
  );
}
