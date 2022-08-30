import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "pantallas",
  api_key: "215146959683388",
  api_secret: "U6pbv_YD6kfA93_evkcTk7K_FbY",
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};

// export const updateImage = async(id)=>{
//     return await cloudinary.uploader.update_metadata
// }
