import { error } from '@sveltejs/kit';
import { csvParse } from 'd3-dsv';
import mammoth from "mammoth";
import * as XLSX from 'xlsx/xlsx.mjs';
// import { PageServerLoad } from './$types'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	
    const placeData = await fetch("https://raw.githubusercontent.com/communitiesuk/oflog-automated-text/refs/heads/main/src/lib/adult_social_care.csv")
    .then(csv => csv.text()).then(txt => csvParse(txt))
    .catch(function(error) {
        console.error(error);
    });

const words0 = await fetch("https://raw.githubusercontent.com/communitiesuk/oflog-automated-text/refs/heads/main/src/lib/test.docx") //get the word doc
	.then(res =>res.arrayBuffer())
	.then(b => mammoth.convertToHtml({buffer: b}))
    .then(html => html.value)
    .catch(function(error) {
        console.error("ERROR",error);
    });

const statsToWords = await fetch("https://raw.githubusercontent.com/communitiesuk/oflog-automated-text/refs/heads/main/src/lib/test.xlsx")
                                .then(res =>res.arrayBuffer())
                                .then(b => XLSX.read(b))
                                .then(x => XLSX.utils.sheet_to_csv(x.Sheets[x.SheetNames[0]]))
                                .then(csv => csvParse(csv))

	if(placeData) {
        //console.log("WORDS FROM SERVER JS",words0)
		return {data: placeData, words: words0, map: statsToWords};
	}

	error(404, 'Not found');
}