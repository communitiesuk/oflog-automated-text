<script>

let { data } = $props();
console.log("DATA", data)

import Dropdown from './components/Dropdown.svelte';
import Tool from './components/Tool.svelte';
import {HTMLToJSON} from "html-to-json-parser"
console.log("H2J",HTMLToJSON)

let wrappedHTML="<div>"+data.words+"</div>"

async function w2J(){return  await HTMLToJSON(wrappedHTML, true).then(res=>JSON.parse(res))}

let contentTemplate = w2J()

// selectedPlace.id="E06000005"
// selectedPlace.label="Darlington"
let placeObject=$state({id:"E06000005", label:"Darlington"})
let selectedPlace=$derived(placeObject.id)
let nn=$derived(data.nn[selectedPlace])
$effect(() => {
	selectedPlace;
	nn;
	});


let onsCodes = [...new Set(data.data.map((el) => el['Local authority code']))];

let laList = onsCodes.map((code) => ({
	id: code,
	label: data.data.find((el) => el['Local authority code'] == code)['Local authority name']
}));
let lookUp = (code,place) => {
	let value = +data.data.filter(e=>e["Local authority code"]==place.id && e["Code"]==code.slice(1).split("_")[0]).pop().MADs_from_median
	let description = data.logic.find(e=>e.position == code.slice(1) && value>=e.lowerThreshold && value<e.upperThreshold).text
	console.log(code.slice(1) + ":",value + " MADsFromMed =", "'"+description+"'")
	return description
}
</script>

{#await contentTemplate}
{:then res}


{#each res.content as cont, i}
{#if cont.type=="p"}
<p>{cont.content}</p>
{/if}
{#if cont.type=="h1"}
<h1>{cont.content}</h1>
{/if}
{/each}
{/await}
<div class="outside">

<Dropdown values={laList} bind:value={placeObject} />
{#if placeObject}
{#if data.words}
{@html data.words
.replace(/\|\$place\|/g,placeObject.label)
.split("|")
.map(e=>e[0]=="$"?lookUp(e,placeObject):e)
.join("")}
{/if}

{#if data.data}
<Tool parsedData={data.data} {selectedPlace} {nn}/>
{/if}
{/if}
</div>

<style>
	.outside {
		padding: 20px;
		padding-left: 70px;
	}
</style>