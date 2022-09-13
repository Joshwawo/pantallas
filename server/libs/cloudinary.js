import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';

dotenv.config();



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
    format: "webp"
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};

export const updateImage = async (id, filePath) => {
  await deleteImage(id);
  return await uploadImage(filePath);
};



//actulizar post
// export const updatePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, descripcion, company, isActive } = req.body;
//     let image;

//     if (req.files?.image) {
//       const result = await uploadImage(req.files.image.tempFilePath);
//       await fs.remove(req.files.image.tempFilePath);
//       image = {
//         url: result.secure_url,
//         public_id: result.public_id,
//       };
//     }

//     const post = await Post.findByIdAndUpdate(
//       id,
//       {
//         title,
//         descripcion,
//         image,
//         company,
//         isActive,
//       },
//       { new: true }
//     );
      
//     res.json(post);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: error.message });
//   }
// };


// export const updateImage = async(id)=>{
//     return await cloudinary.uploader.update_metadata
// }
