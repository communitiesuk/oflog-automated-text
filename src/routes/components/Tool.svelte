<script>
	let {parsedData,selectedPlace} = $props();

	import TimeSeries from './TimeSeries.svelte';



    //Create list of metrics
	let metrics = [...new Set(parsedData.map((el) => el.Measure))];



</script>

	{#if selectedPlace}
	<!-- iterate through metrics -->
	{#each metrics as metric, i}
		<h4>{metric}: {selectedPlace}</h4>
		<!-- send data for metric to TimeSeries component -->
		<TimeSeries tsData={parsedData.filter((el) => el.Measure == metric)} {selectedPlace} {metric}/>
		<br />
	{/each}
	{/if}



