import { Request, Response } from "express";
import {todoList} from './methods'

export async function getTodoById(req: Request, res: Response) {
    const { id } = req.params;
    if (id in todoList) {
      return res.status(200).json(todoList[id]);
    } else {
      return res.status(400).json({ message: "UUID does not exist" });
    }
}

export async function deleteTodoById(req: Request, res: Response) {
    const { id } = req.params;
    if (id in todoList) {
        delete todoList[id];
        return res.status(200).send();
    } else {
        return res.status(400).json({ message: "UUID does not exist" });
    }
  }

  export async function updateTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const updatedTodo = req.body;
    if (updatedTodo.id !== id) {
      return res.status(409).json({message: "UUID in path and body do not match"});
    } else if (id in todoList) {
        todoList[id] = updatedTodo;
        return res.status(200).send();
    } else {
        return res.status(400).json({ message: "UUID does not exist" });
    }
}