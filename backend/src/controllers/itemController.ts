import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import ShoppingItem from '../models/ShoppingItem';

interface CreateItemBody {
  name: unknown;
}

interface UpdateItemBody {
  bought: unknown;
}

interface ItemParams {
  id: string;
}

function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export const getItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await ShoppingItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items' });
  }
};

export const createItem = async (
  req: Request<object, object, CreateItemBody>,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      res.status(400).json({ message: 'Product name is required' });
      return;
    }

    if (name.trim().length > 200) {
      res.status(400).json({ message: 'Product name cannot exceed 200 characters' });
      return;
    }

    const newItem = new ShoppingItem({ name: name.trim() });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Error creating item' });
  }
};

export const updateItem = async (
  req: Request<ItemParams, object, UpdateItemBody>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { bought } = req.body;

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: 'Invalid item ID' });
      return;
    }

    if (typeof bought !== 'boolean') {
      res.status(400).json({ message: 'bought must be a boolean' });
      return;
    }

    const updatedItem = await ShoppingItem.findByIdAndUpdate(id, { bought }, { new: true });

    if (!updatedItem) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Error updating item' });
  }
};

export const deleteItem = async (
  req: Request<ItemParams>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: 'Invalid item ID' });
      return;
    }

    const deletedItem = await ShoppingItem.findByIdAndDelete(id);

    if (!deletedItem) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Error deleting item' });
  }
};
