
import mongoose from 'mongoose';
import { data_base_name } from '../src/constants.js';


 const connection_database=async()=>{
    try{
        if(!data_base_name){
            throw new Error("Database name is not provided");
        }
       const connection_instance= await mongoose.connect(`${process.env.MONGODB_URL}/${data_base_name}`);
    }
    catch(error){
        console.log(error.message)
        process.exit(1);
    }
}

export { connection_database };
