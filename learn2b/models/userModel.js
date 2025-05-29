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
        required: function() {
            return !this.googleId; // Password is required only if not using Google auth
        }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows null values while maintaining uniqueness
    },
    avatar: {
        type: String
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
}, {
    timestamps: true //created_at and updated_at    
});

const User = mongoose.model('User', userSchema);

export default User;