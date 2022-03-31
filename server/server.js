import bodyParser from 'body-parser';
import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';

const app = express();
app.use(router);
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());
app.use(bodyParser.json());

const port = 5000;
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})

