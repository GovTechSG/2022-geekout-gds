# Completing the CRUD API

[< Back to Exercises](../exercises/README.md)

So far, the front-end app has been supported by a backend which provides persistence. As a warm-up, we're going to complete an implementation of the [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) interface.

Navigate to `backend/src/routes`. You'll find the following files:

| File      | Description |
| ----------- | ----------- |
| `index.ts`      | A cosmetic holder for all routes / methods supported. Most importantly, it does `default export` of an `express.Router()`, which will be used by the App  |
| `methods.ts`   | Create, Read and Delete have been implemented here |
| `newMethods.ts`   | You will implement 2 remaining methods (Read single and Update) here |

## Setting up
```
cd backend && npm install
```

## Base checkpoint
```
npm run test:0
```

At this point you should have `7 skipped, 5 passed, 12 total` but as we progress through today's walkthrough we will be running more tests.

## Update
Right now, `updateTodoById` is stubbed out, returning the HTTP code for Not Implemented. 

Edit the code - it should modify the `todoList` and return `200` upon success. For more details, navigate to the `swagger.json` documentation to check intended behaviour. Or, if you prefer to use a UI, start up Docker compose and find the docs [locally hosted](http://localhost:3001/swagger).

> **At this point you only need to implement return codes 200 and 400**

Feel free to reference the implementation of `deleteTodoById` - the necessary code is very similar!

When your code is complete, `npm run test:1`. You should find that 2 more tests (`"PUT /todos/{id}"`) are passing!

The total should now be `2 failed, 3 skipped, 7 passed, 12 total`. Ignore the errors for now, we will be addressing them below.

## Read
In `index.ts`, you'll notice that we expose a Read method as a `GET` call to `/todos`. But while this API provides the entire Todo list, it's quite unusual that a frontend will want everything at once. More typically, frontends will request for a single object, as specified by their `id`.

Implement this new route. For experienced devs, this will be super easy, but just in case, here's a checklist of files you should be touching:

| File      | Necessary work |
| ----------- | ----------- |
| `newMethods.ts`   | Export a new function out of this file. The signature will be identical to the previous functions. Remember to handle error cases! |
| `index.ts`      | You'll need to add a new route on `todoRouter`, and import the new method you wrote in `newMethods.ts` |


Once more, when your code is complete, `npm run test:1` to verify. With the `"GET /todos/{id}"` tests passing, the total should now be `3 skipped, 9 passed, 12 total`