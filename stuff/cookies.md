In SvelteKit liest du Cookies im Backend über das **`event`**-Objekt aus, das an deine Server-Funktionen übergeben wird.

Die wichtigste Methode dafür ist **`event.cookies.get('cookiename')`**.

Dieser Code funktioniert **nur** in serverseitigen Dateien, wie:

* `+page.server.ts` (für das Laden von Daten für eine Seite)
* `+server.ts` (für API-Endpunkte)

-----

## 1\. Cookie in `+page.server.ts` auslesen

Wenn du Daten für eine Seite lädst, kannst du so auf ein Cookie zugreifen:

**`src/routes/dashboard/+page.server.ts`**

```typescript
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
  // 1. Cookie aus dem event-Objekt auslesen
  const sessionId = event.cookies.get('session_id');

  if (!sessionId) {
    // Wenn das Cookie fehlt, z.B. zum Login umleiten
    console.log('Kein Cookie gefunden, leite um...');
  }

  // 2. Cookie-Wert verwenden (z.B. um User-Daten zu laden)
  console.log('Gefundene Session ID:', sessionId);

  return {
    // Du kannst den Wert bei Bedarf an die Seite weitergeben
    userSession: sessionId 
  };
};
```

-----

## 2\. Cookie in `+server.ts` (API-Endpunkt) auslesen

Wenn du einen API-Endpunkt erstellst (z.B. für `POST` oder `GET`), funktioniert es identisch.

**`src/routes/api/user/+server.ts`**

```typescript
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ cookies }) => {
  // Du kannst `cookies` direkt aus dem Argument destrukturieren
  const authToken = cookies.get('auth_token');

  if (!authToken) {
    return json({ error: 'Nicht autorisiert' }, { status: 401 });
  }

  // Token validieren...
  console.log('Gefundenes Auth Token:', authToken);

  return json({ user: 'Christian Wimmer', token: authToken });
};
```

-----

## 💡 Zum Verständnis: Setzen eines Cookies im Backend

Nur zum Vergleich: So **setzt** du ein Cookie im Backend. Du verwendest `cookies.set()` und gibst dabei **`httpOnly: true`** an. Das macht das Cookie sicher, da es nicht von clientseitigem JavaScript gelesen werden kann.

**`src/routes/api/login/+server.ts`**

```typescript
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = ({ cookies }) => {
  const userSessionId = 'xyz-123-abc'; // Wird normalerweise generiert

  // Setzt ein sicheres, HttpOnly-Cookie
  cookies.set('session_id', userSessionId, {
    path: '/',
    httpOnly: true,  // WICHTIG: Verhindert Zugriff durch Browser-JS
    secure: true,    // Nur über HTTPS senden
    maxAge: 60 * 60 * 24 // 1 Tag
  });

  return json({ message: 'Erfolgreich eingeloggt' });
};
```
