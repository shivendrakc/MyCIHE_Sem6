import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authMiddleware from '../Middleware/authMiddleware.js';



// @desc Register mew user 
//route POST /api/users
// @access Public
const registerUser = (async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
    
        // Validation
        if (!name || !email || !password || !confirmPassword) {
          return res.status(400).json({ message: 'All fields are required' });
        }
    
        if (password !== confirmPassword) {
          return res.status(400).json({ message: 'Passwords do not match' });
        }
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = new User({
          name,
          email,
          password: hashedPassword,
          role: 'student' // default role
        });
    
        await user.save();
    
        // Optional: Generate JWT token
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );
    
        res.status(201).json({
          message: 'User registered successfully',
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
      }
})

// @desc Login user
//route POST /api/users/login   
// @access Public

const loginUser = (async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
        token, user: {
            id: user._id,
            name: user.name,
            role: user.role
        }
    })
})


// @desc Get user profile
//route GET /api/users/profile
// @access Private
const getUserProfile = (authMiddleware, (async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    res.json(user);
}))
export { registerUser, loginUser, getUserProfile };
