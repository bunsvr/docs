# Sending responses
`@stricjs/app` provides some shorthand for sending responses.

## Basic format
```ts
import {
    text, json, html, file,
    head, redirect, status, stat
} from '@stricjs/app/send';

import { source } from '@stricjs/app/stream';

text('Hi'); 
// Send any data that can be directly wrapped with `Response` constructor
// new Response('Hi')

json({ foo: 'bar' }); 
// Send a JSON object
// new Response(JSON.stringify({ foo: 'bar' }), { headers: { 'Content-Type': 'application/json' } })

html('<p>Hi</p>');
// Send HTML format
// new Response('<p>Hi</p>', { headers: { 'Content-Type': 'text/html' } })

file('./page.html');
// Stream a file using `Bun.file`
// new Response(Bun.file('./page.html'))

head({ 
    status: 404
});
// Send only response options
// new Response(null, { status: 404 });

redirect('/nav', 307);
// Redirect to an URL (status should be `301`, `302`, `307` or `308`)
// new Response(null, { status: 307, headers: { Location: '/nav' } })

status(404);
// Send an empty response with only status code
// new Response(null, { status: 404 });

stat('Im a teapot', 418);
// Send any data that can be wrapped with `Response` constructor with a status code
// new Response('Im a teapot', { status: 418 });

source({
    pull(c) {}
})
// Send a readable stream with the source
// new Response(new ReadableStream({ pull(c) {} }))
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
f0(c); // Accept a context as an argument

const f1 = evs.stream() // Create a function that returns a `ReadableStream`
f1(c); // Accept a context as an argument
```

## Micro optimization
If you have to redirect to a specific location that does not depend on 
the context object, use the `createLink` utility.
```
import { createLink } from '@stricjs/app/send';

// Returns a function that returns a `Response` object
const home = createLink('/', 307);
```

This cached the `ResponseInit` object so the handler doesn't create 
a new object on every request.
