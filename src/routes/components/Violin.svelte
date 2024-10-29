<script>
export let barcode
//console.log("barcode",barcode)

export let yMin, yRange, selectedPlace

let values= barcode.map(e=>+e.Value).filter(e=>+e)
    let yMaxBC = Math.max(...values)
    let yMinBC = Math.min(...values)
    let yRangeBC = yMaxBC - yMinBC

let bucketSize= yRangeBC/30

let buckets=Array(30).fill(yMinBC).map((e,i)=>e+(i*bucketSize))
//console.log("buckets", buckets)
let bucketFiller=buckets.map((e,i)=>barcode.filter(el=>el.Value>=e && (buckets[i+1]?el.Value<buckets[i+1]:el.Value<100000000)).length)
//console.log("bucketFill",bucketFiller)

</script>
{#each bucketFiller as bar, i}
{#if bar}
<rect x=560  y={350 - ((buckets[i] - yMin) * 300/yRange) - (300/yRange * bucketSize)} height={300/yRange * bucketSize}px width={bar * 3} fill="gold" />
{/if}
{/each}