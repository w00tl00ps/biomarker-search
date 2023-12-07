// set up a mongoDB connection on server start
import { start_mongo } from "$lib/db/mongo";

start_mongo().then(() => {
    console.log('Mongo started');
}).catch(e => {
    console.log(e);
})