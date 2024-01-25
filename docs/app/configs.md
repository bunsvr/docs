# Configuring Routes

Stric offers a comprehensive and flexible approach to configuring route behaviors in your application. This includes setting base paths, employing guards, utilizing wrappers, and defining fallbacks, which collectively ensure a structured and easily manageable routing setup. This document delves into both the foundational and advanced aspects of route configuration within Stric, covering everything from directory structure and configuration files to employing advanced configuration utilities for enhanced clarity and type safety.

## Directory Structure and Configuration Files

### Creating a Configuration File
Stric requires a `config.ts` configuration file in each directory that contains routes, detailing the behavior and structure of these routes. Should you prefer JavaScript or a different file name, you must explicitly adjust the `app.options.config` setting:

```ts
init({
    routes: [/* route directories */],
    config: 'customConfig.js' // Custom file name
});
```

### Configuration Mechanism
Stric recursively scans your project's directory tree, starting from a specified root directory. It searches for a `config.ts` file in each directory to determine the route configurations within. These configuration files can specify their settings through named exports or a default export.

## Basic Configuration Options

The following options can be configured in your `config.ts` file to dictate the behavior of routes:

- **Prefix**: Establishes a base path for all routes within the directory. With `autoprefix` enabled, specifying a prefix here is disallowed and will result in an error.

```ts
export const prefix = '/api';
```

- **Guards**: An array of guard functions for preliminary checks like authentication.

```ts
export const guards = [authGuard, logGuard];
```

- **Layers**: Middleware-like functionality applied across routes.

```ts
export const layers = [formParser, dataSanitizer];
```

- **Wraps**: Functions that envelop route handlers, adding common functionality.

```ts
export const wraps = [responseWrapper];
```

- **Fallback (reject)**: A fallback function for unmatched routes or handler errors.

```ts
export const reject = notFoundHandler;
```

## Advanced Configuration with `config.base` and `config.fn`

For more nuanced and type-safe configurations, Stric introduces `config.base` and `config.fn` utilities:

- **`config.base`**: Enables path-specific configurations, linking them directly to a base path for clearer association and readability.

```ts
import { config } from '@stricjs/app';

export default config.base('/api', {
    guards: [authGuard],
    layers: [jsonParser],
    wraps: [responseWrapper],
    reject: notFoundHandler
});
```

- **`config.fn`**: Simplifies handler configurations, focusing on functionality rather than path association.

```ts
import { config } from '@stricjs/app';

export const guards = config.fn(guard1, guard2);
```

## Key Points

The core purpose of configuring routes in Stric is to enhance the lifecycle of routes by applying guard, layer, wrap, and reject functions. This allows for a seamless integration of additional functionalities to routes, especially those under the same prefix, effectively managing authentication, middleware processes, wrapping functionalities, and error handling in a unified and scalable manner.