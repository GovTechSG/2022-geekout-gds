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
    return res.status(501).json({ message: "Not implemented" });
}

export async function updateTodoById(req: Request, res: Response) {
    return res.status(501).json({ message: "Not implemented" });
}