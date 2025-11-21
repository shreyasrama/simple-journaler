# simple-journaler - Tanstack rewrite

This branch is a rewrite of simple-journaler (a journaling app first written in Svelte 4) using the latest Tanstack tools, and is intended as a way to learn cutting edge React, while trying to implement things like accessibility best practices and good UI/UX.

Also, I'm aiming to not use AI in its development, or more specifically code-generation LLMs. Instead, I'll use library documentation and Google Search (and I'll try to avoid the AI results and opt for StackOverflow links).

However, working with the cutting edge and being a hobbyist full-stack dev means I may encounter errors that I can't Google my way out of. In those cases, I'll defer to AI but I'll post a brief summary of what I encountered and how AI fixed as a method of accountability.

## AI accountability log

### 21 November, 2025

I received the following error:

```
ReferenceError: BroadcastChannel is not defined
```

Along with a stacktrace pointing at SQLocal. I knew it was something to do with client/server code, but I convinced myself that everything was running on the client as I intended. I checked if the SQLite DB had any entries in it via Tanstack's `createClientOnlyFn`. However the issue was in my `home.tsx` component, where I initialised the database to then send to the client-only function.

AI's response:

```
This error occurs because `BroadcastChannel` is a browser API that's not available in the Node.js SSR (Server-Side Rendering) environment that TanStack Start uses. SQLocal is trying to instantiate a `BroadcastChannel` during server-side rendering, which fails.
...
I can see the issue! The `SQLocalDrizzle` instance is being created at the module level, which means it runs during SSR on the server.
```

It suggested to put my existing code in a `useEffect` in the `Home` component. I complied but maybe the better solution is to use Tanstack's client-only components.

In hindsight, looking more carefully at the stacktrace would have helped - there was a clear line reference to the SQLocal initialisation in the `Home` component which would have indicated to me that this code was running on the server.
