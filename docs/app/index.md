# Getting Started

Stricjs provides a streamlined way to build web applications. To get started, you first need to install the main component, `@stricjs/app`.

## Installation

Use Bun to install `@stricjs/app`:

```bash
bun add @stricjs/app
```

## Initializing Your Application

Once installed, you can set up your application by importing and running the `init` function from `@stricjs/app`. This function requires a configuration object where you specify essential settings for your application, such as the routes.

### Example:

Create an entry point file (e.g., `index.ts`) and add the following code:

```ts
import { init } from '@stricjs/app';

init({
    // Specify the directories where your route files are located
    routes: ['./src']
});
```

In this example, `routes` is a configuration option that defines where Stricjs should look for route files in your project. The `./src` path is a common choice, indicating that route files are located in the `src` directory at the root of your project.

This minimal setup is all you need to get your Stricjs application running. As you develop your application, you can expand the configuration to include additional options and features provided by Stricjs.