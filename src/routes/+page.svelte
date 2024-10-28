<script>

	//This first page gets the data that will be needed from CSV and text files and parses them into JSON format for hydrating "Tool" - the master component that will render the data as words and charts

	import {onMount} from 'svelte'	//onMount runs functions before the app loads

	import { csvParse } from 'd3-dsv'; //this conversts CSV to JSON

	import Tool from './components/Tool.svelte'; //this is the master component

	let parsedData //this will contain the numerical data for a service area in JSON format

	onMount(()=>{
	fetch("src/data/adult_social_care.csv") //get the CSV file
	.then(csv => csv.text()) //interpret it as text
	.then(txt => parsedData = csvParse(txt)) //convert it to JSON
//	.then(x => console.log("data",parsedData)) //console.log to check the result
	}
	)

</script>

{#if parsedData}
<Tool {parsedData} />
{/if}