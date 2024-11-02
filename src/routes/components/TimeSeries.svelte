<script>
import TimeseriesChart from "./TimeseriesChart.svelte"
let {tsData, selectedPlace, metric, nn} = $props()

let filteredTsData=$derived(tsData.filter(el=>nn.includes(el["Local authority code"])))
//console.log("FilteredTs",tsData.filter(el=>nn.includes(el["Local authority code"])))
//let dataToRender = tsData.filter(e => e.Value>0).map(e=>({year: +e["Financial year"].split("-")[1], value:e.Value, group:e['Local authority code'] }))
//
let years = $state()
years=[...new Set(tsData.map(e => e["Financial year"]))]

let allYears=[15,16,17,18,19,20,21,22,23,24]
let timeValues=allYears

let getMedian = (data, year, yearData=data.filter(e=>e["Financial year"].split("-")[1] == year)) => 
                                    yearData
                                    .sort((a,b)=>a.Value - b.Value)
                                    .find((e,i)=>i>yearData.length/2)
                                    .Value

let getMedianCode = (data, year, yearData=data.filter(e=>e["Financial year"].split("-")[1] == year)) => 
                                    yearData
                                    .sort((a,b)=>a.Value - b.Value)
                                    .find((e,i)=>i>yearData.length/2)
                                    ["Local authority code"]
                                    
let getMin = (data, year, yearData=data.filter(e=>e["Financial year"].split("-")[1] == year)) => 
yearData
.filter(o=>+o.Value)
.sort((a,b)=>a.Value - b.Value)[0]
.Value


let getMax = (data, year, yearData=data.filter(e=>e["Financial year"].split("-")[1] == year)) => 
yearData
.sort((a,b)=>a.Value - b.Value)[yearData.length-1]
.Value
          
let barcode= $derived(
tsData.filter(e=>e["Financial year"].split("-")[1]==Math.max(...[...new Set(tsData.map(el=>el["Financial year"].split("-")[1]))]))
)

let nnBarcode= $derived(
    filteredTsData.filter(e=>e["Financial year"].split("-")[1]==Math.max(...[...new Set(tsData.map(el=>el["Financial year"].split("-")[1]))]))
)
console.log("BC",nnBarcode)

let englandMaxes = $derived(
allYears.map(e=>({
    year:e, 
    value:tsData.find(el=>el["Financial year"].split("-")[1]==e)?
    getMax(tsData,e):0,
    group:"englandMax"
}))
)

let nnMaxes = $derived(
allYears.map(e=>({
    year:e, 
    value:filteredTsData.find(el=>el["Financial year"].split("-")[1]==e)?
    getMax(filteredTsData,e):0,
    group:"nnMax"
}))
)

let englandMins = $derived(
allYears.map(e=>({
    year:e, 
    value:tsData.filter(el=>el.Value).find(el=>el["Financial year"].split("-")[1]==e)?
    getMin(tsData,e):0,
    group:"englandMin"
}))
)

let nnMins = $derived(
allYears.map(e=>({
    year:e, 
    value:filteredTsData.filter(el=>el.Value).find(el=>el["Financial year"].split("-")[1]==e)?
    getMin(filteredTsData,e):0,
    group:"nnMin"
}))
)

let englandMedian=$derived(
    allYears.map(e=>({
    year:e, 
    value:tsData.find(el=>el["Financial year"].split("-")[1]==e)?
   getMedian(tsData,e):0,
    code:tsData.find(el=>el["Financial year"].split("-")[1]==e)?
   getMedianCode(tsData,e):0,
    group:"englandMedian"
}))
)

let nnMedian=$derived(
    allYears.map(e=>({
    year:e, 
    value:filteredTsData.find(el=>el["Financial year"].split("-")[1]==e)?
   getMedian(filteredTsData,e):0,
    code:filteredTsData.find(el=>el["Financial year"].split("-")[1]==e)?
   getMedianCode(filteredTsData,e):0,
    group:"nnMedian"
}))
)

let place=$derived(
allYears.map(e=>({
    year:e, 
    value:tsData.filter(elem=>elem["Local authority code"]==selectedPlace).find(el=>el["Financial year"].split("-")[1]==e)?
    +tsData.filter(elem=>elem["Local authority code"]==selectedPlace).find(el=>el["Financial year"].split("-")[1]==e).Value:0,
    group:selectedPlace
}))
)
let dataForChart=$state(englandMedian.concat(place).concat(englandMins).concat(englandMaxes)) 
//dataForChart = englandMedian.concat(place).concat(mins).concat(maxes)

</script>

{#if tsData && selectedPlace}
<TimeseriesChart dataForChart={englandMedian.concat(place).concat(englandMins).concat(englandMaxes).concat(nnMins).concat(nnMaxes).concat(nnMedian)} {timeValues} {selectedPlace} {metric} {barcode} {nnBarcode}/>
{/if}