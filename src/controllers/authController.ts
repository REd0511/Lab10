import { Request, Response } from "express";
import { seedUsers } from "../data/seed";

export const renderLogin = (req: Request, res: Response) => {
  let errorMessage = null;
  if (req.query.q === "invalid") {
    errorMessage = "Invalid username or password";
  } else if (req.query.q === "need-login") {
    errorMessage = "You must log in to view this page";
  }
  res.render("index", { error: errorMessage });
};

export const handleLogin = (req: Request, res: Response) => {
  const username = (req.body.username ?? "").toString().trim();
  const password = (req.body.password ?? "").toString();
  const user = seedUsers.find(
    (u) => u.username === username && u.password === password,
  );
  if (!user) return res.redirect("/?q=invalid");
  
  req.session.userId = user.id;
  req.session.username = user.username;
  res.redirect("/todos");
};

export const handleLogout = (req: Request, res: Response) => {
  req.session.destroy(() => res.redirect("/"));
};