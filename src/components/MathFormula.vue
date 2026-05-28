<template>
  <span ref="el" class="math-formula"></span>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  tex: { type: String, required: true },
  display: { type: Boolean, default: false },
})

const el = ref(null)

async function typeset() {
  await nextTick()
  if (!el.value || !window.MathJax?.typesetPromise) return
  const delim = props.display ? ['\\[', '\\]'] : ['\\(', '\\)']
  el.value.textContent = delim[0] + props.tex + delim[1]
  try {
    MathJax.typesetClear([el.value])
    await MathJax.typesetPromise([el.value])
  } catch (e) {
    console.warn('MathJax error', e)
  }
}

onMounted(typeset)
watch(() => props.tex, typeset)
</script>
