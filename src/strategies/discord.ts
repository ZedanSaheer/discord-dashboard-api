import passport from "passport";
import { Profile } from "passport-discord";
import { Strategy } from "passport-discord";
import { VerifyCallback } from "passport-oauth2";

passport.use(
    new Strategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            callbackURL: process.env.REDIRECT,
            scope: ['identify', 'email', 'guilds']
        },
        async (successToken: string, refreshToken: string, profile: Profile , done : VerifyCallback) => {
            
        }
    )
)