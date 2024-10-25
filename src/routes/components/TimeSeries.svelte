<script>
import { LineChart } from "@onsvisual/svelte-charts";
export let tsData

let years = tsData.filter(e => e.Value>0).map(e=>({year: +e["Financial year"].split("-")[1], value:e.Value, group:e['Local authority code'] }))
console.log("years",years)

</script>

{#if tsData}
<LineChart data={years} xKey="year" yKey="value" zKey="group" title="" footer="Source: Oflog" legend={false} />
{/if}