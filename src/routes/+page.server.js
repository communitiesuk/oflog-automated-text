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
	
    const placeData = await fetch("https://raw.githubusercontent.com/communitiesuk/oflog-automated-text/refs/heads/main/src/lib/ASC_data.csv")
    .then(csv => csv.text())
    .then(txt => csvParse(txt))
    .catch(function(error) {
        console.error(error);
    });

const words0 = await fetch("https://raw.githubusercontent.com/communitiesuk/oflog-automated-text/refs/heads/main/src/lib/ASC_static_template.docx") //get the word doc
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

const statsToWords = await fetch("https://raw.githubusercontent.com/communitiesuk/oflog-automated-text/refs/heads/main/src/lib/ASC_dynamic_template.xlsx")
                                .then(res =>res.arrayBuffer())
                                .then(b => XLSX.read(b))
                                .then(x => XLSX.utils.sheet_to_csv(x.Sheets[x.SheetNames[0]]))
                                .then(csv => csvParse(csv, autoType))



const NNs = await fetch("https://raw.githubusercontent.com/communitiesuk/oflog-automated-text/refs/heads/main/src/lib/NN.json")
                                .then(res =>res.json())
const meta = {}
let metrics = [...new Set(placeData.map(e=>e.Code))]
metrics.forEach(e=>{
    meta[e]={}
    meta[e].latestYear = placeData.filter(el=>el.Code==e).map(el=>el["Financial year"]).pop();
    meta[e].allEngland=placeData.filter(el=>el.Code==e).filter(el=>el["Financial year"] == meta[e].latestYear);
    meta[e].englandMedian=meta[e].allEngland[Math.floor(meta[e].englandMedian=meta[e].allEngland.length/2)].Value
    }
    )


	if(placeData && words0 && statsToWords && NNs ) {
        //console.log("WORDS FROM SERVER JS",words0)
		return {data: placeData, words: words0, logic: statsToWords, nn: NNs, meta: meta};
	}

	error(404, 'Not found');
}