import { Request, Response } from "express";
import { User } from "../../database/schemas/User";
import { getBotsGuildsService, getUserGuildsServices } from "../../services/guilds";


export async function getGuildsController(req: Request, res: Response) {
    //initialize user from request with User type inteface 
    const user = req.user as User;
    try {
        //Fetch the bots data 
        const { data : botGuild } = await getBotsGuildsService();
        //Fetch the user data
        const { data: userGuild} = await getUserGuildsServices(user.id);
        res.send({
            botGuild,userGuild
        });
    } catch (error) {
        //Returns if error
        console.log(error);
        res.status(400).send('Error');
    }
}