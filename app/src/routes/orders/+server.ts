import { json } from '@sveltejs/kit';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { DATA_DIR } from '$env/static/private';

interface Order {
  id: number;
  date: string;   //format?  
  userId: number;
  item: string;
  quantity: number;
}

export function GET() {
  try {
    const filePath = join(DATA_DIR, 'orders.yaml');
    console.log('Reading orders from ', filePath);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const orders = yaml.load(fileContents) as Order[];
    return json(orders);
  }
  catch (e) {
    console.error('Error reading orders:', e);
  }
}