import { json } from '@sveltejs/kit';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { DATA_DIR } from '$env/static/private';





interface User {
  id: number;
  name: string;
  email: string;
}

export function GET() {
  try {
    const filePath = join(DATA_DIR, 'users.yaml');
    console.log('Reading users from ', filePath);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const users = yaml.load(fileContents) as User[];
    return json(users);
  }
  catch (e) {
    console.error('Error reading users:', e);
  }
}

