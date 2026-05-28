import { onMounted, nextTick, watch } from 'vue'

export function useMathJax(sources = []) {
  async function typeset(el = document.body) {
    await nextTick()
    if (!window.MathJax?.typesetPromise) return
    try {
      MathJax.typesetClear([el])
      await MathJax.typesetPromise([el])
    } catch (e) {
      console.warn('MathJax typeset error', e)
    }
  }

  onMounted(() => typeset())

  if (sources.length) {
    watch(sources, () => typeset(), { deep: true })
  }

  return { typeset }
}
