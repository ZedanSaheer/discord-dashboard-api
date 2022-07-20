import { Request, Response } from "express";
import { User } from "../../database/schemas/User";
import { getBotsGuildsService, getMutualGuildsServices, getUserGuildsService } from "../../services/guilds";


export async function getGuildsController(req: Request, res: Response) {
    //initialize user from request with User type inteface 
    const user = req.user as User;
    try {
        //Fetch and return the guilds containing the bot filtered from the users
        const guilds = await getMutualGuildsServices(user.id);
        res.send(guilds);
    } catch (error) {
        //Returns if error
        console.log(error);
        res.sendStatus(400).send('Error');
    }
}

export async function getGuildsPermissionController(req: Request, res: Response) {
    //initialize user from request with User type inteface 
    //Get id of the guild from request param
    const user = req.user as User;
    const { id } = req.params;
    try {
        //Fetch and return the guilds containing the bot filtered from the users
        //Checks the guilds for any property that matches the condiition
        //Return success status if true else error status 
        const guilds = await getMutualGuildsServices(user.id);
        const valid = guilds.some((guild) => guild.id === id);
        return valid ? res.sendStatus(200) : res.sendStatus(403);
    } catch (error) {
        //Returns if error
        console.log(error);
        res.sendStatus(400).send('Error');
    }
}