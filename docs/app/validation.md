# Request Validation
Stric facilitates request validation by leveraging route states. These states can act as guard functions, validating requests and setting context state accordingly.

## Using State for Validation

### Basic Validation
A single state function can validate requests and set `ctx.state`.
```ts
routes
    .state(ctx => {
        // Perform validation
        // Return null or a value to set ctx.state
    })
    .get('/', ctx => {
        ctx.state; // Access ctx.state with type hints
    });
```

### Multiple States
You can validate and set multiple states.
```ts
routes
    .state({
        id: ctx => { /* Validate and return ID */ },
        query: ctx => { /* Validate and return query */ }
    })
    .get('/', ctx => {
        // Access states
        ctx.state.id;
        ctx.state.query;
    });
```

- **Merging States**: If `state` is called multiple times, single states override previous ones while multiple states get merged.

## Parsers as Shortcuts for States
Stric provides parsers as a concise way to define state validations.

### Examples of Parsers
- **JSON Parser**: `parser.json(body => { /* validate JSON body and returns the body or null */ })`
- **JSON Validator**: `parser.jsonv(body => { /* validate and return true or false */ })`
- **Text Parser**: `parser.text`
- **Form Parser**: `parser.form`
- **Buffer Parser**: `parser.buffer`
- **Blob Parser**: `parser.blob`

### Using Parsers with Validation Libraries
Here's an example using the [`vld-ts`](//npmjs.com/package/vld-ts) validation library:

```ts
import { t, vld } from 'vld-ts';
import * as parser from '@stricjs/app/parser';

// Define a schema
const User = t.obj({
    id: t.str,
    name: t.str,
    'age?': t.num
}), isUser = vld(User);

// Use parser with validation
routes.state(parser.jsonv(isUser));
```

- **Validation Logic**: The parser combined with the validator checks if the request body conforms to the `User` schema.

By integrating these validation techniques, Stric allows you to ensure that incoming requests meet your application's requirements, enhancing both security and data integrity.
