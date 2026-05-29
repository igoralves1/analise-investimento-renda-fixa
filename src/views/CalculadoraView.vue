<template>

<div class="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8 no-print-padding">

    <!-- ── Parâmetros (oculto na impressão) ── -->
    <div class="no-print space-y-5">
      <div>
        <h1 class="text-2xl font-bold text-white">Calculadora de Renda Fixa</h1>
        <p class="text-gray-400 text-sm mt-1">Compare o que o banco anuncia com o que você realmente recebe.</p>
      </div>

      <!-- Identificação do cliente -->
      <div class="card space-y-4">
        <h2 class="font-semibold text-white">Identificação do investidor</h2>
        <div class="grid sm:grid-cols-3 gap-4">
          <div>
            <label class="label">Nome</label>
            <input v-model="cliente.nome" class="input" placeholder="Ex: João" />
          </div>
          <div>
            <label class="label">Sobrenome</label>
            <input v-model="cliente.sobrenome" class="input" placeholder="Ex: Silva" />
          </div>
          <div>
            <label class="label">E-mail do relatório</label>
            <input v-model="cliente.email" type="email" class="input" placeholder="joao@email.com" />
          </div>
        </div>
      </div>

      <!-- Parâmetros da simulação -->
      <div class="card space-y-6">
        <h2 class="font-semibold text-white">Parâmetros da simulação</h2>

        <!-- Linha 1: inputs simples -->
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="label">Valor investido (R$)</label>
            <input v-model.number="params.valorInvestido" type="number" min="1" step="100" class="input" />
          </div>
          <div>
            <label class="label">Data de início</label>
            <input v-model="params.dataInicio" type="date" class="input" />
            <p class="text-xs text-gray-600 mt-1">Default: amanhã</p>
          </div>
          <div>
            <label class="label">Data de resgate</label>
            <input v-model="params.dataFimDesejada" type="date" class="input" />
            <p class="text-xs text-gray-600 mt-1">Default: amanhã + 1 ano</p>
          </div>
          <div>
            <label class="label">Aporte mensal recorrente (R$)</label>
            <input v-model.number="params.aportesMensais" type="number" min="0" step="100" class="input" placeholder="0" />
            <p class="text-xs text-gray-600 mt-1">Contribuição adicional mensal</p>
          </div>
          <div>
            <label class="label">Retirada mensal (R$)</label>
            <input v-model.number="params.retiradaMensal" type="number" min="0" step="100" class="input" placeholder="0" />
            <p class="text-xs text-gray-600 mt-1">Retirada mensal desejada</p>
          </div>
        </div>

        <!-- Linha 2: indicadores BCB -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <!-- CDI -->
          <div class="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-gray-300">CDI (% a.a.)</label>
              <span v-if="taxasBCBCarregando" class="text-[10px] text-gray-600 animate-pulse bg-gray-800 px-2 py-0.5 rounded-full">buscando…</span>
              <span v-else-if="taxasBCBData" class="text-[10px] text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{{ taxasBCBData }}</span>
            </div>
            <input v-model.number="params.cdi" type="number" step="0.01" class="input" />
            <p class="text-[11px] text-gray-600">
              <a href="https://www.bcb.gov.br/controleinflacao/taxaselic" target="_blank" rel="noopener noreferrer"
                class="text-green-500 hover:text-green-400 underline underline-offset-2">
                BCB — SGS série 4389 ↗
              </a>
            </p>

            <!-- Equivalências CDI -->
            <div v-if="cdiDiario > 0" class="border-t border-gray-700 pt-3 flex flex-col gap-2 text-xs flex-1">
              <p class="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Equivalências</p>
              <div class="grid grid-cols-3 gap-1.5 text-center">
                <div class="bg-gray-900 rounded-lg py-2 px-1">
                  <p class="text-gray-500 text-[10px] mb-0.5">Diário</p>
                  <p class="text-green-400 font-bold text-xs">{{ cdiDiario.toFixed(4) }}%</p>
                  <p class="text-gray-600 text-[10px]">a.d.</p>
                </div>
                <div class="bg-gray-900 rounded-lg py-2 px-1">
                  <p class="text-gray-500 text-[10px] mb-0.5">Mensal est.</p>
                  <p class="text-green-400 font-bold text-xs">{{ cdiMensalEquiv }}%</p>
                  <p class="text-gray-600 text-[10px]">a.m.</p>
                </div>
                <div class="bg-gray-900 rounded-lg py-2 px-1">
                  <p class="text-gray-500 text-[10px] mb-0.5">Mês ant.</p>
                  <p class="text-green-400 font-bold text-xs">{{ cdiMesAnterior.toFixed(4) }}%</p>
                  <p class="text-gray-600 text-[10px]">{{ cdiMesAnteriorRef }}</p>
                </div>
              </div>
              <div class="text-gray-500 text-[11px] leading-relaxed flex flex-col gap-1 flex-1 justify-between">
                <div>
                  <p><span class="text-gray-300 font-medium">Como os bancos calculam:</span> taxa over diária composta a cada dia útil.</p>
                  <MathFormula :tex="`CDI_{mensal} = (1 + ${cdiDiario.toFixed(4)}\\%)^{d_u} - 1`" />
                </div>
                <p class="mt-1">
                  <a href="https://www.bcb.gov.br/estatisticas/tabelasindicadores" target="_blank" rel="noopener noreferrer" class="text-green-500 hover:text-green-400 underline underline-offset-2">BCB — Indicadores ↗</a>
                  ·
                  <a href="https://www.b3.com.br/pt_br/market-data-e-indices/indices/indices-de-segmentos-e-setoriais/di-futuro.htm" target="_blank" rel="noopener noreferrer" class="text-green-500 hover:text-green-400 underline underline-offset-2">B3 — DI Futuro ↗</a>
                </p>
              </div>
            </div>
          </div>

          <!-- IPCA -->
          <div class="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-gray-300">IPCA 12m (% a.a.)</label>
              <span v-if="ipcaDataLabel" class="text-[10px] text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{{ ipcaDataLabel }}</span>
            </div>
            <input v-model.number="params.ipca" type="number" step="0.01" class="input" />
            <p class="text-[11px] text-gray-600">
              <a href="https://www.bcb.gov.br/controleinflacao/inflacao" target="_blank" rel="noopener noreferrer"
                class="text-green-500 hover:text-green-400 underline underline-offset-2">
                BCB — SGS série 13522 ↗
              </a>
            </p>

            <!-- Equivalências IPCA -->
            <div v-if="ipcaMensal > 0" class="border-t border-gray-700 pt-3 flex flex-col gap-2 text-xs flex-1">
              <p class="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Equivalências</p>
              <div class="grid grid-cols-3 gap-1.5 text-center">
                <div class="bg-gray-900 rounded-lg py-2 px-1">
                  <p class="text-gray-500 text-[10px] mb-0.5">Mês ant.</p>
                  <p class="text-green-400 font-bold text-xs">{{ ipcaMensal.toFixed(2) }}%</p>
                  <p class="text-gray-600 text-[10px]">{{ ipcaMensalRef }}</p>
                </div>
                <div class="bg-gray-900 rounded-lg py-2 px-1">
                  <p class="text-gray-500 text-[10px] mb-0.5">Mensal est.</p>
                  <p class="text-green-400 font-bold text-xs">{{ ipcaMensalEquiv }}%</p>
                  <p class="text-gray-600 text-[10px]">a.m.</p>
                </div>
                <div class="bg-gray-900 rounded-lg py-2 px-1">
                  <p class="text-gray-500 text-[10px] mb-0.5">12 meses</p>
                  <p class="text-green-400 font-bold text-xs">{{ params.ipca.toFixed(2) }}%</p>
                  <p class="text-gray-600 text-[10px]">a.a.</p>
                </div>
              </div>
              <div class="text-gray-500 text-[11px] leading-relaxed flex flex-col gap-1 flex-1 justify-between">
                <div>
                  <p><span class="text-gray-300 font-medium">Como os bancos usam:</span> em IPCA+, o título é corrigido mensalmente pelo IPCA real e o spread incide sobre o valor corrigido.</p>
                  <MathFormula tex="i = (1 + IPCA_{a.a.}) \times (1 + spread) - 1" />
                </div>
                <p class="mt-1">
                  <a href="https://www.bcb.gov.br/controleinflacao/inflacao" target="_blank" rel="noopener noreferrer" class="text-green-500 hover:text-green-400 underline underline-offset-2">BCB — IPCA ↗</a>
                  ·
                  <a href="https://www.ibge.gov.br/explica/inflacao.php" target="_blank" rel="noopener noreferrer" class="text-green-500 hover:text-green-400 underline underline-offset-2">IBGE — Inflação ↗</a>
                </p>
              </div>
            </div>
          </div>

          <!-- Selic -->
          <div class="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-gray-300">Selic (% a.a.)</label>
              <span v-if="selicDataLabel" class="text-[10px] text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{{ selicDataLabel }}</span>
            </div>
            <input v-model.number="params.selic" type="number" step="0.01" class="input" />
            <p class="text-[11px] text-gray-600">
              <a href="https://www.bcb.gov.br/controleinflacao/taxaselic" target="_blank" rel="noopener noreferrer"
                class="text-green-500 hover:text-green-400 underline underline-offset-2">
                BCB — SGS série 432 ↗
              </a>
            </p>

            <!-- Equivalências Selic -->
            <div v-if="selicDiario > 0" class="border-t border-gray-700 pt-3 flex flex-col gap-2 text-xs flex-1">
              <p class="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Equivalências</p>
              <div class="grid grid-cols-3 gap-1.5 text-center">
                <div class="bg-gray-900 rounded-lg py-2 px-1">
                  <p class="text-gray-500 text-[10px] mb-0.5">Diária</p>
                  <p class="text-green-400 font-bold text-xs">{{ selicDiario.toFixed(4) }}%</p>
                  <p class="text-gray-600 text-[10px]">a.d.</p>
                </div>
                <div class="bg-gray-900 rounded-lg py-2 px-1">
                  <p class="text-gray-500 text-[10px] mb-0.5">Mês ant.</p>
                  <p class="text-green-400 font-bold text-xs">{{ selicMensal.toFixed(4) }}%</p>
                  <p class="text-gray-600 text-[10px]">{{ selicMensalRef }}</p>
                </div>
                <div class="bg-gray-900 rounded-lg py-2 px-1">
                  <p class="text-gray-500 text-[10px] mb-0.5">Mensal est.</p>
                  <p class="text-green-400 font-bold text-xs">{{ selicMensalEquiv }}%</p>
                  <p class="text-gray-600 text-[10px]">a.m.</p>
                </div>
              </div>
              <div class="text-gray-500 text-[11px] leading-relaxed flex flex-col gap-1 flex-1 justify-between">
                <div>
                  <p><span class="text-gray-300 font-medium">Como os bancos usam:</span> taxa over diária da Selic ≈ CDI, composta a cada dia útil. Usada no Tesouro Selic e CDBs pós Selic.</p>
                  <MathFormula :tex="`Saldo_t = Saldo_0 \\times (1 + ${selicDiario.toFixed(4)}\\%)^{d_u}`" />
                </div>
                <p class="mt-1">
                  <a href="https://www.bcb.gov.br/controleinflacao/taxaselic" target="_blank" rel="noopener noreferrer" class="text-green-500 hover:text-green-400 underline underline-offset-2">BCB — Selic ↗</a>
                  ·
                  <a href="https://www.bcb.gov.br/estatisticas/tabelasindicadores" target="_blank" rel="noopener noreferrer" class="text-green-500 hover:text-green-400 underline underline-offset-2">BCB — Indicadores ↗</a>
                </p>
              </div>
            </div>
          </div>

        </div>
        <div class="flex gap-3 flex-wrap items-center">
          <button class="btn-primary" @click="calcular">Calcular</button>
          <button class="btn-secondary" @click="salvarParams" :disabled="salvandoParams">
            {{ salvandoParams ? 'Salvando…' : 'Salvar parâmetros' }}
          </button>
          <button class="btn-secondary flex items-center gap-2" @click="buscarTaxasBCB" :disabled="taxasBCBCarregando">
            <svg v-if="taxasBCBCarregando" class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {{ taxasBCBCarregando ? 'Buscando…' : 'Atualizar via Banco Central' }}
          </button>
          <span v-if="taxasBCBErro" class="text-xs text-red-400">{{ taxasBCBErro }}</span>
        </div>
      </div>

      <!-- ── Marketplace de Renda Fixa ── -->
      <div v-if="todosProdutos.length > 0" class="card space-y-4">

        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <h2 class="font-bold text-white text-lg">Mercado de Renda Fixa</h2>
              <span class="inline-flex items-center gap-1 bg-green-900/50 text-green-400 border border-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Ao vivo
              </span>
              <span class="text-sm text-gray-500">— {{ todosProdutos.length }} produtos cadastrados</span>
            </div>
            <p class="text-sm text-gray-400 max-w-2xl">
              Produtos cadastrados por investidores de todo o mercado. Use para negociar com o gestor do seu banco. Ou simplesmente abra uma conta no banco que possui o produto que mais te interessa.
            </p>
          </div>
          <router-link to="/produtos" class="relative inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-400 text-black font-semibold text-xs px-4 py-2 rounded-xl transition-colors shrink-0 self-start shadow-[0_0_0_0_rgba(34,197,94,0.7)] animate-[cta-pulse_2s_ease-in-out_infinite]">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-50"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-black/70"></span>
            </span>
            + Cadastrar produto
          </router-link>
        </div>

        <!-- Aviso colaborativo -->
        <div class="bg-blue-950/60 border border-blue-800/50 rounded-xl p-3 flex gap-3 items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="text-xs text-blue-300 space-y-0.5">
            <p><span class="font-semibold text-blue-200">Dados colaborativos e em tempo real.</span> As ofertas abaixo foram cadastradas por investidores que receberam essas condições nos seus bancos. Os dados são atualizados automaticamente à medida que novos usuários inserem produtos.</p>
            <p class="text-blue-400">Clique em <span class="font-semibold text-blue-200">Confirmar</span> se você recebeu a mesma oferta — isso ajuda outros investidores a validar a veracidade da informação e cria pressão para que os bancos mantenham taxas competitivas.</p>
          </div>
        </div>

        <!-- Filtro por banco (ordenado por qtd de produtos) -->
        <div class="space-y-2">
          <p class="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">Bancos no mercado — clique para filtrar</p>
          <div class="flex flex-wrap gap-2">
            <button
              @click="bancoFiltro = null"
              class="text-[11px] font-medium border px-3 py-1 rounded-full transition-all"
              :class="bancoFiltro === null
                ? 'bg-gray-100 text-gray-900 border-gray-300'
                : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700'"
            >Todos · {{ todosProdutos.length }}</button>
            <button
              v-for="b in bancosPorQtd"
              :key="b.banco"
              @click="bancoFiltro = bancoFiltro === b.banco ? null : b.banco; verTodos = false"
              class="text-[11px] font-medium border px-3 py-1 rounded-full transition-all"
              :class="[
                getBancoCor(b.banco),
                bancoFiltro === b.banco ? 'ring-1 ring-white/40 brightness-125' : 'hover:opacity-80'
              ]"
            >{{ b.banco }} · {{ b.count }}</button>
          </div>
        </div>

        <!-- Tabela marketplace -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-700">
                <th class="text-left pb-3 pr-4 text-gray-500 text-xs uppercase tracking-wider">Produto / Banco</th>
                <th class="text-left pb-3 pr-4 text-gray-500 text-xs uppercase tracking-wider">Modalidade & Custos</th>
                <th class="text-right pb-3 pr-4 text-gray-500 text-xs uppercase tracking-wider">Taxa anunciada</th>
                <th class="text-left pb-3 pr-4 text-gray-500 text-xs uppercase tracking-wider">Validade</th>
                <th class="text-center pb-3 pr-4 text-gray-500 text-xs uppercase tracking-wider">Confirmações</th>
                <th class="text-center pb-3 text-gray-500 text-xs uppercase tracking-wider">Na simulação</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-800/60">
              <tr
                v-for="p in produtosVisiveis"
                :key="p.id"
                class="hover:bg-gray-800/30 transition-colors"
                :class="produtoNaSimulacao(p.id) ? 'bg-green-900/5' : ''"
              >
                <!-- Produto / Banco -->
                <td class="py-3 pr-4 min-w-[180px]">
                  <p class="font-medium text-gray-100 leading-tight">{{ p.nome }}</p>
                  <div class="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span
                      class="text-[10px] font-semibold border px-2 py-0.5 rounded-full"
                      :class="getBancoCor(p.instituicao)"
                    >{{ p.instituicao }}</span>
                    <span v-if="p.fgc" class="text-[10px] font-semibold bg-blue-900/50 text-blue-300 border border-blue-800 px-1.5 py-0.5 rounded-full">FGC</span>
                  </div>
                </td>
                <!-- Modalidade & Custos -->
                <td class="py-3 pr-4 min-w-[160px]">
                  <div class="flex flex-wrap gap-1 mb-1.5">
                    <span class="text-[10px] bg-gray-800 text-gray-400 border border-gray-700 px-2 py-0.5 rounded-full font-medium">{{ p.tipo }}</span>
                  </div>
                  <p class="text-[11px] text-gray-600 mb-2">{{ labelModalidadeMkt(p.modalidade) }}</p>
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="c in custosDoTipo(p.tipo)"
                      :key="c.label"
                      class="text-[10px] border px-1.5 py-0.5 rounded-full"
                      :class="c.cls"
                    >{{ c.label }}</span>
                    <span v-if="retencaoBadge(p.criterio_resgate, retencaoDias(p))"
                      class="text-[10px] border px-1.5 py-0.5 rounded-full bg-red-900/40 text-red-400 border-red-800 font-semibold">
                      🔒 {{ retencaoBadge(p.criterio_resgate, retencaoDias(p)) }}
                    </span>
                  </div>
                </td>
                <!-- Taxa -->
                <td class="py-3 pr-4 text-right">
                  <p class="font-bold text-yellow-400 text-base">{{ p.taxa }}%</p>
                  <p class="text-[11px] text-gray-600">{{ sufixoTaxa(p.modalidade) }}</p>
                </td>
                <!-- Validade -->
                <td class="py-3 pr-4 min-w-[150px]">
                  <span v-if="p.vencimento" class="text-sm text-gray-200 font-medium">{{ formatDate(p.vencimento) }}</span>
                  <span v-else class="text-xs text-green-400 font-semibold">Sem vencimento</span>
                  <p v-if="p.vencimento" class="text-[11px] mt-0.5" :class="diasRestantesNum(p.vencimento) < 90 ? 'text-red-400' : diasRestantesNum(p.vencimento) < 210 ? 'text-yellow-500' : 'text-gray-600'">
                    {{ diasAteVencimento(p.vencimento) }}
                  </p>
                  <p v-if="p.criterio_resgate" class="text-[10px] mt-1 font-medium" :class="labelCriterio(p.criterio_resgate).cls">
                    ↩ {{ labelCriterio(p.criterio_resgate).label }}
                  </p>
                  <p v-if="p.notas" class="text-[10px] text-gray-700 mt-0.5 italic">{{ p.notas }}</p>
                </td>
                <!-- Confirmações -->
                <td class="py-3 pr-4 text-center">
                  <div class="flex flex-col items-center gap-1.5">
                    <div class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" :class="(p.confirmacoes || 0) >= 5 ? 'text-green-400' : 'text-gray-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="font-bold text-sm" :class="(p.confirmacoes || 0) >= 5 ? 'text-green-400' : 'text-gray-400'">{{ p.confirmacoes || 0 }}</span>
                    </div>
                    <span class="text-[10px]" :class="(p.confirmacoes || 0) >= 5 ? 'text-green-600' : 'text-gray-600'">
                      {{ (p.confirmacoes || 0) >= 5 ? 'Alta confiança' : (p.confirmacoes || 0) >= 2 ? 'Verificado' : 'Aguardando' }}
                    </span>
                    <button
                      v-if="!confirmadosSessao.has(p.id)"
                      @click="confirmarProduto(p)"
                      class="text-[10px] bg-gray-800 hover:bg-green-900/40 hover:text-green-400 text-gray-500 border border-gray-700 hover:border-green-800 px-2 py-0.5 rounded-full transition-colors"
                    >Confirmar</button>
                    <span v-else class="text-[10px] text-green-500 font-semibold">✓ Confirmado</span>
                  </div>
                </td>
                <!-- Na simulação -->
                <td class="py-3 text-center">
                  <div v-if="produtoNaSimulacao(p.id)" class="flex flex-col items-center gap-1">
                    <span class="text-green-400 font-bold">✓</span>
                    <span class="text-[10px] text-green-600">Incluído</span>
                    <button @click="removerDaSessao(p.id)" class="text-[10px] text-gray-600 hover:text-red-400 transition-colors border border-gray-800 hover:border-red-800 px-2 py-0.5 rounded-full">Remover</button>
                  </div>
                  <div v-else class="flex flex-col items-center gap-1">
                    <span class="text-gray-700">—</span>
                    <button v-if="resultados.length > 0" @click="adicionarNaSimulacao(p)" class="text-[10px] text-gray-500 hover:text-green-400 transition-colors border border-gray-800 hover:border-green-800 px-2 py-0.5 rounded-full">+ Incluir</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex items-center justify-between mt-2">
            <p class="text-xs text-gray-600">
              <span v-if="bancoFiltro">
                Exibindo {{ produtosVisiveis.length }} produto(s) de <strong class="text-gray-400">{{ bancoFiltro }}</strong>.
                <button @click="bancoFiltro = null; verTodos = false" class="text-green-500 hover:text-green-400 ml-1">Limpar filtro ↺</button>
              </span>
              <span v-else>
                Exibindo {{ produtosVisiveis.length }} de {{ todosProdutos.length }} produtos · ordenados por confirmações
              </span>
            </p>
            <button
              v-if="!bancoFiltro && todosProdutos.length > 10"
              @click="verTodos = !verTodos"
              class="text-xs text-green-500 hover:text-green-400 transition-colors font-medium"
            >{{ verTodos ? '↑ Ver menos' : `Ver todos os ${todosProdutos.length} produtos ↓` }}</button>
          </div>
        </div>

        <p class="text-[11px] text-gray-600 border-t border-gray-800 pt-3">
          Produtos com 5+ confirmações possuem alta confiança de veracidade. Taxas BCB atualizadas em: {{ taxasBCBData || '—' }}.
        </p>
      </div>
    </div>

    <!-- ── Erro ── -->
    <div v-if="erro" class="text-red-400 text-sm no-print">{{ erro }}</div>

    <!-- ── RELATÓRIO ── -->
    <div v-if="resultados.length > 0" id="relatorio" class="space-y-8">

      <!-- Cabeçalho -->
      <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-gray-700 pb-6">
        <div>
          <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">Relatório de Análise</p>
          <h2 class="text-2xl font-black text-white">Investimentos de Renda Fixa</h2>
          <div class="mt-2 space-y-0.5 text-sm text-gray-400">
            <p v-if="nomeCompleto">Investidor: <span class="text-white font-medium">{{ nomeCompleto }}</span></p>
            <p v-if="cliente.email">E-mail: <span class="text-white">{{ cliente.email }}</span></p>
            <p>Gerado em {{ dataRelatorio }} · CDI {{ params.cdi }}% · IPCA {{ params.ipca }}% · Selic {{ params.selic }}%</p>
          </div>
        </div>
        <div class="flex items-center gap-3 no-print">
          <button @click="imprimir" class="btn-secondary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir relatório
          </button>
        </div>
      </div>

      <!-- Contexto do investidor -->
      <div class="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 space-y-4">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest">Contexto da análise</p>

        <!-- Narrativa dinâmica -->
        <div class="space-y-2 text-sm text-gray-300 leading-relaxed">
          <!-- Sem retirada nem aporte -->
          <p v-if="!params.retiradaMensal && !params.aportesMensais">
            Esta análise compara <strong class="text-white">{{ resultados.length }} produto(s)</strong> de renda fixa para um investimento de
            <strong class="text-white">{{ formatRS(params.valorInvestido) }}</strong> pelo prazo de
            <strong class="text-white">{{ prazoSolicitado }} dias</strong>.
            Os produtos estão ordenados pelo <span class="text-green-400 font-medium">maior retorno líquido anual</span> após IR e IOF.
          </p>

          <!-- Com retirada mensal -->
          <template v-if="params.retiradaMensal > 0">
            <p>
              Levando-se em consideração que existe uma necessidade de
              <strong class="text-white">retirada mensal de {{ formatRS(params.retiradaMensal) }}</strong>,
              os produtos foram reordenados priorizando aqueles com
              <span class="text-green-400 font-medium">liquidez diária explícita</span> —
              únicos que permitem saques recorrentes sem penalidade ou deságio.
            </p>
            <p>
              Produtos com carência ou resgate restrito ao vencimento são listados ao final, pois
              <strong class="text-white">não são compatíveis</strong> com retiradas mensais durante o período de restrição.
              Dentro de cada grupo de liquidez, a ordenação é pelo maior retorno líquido.
            </p>
            <p v-if="melhor">
              Com o melhor produto disponível
              (<span class="text-green-400">{{ melhor.produto.nome }}</span>),
              o rendimento líquido mensal estimado é de
              <strong class="text-green-400">{{ formatRS(params.valorInvestido * (Math.pow(1 + melhor.calc.iLiqAnual, 1/12) - 1)) }}</strong>
              —
              <span v-if="params.valorInvestido * (Math.pow(1 + melhor.calc.iLiqAnual, 1/12) - 1) >= params.retiradaMensal" class="text-green-400">
                suficiente para cobrir a retirada desejada, com excedente de
                {{ formatRS(params.valorInvestido * (Math.pow(1 + melhor.calc.iLiqAnual, 1/12) - 1) - params.retiradaMensal) }}/mês.
              </span>
              <span v-else class="text-red-400">
                insuficiente para cobrir a retirada de {{ formatRS(params.retiradaMensal) }}
                (déficit de {{ formatRS(params.retiradaMensal - params.valorInvestido * (Math.pow(1 + melhor.calc.iLiqAnual, 1/12) - 1)) }}/mês).
              </span>
            </p>
          </template>

          <!-- Com aporte mensal -->
          <p v-if="params.aportesMensais > 0">
            O aporte mensal recorrente de <strong class="text-white">{{ formatRS(params.aportesMensais) }}</strong>
            é incorporado na projeção de crescimento do patrimônio — cada contribuição adicional é capitalizada
            à mesma taxa líquida do produto, acelerando a formação de capital ao longo do tempo.
          </p>
        </div>

        <!-- Fórmula utilizada -->
        <div class="border-t border-gray-700 pt-4 space-y-2">
          <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Fórmula de cálculo</p>
          <div class="space-y-3 text-xs text-gray-400">
            <div>
              <p class="text-gray-500 mb-1">Valor futuro (sem aportes mensais):</p>
              <MathFormula :tex="`VF = VP \\times \\left(1 + i_{liq}\\right)^{\\frac{n}{365}}`" />
            </div>
            <div v-if="params.aportesMensais > 0">
              <p class="text-gray-500 mb-1">Valor futuro com aportes mensais recorrentes (juros compostos):</p>
              <MathFormula :tex="`VF = VP \\times (1 + i_{liq})^{\\frac{n}{365}} + A \\times \\frac{(1 + i_{mensal})^{m} - 1}{i_{mensal}}`" />
            </div>
            <div v-if="params.retiradaMensal > 0">
              <p class="text-gray-500 mb-1">Saldo após retirada mensal:</p>
              <MathFormula :tex="`\\text{Saldo} = \\text{Rend. líq./mês} - \\text{Retirada}`" />
            </div>
            <p class="text-gray-600 leading-relaxed">
              Onde: <span class="text-gray-400">VP</span> = valor investido ·
              <span class="text-gray-400">i<sub>liq</sub></span> = taxa líquida anual (após IR e IOF) ·
              <span class="text-gray-400">n</span> = prazo em dias ·
              <span v-if="params.aportesMensais > 0"><span class="text-gray-400">A</span> = aporte mensal ·
              <span class="text-gray-400">m</span> = número de meses · </span>
              <span class="text-gray-400">i<sub>mensal</sub></span> = taxa líquida mensal equivalente = (1 + i<sub>liq</sub>)<sup>1/12</sup> − 1
            </p>
          </div>
        </div>
      </div>

      <!-- Resumo executivo -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="card text-center space-y-1">
          <p class="text-gray-500 text-xs uppercase tracking-wider">Valor investido</p>
          <p class="text-xl font-bold text-white">{{ formatRS(params.valorInvestido) }}</p>
        </div>
        <div class="card text-center space-y-1">
          <p class="text-gray-500 text-xs uppercase tracking-wider">Prazo simulado</p>
          <p class="text-xl font-bold text-white">{{ prazoSolicitado }} dias</p>
        </div>
        <div class="card text-center space-y-1 border-green-800">
          <p class="text-gray-500 text-xs uppercase tracking-wider">Melhor retorno líquido</p>
          <p class="text-xl font-bold text-green-400">{{ melhor ? melhor.calc.iLiqAnualPct.toFixed(2) + '% a.a.' : '—' }}</p>
          <p class="text-xs text-gray-600 truncate">{{ melhor?.produto.nome }}</p>
        </div>
        <div class="card text-center space-y-1 border-green-800">
          <p class="text-gray-500 text-xs uppercase tracking-wider">Lucro líquido máximo</p>
          <p class="text-xl font-bold text-green-400">{{ melhor ? formatRS(melhor.calc.lucroLiq) : '—' }}</p>
          <p class="text-xs text-gray-600">Após IR e IOF</p>
        </div>
      </div>

      <!-- ══ TOP 5 — RENDIMENTOS MENSAIS ══ -->
      <div class="space-y-4">
        <div class="flex items-center justify-between gap-3">
          <div>
            <h3 class="font-bold text-white text-lg">Top 5 — Rendimentos Mensais</h3>
            <p class="text-gray-400 text-sm">
              Estimativa do rendimento mensal bruto e líquido para cada produto,
              ordenada do maior para o menor ganho líquido.
            </p>
          </div>
          <div class="flex gap-2 text-xs no-print shrink-0">
            <button
              v-for="v in ['tabela', 'cards']" :key="v"
              class="px-3 py-1 rounded-lg transition-colors"
              :class="vistaTop5 === v ? 'bg-green-900/50 text-green-400' : 'text-gray-500 hover:text-gray-300'"
              @click="vistaTop5 = v"
            >{{ v === 'tabela' ? 'Tabela' : 'Cards' }}</button>
          </div>
        </div>

        <!-- Cards de resumo mensal -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="card text-center space-y-0.5">
            <p class="text-gray-500 text-xs uppercase tracking-wider">Melhor rend. bruto/mês</p>
            <p class="text-lg font-bold text-yellow-400">
              {{ top5Mensal[0] ? formatRS(top5Mensal[0].mensalBruto) : '—' }}
            </p>
            <p class="text-xs text-gray-600 truncate">{{ top5Mensal[0]?.produto.nome }}</p>
          </div>
          <div class="card text-center space-y-0.5">
            <p class="text-gray-500 text-xs uppercase tracking-wider">Melhor rend. líq./mês</p>
            <p class="text-lg font-bold text-green-400">
              {{ top5Mensal[0] ? formatRS(top5Mensal[0].mensalLiq) : '—' }}
            </p>
            <p class="text-xs text-gray-600 truncate">{{ top5Mensal[0]?.produto.nome }}</p>
          </div>
          <div class="card text-center space-y-0.5">
            <p class="text-gray-500 text-xs uppercase tracking-wider">Retirada mensal</p>
            <p class="text-lg font-bold text-white">{{ formatRS(params.retiradaMensal || 0) }}</p>
            <p class="text-xs text-gray-600">Desejada pelo investidor</p>
          </div>
          <div class="card text-center space-y-0.5" :class="melhorSaldo >= 0 ? 'border-green-800' : 'border-red-800'">
            <p class="text-gray-500 text-xs uppercase tracking-wider">Saldo após retirada</p>
            <p class="text-lg font-bold" :class="melhorSaldo >= 0 ? 'text-green-400' : 'text-red-400'">
              {{ top5Mensal[0] ? formatRS(melhorSaldo) : '—' }}
            </p>
            <p class="text-xs" :class="melhorSaldo >= 0 ? 'text-green-600' : 'text-red-600'">
              {{ melhorSaldo >= 0 ? 'Sustentável' : 'Insustentável' }}
            </p>
          </div>
        </div>

        <!-- Tabela top 5 mensal -->
        <div class="card overflow-x-auto">

          <!-- Tabela -->
          <div v-if="vistaTop5 === 'tabela'">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-700">
                <th class="text-left pb-2 pr-3 text-gray-600 text-[10px] uppercase tracking-wider">#</th>
                <th class="text-left pb-2 pr-3 text-gray-600 text-[10px] uppercase tracking-wider">Produto</th>
                <th class="text-right pb-2 pr-3 text-[10px] uppercase tracking-wider text-gray-600">
                  Banco anuncia<br><span class="text-gray-700 normal-case font-normal">bruto a.a.</span>
                </th>
                <th class="text-right pb-2 pr-3 text-[10px] uppercase tracking-wider text-gray-600">
                  Rend. bruto<br><span class="text-gray-700 normal-case font-normal">por mês</span>
                </th>
                <th class="text-right pb-2 pr-3 text-[10px] uppercase tracking-wider text-gray-600">
                  IR<br><span class="text-gray-700 normal-case font-normal">aplicado</span>
                </th>
                <th class="text-right pb-2 pr-3 text-[10px] uppercase tracking-wider text-gray-600">
                  Ganho real<br><span class="text-gray-700 normal-case font-normal">líquido a.a.</span>
                </th>
                <th class="text-right pb-2 pr-3 text-[10px] uppercase tracking-wider text-gray-600">
                  Rend. líq.<br><span class="text-gray-700 normal-case font-normal">por mês</span>
                </th>
                <th v-if="params.retiradaMensal > 0" class="text-right pb-2 pr-3 text-[10px] uppercase tracking-wider text-gray-600">
                  Retirada<br><span class="text-gray-700 normal-case font-normal">desejada</span>
                </th>
                <th v-if="params.retiradaMensal > 0" class="text-right pb-2 text-[10px] uppercase tracking-wider text-gray-600">
                  Saldo<br><span class="text-gray-700 normal-case font-normal">após retirada</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-800">
              <tr
                v-for="(r, i) in top5Mensal"
                :key="r.produto.id"
                class="hover:bg-gray-800/40 transition-colors"
                :class="i === 0 ? 'bg-green-900/10' : ''"
              >
                <!-- # -->
                <td class="py-4 pr-3">
                  <span v-if="i === 0" class="text-lg">🥇</span>
                  <span v-else-if="i === 1" class="text-lg">🥈</span>
                  <span v-else-if="i === 2" class="text-lg">🥉</span>
                  <span v-else class="text-gray-600 text-xs">{{ i + 1 }}°</span>
                </td>
                <!-- Produto -->
                <td class="py-4 pr-3 min-w-[200px]">
                  <p class="font-medium text-gray-100 leading-tight">{{ r.produto.nome }}</p>
                  <p class="text-xs text-gray-500 mt-0.5">{{ r.produto.instituicao }}</p>
                  <div class="flex flex-wrap gap-1 mt-1">
                    <span class="tag">{{ r.produto.tipo }}</span>
                    <span v-if="r.calc.fatorLimitante === 'PRODUTO'" class="badge-yellow">Vence antes</span>
                  </div>
                  <div class="mt-1.5 flex items-center gap-2 text-[11px]">
                    <span class="text-gray-600">
                      {{ r.produto.vencimento ? formatDate(r.produto.vencimento) : 'Liquidez diária' }}
                    </span>
                    <span class="text-gray-700">·</span>
                    <span class="flex items-center gap-0.5" :class="(r.produto.confirmacoes || 0) >= 5 ? 'text-green-500' : 'text-gray-500'">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ r.produto.confirmacoes || 0 }} confirmações
                    </span>
                  </div>
                </td>
                <!-- Banco anuncia (bruto a.a.) -->
                <td class="py-4 pr-3 text-right">
                  <p class="text-yellow-400 font-bold">{{ r.calc.taxaBrutaAnualPct.toFixed(2) }}%</p>
                  <p class="text-xs text-gray-600">a.a. bruto</p>
                </td>
                <!-- Rend. bruto mensal -->
                <td class="py-4 pr-3 text-right">
                  <p class="text-yellow-400 font-bold">{{ formatRS(r.mensalBruto) }}</p>
                  <p class="text-xs text-gray-600">bruto/mês</p>
                </td>
                <!-- IR -->
                <td class="py-4 pr-3 text-right">
                  <p v-if="r.calc.isentoIR" class="text-green-400 font-semibold">Isento</p>
                  <p v-else class="font-bold" :class="corIR(r.calc.alpha)">{{ (r.calc.alpha * 100).toFixed(1) }}%</p>
                </td>
                <!-- Você recebe (líq a.a.) -->
                <td class="py-4 pr-3 text-right">
                  <p class="font-black text-base" :class="i === 0 ? 'text-green-400' : 'text-gray-200'">
                    {{ r.calc.iLiqAnualPct.toFixed(2) }}%
                  </p>
                  <p class="text-xs text-gray-500">a.a. líquido</p>
                </td>
                <!-- Rend. líquido mensal -->
                <td class="py-4 pr-3 text-right">
                  <p class="font-bold text-base" :class="i === 0 ? 'text-green-400' : 'text-green-300'">
                    {{ formatRS(r.mensalLiq) }}
                  </p>
                  <p class="text-xs text-gray-500">líq./mês</p>
                </td>
                <!-- Retirada e Saldo (só aparece se retirada > 0) -->
                <td v-if="params.retiradaMensal > 0" class="py-4 pr-3 text-right">
                  <p class="text-gray-300">{{ formatRS(params.retiradaMensal) }}</p>
                </td>
                <td v-if="params.retiradaMensal > 0" class="py-4 text-right">
                  <p class="font-bold" :class="r.saldo >= 0 ? 'text-green-400' : 'text-red-400'">
                    {{ r.saldo >= 0 ? '+' : '' }}{{ formatRS(r.saldo) }}
                  </p>
                  <p class="text-xs" :class="r.saldo >= 0 ? 'text-green-600' : 'text-red-600'">
                    {{ r.saldo >= 0 ? '✓ Sustentável' : '✗ Insuficiente' }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="text-xs text-gray-600 mt-3 border-t border-gray-800 pt-3">
            Rendimento mensal estimado = Valor investido × ((1 + taxa líquida a.a.)^(1/12) − 1).
            Simulação baseada no prazo e alíquota de IR do período definido acima.
          </p>
          </div>

          <!-- Cards -->
          <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="(r, i) in top5Mensal" :key="r.produto.id"
              class="bg-gray-800 rounded-xl p-4 space-y-3"
              :class="i === 0 ? 'ring-1 ring-green-600' : ''"
            >
              <div class="flex items-start justify-between gap-2">
                <div>
                  <p class="font-semibold text-white text-sm leading-tight">{{ r.produto.nome }}</p>
                  <p class="text-xs text-gray-500 mt-0.5">{{ r.produto.instituicao }}</p>
                </div>
                <span v-if="i === 0" class="text-xl shrink-0">🥇</span>
                <span v-else-if="i === 1" class="text-xl shrink-0">🥈</span>
                <span v-else-if="i === 2" class="text-xl shrink-0">🥉</span>
                <span v-else class="text-gray-600 text-xs shrink-0 mt-1">{{ i + 1 }}°</span>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="bg-yellow-900/30 rounded-lg p-3 text-center">
                  <p class="text-yellow-500 text-xs font-semibold uppercase tracking-wider mb-1">Banco anuncia</p>
                  <p class="text-yellow-400 font-bold text-base">{{ r.calc.taxaBrutaAnualPct.toFixed(2) }}%</p>
                  <p class="text-yellow-600 text-xs">a.a. bruto</p>
                  <p class="text-yellow-400 text-xs font-semibold mt-1">{{ formatRS(r.mensalBruto) }}/mês</p>
                </div>
                <div class="bg-green-900/20 rounded-lg p-3 text-center">
                  <p class="text-green-500 text-xs font-semibold uppercase tracking-wider mb-1">Ganho real</p>
                  <p class="font-bold text-base" :class="i === 0 ? 'text-green-400' : 'text-gray-200'">{{ r.calc.iLiqAnualPct.toFixed(2) }}%</p>
                  <p class="text-green-700 text-xs">a.a. líquido</p>
                  <p class="text-green-400 text-xs font-semibold mt-1">{{ formatRS(r.mensalLiq) }}/mês</p>
                </div>
              </div>
              <div class="flex flex-wrap items-center gap-2 text-xs">
                <span class="tag">{{ r.produto.tipo }}</span>
                <span v-if="r.calc.isentoIR" class="badge-green">Isento IR</span>
                <span v-else class="badge-red">IR {{ (r.calc.alpha * 100).toFixed(0) }}%</span>
                <span v-if="retencaoDias(r.produto)" class="badge-red">🔒 {{ formatarRetencao(retencaoDias(r.produto)) }}</span>
                <span v-if="r.calc.fatorLimitante === 'PRODUTO'" class="badge-yellow">Vence antes</span>
              </div>
              <div v-if="params.retiradaMensal > 0" class="border-t border-gray-700 pt-2 text-xs flex justify-between">
                <span class="text-gray-500">Saldo após retirada</span>
                <span class="font-semibold" :class="r.saldo >= 0 ? 'text-green-400' : 'text-red-400'">
                  {{ r.saldo >= 0 ? '+' : '' }}{{ formatRS(r.saldo) }}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Aviso vencimento limitante -->
      <div v-if="alertaVencimento" class="bg-yellow-900/20 border border-yellow-800 rounded-xl p-4 text-sm text-yellow-300">
        <strong>Atenção ao prazo efetivo:</strong> {{ alertaVencimento }}
      </div>

      <!-- ── Ranking completo ── -->
      <div class="card overflow-x-auto space-y-0">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <h3 class="font-semibold text-white">Ranking completo — Banco anuncia × Você recebe</h3>
            <button
              v-if="rankingSort.campo !== 'iLiqAnual' || rankingSort.dir !== 'desc'"
              @click="rankingSort = { campo: 'iLiqAnual', dir: 'desc' }"
              class="text-[10px] text-gray-500 hover:text-gray-300 border border-gray-700 hover:border-gray-500 px-2 py-0.5 rounded-full transition-colors no-print"
              title="Resetar ordenação"
            >↺ resetar</button>
          </div>
          <div class="flex gap-2 text-xs no-print">
            <button
              v-for="v in ['tabela', 'cards']" :key="v"
              class="px-3 py-1 rounded-lg transition-colors"
              :class="vista === v ? 'bg-green-900/50 text-green-400' : 'text-gray-500 hover:text-gray-300'"
              @click="vista = v"
            >{{ v === 'tabela' ? 'Tabela' : 'Cards' }}</button>
          </div>
        </div>

        <!-- Tabela -->
        <div v-if="vista === 'tabela'" class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-700">
                <th class="text-left pb-2 pr-3 text-gray-600 text-[10px] uppercase tracking-wider">#</th>
                <th class="text-left pb-2 pr-3 text-gray-600 text-[10px] uppercase tracking-wider">Produto</th>
                <th @click="toggleSort('taxaBruta')" class="text-right pb-2 pr-3 text-[10px] uppercase tracking-wider cursor-pointer select-none transition-colors">
                  <span :class="rankingSort.campo === 'taxaBruta' ? 'text-gray-200' : 'text-gray-600 hover:text-gray-400'">Banco anuncia {{ sortIcon('taxaBruta') }}</span>
                </th>
                <th @click="toggleSort('iLiqAnual')" class="text-right pb-2 pr-3 text-[10px] uppercase tracking-wider cursor-pointer select-none transition-colors">
                  <span :class="rankingSort.campo === 'iLiqAnual' ? 'text-gray-200' : 'text-gray-600 hover:text-gray-400'">Ganho real {{ sortIcon('iLiqAnual') }}</span>
                </th>
                <th @click="toggleSort('retencao')" class="text-right pb-2 pr-3 text-[10px] uppercase tracking-wider cursor-pointer select-none transition-colors" title="Tempo mínimo que o dinheiro fica bloqueado">
                  <span :class="rankingSort.campo === 'retencao' ? 'text-gray-200' : 'text-gray-600 hover:text-gray-400'">Retenção {{ sortIcon('retencao') }}</span>
                </th>
                <th @click="toggleSort('prazo')" class="text-right pb-2 pr-3 text-[10px] uppercase tracking-wider cursor-pointer select-none transition-colors" title="Menor entre o prazo solicitado e o vencimento do produto">
                  <span :class="rankingSort.campo === 'prazo' ? 'text-gray-200' : 'text-gray-600 hover:text-gray-400'">Prazo efetivo {{ sortIcon('prazo') }}</span>
                </th>
                <th @click="toggleSort('lucroLiq')" class="text-right pb-2 pr-3 text-[10px] uppercase tracking-wider cursor-pointer select-none transition-colors">
                  <span :class="rankingSort.campo === 'lucroLiq' ? 'text-gray-200' : 'text-gray-600 hover:text-gray-400'">Lucro líq. {{ sortIcon('lucroLiq') }}</span>
                </th>
                <th @click="toggleSort('valorFinal')" class="text-right pb-2 text-[10px] uppercase tracking-wider cursor-pointer select-none transition-colors">
                  <span :class="rankingSort.campo === 'valorFinal' ? 'text-gray-200' : 'text-gray-600 hover:text-gray-400'">Valor final {{ sortIcon('valorFinal') }}</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-800">
              <tr
                v-for="(r, i) in resultadosOrdenados" :key="r.produto.id"
                class="hover:bg-gray-800/40 transition-colors"
                :class="i === 0 ? 'bg-green-900/10' : ''"
              >
                <td class="py-4 pr-3">
                  <span v-if="i === 0" class="text-lg">🥇</span>
                  <span v-else-if="i === 1" class="text-lg">🥈</span>
                  <span v-else-if="i === 2" class="text-lg">🥉</span>
                  <span v-else class="text-gray-600 text-xs">{{ i + 1 }}°</span>
                </td>
                <td class="py-4 pr-3 min-w-[160px]">
                  <div class="space-y-1">
                    <p class="font-medium text-gray-100 leading-tight">{{ r.produto.nome }}</p>
                    <p class="text-xs text-gray-500">{{ r.produto.instituicao }}</p>
                    <div class="flex flex-wrap gap-1 mt-1">
                      <span class="tag">{{ r.produto.tipo }}</span>
                      <span v-if="r.calc.isentoIR" class="badge-green">IR Isento</span>
                      <span v-else class="badge-red">IR {{ (r.calc.alpha * 100).toFixed(1) }}%</span>
                      <span v-if="r.calc.iofAliq > 0" class="badge-red">IOF {{ (r.calc.iofAliq*100).toFixed(0) }}%</span>
                      <span v-if="r.calc.fatorLimitante === 'PRODUTO'" class="badge-yellow">Vence antes</span>
                    </div>
                  </div>
                </td>
                <!-- Banco anuncia -->
                <td class="py-4 pr-3 text-right">
                  <p class="text-yellow-400 font-bold">{{ r.calc.taxaBrutaAnualPct.toFixed(2) }}% a.a.</p>
                  <p class="text-xs text-gray-600">bruto anunciado</p>
                </td>
                <!-- Ganho real -->
                <td class="py-4 pr-3 text-right">
                  <p class="font-black text-lg" :class="i === 0 ? 'text-green-400' : 'text-gray-200'">
                    {{ r.calc.iLiqAnualPct.toFixed(2) }}% a.a.
                  </p>
                  <p class="text-xs text-gray-500">líquido real</p>
                </td>
                <!-- Retenção -->
                <td class="py-4 pr-3 text-right">
                  <span v-if="retencaoDias(r.produto)" class="text-red-400 font-semibold text-xs">
                    🔒 {{ formatarRetencao(retencaoDias(r.produto)) }}
                  </span>
                  <span v-else class="text-green-400 text-xs font-semibold">Livre</span>
                </td>
                <!-- Prazo efetivo -->
                <td class="py-4 pr-3 text-right">
                  <p class="text-gray-300">{{ r.calc.prazoEfetivoDias }}d</p>
                  <p class="text-xs text-gray-600">{{ formatDate(r.calc.dataEfetiva) }}</p>
                </td>
                <td class="py-4 pr-3 text-right">
                  <p class="text-green-300 font-semibold">{{ formatRS(r.calc.lucroLiq) }}</p>
                </td>
                <td class="py-4 text-right">
                  <p class="text-white font-bold">{{ formatRS(r.calc.valorFinal) }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Cards -->
        <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(r, i) in resultadosVisiveis" :key="r.produto.id"
            class="bg-gray-800 rounded-xl p-4 space-y-3"
            :class="i === 0 ? 'ring-1 ring-green-600' : ''"
          >
            <div class="flex items-start justify-between gap-2">
              <div>
                <p class="font-semibold text-white text-sm leading-tight">{{ r.produto.nome }}</p>
                <p class="text-xs text-gray-500 mt-0.5">{{ r.produto.instituicao }}</p>
              </div>
              <span v-if="i === 0" class="text-xl shrink-0">🥇</span>
              <span v-else-if="i === 1" class="text-xl shrink-0">🥈</span>
              <span v-else-if="i === 2" class="text-xl shrink-0">🥉</span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-yellow-900/30 rounded-lg p-3 text-center">
                <p class="text-yellow-500 text-xs font-semibold uppercase tracking-wider mb-1">Banco anuncia</p>
                <p class="text-yellow-400 font-black text-lg">{{ r.calc.taxaBrutaAnualPct.toFixed(2) }}%</p>
                <p class="text-yellow-600 text-xs">bruto a.a.</p>
              </div>
              <div class="bg-green-900/30 rounded-lg p-3 text-center">
                <p class="text-green-500 text-xs font-semibold uppercase tracking-wider mb-1">Você recebe</p>
                <p class="font-black text-lg" :class="i === 0 ? 'text-green-400' : 'text-green-300'">
                  {{ r.calc.iLiqAnualPct.toFixed(2) }}%
                </p>
                <p class="text-green-600 text-xs">líquido a.a.</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-y-1.5 text-xs">
              <span class="text-gray-500">Rend. líq./mês</span>
              <span class="text-green-300 text-right font-semibold">
                {{ formatRS(params.valorInvestido * (Math.pow(1 + r.calc.iLiqAnual, 1/12) - 1)) }}
              </span>
              <span class="text-gray-500">IR aplicado</span>
              <span class="text-right" :class="r.calc.isentoIR ? 'text-green-400' : 'text-red-400'">
                {{ r.calc.isentoIR ? 'Isento' : (r.calc.alpha * 100).toFixed(1) + '%' }}
              </span>
              <span class="text-gray-500">Lucro líquido</span>
              <span class="text-green-300 text-right font-semibold">{{ formatRS(r.calc.lucroLiq) }}</span>
              <span class="text-gray-500">Valor final</span>
              <span class="text-white text-right font-bold">{{ formatRS(r.calc.valorFinal) }}</span>
            </div>
            <div v-if="r.calc.proximaFaixa" class="bg-yellow-900/20 border border-yellow-800 rounded-lg p-2 text-xs text-yellow-300">
              Aguardar +{{ r.calc.proximaFaixa.diasFaltam }} dias → IR cai para
              {{ (r.calc.proximaFaixa.alphaProx * 100).toFixed(1) }}%
              (ganho extra {{ formatRS(r.calc.proximaFaixa.diffRS) }})
            </div>
          </div>
        </div>

        <!-- Ver todos ranking -->
        <div v-if="resultados.length > 10" class="flex items-center justify-between pt-3 border-t border-gray-800 mt-3">
          <p class="text-xs text-gray-600">Exibindo {{ resultadosVisiveis.length }} de {{ resultados.length }} produtos</p>
          <button @click="verTodosRanking = !verTodosRanking" class="text-xs text-green-500 hover:text-green-400 transition-colors font-medium">
            {{ verTodosRanking ? '↑ Ver menos' : `Ver todos os ${resultados.length} produtos ↓` }}
          </button>
        </div>
      </div>

      <!-- ── Análise detalhada ── -->
      <div class="space-y-4">
        <h3 class="font-semibold text-white text-lg border-b border-gray-800 pb-3">Análise detalhada por produto</h3>

        <div v-for="(r, i) in resultados" :key="'det-' + r.produto.id" class="card space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                :class="i === 0 ? 'bg-green-900 text-green-400' : 'bg-gray-800 text-gray-400'"
              >{{ i + 1 }}</div>
              <div>
                <p class="font-bold text-white">{{ r.produto.nome }}</p>
                <p class="text-xs text-gray-500">{{ r.produto.instituicao }} · {{ labelModalidade(r.produto.modalidade) }}</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span class="tag">{{ r.produto.tipo }}</span>
              <span v-if="r.calc.isentoIR" class="badge-green">Isento IR</span>
              <span v-if="r.calc.isentoIOF" class="badge-green">Isento IOF</span>
              <span v-if="r.produto.fgc" class="badge-blue">FGC</span>
              <span v-if="r.calc.fatorLimitante === 'PRODUTO'" class="badge-yellow">Vence em {{ formatDate(r.calc.dataEfetiva) }}</span>
              <span v-if="retencaoBadge(r.produto.criterio_resgate, retencaoDias(r.produto))" class="badge-red">🔒 {{ retencaoBadge(r.produto.criterio_resgate, retencaoDias(r.produto)) }}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-yellow-900/20 border border-yellow-800 rounded-xl p-4 space-y-2">
              <p class="text-yellow-500 text-xs font-semibold uppercase tracking-wider">O que o banco anuncia</p>
              <p class="text-3xl font-black text-yellow-400">{{ r.calc.taxaBrutaAnualPct.toFixed(2) }}% <span class="text-base font-normal">a.a.</span></p>
              <p class="text-xs text-yellow-600">Taxa bruta anual (antes de IR e IOF)</p>
            </div>
            <div class="bg-green-900/20 border border-green-800 rounded-xl p-4 space-y-2" :class="i === 0 ? 'border-green-600' : ''">
              <p class="text-green-500 text-xs font-semibold uppercase tracking-wider">O que você realmente recebe</p>
              <p class="text-3xl font-black" :class="i === 0 ? 'text-green-400' : 'text-green-300'">
                {{ r.calc.iLiqAnualPct.toFixed(2) }}% <span class="text-base font-normal">a.a.</span>
              </p>
              <p class="text-xs text-green-600">Taxa líquida anual (após IR e IOF)</p>
            </div>
          </div>

          <!-- Fluxo -->
          <div>
            <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">
              Fluxo de cálculo — {{ formatRS(params.valorInvestido) }} por {{ r.calc.prazoEfetivoDias }} dias
            </p>
            <div class="flex flex-col sm:flex-row items-stretch gap-2 text-sm">
              <div class="flex-1 bg-gray-800 rounded-xl p-3 text-center">
                <p class="text-gray-500 text-xs mb-1">Rendimento bruto</p>
                <p class="text-white font-bold">{{ formatRS(r.calc.lucroBruto) }}</p>
                <p class="text-gray-600 text-xs mt-0.5">{{ (r.calc.rBruto * 100).toFixed(3) }}% no período</p>
              </div>
              <div class="flex items-center justify-center text-gray-600 font-bold shrink-0">−</div>
              <div class="flex-1 rounded-xl p-3 text-center" :class="r.calc.iofValor > 0 ? 'bg-red-900/30 border border-red-900' : 'bg-gray-800'">
                <p class="text-gray-500 text-xs mb-1">IOF</p>
                <p :class="r.calc.iofValor > 0 ? 'text-red-400' : 'text-gray-400'" class="font-bold">{{ formatRS(r.calc.iofValor) }}</p>
                <p class="text-gray-600 text-xs mt-0.5">{{ r.calc.isentoIOF ? 'Isento' : (r.calc.iofAliq * 100).toFixed(0) + '% s/ rend. bruto' }}</p>
              </div>
              <div class="flex items-center justify-center text-gray-600 font-bold shrink-0">−</div>
              <div class="flex-1 rounded-xl p-3 text-center" :class="r.calc.irValor > 0 ? 'bg-red-900/30 border border-red-900' : 'bg-gray-800'">
                <p class="text-gray-500 text-xs mb-1">IR</p>
                <p :class="r.calc.irValor > 0 ? 'text-red-400' : 'text-gray-400'" class="font-bold">{{ formatRS(r.calc.irValor) }}</p>
                <p class="text-gray-600 text-xs mt-0.5">{{ r.calc.isentoIR ? 'Isento' : (r.calc.alpha * 100).toFixed(1) + '% s/ rend. pós-IOF' }}</p>
              </div>
              <div class="flex items-center justify-center text-gray-600 font-bold shrink-0">=</div>
              <div class="flex-1 bg-green-900/30 border border-green-800 rounded-xl p-3 text-center">
                <p class="text-green-500 text-xs mb-1">Lucro líquido</p>
                <p class="text-green-400 font-bold">{{ formatRS(r.calc.lucroLiq) }}</p>
                <p class="text-gray-600 text-xs mt-0.5">Valor final: {{ formatRS(r.calc.valorFinal) }}</p>
              </div>
            </div>
          </div>

          <!-- Métricas secundárias + mensal -->
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 text-sm">
            <div class="space-y-0.5">
              <p class="text-gray-500 text-xs">Prazo efetivo</p>
              <p class="text-gray-200 font-semibold">{{ r.calc.prazoEfetivoDias }} dias</p>
              <p class="text-gray-600 text-xs">até {{ formatDate(r.calc.dataEfetiva) }}</p>
            </div>
            <div class="space-y-0.5">
              <p class="text-gray-500 text-xs">Faixa de IR</p>
              <p class="font-semibold" :class="r.calc.isentoIR ? 'text-green-400' : corIR(r.calc.alpha)">
                {{ r.calc.isentoIR ? 'Isento (PF)' : (r.calc.alpha * 100).toFixed(1) + '%' }}
              </p>
              <p class="text-gray-600 text-xs">{{ descFaixaIR(r.calc.alpha, r.calc.isentoIR) }}</p>
            </div>
            <div class="space-y-0.5">
              <p class="text-gray-500 text-xs">Custo total fisco</p>
              <p :class="(r.calc.iofValor + r.calc.irValor) > 0 ? 'text-red-400' : 'text-green-400'" class="font-semibold">
                {{ formatRS(r.calc.iofValor + r.calc.irValor) }}
              </p>
              <p class="text-gray-600 text-xs">
                {{ r.calc.lucroBruto > 0 ? ((r.calc.iofValor + r.calc.irValor) / r.calc.lucroBruto * 100).toFixed(1) + '% do lucro bruto' : '—' }}
              </p>
            </div>
            <div class="space-y-0.5">
              <p class="text-gray-500 text-xs">Rend. bruto/mês</p>
              <p class="text-yellow-400 font-semibold">{{ formatRS(params.valorInvestido * (Math.pow(1 + r.calc.taxaBrutaAnualDecimal, 1/12) - 1)) }}</p>
              <p class="text-gray-600 text-xs">anunciado pelo banco</p>
            </div>
            <div class="space-y-0.5">
              <p class="text-gray-500 text-xs">Rend. líq./mês</p>
              <p class="text-green-400 font-semibold">{{ formatRS(params.valorInvestido * (Math.pow(1 + r.calc.iLiqAnual, 1/12) - 1)) }}</p>
              <p class="text-gray-600 text-xs">o que você recebe</p>
            </div>
          </div>

          <div v-if="r.calc.proximaFaixa" class="bg-yellow-900/20 border border-yellow-800 rounded-xl p-3 text-sm text-yellow-300 flex items-start gap-2">
            <span class="shrink-0 mt-0.5">⚡</span>
            <span>
              Aguardando mais <strong>{{ r.calc.proximaFaixa.diasFaltam }} dias</strong> reduz o IR de
              {{ (r.calc.proximaFaixa.alphaAtual * 100).toFixed(1) }}% para
              {{ (r.calc.proximaFaixa.alphaProx * 100).toFixed(1) }}%,
              adicionando <strong>{{ formatRS(r.calc.proximaFaixa.diffRS) }}</strong> ao lucro líquido.
            </span>
          </div>

          <!-- Parecer Gerencial -->
          <div class="border-t border-gray-800 pt-4 space-y-2">
            <p class="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2">Parecer gerencial</p>
            <div
              v-for="(item, idx) in parecer(r)"
              :key="idx"
              class="flex items-start gap-2 text-xs rounded-lg px-3 py-2.5 leading-relaxed"
              :class="{
                'bg-green-900/20 text-green-300 border border-green-900/60': item.tipo === 'success',
                'bg-yellow-900/20 text-yellow-300 border border-yellow-900/60': item.tipo === 'warning',
                'bg-red-900/20 text-red-300 border border-red-900/60': item.tipo === 'danger',
                'bg-blue-900/20 text-blue-300 border border-blue-900/60': item.tipo === 'info',
              }"
            >
              <span class="shrink-0 font-bold mt-0.5">
                {{ item.tipo === 'success' ? '✓' : item.tipo === 'danger' ? '✗' : item.tipo === 'warning' ? '⚠' : 'i' }}
              </span>
              <span>{{ item.texto }}</span>
            </div>
            <p v-if="r.produto.notas" class="text-xs text-gray-500 flex items-start gap-1.5 pt-1">
              <span class="shrink-0">📎</span>
              <span>{{ r.produto.notas }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Rodapé -->
      <div class="text-xs text-gray-600 border-t border-gray-800 pt-6 space-y-1">
        <p v-if="nomeCompleto">Investidor: {{ nomeCompleto }}{{ cliente.email ? ' · ' + cliente.email : '' }}</p>
        <p>Simulação gerada em {{ dataRelatorio }}. CDI: {{ params.cdi }}% a.a. · IPCA: {{ params.ipca }}% a.a. · Selic: {{ params.selic }}% a.a.</p>
        <p>Cálculos baseados na tabela regressiva de IR (Lei nº 11.033/2004) e tabela de IOF vigente. LCI, LCA, CRI, CRA e Debêntures Incentivadas são isentos de IR para pessoa física.</p>
        <p>Este relatório é estritamente educacional e não constitui recomendação de investimento. Verifique sempre as condições atuais junto às instituições financeiras.</p>
      </div>

    </div>

    <div v-else-if="!erro && !carregandoProdutos" class="text-center py-16 text-gray-600">
      Ajuste os parâmetros e clique em <strong class="text-gray-400">Calcular</strong>.
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import {
  calcularProduto, calcularDias, getIRAliquota,
  formatRS, formatDate, MODALIDADES,
} from '../utils/calculos.js'
import MathFormula from '../components/MathFormula.vue'
import { useMathJax } from '../composables/useMathJax.js'
import { getProdutos, getParametros, saveParametros, confirmarProduto as confirmarProdutoLocal } from '../composables/useData.js'

useMathJax()

function dataLocalISO(offsetDias = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offsetDias)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}
function dataUmAnoISO() {
  const d = new Date()
  d.setDate(d.getDate() + 1)       // começa de amanhã
  d.setFullYear(d.getFullYear() + 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}
const amanha = dataLocalISO(1)
const umAno  = dataUmAnoISO()

const cliente = ref({ nome: '', sobrenome: '', email: '' })

const params = ref({
  valorInvestido: 100000,
  dataInicio: amanha,
  dataFimDesejada: umAno,
  retiradaMensal: 0,
  aportesMensais: 0,
  cdi: 14.65,
  ipca: 5.5,
  selic: 14.5,
})

const todosProdutos      = ref([])
const resultados         = ref([])
const carregandoProdutos = ref(true)
const salvandoParams     = ref(false)
const erro               = ref(null)
const vista              = ref('tabela')
const vistaTop5          = ref('tabela')

const mesAtual = computed(() =>
  new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
)

const taxasBCBCarregando = ref(false)
const taxasBCBErro      = ref('')

// CDI
const taxasBCBData      = ref('')
const cdiDiario         = ref(0)
const cdiMesAnterior    = ref(0)
const cdiMesAnteriorRef = ref('')

// IPCA
const ipcaDataLabel     = ref('')
const ipcaMensal        = ref(0)
const ipcaMensalRef     = ref('')

// Selic
const selicDataLabel    = ref('')
const selicDiario       = ref(0)
const selicMensal       = ref(0)
const selicMensalRef    = ref('')

function fmtMesAno(dataBCB) {
  // "dd/MM/yyyy" publicado no 1º do mês seguinte → mês de referência = mês anterior
  const [, mm, yyyy] = dataBCB.split('/')
  const ref = new Date(`${yyyy}-${mm}-01`)
  ref.setMonth(ref.getMonth() - 1)
  return ref.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
}

const cdiMensalEquiv = computed(() =>
  params.value.cdi > 0
    ? ((Math.pow(1 + params.value.cdi / 100, 1 / 12) - 1) * 100).toFixed(4)
    : '—'
)
const ipcaMensalEquiv = computed(() =>
  params.value.ipca > 0
    ? ((Math.pow(1 + params.value.ipca / 100, 1 / 12) - 1) * 100).toFixed(4)
    : '—'
)
const selicMensalEquiv = computed(() =>
  params.value.selic > 0
    ? ((Math.pow(1 + params.value.selic / 100, 1 / 12) - 1) * 100).toFixed(4)
    : '—'
)

// ── Marketplace helpers ───────────────────────────────────────────────────────
const confirmadosSessao  = ref(new Set())
const bancoFiltro        = ref(null)
const verTodos           = ref(false)
const verTodosRanking    = ref(false)

const TIPOS_ISENTOS = ['LCI', 'LCA', 'CRI', 'CRA', 'DEBENTURE_INCENTIVADA']
const TIPOS_TESOURO = ['TESOURO_SELIC', 'TESOURO_PREFIXADO', 'TESOURO_IPCA']
function isentoIRTipo(tipo) { return TIPOS_ISENTOS.includes(tipo) }

const PALETA_BANCOS = [
  'bg-blue-900/50 text-blue-300 border-blue-800',
  'bg-purple-900/50 text-purple-300 border-purple-800',
  'bg-amber-900/50 text-amber-300 border-amber-800',
  'bg-orange-900/50 text-orange-300 border-orange-800',
  'bg-cyan-900/50 text-cyan-300 border-cyan-800',
  'bg-rose-900/50 text-rose-300 border-rose-800',
  'bg-indigo-900/50 text-indigo-300 border-indigo-800',
  'bg-teal-900/50 text-teal-300 border-teal-800',
]

const bancosPorQtd = computed(() => {
  const counts = {}
  todosProdutos.value.forEach(p => {
    counts[p.instituicao] = (counts[p.instituicao] || 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([banco, count]) => ({ banco, count }))
})

const _bancoCoresMap = computed(() => {
  const m = {}
  bancosPorQtd.value.forEach(({ banco }, i) => {
    m[banco] = PALETA_BANCOS[i % PALETA_BANCOS.length]
  })
  return m
})

function getBancoCor(banco) {
  return _bancoCoresMap.value[banco] || 'bg-gray-800 text-gray-400 border-gray-700'
}

const produtosVisiveis = computed(() => {
  const ordenado = [...todosProdutos.value]
    .sort((a, b) => (b.confirmacoes || 0) - (a.confirmacoes || 0))
  const filtrado = bancoFiltro.value
    ? ordenado.filter(p => p.instituicao === bancoFiltro.value)
    : ordenado
  // Quando há filtro de banco ativo ou verTodos, mostra tudo; senão, top 10
  return (bancoFiltro.value || verTodos.value) ? filtrado : filtrado.slice(0, 10)
})

function custosDoTipo(tipo) {
  if (TIPOS_ISENTOS.includes(tipo)) {
    return [
      { label: 'Isento IR',  cls: 'bg-green-900/40 text-green-400 border-green-800' },
      { label: 'Isento IOF', cls: 'bg-green-900/40 text-green-400 border-green-800' },
    ]
  }
  if (tipo === 'POUPANCA') {
    return [
      { label: 'Sem IR',  cls: 'bg-green-900/40 text-green-400 border-green-800' },
      { label: 'Sem IOF', cls: 'bg-green-900/40 text-green-400 border-green-800' },
    ]
  }
  const custos = [
    { label: 'IR 15–22,5%', cls: 'bg-red-900/40 text-red-400 border-red-800' },
    { label: 'IOF até 30d', cls: 'bg-orange-900/40 text-orange-400 border-orange-800' },
  ]
  if (TIPOS_TESOURO.includes(tipo)) {
    custos.push({ label: 'Custódia 0,20%/a', cls: 'bg-blue-900/40 text-blue-400 border-blue-800' })
  }
  return custos
}

function labelModalidadeMkt(modalidade) {
  const map = {
    pos_fixado_cdi:      'Pós-fixado CDI',
    pos_fixado_cdi_mais: 'Pós-fixado CDI+',
    pos_fixado_selic:    'Pós-fixado Selic',
    hibrido_ipca:        'IPCA+',
    ipca_mais:           'IPCA+',
    prefixado:           'Prefixado',
    poupanca:            'Poupança',
  }
  return map[modalidade] || modalidade
}

function sufixoTaxa(modalidade) {
  if (modalidade === 'hibrido_ipca' || modalidade === 'ipca_mais') return '+ IPCA a.a.'
  if (modalidade === 'prefixado') return 'a.a. fixo'
  if (modalidade === 'poupanca') return 'a.a. est.'
  if (modalidade === 'pos_fixado_cdi_mais') return '% spread a.a.'
  return '% do CDI'
}

const CRITERIOS_RESGATE = {
  liquidez_diaria:    { label: 'Liquidez diária',         cls: 'text-green-500' },
  carencia_30d:       { label: 'Carência 30 dias',        cls: 'text-yellow-500' },
  carencia_60d:       { label: 'Carência 60 dias',        cls: 'text-yellow-500' },
  carencia_90d:       { label: 'Carência 90 dias',        cls: 'text-yellow-500' },
  carencia_120d:      { label: 'Carência 120 dias',       cls: 'text-yellow-500' },
  carencia_180d:      { label: 'Carência 180 dias',       cls: 'text-yellow-500' },
  carencia_6m:        { label: 'Carência 6 meses',        cls: 'text-yellow-500' },
  carencia_12m:       { label: 'Carência 12 meses',       cls: 'text-yellow-500' },
  carencia_36m:       { label: 'Carência 36 meses',       cls: 'text-orange-400' },
  vencimento:         { label: 'Só no vencimento',        cls: 'text-gray-500' },
  mercado_secundario: { label: 'Mercado sec. (B3)',        cls: 'text-red-400' },
  mtm_diario:         { label: 'Mark-to-market diário',   cls: 'text-yellow-500' },
  tesouro_selic:      { label: 'Liquidez D+1 (T. Selic)', cls: 'text-green-500' },
}
function labelCriterio(c) {
  return CRITERIOS_RESGATE[c] || { label: c || '—', cls: 'text-gray-600' }
}

function formatarRetencao(dias) {
  if (!dias || dias <= 0) return null
  if (dias < 32) return `${dias}d`
  if (dias < 365) {
    const meses = Math.round(dias / 30.44)
    return `${meses} ${meses === 1 ? 'mês' : 'meses'}`
  }
  const anos = Math.round((dias / 365) * 2) / 2
  if (anos === 1) return '1 ano'
  return Number.isInteger(anos)
    ? `${anos} anos`
    : `${anos.toString().replace('.', ',')} anos`
}

function retencaoDias(produto) {
  const criterio = produto.criterio_resgate || 'vencimento'
  if (['liquidez_diaria', 'tesouro_selic', 'mtm_diario'].includes(criterio)) return null
  if (criterio === 'vencimento') {
    if (!produto.vencimento) return null
    return calcularDias(params.value.dataInicio, produto.vencimento)
  }
  const map = {
    carencia_30d: 30, carencia_60d: 60, carencia_90d: 90,
    carencia_120d: 120, carencia_180d: 180,
    carencia_6m: 180, carencia_12m: 365, carencia_36m: 1095,
  }
  return map[criterio] || null
}

function retencaoBadge(criterio, dias) {
  if (!criterio || ['liquidez_diaria', 'tesouro_selic', 'mtm_diario'].includes(criterio)) return null
  if (criterio === 'mercado_secundario') return 'Mercado sec.'
  const d = dias || retencaoDias({ criterio_resgate: criterio, vencimento: null })
  return d ? `Retenção ${formatarRetencao(d)}` : 'Só no vencimento'
}

function parecer(r) {
  const p       = r.produto
  const calc    = r.calc
  const aporte  = params.value.aportesMensais || 0
  const retirada = params.value.retiradaMensal || 0
  const principal = params.value.valorInvestido || 0
  const criterio = p.criterio_resgate || 'vencimento'

  const rendaLiqMensal = principal * (Math.pow(1 + calc.iLiqAnual, 1 / 12) - 1)

  const liquidezDiaria = ['liquidez_diaria', 'tesouro_selic'].includes(criterio)
  const mtmDiario      = criterio === 'mtm_diario'
  const secundario     = criterio === 'mercado_secundario'
  const comCarencia    = criterio.startsWith('carencia_')
  const soVencimento   = criterio === 'vencimento'
  const labelC         = labelCriterio(criterio).label

  const itens = []

  // ── Liquidez e retirada mensal ───────────────────────────────
  if (retirada > 0) {
    if (soVencimento) {
      itens.push({ tipo: 'danger', texto: `Incompatível com retirada mensal: este produto só permite resgate no vencimento (${p.vencimento ? formatDate(p.vencimento) : 'sem data definida'}). As retiradas de ${formatRS(retirada)}/mês não são viáveis neste instrumento.` })
    } else if (secundario) {
      itens.push({ tipo: 'warning', texto: `Liquidez via mercado secundário B3 — sujeita a deságio (haircut) conforme taxas correntes. Não recomendado como fonte de retiradas mensais regulares de ${formatRS(retirada)}.` })
    } else if (mtmDiario) {
      itens.push({ tipo: 'warning', texto: `Liquidez mark-to-market: resgate antecipado em cenário de alta de juros pode resultar em valor inferior ao investido. Avalie o risco de mercado antes de usar como fonte de retirada de ${formatRS(retirada)}/mês.` })
    } else if (comCarencia) {
      itens.push({ tipo: 'danger', texto: `Incompatível com retirada mensal: este produto possui ${labelC} sem liquidez nesse período. As retiradas de ${formatRS(retirada)}/mês não são viáveis durante a carência. Após o término, liquidez diária disponível.` })
      if (rendaLiqMensal >= retirada) {
        itens.push({ tipo: 'success', texto: `Pós-carência: rendimento líquido mensal estimado de ${formatRS(rendaLiqMensal)} cobre a retirada de ${formatRS(retirada)}, com excedente de ${formatRS(rendaLiqMensal - retirada)}/mês para reinvestimento.` })
      } else {
        const deficit = retirada - rendaLiqMensal
        const meses   = deficit > 0 ? Math.floor(principal / deficit) : '—'
        itens.push({ tipo: 'warning', texto: `Pós-carência: rendimento líquido de ${formatRS(rendaLiqMensal)}/mês não cobre a retirada de ${formatRS(retirada)} (déficit de ${formatRS(deficit)}/mês). Consumo parcial do principal em ~${meses} meses.` })
      }
    } else if (liquidezDiaria) {
      if (rendaLiqMensal >= retirada) {
        itens.push({ tipo: 'success', texto: `Liquidez diária compatível com retirada mensal. Rendimento líquido estimado de ${formatRS(rendaLiqMensal)}/mês cobre integralmente os ${formatRS(retirada)} desejados, com excedente de ${formatRS(rendaLiqMensal - retirada)}/mês para reinvestimento.` })
      } else {
        const deficit = retirada - rendaLiqMensal
        const meses   = deficit > 0 ? Math.floor(principal / deficit) : '—'
        itens.push({ tipo: 'danger', texto: `Déficit de fluxo: rendimento líquido de ${formatRS(rendaLiqMensal)}/mês não cobre a retirada de ${formatRS(retirada)}/mês (falta ${formatRS(deficit)}/mês). O principal seria consumido em ~${meses} meses sem reposição.` })
      }
    }
  } else {
    if (liquidezDiaria) {
      itens.push({ tipo: 'success', texto: `Liquidez diária — flexibilidade total para resgate sem penalidade, ideal para reserva de oportunidade ou posição tática.` })
    } else if (soVencimento) {
      itens.push({ tipo: 'info', texto: `Capital comprometido até ${p.vencimento ? formatDate(p.vencimento) : 'o vencimento'}. Adequado apenas para recursos sem previsão de uso antes dessa data.` })
    } else if (comCarencia) {
      itens.push({ tipo: 'info', texto: `${labelC} — capital com comprometimento inicial; liquidez diária disponível após o término da carência.` })
    } else if (secundario) {
      itens.push({ tipo: 'warning', texto: `Saída antecipada via mercado secundário B3 com possível deságio. Planeje o horizonte até o vencimento para evitar perdas.` })
    } else if (mtmDiario) {
      itens.push({ tipo: 'warning', texto: `Mark-to-market diário: o preço oscila conforme as taxas de juros de mercado. Resgates antecipados em cenário de alta podem resultar em perda de capital.` })
    }
  }

  // ── Aportes mensais recorrentes ──────────────────────────────
  if (aporte > 0) {
    const minimo = p.minimo_rs || 0
    if (minimo > 0 && aporte < minimo) {
      const mesesAcumulo = Math.ceil(minimo / aporte)
      itens.push({ tipo: 'warning', texto: `Aporte mensal planejado de ${formatRS(aporte)} é inferior ao mínimo por aplicação deste produto (${formatRS(minimo)}). Seria necessário acumular por ${mesesAcumulo} meses antes de cada nova aplicação.` })
    } else {
      itens.push({ tipo: 'info', texto: `Aportes mensais de ${formatRS(aporte)} exigem novas aplicações individuais — renda fixa não possui débito automático. Verifique disponibilidade e condições junto à ${p.instituicao}.` })
    }
  }

  // ── Cobertura FGC ────────────────────────────────────────────
  const LIMITE_FGC = 250000
  if (p.fgc) {
    if (principal <= LIMITE_FGC) {
      itens.push({ tipo: 'success', texto: `FGC: cobertura integral — ${formatRS(principal)} está dentro do limite de ${formatRS(LIMITE_FGC)} por CPF por instituição.` })
    } else {
      const excesso = principal - LIMITE_FGC
      itens.push({ tipo: 'danger', texto: `FGC: cobertura parcial — ${formatRS(excesso)} (${((excesso / principal) * 100).toFixed(1)}% do valor simulado) excede o limite de ${formatRS(LIMITE_FGC)} por CPF por instituição e fica sem garantia.` })
    }
  } else {
    itens.push({ tipo: 'warning', texto: `Sem cobertura do FGC. Risco de crédito da emissora (${p.instituicao}). Avalie o rating e a solidez da instituição antes de alocar.` })
  }

  // ── Vantagem fiscal (isentos de IR) ─────────────────────────
  if (calc.isentoIR) {
    const irRef  = getIRAliquota(calc.prazoEfetivoDias)
    const equiv  = calc.iLiqAnual / (1 - irRef)
    itens.push({ tipo: 'success', texto: `Isento de IR: equivale a um CDB tributado rendendo ${(equiv * 100).toFixed(2)}% a.a. bruto (base: alíquota de ${(irRef * 100).toFixed(1)}% para o prazo simulado).` })
  }

  return itens
}

function diasRestantesNum(vencimento) {
  if (!vencimento) return Infinity
  return Math.ceil((new Date(vencimento) - new Date()) / 86400000)
}

function diasAteVencimento(vencimento) {
  const dias = diasRestantesNum(vencimento)
  if (!isFinite(dias)) return ''
  if (dias < 0) return 'Vencido'
  if (dias < 30) return `${dias}d restantes`
  if (dias < 365) return `${Math.round(dias / 30)}m restantes`
  return `${(dias / 365).toFixed(1)}a restantes`
}

function produtoNaSimulacao(id) {
  return resultados.value.some(r => r.produto.id === id)
}

function adicionarNaSimulacao(produto) {
  const p = params.value
  if (!p.dataInicio || !p.dataFimDesejada || !p.valorInvestido) return
  const calc = calcularProduto(produto, {
    dataInicio: p.dataInicio,
    dataFimDesejada: p.dataFimDesejada,
    valorInvestido: p.valorInvestido,
    cdi: p.cdi, ipca: p.ipca, selic: p.selic,
  })
  if (!calc) return
  resultados.value = [...resultados.value, { produto, calc }]
    .sort((a, b) => {
      const retirada = params.value.retiradaMensal || 0
      if (retirada > 0) {
        const grp = r => {
          const c = r.produto.criterio_resgate || 'vencimento'
          if (['liquidez_diaria', 'tesouro_selic'].includes(c)) return 0
          if (['mtm_diario', 'mercado_secundario'].includes(c))  return 1
          if (c.startsWith('carencia_'))                         return 2
          return 3
        }
        const ga = grp(a), gb = grp(b)
        if (ga !== gb) return ga - gb
      }
      return b.calc.iLiqAnual - a.calc.iLiqAnual
    })
}

function confirmarProduto(produto) {
  if (confirmadosSessao.value.has(produto.id)) return
  try {
    const res = confirmarProdutoLocal(produto.id)
    produto.confirmacoes = res.confirmacoes
    confirmadosSessao.value = new Set([...confirmadosSessao.value, produto.id])
    const r = resultados.value.find(r => r.produto.id === produto.id)
    if (r) r.produto.confirmacoes = res.confirmacoes
  } catch (e) {
    console.error('Erro ao confirmar produto', e)
  }
}

async function buscarTaxasBCB() {
  taxasBCBCarregando.value = true
  taxasBCBErro.value = ''
  try {
    // 4389=CDI a.a. | 13522=IPCA 12m | 432=Selic a.a.
    // 12=CDI diário  | 4391=CDI mês ant. | 433=IPCA mensal | 11=Selic diária | 4390=Selic mês ant.
    const [cdiRes, ipcaRes, selicRes, cdiDiRes, cdiMesRes, ipcaMesRes, selicDiRes, selicMesRes] =
      await Promise.all([
        axios.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.4389/dados/ultimos/1?formato=json'),
        axios.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.13522/dados/ultimos/1?formato=json'),
        axios.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json'),
        axios.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados/ultimos/1?formato=json'),
        axios.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.4391/dados/ultimos/1?formato=json'),
        axios.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/1?formato=json'),
        axios.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json'),
        axios.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.4390/dados/ultimos/1?formato=json'),
      ])

    // Valores principais
    params.value.cdi   = parseFloat(cdiRes.data[0].valor.replace(',', '.'))
    params.value.ipca  = parseFloat(ipcaRes.data[0].valor.replace(',', '.'))
    params.value.selic = parseFloat(selicRes.data[0].valor.replace(',', '.'))

    // CDI
    cdiDiario.value         = parseFloat(cdiDiRes.data[0].valor.replace(',', '.'))
    cdiMesAnterior.value    = parseFloat(cdiMesRes.data[0].valor.replace(',', '.'))
    cdiMesAnteriorRef.value = fmtMesAno(cdiMesRes.data[0].data)
    taxasBCBData.value      = `BCB · ${cdiRes.data[0].data}`

    // IPCA
    ipcaMensal.value        = parseFloat(ipcaMesRes.data[0].valor.replace(',', '.'))
    ipcaMensalRef.value     = fmtMesAno(ipcaMesRes.data[0].data)
    ipcaDataLabel.value     = `BCB · ${ipcaRes.data[0].data}`

    // Selic
    selicDiario.value       = parseFloat(selicDiRes.data[0].valor.replace(',', '.'))
    selicMensal.value       = parseFloat(selicMesRes.data[0].valor.replace(',', '.'))
    selicMensalRef.value    = fmtMesAno(selicMesRes.data[0].data)
    selicDataLabel.value    = `BCB · ${selicRes.data[0].data}`

  } catch (e) {
    taxasBCBErro.value = 'Não foi possível buscar as taxas do BCB.'
    console.error('Erro BCB:', e)
  } finally {
    taxasBCBCarregando.value = false
  }
}

const nomeCompleto = computed(() => {
  const partes = [cliente.value.nome, cliente.value.sobrenome].filter(Boolean)
  return partes.join(' ')
})

const dataRelatorio = computed(() => new Date().toLocaleDateString('pt-BR', {
  day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
}))

const prazoSolicitado = computed(() => {
  if (!params.value.dataInicio || !params.value.dataFimDesejada) return 0
  return Math.max(0, calcularDias(params.value.dataInicio, params.value.dataFimDesejada))
})

const melhor = computed(() => resultados.value[0] || null)

const resultadosVisiveis = computed(() =>
  verTodosRanking.value ? resultados.value : resultados.value.slice(0, 10)
)

const rankingSort = ref({ campo: 'iLiqAnual', dir: 'desc' })

function toggleSort(campo) {
  if (rankingSort.value.campo === campo) {
    rankingSort.value.dir = rankingSort.value.dir === 'desc' ? 'asc' : 'desc'
  } else {
    rankingSort.value.campo = campo
    rankingSort.value.dir = 'desc'
  }
}

function sortIcon(campo) {
  if (rankingSort.value.campo !== campo) return '↓↑'
  return rankingSort.value.dir === 'desc' ? '↓' : '↑'
}

const resultadosOrdenados = computed(() => {
  const lista = [...resultadosVisiveis.value]
  const { campo, dir } = rankingSort.value
  const m = dir === 'asc' ? 1 : -1
  lista.sort((a, b) => {
    switch (campo) {
      case 'retencao':    return m * ((retencaoDias(a.produto) ?? 9999) - (retencaoDias(b.produto) ?? 9999))
      case 'taxaBruta':   return m * (a.calc.taxaBrutaAnualPct - b.calc.taxaBrutaAnualPct)
      case 'prazo':       return m * (a.calc.prazoEfetivoDias - b.calc.prazoEfetivoDias)
      case 'ir':          return m * (a.calc.alpha - b.calc.alpha)
      case 'iLiqAnual':   return m * (a.calc.iLiqAnual - b.calc.iLiqAnual)
      case 'fisco':       return m * ((a.calc.iofValor + a.calc.irValor) - (b.calc.iofValor + b.calc.irValor))
      case 'lucroLiq':    return m * (a.calc.lucroLiq - b.calc.lucroLiq)
      case 'valorFinal':  return m * (a.calc.valorFinal - b.calc.valorFinal)
      default:            return 0
    }
  })
  return lista
})

const top5Mensal = computed(() => {
  const P = params.value.valorInvestido
  const ret = params.value.retiradaMensal || 0
  return resultados.value
    .slice(0, 5)
    .map(r => {
      const mensalBruto = P * (Math.pow(1 + r.calc.taxaBrutaAnualDecimal, 1 / 12) - 1)
      const mensalLiq   = P * (Math.pow(1 + r.calc.iLiqAnual,             1 / 12) - 1)
      const saldo       = mensalLiq - ret
      return { ...r, mensalBruto, mensalLiq, saldo }
    })
    .sort((a, b) => b.mensalLiq - a.mensalLiq)
})

const melhorSaldo = computed(() => top5Mensal.value[0]?.saldo ?? 0)

const alertaVencimento = computed(() => {
  const limitados = resultados.value.filter(r => r.calc.fatorLimitante === 'PRODUTO')
  if (!limitados.length) return null
  return limitados.map(r => r.produto.nome).join(', ') + ' — calculados pelo prazo do vencimento, não pelo prazo desejado.'
})

function labelModalidade(v) {
  return MODALIDADES.find(m => m.value === v)?.label || v
}

function corIR(alpha) {
  if (alpha >= 0.225) return 'text-red-400'
  if (alpha >= 0.200) return 'text-orange-400'
  if (alpha >= 0.175) return 'text-yellow-400'
  return 'text-green-400'
}

function descFaixaIR(alpha, isento) {
  if (isento) return 'Produto isento para PF'
  if (alpha >= 0.225) return 'Prazo ≤ 180 dias'
  if (alpha >= 0.200) return 'Prazo 181–360 dias'
  if (alpha >= 0.175) return 'Prazo 361–720 dias'
  return 'Prazo > 720 dias'
}

function removerDaSessao(id) {
  resultados.value = resultados.value.filter(r => r.produto.id !== id)
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

  resultados.value = todosProdutos.value
    .map(produto => {
      const calc = calcularProduto(produto, {
        dataInicio: p.dataInicio,
        dataFimDesejada: p.dataFimDesejada,
        valorInvestido: p.valorInvestido,
        cdi: p.cdi, ipca: p.ipca, selic: p.selic,
      })
      if (!calc) return null
      return { produto, calc }
    })
    .filter(Boolean)
    .sort((a, b) => {
      const retirada = p.retiradaMensal || 0
      if (retirada > 0) {
        const grp = r => {
          const c = r.produto.criterio_resgate || 'vencimento'
          if (['liquidez_diaria', 'tesouro_selic'].includes(c)) return 0
          if (['mtm_diario', 'mercado_secundario'].includes(c))  return 1
          if (c.startsWith('carencia_'))                         return 2
          return 3 // vencimento ou sem critério
        }
        const ga = grp(a), gb = grp(b)
        if (ga !== gb) return ga - gb
      }
      return b.calc.iLiqAnual - a.calc.iLiqAnual
    })
}

function salvarParams() {
  salvandoParams.value = true
  try {
    saveParametros({
      valor_investido:    params.value.valorInvestido,
      data_inicio:        params.value.dataInicio,
      data_fim_planejada: params.value.dataFimDesejada,
      retirada_mensal:    params.value.retiradaMensal,
      aportes_mensais:    params.value.aportesMensais,
      cdi_anual:          params.value.cdi,
      ipca_anual:          params.value.ipca,
      selic_anual:         params.value.selic,
    })
  } catch (e) {
    console.error('Erro ao salvar parâmetros', e)
  } finally {
    salvandoParams.value = false
  }
}

function imprimir() { window.print() }

onMounted(() => {
  buscarTaxasBCB()
  try {
    todosProdutos.value = getProdutos()
    const saved = getParametros()
    if (saved) {
      params.value = {
        valorInvestido:  saved.valor_investido    ?? params.value.valorInvestido,
        dataInicio:      amanha,
        dataFimDesejada: umAno,
        retiradaMensal:  saved.retirada_mensal    ?? 0,
        aportesMensais:  saved.aportes_mensais    ?? 0,
        cdi:             saved.cdi_anual          ?? params.value.cdi,
        ipca:            saved.ipca_anual         ?? params.value.ipca,
        selic:           saved.selic_anual        ?? params.value.selic,
      }
    }
  } catch (e) {
    erro.value = 'Erro ao carregar dados.'
  } finally {
    carregandoProdutos.value = false
  }
  calcular()
})
</script>

<style>
@media print {
  /* ── Ocultar chrome do app ── */
  header, footer, nav { display: none !important; }
  .no-print { display: none !important; }
  .no-print-padding { padding: 0 !important; max-width: 100% !important; }

  /* ── Corpo da página ── */
  body { background: white !important; color: #111 !important; font-size: 10px !important; }
  #relatorio { color: #111; }

  /* ── Cards ── */
  #relatorio .card {
    border: 1px solid #d1d5db !important;
    background: white !important;
    break-inside: avoid;
    page-break-inside: avoid;
    padding: 10px 12px !important;
    border-radius: 8px !important;
    margin-bottom: 6px !important;
  }

  /* ── Fundos ── */
  #relatorio .bg-gray-800, #relatorio .bg-gray-900 { background: #f8f9fa !important; }
  #relatorio .bg-green-900\/10, #relatorio .bg-green-900\/20, #relatorio .bg-green-900\/30 {
    background: #f0fdf4 !important; border-color: #86efac !important;
  }
  #relatorio .bg-yellow-900\/20, #relatorio .bg-yellow-900\/30 {
    background: #fefce8 !important; border-color: #fde047 !important;
  }
  #relatorio .bg-red-900\/30 { background: #fff1f2 !important; border-color: #fca5a5 !important; }

  /* ── Cores de texto ── */
  #relatorio .text-white { color: #111 !important; }
  #relatorio .text-gray-100, #relatorio .text-gray-200, #relatorio .text-gray-300 { color: #374151 !important; }
  #relatorio .text-gray-400, #relatorio .text-gray-500, #relatorio .text-gray-600 { color: #6b7280 !important; }
  #relatorio .border-gray-800, #relatorio .border-gray-700 { border-color: #e5e7eb !important; }
  #relatorio .divide-gray-800 > * { border-color: #f3f4f6 !important; }

  /* ── Tags / badges ── */
  #relatorio .tag { background: #e5e7eb !important; color: #374151 !important; font-size: 8px !important; }
  #relatorio .badge-green  { background: #dcfce7 !important; color: #166534 !important; border-color: #86efac !important; font-size: 8px !important; }
  #relatorio .badge-yellow { background: #fef9c3 !important; color: #854d0e !important; border-color: #fde047 !important; font-size: 8px !important; }
  #relatorio .badge-red    { background: #fee2e2 !important; color: #991b1b !important; border-color: #fca5a5 !important; font-size: 8px !important; }
  #relatorio .badge-blue   { background: #dbeafe !important; color: #1e40af !important; border-color: #93c5fd !important; font-size: 8px !important; }

  /* ── Tabelas ── */
  #relatorio table { font-size: 8.5px !important; width: 100% !important; border-collapse: collapse; }
  #relatorio thead th { font-size: 7.5px !important; padding: 4px 5px !important; line-height: 1.2; }
  #relatorio tbody td { padding: 4px 5px !important; line-height: 1.3; vertical-align: middle; }
  #relatorio .min-w-\[160px\] { min-width: auto !important; }

  /* ── Tamanhos de texto compactos ── */
  #relatorio .text-3xl { font-size: 18px !important; }
  #relatorio .text-2xl { font-size: 16px !important; }
  #relatorio .text-xl  { font-size: 14px !important; }
  #relatorio .text-lg  { font-size: 13px !important; }
  #relatorio .text-base { font-size: 11px !important; }
  #relatorio .text-sm  { font-size: 9.5px !important; }
  #relatorio .text-xs  { font-size: 8.5px !important; }

  /* ── Cabeçalho do relatório ── */
  #relatorio h2.text-2xl { font-size: 20px !important; margin-bottom: 4px; }
  #relatorio h3 { font-size: 13px !important; }

  /* ── Grid: manter 4 colunas no resumo ── */
  #relatorio .grid-cols-2         { grid-template-columns: repeat(2, 1fr) !important; }
  #relatorio .lg\:grid-cols-4     { grid-template-columns: repeat(4, 1fr) !important; }
  #relatorio .sm\:grid-cols-4     { grid-template-columns: repeat(4, 1fr) !important; }
  #relatorio .lg\:grid-cols-5     { grid-template-columns: repeat(5, 1fr) !important; }
  #relatorio .sm\:grid-cols-2     { grid-template-columns: repeat(2, 1fr) !important; }

  /* ── Fluxo de cálculo: horizontal ── */
  #relatorio .flex-col { flex-direction: row !important; }

  /* ── Espaçamento reduzido ── */
  #relatorio .space-y-8 > * + * { margin-top: 12px !important; }
  #relatorio .space-y-6 > * + * { margin-top: 10px !important; }
  #relatorio .space-y-5 > * + * { margin-top: 8px !important; }
  #relatorio .space-y-4 > * + * { margin-top: 6px !important; }
  #relatorio .space-y-3 > * + * { margin-top: 4px !important; }
  #relatorio .gap-4 { gap: 6px !important; }
  #relatorio .gap-3 { gap: 5px !important; }
  #relatorio .p-4, #relatorio .p-6 { padding: 8px !important; }
  #relatorio .p-3 { padding: 6px !important; }
  #relatorio .py-4 { padding-top: 4px !important; padding-bottom: 4px !important; }
  #relatorio .py-3 { padding-top: 3px !important; padding-bottom: 3px !important; }
  #relatorio .pb-6 { padding-bottom: 12px !important; }

  /* ── Quebra de página por produto ── */
  #relatorio .space-y-4 > .card { break-inside: avoid; page-break-inside: avoid; }
  #relatorio > .space-y-8 > * { break-inside: avoid; }

  /* ── Linha separadora ── */
  #relatorio .border-b { border-bottom-color: #e5e7eb !important; }
  #relatorio .border-t { border-top-color: #e5e7eb !important; }
}
</style>
