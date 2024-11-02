<script>
import TimeseriesChart from "./TimeseriesChart.svelte"
let {tsData, selectedPlace, metric} = $props()

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
let maxes = $derived(
allYears.map(e=>({
    year:e, 
    value:tsData.find(el=>el["Financial year"].split("-")[1]==e)?
    getMax(tsData,e):0,
    group:"max"
}))
)
let mins = $derived(
allYears.map(e=>({
    year:e, 
    value:tsData.filter(el=>el.Value).find(el=>el["Financial year"].split("-")[1]==e)?
    getMin(tsData,e):0,
    group:"min"
}))
)
let median=$derived(
    allYears.map(e=>({
    year:e, 
    value:tsData.find(el=>el["Financial year"].split("-")[1]==e)?
    getMedian(tsData,e):0,
    code:tsData.find(el=>el["Financial year"].split("-")[1]==e)?
    getMedianCode(tsData,e):0,
    group:"median"
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
let dataForChart=$state(median.concat(place).concat(mins).concat(maxes)) 
//dataForChart = median.concat(place).concat(mins).concat(maxes)

</script>

{#if tsData && selectedPlace}
<TimeseriesChart dataForChart={median.concat(place).concat(mins).concat(maxes)} {timeValues} {selectedPlace} {metric} {barcode}/>
{/if}