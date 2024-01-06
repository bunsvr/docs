# Configurations
You can configure a base path, a set of guards or wrappers for routes in the current directory.

Create a `base.ts` file in the directory you want to configure.
If you want to use another file name for config file, set the `config` property 
of the entry point configuration to the file name that you prefer using.
```ts
init({
    routes: [/* Some route directories */],
    // Change to a JS file if you want to use JS
    config: 'base.js' 
});
```

Config options can be splitted to named exports or group into an export default.
```ts
export const prefix = '/api';
// Or
export default { prefix: '/api' };
```

Stric provides type-safe wrappers to help you out with these configurations.

## Prefix
You can set a prefix (or base) for all route paths by using the `prefix` option.
```ts
export const prefix = '/api';
```

## Handlers
The config file provides a way for each type of function to be added.
```ts
// Prepend guards
export const guards = [f0, f1];

// Prepend layers
export const layers = [f2, f3];

// Add wrappers
export const wraps = [f4, f5];

// Add fallback function if the route records didn't register one
export const reject = f6;
```

Or if you want type safety for path.
```ts
import { config } from '@stricjs/app';

// The same as { prefix: '/api', ...otherConfigs }
export default config.base('/api', {
    // Add configs like guards, layers, wraps and reject
});
```

If you don't have any specified prefix, you can use 
`config.fn` for handlers type safety.
```ts
export const guards = config.fn(f7, f8, f9);
```
