# Lifecycles
The final handler of a route is [merged](//github.com/bunsvr/app/blob/main/src/utils/mergeHandlers.ts) from a list of handlers 
that was registered to that route.

The handlers are executed in sequence and the result of the last 
one is returned as a response.

```ts
routes()
    .get('/', f0, f1, f2);
```

If any of the handler before the last one returns `null`, the fallback 
handler result will be returned.

```ts
routes()
    .get('/', f0, f1, f2);
    .reject(f3);
```

If `f0` or `f1` returns `null`, `f3` will be executed and the result 
will be used as a response. 

Note that if `f2` returns `null` it will be used as a response.

You can prepend handlers to the list of handlers of each route.
```ts
routes()
    .guard(f4, f5)
    .get('/', f0, f1, f2);
```

So the actual sequence of handler to execute is `f4`, `f5`, `f0`, `f1`, `f2`.

Appending handlers also work with `wrap`.
```ts
routes()
    .wrap(f6, f7).
    .get('/', f0, f1, f2);
```

So the sequence of execution is `f0`, `f1`, `f2`, `f6`, `f7`.
