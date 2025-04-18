import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student',

      },
    isApproved: {
        type: Boolean, // will be used to approve or disapprove the instructor
        default: false
    },
},{
    timestamps: true //created_at and updated_at    
});

const User = mongoose.model('User', userSchema);

export default User;