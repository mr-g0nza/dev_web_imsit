export type Wheel = {
  id: string;
  name: string;
  brand: string;
  size: number;
  type: 'Легкосплавные' | 'Стальные' | 'Хром';
  price: number;
  imageUrl: string;
  imageHint: string;
};

export type CartItem = {
  wheel: Wheel;
  quantity: number;
};

export type Order = {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: CartItem[];
}
