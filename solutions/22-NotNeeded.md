# 2.2 Not Needed

[Back to Exercises](../exercises/README.md) | [Example](../exercises/22-NotNeeded.md)

## deleteTodoById

Similarly let's start by getting the `id` from the request params.
```tsx
    const { id } = req.params;
```

Now with the `id` check that it is present in `todoList`. If it is present delete the item in `todoList` and return with status `200` else `400` if not found

```
    if (id in todoList) {
        delete todoList[id];
        return res.status(200).send();
    } else {
        return res.status(400).json({ message: "UUID does not exist" });
    }
```

Your function should look like the following

```diff
export async function deleteTodoById(req: Request, res: Response) {
-- return res.status(501).json({ message: "Not implemented" });
++ const { id } = req.params;
++ if (id in todoList) {
++  delete todoList[id];
++  return res.status(200).send();
++ } else {
++  return res.status(400).json({ message: "UUID does not exist" });
++ }
}
```
---

[Back to Exercises](../exercises/README.md) | [Example](../exercises/22-NotNeeded.md)
