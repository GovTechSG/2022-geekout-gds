# Refactoring

[< Back to Exercises](../exercises/README.md)

![images](https://user-images.githubusercontent.com/25238106/133753451-12bb5fca-fa01-41cd-b666-9629940b4784.jpg)

The tests are passing! That's it ... right? For a hackathon / school project, probably. Knowing when to walk away is an essential life skill.

One major difference when moving from school to a company is the size of the codebase. A single repository may hold multiple projects, with dozens of schemas and micro-services. Organizing code in a predictable, sensible way allows readers to understand the essentials without needing the full context. And well-factored code allows for meaningful testing, which then allows everyone to edit confidently. Popular acronyms for such ideas include [SOLID](https://stackify.com/solid-design-principles/), [DRY](https://thevaluable.dev/dry-principle-cost-benefit-example/) and [KISS](https://www.interaction-design.org/literature/article/kiss-keep-it-simple-stupid-a-design-principle). 

## Why's the code like that?
We began with 3 CRUD methods, and you've written 2 more. They've been put in 2 separate files  ... but why? Imagine reading the code for the first time - the separation of code into files should be a meaningful signal about the code's structure. Code organization that results from the history of your writing process is rarely relevant to future dev work. 

Refactor the 2 files. You can either place each function in their own file (total 5 files), or join them all into 1 file. Don't forget to update the import statements in `index.ts`

### Checkpoint
None! Refactoring often produces invisible changes. When your code is complete, `npm run test:1` to verify that it is still `3 skipped, 9 passed, 12 total`.

## Less is More
Reading through the methods, you'll notice a lot of code that's similar. For example, the error-handling in `deleteTodoById` reads:
```
return res.status(400).json({ message: "UUID does not exist" });
```
This is pretty compact, and typically, leaving it as-it-is will be fine. But as this grows in complexity, there are a few reasons why it becomes a code smell:

1. Our API contract specifies a `message` field, but the `.json()` method accepts any object. We might easily have typo-ed `{ mesagge: "UUID does not exist" }` or changed it to a plausible (but wrong) `{ errorMessage: "UUID does not exist" }` and the code wouldn't complain!

2. It imposes additional requirements on a developer - someone who writes a new method must be mindful about the field's name, when they might just want to edit the business logic.

Write a helper-method or reusable `const` object to abstract away from some of these details, then use it in all methods (where relevant).

Once more, when your code is complete, `npm run test:1` to verify that it is still `3 skipped, 9 passed, 12 total`.

### Is the refactor worth it?
Notice that the helper function you write can only handle a limited number of use cases. For example, if you wrote a wrapper for the JSON formatting:

```
function foo(message: string) {
  return { message };
}
console.log(foo("my error message")) // Will print { message: "my error message" }
```
then `foo` is not very helpful when creating JSON payloads with other fields.

You might conclude that we should write a more flexible helper method. Perhaps the field name `message` should be editable as well! So you expand the contract:
```
function fooV2(fieldName: string, message: string) {
  const output: {[key: string]: string} = {}
  output[fieldName] = message;
  return output;
}
console.log(fooV2("message", "my error message")) // Will print { message: "my error message" }
```
Congratulations, you've just written a useless helper function that's worse than the original syntax. 

In general, you want to write helpers that:
1. Enforce invariants / business logic (e.g. our error messages are always named 'message')
2. Have signatures that correctly express the freedom offered - if `X` is not a sensible argument, I shouldn't be able to write `foo(X)` at all.
3. Retain natural patterns - JS developers are deeply familiar with JSON, so don't hide JSONs behind a custom signature like `fooV2` does.
