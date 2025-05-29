import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.resolve(__dirname, '../.env');
console.log('🔍 Looking for .env file at:', envPath);
dotenv.config({ path: envPath });

// Debug: Log all environment variables (excluding sensitive values)
console.log('📋 Environment variables loaded:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not Set',
  JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not Set',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not Set',
  FRONTEND_URL: process.env.FRONTEND_URL
});

// Check if STRIPE_SECRET_KEY exists
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY is not defined in environment variables');
  console.error('Please check your .env file and make sure it contains STRIPE_SECRET_KEY=your_key_here');
  throw new Error('STRIPE_SECRET_KEY is required');
}

console.log('✅ STRIPE_SECRET_KEY is loaded:', process.env.STRIPE_SECRET_KEY.substring(0, 8) + '...');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;
