<script>
  /** @type {any} */
  export let biomarkerData;

  /**
   * 
   * @param {string} text
   */
  function addEmphasis(text) {
    const reflex = /reflex/ig;

    let emphasizedText = text.replaceAll(reflex, `<b class="text-accent">Reflex</b>`);
    return emphasizedText;
  }

</script>


<div class="stats bg-base-200 text-base-content shadow-xl m-2 w-full">
    <div class="stat">
        <div class="flex flex-col sm:flex-row justify-between">
            <div class="card-title">{biomarkerData.ShortName}
              {#if biomarkerData.FundedSites.includes("Markham Stouffville Hospital")}
                <span class="badge badge-md badge-success">FUNDED @ MSH</span>
              {/if} 
            </div>

            <div>

              <div class="badge badge-lg badge-outline">{biomarkerData.OrganSite}</div>
            </div>
            
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