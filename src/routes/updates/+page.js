/** @type {import('./$types').PageLoad} */
export const load = async function( {fetch} ) {

    // get organ site list from /api/organsites
    const updates = (await fetch(`/api/updates`)).json();
    console.log("/routes/updates/+page.js: GET from /api/updates");
    console.log(updates);
    return {
        updates
    }
}