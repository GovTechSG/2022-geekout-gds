# Completing the CRUD API

[< Back to Exercises](../exercises/README.md)

## Checkpoint Two
If you have yet to complete the previous task but would like to proceed
```
git checkout backend/checkpoint-1
```

After which run the tests

```
npm run test:2
```

At this point you should have `2 failed 2 skipped, 5 passed, 12 total` but as we progress through today's walkthrough we will be running more tests.

## Delete
In `index.ts`, you'll notice that we expose a Delete method as a `DELETE` call to `/todos/:id`. However, the implementation is stubbed and will require further work to ensure proper deletion of specific item.

Implement the method for this route `/todos/:id` which will delete a single object based on `id`. For experienced devs, this will be super easy, but just in case, here's a checklist of files you should be touching:

| File      | Necessary work |
| ----------- | ----------- |
| `newMethods.ts`   | Implement the `deleteTodoById` method. Remember to handle error cases such as item does not exist! |

Once more, when your code is complete, `npm run test:2` to verify. With the `"GET /todos/{id}"` tests passing, the total should now be `2 skipped, 7 passed, 9 total`

[Back to Exercises](./README.md) | [Solution](../solutions/22-NotNeeded.md) | [Next Exercise >](./23-UpdateOutdated.md)