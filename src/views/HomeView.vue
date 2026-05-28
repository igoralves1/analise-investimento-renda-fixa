<template>

<div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">

    <!-- Hero -->
    <section class="text-center space-y-4">
      <p class="text-green-400 text-sm font-semibold tracking-widest uppercase">Renda Fixa sem enganos</p>
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

    <!-- Resgate antecipado -->
    <section class="space-y-6">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">Resgate antecipado</p>
        <h2 class="section-title">O que acontece se você resgatar antes do vencimento?</h2>
        <p class="text-gray-400 text-sm">
          Cada produto tem regras específicas de liquidez. Entender essas regras evita surpresas e perdas desnecessárias.
        </p>
      </div>

      <!-- ⚠️ Alerta: 5 termos críticos -->
      <div class="rounded-2xl border border-orange-700 bg-orange-950/40 p-5 space-y-4">
        <div class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-orange-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <div>
            <p class="text-orange-300 font-bold text-base">Preste atenção nestes 6 termos — a confusão entre eles custa dinheiro</p>
            <p class="text-orange-400/80 text-sm mt-0.5">
              São palavras que os bancos usam com significados distintos e que muitas vezes aparecem juntas no mesmo produto.
              Confundi-las é o erro mais comum de investidores experientes em renda fixa.
            </p>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">

          <!-- Carência -->
          <div class="bg-gray-900/70 border border-orange-800/50 rounded-xl p-4 space-y-1.5">
            <p class="text-orange-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-orange-700 text-orange-200 text-[10px] font-bold flex items-center justify-center">1</span>
              Carência
            </p>
            <p class="text-gray-300 text-xs leading-relaxed">
              Período mínimo legal durante o qual <strong class="text-white">nenhum resgate é possível</strong> — nem parcial, nem total.
              O dinheiro está bloqueado por lei ou contrato.
            </p>
            <p class="text-orange-400 text-xs font-semibold">
              LCI/LCA: 6, 12 ou 36 meses obrigatórios.
            </p>
          </div>

          <!-- Liquidez diária -->
          <div class="bg-gray-900/70 border border-orange-800/50 rounded-xl p-4 space-y-1.5">
            <p class="text-orange-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-orange-700 text-orange-200 text-[10px] font-bold flex items-center justify-center">2</span>
              Liquidez diária
            </p>
            <p class="text-gray-300 text-xs leading-relaxed">
              Permite resgate a qualquer dia — mas <strong class="text-white">somente após o fim da carência</strong>.
              Um produto pode ter carência de 6 meses e liquidez diária depois disso.
              Durante a carência, a liquidez diária não vale nada.
            </p>
            <p class="text-orange-400 text-xs font-semibold">
              Carência vem primeiro. Liquidez diária vem depois.
            </p>
          </div>

          <!-- Validade / Vencimento -->
          <div class="bg-gray-900/70 border border-orange-800/50 rounded-xl p-4 space-y-2">
            <p class="text-orange-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-orange-700 text-orange-200 text-[10px] font-bold flex items-center justify-center">3</span>
              Validade (vencimento)
            </p>
            <p class="text-gray-300 text-xs leading-relaxed">
              A data de vencimento <strong class="text-white">define o prazo efetivo para o IR</strong>.
              Se o título vence em 5 meses, o IR é de 22,5% — mesmo que você planejasse segurar por 2 anos.
              Produtos com vencimento <strong class="text-white">abaixo de 180 dias</strong> pagam sempre a alíquota máxima de IR.
              Abaixo de 30 dias, ainda incide IOF.
            </p>
            <p class="text-orange-400 text-xs font-semibold">
              Prazo efetivo = min(data resgate, data vencimento).
            </p>
            <!-- Link com recompra e mercado secundário -->
            <div class="border-t border-orange-800/40 pt-2 space-y-1.5">
              <p class="text-orange-200 text-xs font-semibold">Qualquer retirada antes do vencimento aciona uma dessas duas situações:</p>
              <div class="flex items-start gap-2 text-xs">
                <span class="mt-0.5 w-2 h-2 rounded-full bg-green-500 shrink-0"></span>
                <p class="text-gray-400"><strong class="text-green-400">Recompra pelo banco (→ item 4):</strong> banco paga a taxa contratada pro-rata pelos dias efetivos. Sem desconto.</p>
              </div>
              <div class="flex items-start gap-2 text-xs">
                <span class="mt-0.5 w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                <p class="text-gray-400"><strong class="text-red-400">Mercado secundário (→ item 5):</strong> sem cláusula de recompra, você depende de um comprador na B3. Preço com haircut — pode perder capital.</p>
              </div>
              <p class="text-orange-500 text-[10px] font-semibold pt-0.5">Pergunte ao banco qual das duas se aplica antes de investir.</p>
            </div>
          </div>

          <!-- Recompra pelo banco -->
          <div class="bg-gray-900/70 border border-green-800/50 rounded-xl p-4 space-y-1.5">
            <p class="text-green-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-green-800 text-green-200 text-[10px] font-bold flex items-center justify-center">4</span>
              Recompra pelo banco
            </p>
            <p class="text-gray-300 text-xs leading-relaxed">
              O banco paga de volta à <strong class="text-white">taxa contratada, proporcional ao período efetivo</strong>
              (pro-rata) — e não o lucro total prometido para o prazo completo.
              Isso é o melhor cenário: sem haircut, sem risco de mercado.
            </p>
            <p class="text-green-500 text-xs font-semibold">
              Melhor cenário para resgate antecipado.
            </p>
          </div>

          <!-- Mercado secundário -->
          <div class="bg-gray-900/70 border border-red-800/50 rounded-xl p-4 space-y-1.5">
            <p class="text-red-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-red-800 text-red-200 text-[10px] font-bold flex items-center justify-center">5</span>
              Mercado secundário
            </p>
            <p class="text-gray-300 text-xs leading-relaxed">
              Quando o banco não recompra, você precisa encontrar um comprador na B3.
              O comprador exige desconto (<strong class="text-white">haircut</strong>) e o preço pode estar abaixo do valor justo.
              Pode resultar em <strong class="text-red-400">perda de capital</strong> mesmo que o produto esteja rendendo.
            </p>
            <p class="text-red-400 text-xs font-semibold">
              Pior cenário — evite produtos sem cláusula de recompra se precisar de liquidez.
            </p>
          </div>

          <!-- Resgate parcial vs total -->
          <div class="bg-gray-900/70 border border-yellow-700/50 rounded-xl p-4 space-y-2">
            <p class="text-yellow-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-yellow-800 text-yellow-200 text-[10px] font-bold flex items-center justify-center">6</span>
              Resgate parcial vs. resgate total
            </p>
            <p class="text-gray-300 text-xs leading-relaxed">
              Quando um produto <strong class="text-white">não tem liquidez diária</strong> e o banco recompra o título, ele recompra
              <strong class="text-white">o montante inteiro</strong> — não existe "só R$ 3.000 de R$ 600.000".
              Você recebe tudo de volta e perde o contrato original.
            </p>
            <div class="space-y-1.5 pt-1 border-t border-yellow-800/40">
              <div class="flex items-start gap-2 text-xs">
                <span class="mt-0.5 w-2 h-2 rounded-full bg-green-500 shrink-0"></span>
                <p class="text-gray-400"><strong class="text-green-400">Com liquidez diária:</strong> você escolhe quanto resgatar — parcial ou total, a qualquer dia.</p>
              </div>
              <div class="flex items-start gap-2 text-xs">
                <span class="mt-0.5 w-2 h-2 rounded-full bg-yellow-500 shrink-0"></span>
                <p class="text-gray-400"><strong class="text-yellow-400">Sem liquidez — com recompra:</strong> o banco paga <em>tudo</em> de volta. Você reinveste o restante em outro produto, possivelmente com taxa menor.</p>
              </div>
              <div class="flex items-start gap-2 text-xs">
                <span class="mt-0.5 w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                <p class="text-gray-400"><strong class="text-red-400">Sem liquidez — sem recompra:</strong> mercado secundário. Pode vender fração, mas ilíquido — haircut provável.</p>
              </div>
              <div class="flex items-start gap-2 text-xs">
                <span class="mt-0.5 w-2 h-2 rounded-full bg-gray-500 shrink-0"></span>
                <p class="text-gray-400"><strong class="text-gray-300">LCI/LCA após carência:</strong> em geral só resgate total pelo emissor. Resgate parcial é exceção rara.</p>
              </div>
            </div>
            <p class="text-yellow-500 text-[10px] font-semibold pt-0.5">
              Estratégia: se precisar de acesso parcial, fracione em títulos menores ou use produto com liquidez diária.
            </p>
          </div>

          <!-- Resumo: a ordem correta -->
          <div class="sm:col-span-2 lg:col-span-3 bg-orange-950/60 border border-orange-700/70 rounded-xl p-4 space-y-2 flex flex-col justify-between">
            <p class="text-orange-300 font-bold text-xs uppercase tracking-wider">A ordem que importa</p>
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-orange-800 text-orange-200 text-[10px] font-bold flex items-center justify-center shrink-0">1°</span>
                <span class="text-gray-300">Carência bloqueia tudo</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-orange-800 text-orange-200 text-[10px] font-bold flex items-center justify-center shrink-0">2°</span>
                <span class="text-gray-300">Vencimento limita o prazo efetivo (e o IR)</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-orange-800 text-orange-200 text-[10px] font-bold flex items-center justify-center shrink-0">3°</span>
                <span class="text-gray-300">Liquidez diária permite sair — com recompra pelo banco (ideal) ou mercado secundário (risco)</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-orange-800 text-orange-200 text-[10px] font-bold flex items-center justify-center shrink-0">4°</span>
                <span class="text-gray-300">Sem liquidez diária, o resgate pelo banco é sempre total — planeje antes de precisar</span>
              </div>
            </div>
            <p class="text-orange-500 text-[10px] mt-1">Verifique todos os seis antes de assinar qualquer produto.</p>
          </div>

        </div>
      </div>

      <!-- Produto vs. banco: quem define a regra? -->
      <div class="card space-y-4">
        <h3 class="font-semibold text-white">As regras dependem do produto ou do banco?</h3>
        <p class="text-gray-400 text-sm">
          Depende do tipo. Algumas regras são <strong class="text-white">impostas por lei ou regulação</strong> e valem para todos os bancos.
          Outras são <strong class="text-white">negociadas contrato a contrato</strong> — e dois CDBs do mesmo banco podem ter liquidez completamente diferente.
        </p>
        <div class="grid sm:grid-cols-2 gap-3 text-sm">
          <div class="bg-blue-950/60 border border-blue-800/50 rounded-xl p-4 space-y-2">
            <p class="text-blue-300 font-semibold text-xs uppercase tracking-wider">Definido pela regulação — igual em todos os bancos</p>
            <ul class="text-gray-400 text-xs space-y-1.5 mt-1">
              <li class="flex gap-2"><span class="text-blue-400 shrink-0">▸</span> <span><strong class="text-gray-200">LCI/LCA:</strong> carência mínima obrigatória por lei (CMN Res. 5.215/2025). Nenhum banco pode oferecê-las sem esse prazo.</span></li>
              <li class="flex gap-2"><span class="text-blue-400 shrink-0">▸</span> <span><strong class="text-gray-200">Tesouro Direto:</strong> regras do Tesouro Nacional, iguais para todas as corretoras.</span></li>
              <li class="flex gap-2"><span class="text-blue-400 shrink-0">▸</span> <span><strong class="text-gray-200">IR e IOF:</strong> calculados sempre pela tabela regressiva federal — sem exceção.</span></li>
            </ul>
          </div>
          <div class="bg-yellow-950/40 border border-yellow-800/50 rounded-xl p-4 space-y-2">
            <p class="text-yellow-300 font-semibold text-xs uppercase tracking-wider">Definido pelo contrato — varia de banco para banco</p>
            <ul class="text-gray-400 text-xs space-y-1.5 mt-1">
              <li class="flex gap-2"><span class="text-yellow-400 shrink-0">▸</span> <span><strong class="text-gray-200">CDB com liquidez diária:</strong> o banco opta por incluir cláusula de recompra. É uma escolha comercial, não uma obrigação legal.</span></li>
              <li class="flex gap-2"><span class="text-yellow-400 shrink-0">▸</span> <span><strong class="text-gray-200">CDB sem liquidez:</strong> o banco não se compromete a recomprar. Se você precisar sair antes, terá que ir ao mercado secundário — com haircut.</span></li>
              <li class="flex gap-2"><span class="text-yellow-400 shrink-0">▸</span> <span><strong class="text-gray-200">CRI/CRA/Debêntures:</strong> cada emissão define suas próprias condições de resgate antecipado no prospecto.</span></li>
            </ul>
          </div>
        </div>
        <div class="bg-orange-900/20 border border-orange-800 rounded-xl p-3 text-sm text-orange-300">
          <strong>A regra prática:</strong> dois CDBs no mesmo banco, com a mesma taxa, podem ter liquidez completamente diferente.
          Um paga de volta todo dia (liquidez diária); o outro só na data de vencimento.
          <strong class="text-orange-200">Isso precisa estar explícito no contrato</strong> — e você deve perguntar ao seu gestor antes de assinar.
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4">

        <!-- CDB com liquidez diária -->
        <div class="card space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-white">CDB com liquidez diária</h3>
            <span class="badge-green">Seguro resgatar</span>
          </div>
          <p class="text-gray-400 text-sm">
            O banco <strong class="text-white">recompra o título à taxa contratada</strong>, calculada pro-rata ao dia.
            Não há mercado secundário envolvido — é o próprio emissor que compra de volta.
          </p>
          <div class="bg-green-900/20 border border-green-800 rounded-xl p-3 space-y-1 text-sm">
            <p class="text-green-300 font-semibold">Exemplo concreto:</p>
            <p class="text-gray-400">
              Aplicou R$&nbsp;600.000 a 14,5% a.a. com liquidez diária. Após 45 dias, retira R$&nbsp;3.000.
            </p>
            <ul class="text-gray-400 text-xs space-y-0.5 mt-1 ml-3 list-disc">
              <li>Rendimento bruto: taxa contratada pro-rata pelos 45 dias</li>
              <li>IOF: zero (resgate após 30 dias)</li>
              <li>IR: 22,5% sobre o lucro (prazo ≤ 180 dias)</li>
              <li><strong class="text-green-300">Não vai para mercado secundário</strong> — sem haircut</li>
            </ul>
          </div>
          <p class="text-xs text-gray-600">A parcela retirada recebe exatamente a taxa contratada, proporcional ao prazo. O saldo restante continua rendendo normalmente.</p>
        </div>

        <!-- LCI / LCA -->
        <div class="card space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-white">LCI / LCA — carência obrigatória</h3>
            <span class="badge-yellow">Bloqueado no período</span>
          </div>
          <p class="text-gray-400 text-sm">
            A CMN Resolução 5.215/2025 estabelece <strong class="text-white">prazos mínimos obrigatórios</strong> antes
            do primeiro resgate:
          </p>
          <div class="space-y-2">
            <div class="flex items-start gap-3 bg-gray-800/60 rounded-xl p-3">
              <span class="text-yellow-400 font-bold text-sm shrink-0 w-24">6 meses</span>
              <p class="text-xs text-gray-400">LCI e LCA indexadas ao CDI ou prefixadas</p>
            </div>
            <div class="flex items-start gap-3 bg-gray-800/60 rounded-xl p-3">
              <span class="text-orange-400 font-bold text-sm shrink-0 w-24">12 meses</span>
              <p class="text-xs text-gray-400">LCA indexada ao IPCA+</p>
            </div>
            <div class="flex items-start gap-3 bg-gray-800/60 rounded-xl p-3">
              <span class="text-red-400 font-bold text-sm shrink-0 w-24">36 meses</span>
              <p class="text-xs text-gray-400">LCI indexada ao IPCA+</p>
            </div>
          </div>
          <p class="text-xs text-gray-600">Dentro da carência, o resgate é tecnicamente impossível — o título não pode ser vendido nem de volta ao emissor nem no mercado secundário.</p>
        </div>

        <!-- Tesouro Direto -->
        <div class="card space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-white">Tesouro Direto</h3>
            <span class="badge-blue">Regras próprias</span>
          </div>
          <p class="text-gray-400 text-sm">
            O Tesouro Nacional garante recompra diária — mas <strong class="text-white">ao preço de mercado</strong>,
            não à taxa contratada. Isso significa que você pode resgatar com lucro ou prejuízo dependendo
            do cenário de juros.
          </p>
          <div class="space-y-2 text-sm">
            <div class="bg-green-900/20 border border-green-800 rounded-xl p-3">
              <p class="text-green-300 font-semibold text-xs mb-1">Tesouro Selic — exceção especial</p>
              <p class="text-xs text-gray-400">
                Sem risco de mercado. Resgate sempre próximo da taxa contratada (D+1 via Pix).
                Ideal para reserva de emergência.
              </p>
            </div>
            <div class="bg-yellow-900/20 border border-yellow-800 rounded-xl p-3">
              <p class="text-yellow-300 font-semibold text-xs mb-1">Tesouro Prefixado e IPCA+ — mark-to-market</p>
              <p class="text-xs text-gray-400">
                Preço varia diariamente com as expectativas de juros. Se a Selic sobe após a compra,
                o preço de mercado cai — resgate antecipado pode ter rentabilidade negativa.
                Funcionam bem apenas se levados ao vencimento.
              </p>
            </div>
          </div>
        </div>

        <!-- Mercado secundário -->
        <div class="card space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-white">Mercado secundário (B3)</h3>
            <span class="badge-red">Risco de haircut</span>
          </div>
          <p class="text-gray-400 text-sm">
            Quando o emissor não oferece recompra (situação rara para CDB), o investidor precisa encontrar
            um comprador no mercado secundário da B3.
          </p>
          <ul class="text-gray-400 text-sm space-y-1.5">
            <li class="flex gap-2"><span class="text-red-400 shrink-0">✗</span> Preço negociado com desconto (<strong class="text-white">haircut</strong>) em relação ao valor justo</li>
            <li class="flex gap-2"><span class="text-red-400 shrink-0">✗</span> Horário restrito: seg–sex, 10h–15h</li>
            <li class="flex gap-2"><span class="text-red-400 shrink-0">✗</span> Liquidez variável — pode demorar dias para encontrar comprador</li>
            <li class="flex gap-2"><span class="text-green-400 shrink-0">✓</span> Mais comum em CRI, CRA, debêntures e LCA/LCI de longo prazo</li>
          </ul>
          <p class="text-xs text-gray-600">CDBs de grandes bancos raramente vão para mercado secundário — o próprio banco costuma recomprar.</p>
        </div>

      </div>

      <!-- Resumo em tabela -->
      <div class="card overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800">
              <th class="text-left py-2 pr-4">Critério</th>
              <th class="text-left py-2 pr-4">Produtos típicos</th>
              <th class="text-left py-2 pr-4">Taxa no resgate</th>
              <th class="text-left py-2">Risco</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800 text-xs">
            <tr class="hover:bg-gray-800/50">
              <td class="py-2.5 pr-4 text-green-400 font-semibold">Liquidez diária</td>
              <td class="py-2.5 pr-4 text-gray-400">CDB, Poupança</td>
              <td class="py-2.5 pr-4 text-gray-300">Taxa contratada (pro-rata)</td>
              <td class="py-2.5 text-green-400">Baixo</td>
            </tr>
            <tr class="hover:bg-gray-800/50">
              <td class="py-2.5 pr-4 text-green-400 font-semibold">Liquidez D+1 s/ MTM</td>
              <td class="py-2.5 pr-4 text-gray-400">Tesouro Selic</td>
              <td class="py-2.5 pr-4 text-gray-300">Taxa Selic pro-rata</td>
              <td class="py-2.5 text-green-400">Muito baixo</td>
            </tr>
            <tr class="hover:bg-gray-800/50">
              <td class="py-2.5 pr-4 text-yellow-500 font-semibold">Carência 6 meses</td>
              <td class="py-2.5 pr-4 text-gray-400">LCI/LCA CDI</td>
              <td class="py-2.5 pr-4 text-gray-300">Bloqueado até o prazo</td>
              <td class="py-2.5 text-yellow-500">Ilíquido no período</td>
            </tr>
            <tr class="hover:bg-gray-800/50">
              <td class="py-2.5 pr-4 text-yellow-500 font-semibold">Mark-to-market</td>
              <td class="py-2.5 pr-4 text-gray-400">Tesouro Prefixado / IPCA+</td>
              <td class="py-2.5 pr-4 text-gray-300">Preço de mercado (pode cair)</td>
              <td class="py-2.5 text-yellow-500">Médio</td>
            </tr>
            <tr class="hover:bg-gray-800/50">
              <td class="py-2.5 pr-4 text-red-400 font-semibold">Mercado secundário</td>
              <td class="py-2.5 pr-4 text-gray-400">CRI, CRA, debêntures</td>
              <td class="py-2.5 pr-4 text-gray-300">Preço negociado c/ haircut</td>
              <td class="py-2.5 text-red-400">Alto</td>
            </tr>
            <tr class="hover:bg-gray-800/50">
              <td class="py-2.5 pr-4 text-gray-500 font-semibold">Somente no vencimento</td>
              <td class="py-2.5 pr-4 text-gray-400">CDB sem cláusula de recompra</td>
              <td class="py-2.5 pr-4 text-gray-300">Taxa contratada (no venc.)</td>
              <td class="py-2.5 text-red-400">Ilíquido</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Perguntas para o gestor -->
      <div class="card space-y-4 border-yellow-800/60">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-yellow-900/50 flex items-center justify-center shrink-0 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-white">Exija essas respostas do seu gestor de conta antes de assinar</h3>
            <p class="text-gray-400 text-sm mt-1">
              Muitos gestores enfatizam apenas a taxa anunciada. As perguntas abaixo revelam as informações que eles raramente oferecem espontaneamente — e que fazem toda a diferença.
            </p>
          </div>
        </div>

        <div class="space-y-2.5">
          <div class="flex items-start gap-3 bg-gray-800/60 rounded-xl p-3">
            <span class="text-yellow-400 font-bold text-sm shrink-0 mt-0.5">1</span>
            <div>
              <p class="text-gray-200 text-sm font-medium">"Se eu precisar resgatar antes do vencimento, o banco recompra ou eu tenho que vender no mercado secundário?"</p>
              <p class="text-gray-500 text-xs mt-0.5">Se a resposta for mercado secundário, pergunte qual o desconto típico (haircut) e a liquidez histórica desse papel.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 bg-gray-800/60 rounded-xl p-3">
            <span class="text-yellow-400 font-bold text-sm shrink-0 mt-0.5">2</span>
            <div>
              <p class="text-gray-200 text-sm font-medium">"Em caso de recompra pelo banco, a taxa paga é a taxa contratada pro-rata ou uma taxa diferente?"</p>
              <p class="text-gray-500 text-xs mt-0.5">Alguns bancos cobram spread na recompra antecipada. Exija que isso esteja no contrato.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 bg-gray-800/60 rounded-xl p-3">
            <span class="text-yellow-400 font-bold text-sm shrink-0 mt-0.5">3</span>
            <div>
              <p class="text-gray-200 text-sm font-medium">"Qual a alíquota de IR que incide se eu resgatar em 60 dias? E em 200 dias?"</p>
              <p class="text-gray-500 text-xs mt-0.5">O IR é calculado pelo prazo efetivo do resgate, não pelo vencimento do produto. Muitos investidores descobrem isso tarde demais.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 bg-gray-800/60 rounded-xl p-3">
            <span class="text-yellow-400 font-bold text-sm shrink-0 mt-0.5">4</span>
            <div>
              <p class="text-gray-200 text-sm font-medium">"Esse produto tem cobertura do FGC? Para o valor total que estou aplicando?"</p>
              <p class="text-gray-500 text-xs mt-0.5">FGC cobre até R$&nbsp;250.000 por CPF por instituição. Valores maiores ficam descobertos. CRI, CRA e debêntures não têm FGC.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 bg-gray-800/60 rounded-xl p-3">
            <span class="text-yellow-400 font-bold text-sm shrink-0 mt-0.5">5</span>
            <div>
              <p class="text-gray-200 text-sm font-medium">"Existe algum banco concorrente oferecendo condição melhor para o mesmo perfil de produto?"</p>
              <p class="text-gray-500 text-xs mt-0.5">Use o marketplace desta ferramenta para levar dados reais à negociação. Gestores frequentemente conseguem melhorar a taxa quando confrontados com a concorrência.</p>
            </div>
          </div>
        </div>

        <p class="text-xs text-gray-600 border-t border-gray-800 pt-3">
          Essas perguntas são seu direito como investidor. Um bom gestor responde todas sem hesitação — e por escrito, no contrato ou na proposta formalizada.
        </p>
      </div>
    </section>

    <!-- Simulação real Abril 2026 -->
    <section class="space-y-6">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">Simulação com dados reais</p>
        <h2 class="section-title">R$&nbsp;600.000 em Abril de 2026 — o que você realmente embolsou?</h2>
        <p class="text-gray-400 text-sm">
          Dados reais do BCB (SGS série 4389). CDI de {{ sim.cdiAaPct.toFixed(2) }}% a.a. · Período: {{ sim.dias }} dias corridos (abril/2026) ·
          IR de {{ (sim.aliqIR * 100).toFixed(1) }}% (prazo ≤ 180 dias).
        </p>
      </div>

      <!-- Painel principal: banco anuncia vs. você recebe -->
      <div class="grid sm:grid-cols-3 gap-4">
        <div class="bg-yellow-900/20 border border-yellow-800 rounded-2xl p-5 space-y-2 text-center">
          <p class="text-yellow-500 text-xs font-semibold uppercase tracking-wider">O banco anuncia</p>
          <p class="text-4xl font-black text-yellow-400">{{ sim.cdiAaPct.toFixed(2) }}%</p>
          <p class="text-yellow-600 text-sm">a.a. bruto (100% CDI)</p>
          <div class="border-t border-yellow-800/50 pt-2 mt-2">
            <p class="text-yellow-600 text-xs">Lucro bruto em abril</p>
            <p class="text-yellow-400 font-bold">{{ fmtRS(sim.lucroBruto) }}</p>
          </div>
        </div>
        <div class="bg-red-900/20 border border-red-800 rounded-2xl p-5 space-y-2 text-center">
          <p class="text-red-400 text-xs font-semibold uppercase tracking-wider">O fisco retém</p>
          <p class="text-4xl font-black text-red-400">{{ fmtRS(sim.ir) }}</p>
          <p class="text-red-600 text-sm">IR 22,5% sobre o lucro</p>
          <div class="border-t border-red-800/50 pt-2 mt-2">
            <p class="text-red-600 text-xs">IOF (dia 30+)</p>
            <p class="text-gray-400 font-bold">R$&nbsp;0,00 ✓</p>
          </div>
        </div>
        <div class="bg-green-900/20 border border-green-700 rounded-2xl p-5 space-y-2 text-center ring-1 ring-green-800">
          <p class="text-green-400 text-xs font-semibold uppercase tracking-wider">Você realmente recebe</p>
          <p class="text-4xl font-black text-green-400">{{ sim.rLiqAaPct }}%</p>
          <p class="text-green-600 text-sm">a.a. líquido</p>
          <div class="border-t border-green-800/50 pt-2 mt-2">
            <p class="text-green-600 text-xs">Lucro líquido em abril</p>
            <p class="text-green-400 font-bold">{{ fmtRS(sim.lucroLiq) }}</p>
          </div>
        </div>
      </div>

      <!-- Fluxo completo -->
      <div class="card space-y-4">
        <h3 class="font-semibold text-white">Fluxo detalhado — R$&nbsp;600.000 aplicados em 01/abr/2026</h3>
        <div class="flex flex-col sm:flex-row items-stretch gap-2 text-sm text-center">
          <div class="flex-1 bg-gray-800 rounded-xl p-4">
            <p class="text-gray-500 text-xs mb-1">Principal</p>
            <p class="text-white font-bold text-lg">{{ fmtRS(sim.principal) }}</p>
          </div>
          <div class="flex items-center justify-center text-green-400 font-bold text-xl shrink-0">+</div>
          <div class="flex-1 bg-yellow-900/30 border border-yellow-900 rounded-xl p-4">
            <p class="text-yellow-500 text-xs mb-1">Rend. bruto ({{ sim.dias }}d)</p>
            <p class="text-yellow-400 font-bold text-lg">{{ fmtRS(sim.lucroBruto) }}</p>
            <p class="text-yellow-700 text-xs mt-0.5">{{ fmtPct(sim.rBruto, 4) }} no período</p>
          </div>
          <div class="flex items-center justify-center text-red-400 font-bold text-xl shrink-0">−</div>
          <div class="flex-1 bg-gray-800 rounded-xl p-4">
            <p class="text-gray-500 text-xs mb-1">IOF</p>
            <p class="text-green-400 font-bold text-lg">R$&nbsp;0,00</p>
            <p class="text-gray-600 text-xs mt-0.5">Isento (dia ≥ 30)</p>
          </div>
          <div class="flex items-center justify-center text-red-400 font-bold text-xl shrink-0">−</div>
          <div class="flex-1 bg-red-900/30 border border-red-900 rounded-xl p-4">
            <p class="text-red-400 text-xs mb-1">IR 22,5%</p>
            <p class="text-red-400 font-bold text-lg">{{ fmtRS(sim.ir) }}</p>
            <p class="text-red-700 text-xs mt-0.5">sobre o rendimento</p>
          </div>
          <div class="flex items-center justify-center text-green-400 font-bold text-xl shrink-0">=</div>
          <div class="flex-1 bg-green-900/30 border border-green-700 rounded-xl p-4">
            <p class="text-green-400 text-xs mb-1">Valor final</p>
            <p class="text-green-400 font-bold text-lg">{{ fmtRS(sim.valorFinal) }}</p>
            <p class="text-green-700 text-xs mt-0.5">líquido disponível</p>
          </div>
        </div>
        <p class="text-xs text-gray-600">
          Diferença entre o que o banco anuncia e o que você efetivamente embolsa em abril:
          <strong class="text-red-400">−{{ fmtRS(sim.ir) }}</strong> retidos pelo fisco.
          Equivale a {{ fmtPct(sim.ir / sim.lucroBruto, 1) }} do rendimento bruto.
        </p>
      </div>

      <!-- Cenário A: Resgate parcial com liquidez diária -->
      <div class="card space-y-5 border-green-800/40">
        <div class="flex items-center gap-2">
          <span class="badge-green">Cenário A</span>
          <h3 class="font-semibold text-white">Retirada parcial de R$&nbsp;3.000 — CDB com liquidez diária</h3>
        </div>

        <!-- Antes e depois lado a lado -->
        <div class="grid sm:grid-cols-2 gap-3">
          <div class="bg-gray-800/60 rounded-xl p-4 space-y-3">
            <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider">Sem nenhum saque — saldo no dia 30</p>
            <div class="space-y-1.5 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-400">Capital investido</span>
                <span class="text-gray-200 font-mono">{{ fmtRS(sim.principal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">+ Juros brutos</span>
                <span class="text-yellow-400 font-mono">+ {{ fmtRS(sim.lucroBruto) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">− IR 22,5%</span>
                <span class="text-red-400 font-mono">− {{ fmtRS(sim.ir) }}</span>
              </div>
              <div class="border-t border-gray-700 pt-2 flex justify-between font-bold">
                <span class="text-gray-200">= Total líquido disponível</span>
                <span class="text-green-400 font-mono">{{ fmtRS(sim.valorFinal) }}</span>
              </div>
            </div>
          </div>

          <div class="bg-green-900/10 border border-green-800/50 rounded-xl p-4 space-y-3">
            <p class="text-green-500 text-xs font-semibold uppercase tracking-wider">Após sacar R$&nbsp;3.000 — o que acontece</p>
            <div class="space-y-1.5 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-400">Total antes do saque</span>
                <span class="text-gray-200 font-mono">{{ fmtRS(sim.valorFinal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">− Retirado (capital + juros liq.)</span>
                <span class="text-yellow-400 font-mono">− {{ fmtRS(sim.cashRecebido) }}</span>
              </div>
              <div class="border-t border-gray-700 pt-2 flex justify-between font-bold">
                <span class="text-gray-200">= Fica no CDB</span>
                <span class="text-green-400 font-mono">{{ fmtRS(sim.saldoRestanteTotal) }}</span>
              </div>
            </div>
            <p class="text-gray-600 text-xs">
              Composto por: {{ fmtRS(sim.saldoRestante) }} de capital
              + {{ fmtRS(sim.jurosSaldoRestante) }} de juros líquidos acumulados.
            </p>
          </div>
        </div>

        <!-- O que você recebe detalhado -->
        <div class="space-y-2">
          <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider">Como o banco calcula o que você recebe</p>
          <div class="space-y-1.5 text-sm">
            <div class="flex items-start gap-3 bg-gray-800/40 rounded-xl px-4 py-3">
              <span class="w-5 h-5 rounded-full bg-gray-700 text-gray-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
              <div class="flex-1">
                <p class="text-gray-300">O saque de R$&nbsp;3.000 representa <strong class="text-white">{{ fmtPct(sim.prop, 2) }}</strong> do capital total.</p>
                <p class="text-gray-500 text-xs mt-0.5">R$&nbsp;3.000 ÷ R$&nbsp;600.000 = 0,50%</p>
              </div>
            </div>
            <div class="flex items-start gap-3 bg-yellow-900/10 border border-yellow-900/30 rounded-xl px-4 py-3">
              <span class="w-5 h-5 rounded-full bg-yellow-900 text-yellow-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
              <div class="flex-1">
                <p class="text-gray-300">Sobre esse 0,50% incidem <strong class="text-yellow-400">juros brutos proporcionais</strong>: {{ fmtRS(sim.lucroParcial) }}</p>
                <p class="text-gray-500 text-xs mt-0.5">{{ fmtRS(sim.lucroBruto) }} × 0,50% = {{ fmtRS(sim.lucroParcial) }} — banco recompra diretamente, sem mercado secundário</p>
              </div>
            </div>
            <div class="flex items-start gap-3 bg-red-900/10 border border-red-900/30 rounded-xl px-4 py-3">
              <span class="w-5 h-5 rounded-full bg-red-900 text-red-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
              <div class="flex-1">
                <p class="text-gray-300">IR 22,5% incide <strong class="text-white">só sobre os juros</strong>, não sobre o capital de R$&nbsp;3.000.</p>
                <p class="text-gray-500 text-xs mt-0.5">{{ fmtRS(sim.lucroParcial) }} × 22,5% = <strong class="text-red-400">{{ fmtRS(sim.irParcial) }}</strong> retidos · IOF = R$&nbsp;0 (dia 30+)</p>
              </div>
            </div>
            <div class="flex items-start gap-3 bg-green-900/20 border border-green-700 rounded-xl px-4 py-3">
              <span class="w-5 h-5 rounded-full bg-green-800 text-green-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
              <div class="flex-1">
                <p class="text-gray-200 font-semibold">Você recebe na conta corrente</p>
                <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1 mt-1">
                  <p class="text-green-400 font-black text-2xl">{{ fmtRS(sim.cashRecebido) }}</p>
                  <p class="text-gray-500 text-xs">= R$&nbsp;3.000 capital + {{ fmtRS(sim.jurosParcialLiq) }} juros líquidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Confirmação do saldo restante -->
        <div class="bg-blue-950/40 border border-blue-800/50 rounded-xl p-4 space-y-3 text-sm">
          <p class="text-blue-300 font-semibold text-xs uppercase tracking-wider">Verificação — sua riqueza total não muda</p>
          <div class="grid sm:grid-cols-3 gap-3 text-center text-xs">
            <div class="bg-gray-800/60 rounded-xl p-3">
              <p class="text-gray-500 mb-1">Recebido agora</p>
              <p class="text-green-400 font-bold">{{ fmtRS(sim.cashRecebido) }}</p>
            </div>
            <div class="bg-gray-800/60 rounded-xl p-3">
              <p class="text-gray-500 mb-1">Permanece no CDB</p>
              <p class="text-green-400 font-bold">{{ fmtRS(sim.saldoRestanteTotal) }}</p>
              <p class="text-gray-600" style="font-size:10px">{{ fmtRS(sim.saldoRestante) }} capital + {{ fmtRS(sim.jurosSaldoRestante) }} juros</p>
            </div>
            <div class="bg-green-900/30 border border-green-800 rounded-xl p-3">
              <p class="text-gray-500 mb-1">Total (= sem saque)</p>
              <p class="text-green-400 font-bold">{{ fmtRS(sim.cashRecebido + sim.saldoRestanteTotal) }}</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <p class="flex items-center gap-1.5 text-green-400"><span>✓</span> Sem haircut — banco paga a taxa contratada</p>
            <p class="flex items-center gap-1.5 text-green-400"><span>✓</span> Sem mercado secundário — sem risco de desconto</p>
            <p class="flex items-center gap-1.5 text-green-400"><span>✓</span> Crédito D+0</p>
          </div>
        </div>
      </div>

      <!-- Cenário B: Mercado secundário -->
      <div class="card space-y-4 border-red-800/40">
        <div class="flex items-center gap-2">
          <span class="badge-red">Cenário B</span>
          <h3 class="font-semibold text-white">Resgate total — CDB sem recompra → Mercado secundário (B3)</h3>
        </div>
        <p class="text-gray-400 text-sm">
          Mesmo produto, mas sem cláusula de recompra. Para sair em 30 dias, você precisa encontrar um comprador na B3.
          O comprador exige um desconto (haircut) sobre o valor acumulado de <strong class="text-white">{{ fmtRS(sim.dirtyPrice) }}</strong>
          (principal + juros brutos). Veja o impacto de cada cenário:
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-700 text-gray-500 text-xs uppercase tracking-wider">
                <th class="text-left pb-3 pr-4">Haircut</th>
                <th class="text-right pb-3 pr-4">Preço de venda</th>
                <th class="text-right pb-3 pr-4">Lucro / Perda</th>
                <th class="text-right pb-3 pr-4">IR pago</th>
                <th class="text-right pb-3 pr-4">Líquido recebido</th>
                <th class="text-right pb-3">vs. Liquidez diária</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-800">
              <tr
                v-for="c in sim.cenarios" :key="c.hPct"
                class="hover:bg-gray-800/40 transition-colors"
                :class="c.hPct === 0 ? 'bg-green-900/5' : c.perdaPrincipal ? 'bg-red-900/5' : ''"
              >
                <td class="py-3 pr-4">
                  <span
                    class="font-bold text-sm"
                    :class="c.hPct === 0 ? 'text-green-400' : c.hPct <= 1 ? 'text-yellow-400' : 'text-red-400'"
                  >{{ c.hPct.toFixed(1) }}%</span>
                  <span v-if="c.hPct === 0" class="text-xs text-gray-500 ml-1">(referência)</span>
                  <span v-if="c.perdaPrincipal" class="text-xs text-red-500 ml-1">perde principal</span>
                </td>
                <td class="py-3 pr-4 text-right font-mono text-gray-300">{{ fmtRS(c.precoVenda) }}</td>
                <td class="py-3 pr-4 text-right font-semibold" :class="c.profitPerda >= 0 ? 'text-yellow-400' : 'text-red-400'">
                  {{ c.profitPerda >= 0 ? '+' : '' }}{{ fmtRS(c.profitPerda) }}
                </td>
                <td class="py-3 pr-4 text-right" :class="c.irMs > 0 ? 'text-red-400' : 'text-gray-600'">
                  {{ c.irMs > 0 ? fmtRS(c.irMs) : '—' }}
                </td>
                <td class="py-3 pr-4 text-right font-bold" :class="c.hPct === 0 ? 'text-green-400' : c.perdaPrincipal ? 'text-red-400' : 'text-gray-200'">
                  {{ fmtRS(c.netRecebido) }}
                </td>
                <td class="py-3 text-right font-semibold" :class="c.diffCDB < 0 ? 'text-red-400' : 'text-green-400'">
                  {{ c.diffCDB < 0 ? '' : '+' }}{{ fmtRS(c.diffCDB) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-red-900/20 border border-red-800 rounded-xl p-3 text-sm text-red-300 space-y-1">
          <p>
            <strong>Ponto de ruptura:</strong> com apenas <strong class="text-white">1,12% de haircut</strong>, o valor líquido recebido
            já fica abaixo do principal de R$&nbsp;600.000. Você perde dinheiro mesmo tendo deixado aplicado por 30 dias a 14,65% a.a.
          </p>
          <p class="text-red-400 text-xs">
            Um CDB com liquidez diária evitaria toda essa perda — a diferença entre ter ou não a cláusula de recompra equivale a
            <strong class="text-white">{{ fmtRS(Math.abs(sim.cenarios[3].diffCDB)) }}</strong> com 1,5% de haircut,
            ou <strong class="text-white">{{ fmtRS(Math.abs(sim.cenarios[5].diffCDB)) }}</strong> com 3% de haircut.
          </p>
        </div>
      </div>

      <!-- Cenário C: Saque total com liquidez diária -->
      <div class="card space-y-3 border-blue-800/40">
        <div class="flex items-center gap-2">
          <span class="badge-blue">Cenário C</span>
          <h3 class="font-semibold text-white">Resgate total — CDB com liquidez diária após 30 dias</h3>
        </div>
        <div class="grid sm:grid-cols-3 gap-3 text-sm text-center">
          <div class="bg-gray-800/60 rounded-xl p-3">
            <p class="text-gray-500 text-xs mb-1">Principal de volta</p>
            <p class="text-white font-bold text-lg">{{ fmtRS(sim.principal) }}</p>
          </div>
          <div class="bg-green-900/30 border border-green-800 rounded-xl p-3">
            <p class="text-green-500 text-xs mb-1">Lucro líquido</p>
            <p class="text-green-400 font-bold text-lg">{{ fmtRS(sim.lucroLiq) }}</p>
            <p class="text-green-700 text-xs mt-0.5">já descontado IR 22,5%</p>
          </div>
          <div class="bg-green-900/30 border border-green-700 rounded-xl p-3 ring-1 ring-green-700">
            <p class="text-green-400 text-xs mb-1">Total disponível</p>
            <p class="text-green-400 font-black text-2xl">{{ fmtRS(sim.valorFinal) }}</p>
            <p class="text-green-700 text-xs mt-0.5">crédito na conta D+0</p>
          </div>
        </div>
        <p class="text-xs text-gray-600">Sem haircut, sem mercado secundário, sem espera. O banco credita o valor no mesmo dia.</p>
      </div>

      <!-- Cenário D: Sem liquidez diária — resgate forçado total -->
      <div class="card space-y-5 border-yellow-800/40">
        <div class="flex items-center gap-2">
          <span class="badge-yellow">Cenário D</span>
          <h3 class="font-semibold text-white">Você precisa de R$&nbsp;3.000 — mas o produto não tem liquidez diária</h3>
        </div>

        <div class="bg-yellow-950/40 border border-yellow-800/50 rounded-xl p-4 text-sm text-gray-300 space-y-1">
          <p><strong class="text-yellow-300">Setup:</strong> mesmos R$&nbsp;{{ fmtRS(sim.principal) }}, CDI {{ sim.cdiAaPct.toFixed(2) }}% a.a., {{ sim.dias }} dias.</p>
          <p>Produto: CDB com vencimento em 12 meses, <strong class="text-white">sem cláusula de liquidez diária</strong>, com cláusula de recompra pelo banco.</p>
          <p>Situação: após 30 dias, o investidor precisa de <strong class="text-white">R$&nbsp;3.000</strong> com urgência.</p>
        </div>

        <!-- Problema central -->
        <div class="bg-red-950/30 border border-red-800/40 rounded-xl p-4 space-y-2">
          <p class="text-red-300 font-semibold text-sm">O problema: o banco não vende fração de título</p>
          <p class="text-gray-400 text-xs leading-relaxed">
            Em CDBs sem liquidez diária, quando o banco aceita recomprar o título antes do vencimento,
            ele recompra <strong class="text-white">o montante total</strong>.
            Não existe pedido de R$&nbsp;3.000 — você recebe
            <strong class="text-yellow-300">{{ fmtRS(sim.valorFinal) }}</strong> de volta e perde o contrato original.
            O rendimento dos próximos 11 meses ao contrato foi cancelado.
          </p>
        </div>

        <!-- Três saídas possíveis -->
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">As três saídas possíveis — e o custo de cada uma</p>
        <div class="grid sm:grid-cols-3 gap-3 text-xs">

          <!-- Saída 1: Esperar -->
          <div class="bg-gray-800/50 border border-gray-700 rounded-xl p-4 space-y-2">
            <p class="text-gray-300 font-semibold flex items-center gap-1.5">
              <span class="w-5 h-5 rounded-full bg-gray-700 text-gray-300 text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
              Esperar até o vencimento
            </p>
            <p class="text-gray-400 leading-relaxed">Mantém o contrato e recebe a taxa cheia no vencimento. Mas os R$&nbsp;3.000 precisarão vir de <strong class="text-white">outra fonte</strong> — cheque especial, cartão ou outro investimento.</p>
            <div class="border-t border-gray-700 pt-2 space-y-1">
              <p class="text-green-400 font-semibold">✓ Preserva o rendimento contratado</p>
              <p class="text-red-400 font-semibold">✗ Zero flexibilidade de caixa</p>
            </div>
          </div>

          <!-- Saída 2: Resgate total -->
          <div class="bg-yellow-950/40 border border-yellow-700/60 rounded-xl p-4 space-y-2">
            <p class="text-yellow-300 font-semibold flex items-center gap-1.5">
              <span class="w-5 h-5 rounded-full bg-yellow-800 text-yellow-200 text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
              Resgate total (banco recompra)
            </p>
            <p class="text-gray-400 leading-relaxed">Banco paga <strong class="text-white">{{ fmtRS(sim.valorFinal) }}</strong> (principal + juros pro-rata 30 dias, descontado IR 22,5%). Você queria R$&nbsp;3.000, recebe muito mais — mas perde o contrato.</p>
            <div class="border-t border-yellow-800/40 pt-2">
              <div class="flex justify-between text-gray-400 py-0.5"><span>Você recebe</span><span class="text-white font-semibold">{{ fmtRS(sim.valorFinal) }}</span></div>
              <div class="flex justify-between text-gray-400 py-0.5"><span>Precisava de</span><span class="text-white">R$&nbsp;3.000,00</span></div>
              <div class="flex justify-between text-gray-400 py-0.5 border-t border-yellow-800/30 mt-1"><span>Reinveste</span><span class="text-yellow-300">{{ fmtRS(sim.valorFinal - 3000) }}</span></div>
              <p class="text-yellow-500 text-[10px] mt-1.5">Risco: o novo produto pode ter taxa menor. Você perdeu 11 meses de rendimento contratado.</p>
            </div>
            <div class="border-t border-yellow-800/40 pt-2 space-y-1">
              <p class="text-green-400 font-semibold">✓ Acessa o dinheiro imediatamente</p>
              <p class="text-red-400 font-semibold">✗ Perde o contrato; risco de taxa menor</p>
            </div>
          </div>

          <!-- Saída 3: Mercado secundário -->
          <div class="bg-red-950/30 border border-red-800/50 rounded-xl p-4 space-y-2">
            <p class="text-red-300 font-semibold flex items-center gap-1.5">
              <span class="w-5 h-5 rounded-full bg-red-800 text-red-200 text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
              Mercado secundário (B3)
            </p>
            <p class="text-gray-400 leading-relaxed">Tecnicamente, você pode vender <em>parte</em> do título na B3 se houver comprador. Na prática: ilíquido, haircut imprevisível, restrito ao horário 10h–15h dias úteis.</p>
            <div class="border-t border-red-800/40 pt-2 space-y-1">
              <p class="text-yellow-400 font-semibold">~ Possível resgate parcial</p>
              <p class="text-red-400 font-semibold">✗ Haircut, iliquidez, risco de perda</p>
            </div>
          </div>

        </div>

        <!-- Conclusão / lição -->
        <div class="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-4 space-y-1.5">
          <p class="text-yellow-300 font-semibold text-sm">Lição do Cenário D</p>
          <p class="text-gray-300 text-xs leading-relaxed">
            Se você aplica <strong class="text-white">{{ fmtRS(sim.principal) }}</strong> em um CDB sem liquidez diária e depois de 30 dias precisa de apenas R$&nbsp;3.000,
            a realidade é: <strong class="text-white">você tem R$&nbsp;{{ fmtRS(sim.valorFinal) }} bloqueados</strong> ou precisa sair tudo.
            A solução para quem pode precisar de caixa parcial é simples:
          </p>
          <ul class="text-gray-400 text-xs space-y-1 pt-1">
            <li class="flex gap-2"><span class="text-yellow-400 shrink-0">▸</span><span>Divida o investimento em <strong class="text-white">títulos menores</strong> (ex.: 6 × R$&nbsp;100.000) — você resgata apenas o necessário.</span></li>
            <li class="flex gap-2"><span class="text-yellow-400 shrink-0">▸</span><span>Use <strong class="text-white">produto com liquidez diária</strong> para a reserva de caixa e produtos de vencimento fixo para o restante.</span></li>
            <li class="flex gap-2"><span class="text-yellow-400 shrink-0">▸</span><span>Mantenha uma <strong class="text-white">reserva de emergência separada</strong> antes de imobilizar capital em vencimentos longos.</span></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="text-center space-y-4 pb-4">
      <h2 class="text-2xl font-bold text-white">Pronto para calcular sem enganos?</h2>
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

// ── Simulação real — Abril 2026 ──────────────────────────────────────────────
function fmtRS(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function fmtPct(v, casas = 2) {
  return (v * 100).toFixed(casas).replace('.', ',') + '%'
}

const sim = (() => {
  const principal = 600_000
  const cdiAa     = 14.65 / 100   // BCB SGS 4389 — última leitura disponível
  const dias       = 30            // Abril 2026: 30 dias corridos
  const aliqIR     = 0.225         // prazo ≤ 180 dias → 22,5%

  const rBruto     = Math.pow(1 + cdiAa, dias / 365) - 1
  const lucroBruto = principal * rBruto
  const iof        = 0              // dia 30 → isento
  const ir         = lucroBruto * aliqIR
  const lucroLiq   = lucroBruto - ir
  const valorFinal = principal + lucroLiq
  const rLiqAaPct  = (cdiAa * (1 - aliqIR) * 100).toFixed(2)

  // Retirada parcial de R$3.000 (CDB com liquidez diária)
  const retParcial        = 3_000
  const prop              = retParcial / principal
  const lucroParcial      = lucroBruto * prop
  const irParcial         = lucroParcial * aliqIR
  const jurosParcialLiq   = lucroParcial - irParcial
  const cashRecebido      = retParcial + jurosParcialLiq
  const saldoRestante     = principal - retParcial                // capital restante (R$597k)
  const saldoRestanteTotal = valorFinal - cashRecebido            // total restante no CDB
  const jurosSaldoRestante = saldoRestanteTotal - saldoRestante   // juros líq. sobre capital restante

  // Mercado secundário — dirty price + cenários de haircut
  const dirtyPrice = principal + lucroBruto
  const cenarios   = [0, 0.5, 1, 1.5, 2, 3, 5].map(hPct => {
    const h             = hPct / 100
    const precoVenda    = dirtyPrice * (1 - h)
    const profitPerda   = precoVenda - principal
    const irMs          = profitPerda > 0 ? profitPerda * aliqIR : 0
    const netRecebido   = precoVenda - irMs
    const diffCDB       = netRecebido - valorFinal
    const perdaPrincipal = netRecebido < principal
    return { hPct, precoVenda, profitPerda, irMs, netRecebido, diffCDB, perdaPrincipal }
  })

  return {
    principal, cdiAaPct: cdiAa * 100, dias, rBruto, lucroBruto, iof, aliqIR, ir, lucroLiq,
    valorFinal, rLiqAaPct,
    retParcial, prop, lucroParcial, irParcial, jurosParcialLiq, cashRecebido,
    saldoRestante, saldoRestanteTotal, jurosSaldoRestante,
    dirtyPrice, cenarios,
  }
})()

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
