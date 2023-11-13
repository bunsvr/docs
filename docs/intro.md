# Intro
Stric is a Bun-first framework for building high-performance web applications.
It is designed to be fast and scalable with simple, easy-to-use APIs.

```ts
import { routes } from '@stricjs/app';
import { text } from '@stricjs/app/send';

// Export a main function to register routes
export function main() {
    return routes().get('/', () => text('Hi'));
}
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

init({ routes: ['./src'] });
```

Create routes file in the `src` directory with extension `.routes.ts`.

Export a `main` function that returns a routes record.
```ts
import { routes } from '@stricjs/app';
import { text, json } from '@stricjs/app/send';

// Export a main function to register routes
export function main() {
    return routes()
        .get('/', () => text('Hi'))
        .post('/json', c => c.json().then(json));
}
```

The `main` function will be called at runtime and routes will automatically be registered.

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

## Performance
Let's talk about performance and what we do to improve it.

### What is Wint?
[Wint](//github.com/aquapi/wint) is a collection of URL routers built by the creator of Stric.

The package currently includes a plain Radix tree router, 
a faster router with fast static match, and a more optimized 
version of the second router that directly called the handler 
if the request matches any handler.

Stric internally uses the third router, which matches Stric API design.

### How does it perform?
Take a look at the results:

![Chart](https://raw.githubusercontent.com/bunsvr/benchmark/main/results/chart.png)

Stric API is designed to do things only when needed.

Static and dynamic path handlers are put into a map 
with the corresponding method as the key, so the path 
is only sliced out of the URL string when the method matches.

The dynamic handler uses the `@medley/router` algorithm,
but it is compiled ahead-of-time to reduce uneccessary work and
make the code statically analyzable by the underlying JavaScript engine.


