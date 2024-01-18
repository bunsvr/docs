# CORS
CORS handling can be done easily with `@stricjs/utils`.
```ts
import { CORS } from '@stricjs/utils';

const cors = new CORS({
    // Camel case 
    allowMethods: 'GET',

    // Can be a boolean
    allowCredentials: true,

    // Or a string array for multiple values
    allowOrigins: ['http://localhost:8000', 'http://example.com'],

    // This option only changes plugin behavior
    appendHeaders: true
});

cors.static; // If the headers will not change at all (does not check multiple origins)
cors.headers; // Parsed headers (Don't use this directly)

cors.validate(headersObj, requestOrigin); // Validate request origin and set 'Access-Control-Allow-Origin'
cors.set(ctx); // Set CORS headers to ctx.headers without overwriting other headers
cors.write(ctx); // Works like set but it overwrites other headers
cors.assign(headerObj); // Extends the header object with the current CORS object headers
```

`Access-Control-Allow-Origin` is a dynamic header because normally it only accepts one single origin.
To handle multiple origins we need a validation step.

## Plugin
`CORS` can also be used directly as a `@stricjs/app` routes plugin.
```ts
routes.use(cors);
```

The above code does two things:
- Add a layer handler that set the CORS header.
- Register an `OPTIONS` handler at `/*`.

By default the function used to set the CORS header is `write`, which will overwrite all headers.
To only append the headers, set CORS option `appendHeaders` to `true` like above.
