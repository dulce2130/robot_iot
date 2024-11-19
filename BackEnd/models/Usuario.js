import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarID from "../helpers/generarID.js";

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    ap: {
        type: String,
        required: true,
        trim: true
    },

    am: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarID
    },
    confirmado: {
        type: Boolean,
        default: false
    },
    profileImage: {
        type: String, 
        default: null,
    },
})


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.methods.ComprobarPassword = async function (passwordFormulario) {
    const result = await bcrypt.compare(passwordFormulario, this.password);
    console.log("Comparación de contraseñas:", result);
    return result;
};;

const User = mongoose.model("Usuario", userSchema)
export default User