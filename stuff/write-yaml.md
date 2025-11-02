You add entries to a YAML file with TypeScript by reading the file, parsing it into a JavaScript object, modifying that object, and then stringifying it back to YAML.

You cannot modify a YAML file directly. You must use a library to parse it. The standard library for this is **`js-yaml`**.

-----

## Prerequisites

First, you need to install the `js-yaml` library and its types for your Node.js project:

```bash
npm install js-yaml
npm install @types/js-yaml --save-dev
```

-----

## Step-by-Step Example

Let's assume you have a YAML file you want to modify:

**`data.yaml` (Before)**

```yaml
user:
  name: Alice
  id: 1
settings:
  theme: light
```

Here is the TypeScript code to read this file, add new entries, and save it back.

**`index.ts`**

```typescript
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

// 1. Define an interface for your data to get type safety
interface MyData {
  user: {
    name: string;
    id: number;
  };
  settings: {
    theme: string;
    notifications?: boolean; // Optional field we might add
  };
  // A new top-level field we might add
  server?: {
    url: string;
  };
}

const filePath = path.join(__dirname, 'data.yaml');

try {
  // 2. Read the YAML file's content
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // 3. Parse the YAML content into a JavaScript object (and cast it to our type)
  const data = yaml.load(fileContents) as MyData;

  // 4. Add or modify entries on the object
  
  // Adding a new key to an existing object
  data.settings.notifications = true; 

  // Adding a new top-level object
  data.server = {
    url: 'https://api.example.com'
  };

  // 5. Stringify the modified object back into a YAML string
  const newYamlContents = yaml.dump(data);

  // 6. Write the new string back to the file
  fs.writeFileSync(filePath, newYamlContents, 'utf8');
  
  console.log('Successfully added entries to data.yaml');

} catch (e) {
  console.error(e);
}
```

**To run this code:**

```bash
npx ts-node index.ts
```

**`data.yaml` (After)**
After the script runs, your file will look like this:

```yaml
user:
  name: Alice
  id: 1
settings:
  theme: light
  notifications: true
server:
  url: https://api.example.com
```

-----

## Asynchronous Version (for Servers)

In a web server (like Express or SvelteKit), you should use the asynchronous `fs.promises` methods so you don't block the event loop.

```typescript
import { promises as fs } from 'fs'; // Use the promises API
import * as yaml from 'js-yaml';
import * as path from 'path';

// (Same MyData interface as above)

async function addData() {
  const filePath = path.join(__dirname, 'data.yaml');

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = yaml.load(fileContents) as MyData;

    // Add new entries
    data.settings.notifications = true;
    data.server = { url: 'https://api.example.com' };

    const newYamlContents = yaml.dump(data);
    await fs.writeFile(filePath, newYamlContents, 'utf8');

    console.log('YAML file updated asynchronously');
  } catch (e) {
    console.error(e);
  }
}

// Call the async function
addData();
```
