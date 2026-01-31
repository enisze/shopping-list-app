import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createItem, deleteItem, fetchItems, updateItem } from '@/api/items';

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shoppingItemsQueryKey });
    },
  });
}

export function useToggleItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shoppingItemsQueryKey });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shoppingItemsQueryKey });
    },
  });
}
