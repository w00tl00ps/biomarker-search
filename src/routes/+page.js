

/** @type {import('./$types').PageLoad} */
export const load = async function( {parent, data, fetch} ) {

    // get the data passed from +.page.server.js
    await parent();
    let { biomarkers } = data
    //console.log("+page.js biomarker data: ", biomarkers);

    // get organ site list from /api/organsites
    const response = await fetch(`/api/organsites`);
    const result = await response.json();
    console.log("/routes/+page.js: GET from /api/organsites");

    return {
        biomarkers,
        organSites: result
    }
}