---
title: How to assign a variable to switch statement result
description: Simple and useful JS snippet
date: 2022-09-01
tags:
  - javascript
  - typescript
  - flow
layout: layouts/post.njk
---

It’s a helpful trick that allows writing compact yet highly type-proof code to deal with enums both in TypeScript and Flow.

```js
const result = (function () {
  switch (step) {
    case Step.One:
      return { one: 1 };
    case Step.Two:
      return { two: 2 };
    case Step.Three:
      return { three: 4 };
  }
})();
```

I use in React `render` as well.
