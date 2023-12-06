

/** @type {import('./$types').PageLoad} */
export const load = async function( {fetch} ) {

    // get organ site list from /api/organsites
    const allOrganSites = (await fetch(`/api/organsites`)).json();
    console.log("/routes/+page.js: GET from /api/organsites");

    // get all biomarkers from /api/biomarkers
    const allBiomarkers = (await fetch('/api/biomarkers?search=')).json();
    console.log("/routes/+page.js: GET from /api/biomarkers?search=");

    const testingSites = (await fetch('/api/funded-sites')).json();
    console.log("/routes/+page.js: GET from /api/funded-sites");

    return {
        biomarkers: allBiomarkers,
        organSites: allOrganSites,
        testingSites
    }
}