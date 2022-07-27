export type PartialGuild = {
    id:string;
    name:string;
    icon:string;
    owner:boolean;
    permissions:string;
    features:string[];
}

export type PartialChannel = {
    id: string;
    type: number;
    guild_id: string;
    name: string;
    permission_overwrites: Overwrite[];
    position: number;
    flags: number;
    bitrate: number;
    parent_id: string;
    topic: string;
    user_limit: number;
    rate_limit_per_user: number;
    nsfw: boolean;
    message_count: number;
    member_count: number;
    rtc_region: string;
    total_message_sent: number;
    last_message_id: string;
}

export type Overwrite = {
    id:string;
    type:number;
    allow:string;
    deny:string;
}
