import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, json } from 'express';
import UserRoutes from './controllers/User';
import RetasRoutes from './controllers/Retas';
import sendAsJson from './middleware/sendAsJson';
import errorHandler from './middleware/errorHandler';
import path from 'path';
import { sequelize } from './services/dbConfig';

const app = express();
const PORT = 8080 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}));
app.use(json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// setup DB
(async () => await sequelize.sync())();


app.get('/', (req: Request, res: Response) => {
    // here we should render the home view
    res.render("hello_world");
});

app.get('/login', (req: Request, res: Response) => {
    res.render("login")
});

app.get('/register', (req: Request, res: Response) => {
    res.render("register")
});

// User routes 
app.use('/user', UserRoutes)
// Retas routes
app.use('/retas', RetasRoutes)

// error handling middleware
app.use(errorHandler());
app.use(sendAsJson());

app.listen(PORT, () => console.log(`Express is listening at http://localhost:${PORT}`));