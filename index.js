import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

//components
import Connection from './database/db.js';
import Router from './routes/route.js';


dotenv.config();

const app = express();

app.use(cors(
  {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);


const PORT = process.env.PORT || 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const URL = process.env.MONGODB_URI || process.env.DB_URL;
Connection(username, password);

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
  });
  
  // Use the router for your API routes
  app.use('/api', Router);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));