import { json } from '@sveltejs/kit';

interface Order {
  id: number;
  date: string;   //format?  
  userId: number;
  item: string;
  quantity: number;
}

export function GET() {

  const orders: Order[] = [
    { id: 1, date: '2025-10-26T04:58:33.000Z', userId: 1, item: 'Brotwirschtel', quantity: 7 },
    { id: 2, date: '2025-10-27T04:58:33.000Z', userId: 1, item: 'Kasnocken', quantity: 8 },
    { id: 3, date: '2025-10-29T04:58:33.000Z', userId: 1, item: 'Gsöchts', quantity: 9 },
    { id: 4, date: '2025-10-29T04:58:33.000Z', userId: 2, item: 'Bier', quantity: 10 },
    { id: 5, date: '2025-10-29T04:58:33.000Z', userId: 3, item: 'Klopapier', quantity: 10 },
    { id: 6, date: '2025-10-29T04:58:33.000Z', userId: 3, item: 'Lego', quantity: 10 }
  ];

  return json(orders);
}