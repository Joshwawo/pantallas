import { Router } from "express";
import {
  getPost,
  createPost,
  deletePost,
  updatePost,
  getPostById,
  homepag
} from "../controllers/postControllers.js";

const router = Router();

router.get("/",homepag )

router.get("/posts", getPost);

router.post("/posts", createPost);

router.put("/posts/:id", updatePost);

router.delete("/posts/:id", deletePost);

router.get("/posts/:id", getPostById);

export default router;
