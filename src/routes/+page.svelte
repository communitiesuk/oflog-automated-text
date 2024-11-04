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

	let lookUpComparison = (code, place) => {
		let refinedCode=code.slice(1).split('_')[0]
		let value = data.data
			.find(
				(e) => e['Local authority code'] == place.id 
				&& e['Code'] == refinedCode
				&& e["Financial year"] == data.meta[refinedCode].latestYear
			)
			.MADs_from_median;

		let description = data.logic.find(
			(e) => e.position == code.slice(1) && value >= e.lowerThreshold && value < e.upperThreshold
		).text;
		//console.log(code.slice(1) + ':', value + ' MADsFromMed =', "'" + description + "'");
		return description;
	};

	let lookUpFixed = (code, clue) => {
		return data.meta[code][clue] || "not found"
	};

	let lookUpData = (e, placeObject) => {
		let answer
		let metric = e.slice(1).split("_")[0]
		let value = e.split("_")[1]
		let allValues = data.data.filter(el=>el["Financial year"]==data.meta[metric].latestYear && el.Code==metric).map(el=>+el.Value).sort((a,b)=>a-b)
		let nnValues= data.data.filter(el=>data.nn[placeObject.id].includes(el["Local authority code"]) && el["Financial year"]==data.meta[metric].latestYear && el.Code==metric).map(el=>+el.Value).sort((a,b)=>a-b)

		if (value=="value")answer=data.data.find(el=>el["Financial year"]==data.meta[metric].latestYear && el.Code==metric && el["Local authority code"] == placeObject.id).Value
		if (value=="nnMedian")answer=nnValues[Math.floor(nnValues.length/2)]
		return answer
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
			.map((e) => (e[0] == '$' ? lookUpComparison(e, placeObject) : e))
			.map((e) => (e[0] == '^' ? lookUpFixed(e.slice(1).split("_")[0], e.split("_")[1]) : e))
			.map((e) => (e[0] == '@' ? lookUpData(e, placeObject) : e))
			.join('');

let textWithPlaceReplaced = $derived(completedText(data.words, placeObject))
//console.log("textWithPlaceReplaced",textWithPlaceReplaced)0
	let wrappedHTML = $derived('<div>' + textWithPlaceReplaced + '</div>');
//console.log("werapped",wrappedHTML)
	async function w2J() {
		return await HTMLToJSON(wrappedHTML, true).then((res) => JSON.parse(res));
	}

	let contentTemplate = w2J()
let unlock=$state(false)
let loginOK = $state()
let pass="logoff"
if (loginOK == pass)unlock=true

</script>

<p>The static template (docx), dynamic template (xlsx), data (csv) and nearest neighbours (JSON) are hosted here: <a href="https://github.com/communitiesuk/oflog-automated-text/tree/main/src/lib">https://github.com/communitiesuk/oflog-automated-text/tree/main/src/lib</a></p>
{#if loginOK != pass}
<input type=text placeholder="password please" bind:value={loginOK}/>
{/if}
{#if loginOK == pass}
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
							<Tool parsedData={data.data} {selectedPlace} {nn} code={cont.content[0].slice(1)} /> 
						{:else}
							<p>{cont.content}</p>
						{/if}
					{/if}
					{#if cont.type == 'h1'}
						<h1>{cont.content}</h1>
					{/if}
					{#if cont.type == 'h2'}
						<h2>{cont.content}</h2>
					{/if}
					{#if cont.type == 'h3'}
						<h4>{cont.content}</h4>
					{/if}
				{/each}
			{/await}


		{/if}
	{/if}
</div> 
{/if}
<style>
	.outside {
		padding: 20px;
		padding-left: 70px;
		max-width:1000px
	}
</style>
