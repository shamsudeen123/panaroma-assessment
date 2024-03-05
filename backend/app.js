import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import { Task, User, sequelize } from "./Model/model.js";
import { secretKey } from "./utils/Authenticate.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

// api for sign in
app.post("/api/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (password === user.password) {
      const accessToken = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });
      return res.json({ user, accessToken });
    } else {
      return res
        .status(401)
        .json({ error: "Authentication failed. Incorrect password." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//  api for sign up
app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  try {
    const newUser = await User.create({ username, password });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// api for adding new employee
app.post("/api/addTask", async (req, res) => {
  const { taskName, description, dueDate, status } = req.body;
  if (!taskName || !description || !dueDate || !status) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const newTask = await Task.create({
      taskName,
      description,
      dueDate,
      status,
    });
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// api for employee list
app.get("/api/taskList", async (req, res) => {
  try {
    const { page, status } = req.query;
    const limit = 10;
    let queryOptions = {
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    };

    if (status) {
      queryOptions.where = { status: status };
    }

    let users = await Task.findAll(queryOptions);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// api for deleting an employee from list
app.delete("/api/deleteTask/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// api for updating details of an employee
app.put("/api/updateTask/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.update(data);
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
