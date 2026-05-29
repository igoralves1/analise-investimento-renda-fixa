<template>
  <svg viewBox="0 0 560 168" class="w-full" aria-hidden="true">

    <!-- Y grid lines + labels -->
    <g v-for="g in yGrid" :key="g.label">
      <line :x1="CL" :x2="CR" :y1="g.y" :y2="g.y" stroke="#1f2937" stroke-width="1" />
      <text :x="CL - 4" :y="g.y + 3.5"
            text-anchor="end" font-size="8.5" fill="#6b7280"
            font-family="ui-monospace, monospace">{{ g.label }}</text>
    </g>

    <!-- X baseline -->
    <line :x1="CL" :x2="CR" :y1="CB" :y2="CB" stroke="#374151" stroke-width="0.5" />

    <!-- Area fills (rendered first, behind lines) -->
    <template v-for="s in series" :key="'area-' + s.label">
      <polygon v-if="s.area" :points="areaPoints(s.data)" :fill="s.color" fill-opacity="0.1" />
    </template>

    <!-- Polylines -->
    <polyline
      v-for="s in series" :key="'line-' + s.label"
      :points="linePoints(s.data)"
      :stroke="s.color"
      :stroke-width="s.dashed ? 1.5 : 2"
      fill="none"
      :stroke-dasharray="s.dashed ? '5 3' : undefined"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- End-point dots -->
    <circle
      v-for="s in series" :key="'dot-' + s.label"
      :cx="toX(s.data.length - 1)"
      :cy="toY(s.data[s.data.length - 1])"
      r="3" :fill="s.color"
    />

    <!-- X axis labels (every 3 months) -->
    <template v-for="(lbl, i) in xLabels" :key="'xl-' + i">
      <text v-if="i % 3 === 0"
            :x="toX(i)" :y="CB + 12"
            text-anchor="middle" font-size="9" fill="#6b7280">{{ lbl }}</text>
    </template>

    <!-- Legend row -->
    <g v-for="(s, i) in series" :key="'leg-' + s.label"
       :transform="`translate(${CL + i * legendStep}, 161)`">
      <line x1="0" y1="0" x2="18" y2="0"
            :stroke="s.color" stroke-width="2"
            :stroke-dasharray="s.dashed ? '5 3' : undefined" />
      <circle cx="9" cy="0" r="2.5" :fill="s.color" />
      <text x="22" y="3.5" font-size="9" :fill="s.color">{{ s.label }}</text>
    </g>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  series:  { type: Array, required: true },
  xLabels: { type: Array, required: true },
})

const CL = 54   // chart left
const CR = 552  // chart right
const CW = CR - CL   // 498
const CT = 10   // chart top
const CB = 132  // chart bottom (above x labels)
const CH = CB - CT   // 122

const n       = computed(() => props.xLabels.length)
const allVals = computed(() => props.series.flatMap(s => s.data))
const rawMin  = computed(() => Math.min(...allVals.value))
const rawMax  = computed(() => Math.max(...allVals.value))
const vPad    = computed(() => Math.max((rawMax.value - rawMin.value) * 0.06, 100))
const minY    = computed(() => rawMin.value - vPad.value)
const maxY    = computed(() => rawMax.value + vPad.value)
const vRange  = computed(() => maxY.value - minY.value)

function toX(i) {
  return CL + (i / (n.value - 1)) * CW
}
function toY(v) {
  const r = vRange.value
  if (r === 0) return CT + CH / 2
  return CT + (1 - (v - minY.value) / r) * CH
}
function linePoints(data) {
  return data.map((v, i) => `${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ')
}
function areaPoints(data) {
  const bl = CB.toFixed(1)
  return data.map((v, i) => `${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ')
       + ` ${toX(data.length - 1).toFixed(1)},${bl} ${CL},${bl}`
}
function fmtK(v) {
  return `R$${(v / 1000).toFixed(0)}k`
}

const yGrid = computed(() =>
  [0, 1, 2, 3].map(i => {
    const v = minY.value + (i / 3) * vRange.value
    return { y: Number(toY(v).toFixed(1)), label: fmtK(v) }
  }).reverse()
)

const legendStep = computed(() => props.series.length <= 2 ? 240 : 160)
</script>
