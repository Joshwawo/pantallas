import Post from "../models/Post.js";
import { uploadImage, deleteImage, updateImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../config.js";

// export const getPostest = async (req, res)=>{

//    let company = req.query.company;

//     const posts = await Post.find({"company": "hermosillo"});
//     res.json(posts);
// }

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, JWT_SECRET, {
      
    });
    res.status(200).json({ auth: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("The email doesn't exists");
    const matchPassword = await user.matchPassword(password);
    if (!matchPassword)
      return res.status(401).json({ auth: false, token: null });
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {});
    return res.status(200).json({ auth: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al iniciar sesión" });

  }
};

export const getCompany = async (req, res) => {
  try {
    let company = req.query;

    const posts = await Post.find({ company: company.company });

    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const homepag = (req, res) => {
  res.json({ meesage: "Hello from the display api" });
};

export const getPost = async (req, res) => {
  try {
    // throw new Error('My New Errro!')

    const post = await Post.find();
    res.send(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, descripcion, company, isActive } = req.body;
    let image;

    // console.log(req.files)
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      // console.log(result);
    }

    const Newpost = new Post({ title, descripcion, image, company, isActive });
    await Newpost.save();

    return res.json(Newpost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    //await cloudinary.uploader.destroy(post.image.public_id);

    if (req.files?.image === undefined) {
      const data = {
        title: req.body.title,
        descripcion: req.body.descripcion,
        company: req.body.company,
        isActive: req.body.isActive,
      };
      post = await Post.findByIdAndUpdate(req.params.id, data, { new: true });
      res.json(post);
    } else if (req.files?.image) {
      await cloudinary.uploader.destroy(post.image.public_id);

      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);

      const data = {
        title: req.body.title,
        descripcion: req.body.descripcion,
        company: req.body.company,
        isActive: req.body.isActive,
        image: {
          url: result?.secure_url,
          public_id: result?.public_id,
        },
      };

      post = await Post.findByIdAndUpdate(req.params.id, data, { new: true });
      res.json(post);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postDeleted = await Post.findOneAndDelete(req.params.id);

    if (!postDeleted) return res.sendStatus(404);

    if (postDeleted.image.public_id) {
      await deleteImage(postDeleted.image.public_id);
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  //   res.send("gettin a post");
  try {
    const postById = await Post.findById(req.params.id);
    if (!postById) {
      return res.sendStatus(404);
    }
    return res.json(postById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
