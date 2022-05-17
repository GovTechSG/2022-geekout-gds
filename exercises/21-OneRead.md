# Completing the CRUD API

[< Back to Exercises](../exercises/README.md)

## Checkpoint One
```
npm run test:1
```

At this point you should have `2 failed 4 skipped, 3 passed, 9 total` but as we progress through today's walkthrough we will be running more tests.

## Read
In `index.ts`, you'll notice that we expose a Read method as a `GET` call to `/todos`. But while this API provides the entire Todo list, it's quite unusual that a frontend will want everything at once. More typically, frontends will request for a single object, as specified by their `id`.

Implement the method for this route `/todos/:id` which return a single object based on `id`. For experienced devs, this will be super easy, but just in case, here's a checklist of files you should be touching:

| File      | Necessary work |
| ----------- | ----------- |
| `newMethods.ts`   | Implement the `getTodoById` method. Remember to handle error cases such as not found! |

Once more, when your code is complete, `npm run test:1` to verify. With the `"GET /todos/{id}"` tests passing, the total should now be `4 skipped, 5 passed, 9 total`

[Back to Exercises](./README.md) | [Next Exercise >](./22-NotNeeded.md)