---
title: "Overview of new Javascript/Typescript runtimes: Bun and Deno"
description: My experience of trying new runtimes for my pet project.
date: 2024-04-05
tags:
  - javascript
  - typescript
layout: layouts/post.njk
image: /img/for_posts/bun_deno/bun_deno_cover.jpg
---

While procrastinating on my pet project I finally tried “new age” JS/Typescript runtimes: Bun and Deno. Here is my short overview.

## Intro

**Why might you want to consider using Bun or Deno?** They both promise more streamlined development experience thanks to native TypeScript support, faster overall runtime and built-in collection of helpful tools like code linting, formatting, test runner, package manager, etc. Deno also provides unique security feature: permissions over disk, network, systems calls, and environment variables.

Here is my personal experience on using both.

## Bun

![Bun logo](/img/for_posts/bun_deno/bun.png)
Bun is fast thanks to Apple’s JS engine, JavaScriptCore. Bun also has far better compatibility with existing Node.JS ecosystem thanks to using standard `node_modules`, `package.json`, etc. Seems like a solid alternative to `ts-node` (if you want your Node.JS app on Typescript). It has small caveats (like missing full support for brotli compression), but overall the experience was smooth.

Bun's HTTP(s) server module is based on extremely fast uWebSockets library [1](https://github.com/uNetworking/uWebSockets/discussions/1466#discussioncomment-3114410), [2](https://github.com/oven-sh/bun/tree/182b90896f67a8e4979b9c415e91a23ec337c281/packages/bun-uws).

Worth to mention that there is [Elysia](https://elysiajs.com/) framework which is based on Bun. In a nutshell, it's web-server with a helpful capability of producing typed response, and types are shared between server and client. This capability is also called _"end-to-end type safety"_. It's similar to tRPC, but with Express.js-like API and faster by default thanks to Bun.

## Deno

![Deno logo](/img/for_posts/bun_deno/deno.png)

Deno is slower in terms of raw performance (since it uses V8), but it provided a positive initial impression. Plain TypeScript code just worked!

Until I tried to use Prisma with it. Prisma is a great ORM (abstraction layer for various databases), but it uses small hack over `node_modules` to make generated code to work seamlessly. That’s where Deno stopped working. It uses custom cache for downloaded packages (e.g. not using `node_modules`) and has no support for CommonJS exports (`require()` function) in app’s source code. Unless you use paid “cloud” Prisma service you won’t be able to use Deno.

On Deno-focused libraries. It feels like Deno took its big shot 2 years ago, and since then, many 3rd party libraries have been abandoned. TBH I’m not sure that such distancing from Node.JS and npm will be a good service for Deno.

On a positive side Deno can be used in Jupyter Notebooks! Which is perfect for prototyping things especially with LLM and 3rd party APIs.

I also love Deno’s idea of limiting by default network, reading env variables and others. **It’s a great foundation for privacy first applications**. I think many apps with community plugins support (like my favorite note taking app, Obsidian) , would benefit greatly if somehow they could adapt this model (or Deno itself) for 3rd party extensions.

## Comparison (on April 2024)

| Feature                                       | Bun                                                                                                   | Deno                                                                                                               |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **HTTP server** speed                         | 2-3x faster                                                                                           | Slower                                                                                                             |
| **Sqlite3 speed**                             | 2.5x faster than Deno, almost 4x faster than Node.JS                                                  | Slower                                                                                                             |
| **Multi-threading**                           | Has [Web Workers API](https://bun.sh/docs/api/workers) support, but no memory sharing between threads | Has [Web Workers API](https://docs.deno.com/runtime/manual/runtime/workers) support and shared memory              |
| **Node.JS like Cluster (more on that below**) | No                                                                                                    | No                                                                                                                 |
| **Node.JS ecosystem** compatibility           | Better                                                                                                | Worse: own modules import syntax, no \_\_dirname support, no CommonJS support, essentialy no `node_modules`        |
| **Built-In Typescript support**               | Yes                                                                                                   | Yes                                                                                                                |
| **Tooling**                                   | Package manager (npm replacement), test runner, JS and CSS bundler                                    | Linter, formatter, built-in Typescript type checker, package manager, test runner                                  |
| **Security**                                  | Same as Node.JS                                                                                       | Much better thanks to core mechanisms of limiting network, system calls, disk, environments reads and writes, etc. |
| **Avarage RAM usage**                         | Almost twice lower than Deno                                                                          | Similar to Node.JS                                                                                                 |
| **Ownership**                                 | Both venture capital backed (yes, there is always a risk projects development might be dropped)       |                                                                                                                    |

Overall, judging from toolset Bun is more full-stack focused and Deno is more back-end focused.

## On performance

A few words on real-life performance. To be honest, it's a big separate topic, but short summary might sound like this.

First of all, **not everyone needs to care about performance**, especially on early stages of a product. Things like reliability, community support, compatibility with Node.JS ecosystem, developer experience (tooling) are much-much more important for the initial success of a product than raw performance. Still, if it's critical for your app to be as fast as possible, here is a short guide.

**If your app is not that CPU-intensive**, Bun is a good choice since it almost 6 times faster than Node.JS on a single instance (win depends on a case, but it's always faster). Deno is also fine, since it's 2-3 times faster than Node.JS.

**If your app is CPU-intensive**, the simplest way is to use Node.JS Cluster API which is a wrapper over creating isolated instances of the same app. It's memory heavy (since processes are isolated), but still gives a good performance boost. Both Deno and Bun doesn't have such API. It can be mitigated by using higher-level solutions like load balancers (for instance [GoBetween](https://gobetween.io/index.html)), but it's a fairly more complex solution.

**If your app is CPU and memory intensive** (e.g. you're working with large datasets) for all runtimes you can leverage Web Workers API which provides multi-threading capabilities. It will require manual separation of code chunks that should and can be executed in a separate threads, but it gives a much lower memory overhead since there is still one instance of a runtime. In this case Deno might be a better choice since it supports shared memory primitives (SharedArrayBuffer). However, Bun might be fine as well if don't need to share data between threads.

## Conclusion

Personally, I decided to go with Bun for my pet project since I use SQLite a lot, plan to add a front-end and I'm not ready spend additional time resolving Deno's incompatibilities with Node.js. However, I use occasionaly Deno in Jupyter Notebooks for prototyping with LLM and third-party APIs.

## Links

- [Nice comparison article between NodeJS, Bun and Deno](https://snyk.io/blog/javascript-runtime-compare-node-deno-bun/)
- [Another good comparison with memory usage stats](https://medium.com/deno-the-complete-reference/node-js-vs-deno-vs-bun-benchmark-for-a-real-world-case-jwt-postgres-pdf-gen-9fbd94bb9a83)
- [Features table comparison](https://dev.hexagon.56k.guru/posts/deno-vs-bun-vs-node/)
- [Benchmark of Bun, Deno, Node.JS and Go including cluster mode](https://www.reddit.com/r/node/comments/13oqbvi/i_have_done_a_full_benchmark_of_a_post_rest_api/)
