import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true //created_at and updated_at    
});

const User = mongoose.model('User', userSchema);

export default User;