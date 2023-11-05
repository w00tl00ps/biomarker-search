<script>
    /** @type {any} */
    export let biomarkerData;
</script>


<div class="stats bg-neutral m-2">
    <div class="stat">
        <div class="stat-value">{biomarkerData.ShortName}</div>
        <div class="badge-primary">{biomarkerData.Biomarkers}</div>
        <div>{biomarkerData.Indication}</div>
        <!-- HIDDEN FOR NOW -->
        <div class="stat-desc hidden">{biomarkerData.TestingSite}</div>
        <div class="stat-desc hidden">{biomarkerData.FundedDate}</div>
    </div>
    <div class="stat">
        <div class="stat-value">{biomarkerData.OrganSite}</div>

        
    </div>
</div>
