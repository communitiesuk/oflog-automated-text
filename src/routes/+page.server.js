import { error } from '@sveltejs/kit';
import { csvParse } from 'd3-dsv';
import mammoth from "mammoth";
// import { PageServerLoad } from './$types'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	
    const placeData = await fetch("https://raw.githubusercontent.com/communitiesuk/oflog-automated-text/refs/heads/main/src/lib/adult_social_care.csv")
    .then(csv => csv.text()).then(txt => csvParse(txt))
    .catch(function(error) {
        console.error(error);
    });

const words0 = await fetch("https://raw.githubusercontent.com/communitiesuk/oflog-automated-text/refs/heads/main/src/lib/test.docx") //get the word doc
	.then(res =>res.arrayBuffer()) //convert it to HTML
	.then(b => mammoth.convertToHtml({buffer: b}))
    .then(html => html.value)
    .catch(function(error) {
        console.error("ERROR",error);
    });

	if(placeData) {
        //console.log("WORDS FROM SERVER JS",words0)
		return {data: placeData, words: words0};
	}

	error(404, 'Not found');
}