import { Router } from "express";
import {
  createTodo,
  getAllTodos,
  deleteTodoById,
  getTodoById, 
  updateTodoById,
  createRandomTodo
} from "./methods";

const todoRouter = Router();
todoRouter.post("/todos", createTodo);
todoRouter.get("/todos", getAllTodos);
todoRouter.get("/todos/:id", getTodoById);
todoRouter.put("/todos/:id", updateTodoById);
todoRouter.delete("/todos/:id", deleteTodoById);
todoRouter.post("/todos/random", createRandomTodo);

todoRouter.get("/demo/time", (req, res) => {
  res.status(200).send({ time: new Date().toTimeString() })
});

export default todoRouter;
