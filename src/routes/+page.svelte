<script>

let { data } = $props();
console.log("DATA", data)

import Dropdown from './components/Dropdown.svelte';
import Tool from './components/Tool.svelte';
let selectedPlace = $state({id:"E06000005", label:"Darlington"})

let onsCodes = [...new Set(data.data.map((el) => el['Local authority code']))];

let laList = onsCodes.map((code) => ({
	id: code,
	label: data.data.find((el) => el['Local authority code'] == code)['Local authority name']
}));
let lookUp = (code,place) => {
	let value = +data.data.filter(e=>e["Local authority code"]==place.id && e["Code"]==code.slice(1).split("_")[0]).pop().MADs_from_median
	let description = data.map.find(e=>e.position == code.slice(1) && value>=e.lowerThreshold && value<e.upperThreshold)
	console.log(code.slice(1).split("_")[0],value,description)
	code.slice(1)
}
</script>


<div class="outside">
<Dropdown values={laList} bind:value={selectedPlace} />
{#if data.words}
{@html data.words
.replace(/\|\$place\|/g,selectedPlace.label)
.split("|")
.map(e=>e[0]=="$"?lookUp(e,selectedPlace):e)
.join("")}
{/if}

{#if data.data}
<Tool parsedData={data.data} {selectedPlace}/>
{/if}

</div>

<style>
	.outside {
		padding: 20px;
		padding-left: 70px;
	}
</style>