# App
The component for creating web apps and APIs.

## Install
Install the package with Bun package manager.
```bash
bun i @stricjs/app
```

## Usage
An entry point file is needed to register routes from directories.

To set specific directories to register:
```ts
import { init } from '@stricjs/app';

init({
    // Read and register route files in `./src`
    routes: ['./src']
});
```

To register routes, create files in the `src` directories
that have extension `.routes.ts`.

```ts
import { routes } from '@stricjs/app';

export function main() {
    return routes()
        // Return a response for route '/'
        .get('/', () => new Response('Hi'));
}
```

To set a base path for all routes, pass another argument into `routes()`.
```ts
// Handle `/api` instead of `/`
routes('/api')
    .get('/', () => new Response('Hi'));
```

There are shorthands for sending responses like text and JSON.
```ts
import { text, json } from '@stricjs/app';

routes('/api')
    .get('/', () => text('Hi'))
    .post('/json', () => json({ message: 'Hello' }));
```

Different request methods are supported. See all supported methods [here](https://github.com/bunsvr/app/blob/main/src/utils/methods.ts).

