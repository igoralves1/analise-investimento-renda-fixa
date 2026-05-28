// Tabela IOF regressiva (dia → alíquota sobre rendimento bruto)
const IOF_TABLE = {
  1:0.96,2:0.93,3:0.90,4:0.86,5:0.83,6:0.80,7:0.76,8:0.73,9:0.70,10:0.66,
  11:0.63,12:0.60,13:0.56,14:0.53,15:0.50,16:0.46,17:0.43,18:0.40,19:0.36,
  20:0.33,21:0.30,22:0.26,23:0.23,24:0.20,25:0.16,26:0.13,27:0.10,28:0.06,29:0.03,
}

const TIPOS_ISENTOS_IR  = ['LCI','LCA','CRI','CRA','DEBENTURE_INCENTIVADA']
const TIPOS_ISENTOS_IOF = ['LCI','LCA','CRI','CRA','DEBENTURE_INCENTIVADA']

export const TIPOS_PRODUTO = [
  { value:'CDB',                  label:'CDB — Certificado de Depósito Bancário', grupo:'Bancário' },
  { value:'LCI',                  label:'LCI — Letra de Crédito Imobiliário',    grupo:'Isento IR' },
  { value:'LCA',                  label:'LCA — Letra de Crédito do Agronegócio', grupo:'Isento IR' },
  { value:'CRI',                  label:'CRI — Certificado de Recebíveis Imob.', grupo:'Isento IR' },
  { value:'CRA',                  label:'CRA — Certificado de Recebíveis do Agro.',grupo:'Isento IR'},
  { value:'DEBENTURE_INCENTIVADA',label:'Debênture Incentivada',                 grupo:'Isento IR' },
  { value:'TESOURO_SELIC',        label:'Tesouro Selic',                         grupo:'Tesouro Direto'},
  { value:'TESOURO_PREFIXADO',    label:'Tesouro Prefixado',                     grupo:'Tesouro Direto'},
  { value:'TESOURO_IPCA',         label:'Tesouro IPCA+',                         grupo:'Tesouro Direto'},
  { value:'POUPANCA',             label:'Poupança',                               grupo:'Bancário' },
  { value:'LF',                   label:'LF — Letra Financeira',                  grupo:'Bancário' },
]

export const MODALIDADES = [
  { value:'prefixado',          label:'Pré-fixado (% a.a.)',          hint:'Taxa fixa anual. Ex: 14,03%' },
  { value:'pos_fixado_cdi',     label:'Pós-fixado CDI (% do CDI)',    hint:'% sobre o CDI. Ex: 102,5%' },
  { value:'pos_fixado_cdi_mais',label:'Pós-fixado CDI+ (spread % a.a.)',hint:'Spread sobre o CDI. Ex: 0,35 para CDI+0,35%'},
  { value:'pos_fixado_selic',   label:'Pós-fixado Selic (% Selic)',   hint:'% sobre a Selic. Ex: 100,08%'},
  { value:'hibrido_ipca',       label:'Híbrido IPCA+ (spread % a.a.)',hint:'Spread acima do IPCA. Ex: 7,68%'},
  { value:'poupanca',           label:'Poupança (% a.a. fixa)',        hint:'Taxa bruta anual já calculada'},
]

export function getIRAliquota(dias) {
  if (dias <= 180) return 0.225
  if (dias <= 360) return 0.200
  if (dias <= 720) return 0.175
  return 0.150
}

export function getIOFAliquota(dias) {
  if (dias >= 30) return 0
  return IOF_TABLE[dias] ?? 0
}

export function calcularDias(dataInicio, dataFim) {
  const d1 = new Date(dataInicio)
  const d2 = new Date(dataFim)
  return Math.round((d2 - d1) / 86400000)
}

export function taxaBrutaAnual(produto, { cdi, ipca, selic }) {
  const t = produto.taxa / 100
  switch (produto.modalidade) {
    case 'prefixado':        return t
    case 'pos_fixado_cdi':      return t * (cdi / 100)
    case 'pos_fixado_cdi_mais': return (cdi / 100) + t  // CDI + spread (ex: 0.0035 para CDI+0,35%)
    case 'pos_fixado_selic': return t * (selic / 100)
    case 'hibrido_ipca':     return (1 + ipca / 100) * (1 + t) - 1
    case 'poupanca':         return t
    default:                 return t
  }
}

export function calcularProduto(produto, { dataInicio, dataFimDesejada, valorInvestido, cdi, ipca, selic }) {
  // 1. Prazo efetivo
  let dataEfetiva = dataFimDesejada
  let fatorLimitante = 'INVESTIDOR'
  if (produto.vencimento) {
    const venc = new Date(produto.vencimento)
    const fim  = new Date(dataFimDesejada)
    if (venc < fim) { dataEfetiva = produto.vencimento; fatorLimitante = 'PRODUTO' }
  }

  const d = calcularDias(dataInicio, dataEfetiva)
  if (d <= 0) return null

  const isentoIR  = TIPOS_ISENTOS_IR.includes(produto.tipo)
  const isentoIOF = TIPOS_ISENTOS_IOF.includes(produto.tipo)

  const i = taxaBrutaAnual(produto, { cdi, ipca, selic })
  const rBruto = Math.pow(1 + i, d / 365) - 1

  const iofAliq = isentoIOF ? 0 : getIOFAliquota(d)
  const alpha   = isentoIR  ? 0 : getIRAliquota(d)

  // IOF aplica-se ANTES do IR, sobre rendimento bruto
  const rAposIOF = rBruto * (1 - iofAliq)
  const rLiq     = rAposIOF * (1 - alpha)

  const iLiqAnual = d > 0 ? Math.pow(1 + rLiq, 365 / d) - 1 : 0

  // Valores monetários
  const P = valorInvestido || 0
  const lucroBruto  = P * rBruto
  const iofValor    = P * rBruto * iofAliq
  const irValor     = P * rAposIOF * alpha
  const lucroLiq    = lucroBruto - iofValor - irValor
  const valorFinal  = P + lucroLiq

  // Próxima faixa de IR (alerta)
  const proximaFaixa = calcularProximaFaixa(d, alpha, i, P)

  return {
    prazoEfetivoDias: d,
    dataEfetiva,
    fatorLimitante,
    taxaBrutaAnualDecimal: i,
    taxaBrutaAnualPct: i * 100,
    alpha,
    iofAliq,
    isentoIR,
    isentoIOF,
    rBruto,
    rLiq,
    iLiqAnual,
    iLiqAnualPct: iLiqAnual * 100,
    lucroBruto,
    iofValor,
    irValor,
    lucroLiq,
    valorFinal,
    proximaFaixa,
  }
}

function calcularProximaFaixa(d, alphaAtual, i, P) {
  const faixas = [180, 360, 720]
  for (const limite of faixas) {
    if (d < limite) {
      const diasFaltam = limite - d + 1
      const alphaProx = getIRAliquota(limite + 1)
      if (alphaProx < alphaAtual) {
        const rBrutoProx = Math.pow(1 + i, (limite + 1) / 365) - 1
        const rLiqAtual  = (Math.pow(1 + i, d / 365) - 1) * (1 - alphaAtual)
        const rLiqProx   = rBrutoProx * (1 - alphaProx)
        const diffPct    = (rLiqProx - rLiqAtual) * 100
        const diffRS     = P * (rLiqProx - rLiqAtual)
        return { diasFaltam, alphaAtual, alphaProx, diffPct, diffRS }
      }
    }
  }
  return null
}

export function formatPct(v, dec = 2) {
  return (v * 100).toFixed(dec) + '%'
}

export function formatRS(v) {
  return new Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL' }).format(v)
}

export function formatDate(iso) {
  if (!iso) return '—'
  const [y,m,d] = iso.split('-')
  return `${d}/${m}/${y}`
}
