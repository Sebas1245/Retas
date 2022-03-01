import * as dotenv from 'dotenv';
dotenv.config();
import express, { json, Request, Response } from 'express';
import setupMongoDB from './services/dbConfig';

const app = express();
const port = 3000 || process.env.PORT;

app.use(json)

setupMongoDB();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from app.ts!');
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});