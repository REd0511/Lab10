import express from "express";
import session from "express-session";
import path from "path";
import { requireLogin } from "./middleware/requireLogin";
import * as authController from "./controllers/authController";
import * as todoController from "./controllers/todoController";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.use(
  session({
    secret: "replace-with-a-strong-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 1000 },
  }),
);

// Auth Routes
app.get("/", authController.renderLogin);
app.post("/login", authController.handleLogin);
app.post("/logout", requireLogin, authController.handleLogout);

// ToDo Routes
app.get("/todos", requireLogin, todoController.renderTodos);
app.post("/add", requireLogin, todoController.handleAddTodo);
app.post("/delete", requireLogin, todoController.handleDeleteTodo);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});