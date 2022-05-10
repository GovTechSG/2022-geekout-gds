import { Request, Response } from "express";
// import {todoList} from './methods'

export async function getTodoById(req: Request, res: Response) {
    return res.status(501).json({ message: "Not implemented" });
}

export async function deleteTodoById(req: Request, res: Response) {
    return res.status(501).json({ message: "Not implemented" });
}

export async function updateTodoById(req: Request, res: Response) {
    return res.status(501).json({ message: "Not implemented" });
}