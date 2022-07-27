import routes from '../routes';
import { config } from 'dotenv';
import express, { Express } from 'express';
import session from 'express-session'
import cors from 'cors'
import passport from 'passport'
import store from 'connect-mongo'

config();
require('../strategies/discord');

export function createApp(): Express {
    const app = express();
    //Enable parsing middleware for requests
    app.use(express.json());

    //Enable CORS
    app.use(cors({
        origin: ["http://localhost:5000","http://localhost:3000"],
        credentials: true,
    }));

    //Enable sessions for the app
    app.use(session({
        secret: 'FDFGDFGERWEAWE',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60 * 24 * 7,
        },
        store: store.create({
            mongoUrl: `mongodb+srv://admin:${process.env.MONGODB_USER_KEY}@discord-backend.9fh0jvd.mongodb.net/?retryWrites=true&w=majority`
        }),
    })
    );

//Using Passport
app.use(passport.initialize());
app.use(passport.session());

//Controlling rate limiting by delaying consecutive calls
app.use((req,res,next)=>setTimeout(()=>next(),800));

app.use('/api', routes);
return app;
}
