import mongoose from 'mongoose';

export interface IMarketItem {
    id?: number;
    type: string;
    category: string;
    item: string;
    price: number;
    unit: string;
    quantity: string;
    seller: string;
    location: string;
    phone: string;
    description: string;
    postedDate: string;
}

const MarketItemSchema = new mongoose.Schema<IMarketItem>({
    id: { type: Number },
    type: { type: String, required: true },
    category: { type: String, required: true },
    item: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    quantity: { type: String, required: true },
    seller: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: true },
    postedDate: { type: String, required: true }
}, {
    timestamps: true,
    collection: 'marketitems'
});

export const MarketItem = mongoose.models.MarketItem || mongoose.model<IMarketItem>('MarketItem', MarketItemSchema);
