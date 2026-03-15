export interface StockItem {
  stock: number;
  minStock: number;
}

export interface CustomProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

const STORAGE_KEY = 'jadely_stock';
const CUSTOM_PRODUCTS_KEY = 'jadely_custom_products';

export function getStockData(): Record<number, StockItem> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function setStockData(data: Record<number, StockItem>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage errors
  }
}

export function getProductStock(id: number): StockItem {
  const data = getStockData();
  return data[id] ?? { stock: 50, minStock: 5 };
}

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export function getStockStatus(stock: number, minStock: number): StockStatus {
  if (stock === 0) return 'out-of-stock';
  if (stock <= minStock) return 'low-stock';
  return 'in-stock';
}

export function getCustomProducts(): CustomProduct[] {
  try {
    const data = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCustomProducts(products: CustomProduct[]): void {
  try {
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(products));
  } catch {
    // ignore storage errors
  }
}

export function getNextCustomId(existingIds: number[]): number {
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  return maxId + 1;
}
