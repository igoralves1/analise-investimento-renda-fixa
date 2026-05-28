<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">

    <!-- Hero -->
    <section class="text-center space-y-4">
      <p class="text-green-400 text-sm font-semibold tracking-widest uppercase">Renda Fixa sem ilusões</p>
      <h1 class="text-4xl sm:text-5xl font-black text-white leading-tight">
        O banco anuncia 109% CDI.<br>
        <span class="text-green-400">Você recebe bem menos.</span>
      </h1>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        Entenda por que a taxa anunciada nunca é a taxa real — e como calcular o retorno líquido verdadeiro antes de investir.
      </p>
      <div class="flex flex-wrap gap-3 justify-center pt-2">
        <RouterLink to="/calculadora" class="btn-primary text-base px-6 py-3">Calcular agora</RouterLink>
        <RouterLink to="/produtos" class="btn-secondary text-base px-6 py-3">Meus produtos</RouterLink>
      </div>
    </section>

    <!-- O problema -->
    <section class="space-y-6">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">O problema</p>
        <h2 class="section-title">Por que a taxa anunciada engana</h2>
        <p class="text-gray-400">
          Bancos e corretoras divulgam a <strong class="text-white">taxa bruta anual</strong> — antes do Imposto de Renda.
          Mas o IR sobre renda fixa é <strong class="text-white">regressivo e depende do prazo</strong>:
          quanto menos tempo você deixa o dinheiro aplicado, mais paga de imposto.
        </p>
      </div>

      <div class="card space-y-4">
        <h3 class="font-semibold text-white">Exemplo real: CDB 109% CDI com vencimento em 6 meses</h3>
        <div class="grid sm:grid-cols-2 gap-4 text-sm">
          <div class="space-y-2">
            <p class="text-gray-500 font-medium uppercase text-xs tracking-wider">O que o banco anuncia</p>
            <p class="text-3xl font-black text-green-400">109% CDI</p>
            <p class="text-gray-400">≈ 15,97% a.a. bruto (CDI a 14,65%)</p>
          </div>
          <div class="space-y-2">
            <p class="text-gray-500 font-medium uppercase text-xs tracking-wider">O que você recebe (6 meses)</p>
            <p class="text-3xl font-black text-red-400">~12,2% a.a. líquido</p>
            <p class="text-gray-400">IR de 22,5% sobre o lucro (prazo ≤ 180 dias)</p>
          </div>
        </div>
        <div class="bg-yellow-900/20 border border-yellow-800 rounded-xl p-4 text-sm text-yellow-300">
          <strong>Atenção ao vencimento:</strong> se o título vence em 6 meses mas você planeja resgatar em 12 meses,
          o prazo efetivo é 6 meses — e a alíquota de IR é 22,5%, não 20%.
        </div>
      </div>
    </section>

    <!-- Tabela IR -->
    <section class="space-y-4">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">Imposto de Renda</p>
        <h2 class="section-title">Tabela Regressiva do IR</h2>
        <p class="text-gray-400 text-sm">
          O IR incide apenas sobre o <strong class="text-white">lucro</strong> (rendimento bruto), após o IOF.
          A alíquota depende do prazo efetivo da aplicação.
        </p>
      </div>
      <div class="card overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800">
              <th class="text-left py-2 pr-4">Prazo</th>
              <th class="text-right py-2 pr-4">Alíquota IR</th>
              <th class="text-right py-2">Impacto no lucro</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr v-for="faixa in faixasIR" :key="faixa.prazo" class="hover:bg-gray-800/50 transition-colors">
              <td class="py-3 pr-4 text-gray-200 font-medium">{{ faixa.prazo }}</td>
              <td class="py-3 pr-4 text-right">
                <span :class="faixa.cor" class="font-bold">{{ faixa.aliquota }}</span>
              </td>
              <td class="py-3 text-right text-gray-400">{{ faixa.impacto }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-gray-600">
        Fonte: Lei nº 11.033/2004. Aplicável a CDB, Tesouro Direto, LCI/LCA por pessoa jurídica.
        LCI, LCA, CRI, CRA e Debêntures Incentivadas são isentos de IR para pessoa física.
      </p>
    </section>

    <!-- IOF -->
    <section class="space-y-4">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">IOF</p>
        <h2 class="section-title">IOF: o imposto que poucos lembram</h2>
        <p class="text-gray-400 text-sm">
          O IOF incide nos primeiros 30 dias sobre o rendimento bruto, <strong class="text-white">antes</strong> do IR.
          A partir do 30º dia, a alíquota é zero.
        </p>
      </div>
      <div class="card overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800">
              <th class="text-left py-2 pr-4">Dias</th>
              <th v-for="d in iofDias" :key="d" class="text-center py-2 px-1">{{ d }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-3 pr-4 text-gray-400 text-xs">Alíquota</td>
              <td v-for="d in iofDias" :key="d" class="text-center py-3 px-1 text-xs font-mono text-red-400">
                {{ iofTabela[d] ? (iofTabela[d] * 100).toFixed(0) + '%' : '—' }}
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-xs text-gray-600 mt-2">Dia 30+: 0% (isento)</p>
      </div>
    </section>

    <!-- Fórmula -->
    <section class="space-y-4">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">A fórmula correta</p>
        <h2 class="section-title">Como calcular o retorno líquido real</h2>
      </div>
      <div class="card space-y-6">
        <div class="space-y-1">
          <p class="text-gray-500 text-xs">1. Rendimento bruto no período</p>
          <MathFormula display tex="r_{bruto} = (1 + i_{anual})^{d/365} - 1" />
        </div>
        <div class="space-y-1">
          <p class="text-gray-500 text-xs">2. Após IOF (primeiros 30 dias)</p>
          <MathFormula display tex="r_{ap,iof} = r_{bruto} \times (1 - \alpha_{IOF})" />
        </div>
        <div class="space-y-1">
          <p class="text-gray-500 text-xs">3. Após IR (alíquota do prazo)</p>
          <MathFormula display tex="r_{liq} = r_{ap,iof} \times (1 - \alpha_{IR})" />
        </div>
        <div class="space-y-1">
          <p class="text-gray-500 text-xs">4. Taxa líquida anualizada</p>
          <MathFormula display tex="i_{liq} = (1 + r_{liq})^{365/d} - 1" />
        </div>
        <div class="border-t border-gray-700 pt-4 space-y-1.5">
          <p class="text-gray-500 text-xs">Onde:</p>
          <ul class="text-gray-400 text-xs space-y-1">
            <li>\( d \) = prazo efetivo = \( \min(\text{data\_resgate},\, \text{data\_vencimento}) \)</li>
            <li>\( i_{anual} \) = taxa bruta anual do produto</li>
            <li>\( \alpha_{IOF} \) = alíquota IOF (0 se \( d \geq 30 \))</li>
            <li>\( \alpha_{IR} \) = alíquota IR (0 se produto isento)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Tipos de produto -->
    <section class="space-y-4">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">Produtos</p>
        <h2 class="section-title">Tipos de produto e tributação</h2>
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        <div v-for="grupo in grupos" :key="grupo.nome" class="card space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-white">{{ grupo.nome }}</h3>
            <span :class="grupo.isento ? 'badge-green' : 'badge-yellow'">
              {{ grupo.isento ? 'Isento IR' : 'IR regressivo' }}
            </span>
          </div>
          <ul class="space-y-1.5">
            <li v-for="p in grupo.produtos" :key="p.sigla" class="flex gap-2 text-sm">
              <span class="text-green-400 font-mono font-bold w-24 shrink-0">{{ p.sigla }}</span>
              <span class="text-gray-400">{{ p.desc }}</span>
            </li>
          </ul>
          <div v-if="grupo.nota" class="text-xs text-gray-600 border-t border-gray-800 pt-2">
            {{ grupo.nota }}
          </div>
        </div>
      </div>
    </section>

    <!-- Modalidades -->
    <section class="space-y-4">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">Indexadores</p>
        <h2 class="section-title">Como a taxa bruta é calculada</h2>
      </div>
      <div class="card overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800">
              <th class="text-left py-2 pr-6">Modalidade</th>
              <th class="text-left py-2">Fórmula da taxa bruta anual</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr v-for="m in modalidades" :key="m.label" class="hover:bg-gray-800/50 transition-colors">
              <td class="py-3 pr-6 text-gray-200 font-medium whitespace-nowrap">{{ m.label }}</td>
              <td class="py-3 text-green-300"><MathFormula :tex="m.formula" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Comparação LCI vs CDB -->
    <section class="space-y-4">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">Comparação</p>
        <h2 class="section-title">LCI/LCA vs CDB: quando vale a pena?</h2>
        <p class="text-gray-400 text-sm">
          LCI/LCA são isentos de IR. Para ser equivalente a um CDB tributado,
          a taxa do LCI/LCA precisa ser menor. A fórmula do break-even:
        </p>
      </div>
      <div class="card space-y-2">
        <MathFormula display tex="i_{LCI} = i_{CDB} \times (1 - \alpha_{IR})" />
        <p class="text-gray-500 text-xs mt-1">
          Se o LCI/LCA pagar mais que esse valor, é melhor que o CDB no mesmo prazo.
        </p>
      </div>
      <div class="card overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800">
              <th class="text-left py-2 pr-4">Prazo do CDB</th>
              <th class="text-right py-2 pr-4">IR</th>
              <th class="text-right py-2 pr-4">CDB 100% CDI líquido</th>
              <th class="text-right py-2">LCI mínima equivalente</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr v-for="eq in equivalencias" :key="eq.prazo" class="hover:bg-gray-800/50 transition-colors">
              <td class="py-3 pr-4 text-gray-200">{{ eq.prazo }}</td>
              <td class="py-3 pr-4 text-right text-red-400">{{ eq.ir }}</td>
              <td class="py-3 pr-4 text-right text-yellow-400">{{ eq.cdbLiq }}</td>
              <td class="py-3 text-right text-green-400 font-semibold">{{ eq.lciMin }}</td>
            </tr>
          </tbody>
        </table>
        <p class="text-xs text-gray-600 mt-2">Simulação com CDI = 14,65% a.a.</p>
      </div>
    </section>

    <!-- Poupança -->
    <section class="card space-y-3">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="font-semibold text-white text-lg">Poupança: sempre a pior opção</h3>
          <p class="text-gray-400 text-sm mt-1">
            Quando a Selic está acima de 8,5% a.a. (cenário atual: 14,5%), a poupança rende
            apenas 0,5% ao mês + TR — aproximadamente 6,17% a.a.
            Qualquer CDB acima de 60% CDI já supera a poupança após IR.
          </p>
        </div>
        <span class="badge-red shrink-0">Evitar</span>
      </div>
      <div class="bg-red-900/20 border border-red-800 rounded-xl p-3 text-sm text-red-300">
        Com CDI a 14,65%: CDB 100% CDI líquido ≈ 12,45% a.a. (maior prazo) — versus Poupança ≈ 6,17% a.a.
        A poupança rende <strong>menos da metade</strong>.
      </div>
    </section>

    <!-- CTA -->
    <section class="text-center space-y-4 pb-4">
      <h2 class="text-2xl font-bold text-white">Pronto para calcular sem ilusões?</h2>
      <p class="text-gray-400">Compare seus produtos com o retorno líquido real, já com IR e IOF.</p>
      <RouterLink to="/calculadora" class="btn-primary text-base px-8 py-3 inline-block">
        Abrir calculadora
      </RouterLink>
    </section>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import MathFormula from '../components/MathFormula.vue'
import { useMathJax } from '../composables/useMathJax.js'

useMathJax()

const faixasIR = [
  { prazo: 'Até 180 dias',    aliquota: '22,5%', cor: 'text-red-400',    impacto: 'Perde 22,5% do lucro' },
  { prazo: '181 a 360 dias',  aliquota: '20,0%', cor: 'text-orange-400', impacto: 'Perde 20% do lucro' },
  { prazo: '361 a 720 dias',  aliquota: '17,5%', cor: 'text-yellow-400', impacto: 'Perde 17,5% do lucro' },
  { prazo: 'Acima de 720 dias',aliquota: '15,0%', cor: 'text-green-400',  impacto: 'Perde 15% do lucro' },
]

const iofDias = [1,2,3,4,5,6,7,8,9,10,15,20,25,29]
const iofTabela = {
  1:0.96,2:0.93,3:0.90,4:0.86,5:0.83,6:0.80,7:0.76,8:0.73,9:0.70,10:0.66,
  15:0.50,20:0.33,25:0.16,29:0.03,
}

const grupos = [
  {
    nome: 'Bancários com IR',
    isento: false,
    nota: 'FGC cobre até R$ 250 mil por CPF por instituição (limite de R$ 1 milhão por 4 anos).',
    produtos: [
      { sigla: 'CDB',      desc: 'Certificado de Depósito Bancário — pós, pré ou híbrido' },
      { sigla: 'Poupança', desc: 'Isento de IR, mas rende menos — 0,5%/mês + TR' },
    ],
  },
  {
    nome: 'Bancários isentos de IR',
    isento: true,
    nota: 'Prazo mínimo: 6 meses (CDI/prefixado) ou 12-36 meses (IPCA). CMN Res. maio/2025.',
    produtos: [
      { sigla: 'LCI', desc: 'Letra de Crédito Imobiliário' },
      { sigla: 'LCA', desc: 'Letra de Crédito do Agronegócio' },
    ],
  },
  {
    nome: 'Mercado de capitais isentos',
    isento: true,
    nota: 'Não têm cobertura do FGC. Risco de crédito dos emissores.',
    produtos: [
      { sigla: 'CRI', desc: 'Certificado de Recebíveis Imobiliários' },
      { sigla: 'CRA', desc: 'Certificado de Recebíveis do Agronegócio' },
      { sigla: 'DEB. INC.', desc: 'Debêntures Incentivadas (infraestrutura)' },
    ],
  },
  {
    nome: 'Tesouro Direto',
    isento: false,
    nota: 'Sem risco de crédito (garantia do Tesouro Nacional). IR regressivo igual ao CDB.',
    produtos: [
      { sigla: 'T. Selic',   desc: 'Pós-fixado atrelado à Selic — baixa volatilidade' },
      { sigla: 'T. Prefixado', desc: 'Taxa fixa definida na compra' },
      { sigla: 'T. IPCA+',   desc: 'IPCA + spread fixo — proteção à inflação' },
    ],
  },
]

const modalidades = [
  { label: 'Pré-fixado',       formula: 'i = \\dfrac{taxa_{aa}}{100}' },
  { label: 'Pós-fixado CDI',   formula: 'i = \\dfrac{pct_{CDI}}{100} \\times CDI_{atual}' },
  { label: 'Pós-fixado Selic', formula: 'i = \\dfrac{pct_{Selic}}{100} \\times Selic_{atual}' },
  { label: 'Híbrido IPCA+',    formula: 'i = (1 + IPCA) \\times (1 + spread) - 1' },
  { label: 'Poupança',         formula: 'i = 0{,}5\\%/\\text{mês} + TR \\approx 6{,}17\\%\\,\\text{a.a.}' },
]

const cdi = 14.65
const equivalencias = [
  { prazo: 'Até 180 dias',      ir: '22,5%', a: 0.225 },
  { prazo: '181–360 dias',      ir: '20,0%', a: 0.200 },
  { prazo: '361–720 dias',      ir: '17,5%', a: 0.175 },
  { prazo: 'Acima de 720 dias', ir: '15,0%', a: 0.150 },
].map(e => {
  const bruto = cdi / 100
  const liq   = bruto * (1 - e.a)
  const lciMin = bruto * (1 - e.a)
  return {
    prazo: e.prazo,
    ir: e.ir,
    cdbLiq: (liq * 100).toFixed(2) + '% a.a.',
    lciMin: (lciMin * 100).toFixed(2) + '% a.a.',
  }
})
</script>
