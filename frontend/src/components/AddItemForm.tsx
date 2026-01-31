import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddItem } from '@/hooks/useShoppingItems';

const addItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Product name is required')
    .max(200, 'Product name cannot exceed 200 characters'),
});

type AddItemFormData = z.infer<typeof addItemSchema>;

export function AddItemForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const addItem = useAddItem();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AddItemFormData>({
    resolver: zodResolver(addItemSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: AddItemFormData) => {
    if (addItem.isPending) return;

    setServerError(null);
    addItem.mutate(data.name, {
      onSuccess: () => reset(),
      onError: (err) => setServerError(err.message),
    });
  };

  const error = errors.name?.message || serverError;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
        <input
          type="text"
          {...register('name')}
          placeholder="Add a product (e.g., Butter)"
          className="flex-1 min-w-0 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 placeholder-gray-400"
          disabled={addItem.isPending}
        />
        <button
          type="submit"
          disabled={addItem.isPending || !isValid}
          className="shrink-0 w-[88px] py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {addItem.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
