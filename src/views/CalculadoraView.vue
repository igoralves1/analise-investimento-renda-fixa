<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">

    <div>
      <h1 class="text-2xl font-bold text-white">Calculadora de Renda Fixa</h1>
      <p class="text-gray-400 text-sm mt-1">
        Compare produtos pelo retorno líquido real — após IR e IOF.
      </p>
    </div>

    <!-- Parâmetros globais -->
    <div class="card space-y-5">
      <h2 class="font-semibold text-white">Parâmetros da simulação</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label class="label">Valor investido (R$)</label>
          <input v-model.number="params.valorInvestido" type="number" min="1" step="100" class="input" />
        </div>
        <div>
          <label class="label">Data de início</label>
          <input v-model="params.dataInicio" type="date" class="input" />
        </div>
        <div>
          <label class="label">Data de resgate desejada</label>
          <input v-model="params.dataFimDesejada" type="date" class="input" />
        </div>
        <div>
          <label class="label">CDI atual (% a.a.)</label>
          <input v-model.number="params.cdi" type="number" step="0.01" class="input" />
        </div>
        <div>
          <label class="label">IPCA atual (% a.a.)</label>
          <input v-model.number="params.ipca" type="number" step="0.01" class="input" />
        </div>
        <div>
          <label class="label">Selic atual (% a.a.)</label>
          <input v-model.number="params.selic" type="number" step="0.01" class="input" />
        </div>
      </div>
      <div class="flex gap-3 flex-wrap">
        <button class="btn-primary" @click="calcular">Calcular</button>
        <button class="btn-secondary" @click="salvarParams" :disabled="salvandoParams">
          {{ salvandoParams ? 'Salvando…' : 'Salvar parâmetros' }}
        </button>
      </div>
    </div>

    <!-- Prazo info -->
    <div v-if="prazoInfo" class="flex flex-wrap gap-4 text-sm">
      <div class="card flex-1 min-w-40 text-center">
        <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Prazo solicitado</p>
        <p class="text-2xl font-bold text-white">{{ prazoInfo.diasDesejados }} dias</p>
      </div>
      <div class="card flex-1 min-w-40 text-center">
        <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Faixa IR (prazo solicitado)</p>
        <p class="text-2xl font-bold" :class="corIR(prazoInfo.alpha)">{{ (prazoInfo.alpha * 100).toFixed(1) }}%</p>
      </div>
    </div>

    <!-- Erro -->
    <div v-if="erro" class="text-red-400 text-sm">{{ erro }}</div>

    <!-- Resultados -->
    <div v-if="resultados.length > 0" class="space-y-4">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <h2 class="font-semibold text-white">Ranking por retorno líquido anualizado</h2>
        <div class="flex gap-2 text-xs">
          <button
            v-for="v in ['tabela', 'cards']" :key="v"
            class="px-3 py-1 rounded-lg transition-colors"
            :class="vista === v ? 'bg-green-900/50 text-green-400' : 'text-gray-500 hover:text-gray-300'"
            @click="vista = v"
          >{{ v === 'tabela' ? 'Tabela' : 'Cards' }}</button>
        </div>
      </div>

      <!-- Tabela -->
      <div v-if="vista === 'tabela'" class="card overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800">
              <th class="text-left py-2 pr-3">#</th>
              <th class="text-left py-2 pr-3">Produto</th>
              <th class="text-right py-2 pr-3">Prazo ef.</th>
              <th class="text-right py-2 pr-3">IR</th>
              <th class="text-right py-2 pr-3">Bruto a.a.</th>
              <th class="text-right py-2 pr-3">Líquido a.a.</th>
              <th class="text-right py-2 pr-3">Lucro líq.</th>
              <th class="text-right py-2">Valor final</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr
              v-for="(r, i) in resultados" :key="r.produto.id"
              class="hover:bg-gray-800/40 transition-colors"
              :class="i === 0 ? 'bg-green-900/10' : ''"
            >
              <td class="py-3 pr-3">
                <span v-if="i === 0" class="text-green-400 font-bold text-base">🥇</span>
                <span v-else-if="i === 1" class="text-yellow-400">🥈</span>
                <span v-else-if="i === 2" class="text-orange-400">🥉</span>
                <span v-else class="text-gray-600">{{ i + 1 }}</span>
              </td>
              <td class="py-3 pr-3">
                <div class="flex flex-col gap-0.5">
                  <span class="font-medium text-gray-100">{{ r.produto.nome }}</span>
                  <div class="flex gap-1.5 flex-wrap">
                    <span class="tag">{{ r.produto.tipo }}</span>
                    <span v-if="r.calc.isentoIR" class="badge-green">Isento IR</span>
                    <span v-if="r.calc.fatorLimitante === 'PRODUTO'" class="badge-yellow">Limitado pelo vencimento</span>
                    <span v-if="r.calc.iofAliq > 0" class="badge-red">IOF {{ (r.calc.iofAliq*100).toFixed(0) }}%</span>
                  </div>
                </div>
              </td>
              <td class="py-3 pr-3 text-right text-gray-300">{{ r.calc.prazoEfetivoDias }}d</td>
              <td class="py-3 pr-3 text-right">
                <span v-if="r.calc.isentoIR" class="text-green-400">0%</span>
                <span v-else :class="corIR(r.calc.alpha)">{{ (r.calc.alpha * 100).toFixed(1) }}%</span>
              </td>
              <td class="py-3 pr-3 text-right text-gray-300">{{ r.calc.taxaBrutaAnualPct.toFixed(2) }}%</td>
              <td class="py-3 pr-3 text-right font-bold" :class="corRetorno(i)">
                {{ r.calc.iLiqAnualPct.toFixed(2) }}%
              </td>
              <td class="py-3 pr-3 text-right text-green-300">{{ formatRS(r.calc.lucroLiq) }}</td>
              <td class="py-3 text-right text-white font-semibold">{{ formatRS(r.calc.valorFinal) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Cards -->
      <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(r, i) in resultados" :key="r.produto.id"
          class="card space-y-3"
          :class="i === 0 ? 'border-green-700' : ''"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="space-y-0.5">
              <p class="font-semibold text-white leading-tight">{{ r.produto.nome }}</p>
              <p class="text-xs text-gray-500">{{ r.produto.instituicao }}</p>
            </div>
            <div class="text-right shrink-0">
              <p class="text-2xl font-black" :class="corRetorno(i)">{{ r.calc.iLiqAnualPct.toFixed(2) }}%</p>
              <p class="text-xs text-gray-500">líquido a.a.</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-1.5">
            <span class="tag">{{ r.produto.tipo }}</span>
            <span v-if="r.calc.isentoIR" class="badge-green">Isento IR</span>
            <span v-if="r.calc.fatorLimitante === 'PRODUTO'" class="badge-yellow">Vence antes</span>
            <span v-if="r.calc.iofAliq > 0" class="badge-red">IOF</span>
          </div>

          <div class="text-xs text-gray-500 grid grid-cols-2 gap-y-1">
            <span>Prazo efetivo</span><span class="text-gray-300 text-right">{{ r.calc.prazoEfetivoDias }} dias</span>
            <span>Bruto a.a.</span><span class="text-gray-300 text-right">{{ r.calc.taxaBrutaAnualPct.toFixed(2) }}%</span>
            <span>IR</span><span class="text-right" :class="r.calc.isentoIR ? 'text-green-400' : 'text-red-400'">
              {{ r.calc.isentoIR ? 'Isento' : (r.calc.alpha * 100).toFixed(1) + '%' }}
            </span>
            <span>Lucro líquido</span><span class="text-green-300 text-right">{{ formatRS(r.calc.lucroLiq) }}</span>
            <span>Valor final</span><span class="text-white font-semibold text-right">{{ formatRS(r.calc.valorFinal) }}</span>
          </div>

          <!-- Alerta próxima faixa -->
          <div v-if="r.calc.proximaFaixa" class="bg-yellow-900/20 border border-yellow-800 rounded-lg p-2 text-xs text-yellow-300">
            Aguardando mais <strong>{{ r.calc.proximaFaixa.diasFaltam }} dias</strong> reduz IR para
            {{ (r.calc.proximaFaixa.alphaProx * 100).toFixed(1) }}% (+{{ formatRS(r.calc.proximaFaixa.diffRS) }})
          </div>
        </div>
      </div>

      <!-- Detalhes do melhor -->
      <div v-if="melhor" class="card space-y-4 border-green-800">
        <h3 class="font-semibold text-white">
          Detalhes: <span class="text-green-400">{{ melhor.produto.nome }}</span>
          <span class="text-gray-500 text-sm font-normal ml-2">(melhor opção)</span>
        </h3>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div v-for="item in detalhesMelhor" :key="item.label" class="space-y-0.5">
            <p class="text-gray-500 text-xs">{{ item.label }}</p>
            <p :class="item.cor || 'text-white'" class="font-semibold">{{ item.valor }}</p>
          </div>
        </div>

        <div class="grid sm:grid-cols-3 gap-3 text-sm">
          <div class="bg-gray-800 rounded-xl p-3 text-center">
            <p class="text-gray-500 text-xs mb-1">Lucro bruto</p>
            <p class="text-white font-bold">{{ formatRS(melhor.calc.lucroBruto) }}</p>
          </div>
          <div class="bg-red-900/20 border border-red-900 rounded-xl p-3 text-center">
            <p class="text-gray-500 text-xs mb-1">IOF + IR</p>
            <p class="text-red-400 font-bold">{{ formatRS(melhor.calc.iofValor + melhor.calc.irValor) }}</p>
          </div>
          <div class="bg-green-900/20 border border-green-900 rounded-xl p-3 text-center">
            <p class="text-gray-500 text-xs mb-1">Lucro líquido</p>
            <p class="text-green-400 font-bold">{{ formatRS(melhor.calc.lucroLiq) }}</p>
          </div>
        </div>
      </div>

      <!-- Alerta prazo efetivo diferente -->
      <div v-if="alertaVencimento" class="bg-yellow-900/20 border border-yellow-800 rounded-xl p-4 text-sm text-yellow-300">
        <strong>Atenção:</strong> {{ alertaVencimento }}
      </div>
    </div>

    <div v-else-if="!erro && !carregandoProdutos" class="text-center py-12 text-gray-600">
      Ajuste os parâmetros e clique em <strong class="text-gray-400">Calcular</strong>.
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import {
  calcularProduto, calcularDias, getIRAliquota,
  formatRS, formatDate,
} from '../utils/calculos.js'

const hoje = new Date().toISOString().slice(0, 10)
const umAno = new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10)

const params = ref({
  valorInvestido: 100000,
  dataInicio: hoje,
  dataFimDesejada: umAno,
  cdi: 14.65,
  ipca: 5.5,
  selic: 14.5,
})

const produtos = ref([])
const resultados = ref([])
const carregandoProdutos = ref(true)
const salvandoParams = ref(false)
const erro = ref(null)
const vista = ref('tabela')

const prazoInfo = computed(() => {
  if (!params.value.dataInicio || !params.value.dataFimDesejada) return null
  const d = calcularDias(params.value.dataInicio, params.value.dataFimDesejada)
  if (d <= 0) return null
  return { diasDesejados: d, alpha: getIRAliquota(d) }
})

const melhor = computed(() => resultados.value[0] || null)

const detalhesMelhor = computed(() => {
  if (!melhor.value) return []
  const c = melhor.value.calc
  const p = melhor.value.produto
  return [
    { label: 'Prazo efetivo',   valor: c.prazoEfetivoDias + ' dias' },
    { label: 'Vencimento usado', valor: formatDate(c.dataEfetiva) },
    { label: 'Taxa bruta a.a.', valor: c.taxaBrutaAnualPct.toFixed(2) + '%' },
    { label: 'Taxa líq. a.a.',  valor: c.iLiqAnualPct.toFixed(2) + '%', cor: 'text-green-400' },
    { label: 'IR',              valor: c.isentoIR ? 'Isento' : (c.alpha * 100).toFixed(1) + '%',
                                 cor: c.isentoIR ? 'text-green-400' : 'text-red-400' },
    { label: 'IOF',             valor: c.iofAliq > 0 ? (c.iofAliq * 100).toFixed(0) + '%' : 'Isento',
                                 cor: c.iofAliq > 0 ? 'text-red-400' : 'text-green-400' },
    { label: 'IR pago',         valor: formatRS(c.irValor), cor: 'text-red-400' },
    { label: 'Valor final',     valor: formatRS(c.valorFinal), cor: 'text-green-400' },
  ]
})

const alertaVencimento = computed(() => {
  const limitados = resultados.value.filter(r => r.calc.fatorLimitante === 'PRODUTO')
  if (!limitados.length) return null
  const nomes = limitados.map(r => r.produto.nome).join(', ')
  return `Os seguintes produtos vencem antes da data desejada e foram calculados pelo seu prazo real: ${nomes}.`
})

function corIR(alpha) {
  if (alpha >= 0.225) return 'text-red-400'
  if (alpha >= 0.200) return 'text-orange-400'
  if (alpha >= 0.175) return 'text-yellow-400'
  return 'text-green-400'
}

function corRetorno(idx) {
  if (idx === 0) return 'text-green-400'
  if (idx === 1) return 'text-yellow-400'
  return 'text-gray-300'
}

function calcular() {
  erro.value = null
  const p = params.value
  if (!p.dataInicio || !p.dataFimDesejada || !p.valorInvestido) {
    erro.value = 'Preencha todos os campos obrigatórios.'
    return
  }
  if (p.dataFimDesejada <= p.dataInicio) {
    erro.value = 'A data de resgate deve ser posterior à data de início.'
    return
  }

  const resultadosBrutos = produtos.value
    .map(produto => {
      const calc = calcularProduto(produto, {
        dataInicio: p.dataInicio,
        dataFimDesejada: p.dataFimDesejada,
        valorInvestido: p.valorInvestido,
        cdi: p.cdi,
        ipca: p.ipca,
        selic: p.selic,
      })
      if (!calc) return null
      return { produto, calc }
    })
    .filter(Boolean)
    .sort((a, b) => b.calc.iLiqAnual - a.calc.iLiqAnual)

  resultados.value = resultadosBrutos
}

async function salvarParams() {
  salvandoParams.value = true
  try {
    await axios.post('/api/parametros', {
      valor_investido: params.value.valorInvestido,
      data_inicio: params.value.dataInicio,
      data_fim_planejada: params.value.dataFimDesejada,
      cdi_anual: params.value.cdi,
      ipca_anual: params.value.ipca,
      selic_anual: params.value.selic,
    })
  } catch (e) {
    console.error('Erro ao salvar parâmetros', e)
  } finally {
    salvandoParams.value = false
  }
}

onMounted(async () => {
  try {
    const [pRes, paramRes] = await Promise.all([
      axios.get('/api/produtos'),
      axios.get('/api/parametros'),
    ])
    produtos.value = pRes.data
    const saved = paramRes.data
    if (saved) {
      params.value = {
        valorInvestido: saved.valor_investido ?? params.value.valorInvestido,
        dataInicio: saved.data_inicio ?? params.value.dataInicio,
        dataFimDesejada: saved.data_fim_planejada ?? params.value.dataFimDesejada,
        cdi: saved.cdi_anual ?? params.value.cdi,
        ipca: saved.ipca_anual ?? params.value.ipca,
        selic: saved.selic_anual ?? params.value.selic,
      }
    }
  } catch (e) {
    erro.value = 'Erro ao carregar dados. Certifique-se de que o servidor está rodando (npm run dev).'
  } finally {
    carregandoProdutos.value = false
  }

  // calcular automaticamente com os parâmetros salvos
  calcular()
})
</script>
