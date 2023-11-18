

/** @type {import('./$types').PageLoad} */
export const load = async function( {fetch} ) {

    // get organ site list from /api/organsites
    const response = await fetch(`/api/organsites`);
    const result = await response.json();
    console.log("/routes/+page.js: GET from /api/organsites");

    // get all biomarkers from /api/biomarkers
    const allBiomarkers = (await fetch('/api/biomarkers?search=')).json();
    console.log("/routes/+page.js: GET from /api/biomarkers?search=");

    return {
        biomarkers: allBiomarkers,
        organSites: result
    }
}