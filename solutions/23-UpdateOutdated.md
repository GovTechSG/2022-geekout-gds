# 2.3 Update Outdated

[Back to Exercises](../exercises/README.md) | [Example](../exercises/23-UpdateOutdated.md)

## updateTodoById

Similarly let's start by getting the `id` from the request params.
```tsx
    const { id } = req.params;
```
Next get the updated todo information through the request body

```tsx
    const updatedTodo = req.body;
```
Check that the `id` given match the `id` in `req.body`

```tsx
    if (updatedTodo.id !== id) {
      return res.status(409).json({message: "UUID in path and body do not match"});
    }
```

Now with the `id` that is matched, check that it is present in `todoList`. If it is present update the item in `todoList` and return with status `200` else `400` if not found

```tsx
    if (updatedTodo.id !== id) {
      return res.status(409).json({message: "UUID in path and body do not match"});
    } else if (id in todoList) {
        todoList[id] = updatedTodo;
        return res.status(200).send();
    } else {
        return res.status(400).json({ message: "UUID does not exist" });
    }

```

Your function should look like the following

```diff
export async function updateTodoById(req: Request, res: Response) {
-- return res.status(501).json({ message: "Not implemented" });
++ if (updatedTodo.id !== id) {
++  return res.status(409).json({message: "UUID in path and body do not match"});
++ } else if (id in todoList) {
++  todoList[id] = updatedTodo;
++  return res.status(200).send();
++ } else {
++  return res.status(400).json({ message: "UUID does not exist" });
++ }
}
```
---

[Back to Exercises](../exercises/README.md) | [Example](../exercises/23-UpdateOutdated.md)
