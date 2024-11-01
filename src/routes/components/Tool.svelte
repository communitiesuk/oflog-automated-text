<script>
	let {parsedData,valueNow} = $props();;
	import Dropdown from './Dropdown.svelte';
	import TimeSeries from './TimeSeries.svelte';



    //Create list of metrics
	let metrics = [...new Set(parsedData.map((el) => el.Measure))];



</script>

	{#if valueNow.id}
	<!-- iterate through metrics -->
	{#each metrics as metric, i}
		<h4>{metric}</h4>
		<!-- send data for metric to TimeSeries component -->
		<TimeSeries tsData={parsedData.filter((el) => el.Measure == metric)} selectedPlace={valueNow.id} {metric}/>
		<br />
	{/each}
	{/if}



