# Completing the CRUD API

[< Back to Exercises](../exercises/README.md)

## Base checkpoint

If you have yet to complete the previous task but would like to proceed
```
git checkout backend/checkpoint-2
```

After which run the tests

```
npm run test:3
```

At this point you should have `2 failed, 7 passed, 9 total` but as we progress through today's walkthrough we will be running more tests.

## Update
In `index.ts`, you'll notice that we expose a Update method as a `PUT` call to `/todos/:id`. However, the implementation is stubbed and will require further work to ensure proper update of the specific item.

Implement the method for this route `/todos/:id` which will update a single object based on `id`. For experienced devs, this will be super easy, but just in case, here's a checklist of files you should be touching:

| File      | Necessary work |
| ----------- | ----------- |
| `newMethods.ts`   | Implement the `updateTodoById` method. Remember to handle error cases such as item does not exist! |

When your code is complete, `npm run test:3`. You should find that 2 more tests (`"PUT /todos/{id}"`) are passing!

The total should now be `9 passed, 9 total`.

[Back to Exercises](./README.md) | [Solution](../solutions/23-UpdateOutdated.md)