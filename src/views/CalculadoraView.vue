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
              @click="bancoFiltro = bancoFiltro === b.banco ? null : b.banco"
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
          <p v-if="bancoFiltro" class="text-xs text-gray-600 mt-2">
            Exibindo {{ produtosVisiveis.length }} produto(s) de <strong class="text-gray-400">{{ bancoFiltro }}</strong>.
            <button @click="bancoFiltro = null" class="text-green-500 hover:text-green-400 ml-1">Limpar filtro ↺</button>
          </p>
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
        <div class="flex items-center gap-3">
          <div>
            <h3 class="font-bold text-white text-lg">Top 5 — Rendimentos Mensais</h3>
            <p class="text-gray-400 text-sm">
              Estimativa do rendimento mensal bruto e líquido para cada produto,
              ordenada do maior para o menor ganho líquido.
            </p>
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
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-700">
                <th class="text-left pb-3 pr-3 text-gray-500 text-xs uppercase tracking-wider">#</th>
                <th class="text-left pb-3 pr-3 text-gray-500 text-xs uppercase tracking-wider">Produto</th>
                <th class="text-right pb-3 pr-3 text-xs uppercase tracking-wider">
                  <span class="text-yellow-500">Banco anuncia<br><span class="text-gray-600 normal-case font-normal">bruto a.a.</span></span>
                </th>
                <th class="text-right pb-3 pr-3 text-xs uppercase tracking-wider">
                  <span class="text-yellow-500">Rend. bruto<br><span class="text-gray-600 normal-case font-normal">por mês</span></span>
                </th>
                <th class="text-right pb-3 pr-3 text-xs uppercase tracking-wider">
                  <span class="text-red-500">IR<br><span class="text-gray-600 normal-case font-normal">aplicado</span></span>
                </th>
                <th class="text-right pb-3 pr-3 text-xs uppercase tracking-wider">
                  <span class="text-green-400">Você recebe<br><span class="text-gray-600 normal-case font-normal">líquido a.a.</span></span>
                </th>
                <th class="text-right pb-3 pr-3 text-xs uppercase tracking-wider">
                  <span class="text-green-400">Rend. líq.<br><span class="text-gray-600 normal-case font-normal">por mês</span></span>
                </th>
                <th v-if="params.retiradaMensal > 0" class="text-right pb-3 pr-3 text-xs uppercase tracking-wider text-gray-500">
                  Retirada<br><span class="normal-case font-normal">desejada</span>
                </th>
                <th v-if="params.retiradaMensal > 0" class="text-right pb-3 text-xs uppercase tracking-wider text-gray-500">
                  Saldo<br><span class="normal-case font-normal">após retirada</span>
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
                    <span v-if="r.calc.isentoIR" class="badge-green">Isento IR</span>
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
      </div>

      <!-- Aviso vencimento limitante -->
      <div v-if="alertaVencimento" class="bg-yellow-900/20 border border-yellow-800 rounded-xl p-4 text-sm text-yellow-300">
        <strong>Atenção ao prazo efetivo:</strong> {{ alertaVencimento }}
      </div>

      <!-- ── Ranking completo ── -->
      <div class="card overflow-x-auto space-y-0">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-white">Ranking completo — Banco anuncia × Você recebe</h3>
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
                <th class="text-left pb-3 pr-3 text-gray-500 text-xs uppercase tracking-wider">#</th>
                <th class="text-left pb-3 pr-3 text-gray-500 text-xs uppercase tracking-wider">Produto</th>
                <th class="text-right pb-3 pr-3 text-xs uppercase tracking-wider"><span class="text-yellow-500">Banco anuncia</span></th>
                <th class="text-right pb-3 pr-3 text-gray-500 text-xs uppercase tracking-wider">Prazo ef.</th>
                <th class="text-right pb-3 pr-3 text-xs uppercase tracking-wider"><span class="text-red-500">IR</span></th>
                <th class="text-right pb-3 pr-3 text-xs uppercase tracking-wider"><span class="text-green-400">Você recebe</span></th>
                <th class="text-right pb-3 pr-3 text-gray-500 text-xs uppercase tracking-wider">Desconto fisco</th>
                <th class="text-right pb-3 pr-3 text-gray-500 text-xs uppercase tracking-wider">Lucro líq.</th>
                <th class="text-right pb-3 text-gray-500 text-xs uppercase tracking-wider">Valor final</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-800">
              <tr
                v-for="(r, i) in resultados" :key="r.produto.id"
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
                      <span v-if="r.calc.isentoIR" class="badge-green">Isento IR</span>
                      <span v-if="r.calc.iofAliq > 0" class="badge-red">IOF {{ (r.calc.iofAliq*100).toFixed(0) }}%</span>
                      <span v-if="r.calc.fatorLimitante === 'PRODUTO'" class="badge-yellow">Vence antes</span>
                    </div>
                  </div>
                </td>
                <td class="py-4 pr-3 text-right">
                  <p class="text-yellow-400 font-bold">{{ r.calc.taxaBrutaAnualPct.toFixed(2) }}% a.a.</p>
                  <p class="text-xs text-gray-600">bruto anunciado</p>
                </td>
                <td class="py-4 pr-3 text-right">
                  <p class="text-gray-300">{{ r.calc.prazoEfetivoDias }}d</p>
                  <p class="text-xs text-gray-600">{{ formatDate(r.calc.dataEfetiva) }}</p>
                </td>
                <td class="py-4 pr-3 text-right">
                  <p v-if="r.calc.isentoIR" class="text-green-400 font-semibold">Isento</p>
                  <p v-else class="font-bold" :class="corIR(r.calc.alpha)">{{ (r.calc.alpha * 100).toFixed(1) }}%</p>
                  <p v-if="!r.calc.isentoIR" class="text-xs text-red-500">{{ formatRS(r.calc.irValor) }}</p>
                </td>
                <td class="py-4 pr-3 text-right">
                  <p class="font-black text-lg" :class="i === 0 ? 'text-green-400' : 'text-gray-200'">
                    {{ r.calc.iLiqAnualPct.toFixed(2) }}% a.a.
                  </p>
                  <p class="text-xs text-gray-500">líquido real</p>
                </td>
                <td class="py-4 pr-3 text-right">
                  <p v-if="r.calc.isentoIR && r.calc.iofAliq === 0" class="text-green-400 text-sm font-semibold">R$ 0,00</p>
                  <p v-else class="text-red-400 text-sm font-semibold">{{ formatRS(r.calc.iofValor + r.calc.irValor) }}</p>
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
            v-for="(r, i) in resultados" :key="r.produto.id"
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

          <p v-if="r.produto.notas" class="text-xs text-gray-600 border-t border-gray-800 pt-3">
            📎 {{ r.produto.notas }}
          </p>
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

useMathJax()

const amanha = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
const umAno  = new Date(Date.now() + 366 * 86400000).toISOString().slice(0, 10)

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
const confirmadosSessao = ref(new Set())
const bancoFiltro       = ref(null)

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

const produtosVisiveis = computed(() =>
  bancoFiltro.value
    ? todosProdutos.value.filter(p => p.instituicao === bancoFiltro.value)
    : todosProdutos.value
)

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
    pos_fixado_cdi:  'Pós-fixado CDI',
    pos_fixado_selic:'Pós-fixado Selic',
    ipca_mais:       'IPCA+',
    prefixado:       'Prefixado',
    poupanca:        'Poupança',
  }
  return map[modalidade] || modalidade
}

function sufixoTaxa(modalidade) {
  if (modalidade === 'ipca_mais') return '+ IPCA a.a.'
  if (modalidade === 'prefixado') return 'a.a. fixo'
  if (modalidade === 'poupanca') return 'a.a. est.'
  return '% do CDI'
}

const CRITERIOS_RESGATE = {
  liquidez_diaria:    { label: 'Liquidez diária',         cls: 'text-green-500' },
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
    .sort((a, b) => b.calc.iLiqAnual - a.calc.iLiqAnual)
}

async function confirmarProduto(produto) {
  if (confirmadosSessao.value.has(produto.id)) return
  try {
    const res = await axios.post(`/api/produtos/${produto.id}/confirmar`)
    produto.confirmacoes = res.data.confirmacoes
    confirmadosSessao.value = new Set([...confirmadosSessao.value, produto.id])
    // Atualiza também no resultados se estiver lá
    const r = resultados.value.find(r => r.produto.id === produto.id)
    if (r) r.produto.confirmacoes = res.data.confirmacoes
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
    .sort((a, b) => b.calc.iLiqAnual - a.calc.iLiqAnual)
}

async function salvarParams() {
  salvandoParams.value = true
  try {
    await axios.post('/api/parametros', {
      valor_investido:   params.value.valorInvestido,
      data_inicio:       params.value.dataInicio,
      data_fim_planejada:params.value.dataFimDesejada,
      retirada_mensal:   params.value.retiradaMensal,
      aportes_mensais:   params.value.aportesMensais,
      cdi_anual:         params.value.cdi,
      ipca_anual:        params.value.ipca,
      selic_anual:       params.value.selic,
    })
  } catch (e) {
    console.error('Erro ao salvar parâmetros', e)
  } finally {
    salvandoParams.value = false
  }
}

function imprimir() { window.print() }

onMounted(async () => {
  // Busca taxas do BCB em paralelo com os dados locais
  buscarTaxasBCB()

  try {
    const [pRes, paramRes] = await Promise.all([
      axios.get('/api/produtos'),
      axios.get('/api/parametros'),
    ])
    todosProdutos.value = pRes.data
    const saved = paramRes.data
    if (saved) {
      params.value = {
        valorInvestido:  saved.valor_investido    ?? params.value.valorInvestido,
        dataInicio:      saved.data_inicio         ?? params.value.dataInicio,
        dataFimDesejada: saved.data_fim_planejada  ?? params.value.dataFimDesejada,
        retiradaMensal:  saved.retirada_mensal     ?? 0,
        aportesMensais:  saved.aportes_mensais     ?? 0,
        cdi:             saved.cdi_anual            ?? params.value.cdi,
        ipca:            saved.ipca_anual           ?? params.value.ipca,
        selic:           saved.selic_anual          ?? params.value.selic,
      }
    }
  } catch (e) {
    erro.value = 'Erro ao carregar dados. Certifique-se de que o servidor está rodando (npm run dev).'
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
