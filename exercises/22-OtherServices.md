# Calling other services

[< Back to Exercises](../exercises/README.md)

When building real-life applications, one of the most common practices is to utilize functionality that others already provide. 

For instance, let's say we want to be able to add random Todos and add them to the list.
We can use [boredapi](https://www.boredapi.com/api/activity) which is an existing endpoint that suggests different activites. Click on the link in your browser (i.e. send a GET request). You'll see something like:
```
{
    activity : "Go to a concert with local artists with some friends",
    type: "social",
    participants: 3,
    price: 0.4,
    link: "",
    key: "2211716",
    accessibility: 0.3
}
```

You can retrieve these packets in code with the following snippet:
```
const responseJson = await fetch("https://www.boredapi.com/api/activity")
  .then(apiResponse => apiResponse.json());
```
Just remember to add the import `npm install node-fetch` and at the top of your file,
```
import fetch from "node-fetch";
```

As shown above the response provides us with things such as type and participants. However, we are only interested in the `activity` field.

`const randomActivity = responseJson.activity;`

Next, you will need to: 
1. construct a Todo object (hint: see `createTodo`)
2. add it into our todoList
3. return it in the response

### Checkpoint
When your code is complete, `npm run test:2` to verify. With the `"POST /todos/random"` tests passing, the total should now be `2 skipped, 10 passed, 12 total`.

### Demo: Getting ghosted
![images](https://user-images.githubusercontent.com/31716292/134328422-40afa902-9667-48e0-a128-951340cb3f0c.png)

Let's try changing the fetch url from `https://www.boredapi.com/api/activity` to 
`https://asia-east2-govtech-tracer-stg.cloudfunctions.net/timeout`. Now either `npm run test:2` again or click on `try it out` within the swagger UI, what happens?

In the swagger UI, we are left hanging indefinitely and viewing the test results we see that jest itself times out stating that tests should complete within 5 seconds.

We can implement a simple timeout mechanism using `AbortController`

```
const abortController = new AbortController();
setTimeout(() => abortController.abort(), 3000);
```

Once declared we can add it into our fetch request like this

```
const responseJson = await fetch(
      "https://asia-east2-govtech-tracer-stg.cloudfunctions.net/timeout",
      {
        signal: abortController.signal,
      }
    ).then((apiResponse) => apiResponse.json());
```

Now all that's left is to surround this code block with a simple try/catch in order to handle the error.

### Summary
When calling other services/endpoints, it is best that we understand what can go wrong and deal with them on our end. In this case, we would not want our frontend app to have the burden of timing out. 

Returning a code 500 error allows the frontend to have a response within 3 seconds and display some message accordingly if it was unsuccessful.

### The end
Congratulations! You have created a simple backend Todo app!

If you finished early or are interested in doing just a bit more, there is an [additional exercise on validation](../exercises/23-Validation.md)