import express from 'express';
import { submitApplication, getApplicationStatus, getAllApplications, updateApplicationStatus } from '../controller/instructorApplicationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 8 // Maximum total number of files (idFront, idBack, insuranceDocument, and up to 5 certifications)
  },
  fileFilter: (req, file, cb) => {
    // Accept only specific file types
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
    }
  }
});

// Public routes
router.post('/submit', 
  protect, 
  upload.fields([
    { name: 'idFront', maxCount: 1 },
    { name: 'idBack', maxCount: 1 },
    { name: 'insuranceDocument', maxCount: 1 },
    { name: 'certifications', maxCount: 5 }
  ]), 
  submitApplication
);

router.get('/status/:userId', protect, getApplicationStatus);

// Admin routes
router.get('/all', protect, admin, getAllApplications);
router.put('/:applicationId/status', protect, admin, updateApplicationStatus);

export default router; 