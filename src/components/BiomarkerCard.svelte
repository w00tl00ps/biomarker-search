<script>
	import { each } from "svelte/internal";

    /** @type {any} */
    export let biomarkerData;

    // split the testing sites into an array
    $: testingSites = biomarkerData.TestingSite.split("\n").sort();
    
</script>


<div class="stats bg-base-200 text-base-content shadow-xl m-2">
    <div class="stat">
        <div class="flex flex-col sm:flex-row justify-between">
            <div class="card-title">{biomarkerData.ShortName}</div>
            
            <div>
              {#if testingSites.includes("Markham Stouffville Hospital")}
                <div class="badge badge-lg badge-success">FUNDED @ MSH</div>
              {/if}
              <div class="badge badge-lg badge-outline">{biomarkerData.OrganSite}</div>
            </div>
            
        </div>
        
        <div class="badge-accent my-2 p-1 pl-3"><b>{biomarkerData.Biomarkers}</b></div>
        <div class="p-1">{biomarkerData.Indication}</div>
        {#if biomarkerData.Notes}
            <div class="p-1"><i>{biomarkerData.Notes}</i></div>
        {/if}
        <div class="collapse collapse-plus border border-primary my-2">
            <input type="checkbox"/> 
            <div class="collapse-title">
              Testing Sites
            </div>
            <div class="collapse-content"> 
              {#each testingSites as testingSite}
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
