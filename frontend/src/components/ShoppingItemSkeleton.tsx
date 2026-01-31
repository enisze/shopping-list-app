import { Skeleton } from '@/components/ui/skeleton';

export function ShoppingItemSkeleton() {
  return (
    <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <Skeleton className="w-5 h-5 rounded" />
      <Skeleton className="flex-1 h-5" />
      <Skeleton className="w-16 h-8 rounded-md" />
    </li>
  );
}

export function ShoppingListSkeleton() {
  return (
    <ul className="space-y-3">
      <ShoppingItemSkeleton />
      <ShoppingItemSkeleton />
      <ShoppingItemSkeleton />
      <ShoppingItemSkeleton />
    </ul>
  );
}
