<script>

//console.log("barcode",barcode)
// console.log("dtaat for chart", dataForChart)
let {dataForChart, barcode, yMin, yRange, selectedPlace} = $props()

let medians = $derived(dataForChart.filter(e=>e.group=="median").filter(e=>e.value))
let latestMedianCode = $derived(medians[medians.length-1].code)
// console.log("latestMedianCode",latestMedianCode)

let linePlace=$derived(barcode.filter(e=>e["Local authority code"]==selectedPlace))

let lineMedian=$derived(barcode.filter(e=>e["Local authority code"]==latestMedianCode))

</script>
<text x=500 y={20} font-size="0.7em">{barcode[0]["Financial year"]}</text>
<text x=500 y={35} font-size="0.7em">distribution</text>
{#each barcode as bar}
{#if bar.Value}
<line x1=500 x2=550 y1={350 - ((bar.Value - yMin) * 300/yRange)} y2={350 - ((bar.Value - yMin) * 300/yRange)} stroke=gold></line>
{/if}
{/each}

{#each linePlace as bar}
{#if bar.Value}
<line x1=500 x2=630 y1={350 - ((bar.Value - yMin) * 300/yRange)} y2={350 - ((bar.Value - yMin) * 300/yRange)} stroke=red></line>
{/if}
{/each}

{#each lineMedian as bar}
{#if bar.Value}
<line x1=500 x2=630 y1={350 - ((bar.Value - yMin) * 300/yRange)} y2={350 - ((bar.Value - yMin) * 300/yRange)} stroke=grey></line>
{/if}
{/each}