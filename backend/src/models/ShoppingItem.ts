import mongoose, { Schema, Document } from 'mongoose';

export interface IShoppingItem extends Document {
  _id: mongoose.Types.ObjectId;
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
