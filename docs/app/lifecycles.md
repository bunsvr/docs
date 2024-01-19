# Managing Lifecycles

Stricjs provides a flexible mechanism to handle the lifecycle of route handlers. Understanding how to sequence, reject, guard, wrap, and layer these handlers is crucial for efficient route management.

## Handler Execution Sequence

Handlers for a specific route are executed in the order they are registered. The result of the last handler is sent as the response.

### Example

```ts
routes()
    .get('/', f0, f1, f2);
```

- Here, `f0`, `f1`, and `f2` are executed in sequence.

## Fallback with `reject`

If any handler before the last one returns `null`, a fallback handler's result is used as the response.

### Example

```ts
routes()
    .get('/', f0, f1, f2)
    .reject(f3);
```

- If `f0` or `f1` returns `null`, `f3` is executed and its result is used.
- Note: If `f2` (the final handler) returns `null`, that value is used as the response.

## Prepending Handlers with `guard`

You can prepend handlers to be executed before the main handlers of a route.

### Example

```ts
routes()
    .guard(f4, f5)
    .get('/', f0, f1, f2);
```

- The execution sequence will be `f4`, `f5`, `f0`, `f1`, `f2`.

## Appending Handlers with `wrap`

Handlers can also be appended to execute after the main handlers.

### Example

```ts
routes()
    .wrap(f6, f7)
    .get('/', f0, f1, f2);
```

- The execution sequence will be `f0`, `f1`, `f2`, `f6`, `f7`.

## Bypassing Validation with `layer`

To bypass the validation of certain function results, use `layer`.

### Example

```ts
import { layer } from '@stricjs/app';

const guardedFunction = layer(f8);
```

- `guardedFunction` can now be used without its result being validated.

## Sequencing Layers

For adding a sequence of layers or for more type-safe context objects, use the `layer` method from the route records object.

### Example

```ts
routes()
    .layer(f9, f10, f11);
```

- This allows for a sequence of layered functions or more complex context handling.

By utilizing these lifecycle management features, Stricjs enables a more controlled and flexible routing mechanism, allowing for complex routing scenarios to be handled with ease.