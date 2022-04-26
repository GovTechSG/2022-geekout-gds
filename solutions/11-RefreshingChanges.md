# 1.1 Refreshing Changes

[Back to Exercises](../exercises/README.md) | [Example](../exercises/11-RefreshingChanges.md)

> As a user, I would like to see if my todo list has changed since the last time I checked.
> 
> It would be awesome to also have a visual indication of the system working on my request. ^_^

In this exercise, we will add a refresh button to the Todo application.

---

## Adding a button

Let's start by adding a button.
```tsx
<Button type="button" isOutline>
  <span className='sgds-icon sgds-icon-refresh' />
</Button>
```

The button can be placed anywhere, we've decided to put it just above the table and to the right of the 'Submit' button.
```diff
  <Row>
    <Col is={10}>
      <input className="input" id='newTodoDescription' type='text' value={newTodoDescription}
        onChange={(event) => { setNewTodoDescription(event.currentTarget.value) }} />
    </Col>
    <Col>
      <Button isPrimary isLoading={false}>Submit</Button>
    </Col>
    <Col>
+     <Button type="button" isOutline>
+       <span className='sgds-icon sgds-icon-refresh' />
+     </Button>
    </Col>
  </Row>
```

These Buttons are standard SGDS components and come in different styles! Check them out [here](https://govtechsg.github.io/sgds-govtech-react/?path=/story/components--buttons).

---

## Making it click

When a button is `clicked`, it fires the attached `onClick(event)` handler.
Start by defining a new callback:

```tsx
const onRefreshClicked = useCallback(async () => {
  console.log('Refresh button clicked');
}, []);
```

Then hook it up to the button:
```diff
+ <Button type="button" isOutline onClick={onRefreshClicked}>
    <span className='sgds-icon sgds-icon-refresh' />
  </Button>
```

When refresh is clicked, you should now see a log entry appear in the console!

Instead of calling `console.log()`, let's make it call `populateTodos`:
```diff
const onRefreshClicked = useCallback(async () => {
  console.log('Refresh button clicked');
+ await populateTodos();
+ console.log('todoList updated');
}, [populateTodos]);
```

An *asynchronous* function `populateTodos()` is making a network call to our backend API to get the latest `todoList`. The `await` keyword means that these statements will block, happening *sequentially* one after another. That means that the second log entry is created only after the refresh is complete.

The dependencies array `[populateTodos]` tells React to watch out for changes in `populateTodos`. It's easy to get used to, and you'll see more of it later.

---

## Making Progress

Visual feedback is an important way of communicating with the user.

A progress indicator satisfies the user's need to know that the system received, and is processing, their request.

Start by adding a new piece of state to the Todo component:
```tsx
const [isRefresh, setIsRefresh] = useState(false);
```

Creating state in this way is useful because React can 'hook' into every modification to the state and help keep track of what changed / needs to be rendered again.

When calling the `useState()` hook, React gives you a read-only variable (with the default parameter specified in the `useState<T>(default: T)` call), and a setter you can call like this: `setIsRefresh(true)`.

Let's hook up the `isRefresh` state to the button's progress indicator.
```diff
+ <Button type="button" isOutline isLoading={isRefresh} onClick={onRefreshClicked}>
    <span className='sgds-icon sgds-icon-refresh' />
  </Button>
```

When the button is clicked, it should set the loading indicator with `setIsRefresh(true)`.
```diff
  const [isRefresh, setIsRefresh] = useState(false);
  const onRefreshClicked = useCallback( async () => {
+   setIsRefresh(true);
+   setTimeout(async () => {
      await populateTodos();
+     setIsRefresh(false);
+   }, 400);
  }, [populateTodos]);
```

The refresh animation starts before starting the actual refresh operation. When the `await populateTodos()` synchronously completes, the refresh animation stops.

On a local network, this refresh happens too quickly to be perceptible, so we're waiting a couple hundred milliseconds to ~~charge our capacitors~~ queue up the request.

---

[Back to Exercises](../exercises/README.md) | [Example](../exercises/11-RefreshingChanges.md)
