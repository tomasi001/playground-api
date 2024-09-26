import express, { Application } from 'express';
import openaiRoutes from './routes/openaiRoutes';
import { requestLogger } from './middlewares/requestLogger';
import cors from 'cors'; // Import CORS
import dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Load environment variables

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3001; // Use environment variable for port

app.use(cors({ // Add CORS middleware
    origin: process.env.NODE_ENV === 'production'
        ? "https://playground-kappa-lake.vercel.app"
        : "http://localhost:3000", // Use localhost for local development
}));

app.use(express.json());
app.use(requestLogger);
app.use('/api', openaiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});