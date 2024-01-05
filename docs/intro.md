# Intro
Stric is a Bun-first framework for building high-performance web applications.
It is designed to be fast and scalable with simple, easy-to-use APIs.

```ts
import { routes } from '@stricjs/app';
import { text } from '@stricjs/app/send';

// Export a main function to register routes
export default routes().get('/', () => text('Hi'));
```

## Quick start
Create a [Bun](//bun.sh) project and install dependencies.
```bash
# Create a Bun project
bun init

# Install dependencies
bun i @stricjs/app @stricjs/utils
```

Change the content of `index.ts` to:
```ts
import { init } from '@stricjs/app';

// Shorter way to build and serve the app
init({ routes: ['./src'] });
```

Create a routes file in the `src` directory with extension `.routes.ts`.

```ts
import { routes } from '@stricjs/app';
import { text, json } from '@stricjs/app/send';

// Export a main function to register routes
export default routes()
    .get('/', () => text('Hi'))
    .post('/json', c => c.json().then(json));
```
The routes records exported will be automatically registered at runtime

To start the application, simply run:
```bash
# Run the entry point
bun run index.ts

# Or simply
bun .
```

The app will start at [localhost:3000](http://localhost:3000) by default.

You can change the port by setting the `PORT` enviroment variable
or directly set the serve options in the entry point.
```ts
import { init } from '@stricjs/app';

init({ 
    routes: ['./src'],
    // Bun.serve options
    serve: { port: 8080 }
});
```

Now the server will start at [localhost:8080](http://localhost:8080) instead.

We will introduce more concepts later in the docs.
