import { json } from '@sveltejs/kit';

interface User {
  id: number;
  name: string;
  email: string;
}

export function GET() {

  const users: User[] = [
    { id: 1, name: 'Hubert', email: 'alice@example.com' },
    { id: 2, name: 'Leon', email: 'bob@example.com' },
    { id: 3, name: 'Erik', email: 'charlie@example.com' }
  ];

  return json(users);
}