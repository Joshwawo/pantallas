import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";


export const homepag = (req,res)=>{
  res.json({meesage:'Hola desde la api de pantallas'})
}


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
    const { title, descripcion, company } = req.body;
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

    const Newpost = new Post({ title, descripcion, image, company });
    await Newpost.save();

    return res.json(Newpost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    //La propiedad esta del findByIdAndUpdate me regresa el id y lo actualiza, pero me regresa el post origina, y no el actualizado, asi que usar la propiedad new:True
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // console.log(updatedPost);
    return res.send(updatedPost);
  } catch (error) {
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
