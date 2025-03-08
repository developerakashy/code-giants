// Importing dotenv to access variables stored in the .env file
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import "dotenv/config";


// Importing connection_database and app
import { connection_database } from '../db/connect.js';
import  server  from './app.js';

// doing connection to database  
connection_database().then(()=>
    server.on("error",(error)=>{
        console.log(error);
    }),
    server.listen(process.env.PORT||8000,()=>{
        console.log(`server is running on port ${process.env.PORT}`)
    }),
    console.log("mongoDB is connected successfully ")).catch((error)=>{console.log({message:`error ${error}`})});
