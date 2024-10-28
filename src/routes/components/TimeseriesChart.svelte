<script>
    export let dataForChart = null, timeValues = null, selectedPlace = null, metric

    let values= dataForChart.map(e=>+e.value).filter(e=>+e)
    let yMax = Math.max(...values)
    let yMin = Math.min(...values)
    let yRange = yMax - yMin

    let drawLine = (dataForChart, 
                    group) => {
                    let line=dataForChart.filter(e=>e.group==group);
                    let firstVal=line.findIndex(e=>+e.value);
                    //console.log("dfc",dataForChart,"group",group,"line",line,"firstVAl",firstVal);
                    let svg=`M${50 + (firstVal * (400/(timeValues.length-1)))} ${350-(((+line[firstVal].value - yMin) / yRange) * 300)} `
                        //console.log(metric,group,dataForChart);
                        line.forEach((e,i)=>+e.value && i>firstVal?
                        svg+=`L ${50+((400/(timeValues.length-1)) *i)} ${(350 - ((+e.value - yMin) / yRange) * 300)} `:"");
                        return svg;
                }

</script>
<!-- {selectedPlace} -->
<svg width="500px" height="500px" style="overflow:visible">
<line x1={50} x2={450} y1={350} y2={350} stroke="blue"/>
{#each timeValues as moment, i}
<line x1={50 + ((400/(timeValues.length-1)) *i)} x2={50 + ((400/(timeValues.length-1)) *i)} y1=350 y2=360 stroke="blue"/>
<text x={50 + ((400/(timeValues.length-1)) *i)} y=380 fill="blue" text-anchor="middle">{moment}</text>
<line x1=50 x2=50 y1=350 y2=50 stroke="blue" />
<line x1=40 x2=50 y1=350 y2=350 stroke="blue" />
<text x=35 y=350 fill="blue" text-anchor=end dominant-baseline=middle >{yMin}</text>
<line x1=40 x2=50 y1=50 y2=50 stroke="blue" />
<text x=35 y=50 fill="blue" text-anchor=end dominant-baseline=middle >{yMax}</text>
<path d={drawLine(dataForChart,"median")} stroke="grey" fill="none"/>
<path d={drawLine(dataForChart,"min")} stroke="yellow" fill="none"/>
<path d={drawLine(dataForChart,"max")} stroke="yellow" fill="none"/>
<path d={drawLine(dataForChart,selectedPlace)} stroke="red" fill="none"/>
{/each}
</svg>
