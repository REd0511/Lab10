import { Request, Response } from "express";
import { getTodos, addTodo, deleteTodo } from "../data/seed";

export const renderTodos = (req: Request, res: Response) => {
  res.render("list", {
    listTitle: "Today",
    items: getTodos(),
    username: req.session.username,
  });
};

export const handleAddTodo = (req: Request, res: Response) => {
  const name = (req.body.newItem ?? "").toString().trim();
  if (name) addTodo(name);
  res.redirect("/todos");
};

export const handleDeleteTodo = (req: Request, res: Response) => {
  const id = Number(req.body.checkbox);
  if (!Number.isNaN(id)) deleteTodo(id);
  res.redirect("/todos");
};