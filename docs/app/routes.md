# Routes
We need to add handling for different endpoints of the application.

First create a file that has extension `.routes.ts` or `.routes.js`.

In this file, exports a routes object that stores route records.
```ts
import { routes } from '@stricjs/app';
import { text } from '@stricjs/app/send';

// This is automatically registered
export default routes()
    .get('/', () => new Response('Hi'));
```

The `routes.get` method stores a handler that only runs when 
request method is `GET` and request path matches `/`.

Multiple methods are supported such as `POST`, `PUT`, `DELETE` and `PATCH`.

## Handler
The request handler is a function that accepts one parameter 
which is the current request context.

When using all methods metioned above, you can add multiple 
handlers, and the result of the last handler is returned, so the
last handler should return a `Response` object.

The value `null` can also be returned to force the handler to stop
running all other handlers and call the fallback handler if provided.

## Context
The context object includes parsed data after route matching.
- `path`: The parsed pathname. Note that this does not have the first slash character.
- `params`: The request parameters.
- `state`: This property is mainly used for passing data through validations.
- `req`: The original `Request` object.

The [`Context`](//github.com/aquapi/wint/blob/main/src/framework/types.ts) interface is declared in Wint framework API types.

## Route patterns
Wildcards and URL parameters are supported.
```ts
routes()
    // Match `/path/${id}`
    .get('/user/:id', ctx => {
        // Get the URL parameter value
        ctx.params.id;
    })
    // Match every path that starts with `/`
    .get('/*', ctx => {
        // Get the rest of the URL after `/`.
        // Does not start with a slash
        ctx.params['*'];
    });
```

These patterns match slower than static route patterns and should only 
be used when needed. Consider using query parameters if possible.

## Plugins
Plugins are designed for modifying the route records easier with external code.
```ts
routes.use(plugin);
// Registering multiple plugins without type safety
routes.plug(p1, p2, p3);
```

A plugin is an object with a `plugin` method, which takes in the route records object and yield it back with changes (for type safety).
