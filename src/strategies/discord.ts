import passport from "passport";
import { Profile } from "passport-discord";
import { Strategy } from "passport-discord";
import { VerifyCallback } from "passport-oauth2";
import { User } from '../database/schemas/index'

passport.serializeUser((user: any, done) => {
    //Serialize the user data using user id 
    return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        //Return the user if the id matches inside database
        return user ? done(null, user) : done(null, null);
    } catch (error) {
        console.log(error);
    }
})

passport.use(
    new Strategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            callbackURL: process.env.DISCORD_CLIENT_REDIRECT!,
            scope: ['identify', 'email', 'guilds']
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            const { id: discordId } = profile;

            try {
                //Check for existing user from the discord user ID
                const existingUser = await User.findOneAndUpdate({ discordId }, { accessToken, refreshToken }, { new: true });
                //Exit controller if user exists
                if (existingUser) {
                    return done(null, existingUser);
                }
                //Create new user if user does not exist
                const newUser = new User({
                    discordId, accessToken, refreshToken
                })
                //Save new user
                const savedUser = await newUser.save();

                done(null, savedUser);
            } catch (error) {
                console.log(error);
                //If any errors , exit from the functions
                return done(error as any, undefined)
            }
        }
    )
)