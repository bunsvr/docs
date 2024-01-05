---
prev:
  text: 'Performance'
  link: '/docs/performance'
next:
  text: 'Routes'
  link: '/docs/app/routes'
---

# Getting started
`@stricjs/app` is the main component to build web applications.

Install using Bun:
```bash
bun add @stricjs/app
```

In your entry point, import and run the `init` function with a set of configs.
```ts
import { init } from '@stricjs/app';

init({
    // Directories that routes are located
    routes: ['./src']
});
```
