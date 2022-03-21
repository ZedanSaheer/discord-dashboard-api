import {config} from 'dotenv';

config();

import express from 'express';

const app = express();
const PORT = process.env.PORT || 5001;

async function main(){
    try {
        app.listen(PORT,()=>console.log(`Running on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

main();