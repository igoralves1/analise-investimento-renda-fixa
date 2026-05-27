<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">

    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Produtos cadastrados</h1>
        <p class="text-gray-400 text-sm mt-1">Gerencie os produtos que aparecem na calculadora.</p>
      </div>
      <button class="btn-primary" @click="abrirNovo">+ Novo produto</button>
    </div>

    <!-- Loading / erro -->
    <div v-if="carregando" class="text-gray-500 text-center py-12">Carregando…</div>
    <div v-else-if="erro" class="text-red-400 text-center py-12">{{ erro }}</div>

    <!-- Grupos -->
    <template v-else>
      <div v-for="grupo in grupos" :key="grupo" class="space-y-3">
        <div class="flex items-center gap-3">
          <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">{{ grupo }}</h2>
          <div class="flex-1 h-px bg-gray-800"></div>
          <span class="text-xs text-gray-600">{{ produtosPorGrupo[grupo]?.length || 0 }}</span>
        </div>

        <div class="grid gap-3">
          <div
            v-for="p in produtosPorGrupo[grupo]"
            :key="p.id"
            class="card flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div class="flex-1 min-w-0 space-y-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-semibold text-white truncate">{{ p.nome }}</span>
                <span class="tag">{{ p.tipo }}</span>
                <span v-if="isentoIR(p)" class="badge-green">Isento IR</span>
                <span v-if="p.fgc" class="badge-blue">FGC</span>
              </div>
              <div class="text-sm text-gray-400 flex flex-wrap gap-x-4 gap-y-0.5">
                <span>{{ p.instituicao }}</span>
                <span>{{ labelModalidade(p.modalidade) }} · <strong class="text-gray-200">{{ p.taxa }}%</strong></span>
                <span v-if="p.vencimento">Vence {{ formatDate(p.vencimento) }}</span>
                <span v-else class="text-green-400">Liquidez diária</span>
              </div>
              <p v-if="p.notas" class="text-xs text-gray-600">{{ p.notas }}</p>
            </div>
            <div class="flex gap-2 shrink-0">
              <button class="btn-secondary text-xs px-3 py-1.5" @click="editar(p)">Editar</button>
              <button class="btn-danger text-xs px-3 py-1.5" @click="confirmarExcluir(p)">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Modal -->
    <Teleport to="body">
      <div
        v-if="modal"
        class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        @click.self="fecharModal"
      >
        <div class="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg space-y-5 overflow-y-auto max-h-[90vh]">
          <h2 class="text-lg font-bold text-white">{{ form.id ? 'Editar produto' : 'Novo produto' }}</h2>

          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <label class="label">Nome</label>
              <input v-model="form.nome" class="input" placeholder="Ex: CDB Nubank 102,5% CDI" />
            </div>
            <div>
              <label class="label">Instituição</label>
              <input v-model="form.instituicao" class="input" placeholder="Ex: Nubank" />
            </div>
            <div>
              <label class="label">Tipo</label>
              <select v-model="form.tipo" class="input">
                <option v-for="t in TIPOS_PRODUTO" :key="t.value" :value="t.value">{{ t.label }}</option>
              </select>
            </div>
            <div>
              <label class="label">Modalidade</label>
              <select v-model="form.modalidade" class="input">
                <option v-for="m in MODALIDADES" :key="m.value" :value="m.value">{{ m.label }}</option>
              </select>
            </div>
            <div>
              <label class="label">Taxa (%)</label>
              <input v-model.number="form.taxa" type="number" step="0.01" class="input"
                :placeholder="hintTaxa" />
              <p class="text-xs text-gray-600 mt-1">{{ hintTaxa }}</p>
            </div>
            <div>
              <label class="label">Vencimento</label>
              <input v-model="form.vencimento" type="date" class="input" />
              <p class="text-xs text-gray-600 mt-1">Deixe vazio para liquidez diária</p>
            </div>
            <div>
              <label class="label">Mínimo (R$)</label>
              <input v-model.number="form.minimo_rs" type="number" step="1" class="input" placeholder="100" />
            </div>
            <div class="flex items-end gap-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input v-model="form.fgc" type="checkbox" class="w-4 h-4 accent-green-500" />
                <span class="text-sm text-gray-300">Cobertura FGC</span>
              </label>
            </div>
            <div class="col-span-2">
              <label class="label">Notas (opcional)</label>
              <input v-model="form.notas" class="input" placeholder="Ex: Via BTG, rentabilidade negociada" />
            </div>
          </div>

          <div class="flex gap-3 justify-end pt-2">
            <button class="btn-secondary" @click="fecharModal">Cancelar</button>
            <button class="btn-primary" :disabled="salvando" @click="salvar">
              {{ salvando ? 'Salvando…' : 'Salvar' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Confirm delete -->
    <Teleport to="body">
      <div
        v-if="paraExcluir"
        class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        @click.self="paraExcluir = null"
      >
        <div class="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm space-y-4">
          <h2 class="text-lg font-bold text-white">Excluir produto?</h2>
          <p class="text-gray-400 text-sm">
            Tem certeza que deseja excluir <strong class="text-white">{{ paraExcluir.nome }}</strong>?
            Esta ação não pode ser desfeita.
          </p>
          <div class="flex gap-3 justify-end">
            <button class="btn-secondary" @click="paraExcluir = null">Cancelar</button>
            <button class="btn-danger" :disabled="excluindo" @click="excluir">
              {{ excluindo ? 'Excluindo…' : 'Excluir' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { TIPOS_PRODUTO, MODALIDADES, formatDate } from '../utils/calculos.js'

const produtos  = ref([])
const carregando = ref(true)
const erro      = ref(null)
const modal     = ref(false)
const salvando  = ref(false)
const paraExcluir = ref(null)
const excluindo = ref(false)

const formVazio = () => ({
  id: null, nome: '', instituicao: '', tipo: 'CDB', modalidade: 'pos_fixado_cdi',
  taxa: '', vencimento: '', fgc: true, minimo_rs: 100, notas: '',
})
const form = ref(formVazio())

const TIPOS_ISENTOS_IR = ['LCI','LCA','CRI','CRA','DEBENTURE_INCENTIVADA']
const isentoIR = p => TIPOS_ISENTOS_IR.includes(p.tipo)

const grupos = computed(() => {
  const set = new Set()
  TIPOS_PRODUTO.forEach(t => set.add(t.grupo))
  return [...set]
})

const produtosPorGrupo = computed(() => {
  const mapa = {}
  grupos.value.forEach(g => { mapa[g] = [] })
  produtos.value.forEach(p => {
    const tipo = TIPOS_PRODUTO.find(t => t.value === p.tipo)
    const g = tipo?.grupo || 'Outros'
    if (!mapa[g]) mapa[g] = []
    mapa[g].push(p)
  })
  return mapa
})

const labelModalidade = v => MODALIDADES.find(m => m.value === v)?.label || v

const hintTaxa = computed(() => MODALIDADES.find(m => m.value === form.value.modalidade)?.hint || '')

async function carregar() {
  try {
    carregando.value = true
    const res = await axios.get('/api/produtos')
    produtos.value = res.data
  } catch (e) {
    erro.value = 'Erro ao carregar produtos. Certifique-se de que o servidor está rodando.'
  } finally {
    carregando.value = false
  }
}

function abrirNovo() {
  form.value = formVazio()
  modal.value = true
}

function editar(p) {
  form.value = { ...p }
  modal.value = true
}

function fecharModal() {
  modal.value = false
}

async function salvar() {
  if (!form.value.nome || !form.value.taxa) return
  salvando.value = true
  try {
    if (form.value.id) {
      await axios.put(`/api/produtos/${form.value.id}`, form.value)
      const idx = produtos.value.findIndex(p => p.id === form.value.id)
      if (idx !== -1) produtos.value[idx] = { ...form.value }
    } else {
      const res = await axios.post('/api/produtos', form.value)
      produtos.value.push(res.data)
    }
    fecharModal()
  } catch (e) {
    alert('Erro ao salvar: ' + (e.response?.data?.error || e.message))
  } finally {
    salvando.value = false
  }
}

function confirmarExcluir(p) {
  paraExcluir.value = p
}

async function excluir() {
  excluindo.value = true
  try {
    await axios.delete(`/api/produtos/${paraExcluir.value.id}`)
    produtos.value = produtos.value.filter(p => p.id !== paraExcluir.value.id)
    paraExcluir.value = null
  } catch (e) {
    alert('Erro ao excluir: ' + (e.response?.data?.error || e.message))
  } finally {
    excluindo.value = false
  }
}

onMounted(carregar)
</script>
