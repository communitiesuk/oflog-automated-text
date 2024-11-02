<script>

//console.log("barcode",barcode)
// console.log("dtaat for chart", dataForChart)
let {dataForChart, barcode, yMin, yRange, selectedPlace, color} = $props()

let medians = $derived(dataForChart.filter(e=>e.group=="englandMedian").filter(e=>e.value))
let latestMedianCode = $derived(medians[medians.length-1].code)
// console.log("latestMedianCode",latestMedianCode)

let linePlace=$derived(barcode.filter(e=>e["Local authority code"]==selectedPlace))

let lineMedian=$derived(barcode.filter(e=>e["Local authority code"]==latestMedianCode))

</script>
<text x=460 y={20} font-size="0.7em">{barcode[0]["Financial year"]} distribution:</text>
<!-- <text x=500 y={35} font-size="0.7em">distribution</text> -->
<text x=470 y={40} font-size="0.7em" fill="blue">NNs</text>
<text x=510 y={40} font-size="0.7em">England</text>
{#each barcode as bar}
{#if bar.Value}
<line x1={color=="blue"?460:510} x2={color=="blue"?500:550} y1={350 - ((bar.Value - yMin) * 300/yRange)} y2={350 - ((bar.Value - yMin) * 300/yRange)} stroke={color}></line>
{/if}
{/each}

{#each linePlace as bar}
{#if bar.Value}
<line x1=440 x2=630 y1={350 - ((bar.Value - yMin) * 300/yRange)} y2={350 - ((bar.Value - yMin) * 300/yRange)} stroke="red" stroke-width=2></line>
{/if}
{/each}

<!-- {#each lineMedian as bar}
{#if bar.Value}
<line x1=500 x2=630 y1={350 - ((bar.Value - yMin) * 300/yRange)} y2={350 - ((bar.Value - yMin) * 300/yRange)} stroke="#666" stroke-width=2></line>
{/if}
{/each} -->