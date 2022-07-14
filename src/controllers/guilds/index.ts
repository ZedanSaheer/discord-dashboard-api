import { Request, Response } from "express";
import { User } from "../../database/schemas/User";
import { getBotsGuildsService, getMutualGuildsServices, getUserGuildsService } from "../../services/guilds";


export async function getGuildsController(req: Request, res: Response) {
    //initialize user from request with User type inteface 
    const user = req.user as User;
    try {
        //Fetch and return the guilds containing the bot filtered from the users
        const guilds = await getMutualGuildsServices(user.id);
        res.send({guilds});
    } catch (error) {
        //Returns if error
        console.log(error);
        res.sendStatus(400).send('Error');
    }
}