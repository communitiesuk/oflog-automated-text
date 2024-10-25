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
let value_now
	// goal = drop down menu where user can select LA

	// filter out the data from the big dataset
</script>
<div class="outside">
<Dropdown values={laList} bind:value={value_now}/>
VALUE: {value_now.id}<br>
DATA: {JSON.stringify(parsedData.filter((el) => el['Local authority code'] == value_now.id))}
</div>

<style>
	.outside{
		padding:20px
	}
</style>