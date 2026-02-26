// src/data/seed.ts
import fs from "fs";
import path from "path";

export type User = { id: number; username: string; password: string };
export type TodoItem = { id: number; name: string };

export const seedUsers: User[] = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];


const filePath = path.join(process.cwd(), "src", "data", "todos.json");

// Helper to read the JSON file
export function getTodos(): TodoItem[] {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([])); // Create if missing
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// Add to JSON file
export function addTodo(name: string) {
  const todos = getTodos();
  const maxId = todos.reduce((m, it) => Math.max(m, it.id), 0);
  todos.push({ id: maxId + 1, name });
  
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

// Delete from JSON file
export function deleteTodo(id: number) {
  let todos = getTodos();
  todos = todos.filter((it) => it.id !== id);
  
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}