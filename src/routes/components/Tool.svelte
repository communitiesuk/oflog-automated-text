<script>
	export let parsedData;
	import Dropdown from './Dropdown.svelte';
	import TimeSeries from './TimeSeries.svelte';

    //Create list of places for dropdown
	let onsCodes = [...new Set(parsedData.map((el) => el['Local authority code']))];

	let laList = onsCodes.map((code) => ({
		id: code,
		label: parsedData.find((el) => el['Local authority code'] == code)['Local authority name']
	}));

    //Create list of metrics
	let metrics = [...new Set(parsedData.map((el) => el.Measure))];

	let valueNow;

</script>


	<Dropdown values={laList} bind:value={valueNow} />

	{#if valueNow.id}
	<!-- iterate through metrics -->
	{#each metrics as metric, i}
		<h4>{metric}</h4>
		<!-- send data for metric to TimeSeries component -->
		<TimeSeries tsData={parsedData.filter((el) => el.Measure == metric)} selectedPlace={valueNow.id} {metric}/>
		<br />
	{/each}
	{/if}



