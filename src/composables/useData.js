import produtosDefault from '../../data/produtos.json'

const PRODUTOS_KEY = 'rr_produtos'
const PARAMS_KEY   = 'rr_parametros'

const defaultParams = {
  valor_investido:    '',
  data_inicio:        new Date().toISOString().slice(0, 10),
  data_fim_planejada: '',
  retirada_mensal:    0,
  aportes_mensais:    0,
  cdi_anual:          14.65,
  ipca_anual:         5.5,
  selic_anual:        14.5,
}

export function getProdutos() {
  const stored = localStorage.getItem(PRODUTOS_KEY)
  if (stored) return JSON.parse(stored)
  const list = produtosDefault.produtos
  localStorage.setItem(PRODUTOS_KEY, JSON.stringify(list))
  return list
}

function saveProdutos(list) {
  localStorage.setItem(PRODUTOS_KEY, JSON.stringify(list))
}

export function getParametros() {
  const stored = localStorage.getItem(PARAMS_KEY)
  return stored ? JSON.parse(stored) : { ...defaultParams }
}

export function saveParametros(params) {
  localStorage.setItem(PARAMS_KEY, JSON.stringify(params))
}

export function addProduto(produto) {
  const list = getProdutos()
  const novo = { ...produto, id: Date.now().toString() }
  list.push(novo)
  saveProdutos(list)
  return novo
}

export function updateProduto(id, data) {
  const list = getProdutos()
  const idx = list.findIndex(p => p.id === id)
  if (idx === -1) throw new Error('Não encontrado')
  list[idx] = { ...list[idx], ...data, id }
  saveProdutos(list)
  return list[idx]
}

export function deleteProduto(id) {
  saveProdutos(getProdutos().filter(p => p.id !== id))
}

export function confirmarProduto(id) {
  const list = getProdutos()
  const produto = list.find(p => p.id === id)
  if (!produto) throw new Error('Não encontrado')
  produto.confirmacoes = (produto.confirmacoes || 0) + 1
  produto.ultima_confirmacao = new Date().toISOString().slice(0, 10)
  saveProdutos(list)
  return { confirmacoes: produto.confirmacoes, ultima_confirmacao: produto.ultima_confirmacao }
}
