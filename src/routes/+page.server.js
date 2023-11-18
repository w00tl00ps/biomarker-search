import { biomarkers } from "../db/biomarkers";

/** @type {import('./$types').PageLoad} */
export const load = async function() {
    console.log("/routes/+page.server.js -> load()");
    // get all records from collection sorted alphabetically
    const data = await biomarkers.find({}).sort({'ShortName': 1}).toArray(); 
    //console.log('data', data);

    // fix error because _id field in MongoDB is a non-POJO object
    const cleanedData = data.map( d => ({
            _id: d._id.toString(),
            ShortName: d.ShortName,
            OrganSite: d.OrganSite,
            Biomarkers: d.Biomarkers,
            Indication: d['Testing Indication'],
            FundedDate: d['CCO Funded Date'],
            TestingSite: d['Testing Sites'],
            FundedSites: d['fundedSites'],
            Notes: d['Notes']
        }))

    return { biomarkers: cleanedData };
    
}