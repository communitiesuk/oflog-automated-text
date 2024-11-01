<script>

let { data } = $props();
//console.log("DATA", data)


import Tool from './components/Tool.svelte'; //this is the master component
import Dropdown from './components/Dropdown.svelte';
    //Create list of places for dropdown
let onsCodes = [...new Set(data.data.map((el) => el['Local authority code']))];

let laList = onsCodes.map((code) => ({
	id: code,
	label: data.data.find((el) => el['Local authority code'] == code)['Local authority name']
}));
let valueNow = $state()
</script>


<div class="outside">
<Dropdown values={laList} bind:value={valueNow} />
{#if data.words}
{@html data.words}
{/if}

{#if data.data}
<Tool parsedData={data.data} {valueNow}/>
{/if}

</div>

<style>
	.outside {
		padding: 20px;
		padding-left: 70px;
	}
</style>