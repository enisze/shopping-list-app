import type { ShoppingItem } from '@/types/ShoppingItem';

const API_URL = '/items';

export async function fetchItems(): Promise<ShoppingItem[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch items');
  return response.json();
}

export async function createItem(name: string): Promise<ShoppingItem> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) throw new Error('Failed to add item');
  return response.json();
}

export interface UpdateItemParams {
  id: string;
  bought: boolean;
}

export async function updateItem({
  id,
  bought,
}: UpdateItemParams): Promise<ShoppingItem> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bought }),
  });
  if (!response.ok) throw new Error('Failed to update item');
  return response.json();
}

export async function deleteItem(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete item');
}
