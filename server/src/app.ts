import * as dotenv from 'dotenv';
dotenv.config();
import express, { json, Request, Response } from 'express';
import setupMongoDB from './services/dbConfig';
import UserRoutes from './controllers/User'

const app = express();
const PORT = 8080 || process.env.PORT;

app.use(json())

setupMongoDB();

// User routes 
app.use('/user', UserRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from app.ts!');
});

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});