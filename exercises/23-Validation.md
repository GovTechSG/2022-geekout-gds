# Extra content: Validating data

[< Back to Exercises](../exercises/README.md)

> This is an optional exercise

Another vital component in backend applications is validation - whenever data can be modified, there should be measures to ensure that it does not get corrupted.

For example, with the current way we update our TodoList it is possible to send a `"PUT /todos/{id}"` that looks like this:

Request to `PUT /api/todos/{id of existing Todo}`

```
{
    id: "I can put anything here, I can even put the UUID of another todo"
    description: "Regular description"
    done: false
}

```

Another simple example would be if we wanted to prevent certain data from being deleted. (e.g. A todo with the description "Improve backend")

To prevent these scenarios, let's implement two extra checks to our app:

1. When a PUT request is made, if the `id` in the path and body do not match then return a code 409[^1] error with the message `UUID in path and body do not match` 
3. When a DELETE request is made, if the `description` of the Todo is `Improve backend` - return a code 405[^2] error with the message `This todo cannot be deleted` 

### Extra checkpoint
You can use the command `npm run test:extra` to see if you've validated these scenarios correctly.

[^1]: [HTTP code 409 - Conflict](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409)
[^2]: [HTTP code 405 - Method Not Allowed](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409)