import {config} from 'dotenv';
config();

import { createApp } from './utils/createApp';
const PORT = process.env.PORT || 5000;

async function main(){
    console.log(`Server is running on ${process.env.ENVIROMENT} mode`);
    try {
        const app = createApp();
        app.listen(PORT,()=>console.log(`Running on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

main();