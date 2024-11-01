<script>

let { data } = $props();
console.log("DATA", data)

import Dropdown from './components/Dropdown.svelte';
import Tool from './components/Tool.svelte';
let selectedPlace = $state()

let onsCodes = [...new Set(data.data.map((el) => el['Local authority code']))];

let laList = onsCodes.map((code) => ({
	id: code,
	label: data.data.find((el) => el['Local authority code'] == code)['Local authority name']
}));


</script>


<div class="outside">
<Dropdown values={laList} bind:value={selectedPlace} />
{#if data.words}
{@html data.words.replace(/\|\$place\|/g,selectedPlace.label)}
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