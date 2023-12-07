<script>
    export let data;
    
    let updateDate = data.updates[0]._id;
    let biomarkers = data.updates[0].biomarkers;
    $: console.log(biomarkers);
</script>

<div class="prose">
    <h2>Recent Updates</h2>
    <p> 
        The list of Funded Molecular Testing in Ontario was last updated on: <span class="badge badge-accent badge-outline">{updateDate}</span>
    </p>

    <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>Biomarker</th>
              <th>Organ Site</th>
              <th>Testing Indication</th>
              <th>Testing Sites</th>
            </tr>
          </thead>
          <tbody>
            <!-- row -->
            {#each biomarkers as biomarker}
                <tr>
                    <td>{biomarker.Biomarkers}</td>
                    <td>{biomarker.OrganSite}</td>
                    <td>{biomarker["Testing Indication"]}</td>
                    <td>
                        <details class="collapse bg-base-100">
                            <summary class="collapse-title text-s">Click to display</summary>
                            <div class="collapse-content">
                              <p>{biomarker.fundedSites}</p>
                            </div>
                          </details>
                    </td>
                </tr>
            {/each}
          </tbody>
        </table>
    </div>
</div>
