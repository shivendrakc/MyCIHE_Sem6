import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './Middleware/errorMiddleware.js';
import { connectDB } from './config/db.js'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);


app.use(notFound)
app.use(errorHandler);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on ${port} http://localhost:${port}`);
});

//