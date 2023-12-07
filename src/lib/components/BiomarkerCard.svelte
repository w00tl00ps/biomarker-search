<script>
  /** @type {any} */
  export let biomarkerData;
  /** @type {string}*/
  export let testingSite;

  /**
   * abbreviations to improve formatting of badges 
   * TODO: move to a separate lib module?
   * @type {any}
   * */
  const abbr = {
    "Markham Stouffville Hospital": "MSH",
    "Hospital for Sick Children (SickKids)": "SickKids",
    "North York General Hospital": "NYGH",
    "Sunnybrook Health Sciences Centre": "Sunnybrook",
    "University Health Network": "UHN"
  }

  /**
   * Parses text and searches for keywords to emphasize with html tags.
   * @param {string} text
   */
  function addEmphasis(text) {
    let emphasizedText = text;
    const reflex = /reflex/ig;
    const directedTx = /directed therapy/ig;

    emphasizedText = emphasizedText.replaceAll(reflex, `<b class="badge badge-accent badge-outline">REFLEX</b>`);
    emphasizedText = emphasizedText.replaceAll(directedTx, '<b>directed therapy</b>');
    return emphasizedText;
  }

</script>


<div class="stats bg-base-200 text-base-content shadow-xl m-2 w-full">
    <div class="stat">
        <div class="flex flex-col sm:flex-row justify-between">
            <div class="card-title">{biomarkerData.ShortName}
              {#if biomarkerData.FundedSites.includes(testingSite)}
                <span class="badge badge-md badge-success">FUNDED @ { abbr[testingSite] || testingSite }</span>
              {/if} 
            </div>
             <div class="badge badge-lg badge-outline">{biomarkerData.OrganSite}</div>
        </div>
        
        <div class="badge-accent my-2 p-1 pl-3"><b>{biomarkerData.Biomarkers}</b></div>
        <div class="p-1">{@html addEmphasis(biomarkerData.Indication) }</div>
        {#if biomarkerData.Notes}
            <div class="p-1"><i>{biomarkerData.Notes}</i></div>
        {/if}

        <!-- COLLAPSE ELEMENT FOR TESTING SITES -->
        <div class="collapse collapse-plus border border-primary my-2">
            <input type="checkbox"/> 
            <div class="collapse-title">
              Testing Sites
            </div>
            <div class="collapse-content"> 
              {#each biomarkerData.FundedSites.sort() as testingSite}
                <ul class="list-disc pl-3">
                    <li>{testingSite}</li>
                </ul>
              {/each}
            </div>
          </div>

        <!-- HIDDEN FOR NOW -->
        <div class="stat-desc hidden">{biomarkerData.FundedDate}</div>
    </div>
</div>