<script>
	import { csvParse } from 'd3-dsv';
	import data from './data.js';
	import Dropdown from './Dropdown.svelte';
	let parsedData = csvParse(data);

	let onsCodes = [...new Set(parsedData.map((el) => el['Local authority code']))];

	let laList = onsCodes.map((code) => ({
		id: code,
		label: parsedData.find((el) => el['Local authority code'] == code)['Local authority name']
	}));

	let metrics = [...new Set(parsedData.map((el) => el.Measure))];
	console.log(metrics)
let value_now
	// goal = drop down menu where user can select LA

	// filter out the data from the big dataset
</script>
<div class="outside">
<Dropdown values={laList} bind:value={value_now}/>
VALUE: {value_now.id}<br>
DATA: 
{#each metrics as metric, i}
{metric}<ul>
{#each parsedData.filter((el) => el['Local authority code'] == value_now.id && el.Measure == metric) as dataPoint, i}


<li>{dataPoint["Financial year"]}: {dataPoint.Value}</li>
{/each}</ul>
<br>
{/each}
</div>

<style>
	.outside{
		padding:20px
	}
</style>