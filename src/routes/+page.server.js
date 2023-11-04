import { biomarkers } from "../db/biomarkers";

/** @type {import('./$types').PageLoad} */
export const load = async function() {
    // get all records from collection
    const data = await biomarkers.find({}).toArray(); 
    //console.log('data', data);

    // fix error because _id field in MongoDB is a non-POJO object
    const cleanedData = data.map( d => ({
            ...d,
            _id: d._id.toString()
        }))

    return { biomarkers: cleanedData };
    
}