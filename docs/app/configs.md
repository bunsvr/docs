# Configuring Routes
Stric allows you to configure route behaviors and structures, including base paths, guards, wrappers, and more. Here's how to set up and use these configurations effectively.

## Setting Up Configuration Files
1. **Create a Configuration File**: Typically named `base.ts` (or `.js` for JavaScript), this file resides in the directory you wish to configure.
2. **Customize Config File Name**: If you prefer a different file name, specify it in the `config` property of the entry point configuration.

   ```ts
   init({
       routes: [/* route directories */],
       config: 'customConfig.js' // Custom file name
   });
   ```

## Configuring Options
You can either use named exports or group configurations into a default export.

### Examples:
- **Named Export**: 
  ```ts
  export const prefix = '/api';
  ```
- **Default Export**:
  ```ts
  export default { prefix: '/api' };
  ```

### Using Type-Safe Wrappers
Stric provides type-safe wrappers for easier configuration management.

#### Prefix
Set a base path for all route paths with the `prefix` option.
```ts
export const prefix = '/api';
```

#### Handlers
Configure different types of functions for route handling.

```ts
// Guards
export const guards = [f0, f1];

// Layers
export const layers = [f2, f3];

// Wrappers
export const wraps = [f4, f5];

// Fallback function
export const reject = f6;
```

- **Order of Registration**: Layer handlers are registered after guard handlers.

#### Path-Specific Type Safety
For type safety specific to paths, use `config.base`.

```ts
import { config } from '@stricjs/app';

export default config.base('/api', {
    // Other configurations like guards, layers, wraps, and reject
});
```

#### Handler Configuration Without Prefix
If no specific prefix path is needed, use `config.fn` for type-safe handler configuration.

```ts
export const guards = config.fn(f7, f8, f9);
```

By following these guidelines, you can effectively configure various aspects of your routes in Stric, ensuring a structured, manageable, and type-safe routing setup for your web application.
