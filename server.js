import express from 'express';
import bodyParser from 'body-parser';
import router from './router.js';
import CookieParser from 'cookie-parser'
import flash from 'connect-flash';
import ExpressUserAgent from "express-useragent";
import session from 'express-session';
import cors from "cors";
import logger from 'morgan';

var app =  express();

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.use(session({secret: 'test', cookie: {maxAge: 60000}, saveUninitialized:true, resave:true}));
app.use(flash('dev'));

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(CookieParser());
app.use(cors());
// app.use(logger());
app.use(ExpressUserAgent.express());
app.use("/", cors(), router);
app.use("*",(req, res) => res.status(404).json({error:"page not found"}));



export default app;