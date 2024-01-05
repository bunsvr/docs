# Sending responses
`@stricjs/app` provides some shorthand for sending responses.

## Basic format
```ts
import {
    text, json, html, file,
    head, redirect, status, stat
} from '@stricjs/app/send';

import { source } from '@stricjs/app/stream';

// Send any data that can be directly wrapped with `Response` constructor
text('Hi'); // new Response('Hi') 

// Send a JSON object
json({ foo: 'bar' }); // new Response(JSON.stringify({ foo: 'bar' }), { headers: { 'Content-Type': 'application/json' } })
 
// Send HTML format
html('<p>Hi</p>'); // new Response('<p>Hi</p>', { headers: { 'Content-Type': 'text/html' } })

// Stream a file using `Bun.file`
file('./page.html'); // new Response(Bun.file('./page.html'))

// Send only response options
head({ status: 404 }); // new Response(null, { status: 404 });

// Redirect to an URL (status should be `301`, `302`, `307` or `308`)
redirect('/nav', 307); // new Response(null, { status: 307, headers: { Location: '/nav' } })

// Send an empty response with only status code
status(404); // new Response(null, { status: 404 });

// Send any data that can be wrapped with `Response` constructor with a status code
stat('Im a teapot', 418); // new Response('Im a teapot', { status: 418 });

// Send a readable stream with the source
source({ pull(c) {} }); // new Response(new ReadableStream({ pull(c) {} }))
```

## SSE
Handle server-sent events with Bun direct `ReadableStream`.
```ts
import { events } from '@stricjs/app/stream';

const evs = events(
    (controller, ctx) => {
        // Do something with the context and controller
        // This function runs while the request signal is not aborted
    }
);

evs.abort((controller, ctx) => {
    // Runs after the request signal is aborted
});

evs.cancel((controller, ctx) => {
    // Runs when the `ReadableStream` is canceled
});
```

Note that all of this function call can be chained.

After registering all necessary handlers, you can choose to obtain a
function that only returns the `ReadableStream` or a function that returns
the `Response` object directly.

```ts
const f0 = evs.send(); // Create a function that returns a `Response` object
f0(ctx); // Accept a context as an argument

const f1 = evs.stream(); // Create a function that returns a `ReadableStream`
f1(ctx); // Accept a context as an argument
```

## Send context as response
You can set response info like `status` and `headers` as properties of
the request context and send using `ctx`.
```ts
import send from '@stricjs/app/send';
import { routes } from '@stricjs/app';

return routes().get('/text', ctx => {
    // Set `ResponseInit` properties
    ctx.status = 200;
    ctx.headers['Content-Type'] = 'text/plain';
    ctx.statusText = 'OK';

    // Set response body
    ctx.body = 'Hi';

    // Send all info
    return send.ctx(ctx);
});
```

This will be useful later when we work with lifecycles.

## Micro optimization
If you have to redirect to a specific location that does not depend on 
the context object, use the `createLink` utility.
```ts
import { createLink } from '@stricjs/app/send';

// Returns a function that returns a `Response` object
const home = createLink('/nav', 307);

home(); // redirect('/nav', 307)
```

This cached the `ResponseInit` object so the handler doesn't create 
a new object on every request, unlike `redirect`.
