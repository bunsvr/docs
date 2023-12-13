# App
The component for creating web apps and APIs.

Install the package with Bun package manager.
```bash
bun i @stricjs/app
```

An entry point file is needed to register routes from directories.

To set specific directories to register:
```ts
import { init } from '@stricjs/app';

init({
    // Read and register route files in `./src`
    routes: ['./src']
});
```

## Routing
To register routes, create files in the `src` directories with extension `.routes.ts`.

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
routes('/api')
    // Handle `/api` instead of `/`
    .get('/', () => new Response('Hi'));
```

A main function should be used only when you need access to the current `App` object.

To simplify things, you can export the routes directly from `1.0.0-rc.2`.
```
// Export as default
export default routes()
    .get('/', () => new Response('Hi'));
```

### Route patterns
Route patterns like parameters and wildcards are supported.
```ts
routes()
    // URL parameters
    .get('/id/:id', c => new Response(c.params.id))
    // Wildcards
    .get('/*', () => new Response('No handler found!'));
```

## Shorthands

There are methods for sending responses like text and JSON.
```ts
import * as send from '@stricjs/app/send';

routes('/api')
    // Normal text
    .get('/', () => send.text('Hi'))
    // JSON response
    .post('/json', () => send.json({ message: 'Hello' }));
```

### Send only response options
To send headers only, use the `head` shorthand:
```ts
routes()
    // Send CORS headers
    .options('/*', () => send.head({  
        headers: {
            'Access-Control-Allow-Methods': 'GET,POST',
            'Access-Control-Allow-Origin': 'http://example.com'
        }
    }));
```

### Send file
Use the `file` shorthand to send a file by path:
```ts
routes()
    // Send robots.txt
    .get('/robots.txt', () => send.file('./robots.txt'));
```

### Redirection
To redirect to another URL, use `redirect`:
```ts
routes()
    // Redirect to another URL
    .get('/not/found', () => send.redirect('/', 308));
```

If the redirect URL does not depend on the request you can use `createLink`.
```ts
const redirect = send.createLink('/', 308);

routes()
    // Redirect to '/'
    .get('/not/found', () => redirect());
```

### Send context
Stric provides a field in the context `ctx.set` to pass
and modify the response data through middlewares.

All route register methods accept more than 1 handler. If any handler 
returns `null` the chain will end and runs the fallback handler.

```ts
routes()
    .guard(
        c => {
            // Return null to end the chain and call the fallback
        }, c => {
            // Do sth here
        }
    )
    .reject(c => {
        // Return a response
    });
```

The `guard` method is used to prepend more handlers to registered routes.

The `reject` method set a fallback handler.

Note that `guard` and `reject` should be registered before any other route.

The property `c.set` extends the `ResponseInit` object with another property `ctx.set.body` for the response body.
By default `c.set` is `null`, to initialize it use `send.createContext`.
```ts
c.set = send.createContext();

// Set some fields like headers and status
c.set.headers['Content-Type'] = 'text/html';

// Defaults to 200
c.set.status = 400;

// Set a response body
c.set.body = '<p>Hi</p>';
```

To send all info in the context, use `send.ctx`.
```ts
routes()
    // Note that c.set must be initialized before calling send.ctx
    .get('/', c => {
        c.set.body = 'Hi';
        return send.ctx(c);
    });
```

Or you can initialize the context yourself, which is 
often faster than `send.createContext`.
```ts
c.set = { body: 'Hi', status: 418 };
```

#### Explanation
The reason why this is faster is that the time it takes 
to initialize a new property is equivalent to the time you 
create an empty object.

In this case, the JS engine knows that `c.set` has property
`body` and `status` so it can perform hidden class optimization
for creating objects with the same structure.

The `send.createContext` method calls a constructor under the hood 
and the constructor prototype has already initialized necessary properties
for engine optimization.

### Send status code
To send only the status code, use the `status` shorthand.
```ts
routes().get('/not/found', () => send.status(404));
```

### Streaming
You can do streaming through a direct `ReadableStream`.
```ts
import * as stream from '@stricjs/app/stream';

routes()
    // Stream some content
    .get('/file', () => stream.source({
        type: 'direct',
        pull: c => { 
            /** Do something with the controller */ 
        } 
    }));
```

For SSE, use `stream.events`.
```ts
const sse = stream.events(
    // This function reruns until 
    // the request signal is aborted. 
    // You can access the request 
    // context with the second argument
    async res => {
        res.write('event: message\n');
        res.write('data: Hi\n');
            
        await Bun.sleep(3000);
    }
);

routes()
    // Stream events
    .get('/events', sse.stream());
```

The method `sse.stream()` builds and returns a request handler.
To attach an abort handler, use `sse.abort`.
```ts
sse.abort((res, ctx) => {
    // This will run after the request is aborted
});
```

For handling underlying `ReadableStream` cancel event, use `sse.cancel`.
```ts
sse.cancel((res, ctx) => {
    // This runs when an error occured
});
```

Note that you can chain methods like this:
```ts
stream
    .events(() => { /* ... */ })
    .abort(() => { /* ... */ })
    .cancel(() => { /* ... */ })
    .stream();
```

## Request methods
Different request methods are supported. See all supported methods [here](https://github.com/bunsvr/app/blob/main/src/utils/methods.ts).

## Base configurations
You can prefix all routes in a directory with a configuration file.

Create a file named `base.ts` in the directory you want to change.
```ts
// Prefix all routes inside the directory and subdirectories
export const prefix = '/api';
```

You can add guards for all routes in the directory as well.
```ts
import { config } from '@stricjs/app';

export default config.guard('/prefix', 
    () => {
        // Guard 
    },
    () => {
        // Another guard
    },
    // Add more guards...
);
```

## WebSocket
To use WebSocket, you need to enable it in the entry point.
```ts
init({
    routes: [/* Some routes directories... */],
    ws: true 
});
```

To create a WebSocket route, create another file with extension `.ws.ts`.
```ts
import { ws } from '@stricjs/app';

// All exported WebSocket routes be automatically registered
export default ws.route<{ id: string }>({
    message(ws, msg) {
        if (msg === 'Ping')
            ws.send(ws.data.id);
    }
});
```

Then you can use it in your routes file.
```ts
import ping from './ping.ws';

export default routes()
    .get('/ws', c => ping.upgrade(c));
```

We will need utilities to build things faster though, so let's continue.
