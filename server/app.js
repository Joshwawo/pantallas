import express from "express";
import fileupload from "express-fileupload";
import postRoutes from "./routes/post.routes.js";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import morgan from 'morgan'
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

//Middlewares
app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "./upload",
    // tempFileDir: './upload/temp'
  })
);

//Rutas
app.use(postRoutes);

// console.log(__dirname)
// app.use(express.static(join(__dirname, '../client/build')))

// app.get('*', (req,res)=>{
//         res.sendFile(join(__dirname,'../sistemawebpantallas/build/index.html'))
// })

export default app;
