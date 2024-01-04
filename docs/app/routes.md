# Routes
We need to add handling for different endpoints of the application.

First create a file that has extension `.routes.ts` or `.routes.js`.

In this file, exports a routes object that stores route records.
```ts
import { routes } from '@stricjs/app';
import { text } from '@stricjs/app/send';

export default routes()
    .get('/', () => text('Hi'));
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

