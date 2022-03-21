import routes from '../routes';
import express, { Express } from 'express';
import session from 'express-session'
import cors from 'cors'
import passport from 'passport'

export function createApp(): Express {
    const app = express();
    //Enable parsing middleware for requests
    app.use(express.json());

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

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', routes);
    return app;
}
