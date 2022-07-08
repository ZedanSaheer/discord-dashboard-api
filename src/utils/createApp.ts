import routes from '../routes';
import { config } from 'dotenv';
import express, { Express } from 'express';
import session from 'express-session'
import cors from 'cors'
import passport from 'passport'

config();
require('../strategies/discord');

export function createApp(): Express {
    const app = express();
    //Enable parsing middleware for requests
    app.use(express.json());

    //Enable CORS
    app.use(cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    }));

    app.use(session({
        secret: 'FDFGDFGERWEAWE',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60 * 24 * 7,
        }
    })
    );

    //Using Passport
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', routes);
    return app;
}
