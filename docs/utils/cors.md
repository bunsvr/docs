# Handling CORS

The `@stricjs/utils` package simplifies Cross-Origin Resource Sharing (CORS) handling in web applications. Here's how you can use the `CORS` class for effective CORS management.

## Basic Setup

First, import and configure the `CORS` class:

```ts
import { CORS } from '@stricjs/utils';

const cors = new CORS({
    // Define allowed methods (as a string for single method)
    allowMethods: 'GET',

    // Enable credentials
    allowCredentials: true,

    // Specify allowed origins (array for multiple values)
    allowOrigins: ['http://localhost:8000', 'http://example.com'],

    // Append headers instead of overwriting (affects plugin behavior)
    appendHeaders: true
});
```

### Key Properties

- **`cors.static`**: Indicates if headers are static (not applicable for multiple origins).
- **`cors.headers`**: The parsed CORS headers (not for direct use).

### Methods

- **`validate(headersObj, requestOrigin)`**: Validates the request origin and sets `Access-Control-Allow-Origin`.
- **`set(ctx)`**: Sets CORS headers in `ctx.headers` without overwriting existing headers.
- **`write(ctx)`**: Similar to `set`, but overwrites existing headers.
- **`assign(headerObj)`**: Extends a header object with CORS headers.

## Handling Multiple Origins

`Access-Control-Allow-Origin` is dynamic, typically accepting a single origin. For multiple origins, `CORS` requires a validation step.

## Using as a Plugin

`CORS` integrates directly as a plugin with `@stricjs/app` routes.

```ts
routes.use(cors);
```

This configuration automatically:

- Adds a layer handler to set CORS headers.
- Registers an `OPTIONS` handler at `/*`.

### Header Behavior

- By default, `CORS` uses the `write` method, overwriting all headers.
- To append CORS headers instead, set `appendHeaders` to `true`.

By leveraging the `CORS` class from `@stricjs/utils`, developers can efficiently manage CORS policies in their Stricjs applications, ensuring both flexibility and compliance with cross-origin resource sharing requirements.