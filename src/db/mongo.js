import { MongoClient } from "mongodb";

// load from .env file
import { MONGO_URL } from "$env/static/private"; 
import { MONGO_DB } from "$env/static/private";

const client = new MongoClient( MONGO_URL );

// Function to create connection
export function start_mongo() {
    console.log('Starting mongo...');
    return client.connect();
}

// connect to the cco-biomarker database
export default client.db( MONGO_DB );