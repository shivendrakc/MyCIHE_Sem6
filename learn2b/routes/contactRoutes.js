import express from 'express';
import { submitContactForm } from '../controller/contactController.js';

const router = express.Router();

// Submit contact form
router.post('/submit', submitContactForm);

export default router; 