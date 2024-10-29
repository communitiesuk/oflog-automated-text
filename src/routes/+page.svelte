<script>

	//This first page gets the data that will be needed from CSV and text files and parses them into JSON format for hydrating "Tool" - the master component that will render the data as words and charts

	import {onMount} from 'svelte'	//onMount runs functions before the app loads

	import { csvParse } from 'd3-dsv'; //this conversts CSV to JSON

	import Tool from './components/Tool.svelte'; //this is the master component

	import Words from './components/Words.svelte';
let html
	
	let parsedData //this will contain the numerical data for a service area in JSON format
	
	import mammoth from "mammoth";
	onMount(()=>{
	fetch("../src/lib/adult_social_care.csv") //get the CSV file
	.then(csv => csv.text()) //interpret it as text
	.then(txt => parsedData = csvParse(txt)) //convert it to JSON

fetch("../src/lib/test.docx") //get the word doc
	.then(res => res.arrayBuffer()) //convert it to HTML
	.then(ab => mammoth.convertToHtml({arrayBuffer: ab})
	.then(function(result){
        html = result.value.replace("[variable]", "something"); // Change this for a function
        var messages = result.messages; // Any messages, such as warnings during conversion
        console.log("messages",messages)

    })
    .catch(function(error) {
        console.error(error);
    }))
}
	)


</script>
<div class="outside">
{#if html}
{@html html}
{/if}
{#if parsedData}
<Tool {parsedData} />

{/if}
</div>

<style>
	.outside {
		padding: 20px;
		padding-left: 70px;
	}
</style>