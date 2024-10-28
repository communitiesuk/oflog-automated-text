<script>
import TimeseriesChart from "./TimeseriesChart.svelte"
export let tsData, selectedPlace

let dataToRender = tsData.filter(e => e.Value>0).map(e=>({year: +e["Financial year"].split("-")[1], value:e.Value, group:e['Local authority code'] }))
//
let years = [...new Set(tsData.map(e => e["Financial year"]))]
console.log("years",years)

let allYears=[15,16,17,18,19,20,21,22,23,24]
let timeValues=allYears

let getMedian = (data, year, yearData=data.filter(e=>e["Financial year"].split("-")[1] == year)) => 
                                    yearData
                                    .sort((a,b)=>a.Value - b.Value)
                                    .find((e,i)=>i>yearData.length/2)
                                    .Value

let getMin = (data, year, yearData=data.filter(e=>e["Financial year"].split("-")[1] == year)) => 
yearData
.filter(o=>o.Value)
.sort((a,b)=>a.Value - b.Value)[0]
.Value


let getMax = (data, year, yearData=data.filter(e=>e["Financial year"].split("-")[1] == year)) => 
yearData
.sort((a,b)=>a.Value - b.Value)[yearData.length-1]
.Value
          

let maxes=allYears.map(e=>({
    year:e, 
    value:tsData.find(el=>el["Financial year"].split("-")[1]==e)?
    getMax(tsData,e):0,
    group:"max"
}))

let mins=allYears.map(e=>({
    year:e, 
    value:tsData.filter(el=>el.Value).find(el=>el["Financial year"].split("-")[1]==e)?
    getMin(tsData,e):0,
    group:"min"
}))

let median=allYears.map(e=>({
    year:e, 
    value:tsData.find(el=>el["Financial year"].split("-")[1]==e)?
    getMedian(tsData,e):0,
    group:"median"
}))

let place=allYears.map(e=>({
    year:e, 
    value:tsData.filter(elem=>elem["Local authority code"]==selectedPlace).find(el=>el["Financial year"].split("-")[1]==e)?
    tsData.filter(elem=>elem["Local authority code"]==selectedPlace).find(el=>el["Financial year"].split("-")[1]==e).Value:0,
    group:selectedPlace
}))

let dataForChart = median.concat(place).concat(mins).concat(maxes)

</script>

{#if tsData}
<TimeseriesChart {dataForChart} {timeValues} {selectedPlace} />
{/if}