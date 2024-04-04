---
title: How to fix stale React useState's state in a callback
description: Simple and useful JS snippet
date: 2024-04-04
tags:
  - react
  - javascript
  - typescript
layout: layouts/post.njk
---

## Problem statement

React components can accept a function as a prop value (usually it called "callback function"). It's a usual pattern when you need to perform an action as a reaction to some event like on click, on modal hide/open, etc.

Some component libraries (like "react-materialize") may **incorrectly cache initial function** and never update it on following re-renders. So when the time comes to call this callback function (e.g. on a button click), it will **use the initial function value**.

If an initial function doesn't hold any state in its closure, it's not a big problem. But if it does, you may face a **stale state** issue like Matt in [this StackOverflow question](https://stackoverflow.com/questions/73697416/react-stale-usestate-value-in-closure-how-to-fix/77282546#77282546). I also faced the issue using one of internal library components in my project which was also a modal component. I guess it happens due to usage of react's utils for creating modals (mainly `createPortal` API) which is [the case](https://github.com/react-materialize/react-materialize/blob/d36a4ddad2781e1eb206007c5b615033c5c1c5d5/src/Modal.js#L89) for `react-materialise` Modal component.

The leading response on StackOverflow is correct, but there is a room for improvement which I outlined in [my response](https://stackoverflow.com/a/77282546/297939) and will unfold more in this blog post.

## Solution

Let's take an example similar to the one from the StackOverflow question:

```jsx
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("");

  console.log("State's value on render =", value);

  // This function is created each time on every re-render
  // So it holds a correct state value
  const callbackFn = () => {
    console.log("State value inside callbackFn =", state);
    setIsOpen(false);
  };

  return (
    <div className="App">
      <Button onClick={() => setIsOpen(true)}>Show modal</Button>
      {/** Modal component from react-materialize */}
      <Modal open={isOpen} options={{
        {/**
            We defined a callback which will be fired on modal close.
            `options` is an object which is also created fresh on each re-render.
            (!) But due to aggressive caching in Modal component,
            it will use initial value of `options` prop each re-render,
            so `onCloseStart` will have a "stale" value of `callbackFn`
        */}
        onCloseStart: () => callbackFn(value)
      }}>
        <Button onClick={() => setValue("new value")}>Update state's value</Button>
        <Button onClick={() => setIsOpen(false)}>Hide modal</Button>
      </Modal>
    </div>
  );
}
```

The solution for stale state inside `callbackFn` is to use `useRef` which will hold inside the latest value of `callbackFn`. Essentially, we will create a stable container (object) with `current` property and we will update `current` property on each re-render with a fresh instance of `callbackFn`:

```jsx
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("");

  const callbackFn = () => {
    console.log("In callback state =", state);
    setIsOpen(false);
  };
  const callbackRef = useRef(callbackFn); // <-- the new line
  callbackRef.current = callbackFn; // <-- the new line. Store the latest callbackFn on each re-render

  return (
    <div className="App">
      <Button onClick={() => setIsOpen(true)}>Show modal</Button>
      <Modal
        open={isOpen}
        options={{ onCloseStart: () => callbackRef.current() }} // <-- updated line
      >
        <Button onClick={() => setState("foo")}>Set state</Button>
        <Button
          onClick={() => {
            setIsOpen(false);
            console.log("state on hide click =", state);
          }}
        >
          Hide modal
        </Button>
      </Modal>
    </div>
  );
}
```

Here is you can find a [working example](https://codesandbox.io/p/sandbox/react-stale-usestate-value-in-closure-how-to-fix-forked-tnj6x2) on CodeSandbox.
