import { Request, Response } from "express";
import { v4 } from "uuid";
import { Todo } from "types/Todo";

export const todoList: { [id: string]: Todo } = {};

export async function createTodo(req: Request, res: Response) {
  const body = req.body;
  if (!("description" in body)) {
    return res.status(400).json({ message: "Input task required" });
  }
  const newTaskDescription = body.description;
  const newTodo = {
    id: v4(),
    description: newTaskDescription,
    done: false,
  };
  todoList[newTodo.id] = newTodo;
  return res.status(200).json(newTodo);
}

// Can mention unused request param
export async function getAllTodos(_req: Request, res: Response) {
  return res.status(200).json(todoList);
}