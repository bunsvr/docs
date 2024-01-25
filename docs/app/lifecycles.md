# Managing Lifecycles
Stric provides a structured approach to handling the lifecycle of route handlers, offering functions like `guard`, `wrap`, `layer`, and HTTP method handlers like `get`. Understanding the order and purpose of these functions is crucial for building efficient and maintainable routes.

## Understanding Execution Order
In Stric, the execution order of route-related functions is deterministic and follows a specific pattern. When `guard`, `layer`, `get` (or other HTTP methods), and `wrap` are used together, they are executed in the following order:

1. **Guards (`guard`)**: Functions added through `guard` are executed first. They are ideal for authentication, authorization, or any preliminary checks and data preprocessing needed before the main route handlers.

2. **Layers (`layer`)**: Layers are a special type of guard function. They are typically used for functionalities that should not affect the main processing flow, like logging or adding context information. Their outcomes do not undergo validation checks, unlike guards.

3. **HTTP Method Handlers (`get`, `post`, `put`, etc.)**: These are the main route handlers. They handle the core logic for the route and are executed after all guards and layers.

4. **Wrappers (`wrap`)**: Functions added through `wrap` are executed after the main route handlers. They are used for post-processing tasks like response formatting, logging, or cleanup operations.

### Visual Representation of Execution Flow:
```
[Guard Functions] -> [Layer Functions] -> [HTTP Method Handlers] -> [Wrap Functions]
```

### Practical Example:
```ts
routes()
    .guard(guard1, guard2)   // Executes first and second
    .layer(layer1)           // Executes third
    .get('/', handler1, handler2) // Executes fourth and fifth
    .wrap(wrap1, wrap2);     // Executes sixth and seventh
```

## Detailed Explanation of Lifecycle Functions
- **`guard` Functions**: Use `guard` for operations that need to run before the main handlers. If a guard returns `null`, subsequent handlers are skipped, and a fallback handler is invoked if defined.

- **`layer` Functions**: Use `layer` for adding non-critical functionalities that should not interfere with the main route processing. They are similar to guards but their return values are not validated.

- **HTTP Method Handlers (`get`, `post`, etc.)**: Define the core logic of your route with these handlers. They process the incoming requests and generate responses.

- **`wrap` Functions**: Use `wrap` for operations that should run after the main handlers. They are ideal for post-processing, like modifying the response or performing cleanup tasks.

By understanding and utilizing these lifecycle management functions, developers can create well-structured and efficient routing mechanisms, ensuring that each part of the request processing pipeline is clearly defined and executed in an organized manner.
