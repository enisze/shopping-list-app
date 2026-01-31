import mongoose, { Schema, Document } from 'mongoose';

export interface IShoppingItem extends Document {
  name: string;
  bought: boolean;
  createdAt: Date;
}

const ShoppingItemSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    bought: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

ShoppingItemSchema.index({ createdAt: -1 });

export default mongoose.model<IShoppingItem>('ShoppingItem', ShoppingItemSchema);
