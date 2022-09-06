import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
    // return hash;
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);




// import {  Schema, model  } from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new Schema({
//   username: String,
//   email: String,
//   password: String,
// });

// userSchema.methods.encryptPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return bcrypt.hash(password, salt);
// };

// userSchema.methods.validatePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

// const UserModel = model("user", userSchema);

// export default UserModel;
