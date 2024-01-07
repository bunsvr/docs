# Validation
You can do request validations using route states.
```ts
routes()
    .state(ctx => {
        // return null or something else
    });
```
The state acts like a guard function, but if the return result is not `null`, `ctx.state` is set to that value.

You can add multiple states to `c.state`.
```ts
routes()
    .state({
        id: ctx => { /* Check ID */ },
        query: ctx => { /* Check query */ }
    })
    .get('/', ctx => {
        // Use the value here
        ctx.state.id;
        ctx.state.query;
    });
```

## Parsers
A shorter way to write states.
```ts
import parser from '@stricjs/app/parser';

// Return a guard function
parser.json(body => { 
    // Do something with parsed request body as JSON 
    // Return the body or null
});

parser.jsonv(body => {
    // Return true if the body is valid, false otherwise
    // The function type should be inferred correctly for the `ctx.state` type to work
});
```

Here is an example using my own validator library, `vld-ts`.
```ts
import { t, vld } from 'vld-ts';

// Create a schema
const User = t.obj({
    id: t.str,
    name: t.str,
    age: t.num
});

routes()
    .state(jsonv(
        // Return type: obj is { id: string, name: string, age: number }
        vld(User)
    ));
```
