import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createItem, deleteItem, fetchItems, updateItem } from '@/api/items';
import type { ShoppingItem } from '@/types/ShoppingItem';

export const shoppingItemsQueryKey = ['shoppingItems'] as const;

export function useShoppingItems() {
  const query = useQuery({
    queryKey: shoppingItemsQueryKey,
    queryFn: fetchItems,
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error?.message ?? null,
  };
}

export function useAddItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createItem,
    onSuccess: (newItem) => {
      queryClient.setQueryData<ShoppingItem[]>(
        shoppingItemsQueryKey,
        (old = []) => [newItem, ...old],
      );
    },
  });
}

export function useToggleItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateItem,
    onSuccess: (updatedItem) => {
      queryClient.setQueryData<ShoppingItem[]>(
        shoppingItemsQueryKey,
        (old = []) =>
          old.map((item) =>
            item._id === updatedItem._id ? updatedItem : item,
          ),
      );
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: (_, id) => {
      queryClient.setQueryData<ShoppingItem[]>(
        shoppingItemsQueryKey,
        (old = []) => old.filter((item) => item._id !== id),
      );
    },
  });
}
