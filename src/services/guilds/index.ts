import axios from "axios";
import { User } from "../../database/schemas";
import { DISCORD_API_URL } from "../../utils/consts";
import { PartialChannel, PartialGuild } from "../../utils/types";

export async function getBotsGuildsService() {
    const token = process.env.DISCORD_BOT_TOKEN;

    //Get request for getting all guilds based on bot token auth
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${token}` },
    })
}

export async function getUserGuildsService(id: string) {
    const user = await User.findById(id);
    if (!user) throw new Error('No user found');

    //Get request for finding user from the guilds
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
    })
}

export async function getMutualGuildsServices(id: string) {
    //Calling for both user and bot guilds
    const { data: botGuilds } = await getBotsGuildsService();
    const { data: userGuilds } = await getUserGuildsService(id);

    //Filtering admin users from user guilds
    //Parsing permission code from filtered users and comparing with bitwise operator  
    const adminUserGuilds = userGuilds.filter(({ permissions }: PartialGuild) => (parseInt(permissions) & 0x8) === 0x8);

    //Finding the guilds from the admin guilds where bots exist
    //Returns the array containing bots based on id 
    return adminUserGuilds.filter((guild) => botGuilds.some((botGuild) => botGuild.id === guild.id));
};


export function getGuildService(id: string) {
    const token = process.env.DISCORD_BOT_TOKEN;
    //Fetch a guild data based on id
    return axios.get(`${DISCORD_API_URL}/guilds/${id}`, {
        headers: { Authorization: `Bot ${token}` }
    });
}

export function getGuildChannels(id:string){
    const token = process.env.DISCORD_BOT_TOKEN;
    //Fetch all channel inside a specific guild based on id
    return axios.get<PartialChannel[]>(`${DISCORD_API_URL}/guilds/${id}/channels`, {
        headers: { Authorization: `Bot ${token}` }
    });
}