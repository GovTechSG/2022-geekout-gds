# 2.1 One Read

[Back to Exercises](../exercises/README.md) | [Example](../exercises/21-OneRead.md)

## getTodoById

Let's start by getting the `id` from the request params.
```tsx
    const { id } = req.params;
```

Now with the `id` check that it is present in `todoList`. If it is present retrieve the item information and convert it into json format with status `200` else `400` if not found

```
    if (id in todoList) {
      return res.status(200).json(todoList[id]);
    } else {
      return res.status(400).json({ message: "UUID does not exist" });
    }
```

Your function should look like the following

```diff
export async function getTodoById(req: Request, res: Response) {
-- return res.status(501).json({ message: "Not implemented" });
++ const { id } = req.params;
++ if (id in todoList) {
++  return res.status(200).json(todoList[id]);
++ } else {
++  return res.status(400).json({ message: "UUID does not exist" });
++ }
}
```
---

[Back to Exercises](../exercises/README.md) | [Example](../exercises/21-OneRead.md)
