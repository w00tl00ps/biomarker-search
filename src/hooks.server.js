// set up a mongoDB connection on server start
import { start_mongo } from "$lib/db/mongo";

// @ts-ignore
console.log("Starting Biomarker Search version ", VERSION);

start_mongo().then(() => {
    console.log('Mongo db connected');
}).catch(e => {
    console.log(e);
})