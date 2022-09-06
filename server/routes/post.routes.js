import { Router } from "express";
import {
  getPost,
  createPost,
  deletePost,
  updatePost,
  getPostById,
  homepag,
  getCompany,
  signup,
  login
} from "../controllers/postControllers.js";

import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/",verifyToken,homepag )

router.get("/posts",verifyToken, getPost);

router.post("/posts",verifyToken, createPost);

router.put("/posts/:id",verifyToken, updatePost);

router.delete("/posts/:id",verifyToken, deletePost);

router.get("/posts/:id",verifyToken, getPostById);

router.get("/postsCompanies",verifyToken,getCompany)

router.post("/signup",signup )

router.post("/login",login)


export default router;
