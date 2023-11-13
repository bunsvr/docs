# Performance
Let's talk about performance and what we do to improve it.

## What is Wint?
[Wint](//github.com/aquapi/wint) is a collection of URL routers built by the creator of Stric.

The package currently includes a plain Radix tree router, 
a faster router with fast static match, and a more optimized 
version of the second router that directly called the handler 
if the request matches any handler.

Stric internally uses the third router, which matches Stric API design.

## How does it perform?
Take a look at the results:

![Chart](https://raw.githubusercontent.com/bunsvr/benchmark/main/results/chart.png)

Stric API is designed to do things only when needed.

Static and dynamic path handlers are put into a map 
with the corresponding method as the key, so the path 
is only sliced out of the URL string when the method matches.

The dynamic handler uses the `@medley/router` algorithm,
but it is compiled ahead-of-time to reduce uneccessary work and
make the code statically analyzable by the underlying JavaScript engine.


