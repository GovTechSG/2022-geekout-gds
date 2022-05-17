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
Right now, `updateTodoById` is stubbed out, returning the HTTP code for Not Implemented.

Edit the code - it should modify the `todoList` and return `200` upon success. For more details, navigate to the `swagger.json` documentation to check intended behaviour. Or, if you prefer to use a UI, start up Docker compose and find the docs [locally hosted](http://localhost:3001/swagger).

> **At this point you only need to implement return codes 200 and 400**

When your code is complete, `npm run test:3`. You should find that 2 more tests (`"PUT /todos/{id}"`) are passing!

The total should now be `9 passed, 9 total`. Ignore the errors for now, we will be addressing them below.

[Back to Exercises](./README.md) | [Solution](../solutions/23-UpdateOutdated.md)