<script>
    let {dataForChart, timeValues, selectedPlace, metric, barcode, latestMedianCode} = $props()
    //console.log(dataForChart, timeValues, "SELECTED", selectedPlace, metric, barcode, latestMedianCode)
    import Barcode from "./Barcode.svelte"
    import Violin from "./Violin.svelte";
    let values= dataForChart.map(e=>+e.value).filter(e=>+e)
    let yMax = Math.max(...values)
    let yMin = Math.min(...values)
    let yRange = yMax - yMin

    let drawLine = (dataForChart, 
                    group) => {
                   //console.log("bugfix1",dataForChart,group)    
                    let line=dataForChart.filter(e=>e.group==group);
                    let firstVal=line.findIndex(e=>+e.value);
                    //console.log("bugfix2",line,firstVal)
                    let svg=`M${50 + (firstVal * (400/(timeValues.length-1)))} ${350-(((+line[firstVal].value - yMin) / yRange) * 300)} `
                        line.forEach((e,i)=>+e.value && i>firstVal?
                        svg+=`L ${50+((400/(timeValues.length-1)) *i)} ${(350 - ((+e.value - yMin) / yRange) * 300)} `:"");
                        return svg;
                }

</script>

<svg width="800px" height="500px" style="overflow:visible">
<line x1={50} x2={450} y1={350} y2={350} stroke="#666"/>
{#each timeValues as moment, i}
<line x1={50 + ((400/(timeValues.length-1)) *i)} x2={50 + ((400/(timeValues.length-1)) *i)} y1=350 y2=360 stroke="#666"/>
<text font-size="0.8em" x={50 + ((400/(timeValues.length-1)) *i)} y=380 fill="#666" text-anchor="middle">{moment}</text>
{/each}
<path d={drawLine(dataForChart,"median")} stroke="grey" fill="none"/>
<path d={drawLine(dataForChart,"min")} stroke="gold" fill="none"/>
<path d={drawLine(dataForChart,"max")} stroke="gold" fill="none"/>
<path d={drawLine(dataForChart,selectedPlace)} stroke="red" fill="none"/>
<line x1=50 x2=50 y1=350 y2=50 stroke="#666" />
<line x1=40 x2=50 y1=350 y2=350 stroke="#666" />
<text font-size="0.8em" x=35 y=350 fill="#666" text-anchor=end dominant-baseline=middle >{yMin}</text>
<line x1=40 x2=50 y1=50 y2=50 stroke="#666" />
<text font-size="0.8em" x=35 y=50 fill="#666" text-anchor=end dominant-baseline=middle >{yMax}</text>
<Violin {dataForChart} {barcode} {yMax} {yMin} {yRange} {selectedPlace} {latestMedianCode}/>
<Barcode {dataForChart} {barcode} {yMax} {yMin} {yRange} {selectedPlace} {latestMedianCode}/>


</svg>
