import express, { Request, Response } from "express";
import Task, { ITask } from "../models/Task";
import {
  generateTaskPriority,
  generateProductivityTip,
  checkOpenAICredit,
} from "../utils/aiService";

const router = express.Router();

// Get all tasks
router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks: ITask[] = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Add a new task with AI priority suggestion
router.post("/", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const priority = await generateTaskPriority(description);
    const newTask: ITask = new Task({ title, description, priority });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Update a task
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedTask: ITask | null = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Get an AI-generated productivity tip
router.get("/ai/productivity-tip", async (req: Request, res: Response) => {
  try {
    const tip = await generateProductivityTip();
    res.status(200).json({ tip });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Get OpenAI API Credit Balance
router.get("/ai/credit", async (req: Request, res: Response) => {
  try {
    const creditInfo = await checkOpenAICredit();
    if (!creditInfo) {
      res.status(500).json({ error: "Failed to fetch OpenAI credit balance" });
      return;
    }
    res.status(200).json(creditInfo);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching OpenAI credits." });
  }
});

export default router;
