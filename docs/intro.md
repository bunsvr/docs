# Introduction

Stric is a powerful, Bun-first framework tailored for crafting high-performance web applications effortlessly. Its core philosophy revolves around speed, scalability, and providing a developer-friendly experience with straightforward, intuitive APIs.

Below is a concise guide to get you started with Stric. The guide covers the initial setup, creating a basic application, defining routes, and launching the server.

## Getting Started with Stric

### Setting Up Your Project
Begin by setting up a new Bun project and installing the necessary Stric dependencies.

```bash
# Initialize a new Bun project
bun init

# Install Stric core and utility packages
bun i @stricjs/app @stricjs/utils
```

### Configuring Your Application
Once the setup is complete, configure the entry point of your application.

1. **Modify the Entry Point File (`index.ts`):**
   Update the content of `index.ts` to initiate your Stric application.

   ```ts
   import { init } from '@stricjs/app';

   // Initialize and serve the application with a concise syntax
   init({ routes: ['./src'] });
   ```

2. **Create Route Definitions:**
   In the `src` directory, create a new file for your routes (e.g., `main.routes.ts`).

   ```ts
   import { routes } from '@stricjs/app';
   import { text, json } from '@stricjs/app/send';

   // Define and export your routes
   export default routes()
       .get('/', () => text('Welcome to Stric!'))
       .post('/json', ctx => ctx.json().then(json));
   ```

   These route handlers will be automatically recognized and registered by Stric at runtime.

### Running Your Application

To launch your application, execute the following command:

```bash
# Start the server using the entry point file
bun run index.ts

# Alternatively, you can use the shorthand command
bun .
```

By default, the application will be accessible at [localhost:3000](http://localhost:3000).

#### Customizing the Server Port

You can modify the server port in two ways:

1. **Environment Variable:** Set the `PORT` environment variable to your preferred port number.
2. **Serve Options:** Directly specify the port in the `init` configuration within your entry point file.

   ```ts
   import { init } from '@stricjs/app';

   init({ 
       routes: ['./src'],
       // Configuration for Bun.serve
       serve: { port: 8080 }
   });
   ```

   With the configuration above, your server will now listen at [localhost:8080](http://localhost:8080).

### Next Steps

You have successfully created a basic Stric application! As you continue, the documentation will introduce more advanced concepts and capabilities of the Stric framework.
