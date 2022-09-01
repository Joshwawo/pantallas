import { Router } from "express";
import {
  getPost,
  createPost,
  deletePost,
  updatePost,
  getPostById,
  homepag,
  getCompany,
} from "../controllers/postControllers.js";

const router = Router();

router.get("/",homepag )

router.get("/posts", getPost);

router.post("/posts", createPost);

router.put("/posts/:id", updatePost);

router.delete("/posts/:id", deletePost);

router.get("/posts/:id", getPostById);

router.get("/postsCompanies",getCompany)


export default router;
