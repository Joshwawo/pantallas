import mongoose from 'mongoose'

//En esta parte del post, en el objeto title, se esta poniendo para que sea obligatorio el post
//El trim quita los espaciados en los strings

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        // required:true,
        trim:true
    },
    descripcion:{
        type:String,
        // required:true,
        trim:true
    },
    image:{
        url: String,
        public_id: String

    },
    company:{
        type: String,
        trim:true
    }
})

export default mongoose.model('Post',postSchema)