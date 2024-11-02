import { error } from '@sveltejs/kit';
import { csvParse, autoType } from 'd3-dsv';
import mammoth from "mammoth";
import * as XLSX from 'xlsx/xlsx.mjs';
// import { PageServerLoad } from './$types'
function numerise(object){
    Object.keys(object).forEach(e=>
        Object.keys(object[e]).forEach(el=>
           isNaN(e[el])?el: object[e][el]=+el
            ))
            return object
}


export async function load({ params }) {
	
    const placeData = await fetch("https://raw.githubusercontent.com/communitiesuk/oflog-automated-text/refs/heads/main/src/lib/adult_social_care.csv")
    .then(csv => csv.text())
    .then(txt => csvParse(txt))
    .catch(function(error) {
        console.error(error);
    });

const words0 = await fetch("https://raw.githubusercontent.com/communitiesuk/oflog-automated-text/refs/heads/main/src/lib/test.docx") //get the word doc
	.then(res =>res.arrayBuffer())
	.then(b => mammoth.convertToHtml({buffer: b}))
    .then(html => html.value.replace(e=>e))
    // clever function needed here to get code (e.g. ASC1_1), 
    //find its value in the data.data, 
    //look it up in the data.map, 
    //find where it sits, 
    //and spit out the data.map text.

    .catch(function(error) {
        console.error("ERROR",error);
    });

const statsToWords = await fetch("https://raw.githubusercontent.com/communitiesuk/oflog-automated-text/refs/heads/main/src/lib/test.xlsx")
                                .then(res =>res.arrayBuffer())
                                .then(b => XLSX.read(b))
                                .then(x => XLSX.utils.sheet_to_csv(x.Sheets[x.SheetNames[0]]))
                                .then(csv => csvParse(csv, autoType))
const NNs = await fetch("https://raw.githubusercontent.com/communitiesuk/oflog-automated-text/refs/heads/main/src/lib/NN.json")
                                .then(res =>res.json())

	if(placeData) {
        //console.log("WORDS FROM SERVER JS",words0)
		return {data: placeData, words: words0, map: statsToWords}, nn: NNs};
	}

	error(404, 'Not found');
}