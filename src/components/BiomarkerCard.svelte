<script>
    /** @type {any} */
    export let biomarkerData;
</script>


<div class="stats bg-neutral m-2">
    <div class="stat">
        <div class="flex flex-row justify-between">
            <div class="stat-value">{biomarkerData.ShortName}</div>
            <div class="badge badge-lg badge-outline">{biomarkerData.OrganSite}</div>
        </div>
        
        <div class="badge-primary mt-2 mb-2 p-1">{biomarkerData.Biomarkers}</div>
        <div class="p-1">{biomarkerData.Indication}</div>
        <!-- HIDDEN FOR NOW -->
        <div class="stat-desc hidden">{biomarkerData.TestingSite}</div>
        <div class="stat-desc hidden">{biomarkerData.FundedDate}</div>
    </div>
</div>
