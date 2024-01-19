# Handling Routes

Stricjs simplifies the process of handling different endpoints in your web application. Here’s a guide on setting up and managing routes.

## Setting Up Routes

1. **Create a Route File**: Make a new file with an extension `.routes.ts` (for TypeScript) or `.routes.js` (for JavaScript).

2. **Define Route Records**: In this file, export a routes object that contains your route definitions.

   ```ts
   import { routes } from '@stricjs/app';

   export default routes()
       .get('/', () => new Response('Hi'));
   ```

   - The `routes.get` method registers a handler for `GET` requests matching the `/` path.
   - Stricjs supports various HTTP methods, including `POST`, `PUT`, `DELETE`, and `PATCH`.

## Writing a Handler

- **Functionality**: Handlers are functions that process incoming requests. They accept a single parameter, the current request context.
- **Returning Responses**: The last handler in the chain should return a `Response` object. Returning `null` stops the execution of subsequent handlers and triggers the fallback handler, if any.

## Understanding Context

The context object, derived from the Wint framework, includes:

- `path`: The parsed pathname (excludes the initial slash).
- `params`: Request parameters.
- `state`: Used for passing data through validations.
- `req`: The original `Request` object.

Refer to the [`Context`](//github.com/aquapi/wint/blob/main/src/framework/types.ts) interface for more details.

## Route Patterns

Stricjs supports both static and dynamic route patterns, including wildcards and URL parameters.

```ts
routes()
    .get('/user/:id', ctx => {
        // Accessing URL parameter `id`
        ctx.params.id;
    })
    .get('/*', ctx => {
        // Accessing wildcard parameter
        ctx.params['*'];
    });
```

- **Performance Note**: Dynamic patterns (like wildcards and URL parameters) match slower than static ones. Use query parameters where possible for better performance.

## Utilizing Plugins

Plugins offer an extensible way to modify route records.

- **Basic Usage**: `routes.use(plugin);`
- **Multiple Plugins**: Register multiple plugins using `routes.plug(p1, p2, p3);` (note that this lacks type safety).
- **Plugin Structure**: A plugin is an object with a `plugin` method. It receives the route records object, modifies it, and returns the modified version, ensuring type safety.

By following these guidelines, you can efficiently set up and manage routes in your Stricjs application, leveraging its flexible routing capabilities to build dynamic web applications.