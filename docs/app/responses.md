# Sending Responses

Stricjs simplifies the process of sending different types of responses in your web application. Here's an overview of the various methods available for sending responses.

## Basic Response Formats

Stricjs offers several shorthand functions for sending common response types:

```ts
import {
    text, json, html, file,
    head, redirect, status, stat
} from '@stricjs/app/send';
```

### Examples:

- **Text Response**: `text('Hi')` sends a plain text response.
- **JSON Response**: `json({ foo: 'bar' })` sends a JSON response.
- **HTML Response**: `html('<p>Hi</p>')` sends an HTML response.
- **File Stream**: `file('./page.html')` streams a file as the response.
- **Headers Only**: `head({ status: 404 })` sends a response with headers only.
- **Redirection**: `redirect('/nav', 307)` sends a redirect response.
- **Status Only**: `status(404)` sends a response with only a status code.
- **Status with Data**: `stat('I'm a teapot', 418)` sends data with a status code.

## Server-Sent Events (SSE)

Handle SSE using `events` from `@stricjs/app/stream`:

```ts
import { events } from '@stricjs/app/stream';

const evs = events((controller, ctx) => {
    // Handle events
});

// Add abort and cancel handlers
evs.abort((controller, ctx) => { /* ... */ });
evs.cancel((controller, ctx) => { /* ... */ });

// Obtain a Response object or ReadableStream
const responseFunc = evs.send();
const streamFunc = evs.stream();
```

- **Chaining**: All functions can be chained for better readability.
- **Usage**: The `send` function returns a `Response` object, while `stream` returns a `ReadableStream`.

## Context as Response

You can set response properties directly in the request context and use `send.ctx`:

```ts
import * as send from '@stricjs/app/send';

routes.get('/text', ctx => {
    // Set response properties
    ctx.status = 200;
    ctx.headers['Content-Type'] = 'text/plain';
    ctx.statusText = 'OK';
    ctx.body = 'Hi';

    return send.ctx(ctx);
});
```

- **Plugin**: Use `send.plug` to automatically send the response based on the context.

## Micro Optimization

For static redirects, `createLink` caches the `ResponseInit` object for efficiency:

```ts
import { createLink } from '@stricjs/app/send';

const home = createLink('/nav', 307);
```

- **Efficiency**: This approach avoids creating a new object on each request, unlike the `redirect` function.

By leveraging these methods, you can efficiently manage different types of responses in your Stricjs application, enhancing both the developer experience and application performance.