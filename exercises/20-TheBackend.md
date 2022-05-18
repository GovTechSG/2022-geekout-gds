# 2.0 The Backend

[Back to Exercises](./README.md) | [Next Exercise >](./21-OneRead.md)

So far, the front-end app has been supported by a backend which provides persistence. As a warm-up, we're going to complete an implementation of the [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) interface.

Navigate to `backend/src/routes`. You'll find the following files:

| File      | Description |
| ----------- | ----------- |
| `index.ts`      | A cosmetic holder for all routes / methods supported. Most importantly, it does `default export` of an `express.Router()`, which will be used by the App  |
| `methods.ts`   | Create and Read have been implemented here |
| `newMethods.ts`   | You will implement 3 remaining methods (Read single, Delete and Update) here |

## Setting up
```
cd backend && npm install
```

## Base checkpoint
```
npm run test:0
```

At this point you should have `6 skipped, 3 passed, 9 total` but as we progress through today's walkthrough we will be running more tests.

## Tasks

As Create API call has been done, we will only be focusing on implement Read, Update and Delete API calls

In the first exercise, we will be implementing the Read API call to allow the information retrieval of a single item.

In the second exercise, we will be implementing the Delete API call to allow the deletion of item from the todo list.

In the last exercise, we will be implementing the Update API call to allow the update of item description/status details.

Load [Swapper API UI](http://localhost:3001/swagger) to easily test the API functions on the go through the exercises.

[Back to Exercises](./README.md) | [Next Exercise >](./21-OneRead.md)