import mongoose from "mongoose";
import {MONGODB_URI} from './config.js'



export const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log(`Conectado a la base de datos: ${db.connection.name}`);
  } catch (error) {
    console.log(error);
  }
};
