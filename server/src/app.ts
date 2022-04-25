import * as dotenv from 'dotenv';
dotenv.config();
import express, { json, Request, Response } from 'express';
import cors from 'cors';
import setupMongoDB from './services/dbConfig';
import UserRoutes from './controllers/User';
import RetasRoutes from './controllers/Retas';
import sendAsJson from './middleware/sendAsJson';
import errorHandler from './middleware/errorHandler';

const app = express();
const PORT = 8080 || process.env.PORT;

app.use(json())
app.use(express.urlencoded({extended: false}));
app.use(cors());

// setup DB
setupMongoDB();


app.get('/', (req: Request, res: Response) => {
    res.send('Hello from app.ts!');
});

// User routes 
app.use('/user', UserRoutes)
// Retas routes
app.use('/retas', RetasRoutes)

// error handling middleware
app.use(errorHandler());
app.use(sendAsJson());

app.listen(PORT, () => console.log(`Express is listening at http://localhost:${PORT}`));