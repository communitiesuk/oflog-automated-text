<script>
	let { data } = $props();
	console.log('DATA', data);

	import Dropdown from './components/Dropdown.svelte';
	import Tool from './components/Tool.svelte';
	import { HTMLToJSON } from 'html-to-json-parser';

	let onsCodes = [...new Set(data.data.map((el) => el['Local authority code']))];

	let laList = onsCodes.map((code) => ({
		id: code,
		label: data.data.find((el) => el['Local authority code'] == code)['Local authority name']
	}));

	let placeObject = $state({ id: 'E06000005', label: 'Darlington' });
	let selectedPlace = $derived(placeObject.id);

	let lookUp = (code, place) => {
		let value = JSON.parse(JSON.stringify(data.data))
			.filter(
				(e) => e['Local authority code'] == place.id && e['Code'] == code.slice(1).split('_')[0]
			)
			.pop().MADs_from_median;
		let description = data.logic.find(
			(e) => e.position == code.slice(1) && value >= e.lowerThreshold && value < e.upperThreshold
		).text;
		console.log(code.slice(1) + ':', value + ' MADsFromMed =', "'" + description + "'");
		return description;
	};


	let nn = $derived(data.nn[selectedPlace]);

	$effect(() => {
		selectedPlace;
		nn;
	});

	let completedText = (raw, placeObject) =>
		raw
			.replace(/\|\$place\|/g, placeObject.label)
			.split('|')
			.map((e) => (e[0] == '$' ? lookUp(e, placeObject) : e))
			.join('');

let textWithPlaceReplaced = completedText(data.words, placeObject)
//console.log("textWithPlaceReplaced",textWithPlaceReplaced)
	let wrappedHTML = $derived('<div>' + textWithPlaceReplaced + '</div>');
//console.log("werapped",wrappedHTML)
	async function w2J() {
		return await HTMLToJSON(wrappedHTML, true).then((res) => JSON.parse(res));
	}

	let contentTemplate = w2J()


</script>

<div class="outside">
	<Dropdown values={laList} bind:value={placeObject} />
	{#if placeObject}


		{#if data.data}
			{#await w2J()}
			{:then  res}
				{console.log('res', res)}

				{#each res.content as cont, i}
					{#if cont.type == 'p'}
						{#if cont.content[0][0] == '%'}
							%image here
							<Tool parsedData={data.data} {selectedPlace} {nn} code={cont.content[0].slice(1)} /> 
						{:else}
							<p>{cont.content}</p>
						{/if}
					{/if}
					{#if cont.type == 'h1'}
						<h1>{cont.content}</h1>
					{/if}
				{/each}
			{/await}


		{/if}
	{/if}
</div> 

<style>
	.outside {
		padding: 20px;
		padding-left: 70px;
	}
</style>
