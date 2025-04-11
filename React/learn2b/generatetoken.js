import jwt from 'jsonwebtoken';

// Replace this with your manually inserted user's _id
const userId = '67f8ff930afad2f45ca47364'; 
const userRole = 'student'; // or instructor/admin as needed

const token = jwt.sign({ id: userId, role: userRole }, 'your_jwt_secret', { expiresIn: '1d' });

console.log('Generated Token:\n', token);
