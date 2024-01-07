---
title: Step-by-Step Guide. Creating a React Hook for Web Page Element Movement Using RxJS
description: A detailed guide on creating a React hook for adding draggable functionality to web elements using RxJS, with a focus on practical implementation and testing.
date: 2024-01-07
tags:
  - javascript
  - typescript
  - rxjs
layout: layouts/post.njk
image: /img/for_posts/rxjs_example/cover.png
---

There are certain tasks for which RxJS is ideally suited. One such task is combining multiple "streams" of events to create a particular gesture. In this article, we will step-by-step write a universal React hook that allows attaching a movement gesture to any HTML element.

## Why Choose These Approaches

It is possible to combine 3 event emitters (for pointerdown, pointermove, pointerup events) without using RxJS, but I hope as the narrative progresses, you will appreciate the compactness and elegance of the solution using RxJS. In addition to the aesthetic sensations, there is an objective reason - it is difficult, if not impossible, to write tests for "pure" event emitters.

Instead of `MouseEvents`, the relatively new standard `PointerEvents` is used, which eliminates the need for writing specific code for mobile devices.

The code also uses TypeScript, because now TS is the only way to write a somewhat large project with a lifespan of more than a year.

## What We Get in the End

In the end, we get an application like this - https://codesandbox.io/p/sandbox/react-usedraggable-hook-on-rxjs-with-composable-refs-vz3pp

![Example screenshot](/img/for_posts/rxjs_example/1.png)
You will be able to move the grey div vertically.

## Step by Step

First, let's define the design of our solution. Here are its main elements:

- The logic of generating drag gesture events in a separate module. The module's API does not depend on the final framework in which it will be used. The logic should be covered by tests.
- We format the logic in the React application as a universal hook.
- Use the hook in the component that we want the user to be able to move.
- Correctly unsubscribe from listening to all events upon the destruction (unmount) of the react element.

## Drag Gesture Module

A drag gesture is a gesture of moving an object across the screen. It consists of a composition of events:

- Pressed on the element (pointerdown);
- After that press, start listening to pointer movement events (pointermove);
- Listen and respond to movements by changing the style transform: `translateY(<...>px);`
- Listen until the user releases (removes from the screen) the pointer (pointerup).

![Sequence of Events](/img/for_posts/rxjs_example/2.png)

Here is a code for the logic:

```typescript
export type DragEvent = { x: number; y: number };
export function createDragObservable<T extends PointerEvent>(
  up$: Observable<T>,
  down$: Observable<T>,
  move$: Observable<T>
): Observable<DragEvent> {
  let startPosition: DragEvent;
  return down$.pipe(
    mergeMap((e) => {
      startPosition = startPosition || { x: e.pageX, y: e.pageY };
      return move$.pipe(
        takeUntil(up$),
        map((e) => ({
          x: e.pageX - startPosition.x,
          y: e.pageY - startPosition.y,
        }))
      );
    })
  );
}
```

Yes, at first glance, RxJS seems to have a not very understandable API, but once you get used to it, you really start to enjoy how compactly you can describe complex operations.

What is happening here:

- Our function receives three "streams" (we will call them "streams", but in reality, this is a more general abstraction, based on the **Observable** pattern):
- a stream of mouse click events on our element — `down$`,
- a stream of mouse "release" events — `up$`,
- a stream of cursor movement events — `move$`.

The arguments end with a `$` not because of a craving for money (off-screen laughter), but to indicate that these variables are streams. This is a generally accepted convention in RxJS.

The function returns a new stream that sends events only when the mouse is actually moving after clicking on the element.

The function's body can be literally read as: we start listening to the stream of mouse click events (`down$`), and when an event occurs, we switch to listening to another stream, which will be returned by the function inside the `mergeMap` operator.

```typescript
return down$.pipe(
  mergeMap((e) => {
    startPosition = startPosition || { x: e.pageX, y: e.pageY };
    return move$.pipe(
      takeUntil(up$),
      map((e) => ({
        x: e.pageX - startPosition.x,
        y: e.pageY - startPosition.y,
      }))
    );
  })
);
```

The new stream in **mergeMap** is "listening" to the mouse pointer movement events `move$`, which we listen to until an event from the "pointer release" stream up$ appears (this is handled by the `takeUntill` operator).

All events from the `move$` stream are transformed (`map` operator) into relative movement. It is relative to the initial position of the element.

The test for this logic looks like this:

```typescript
import { marbles } from "rxjs-marbles/jest";
import { createDragObservable } from "./use-draggable";

const data = {
  d: new PointerEvent("mousedown"),
  m: new PointerEvent("mousedown"),
  u: new PointerEvent("mousedown"),
};

describe("useDraggable", () => {
  it(
    "emits drag events only after mousedown and end after mouseup",
    marbles((m) => {
      const down$ = m.hot("-d--------", data);
      const move$ = m.hot("mmmmm-mmmm", data);
      const up$ = m.hot__("-------u--", data);
      const expectedDrag$ = m.hot("-eeee-ee--", { e: { x: 0, y: 0 } });

      const drag$ = createDragObservable(up$, down$, move$);
      m.expect(drag$).toBeObservable(expectedDrag$);
    })
  );
});
```

Here, the library that facilitates testing RxJS is used - https://github.com/cartant/rxjs-marbles

Its API is based on the same scheme for describing streams that is used to explain a solution that uses streams - marble diagram, or bead diagram. A typical diagram might look like this:

![typical diagram rxjs](/img/for_posts/rxjs_example/3.png)

The diagram explains the principle of the `takeUntill` operator.
In this example, the first thread is a stream of some events (in our case, it is the `move$` stream - pointer movement), the second stream is the argument of the `takeUntil` operator, an emit event in this stream "stops" the emit event in the resulting stream (in our case, the emit event "pointer lifted" in the `up$` stream stops listening to pointer movement events).

Similarly, our test on **rxjs-marbles** is read:

- "-" means that nothing is emitted at this time quantum
- "d" means that event d is emitted. The second argument is a map where the index d corresponds to a PointerEvent object.
- "m", "u", "e" - is the same kind of event emit, but with different meanings.

```typescript
const down$ = m.hot("-d--------", data);
const move$ = m.hot("mmmmm-mmmm", data);
const up$ = m.hot__("-------u--", data);
const expectedDrag$ = m.hot("-eeee-ee--", { e: { x: 0, y: 0 } });
```

`drag$` is the stream created by our function, expectedDrag$ are the values that drag$ should emit after processing the streams.

Accordingly, the line:

```typescript
m.expect(drag$).toBeObservable(expectedDrag$);
```

launches the test check.

## Universal React Hook for Adding "Movability" to HTML Elements

Hook's code:

```typescript
export function useDraggable(draggableRef: React.RefObject<HTMLElement>) {
  const drag$ = useRef<Observable<DragEvent>>();
  useLayoutEffect(() => {
    if (!draggableRef.current) {
      return () => {};
    }
    const down$ = fromEvent<PointerEvent>(draggableRef.current, "pointerdown");
    const move$ = fromEvent<PointerEvent>(document, "pointermove");
    const up$ = fromEvent<PointerEvent>(document, "pointerup");
    drag$.current = createDragObservable(up$, down$, move$);
  }, [draggableRef]);

  return drag$;
}
```

The hook takes a `ref` as input, which will contain a link to the HTML element to which we are adding the ability to move.

Since the `down$` event stream can only be obtained after react renders all HTML elements (componentDidMount, or the function in useEffect, useLayoutEffect hooks), we will use `useRef` to create a mutable container into which we will write the drag gesture stream.

This `RefObject` is what we return from the hook.

## Using the Hook in a Component

The code of the component in which we use all this looks like this:

![Source code of component](/img/for_posts/rxjs_example/component.png)

We have created a container (ref-object), into which react will place a link to the rendered HTML element - `draggableDivRef`. This object was given as an argument in our hook - `useDraggable`.

In the `useLayoutEffect` hook, we described the logic of reacting to events - we update the position of the element along the Y-axis by setting the style:

```typescript
draggableDivRef.current.style.transform = `translateY(${e.y}px)`;
```

And do not forget to unsubscribe from all events:

```typescript
return () => {
  dragSubscription.unsubscribe();
};
```

And this is actually a very important part of our RxJS-based solution - we unsubscribed from the `drag$` event stream, but in fact, since it consists of a combination of three other streams, there was also an unsubscribe from these three streams (reminding you, these are `up$, down$, move$`). And this is one of the key selling points of RxJS-based solutions compared to working with traditional **Event Emitter** - in **Event Emitter** there is no cascading unsubscribe from events, and you have to handle this yourself in the code, and it is often difficult to keep track of.

The second key advantage of RxJS over the usual **Event Emitter** is the ability to test all the components of the solution: the beginning of the subscription to events, the sequence of events between several streams, the values emitted by the streams at one time or another, and the end of the subscription to events.

## How the Solution Can Be Improved Further

Add support for pointercancel events and others to cancel the gesture not only by lifting the pointer, but also by an incoming call, for example. You can learn more about working with PointerEvents and gestures in general in the lecture I prepared for the School of Interface Development at Yandex - https://www.youtube.com/watch?v=VZAcd2svW7w

It is also worth writing tests that take into account not only the order of events but also specific movement values. That is, to test that if there were two pointermove events with a 10px shift each, then the total shift will be 20px.

## Advice

Yes, to solve not the most complex task, we touched on so many topics: react, hook, refs, useEffect, rxjs, marbles, jest, and many others. Someone will say that this is over-engineering (i.e., too complex a solution to a simple problem) and they may be right, it all depends on the context!

If you need an object movement gesture, you can use one of a dozen libraries, but as a rule, 90% of the code that you will not use will come along. Typically, they do not have tests. However, if you have a startup, then this is a quite workable option.

You could have avoided using RxJS, but I can't imagine a solution that would be read and understood faster, would be more isolated, and for which it would be easier to write tests. If you, dear reader, know of such a thing and can show it - I sincerely wish to see it! Write about it in the comments.

## Resources for Learning RxJS

- ["The first" site](https://reactivex.io/) on Rx technology with a collection of basic implementations and a description of the approach Not very understandable, but comprehensive.
- [An excellent and understandable reference for many RxJS operators](https://www.learnrxjs.io/). I open it very often.
- [An introduction to RxJS through writing your own implementation of the approach in regular JS In English](https://dev.to/creeland/intro-to-rxjs-concepts-with-vanilla-javascript-4aji). The examples in JS are understandable and simple.
- [Blog of Ben Lash](https://benlesh.medium.com/) - the main maintainer of the Github repo RxJS.
