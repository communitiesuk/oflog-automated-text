<script>
	let {parsedData,selectedPlace,nn, code} = $props();

	import TimeSeries from './TimeSeries.svelte';

console.log("NN",nn)

    //Create list of metrics
	let metrics = [...new Set(parsedData.map((el) => el.Measure))];



</script>

	{#if selectedPlace}

	{#if code}
	<h4 style="color:#666; font-size:80%">{parsedData.find((el) => el.Code == code).Measure}: {selectedPlace}</h4>
	<!-- send data for metric to TimeSeries component -->
	<TimeSeries tsData={parsedData.filter((el) => el.Code == code)} {selectedPlace} metric={parsedData.find((el) => el.Code == code).Measure} {nn}/>
	<br />

	{:else}
	<!-- iterate through metrics -->
	{#each metrics as metric, i}
		<!-- <h4 >{metric}: {selectedPlace}</h4> -->
		<!-- send data for metric to TimeSeries component -->
		<TimeSeries tsData={parsedData.filter((el) => el.Measure == metric)} {selectedPlace} {metric} {nn}/>
		<br />
	{/each}
	{/if}
	{/if}



