<template>

<div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">

    <!-- Hero -->
    <section class="space-y-8">
      <div class="text-center space-y-5">
        <div class="inline-flex items-center gap-2 bg-green-900/30 border border-green-800/50 rounded-full px-4 py-1.5 text-xs text-green-400 font-semibold tracking-wider uppercase">
          O MarketPlace da Renda Fixa
        </div>
        <h1 class="text-4xl sm:text-5xl font-black text-white leading-tight">
          Você chega com o seu dinheiro.<br>
          Os bancos competem pelas suas condições.<br>
          <span class="text-green-400">Você é o chefe.</span>
        </h1>
        <p class="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Mas para barganhar, você precisa de informação — e os bancos fazem de tudo para que você não a tenha.
        </p>
        <p class="text-gray-500 text-base max-w-3xl mx-auto leading-relaxed">
          Taxa bruta, taxa líquida, carência, liquidez diária, mercado secundário, vencimento, IOF, IR regressivo,
          resgate antecipado com haircut, rentabilidade mark-to-market...
          Cada um desses conceitos pode ser a diferença entre um bom investimento e uma cilada.
          E não é coincidência que os bancos não expliquem nenhum deles com clareza —
          <strong class="text-white">quanto mais confuso, menos você questiona. Quanto menos você questiona, mais o banco lucra.</strong>
        </p>
        <p class="text-gray-500 text-base max-w-3xl mx-auto leading-relaxed">
          Para completar: eles não publicam os produtos nem as taxas na internet. Deliberadamente.
          Sem comparação pública, não há concorrência. Sem concorrência, não há pressão para oferecer condições melhores.
        </p>
        <div class="bg-green-950/50 border border-green-800/60 rounded-2xl p-5 max-w-2xl mx-auto text-left space-y-2">
          <p class="text-green-300 font-bold text-lg">O Renda Fixa MarketPlace muda isso.</p>
          <p class="text-gray-400 text-sm leading-relaxed">
            Uma comunidade de investidores que compartilha as condições reais oferecidas pelos bancos — com taxa líquida calculada,
            prazo, liquidez, carência e tudo que o gerente esqueceu de mencionar.
            Você compara, simula, e chega à negociação sabendo exatamente o que o mercado oferece.
          </p>
          <p class="text-green-500 text-sm font-semibold italic">Informação que os bancos retêm. Comunidade que devolve.</p>
        </div>
        <div class="flex flex-wrap gap-3 justify-center pt-2">
          <RouterLink to="/calculadora" class="btn-primary text-base px-6 py-3">Simular investimentos →</RouterLink>
          <RouterLink to="/calculadora" class="btn-secondary text-base px-6 py-3">Ver o marketplace →</RouterLink>
        </div>
      </div>
    </section>

    <!-- Seção 1: O Primeiro Engano -->
    <section class="space-y-6">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">O primeiro engano</p>
        <h2 class="section-title">A taxa anunciada não é a taxa que você recebe</h2>
        <p class="text-gray-400 leading-relaxed">
          Bancos e corretoras anunciam sempre a <strong class="text-white">taxa bruta anual</strong> — antes do Imposto de Renda.
          O que não te contam é que o IR sobre renda fixa é <strong class="text-white">regressivo e depende do prazo</strong>:
          quanto menos tempo o dinheiro fica aplicado, maior o imposto pago.
          Dois produtos com a mesma taxa anunciada podem ter rentabilidades líquidas completamente diferentes.
          O banco sabe disso. Conta com isso.
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

    <!-- Seção 2: O Segundo Engano -->
    <section class="space-y-6">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">O segundo engano</p>
        <h2 class="section-title">Dezenas de produtos. Uma única intenção.</h2>
        <p class="text-gray-400 leading-relaxed">
          Não é por acaso que o seu banco oferece CDB, LCI, LCA, LC, CRI, CRA, LF, COE, Debêntures Incentivadas,
          fundos DI, fundos multimercado, previdência privada — e mais uma dúzia de siglas que parecem ter saído de um manual técnico.
        </p>
      </div>
      <div class="bg-red-950/30 border border-red-800/50 rounded-2xl p-5 space-y-3">
        <p class="text-red-300 font-bold text-lg">Essa complexidade não existe para te dar opções. Existe para te confundir.</p>
        <p class="text-gray-400 text-sm leading-relaxed">
          Quando um investidor não consegue comparar produtos, ele aceita o que o gerente recomenda.
          E o gerente recomenda o que é mais lucrativo para o banco — não para você.
          Carências obscuras, taxas de administração embutidas, condições de resgate confusas,
          rentabilidades que só aparecem num simulador de doze campos.
        </p>
        <p class="text-red-400 text-sm font-semibold italic">
          Tudo projetado para que você desista de entender e simplesmente assine.
        </p>
      </div>
    </section>

    <!-- Seção 3: O Terceiro Engano -->
    <section class="space-y-6">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">O terceiro engano</p>
        <h2 class="section-title">Se você não sabe o que o concorrente oferece, não tem como barganhar</h2>
        <p class="text-gray-400 leading-relaxed">
          Os bancos não publicam suas taxas na internet. <strong class="text-white">Deliberadamente.</strong>
          Se o Banco A soubesse que o Banco B está pagando 118% do CDI em CDB, teria que competir.
          Como nenhum publica, nenhum precisa se esforçar.
        </p>
      </div>
      <div class="bg-gray-800/60 border border-gray-700 rounded-2xl p-5">
        <p class="text-gray-300 text-sm leading-relaxed">
          Resultado: você fica preso às condições do seu banco atual — não por falta de alternativas,
          mas por falta de informação. Uma assimetria construída com cuidado, mantida com interesse.
        </p>
      </div>
    </section>

    <!-- Seção 4: A Virada -->
    <section class="space-y-6">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">A virada</p>
        <h2 class="section-title">Comunidade contra os tubarões</h2>
        <p class="text-gray-400 leading-relaxed">
          O Linux não venceu com um exército corporativo. Venceu com uma comunidade que decidiu que
          informação estratégica não deveria pertencer a poucos.
          O <strong class="text-white">Renda Fixa MarketPlace</strong> funciona na mesma lógica.
        </p>
      </div>
      <div class="space-y-4">
        <p class="text-gray-400 text-sm leading-relaxed">
          Investidores cadastram as condições reais que receberam dos seus bancos. Outros investidores confirmam.
          A comunidade constrói, coletivamente, o banco de dados de taxas reais que os bancos nunca vão publicar
          — e que os bancos não conseguem suprimir.
        </p>
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="bg-green-950/40 border border-green-800/50 rounded-2xl p-4 space-y-2">
            <p class="text-green-400 font-bold">Validação coletiva</p>
            <p class="text-gray-400 text-sm leading-relaxed">
              Cada confirmação de outro usuário é um voto de confiança.
              Produtos com 5 ou mais confirmações recebem o selo de <strong class="text-white">Alta Confiança</strong> —
              validados por investidores reais, sem conflito de interesse, sem gerente no meio.
            </p>
          </div>
          <div class="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 space-y-2">
            <p class="text-gray-200 font-bold">Resistente à manipulação</p>
            <p class="text-gray-400 text-sm leading-relaxed">
              Os bancos podem tentar inserir agentes para distorcer os dados.
              Mas não conseguem distorcer o que uma comunidade inteira está validando.
            </p>
          </div>
        </div>
        <blockquote class="border-l-4 border-green-600 pl-4 text-gray-400 italic text-sm">
          "Código aberto democratizou o software. Dados abertos vão democratizar o crédito."
        </blockquote>
      </div>
    </section>

    <!-- Seção 5: Para o Investidor -->
    <section class="space-y-6">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">Para o investidor</p>
        <h2 class="section-title">Informação é poder de barganha</h2>
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="card space-y-2">
          <p class="text-white font-semibold">🔍 Compare de verdade</p>
          <p class="text-gray-400 text-sm">Rentabilidade líquida real lado a lado, já descontando IR e IOF para o seu prazo específico. Sem letras miúdas.</p>
        </div>
        <div class="card space-y-2">
          <p class="text-white font-semibold">📊 Simule o seu cenário</p>
          <p class="text-gray-400 text-sm">Informe seu montante e prazo. Veja exatamente quanto cada produto rende no seu caso — não na propaganda do banco.</p>
        </div>
        <div class="card space-y-2">
          <p class="text-white font-semibold">💼 Chegue armado ao banco</p>
          <p class="text-gray-400 text-sm italic">"O banco X está pagando 118% do CDI líquido para 12 meses. O que você me oferece?"</p>
          <p class="text-gray-500 text-xs">Ou o dinheiro vai. E ambos sabem disso.</p>
        </div>
        <div class="card space-y-2">
          <p class="text-white font-semibold">🛡️ Confie no coletivo</p>
          <p class="text-gray-400 text-sm">Informações validadas por múltiplos investidores reais. Sem gerente, sem assessor, sem conflito de interesse.</p>
        </div>
      </div>
    </section>

    <!-- Seção 6: CTA -->
    <section class="text-center space-y-4 py-6 border-y border-gray-800">
      <h2 class="text-2xl font-bold text-white">O dinheiro é seu. A decisão também.</h2>
      <p class="text-gray-400">Simule agora com taxas reais cadastradas por investidores como você — ou cadastre uma oferta que recebeu e fortaleça a comunidade.</p>
      <div class="flex flex-wrap gap-3 justify-center">
        <RouterLink to="/calculadora" class="btn-primary text-base px-6 py-3">Simular meus investimentos →</RouterLink>
        <RouterLink to="/calculadora" class="btn-secondary text-base px-6 py-3">Ver o marketplace →</RouterLink>
      </div>
    </section>

    <!-- Divisor: conteúdo educacional -->
    <div class="flex items-center gap-4">
      <div class="flex-1 h-px bg-gray-800"></div>
      <p class="text-xs text-gray-600 uppercase tracking-widest font-semibold shrink-0">Aprenda os conceitos</p>
      <div class="flex-1 h-px bg-gray-800"></div>
    </div>

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

    <!-- Armadilha do marketplace: quem emite o CDB? -->
    <section class="space-y-6">
      <div>
        <p class="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">O quarto engano</p>
        <h2 class="section-title">O CDB que você vê na plataforma pode não ser daquela instituição</h2>
        <p class="text-gray-400 leading-relaxed">
          Quando você abre o app de um banco grande ou corretora e vê uma lista de CDBs com taxas de
          <strong class="text-white">109%, 115%, 120% do CDI</strong>, a primeira pergunta que você deveria fazer
          não é "quanto rende?" — é <strong class="text-white">"quem está emitindo esse papel?"</strong>
        </p>
      </div>

      <!-- Primário vs Secundário -->
      <div class="card space-y-5">
        <h3 class="font-semibold text-white">Mercado primário vs secundário: a diferença que o banco não explica</h3>

        <div class="grid sm:grid-cols-2 gap-4 text-sm">
          <div class="bg-blue-900/20 border border-blue-800/40 rounded-xl p-4 space-y-2">
            <p class="text-blue-300 font-semibold">📦 Mercado primário (99% do que você vê)</p>
            <p class="text-gray-400 leading-relaxed">
              Um banco pequeno precisa captar dinheiro. Ele <em>emite um CDB novo</em> e contrata uma plataforma
              grande para distribuí-lo para os clientes dela. A plataforma é só o <strong class="text-white">vendedor</strong> —
              o seu credor, de fato, é o banco pequeno emissor.
            </p>
            <div class="bg-blue-900/30 rounded-lg p-2 text-xs text-blue-300 space-y-0.5">
              <p>Banco Emissor → Plataforma (distribuidor) → Você</p>
              <p class="text-gray-500">Plataforma ganha comissão. Risco é do emissor.</p>
            </div>
          </div>
          <div class="bg-amber-900/20 border border-amber-800/40 rounded-xl p-4 space-y-2">
            <p class="text-amber-300 font-semibold">🔄 Mercado secundário (raro, mas existe)</p>
            <p class="text-gray-400 leading-relaxed">
              Outro investidor precisa vender o CDB que já tem. A corretora conecta comprador e vendedor e
              ganha um spread. O título já existe — você está comprando de outra pessoa, geralmente
              com <strong class="text-white">deságio</strong> (como explicado no Cenário I).
            </p>
            <div class="bg-amber-900/30 rounded-lg p-2 text-xs text-amber-300 space-y-0.5">
              <p>Investidor A → Plataforma (intermediário) → Você</p>
              <p class="text-gray-500">Oportunidade de comprar com desconto.</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800/60 rounded-xl p-4 text-sm text-gray-300 leading-relaxed">
          <strong class="text-white">Analogia direta:</strong> comprar no primário é como comprar um carro
          <em>0 km</em> numa concessionária que revende várias montadoras. O preço é o de tabela e quem
          fabricou foi outra empresa. Comprar no secundário é comprar um carro <em>usado</em> de outro dono,
          negociando o preço — com potencial de desconto, mas exigindo mais análise.
        </div>
      </div>

      <!-- Por que taxas altas -->
      <div class="card space-y-4">
        <h3 class="font-semibold text-white">Por que bancos pequenos pagam mais? Existe motivo.</h3>
        <p class="text-gray-400 text-sm leading-relaxed">
          Se um banco pequeno oferece 115% do CDI e um banco tradicional de grande porte oferece 98%, isso não é generosidade.
          É o mercado cobrando um <strong class="text-white">prêmio de risco</strong>: o banco menor
          precisa pagar mais porque os investidores exigem uma compensação pelo risco maior de crédito.
        </p>

        <div class="grid sm:grid-cols-3 gap-3 text-center text-sm">
          <div class="bg-green-900/20 border border-green-800/40 rounded-xl p-3 space-y-1">
            <p class="text-green-400 font-semibold">Banco grande — 98% CDI</p>
            <p class="text-gray-400 text-xs">Banco "grande demais para quebrar". Risco baixíssimo percebido pelo mercado.</p>
            <span class="badge-green text-xs">Baixo risco</span>
          </div>
          <div class="bg-yellow-900/20 border border-yellow-800/40 rounded-xl p-3 space-y-1">
            <p class="text-yellow-400 font-semibold">Banco médio — 109% CDI</p>
            <p class="text-gray-400 text-xs">Sólido, mas menor e menos diversificado. Prêmio razoável pelo risco.</p>
            <span class="badge-yellow text-xs">Risco moderado</span>
          </div>
          <div class="bg-red-900/20 border border-red-800/40 rounded-xl p-3 space-y-1">
            <p class="text-red-400 font-semibold">Banco pequeno — 120%+ CDI</p>
            <p class="text-gray-400 text-xs">Alta taxa = mercado exigindo prêmio elevado. Pode render mais — ou pode ter problemas.</p>
            <span class="badge-red text-xs">Risco elevado</span>
          </div>
        </div>

        <div class="bg-red-950/40 border border-red-800/60 rounded-xl p-4 space-y-2 text-sm">
          <p class="text-red-300 font-bold">Quando a armadilha se fecha: um caso real</p>
          <p class="text-gray-400 leading-relaxed">
            Em 2024–2025, grandes plataformas de investimento distribuíram massivamente CDBs de um banco
            de médio porte com taxas elevadas e o argumento "tem FGC". Quando o banco entrou em dificuldades,
            milhares de investidores descobriram que <strong class="text-white">FGC não é instantâneo</strong> —
            o processo de pagamento pode levar meses, durante os quais o capital fica bloqueado.
            Quem precisava do dinheiro antes da resolução ficou sem acesso.
          </p>
          <p class="text-red-400 text-xs font-semibold">
            A taxa era boa. O risco não estava no folheto. E a plataforma que vendeu ganhou a comissão de qualquer forma.
          </p>
        </div>
      </div>

      <!-- Como se proteger -->
      <div class="card space-y-4">
        <h3 class="font-semibold text-white">Como se proteger: 3 perguntas antes de comprar qualquer CDB</h3>
        <div class="space-y-3">
          <div class="flex gap-3 items-start bg-gray-800/60 rounded-xl p-4">
            <span class="text-green-400 font-black text-lg shrink-0">1</span>
            <div>
              <p class="text-white font-semibold text-sm">Quem é o EMISSOR — não quem está vendendo?</p>
              <p class="text-gray-400 text-xs mt-1">
                No extrato, no contrato e na nota de corretagem, o emissor deve aparecer.
                Pesquise o nome do banco emissor no site do Banco Central
                (<strong class="text-green-400">bcb.gov.br → Instituições</strong>) e verifique se há
                restrições, processos administrativos ou intervenções em andamento.
              </p>
            </div>
          </div>
          <div class="flex gap-3 items-start bg-gray-800/60 rounded-xl p-4">
            <span class="text-green-400 font-black text-lg shrink-0">2</span>
            <div>
              <p class="text-white font-semibold text-sm">O meu total nessa instituição está dentro do limite do FGC?</p>
              <p class="text-gray-400 text-xs mt-1">
                Limite: <strong class="text-white">R$ 250.000 por CPF por CNPJ emissor</strong>
                (não por plataforma distribuidora). Se você tem R$ 100k no CDB do Banco Emissor X
                via Plataforma A <em>e</em> R$ 200k no CDB do mesmo Banco Emissor X via Plataforma B,
                você tem R$ 300k expostos ao Banco X — e R$ 50k fora da cobertura.
              </p>
            </div>
          </div>
          <div class="flex gap-3 items-start bg-gray-800/60 rounded-xl p-4">
            <span class="text-green-400 font-black text-lg shrink-0">3</span>
            <div>
              <p class="text-white font-semibold text-sm">Eu preciso desse dinheiro antes do vencimento?</p>
              <p class="text-gray-400 text-xs mt-1">
                Em caso de intervenção do FGC, o acesso ao capital fica suspenso por meses.
                Se o banco A do Cenário I (fundo de saques) está num emissor em stress,
                você não tem de onde retirar os R$ 4.000 mensais enquanto espera.
                <strong class="text-white">Liquidez de emergência nunca deve depender de banco de risco elevado.</strong>
              </p>
            </div>
          </div>
        </div>
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

      <!-- ═══════════════════════════════════════════════════════════════════
           A CILADA DAS COMBINAÇÕES — O pior cenário que o banco não anuncia
           ═══════════════════════════════════════════════════════════════════ -->
      <div class="rounded-2xl border-2 border-red-700/70 bg-red-950/30 p-5 space-y-5">

        <!-- Cabeçalho -->
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-xl bg-red-900/60 flex items-center justify-center shrink-0 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-red-300 font-bold text-base leading-tight">
              "Sem carência" não significa "pode sacar quando quiser" — e é aí que o banco ganha
            </p>
            <p class="text-red-400/80 text-sm mt-1">
              Esta é a cilada mais bem disfarçada da renda fixa. O banco anuncia o produto como "sem carência"
              — o que é verdade — mas <strong class="text-white">omite que, sem liquidez diária, qualquer retirada vai para o mercado secundário</strong>.
              O investidor descobre isso quando já é tarde.
            </p>
          </div>
        </div>

        <!-- Explicação do engano -->
        <div class="bg-gray-900/70 border border-red-800/40 rounded-xl p-4 space-y-3 text-sm">
          <p class="text-orange-200 font-semibold text-sm">Por que "sem carência" confunde tudo</p>
          <p class="text-gray-300 leading-relaxed text-xs">
            Carência e liquidez diária são <strong class="text-white">duas dimensões independentes</strong>.
            Um produto pode não ter carência nenhuma — ou seja, o contrato não bloqueia o dinheiro por lei —
            e ainda assim <strong class="text-white">não ter liquidez diária</strong>, o que significa que
            o banco não assumiu o compromisso de recomprar o título antes do vencimento.
            Quando o investidor quer sair antes do prazo, suas únicas saídas são:
            pedir ao banco que recompre tudo (o montante total), ou vender no mercado secundário da B3 — com haircut.
          </p>
          <div class="grid sm:grid-cols-3 gap-2 text-xs">
            <div class="bg-red-900/30 border border-red-800/40 rounded-lg p-2.5 space-y-1">
              <p class="text-red-400 font-semibold">❌ O que o banco diz</p>
              <p class="text-gray-400">"Este CDB não tem carência — você pode resgatar quando quiser."</p>
            </div>
            <div class="bg-yellow-900/30 border border-yellow-800/40 rounded-lg p-2.5 space-y-1">
              <p class="text-yellow-400 font-semibold">⚠ O que o banco omite</p>
              <p class="text-gray-400">"Sem liquidez diária — se quiser sair antes do vencimento, a recompra é pelo total ou vai para mercado secundário."</p>
            </div>
            <div class="bg-gray-800/60 border border-gray-700 rounded-lg p-2.5 space-y-1">
              <p class="text-gray-300 font-semibold">💡 O que você precisa perguntar</p>
              <p class="text-gray-400">"Se eu quiser resgatar R$3.000 amanhã, o banco me paga diretamente — ou tenho que vender na B3?"</p>
            </div>
          </div>
        </div>

        <!-- Matriz de combinações -->
        <div class="space-y-2">
          <p class="text-red-300 font-semibold text-xs uppercase tracking-wider">As 4 combinações possíveis — e o que acontece em cada uma</p>
          <div class="space-y-2">

            <!-- Combinação 1: IDEAL -->
            <div class="flex items-start gap-3 bg-green-900/20 border border-green-700/50 rounded-xl p-3">
              <div class="shrink-0 mt-0.5">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-800 text-green-200 text-[10px] font-black">A</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-1.5 mb-1">
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-900/60 text-green-300 border border-green-800/50">Sem carência</span>
                  <span class="text-gray-600 text-[10px]">+</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-900/60 text-green-300 border border-green-800/50">Com liquidez diária</span>
                  <span class="text-gray-600 text-[10px]">+</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-900/60 text-green-300 border border-green-800/50">Recompra pelo banco</span>
                  <span class="ml-auto text-green-400 font-bold text-xs">✓ IDEAL</span>
                </div>
                <p class="text-gray-400 text-xs leading-relaxed">
                  Você pode resgatar <strong class="text-white">qualquer valor, qualquer dia</strong> — parcial ou total.
                  O banco paga à taxa contratada, pro-rata. Sem haircut, sem mercado secundário.
                  É o único cenário onde retiradas parciais mensais funcionam como planejado.
                  <strong class="text-green-300">Exija este formato para a parcela do patrimônio de onde vai fazer saques.</strong>
                </p>
              </div>
            </div>

            <!-- Combinação 2: BLOQUEADO MAS PREVISÍVEL -->
            <div class="flex items-start gap-3 bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-3">
              <div class="shrink-0 mt-0.5">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-800 text-yellow-200 text-[10px] font-black">B</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-1.5 mb-1">
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-yellow-900/60 text-yellow-300 border border-yellow-800/50">Com carência (ex.: 6 meses)</span>
                  <span class="text-gray-600 text-[10px]">+</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-900/60 text-green-300 border border-green-800/50">Liquidez diária após carência</span>
                  <span class="ml-auto text-yellow-400 font-bold text-xs">⚠ BLOQUEADO</span>
                </div>
                <p class="text-gray-400 text-xs leading-relaxed">
                  Dinheiro preso por 6 meses — mas você <strong class="text-white">sabe disso antecipadamente</strong>.
                  Após a carência, resgates parciais funcionam normalmente com recompra pelo banco.
                  O risco aqui é de planejamento: não invista dinheiro que possa precisar antes da carência acabar.
                </p>
              </div>
            </div>

            <!-- Combinação 3: A ARMADILHA DO TUDO OU NADA -->
            <div class="flex items-start gap-3 bg-orange-900/25 border border-orange-700/60 rounded-xl p-3">
              <div class="shrink-0 mt-0.5">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-800 text-orange-200 text-[10px] font-black">C</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-1.5 mb-1">
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-900/60 text-green-300 border border-green-800/50">Sem carência</span>
                  <span class="text-gray-600 text-[10px]">+</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-900/60 text-red-300 border border-red-800/50">Sem liquidez diária</span>
                  <span class="text-gray-600 text-[10px]">+</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-yellow-900/60 text-yellow-300 border border-yellow-800/50">Recompra total pelo banco</span>
                  <span class="ml-auto text-orange-400 font-bold text-xs">☠ TUDO OU NADA</span>
                </div>
                <p class="text-gray-400 text-xs leading-relaxed">
                  Tecnicamente sem carência — mas o banco só recompra <strong class="text-white">o montante inteiro</strong>.
                  Quer retirar R$3.000 de R$600.000? O banco devolve os R$600.000+ inteiros — e você perde o contrato.
                  Aí precisa reinvestir R$597.000 em outro produto, possivelmente com taxa menor.
                  <strong class="text-orange-300">O banco fecha dois contratos pelo preço de um.</strong>
                </p>
              </div>
            </div>

            <!-- Combinação 4: PIOR CENÁRIO -->
            <div class="flex items-start gap-3 bg-red-900/30 border-2 border-red-700/70 rounded-xl p-3">
              <div class="shrink-0 mt-0.5">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-700 text-red-100 text-[10px] font-black">D</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-1.5 mb-1">
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-900/60 text-green-300 border border-green-800/50">Sem carência</span>
                  <span class="text-gray-600 text-[10px]">+</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-900/60 text-red-300 border border-red-800/50">Sem liquidez diária</span>
                  <span class="text-gray-600 text-[10px]">+</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-900/60 text-red-300 border border-red-800/50">Sem recompra → Mercado secundário</span>
                  <span class="ml-auto text-red-400 font-bold text-xs">💀 PIOR CASO</span>
                </div>
                <p class="text-gray-400 text-xs leading-relaxed">
                  O banco anunciou "sem carência" — mas omitiu que <strong class="text-white">não há compromisso de recompra</strong>.
                  Qualquer saída antecipada obriga o investidor a vender no mercado secundário da B3:
                  horário restrito, comprador incerto, <strong class="text-red-300">haircut de 1% a 5%</strong> sobre o valor total.
                  Com um haircut de apenas 1,12% sobre R$600k, o investidor já perde o principal.
                  <strong class="text-red-300">É aqui que o banco ganha — duas vezes:</strong> primeiro ao não assumir o risco de liquidez,
                  depois ao receber o spread quando você aceitar condições piores no novo produto.
                </p>
              </div>
            </div>

          </div>
        </div>

        <!-- Como o banco ganha — o mecanismo exposto -->
        <div class="bg-gray-900/80 border border-red-800/50 rounded-xl p-4 space-y-3">
          <p class="text-red-300 font-bold text-sm">O mecanismo exato de como o banco lucra com isso</p>
          <div class="grid sm:grid-cols-2 gap-3 text-xs text-gray-400">
            <div class="space-y-2">
              <div class="flex items-start gap-2">
                <span class="text-red-400 font-black shrink-0 mt-0.5">1</span>
                <p>O banco oferece CDB <strong class="text-white">"sem carência"</strong> a 116% CDI — 0,2% acima do mercado.
                  O investidor aceita porque parece vantagem.</p>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-red-400 font-black shrink-0 mt-0.5">2</span>
                <p>No contrato, em letras miúdas: <strong class="text-white">"recompra sujeita a disponibilidade"</strong>
                  ou simplesmente a ausência de qualquer cláusula de liquidez diária.
                  O gerente não menciona. Você não pergunta.</p>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-red-400 font-black shrink-0 mt-0.5">3</span>
                <p>Meses depois, o investidor precisa de R$4.000 para uma emergência.
                  Tem R$600.000 investidos. <strong class="text-white">Não consegue acessar nada</strong> — sem passar pelo mercado secundário.</p>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex items-start gap-2">
                <span class="text-red-400 font-black shrink-0 mt-0.5">4</span>
                <p>No mercado secundário, o comprador oferece 98% do valor.
                  O investidor <strong class="text-white">perde 2% de R$600k = R$12.000</strong>
                  para ter acesso a R$4.000 de emergência.</p>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-red-400 font-black shrink-0 mt-0.5">5</span>
                <p>Ou aceita o resgate total pelo banco: recebe R$600k+ de volta,
                  paga IR sobre o lucro e <strong class="text-white">reinveste em novo CDB com taxa menor</strong>
                  (o ciclo de juros mudou). O banco fecha o segundo contrato com spread melhorado.</p>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-red-400 font-black shrink-0 mt-0.5">6</span>
                <p>O banco <strong class="text-orange-300">ganhou nas duas pontas</strong>:
                  utilizou o capital por meses sem comprometer liquidez,
                  e na saída do cliente reposicionou o dinheiro em condições mais favoráveis para a instituição.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Guia de perguntas obrigatórias -->
        <div class="bg-green-950/40 border border-green-700/50 rounded-xl p-4 space-y-2.5">
          <p class="text-green-400 font-bold text-sm">🛡️ As 3 perguntas que expõem a armadilha antes de você cair nela</p>
          <div class="space-y-2 text-xs">
            <div class="flex items-start gap-2 bg-gray-900/60 rounded-lg p-2.5">
              <span class="text-green-400 font-black shrink-0 mt-0.5">P1</span>
              <div>
                <p class="text-gray-200 font-semibold">"Se eu quiser resgatar R$3.000 amanhã, o que acontece?"</p>
                <div class="mt-1 space-y-0.5">
                  <p class="text-green-400">✓ Resposta boa: "Creditamos em D+0 a taxa contratada pro-rata."</p>
                  <p class="text-red-400">✗ Resposta ruim: "Depende de disponibilidade" / "Precisaria consultar" / "Resgate total".</p>
                </div>
              </div>
            </div>
            <div class="flex items-start gap-2 bg-gray-900/60 rounded-lg p-2.5">
              <span class="text-green-400 font-black shrink-0 mt-0.5">P2</span>
              <div>
                <p class="text-gray-200 font-semibold">"Esse produto tem cláusula de recompra parcial pelo banco — está escrito no contrato?"</p>
                <div class="mt-1 space-y-0.5">
                  <p class="text-green-400">✓ Resposta boa: "Sim, a liquidez diária com recompra está prevista no boletim de subscrição."</p>
                  <p class="text-red-400">✗ Resposta ruim: Qualquer hesitação, "verificar", ou menção a mercado secundário como alternativa.</p>
                </div>
              </div>
            </div>
            <div class="flex items-start gap-2 bg-gray-900/60 rounded-lg p-2.5">
              <span class="text-green-400 font-black shrink-0 mt-0.5">P3</span>
              <div>
                <p class="text-gray-200 font-semibold">"Quero fazer retiradas de R$4.000 por mês. Esse produto suporta isso?"</p>
                <div class="mt-1 space-y-0.5">
                  <p class="text-green-400">✓ Resposta boa: "Sim, com liquidez diária você pode resgatar qualquer valor em qualquer dia útil."</p>
                  <p class="text-red-400">✗ Resposta ruim: "Sim, não tem carência" — sem confirmar que liquidez diária com recompra existe.</p>
                </div>
              </div>
            </div>
          </div>
          <p class="text-green-600 text-[10px] border-t border-green-800/30 pt-2">
            "Sem carência" é condição necessária mas não suficiente para saques parciais regulares.
            Liquidez diária com recompra pelo banco é a única combinação que garante retiradas mensais sem penalidade.
          </p>
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

    <!-- Retenção vs Prazo Efetivo -->
    <section class="space-y-6">
      <div>
        <p class="text-red-400 text-xs font-semibold tracking-widest uppercase mb-1">Conceitos da calculadora</p>
        <h2 class="section-title">Retenção vs. Prazo Efetivo — por que são diferentes?</h2>
        <p class="text-gray-400 text-sm">
          Dois conceitos que aparecem juntos nos resultados da calculadora e causam confusão frequente.
          Entendê-los é essencial para interpretar corretamente a rentabilidade e o IR de cada produto.
        </p>
      </div>

      <!-- Definições lado a lado -->
      <div class="grid sm:grid-cols-2 gap-4">

        <!-- Retenção -->
        <div class="rounded-2xl border border-red-800/60 bg-red-950/30 p-5 space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-red-900/60 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p class="text-red-300 font-bold text-base">🔒 Retenção</p>
              <p class="text-red-500 text-xs">Tempo mínimo que o dinheiro fica bloqueado</p>
            </div>
          </div>
          <p class="text-gray-300 text-sm leading-relaxed">
            É o período durante o qual você <strong class="text-white">não pode acessar o dinheiro</strong> — nem parcial, nem totalmente.
            Equivale ao prazo de carência do produto ou, quando não há carência, ao tempo até o vencimento (se o produto só permite resgate no vencimento).
          </p>
          <div class="space-y-1.5 text-xs">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
              <span class="text-gray-400">LCA com carência 6 meses → <strong class="text-red-300">Retenção: 6 meses</strong></span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
              <span class="text-gray-400">CDB que vence em 90 dias → <strong class="text-red-300">Retenção: 90 dias</strong></span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-green-500 shrink-0"></span>
              <span class="text-gray-400">CDB com liquidez diária → <strong class="text-green-400">Sem retenção</strong></span>
            </div>
          </div>
          <div class="bg-red-900/30 border border-red-800/50 rounded-xl p-3 text-xs text-red-300">
            <strong>Na calculadora:</strong> aparece como badge vermelho "🔒 X meses" nos cards e no ranking.
            Indica que o produto é incompatível com retiradas mensais durante esse período.
          </div>
        </div>

        <!-- Prazo efetivo -->
        <div class="rounded-2xl border border-blue-800/60 bg-blue-950/30 p-5 space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-blue-900/60 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-blue-300 font-bold text-base">📅 Prazo Efetivo</p>
              <p class="text-blue-500 text-xs">Período real da simulação — base do cálculo de IR</p>
            </div>
          </div>
          <p class="text-gray-300 text-sm leading-relaxed">
            É o número de dias usado para calcular o rendimento e a alíquota de IR.
            Determinado pela fórmula:
          </p>
          <div class="bg-gray-900/70 border border-blue-800/40 rounded-xl p-3 font-mono text-xs text-center text-blue-200">
            Prazo efetivo = min(data&nbsp;resgate&nbsp;desejada, data&nbsp;vencimento)
          </div>
          <div class="space-y-1.5 text-xs">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
              <span class="text-gray-400">Simula 365 dias · produto vence em 730 dias → <strong class="text-blue-300">Prazo efetivo: 365 dias</strong></span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
              <span class="text-gray-400">Simula 365 dias · produto vence em 90 dias → <strong class="text-blue-300">Prazo efetivo: 90 dias</strong></span>
            </div>
          </div>
          <div class="bg-blue-900/30 border border-blue-800/50 rounded-xl p-3 text-xs text-blue-300">
            <strong>Na calculadora:</strong> define a faixa de IR (22,5% / 20% / 17,5% / 15%) e o rendimento total calculado.
            Aparece como "Prazo ef." no ranking e no relatório.
          </div>
        </div>

      </div>

      <!-- Exemplo concreto -->
      <div class="rounded-2xl border border-orange-700/60 bg-orange-950/30 p-5 space-y-4">
        <p class="text-orange-300 font-bold text-sm">Exemplo prático: LCA com carência de 6 meses e simulação de 1 ano</p>

        <div class="grid sm:grid-cols-3 gap-3 text-xs">
          <div class="bg-gray-900/60 border border-gray-700 rounded-xl p-3 space-y-2">
            <p class="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Produto</p>
            <p class="text-white font-bold">LCA CDI 95%</p>
            <div class="space-y-1 text-gray-400 mt-1">
              <p>Carência: <span class="text-yellow-300">6 meses</span></p>
              <p>Vencimento: <span class="text-gray-200">3 anos (1.095 dias)</span></p>
            </div>
          </div>
          <div class="bg-red-900/20 border border-red-800/50 rounded-xl p-3 space-y-2">
            <p class="text-red-400 font-semibold uppercase tracking-wider text-[10px]">🔒 Retenção</p>
            <p class="text-red-300 font-bold text-lg">6 meses</p>
            <p class="text-gray-400 leading-relaxed">
              Durante os primeiros 6 meses, o dinheiro está bloqueado.
              Não é possível nenhum resgate — mesmo que seja emergência.
              Após os 6 meses, liquidez fica disponível.
            </p>
          </div>
          <div class="bg-blue-900/20 border border-blue-800/50 rounded-xl p-3 space-y-2">
            <p class="text-blue-400 font-semibold uppercase tracking-wider text-[10px]">📅 Prazo Efetivo</p>
            <p class="text-blue-300 font-bold text-lg">365 dias</p>
            <p class="text-gray-400 leading-relaxed">
              A simulação foi configurada para 1 ano (365 dias).
              O produto vence em 3 anos, então o prazo efetivo é 365 dias — a data de resgate desejada.
              Esse prazo define o IR de <strong class="text-blue-200">15% (isenta para LCA)</strong>.
            </p>
          </div>
        </div>

        <div class="bg-orange-900/20 border border-orange-800/50 rounded-xl p-4 space-y-2 text-xs">
          <p class="text-orange-200 font-semibold">O que isso significa na prática:</p>
          <div class="space-y-1.5 text-gray-400">
            <div class="flex items-start gap-2">
              <span class="text-orange-400 shrink-0 mt-0.5">▸</span>
              <p>Os <strong class="text-white">primeiros 6 meses</strong> o investidor não toca no dinheiro — a retenção vale.</p>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-orange-400 shrink-0 mt-0.5">▸</span>
              <p>Do <strong class="text-white">7° mês ao 12° mês</strong> (resto da simulação), o dinheiro está livre — pode ser retirado se necessário.</p>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-orange-400 shrink-0 mt-0.5">▸</span>
              <p>O <strong class="text-white">rendimento calculado</strong> é sobre os 365 dias inteiros, não apenas sobre os 6 meses bloqueados.</p>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-orange-400 shrink-0 mt-0.5">▸</span>
              <p>O <strong class="text-white">IR</strong> é calculado sobre os 365 dias — faixa de 15% (mas LCA é isenta de IR).</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabela de equivalências: retenção × prazo efetivo -->
      <div class="card space-y-3">
        <h3 class="font-semibold text-white text-sm">Como retenção e prazo efetivo interagem — combinações comuns</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead>
              <tr class="text-gray-500 text-[10px] uppercase tracking-wider border-b border-gray-800">
                <th class="text-left py-2 pr-3">Produto</th>
                <th class="text-center py-2 pr-3 text-red-400">🔒 Retenção</th>
                <th class="text-center py-2 pr-3 text-blue-400">📅 Prazo efetivo</th>
                <th class="text-center py-2 pr-3">IR</th>
                <th class="text-left py-2">Atenção</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-800">
              <tr class="hover:bg-gray-800/40">
                <td class="py-2.5 pr-3 text-gray-200 font-medium">CDB liquidez diária</td>
                <td class="py-2.5 pr-3 text-center text-green-400 font-semibold">Livre</td>
                <td class="py-2.5 pr-3 text-center text-blue-300">365 dias</td>
                <td class="py-2.5 pr-3 text-center text-gray-300">15%</td>
                <td class="py-2.5 text-gray-500">Ideal para retiradas mensais</td>
              </tr>
              <tr class="hover:bg-gray-800/40">
                <td class="py-2.5 pr-3 text-gray-200 font-medium">LCA CDI (carência 6m)</td>
                <td class="py-2.5 pr-3 text-center text-red-400 font-semibold">6 meses</td>
                <td class="py-2.5 pr-3 text-center text-blue-300">365 dias</td>
                <td class="py-2.5 pr-3 text-center text-green-400">Isento</td>
                <td class="py-2.5 text-yellow-500">Bloqueado por 6 meses; IR isento pelo prazo de 1 ano</td>
              </tr>
              <tr class="hover:bg-gray-800/40">
                <td class="py-2.5 pr-3 text-gray-200 font-medium">CDB vence em 90 dias</td>
                <td class="py-2.5 pr-3 text-center text-red-400 font-semibold">90 dias</td>
                <td class="py-2.5 pr-3 text-center text-red-300">90 dias</td>
                <td class="py-2.5 pr-3 text-center text-red-400">22,5%</td>
                <td class="py-2.5 text-red-500">Vence antes da simulação — IR máximo</td>
              </tr>
              <tr class="hover:bg-gray-800/40">
                <td class="py-2.5 pr-3 text-gray-200 font-medium">LCI IPCA+ (carência 36m)</td>
                <td class="py-2.5 pr-3 text-center text-red-400 font-semibold">36 meses</td>
                <td class="py-2.5 pr-3 text-center text-blue-300">365 dias</td>
                <td class="py-2.5 pr-3 text-center text-green-400">Isento</td>
                <td class="py-2.5 text-red-500">Incompatível com liquidez em 1 ano — dinheiro preso por 3 anos</td>
              </tr>
              <tr class="hover:bg-gray-800/40">
                <td class="py-2.5 pr-3 text-gray-200 font-medium">Tesouro Selic</td>
                <td class="py-2.5 pr-3 text-center text-green-400 font-semibold">Livre (D+1)</td>
                <td class="py-2.5 pr-3 text-center text-blue-300">365 dias</td>
                <td class="py-2.5 pr-3 text-center text-gray-300">15%</td>
                <td class="py-2.5 text-green-500">Reserva de emergência ideal</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-gray-600 text-[10px] pt-1 border-t border-gray-800">
          Retenção e prazo efetivo são independentes: você pode ter 6 meses de retenção e calcular o rendimento por 1 ano inteiro.
          A retenção não reduz o prazo efetivo — apenas define quando o dinheiro fica acessível durante a simulação.
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

        <!-- Explicação didática -->
        <div class="rounded-2xl border border-orange-700/60 bg-orange-950/30 p-5 space-y-4 text-sm">
          <p class="text-orange-300 font-bold text-base">Entendendo o cálculo — passo a passo, sem enrolação</p>

          <!-- Por que 3.026 e não 3.000 -->
          <div class="space-y-1.5">
            <p class="text-orange-200 font-semibold">Por que você recebe R$&nbsp;{{ fmtRS(sim.cashRecebido) }} e não R$&nbsp;3.000?</p>
            <p class="text-gray-300 leading-relaxed">
              Porque o banco não devolve só o dinheiro que você pediu — ele devolve o dinheiro <strong class="text-white">mais os juros</strong>
              que esse dinheiro rendeu enquanto ficou aplicado.
              Você pediu R$&nbsp;3.000 de volta. Esses R$&nbsp;3.000 ficaram 30 dias rendendo junto com o restante.
              Então você recebe: <strong class="text-white">R$&nbsp;3.000 de capital + R$&nbsp;{{ fmtRS(sim.jurosParcialLiq) }} de juros líquidos</strong> = R$&nbsp;{{ fmtRS(sim.cashRecebido) }}.
            </p>
          </div>

          <!-- O elo entre os dois cálculos -->
          <div class="space-y-1.5 border-t border-orange-800/40 pt-3">
            <p class="text-orange-200 font-semibold">O elo entre "0,50%" e "R$&nbsp;{{ fmtRS(sim.lucroParcial) }}" — por que esses dois números se conectam</p>
            <p class="text-gray-300 leading-relaxed">
              O banco calcula os juros de <strong class="text-white">tudo junto</strong> — os R$&nbsp;600.000 renderam
              <strong class="text-yellow-400">R$&nbsp;{{ fmtRS(sim.lucroBruto) }}</strong> em 30 dias.
              Quando você pede R$&nbsp;3.000 de volta, está pedindo <strong class="text-white">0,50%</strong> do total.
              Então você também leva 0,50% dos juros:
              <strong class="text-yellow-400">R$&nbsp;{{ fmtRS(sim.lucroBruto) }}</strong> × 0,50% =
              <strong class="text-white">R$&nbsp;{{ fmtRS(sim.lucroParcial) }}</strong> de juros brutos.
              O governo retém 22,5% disso como IR:
              <strong class="text-red-400">R$&nbsp;{{ fmtRS(sim.irParcial) }}</strong>.
              Sobram <strong class="text-green-400">R$&nbsp;{{ fmtRS(sim.jurosParcialLiq) }}</strong> de juros líquidos para você.
            </p>
          </div>

          <!-- Onde o banco ganha -->
          <div class="space-y-3 border-t border-orange-800/40 pt-3">
            <p class="text-orange-200 font-semibold">Onde está a cilada — e onde o banco ganha</p>

            <div class="space-y-2">
              <div class="flex items-start gap-3 bg-red-900/20 border border-red-800/30 rounded-xl p-3">
                <span class="text-red-400 font-black text-lg shrink-0 leading-tight">1</span>
                <div>
                  <p class="text-gray-200 font-semibold text-xs uppercase tracking-wider mb-1">A taxa anunciada não é a que você recebe</p>
                  <p class="text-gray-400 leading-relaxed">
                    O banco anuncia <strong class="text-white">{{ sim.cdiAaPct.toFixed(2) }}% a.a.</strong> bruto.
                    Mas como o saque é em 30 dias (menos de 180 dias), o IR é de 22,5%.
                    Sua rentabilidade real é só <strong class="text-red-400">~{{ sim.rLiqAaPct }}% a.a. líquido</strong>.
                    Quase 3 pontos percentuais a menos — e o banco não coloca isso no anúncio.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3 bg-red-900/20 border border-red-800/30 rounded-xl p-3">
                <span class="text-red-400 font-black text-lg shrink-0 leading-tight">2</span>
                <div>
                  <p class="text-gray-200 font-semibold text-xs uppercase tracking-wider mb-1">Quanto mais cedo você saca, mais IR você paga</p>
                  <p class="text-gray-400 leading-relaxed">
                    O IR é <strong class="text-white">regressivo</strong> — diminui com o tempo.
                    Em 30 dias: 22,5%. Em 181 dias: 20%. Em 361 dias: 17,5%. Em 721 dias: 15%.
                    O banco anuncia o mesmo produto para todos os prazos, mas quem saca cedo paga o dobro de imposto de quem aguarda.
                    <strong class="text-orange-300">Ele sabe disso. Você precisa saber também.</strong>
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3 bg-red-900/20 border border-red-800/30 rounded-xl p-3">
                <span class="text-red-400 font-black text-lg shrink-0 leading-tight">3</span>
                <div>
                  <p class="text-gray-200 font-semibold text-xs uppercase tracking-wider mb-1">A armadilha da liquidez — o que acontece em produtos SEM liquidez diária</p>
                  <p class="text-gray-400 leading-relaxed">
                    Este cenário mostra o <strong class="text-white">melhor caso</strong>: um CDB com liquidez diária.
                    Mas a maioria dos produtos que pagam taxas mais altas <strong class="text-red-400">não tem liquidez diária</strong>.
                    Se você tivesse os mesmos R$&nbsp;600.000 num CDB sem liquidez e precisasse de R$&nbsp;3.000,
                    o banco te devolveria <strong class="text-white">tudo — R$&nbsp;{{ fmtRS(sim.valorFinal) }}</strong> — e você perderia o contrato original.
                    Aí você teria que reinvestir o restante em outro produto, provavelmente com taxa menor.
                    Quem ganhou? O banco — que fecha um novo contrato com você.
                  </p>
                </div>
              </div>
            </div>

            <p class="text-orange-400 text-xs font-semibold border-t border-orange-800/40 pt-3">
              Resumo: o banco não mente. Mas omite o suficiente para que você tome a decisão errada.
              Conhecer esses três pontos já coloca você à frente de 90% dos investidores.
            </p>
          </div>

          <!-- Como escapar — Cenário A -->
          <div class="space-y-2 border-t border-orange-800/40 pt-4">
            <p class="text-green-400 font-bold text-sm flex items-center gap-2">
              <span class="text-lg">🛡️</span> Como escapar desta cilada
            </p>
            <div class="space-y-2">
              <div class="flex items-start gap-2 text-xs">
                <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                <p class="text-gray-300"><strong class="text-white">Planeje o prazo antes de investir.</strong> Se sabe que vai resgatar em 30 dias, aceite o IR de 22,5%. Se pode esperar 181 dias, paga 20%. Se pode esperar 361 dias, paga 17,5%. Cada faixa de prazo tem um custo — escolha o seu com consciência.</p>
              </div>
              <div class="flex items-start gap-2 text-xs">
                <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                <p class="text-gray-300"><strong class="text-white">Considere produtos isentos de IR (LCI/LCA).</strong> Para pessoa física, LCI e LCA não pagam IR. Uma LCA a 95% CDI pode render mais líquido do que um CDB a 110% CDI — dependendo do prazo. Use a calculadora para comparar.</p>
              </div>
              <div class="flex items-start gap-2 text-xs">
                <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                <p class="text-gray-300"><strong class="text-white">Nunca compare taxas brutas.</strong> Exija sempre a taxa líquida para o seu prazo específico. O Renda Fixa MarketPlace exibe exatamente isso — taxa líquida já calculada, sem letras miúdas.</p>
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

        <!-- Chart A -->
        <div class="border-t border-gray-700/50 pt-4 space-y-1">
          <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider">📈 Projeção 12 meses — capital após retirada parcial R$3k no mês 1</p>
          <MiniLineChart :series="chartA" :x-labels="xLabels" />
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

        <!-- Explicação didática Cenário B -->
        <div class="rounded-2xl border border-red-700/60 bg-red-950/20 p-5 space-y-4 text-sm">
          <p class="text-red-300 font-bold text-base">Entendendo o Cenário B — traduzido sem jargão</p>

          <div class="space-y-1.5">
            <p class="text-orange-200 font-semibold">O que é haircut?</p>
            <p class="text-gray-300 leading-relaxed">
              Imagine que você tem um bilhete que vale R$&nbsp;{{ fmtRS(sim.dirtyPrice) }} mas precisa de dinheiro agora.
              Ninguém é obrigado a pagar o valor cheio — o comprador sabe que você precisa vender e exige um desconto.
              Esse desconto é o <strong class="text-white">haircut</strong>.
              No mercado financeiro, quando um CDB <strong class="text-white">não tem cláusula de recompra pelo banco</strong>,
              você depende de encontrar um comprador na B3. Ele paga menos. Sempre.
            </p>
          </div>

          <div class="space-y-1.5 border-t border-red-800/40 pt-3">
            <p class="text-orange-200 font-semibold">Por que o desconto incide sobre R$&nbsp;{{ fmtRS(sim.dirtyPrice) }} e não sobre R$&nbsp;{{ fmtRS(sim.principal) }}?</p>
            <p class="text-gray-300 leading-relaxed">
              Porque o título já acumulou juros. O valor total do título hoje é capital + juros brutos =
              <strong class="text-white">R$&nbsp;{{ fmtRS(sim.dirtyPrice) }}</strong> (o chamado "dirty price").
              O haircut incide sobre esse valor cheio — então um desconto de 1% não é 1% de R$&nbsp;600.000.
              É 1% de <strong class="text-white">R$&nbsp;{{ fmtRS(sim.dirtyPrice) }}</strong>.
            </p>
          </div>

          <div class="space-y-3 border-t border-red-800/40 pt-3">
            <p class="text-orange-200 font-semibold">As três ciladas desta situação</p>
            <div class="space-y-2">
              <div class="flex items-start gap-3 bg-red-900/20 border border-red-800/30 rounded-xl p-3">
                <span class="text-red-400 font-black text-lg shrink-0 leading-tight">1</span>
                <div>
                  <p class="text-gray-200 font-semibold text-xs uppercase tracking-wider mb-1">Perde capital com haircut pequeno</p>
                  <p class="text-gray-400 leading-relaxed">
                    Com apenas <strong class="text-white">1,12% de haircut</strong> você já recebe menos do que os R$&nbsp;{{ fmtRS(sim.principal) }} que colocou.
                    Ficou 30 dias com R$&nbsp;{{ fmtRS(sim.principal) }} investidos a {{ sim.cdiAaPct.toFixed(2) }}% a.a. e ainda saiu no prejuízo.
                    O haircut comeu tanto os juros quanto parte do capital.
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3 bg-red-900/20 border border-red-800/30 rounded-xl p-3">
                <span class="text-red-400 font-black text-lg shrink-0 leading-tight">2</span>
                <div>
                  <p class="text-gray-200 font-semibold text-xs uppercase tracking-wider mb-1">Quando não há lucro, não há IR — mas isso não é bom</p>
                  <p class="text-gray-400 leading-relaxed">
                    Na tabela acima, quando o haircut é alto o suficiente para você ter prejuízo, o IR some (aparece "—").
                    Parece vantagem, mas não é: você pagou R$&nbsp;{{ fmtRS(sim.principal) }} e recebeu menos.
                    Não pagar IR sobre prejuízo não é benefício — é consequência de ter perdido dinheiro.
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3 bg-red-900/20 border border-red-800/30 rounded-xl p-3">
                <span class="text-red-400 font-black text-lg shrink-0 leading-tight">3</span>
                <div>
                  <p class="text-gray-200 font-semibold text-xs uppercase tracking-wider mb-1">O banco te atraiu com 0,2% a mais na taxa</p>
                  <p class="text-gray-400 leading-relaxed">
                    Produtos sem cláusula de recompra frequentemente pagam uma taxa ligeiramente maior — 0,1% a 0,3% a.a. a mais.
                    O banco usa isso como isca. Você aceita porque parece vantagem.
                    Mas se precisar sair antes do vencimento, esses 0,2% extras não cobrem nem de longe o haircut de 1,5% ou 3%.
                    <strong class="text-orange-300">O banco não tem obrigação. Você que se vire.</strong>
                  </p>
                </div>
              </div>
            </div>
            <p class="text-red-400 text-xs font-semibold border-t border-red-800/40 pt-3">
              Regra prática: antes de assinar qualquer produto, pergunte ao banco — "se eu precisar sair antes, você recompra ou vou para mercado secundário?"
              Se a resposta for mercado secundário, pense muito bem antes de aceitar.
            </p>
            <!-- Como escapar — Cenário B -->
            <div class="space-y-2 border-t border-red-800/40 pt-4">
              <p class="text-green-400 font-bold text-sm flex items-center gap-2">
                <span class="text-lg">🛡️</span> Como escapar desta cilada
              </p>
              <div class="space-y-2">
                <div class="flex items-start gap-2 text-xs">
                  <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-300"><strong class="text-white">Exija por escrito se o banco recompra.</strong> Antes de investir, pergunte — e se a resposta for "mercado secundário", é uma aposta de liquidez, não um investimento seguro. Só aceite sabendo disso.</p>
                </div>
                <div class="flex items-start gap-2 text-xs">
                  <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-300"><strong class="text-white">Desconfie de taxas 0,2–0,3% acima do mercado.</strong> Esse bônus quase sempre esconde ausência de liquidez garantida. O banco paga mais porque sabe que você vai ficar preso até o vencimento.</p>
                </div>
                <div class="flex items-start gap-2 text-xs">
                  <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-300"><strong class="text-white">Só imobilize dinheiro que você não vai precisar.</strong> Produtos sem recompra são válidos — mas apenas para a fatia do patrimônio que você tem 100% de certeza de que não vai tocar até o vencimento.</p>
                </div>
                <div class="flex items-start gap-2 text-xs">
                  <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-300"><strong class="text-white">Use o marketplace para comparar com liquidez real.</strong> Existem CDBs com liquidez diária pagando taxas competitivas. Compare a taxa líquida — não a bruta anunciada — antes de abrir mão da flexibilidade.</p>
                </div>
              </div>
            </div>
          </div>

        <!-- Chart B -->
        <div class="border-t border-gray-700/50 pt-4 space-y-1">
          <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider">📈 Projeção 12 meses — impacto permanente do haircut ao vender no mês 1</p>
          <MiniLineChart :series="chartB" :x-labels="xLabels" />
        </div>
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

        <!-- Explicação didática Cenário C -->
        <div class="rounded-2xl border border-blue-700/60 bg-blue-950/20 p-5 space-y-4 text-sm">
          <p class="text-blue-300 font-bold text-base">Entendendo o Cenário C — o melhor caso possível, e o que ainda te custa dinheiro</p>

          <div class="space-y-1.5">
            <p class="text-blue-200 font-semibold">O que aconteceu aqui?</p>
            <p class="text-gray-300 leading-relaxed">
              Você investiu R$&nbsp;{{ fmtRS(sim.principal) }}, esperou 30 dias e resgatou tudo.
              O banco devolveu seu capital de volta inteiro + os juros que renderam, já descontado o IR.
              Sem haircut, sem mercado secundário, sem burocracia. É o cenário ideal de liquidez diária funcionando perfeitamente.
            </p>
          </div>

          <div class="space-y-3 border-t border-blue-800/40 pt-3">
            <p class="text-blue-200 font-semibold">O que ainda te custou dinheiro — mesmo no melhor cenário</p>
            <div class="space-y-2">
              <div class="flex items-start gap-3 bg-blue-900/20 border border-blue-800/30 rounded-xl p-3">
                <span class="text-blue-400 font-black text-lg shrink-0 leading-tight">1</span>
                <div>
                  <p class="text-gray-200 font-semibold text-xs uppercase tracking-wider mb-1">O IR de 22,5% por sair cedo</p>
                  <p class="text-gray-400 leading-relaxed">
                    Seus juros brutos foram R$&nbsp;{{ fmtRS(sim.lucroBruto) }}.
                    O governo reteve R$&nbsp;{{ fmtRS(sim.ir) }} de IR — porque o resgate foi em 30 dias (menos de 180 dias).
                    Se você tivesse esperado mais 151 dias (total 181 dias), o IR cairia para 20% e você guardaria
                    <strong class="text-white">R$&nbsp;{{ fmtRS(sim.lucroBruto * (0.225 - 0.20)) }} a mais</strong>.
                    Esperar quase 5 meses a mais vale dinheiro.
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3 bg-blue-900/20 border border-blue-800/30 rounded-xl p-3">
                <span class="text-blue-400 font-black text-lg shrink-0 leading-tight">2</span>
                <div>
                  <p class="text-gray-200 font-semibold text-xs uppercase tracking-wider mb-1">A diferença entre taxa bruta e taxa líquida</p>
                  <p class="text-gray-400 leading-relaxed">
                    O banco anunciou <strong class="text-white">{{ sim.cdiAaPct.toFixed(2) }}% a.a.</strong>
                    Você recebeu <strong class="text-green-400">{{ sim.rLiqAaPct }}% a.a. líquido</strong>.
                    Essa diferença de {{ (sim.cdiAaPct - parseFloat(sim.rLiqAaPct)).toFixed(2) }} pontos percentuais é o custo do IR de 22,5%.
                    Sobre R$&nbsp;{{ fmtRS(sim.principal) }}, equivale a R$&nbsp;{{ fmtRS(sim.ir) }} pagos ao fisco em apenas 30 dias.
                    O banco não anuncia isso no cartaz.
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3 bg-green-900/20 border border-green-800/30 rounded-xl p-3">
                <span class="text-green-400 font-black text-lg shrink-0 leading-tight">✓</span>
                <div>
                  <p class="text-gray-200 font-semibold text-xs uppercase tracking-wider mb-1">Por que esse cenário ainda é o melhor</p>
                  <p class="text-gray-400 leading-relaxed">
                    Comparado ao Cenário B (mercado secundário), você economizou até
                    <strong class="text-white">R$&nbsp;{{ fmtRS(Math.abs(sim.cenarios[5].diffCDB)) }}</strong> só por ter escolhido um produto com cláusula de recompra.
                    E comparado ao Cenário D (sem liquidez), você não ficou refém de resgatar tudo só para acessar uma parte.
                    Liquidez diária com recompra pelo banco é a base de qualquer estratégia de renda fixa bem construída.
                  </p>
                </div>
              </div>
            </div>
            <!-- Como escapar — Cenário C -->
            <div class="space-y-2 border-t border-blue-800/40 pt-4">
              <p class="text-green-400 font-bold text-sm flex items-center gap-2">
                <span class="text-lg">🛡️</span> Como escapar desta cilada
              </p>
              <div class="space-y-2">
                <div class="flex items-start gap-2 text-xs">
                  <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-300"><strong class="text-white">Planeje o prazo antes de investir.</strong> IR de 22,5% cai para 20% depois de 181 dias, 17,5% depois de 361 dias e 15% depois de 720 dias. Esperar mais 151 dias neste cenário economizaria R$&nbsp;{{ fmtRS(sim.cashRecebido * 0.025) }} em imposto.</p>
                </div>
                <div class="flex items-start gap-2 text-xs">
                  <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-300"><strong class="text-white">Considere LCI/LCA isento de IR.</strong> Para prazos longos, uma LCA a 95% CDI pode render mais líquido do que um CDB a 110% CDI — porque você não paga imposto nenhum. Use a calculadora para comparar a taxa líquida real.</p>
                </div>
                <div class="flex items-start gap-2 text-xs">
                  <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-300"><strong class="text-white">Nunca compare taxas brutas entre produtos.</strong> CDB, LCI, LCA e Tesouro têm tributações diferentes. A comparação justa é sempre sobre o que entra no bolso — a taxa líquida depois de IR e IOF.</p>
                </div>
                <div class="flex items-start gap-2 text-xs">
                  <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-300"><strong class="text-white">Use a calculadora do marketplace.</strong> Simule exatamente quanto você recebe líquido para cada prazo e cada tipo de produto. A diferença entre sacar hoje ou em 151 dias aparece em reais — não em percentual abstrato.</p>
                </div>
              </div>
            </div>
          </div>

        <!-- Chart C -->
        <div class="border-t border-gray-700/50 pt-4 space-y-1">
          <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider">📈 Projeção 12 meses — liquidez diária vs. mercado secundário</p>
          <MiniLineChart :series="chartC" :x-labels="xLabels" />
        </div>
        </div>
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

        <!-- Explicação didática Cenário D -->
        <div class="rounded-2xl border border-yellow-700/60 bg-yellow-950/20 p-5 space-y-4 text-sm">
          <p class="text-yellow-300 font-bold text-base">Entendendo o Cenário D — a cilada mais silenciosa de todas</p>

          <div class="space-y-1.5">
            <p class="text-yellow-200 font-semibold">Por que essa é a situação mais perigosa na prática?</p>
            <p class="text-gray-300 leading-relaxed">
              Nos Cenários A, B e C, o investidor decide resgatar porque quer.
              No Cenário D, o investidor <strong class="text-white">precisa</strong> de dinheiro — e descobre que está preso.
              Essa situação é muito mais comum do que parece. Uma emergência médica, um conserto urgente,
              uma oportunidade de negócio. Coisas que acontecem na vida real, fora do planejamento.
            </p>
          </div>

          <div class="space-y-3 border-t border-yellow-800/40 pt-3">
            <p class="text-yellow-200 font-semibold">Como o banco te convenceu a aceitar esse produto</p>
            <div class="space-y-2">
              <div class="flex items-start gap-3 bg-yellow-900/20 border border-yellow-800/30 rounded-xl p-3">
                <span class="text-yellow-400 font-black text-lg shrink-0 leading-tight">1</span>
                <div>
                  <p class="text-gray-200 font-semibold text-xs uppercase tracking-wider mb-1">A isca dos 0,3% a mais</p>
                  <p class="text-gray-400 leading-relaxed">
                    O CDB sem liquidez diária paga uma taxa ligeiramente maior — digamos, 115% CDI em vez de 113% CDI.
                    O gerente enfatiza isso. Você pensa: "não vou precisar do dinheiro em 12 meses, então vale a pena."
                    Essa frase — <em>"não vou precisar"</em> — é onde a armadilha se fecha.
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3 bg-yellow-900/20 border border-yellow-800/30 rounded-xl p-3">
                <span class="text-yellow-400 font-black text-lg shrink-0 leading-tight">2</span>
                <div>
                  <p class="text-gray-200 font-semibold text-xs uppercase tracking-wider mb-1">O problema do "tudo ou nada"</p>
                  <p class="text-gray-400 leading-relaxed">
                    Você precisava de R$&nbsp;3.000. Tem R$&nbsp;{{ fmtRS(sim.valorFinal) }} no banco.
                    Mas o banco não fracionou seu título — é um contrato único.
                    Suas opções são: <strong class="text-white">não pegar nada</strong> (esperar o vencimento) ou
                    <strong class="text-white">pegar tudo</strong> (R$&nbsp;{{ fmtRS(sim.valorFinal) }}) e perder o contrato.
                    Não existe meio-termo. Para acessar R$&nbsp;3.000, você é forçado a mexer em R$&nbsp;{{ fmtRS(sim.valorFinal) }}.
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3 bg-yellow-900/20 border border-yellow-800/30 rounded-xl p-3">
                <span class="text-yellow-400 font-black text-lg shrink-0 leading-tight">3</span>
                <div>
                  <p class="text-gray-200 font-semibold text-xs uppercase tracking-wider mb-1">O custo invisível: perder os próximos 11 meses de juros</p>
                  <p class="text-gray-400 leading-relaxed">
                    Se você resgatar agora, recebe os juros de 30 dias. Mas perde os juros dos próximos 11 meses.
                    Com R$&nbsp;{{ fmtRS(sim.principal) }} a {{ sim.cdiAaPct.toFixed(2) }}% a.a., os 11 meses seguintes renderiam aproximadamente
                    <strong class="text-white">R$&nbsp;{{ fmtRS(sim.principal * (Math.pow(1 + sim.cdiAaPct/100, 335/365) - 1) * 0.775) }}</strong> líquidos.
                    Tudo isso perdido porque você precisava de R$&nbsp;3.000 e não tinha um produto fracionado ou reserva separada.
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3 bg-red-900/20 border border-red-800/30 rounded-xl p-3">
                <span class="text-red-400 font-black text-lg shrink-0 leading-tight">4</span>
                <div>
                  <p class="text-gray-200 font-semibold text-xs uppercase tracking-wider mb-1">O banco se beneficia duas vezes</p>
                  <p class="text-gray-400 leading-relaxed">
                    Primeiro quando você investe sem liquidez — o banco usa seu dinheiro por 12 meses com mais segurança.
                    Segundo quando você resgata antecipado — você reinveste o dinheiro num novo produto,
                    possivelmente com taxa menor (as taxas mudam), e o banco fecha um novo contrato.
                    <strong class="text-orange-300">Dois negócios pelo preço de um, às suas custas.</strong>
                  </p>
                </div>
              </div>
            </div>
            <p class="text-yellow-400 text-xs font-semibold border-t border-yellow-800/40 pt-3">
              A proteção é simples: nunca invista mais do que pode imobilizar, e sempre mantenha uma reserva de emergência
              em produto com liquidez diária — mesmo que renda um pouco menos. A diferença de 0,3% a.a. não vale a armadilha do "tudo ou nada".
            </p>
            <!-- Como escapar — Cenário D -->
            <div class="space-y-2 border-t border-yellow-800/40 pt-4">
              <p class="text-green-400 font-bold text-sm flex items-center gap-2">
                <span class="text-lg">🛡️</span> Como escapar desta cilada
              </p>
              <div class="space-y-2">
                <div class="flex items-start gap-2 text-xs">
                  <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-300"><strong class="text-white">Fracione antes de investir.</strong> Em vez de um CDB de R$&nbsp;{{ fmtRS(sim.principal) }}, considere seis de R$&nbsp;{{ fmtRS(sim.principal / 6) }}. Se precisar de R$&nbsp;3.000, você resgata só uma fração — e os outros cinco continuam rendendo.</p>
                </div>
                <div class="flex items-start gap-2 text-xs">
                  <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-300"><strong class="text-white">Mantenha reserva de emergência separada.</strong> Antes de imobilizar qualquer capital, garanta pelo menos 6 meses de despesas em produto com liquidez diária. Essa reserva não é para render — é para não forçar resgates ruins.</p>
                </div>
                <div class="flex items-start gap-2 text-xs">
                  <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-300"><strong class="text-white">Existem CDBs com liquidez diária pagando bem.</strong> O marketplace mostra CDBs com liquidez diária a 113–115% CDI. A diferença de 0,3% a.a. que o banco te oferece para abrir mão da liquidez muitas vezes não compensa o risco do "tudo ou nada".</p>
                </div>
                <div class="flex items-start gap-2 text-xs">
                  <span class="text-green-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-300"><strong class="text-white">Nunca aceite a premissa "não vou precisar".</strong> A vida muda. A regra prática: só imobilize o dinheiro que ficaria intocado mesmo no pior cenário que você consegue imaginar. O restante, liquide primeiro.</p>
                </div>
              </div>
            </div>
          </div>

        <!-- Chart D -->
        <div class="border-t border-gray-700/50 pt-4 space-y-1">
          <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider">📈 Projeção 12 meses — custo real do lock-up: saída forçada no mês 6</p>
          <MiniLineChart :series="chartD" :x-labels="xLabels" />
        </div>
        </div>
      </div>

      <!-- Cenário E: Estratégia ideal — renda mensal sustentável -->
      <div class="card space-y-5 border-teal-700/50">
        <div class="flex items-center gap-2">
          <span class="badge-teal">Cenário E</span>
          <h3 class="font-semibold text-white">Estratégia ideal — R$4.000/mês com o capital crescendo</h3>
        </div>

        <!-- Por que é sustentável -->
        <div class="bg-teal-900/20 border border-teal-700/40 rounded-2xl p-4 space-y-3">
          <p class="text-teal-200 font-bold text-sm">A condição fundamental: seu rendimento mensal líquido é maior que a retirada.</p>
          <p class="text-gray-300 text-sm">
            Com R$&nbsp;{{ fmtRS(simE.principal) }} a {{ sim.cdiAaPct.toFixed(2) }}% a.a. (CDI), a carteira híbrida rende
            <strong class="text-teal-400">R$&nbsp;{{ fmtRS(simE.totalNetM1) }} líquidos por mês</strong>.
            Como R$&nbsp;{{ fmtRS(simE.totalNetM1) }} &gt; R$&nbsp;4.000, cada retirada é coberta pelos juros — e sobra para reinvestir.
            O capital não erode. Cresce.
          </p>
          <div class="grid grid-cols-3 gap-3 text-center text-sm">
            <div class="bg-gray-800/60 rounded-xl p-3">
              <p class="text-gray-500 text-xs mb-1">Rendimento líquido/mês</p>
              <p class="text-teal-400 font-bold text-lg">{{ fmtRS(simE.totalNetM1) }}</p>
            </div>
            <div class="bg-red-900/20 border border-red-800/30 rounded-xl p-3">
              <p class="text-gray-500 text-xs mb-1">Retirada mensal</p>
              <p class="text-red-400 font-bold text-lg">− {{ fmtRS(simE.retirada) }}</p>
            </div>
            <div class="bg-green-900/20 border border-green-800/30 rounded-xl p-3">
              <p class="text-gray-500 text-xs mb-1">Saldo reinvestido</p>
              <p class="text-green-400 font-bold text-lg">+ {{ fmtRS(simE.surplusM1) }}</p>
            </div>
          </div>
        </div>

        <!-- Os dois produtos -->
        <div class="space-y-2">
          <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider">A estratégia — dois produtos, dois papéis</p>
          <div class="grid sm:grid-cols-2 gap-3 text-sm">

            <!-- CDB: caixa de saques -->
            <div class="border border-gray-700 rounded-xl p-4 space-y-3">
              <div class="flex items-center justify-between">
                <p class="text-gray-400 text-xs font-semibold uppercase tracking-wider">Caixa de Saques</p>
                <span class="text-yellow-400 text-xs font-bold">8% — R$&nbsp;{{ fmtRS(simE.capCDB) }}</span>
              </div>
              <div>
                <p class="text-white font-bold">CDB Liquidez Diária</p>
                <p class="text-yellow-400 font-semibold">115% CDI · {{ simE.taxaCDB_pct }}% a.a.</p>
              </div>
              <div class="space-y-1 text-xs text-gray-400">
                <div class="flex justify-between"><span>Rendimento bruto/mês</span><span class="text-gray-200">{{ fmtRS(simE.rendCDB_bruto) }}</span></div>
                <div class="flex justify-between"><span>IR 22,5%</span><span class="text-red-400">− {{ fmtRS(simE.rendCDB_ir) }}</span></div>
                <div class="flex justify-between font-semibold border-t border-gray-700/40 pt-1"><span>Rendimento líquido/mês</span><span class="text-green-400">{{ fmtRS(simE.rendCDB_net) }}</span></div>
              </div>
              <p class="text-xs text-gray-500 border-t border-gray-700/40 pt-2">
                Cobre <strong class="text-gray-300">{{ simE.mesesCDB }}+ meses</strong> de saques sem tocar na LCA. Crédito D+0.
              </p>
            </div>

            <!-- LCA: motor de crescimento -->
            <div class="border border-teal-700/60 bg-teal-950/20 rounded-xl p-4 space-y-3">
              <div class="flex items-center justify-between">
                <p class="text-gray-400 text-xs font-semibold uppercase tracking-wider">Motor de Crescimento</p>
                <span class="text-teal-400 text-xs font-bold">92% — R$&nbsp;{{ fmtRS(simE.capLCA) }}</span>
              </div>
              <div>
                <p class="text-white font-bold">LCA / LCI — Isento de IR</p>
                <p class="text-teal-400 font-semibold">97% CDI · {{ simE.taxaLCA_pct }}% a.a.</p>
              </div>
              <div class="space-y-1 text-xs text-gray-400">
                <div class="flex justify-between"><span>Rendimento líquido/mês</span><span class="text-teal-400 font-semibold">{{ fmtRS(simE.rendLCA) }}</span></div>
                <div class="flex justify-between"><span>IR pago</span><span class="text-green-400 font-semibold">R$&nbsp;0,00 — isento</span></div>
                <div class="flex justify-between border-t border-teal-700/30 pt-1 text-teal-500/70"><span>Carência mínima</span><span>90 dias (LCA)</span></div>
              </div>
              <p class="text-xs text-gray-500 border-t border-teal-700/30 pt-2">
                <strong class="text-gray-300">Nunca tocado para saques.</strong> Todo excedente vai para cá. Cresce compondo sobre si mesmo.
              </p>
            </div>
          </div>
        </div>

        <!-- Fluxo mês 1 -->
        <div class="space-y-2">
          <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider">Fluxo do mês 1 — o que acontece na prática</p>
          <div class="space-y-1.5 text-sm">
            <div class="flex items-start gap-3 bg-teal-900/10 border border-teal-800/30 rounded-xl px-4 py-3">
              <span class="w-5 h-5 rounded-full bg-teal-900 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
              <p class="text-gray-300">LCA rende <strong class="text-teal-400">{{ fmtRS(simE.rendLCA) }}</strong> — isento de IR. Reinvestido automaticamente.</p>
            </div>
            <div class="flex items-start gap-3 bg-gray-800/40 rounded-xl px-4 py-3">
              <span class="w-5 h-5 rounded-full bg-yellow-900 text-yellow-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
              <p class="text-gray-300">CDB rende <strong class="text-yellow-400">{{ fmtRS(simE.rendCDB_bruto) }}</strong> bruto → IR <strong class="text-red-400">{{ fmtRS(simE.rendCDB_ir) }}</strong> → líquido: <strong class="text-green-400">{{ fmtRS(simE.rendCDB_net) }}</strong>.</p>
            </div>
            <div class="flex items-start gap-3 bg-red-900/10 border border-red-900/30 rounded-xl px-4 py-3">
              <span class="w-5 h-5 rounded-full bg-red-900 text-red-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
              <p class="text-gray-300">Saque de <strong class="text-white">{{ fmtRS(simE.retirada) }}</strong> debitado do CDB (D+0, sem haircut, sem mercado secundário).</p>
            </div>
            <div class="flex items-start gap-3 bg-green-900/20 border border-green-700 rounded-xl px-4 py-3">
              <span class="w-5 h-5 rounded-full bg-green-800 text-green-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
              <div>
                <p class="text-gray-200 font-semibold">Saldo excedente: <strong class="text-green-400">+{{ fmtRS(simE.surplusM1) }}</strong> — reinvestido na LCA.</p>
                <p class="text-gray-500 text-xs mt-0.5">IR total pago no mês: apenas R$&nbsp;{{ fmtRS(simE.rendCDB_ir) }} · IR sobre LCA: R$&nbsp;0,00</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Projeção 12 meses -->
        <div class="space-y-2">
          <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider">Projeção 12 meses — estratégia híbrida vs. 100% CDB tributado</p>
          <div class="grid sm:grid-cols-2 gap-3 text-sm">
            <div class="bg-teal-900/20 border border-teal-700/50 rounded-xl p-4 space-y-2">
              <p class="text-teal-300 font-bold text-xs uppercase tracking-wider mb-2">Esta estratégia (Cenário E)</p>
              <div class="flex justify-between"><span class="text-gray-400">Capital inicial</span><span class="text-gray-200 font-mono">{{ fmtRS(simE.principal) }}</span></div>
              <div class="flex justify-between"><span class="text-gray-400">Total retirado</span><span class="text-red-400 font-mono">− {{ fmtRS(simE.totalRetirado) }}</span></div>
              <div class="flex justify-between"><span class="text-gray-400">IR total pago</span><span class="text-orange-300 font-mono">{{ fmtRS(simE.irAnual) }}</span></div>
              <div class="flex justify-between font-bold border-t border-teal-700/40 pt-2">
                <span class="text-teal-300">Capital após 12 meses</span>
                <span class="text-teal-400 font-mono text-base">{{ fmtRS(simE.capital12) }}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-gray-500">Variação líquida do capital</span>
                <span class="text-green-400 font-semibold">+ {{ fmtRS(simE.capital12 - simE.principal) }}</span>
              </div>
            </div>
            <div class="bg-gray-800/40 border border-gray-700/40 rounded-xl p-4 space-y-2">
              <p class="text-gray-400 font-bold text-xs uppercase tracking-wider mb-2">Comparação: 100% CDB tributado</p>
              <div class="flex justify-between"><span class="text-gray-400">Capital inicial</span><span class="text-gray-200 font-mono">{{ fmtRS(simE.principal) }}</span></div>
              <div class="flex justify-between"><span class="text-gray-400">Total retirado</span><span class="text-red-400 font-mono">− {{ fmtRS(simE.totalRetirado) }}</span></div>
              <div class="flex justify-between"><span class="text-gray-400">IR total pago</span><span class="text-red-400 font-mono">{{ fmtRS(simE.irAnual2) }}</span></div>
              <div class="flex justify-between font-bold border-t border-gray-700/40 pt-2">
                <span class="text-gray-400">Capital após 12 meses</span>
                <span class="text-gray-300 font-mono text-base">{{ fmtRS(simE.capital12_cdb) }}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-gray-500">Variação líquida do capital</span>
                <span class="text-green-400 font-semibold">+ {{ fmtRS(simE.capital12_cdb - simE.principal) }}</span>
              </div>
            </div>
          </div>
          <div class="bg-green-900/20 border border-green-700/50 rounded-xl p-3 text-xs flex flex-wrap gap-x-6 gap-y-1">
            <span class="text-gray-300">IR economizado no ano: <strong class="text-green-400">{{ fmtRS(simE.economiaIR) }}</strong></span>
            <span class="text-gray-300">Capital adicional após 12 meses: <strong class="text-green-400">+ {{ fmtRS(simE.difCapital) }}</strong></span>
          </div>
        </div>

        <!-- Explicação didática -->
        <div class="rounded-2xl border border-teal-700/60 bg-teal-950/20 p-5 space-y-4 text-sm">
          <p class="text-teal-300 font-bold text-base">Por que a LCA a 97% CDI bate o CDB a 115% CDI?</p>

          <div class="space-y-2">
            <p class="text-gray-300 leading-relaxed">
              Para saques mensais (prazo ≤ 180 dias), o CDB paga <strong class="text-white">22,5% de IR</strong> sobre o lucro.
              Para que um CDB tributado iguale uma LCA isenta a 97% CDI, ele precisaria pagar:
            </p>
            <div class="bg-gray-900/70 border border-teal-800/40 rounded-xl p-3 font-mono text-xs text-center text-teal-200">
              97% CDI ÷ (1 − 22,5%) = 97% ÷ 0,775 = <strong class="text-teal-300">{{ simE.equiv225 }}% CDI bruto</strong>
            </div>
            <p class="text-gray-400 text-xs">Um CDB pagando 115% CDI rende <strong class="text-red-400">menos</strong> que uma LCA pagando 97% CDI — para saques curtos. O banco não vai te contar isso.</p>
          </div>

          <div class="space-y-2 border-t border-teal-800/40 pt-3">
            <p class="text-teal-200 font-semibold text-xs uppercase tracking-wider">CDB mínimo equivalente à LCA 97% CDI — por faixa de IR</p>
            <div class="overflow-x-auto">
              <table class="w-full text-xs">
                <thead>
                  <tr class="border-b border-gray-700 text-gray-500 text-[10px] uppercase tracking-wider">
                    <th class="text-left pb-2 pr-4">Prazo</th>
                    <th class="text-right pb-2 pr-4">IR</th>
                    <th class="text-right pb-2">CDB mínimo para igualar LCA 97% CDI</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-800 text-gray-300">
                  <tr><td class="py-2 pr-4">Até 180 dias</td><td class="py-2 pr-4 text-right text-red-400">22,5%</td><td class="py-2 text-right font-bold text-red-400">{{ simE.equiv225 }}% CDI</td></tr>
                  <tr><td class="py-2 pr-4">181–360 dias</td><td class="py-2 pr-4 text-right text-orange-400">20,0%</td><td class="py-2 text-right font-bold text-orange-400">{{ simE.equiv200 }}% CDI</td></tr>
                  <tr><td class="py-2 pr-4">361–720 dias</td><td class="py-2 pr-4 text-right text-yellow-400">17,5%</td><td class="py-2 text-right font-bold text-yellow-400">{{ simE.equiv175 }}% CDI</td></tr>
                  <tr><td class="py-2 pr-4">Acima de 720 dias</td><td class="py-2 pr-4 text-right text-green-400">15,0%</td><td class="py-2 text-right font-bold text-green-400">{{ simE.equiv150 }}% CDI</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-3 border-t border-teal-800/40 pt-4">
            <p class="text-teal-200 font-semibold">🎯 Como montar essa estratégia no marketplace</p>
            <div class="space-y-2">
              <div class="flex items-start gap-3 bg-gray-800/50 rounded-xl p-3">
                <span class="text-yellow-400 font-black shrink-0">1</span>
                <div class="text-xs">
                  <p class="text-gray-200 font-semibold mb-0.5">Caixa de Saques — R$&nbsp;{{ fmtRS(simE.capCDB) }} em CDB liquidez diária</p>
                  <p class="text-gray-400">Na calculadora: tipo <strong class="text-white">CDB</strong> · liquidez <strong class="text-white">diária</strong> · taxa mínima <strong class="text-white">110% CDI</strong>. Com FGC. Rende {{ fmtRS(simE.rendCDB_net) }}/mês líquido e cobre {{ simE.mesesCDB }}+ meses de saques sem tocar na LCA.</p>
                </div>
              </div>
              <div class="flex items-start gap-3 bg-teal-900/20 border border-teal-800/30 rounded-xl p-3">
                <span class="text-teal-400 font-black shrink-0">2</span>
                <div class="text-xs">
                  <p class="text-gray-200 font-semibold mb-0.5">Motor de Crescimento — R$&nbsp;{{ fmtRS(simE.capLCA) }} em LCA/LCI isento</p>
                  <p class="text-gray-400">Na calculadora: tipo <strong class="text-white">LCA</strong> · carência <strong class="text-white">≤ 90 dias</strong> · taxa mínima <strong class="text-white">92% CDI</strong>. Uma LCA a 97% CDI vale o mesmo que um CDB a <strong class="text-white">{{ simE.equiv225 }}% CDI</strong> — produto que praticamente não existe no mercado.</p>
                </div>
              </div>
              <div class="flex items-start gap-3 bg-green-900/20 border border-green-800/30 rounded-xl p-3">
                <span class="text-green-400 font-black shrink-0">3</span>
                <div class="text-xs">
                  <p class="text-gray-200 font-semibold mb-0.5">Atenção: FGC cobre até R$250.000 por CPF por conglomerado</p>
                  <p class="text-gray-400">Distribua os R$&nbsp;{{ fmtRS(simE.capLCA) }} em <strong class="text-white">pelo menos 3 instituições diferentes</strong> para manter a cobertura integral do FGC. Use o marketplace para comparar taxas em múltiplos bancos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart E -->
        <div class="border-t border-teal-700/40 pt-4 space-y-1">
          <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider">📈 Projeção 12 meses — retirada de R$4k/mês: o capital ainda cresce</p>
          <MiniLineChart :series="chartE" :x-labels="xLabels" />
        </div>
      </div>
    </section>

    <!-- Divisor: Tesouro Direto -->
    <div class="flex items-center gap-4">
      <div class="flex-1 h-px bg-gray-800"></div>
      <p class="text-xs text-gray-600 uppercase tracking-widest font-semibold shrink-0">Tesouro Direto — você como credor do Estado</p>
      <div class="flex-1 h-px bg-gray-800"></div>
    </div>

    <!-- Introdução Tesouro Direto -->
    <section class="space-y-6">
      <div>
        <p class="text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-1">O que é o Tesouro Direto?</p>
        <h2 class="section-title">Você emprestando dinheiro diretamente ao governo federal</h2>
        <p class="text-gray-400 leading-relaxed">
          O <strong class="text-white">Tesouro Direto</strong> é o programa do governo federal que permite a <strong class="text-white">qualquer pessoa física</strong>
          comprar títulos da dívida pública brasileira diretamente — sem intermediário bancário.
          Você se torna um credor do Estado: empresta dinheiro à União e recebe de volta com juros.
        </p>
      </div>
      <div class="grid sm:grid-cols-3 gap-4 text-sm">
        <div class="bg-indigo-950/40 border border-indigo-800/50 rounded-2xl p-4 space-y-2">
          <p class="text-indigo-300 font-bold">🏛️ Risco de crédito zero</p>
          <p class="text-gray-400 text-xs leading-relaxed">
            O governo federal detém o monopólio da emissão de moeda e o poder de tributar toda a economia.
            É tecnicamente impossível o Tesouro Nacional dar calote num título em Reais — ele pode emitir mais moeda
            se necessário. É o ativo de menor risco do país.
          </p>
        </div>
        <div class="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 space-y-2">
          <p class="text-gray-200 font-bold">💰 Aportes a partir de R$&nbsp;30</p>
          <p class="text-gray-400 text-xs leading-relaxed">
            Democrático por definição: qualquer pessoa com CPF e conta numa corretora habilitada pode investir.
            Transparência total de taxas. Liquidez garantida pelo Tesouro Nacional (recompra diária).
          </p>
        </div>
        <div class="bg-yellow-950/40 border border-yellow-800/50 rounded-2xl p-4 space-y-2">
          <p class="text-yellow-300 font-bold">⚠️ Alerta: marcação a mercado</p>
          <p class="text-gray-400 text-xs leading-relaxed">
            Com exceção do Tesouro Selic, os títulos pré-fixados e IPCA+ sofrem variação de preço diária
            com as expectativas de juros. Se você vender antes do vencimento, pode receber mais ou menos
            do que o esperado. A taxa contratada só é garantida no vencimento.
          </p>
        </div>
      </div>
      <div class="card overflow-x-auto space-y-2">
        <p class="text-gray-400 text-xs font-semibold uppercase tracking-wider">Os três títulos disponíveis — características e quando usar</p>
        <table class="w-full text-sm mt-2">
          <thead>
            <tr class="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800">
              <th class="text-left py-2 pr-4">Título</th>
              <th class="text-left py-2 pr-4">Indexador</th>
              <th class="text-left py-2 pr-4">Liquidez</th>
              <th class="text-left py-2 pr-4">Risco MtM</th>
              <th class="text-left py-2">Ideal para</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800 text-xs">
            <tr class="hover:bg-gray-800/40">
              <td class="py-3 pr-4 font-bold text-indigo-300">Tesouro Selic</td>
              <td class="py-3 pr-4 text-gray-300">100% Selic</td>
              <td class="py-3 pr-4 text-green-400">D+1 sem risco</td>
              <td class="py-3 pr-4 text-green-400">Praticamente zero</td>
              <td class="py-3 text-gray-400">Reserva de emergência, saques regulares</td>
            </tr>
            <tr class="hover:bg-gray-800/40">
              <td class="py-3 pr-4 font-bold text-purple-300">Tesouro IPCA+</td>
              <td class="py-3 pr-4 text-gray-300">IPCA + taxa real (~7,8%)</td>
              <td class="py-3 pr-4 text-yellow-400">D+1 com MtM</td>
              <td class="py-3 pr-4 text-yellow-400">Médio (até o vencimento)</td>
              <td class="py-3 text-gray-400">Previdência, independência financeira</td>
            </tr>
            <tr class="hover:bg-gray-800/40">
              <td class="py-3 pr-4 font-bold text-emerald-300">Tesouro Pré-fixado</td>
              <td class="py-3 pr-4 text-gray-300">Taxa fixa definida na compra</td>
              <td class="py-3 pr-4 text-yellow-400">D+1 com MtM</td>
              <td class="py-3 pr-4 text-yellow-400">Médio (antes do vencimento)</td>
              <td class="py-3 text-gray-400">Topo do ciclo de juros, aposta na queda da Selic</td>
            </tr>
          </tbody>
        </table>
        <p class="text-xs text-gray-600 pt-1 border-t border-gray-800">
          Fonte: Tesouro Nacional (tesourodireto.com.br) · Taxa CDI = 14,65% a.a. · IPCA projetado = 5,5% a.a. · Tesouro IPCA+ taxa real = ~7,8% a.a.
        </p>
      </div>
    </section>

    <!-- Cenário F: Tesouro Selic -->
    <section class="space-y-6">
      <div class="card space-y-5 border-indigo-800/40">
        <div class="flex items-center gap-2">
          <span class="badge-indigo">Cenário F</span>
          <h3 class="font-semibold text-white">Tesouro Selic — R$&nbsp;4.000/mês com o menor risco do mercado</h3>
        </div>

        <!-- O que é -->
        <div class="bg-indigo-950/30 border border-indigo-700/40 rounded-2xl p-4 space-y-3">
          <p class="text-indigo-200 font-bold text-sm">O que é o Tesouro Selic?</p>
          <p class="text-gray-300 text-sm leading-relaxed">
            É o título público <strong class="text-white">pós-fixado</strong> do governo federal, atrelado à taxa Selic.
            Funciona de forma análoga a um CDB com liquidez diária, mas com duas diferenças fundamentais:
            <strong class="text-indigo-300">risco de crédito zero</strong> (quem garante é o governo, não um banco)
            e <strong class="text-indigo-300">sem risco de marcação a mercado</strong> — o preço sobe todos os dias,
            sem oscilações para baixo, independente do cenário de juros.
          </p>
          <div class="grid sm:grid-cols-2 gap-3 text-xs">
            <div class="bg-green-900/20 border border-green-800/40 rounded-xl p-3 space-y-1">
              <p class="text-green-400 font-semibold">✓ Vantagens</p>
              <ul class="text-gray-400 space-y-0.5">
                <li>▸ Resgate em D+1 via Pix (dias úteis)</li>
                <li>▸ Nunca perde valor nominal</li>
                <li>▸ Sem FGC necessário (risco soberano)</li>
                <li>▸ A taxa atual ({{ simF.taxaAa.toFixed(2) }}% a.a.) supera qualquer poupança</li>
              </ul>
            </div>
            <div class="bg-yellow-900/20 border border-yellow-800/40 rounded-xl p-3 space-y-1">
              <p class="text-yellow-400 font-semibold">⚠ Atenção</p>
              <ul class="text-gray-400 space-y-0.5">
                <li>▸ IR regressivo igual ao CDB (22,5% → 15%)</li>
                <li>▸ Taxa segue a Selic — se o Copom cortar juros, o rendimento cai</li>
                <li>▸ Taxa de custódia B3: 0,20% a.a. (cobrada automaticamente)</li>
                <li>▸ Saldo não tem cobertura do FGC</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Key metrics -->
        <div class="grid grid-cols-3 gap-3 text-sm text-center">
          <div class="bg-gray-800/60 rounded-xl p-3">
            <p class="text-gray-500 text-xs mb-1">Taxa atual</p>
            <p class="text-indigo-400 font-black text-xl">{{ simF.taxaAa.toFixed(2) }}%</p>
            <p class="text-gray-600 text-xs">a.a. (100% Selic)</p>
          </div>
          <div class="bg-green-900/20 border border-green-800/30 rounded-xl p-3">
            <p class="text-gray-500 text-xs mb-1">Rendimento líq./mês</p>
            <p class="text-green-400 font-black text-xl">{{ fmtRS(simF.rendNet) }}</p>
            <p class="text-gray-600 text-xs">após IR 22,5%</p>
          </div>
          <div class="bg-teal-900/20 border border-teal-800/30 rounded-xl p-3">
            <p class="text-gray-500 text-xs mb-1">Excedente após R$4k</p>
            <p class="text-teal-400 font-black text-xl">+{{ fmtRS(simF.surplus) }}</p>
            <p class="text-gray-600 text-xs">reinvestido todo mês</p>
          </div>
        </div>

        <!-- Comparação com poupança -->
        <div class="bg-red-950/30 border border-red-800/40 rounded-xl p-4 space-y-2 text-sm">
          <p class="text-red-300 font-bold">Tesouro Selic vs Poupança — a diferença que os bancos não te contam</p>
          <div class="grid sm:grid-cols-2 gap-4 text-xs text-gray-400">
            <div class="space-y-1">
              <p class="text-indigo-300 font-semibold">Tesouro Selic ({{ simF.taxaAa.toFixed(2) }}% a.a.)</p>
              <div class="flex justify-between"><span>Rendimento líq./mês</span><span class="text-white font-mono">{{ fmtRS(simF.rendNet) }}</span></div>
              <div class="flex justify-between"><span>Capital após 12 meses (c/ R$4k/mês)</span><span class="text-green-400 font-mono">{{ fmtRS(simF.capital12) }}</span></div>
            </div>
            <div class="space-y-1">
              <p class="text-gray-400 font-semibold">Poupança (~6,17% a.a., isenta IR)</p>
              <div class="flex justify-between"><span>Rendimento líq./mês</span><span class="text-white font-mono">{{ fmtRS(600_000 * _poupPm) }}</span></div>
              <div class="flex justify-between"><span>Capital após 12 meses (c/ R$4k/mês)</span><span class="text-red-400 font-mono">{{ fmtRS(buildSim(600_000, _poupPm, 0, 12, () => 4_000)[12]) }}</span></div>
            </div>
          </div>
          <p class="text-red-400 text-xs font-semibold pt-1 border-t border-red-800/30">
            A Poupança rende menos da metade da Selic. Com R$4k/mês de saques, a Poupança consome o capital.
            O Tesouro Selic cresce. Essa diferença é de
            <strong class="text-white">{{ fmtRS(simF.capital12 - buildSim(600_000, _poupPm, 0, 12, () => 4_000)[12]) }}</strong>
            após 12 meses.
          </p>
        </div>

        <!-- Quando usar -->
        <div class="rounded-2xl border border-indigo-700/50 bg-indigo-950/20 p-5 space-y-4 text-sm">
          <p class="text-indigo-300 font-bold text-base">Quando o Tesouro Selic é a melhor escolha</p>
          <div class="space-y-2">
            <div class="flex items-start gap-3 bg-gray-800/50 rounded-xl p-3">
              <span class="text-indigo-400 font-black shrink-0">1</span>
              <div class="text-xs">
                <p class="text-gray-200 font-semibold mb-0.5">Reserva de emergência — sem discussão</p>
                <p class="text-gray-400">Para o dinheiro que precisa estar disponível em 24h no pior cenário, o Tesouro Selic é imbatível. Resgate em D+1, sem risco de mercado, sem haircut, rendendo mais de 14% a.a. bruto. Nenhum outro produto combina essa liquidez com esse retorno e esse risco zero.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 bg-gray-800/50 rounded-xl p-3">
              <span class="text-indigo-400 font-black shrink-0">2</span>
              <div class="text-xs">
                <p class="text-gray-200 font-semibold mb-0.5">Saques mensais regulares sem penalidade</p>
                <p class="text-gray-400">Com R$600k, o rendimento líquido de {{ fmtRS(simF.rendNet) }}/mês cobre os R$4.000 de retirada e ainda sobra {{ fmtRS(simF.surplus) }} para reinvestir. Capital após 12 meses: <strong class="text-white">{{ fmtRS(simF.capital12) }}</strong> — o patrimônio cresceu {{ fmtRS(simF.varCapital) }} mesmo sacando todo mês.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 bg-gray-800/50 rounded-xl p-3">
              <span class="text-indigo-400 font-black shrink-0">3</span>
              <div class="text-xs">
                <p class="text-gray-200 font-semibold mb-0.5">Enquanto decide onde investir</p>
                <p class="text-gray-400">Recebeu uma herança? Vendeu um imóvel? Precisa decidir onde alocar R$600k mas não quer correr riscos enquanto pesquisa? O Tesouro Selic é o "estacionamento" mais seguro e rentável do Brasil enquanto você avalia as opções.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart F -->
        <div class="border-t border-indigo-700/40 pt-4 space-y-1">
          <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider">📈 Projeção 12 meses — Tesouro Selic vs Poupança: R$4k/mês mostra a divergência real</p>
          <MiniLineChart :series="chartF" :x-labels="xLabels" />
        </div>
      </div>
    </section>

    <!-- Cenário G: Tesouro IPCA+ -->
    <section class="space-y-6">
      <div class="card space-y-5 border-purple-800/40">
        <div class="flex items-center gap-2">
          <span class="badge-purple">Cenário G</span>
          <h3 class="font-semibold text-white">Tesouro IPCA+ — Seu poder de compra protegido para sempre</h3>
        </div>

        <!-- O que é -->
        <div class="bg-purple-950/30 border border-purple-700/40 rounded-2xl p-4 space-y-3">
          <p class="text-purple-200 font-bold text-sm">O que é o Tesouro IPCA+?</p>
          <p class="text-gray-300 text-sm leading-relaxed">
            É o título <strong class="text-white">híbrido</strong> do Tesouro Nacional: paga
            <strong class="text-purple-300">IPCA + taxa real fixa</strong> (atualmente ~7,8% a.a.).
            Isso significa que seu rendimento <em>real</em> é garantido independente da inflação futura —
            se o IPCA subir para 10%, você recebe 10% + 7,8%. Se cair para 3%, você recebe 3% + 7,8%.
            É o único ativo que garante a <strong class="text-white">manutenção permanente do poder de compra</strong>
            com rentabilidade real positiva contratada.
          </p>
          <div class="bg-gray-900/60 border border-purple-800/30 rounded-xl p-3 text-xs">
            <p class="text-purple-300 font-semibold mb-1">Como o rendimento é calculado:</p>
            <div class="font-mono text-center text-purple-200 py-1">
              (1 + IPCA) × (1 + 7,8%) − 1 = (1,055 × 1,078) − 1 ≈ {{ (simG.taxaAaNom).toFixed(2) }}% a.a. nominal
            </div>
            <p class="text-gray-500 text-center mt-1">Com IPCA projetado de 5,5% a.a. (FOCUS/BCB)</p>
          </div>
        </div>

        <!-- Key metrics -->
        <div class="grid grid-cols-3 gap-3 text-sm text-center">
          <div class="bg-gray-800/60 rounded-xl p-3">
            <p class="text-gray-500 text-xs mb-1">Taxa nominal atual</p>
            <p class="text-purple-400 font-black text-xl">~{{ simG.taxaAaNom.toFixed(2) }}%</p>
            <p class="text-gray-600 text-xs">a.a. (IPCA 5,5% + 7,8% real)</p>
          </div>
          <div class="bg-green-900/20 border border-green-800/30 rounded-xl p-3">
            <p class="text-gray-500 text-xs mb-1">Rendimento líq./mês</p>
            <p class="text-green-400 font-black text-xl">{{ fmtRS(simG.rendNet) }}</p>
            <p class="text-gray-600 text-xs">após IR 22,5%</p>
          </div>
          <div class="bg-teal-900/20 border border-teal-800/30 rounded-xl p-3">
            <p class="text-gray-500 text-xs mb-1">Capital após 12 meses</p>
            <p class="text-teal-400 font-black text-xl">{{ fmtRS(simG.capital12) }}</p>
            <p class="text-gray-600 text-xs">+{{ fmtRS(simG.varCapital) }} vs capital inicial</p>
          </div>
        </div>

        <!-- Marcação a mercado -->
        <div class="rounded-2xl border border-orange-700/50 bg-orange-950/25 p-5 space-y-3 text-sm">
          <p class="text-orange-300 font-bold text-base">⚠ O alerta mais importante do IPCA+: marcação a mercado</p>
          <p class="text-gray-300 leading-relaxed">
            O IPCA+ é o investimento ideal para o <strong class="text-white">longo prazo</strong> — mas tem um risco que muitos investidores descobrem da pior forma.
            Se você precisar vender antes do vencimento, receberá o <strong class="text-white">preço de mercado</strong> do dia, não a taxa contratada.
          </p>
          <div class="grid sm:grid-cols-2 gap-3 text-xs">
            <div class="bg-red-900/20 border border-red-800/30 rounded-xl p-3 space-y-1">
              <p class="text-red-400 font-semibold">Se a taxa de juros sobe após sua compra:</p>
              <p class="text-gray-400">O preço do seu título cai no mercado secundário. Se vender antes do vencimento, pode ter <strong class="text-red-300">rentabilidade negativa</strong> — mesmo que o título em si esteja "rendendo".</p>
              <p class="text-red-500 font-semibold">Regra: Selic sobe → preço do IPCA+ cai.</p>
            </div>
            <div class="bg-green-900/20 border border-green-800/30 rounded-xl p-3 space-y-1">
              <p class="text-green-400 font-semibold">Se a taxa de juros cai após sua compra:</p>
              <p class="text-gray-400">O preço sobe acima do valor contratado. Se vender antes do vencimento, realiza um <strong class="text-green-300">lucro extra</strong> — acima da taxa acordada.</p>
              <p class="text-green-500 font-semibold">Regra: Selic cai → preço do IPCA+ sobe.</p>
            </div>
          </div>
          <div class="bg-orange-900/20 border border-orange-800/40 rounded-xl p-3 text-xs">
            <p class="text-orange-200 font-semibold">A solução é simples: compre somente se puder levar ao vencimento.</p>
            <p class="text-gray-400 mt-1">Tesouro IPCA+ 2035, 2040, 2045 — para quem tem horizonte de 10+ anos.
              Para quem precisa de flexibilidade de saque, o Tesouro Selic é mais adequado.</p>
          </div>
        </div>

        <!-- Por que o IPCA+ supera o CDB no longo prazo -->
        <div class="rounded-2xl border border-purple-700/50 bg-purple-950/20 p-5 space-y-3 text-sm">
          <p class="text-purple-300 font-bold text-base">Por que o IPCA+ supera qualquer CDB no longo prazo</p>
          <div class="space-y-2">
            <div class="flex items-start gap-3 bg-gray-800/50 rounded-xl p-3">
              <span class="text-purple-400 font-black shrink-0">1</span>
              <div class="text-xs">
                <p class="text-gray-200 font-semibold mb-0.5">Proteção contra inflação: o CDB não tem</p>
                <p class="text-gray-400">Um CDB a 109% CDI paga hoje 109% × 14,65% = ~15,97% bruto. Mas se a Selic cair para 10% e a inflação subir para 8%, seu CDB rende 109% × 10% = 10,9% bruto. Com inflação a 8%, o ganho real é mísero. O IPCA+ de 7,8% real garantiu 7,8% acima da inflação — qualquer que seja ela.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 bg-gray-800/50 rounded-xl p-3">
              <span class="text-purple-400 font-black shrink-0">2</span>
              <div class="text-xs">
                <p class="text-gray-200 font-semibold mb-0.5">A taxa real de 7,8% a.a. é historicamente excepcional</p>
                <p class="text-gray-400">O Brasil figura constantemente no topo mundial em juros reais. Taxas reais de 7-8% a.a. garantidas pelo governo são raras globalmente. Em 2026, com a Selic em 14,65% e IPCA a 5,5%, o IPCA+ 2035 a IPCA+7,8% representa uma janela histórica de bloqueio de rentabilidade real para décadas.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 bg-gray-800/50 rounded-xl p-3">
              <span class="text-purple-400 font-black shrink-0">3</span>
              <div class="text-xs">
                <p class="text-gray-200 font-semibold mb-0.5">Para R$4k/mês de saques: funciona, mas com margem estreita</p>
                <p class="text-gray-400">Com R$600k a {{ simG.taxaAaNom.toFixed(2) }}% nominal, o rendimento líquido mensal é <strong class="text-white">{{ fmtRS(simG.rendNet) }}</strong> — acima dos R$4.000 por <strong class="text-white">{{ fmtRS(simG.surplus) }}</strong>. Capital após 12 meses: <strong class="text-white">{{ fmtRS(simG.capital12) }}</strong>. Funciona, mas a margem é menor que no Tesouro Selic atual (Selic excepcionalmente alta).</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart G -->
        <div class="border-t border-purple-700/40 pt-4 space-y-1">
          <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider">📈 Projeção 12 meses — IPCA+ vs CDB 109% CDI: R$4k/mês — o CDB ganha hoje, mas perde no longo prazo</p>
          <MiniLineChart :series="chartG" :x-labels="xLabels" />
        </div>
      </div>
    </section>

    <!-- Cenário H: Tesouro Pré-fixado -->
    <section class="space-y-6">
      <div class="card space-y-5 border-emerald-800/40">
        <div class="flex items-center gap-2">
          <span class="badge-emerald">Cenário H</span>
          <h3 class="font-semibold text-white">Tesouro Pré-fixado — Bloqueando a taxa mais alta da história antes que a Selic caia</h3>
        </div>

        <!-- O que é -->
        <div class="bg-emerald-950/30 border border-emerald-700/40 rounded-2xl p-4 space-y-3">
          <p class="text-emerald-200 font-bold text-sm">O que é o Tesouro Pré-fixado?</p>
          <p class="text-gray-300 text-sm leading-relaxed">
            É o título público com <strong class="text-white">taxa fixa e imutável</strong> definida no momento da compra.
            Se você comprar hoje a <strong class="text-emerald-300">13,5% a.a.</strong>, receberá exatamente essa taxa
            independente do que acontecer com a Selic, a inflação ou a economia — desde que mantenha o título
            até o vencimento. É uma aposta explícita: você acredita que as taxas de hoje são altas e que vão cair.
          </p>
          <div class="bg-gray-900/60 border border-emerald-800/30 rounded-xl p-3 text-xs space-y-1.5">
            <p class="text-emerald-300 font-semibold">A lógica da estratégia — por que comprar Pré-fixado agora?</p>
            <p class="text-gray-400">A Selic está em <strong class="text-white">14,65% a.a.</strong> — nível historicamente elevado, pressionado pelo teto do ciclo de aperto monetário.
              O mercado projeta queda gradual nos próximos anos. Se você comprar Tesouro Pré a 13,5% hoje
              e a Selic cair para 10%, seu título continuará pagando 13,5%.
              O investidor que entrou depois a 10% ganha menos. <strong class="text-emerald-300">Você ganhou mais — para sempre, até o vencimento.</strong>
            </p>
          </div>
        </div>

        <!-- Key metrics -->
        <div class="grid grid-cols-3 gap-3 text-sm text-center">
          <div class="bg-gray-800/60 rounded-xl p-3">
            <p class="text-gray-500 text-xs mb-1">Taxa garantida</p>
            <p class="text-emerald-400 font-black text-xl">{{ simH.taxaAa.toFixed(1) }}%</p>
            <p class="text-gray-600 text-xs">a.a. — taxa fixa</p>
          </div>
          <div class="bg-green-900/20 border border-green-800/30 rounded-xl p-3">
            <p class="text-gray-500 text-xs mb-1">Rendimento líq./mês</p>
            <p class="text-green-400 font-black text-xl">{{ fmtRS(simH.rendNet) }}</p>
            <p class="text-gray-600 text-xs">após IR 22,5%</p>
          </div>
          <div class="bg-teal-900/20 border border-teal-800/30 rounded-xl p-3">
            <p class="text-gray-500 text-xs mb-1">Capital após 12 meses</p>
            <p class="text-teal-400 font-black text-xl">{{ fmtRS(simH.capital12) }}</p>
            <p class="text-gray-600 text-xs">+{{ fmtRS(simH.varCapital) }} vs capital inicial</p>
          </div>
        </div>

        <!-- O duplo fio da navalha -->
        <div class="rounded-2xl border border-orange-700/50 bg-orange-950/25 p-5 space-y-3 text-sm">
          <p class="text-orange-300 font-bold text-base">⚠ Marcação a mercado — o fio de navalha do Pré-fixado</p>
          <p class="text-gray-300 leading-relaxed text-sm">
            O Pré-fixado tem <strong class="text-white">risco de marcação a mercado bilateral</strong>:
            pode ser seu maior aliado ou seu pior inimigo — dependendo da direção dos juros e de quando você sai.
          </p>
          <div class="grid sm:grid-cols-2 gap-4 text-xs">
            <div class="space-y-2">
              <div class="bg-green-900/20 border border-green-800/30 rounded-xl p-3 space-y-1">
                <p class="text-green-400 font-bold">Cenário favorável: Selic cai para 10%</p>
                <p class="text-gray-400">Você está com 13,5% garantido. O mercado passou a oferecer 10%.
                  Quem quiser comprar seu título vai pagar <em>mais caro</em> por ele (pois rende mais que o mercado).
                  Se vender antes do vencimento: <strong class="text-green-300">lucro extra acima da taxa contratada</strong>.</p>
                <p class="text-green-500 font-semibold">→ Possível ganho de 5–15% além do esperado</p>
              </div>
              <div class="bg-red-900/20 border border-red-800/30 rounded-xl p-3 space-y-1">
                <p class="text-red-400 font-bold">Cenário adverso: Selic sobe para 17%</p>
                <p class="text-gray-400">Você tem 13,5%. O mercado passou a oferecer 17%.
                  Quem quiser comprar seu título vai pagar <em>menos</em> (pois rende menos que o mercado).
                  Se vender antes do vencimento: <strong class="text-red-300">perda sobre o valor de compra</strong>.</p>
                <p class="text-red-500 font-semibold">→ Possível perda nominal se vender antes</p>
              </div>
            </div>
            <div class="bg-gray-800/50 border border-gray-700 rounded-xl p-3 space-y-3 text-xs">
              <p class="text-gray-300 font-semibold">A regra de ouro do Pré-fixado:</p>
              <div class="space-y-1.5">
                <div class="flex items-start gap-2">
                  <span class="text-emerald-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-400"><strong class="text-white">Se vai levar ao vencimento:</strong> risco zero de MtM. Você recebe exatamente 13,5% a.a. Seja qual for a Selic no caminho.</p>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-yellow-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-400"><strong class="text-white">Se precisar sair antes:</strong> depende da direção dos juros. Se Selic caiu: ganho. Se Selic subiu: perda. A incerteza é real.</p>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-red-400 shrink-0 font-bold mt-0.5">▸</span>
                  <p class="text-gray-400"><strong class="text-white">Para saques mensais regulares:</strong> o Pré-fixado <em>não é o ideal</em>. Cada saque é uma venda parcial a preço de mercado. Use o Tesouro Selic para saques e o Pré-fixado para a parte que vai ficar parada até o vencimento.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comparação dos três -->
        <div class="card space-y-3 border-gray-700/60">
          <p class="text-gray-400 text-xs font-semibold uppercase tracking-wider">Comparação direta — R$600k com R$4k/mês de saques durante 12 meses</p>
          <div class="overflow-x-auto">
            <table class="w-full text-xs">
              <thead>
                <tr class="text-gray-500 text-[10px] uppercase tracking-wider border-b border-gray-800">
                  <th class="text-left py-2 pr-3">Produto</th>
                  <th class="text-right py-2 pr-3">Taxa a.a.</th>
                  <th class="text-right py-2 pr-3">Rend. líq./mês</th>
                  <th class="text-right py-2 pr-3">Capital 12 meses</th>
                  <th class="text-left py-2">Risco MtM</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-800">
                <tr class="hover:bg-gray-800/40">
                  <td class="py-2.5 pr-3 text-indigo-300 font-semibold">Tesouro Selic</td>
                  <td class="py-2.5 pr-3 text-right text-gray-300">{{ simF.taxaAa.toFixed(2) }}%</td>
                  <td class="py-2.5 pr-3 text-right text-green-400">{{ fmtRS(simF.rendNet) }}</td>
                  <td class="py-2.5 pr-3 text-right text-green-400 font-semibold">{{ fmtRS(simF.capital12) }}</td>
                  <td class="py-2.5 text-green-400 text-[10px]">Zero</td>
                </tr>
                <tr class="hover:bg-gray-800/40">
                  <td class="py-2.5 pr-3 text-purple-300 font-semibold">Tesouro IPCA+ (~{{ simG.taxaAaNom.toFixed(1) }}%)</td>
                  <td class="py-2.5 pr-3 text-right text-gray-300">~{{ simG.taxaAaNom.toFixed(2) }}%</td>
                  <td class="py-2.5 pr-3 text-right text-green-400">{{ fmtRS(simG.rendNet) }}</td>
                  <td class="py-2.5 pr-3 text-right text-green-400 font-semibold">{{ fmtRS(simG.capital12) }}</td>
                  <td class="py-2.5 text-yellow-400 text-[10px]">Médio (longo prazo)</td>
                </tr>
                <tr class="hover:bg-gray-800/40">
                  <td class="py-2.5 pr-3 text-emerald-300 font-semibold">Tesouro Pré-fixado</td>
                  <td class="py-2.5 pr-3 text-right text-gray-300">{{ simH.taxaAa.toFixed(1) }}%</td>
                  <td class="py-2.5 pr-3 text-right text-green-400">{{ fmtRS(simH.rendNet) }}</td>
                  <td class="py-2.5 pr-3 text-right text-green-400 font-semibold">{{ fmtRS(simH.capital12) }}</td>
                  <td class="py-2.5 text-yellow-400 text-[10px]">Médio (antes do vencto.)</td>
                </tr>
                <tr class="hover:bg-gray-800/40 bg-gray-800/20">
                  <td class="py-2.5 pr-3 text-yellow-300 font-semibold">CDB 109% CDI</td>
                  <td class="py-2.5 pr-3 text-right text-gray-300">~15,97%</td>
                  <td class="py-2.5 pr-3 text-right text-yellow-400">{{ fmtRS(600_000 * _r109 * 0.775) }}</td>
                  <td class="py-2.5 pr-3 text-right text-yellow-400 font-semibold">{{ fmtRS(buildSim(600_000, _r109, 0.225, 12, () => 4_000)[12]) }}</td>
                  <td class="py-2.5 text-green-400 text-[10px]">Baixo (liq. diária)</td>
                </tr>
                <tr class="hover:bg-gray-800/40">
                  <td class="py-2.5 pr-3 text-gray-500 font-semibold">Poupança</td>
                  <td class="py-2.5 pr-3 text-right text-gray-500">~6,17%</td>
                  <td class="py-2.5 pr-3 text-right text-red-400">{{ fmtRS(600_000 * _poupPm) }}</td>
                  <td class="py-2.5 pr-3 text-right text-red-400 font-semibold">{{ fmtRS(buildSim(600_000, _poupPm, 0, 12, () => 4_000)[12]) }}</td>
                  <td class="py-2.5 text-green-400 text-[10px]">Zero</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-gray-600 border-t border-gray-800 pt-2">
            Simulação com CDI = 14,65% a.a. · IPCA projetado = 5,5% a.a. · Tesouro IPCA+ = IPCA + 7,8% · Tesouro Pré = 13,5% a.a.
            IR = 22,5% aplicado uniformemente para comparação. Poupança isenta de IR.
          </p>
        </div>

        <!-- Chart H -->
        <div class="border-t border-emerald-700/40 pt-4 space-y-1">
          <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider">📈 Projeção 12 meses — Pré-fixado 13,5% vs CDB 109% CDI: R$4k/mês</p>
          <MiniLineChart :series="chartH" :x-labels="xLabels" />
        </div>
      </div>
    </section>

    <!-- ── Cenário I: A estratégia profissional ────────────────────────────── -->
    <section class="space-y-5">

      <!-- Cabeçalho do cenário -->
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-gray-500 font-mono text-xs bg-gray-800 px-2.5 py-1 rounded-full">Cenário I</span>
        <span class="badge-amber">Estratégia avançada</span>
        <span class="badge-blue">FGC maximizado</span>
        <span class="badge-yellow">Mercado secundário</span>
      </div>

      <div>
        <h2 class="section-title">A estratégia profissional: FGC + deságio no mercado secundário</h2>
        <p class="text-gray-400 leading-relaxed">
          Um investidor sofisticado com R$ 600.000,00 não alocaria tudo num único banco nem esperaria
          pelas taxas de balcão. Ele dividiria o capital em <strong class="text-white">três instituições</strong>,
          usaria o mercado secundário para comprar CDBs com deságio e garantiria cobertura total do FGC
          em cada posição.
        </p>
      </div>

      <!-- Divisão dos R$ 600 k -->
      <div class="card space-y-5">
        <h3 class="font-semibold text-white">Divisão do capital — cobertura FGC completa</h3>

        <div class="grid sm:grid-cols-3 gap-4">
          <!-- Banco A -->
          <div class="bg-blue-900/20 border border-blue-800/50 rounded-xl p-4 space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xs">A</span>
              <span class="text-blue-300 font-semibold text-sm">Banco A</span>
            </div>
            <p class="text-blue-100 font-black text-2xl">R$ 100k</p>
            <p class="text-blue-400 text-xs leading-relaxed">Fundo de saques — líquido, CDB com liquidez diária ou Tesouro Selic. Cobre 24 meses de retiradas (R$ 4.000 × 24).</p>
            <div class="border-t border-blue-800/50 pt-2 space-y-1 text-xs text-blue-300">
              <div class="flex justify-between"><span>Taxa efetiva</span><span class="font-semibold">109% CDI</span></div>
              <div class="flex justify-between"><span>Rend. liq./mês</span><span class="font-semibold">{{ fmtRS(simI.bankANetMes) }}</span></div>
              <div class="flex justify-between"><span>Saldo em 12 m</span><span class="font-semibold">{{ fmtRS(simI.bankA12) }}</span></div>
            </div>
          </div>

          <!-- Banco B -->
          <div class="bg-amber-900/20 border border-amber-800/50 rounded-xl p-4 space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-white font-black text-xs">B</span>
              <span class="text-amber-300 font-semibold text-sm">Banco B</span>
            </div>
            <p class="text-amber-100 font-black text-2xl">R$ 250k</p>
            <p class="text-amber-400 text-xs leading-relaxed">CDBs de mercado secundário com deságio. Muitos títulos pequenos — reduz risco de liquidez própria. Limite FGC máximo.</p>
            <div class="border-t border-amber-800/50 pt-2 space-y-1 text-xs text-amber-300">
              <div class="flex justify-between"><span>Taxa efetiva (est.)</span><span class="font-semibold">~130% CDI</span></div>
              <div class="flex justify-between"><span>FGC coberto</span><span class="font-semibold text-green-400">✓ 100%</span></div>
              <div class="flex justify-between"><span>Saldo em 12 m</span><span class="font-semibold">{{ fmtRS(simI.bankBC12 / 2) }}</span></div>
            </div>
          </div>

          <!-- Banco C -->
          <div class="bg-amber-900/20 border border-amber-800/50 rounded-xl p-4 space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white font-black text-xs">C</span>
              <span class="text-amber-300 font-semibold text-sm">Banco C</span>
            </div>
            <p class="text-amber-100 font-black text-2xl">R$ 250k</p>
            <p class="text-amber-400 text-xs leading-relaxed">Mesmo princípio do Banco B. Segunda instituição separada garante cobertura FGC independente. Diversificação total de risco de crédito.</p>
            <div class="border-t border-amber-800/50 pt-2 space-y-1 text-xs text-amber-300">
              <div class="flex justify-between"><span>Taxa efetiva (est.)</span><span class="font-semibold">~130% CDI</span></div>
              <div class="flex justify-between"><span>FGC coberto</span><span class="font-semibold text-green-400">✓ 100%</span></div>
              <div class="flex justify-between"><span>Saldo em 12 m</span><span class="font-semibold">{{ fmtRS(simI.bankBC12 / 2) }}</span></div>
            </div>
          </div>
        </div>

        <!-- Totais -->
        <div class="bg-gray-800/60 rounded-xl p-4 grid sm:grid-cols-4 gap-4 text-center">
          <div>
            <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Capital inicial</p>
            <p class="text-white font-black text-lg">R$ 600.000</p>
          </div>
          <div>
            <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Saldo em 12 meses</p>
            <p class="text-amber-400 font-black text-lg">{{ fmtRS(simI.total12) }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Saldo em 24 meses</p>
            <p class="text-amber-400 font-black text-lg">{{ fmtRS(simI.total24) }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Vantagem vs CDB simples</p>
            <p class="text-green-400 font-black text-lg">+{{ fmtRS(simI.advantage12) }}</p>
            <p class="text-gray-600 text-xs">em 12 meses</p>
          </div>
        </div>
      </div>

      <!-- Como funciona o deságio -->
      <div class="card space-y-4">
        <h3 class="font-semibold text-white">Como o deságio do mercado secundário funciona</h3>
        <p class="text-gray-400 text-sm leading-relaxed">
          No mercado secundário, você compra CDBs de outros investidores que <em>precisam vender antes do vencimento</em>.
          Quem vende aceita receber menos do que o título vale — o chamado <strong class="text-white">deságio</strong>.
          Para você, comprador, esse desconto se traduz numa rentabilidade efetiva maior do que a taxa original do papel.
        </p>

        <div class="bg-gray-800/60 rounded-xl p-4 space-y-3 text-sm">
          <p class="text-gray-300 font-semibold">Exemplo concreto:</p>
          <div class="grid sm:grid-cols-3 gap-3 text-center">
            <div class="bg-gray-900 rounded-lg p-3">
              <p class="text-gray-500 text-xs mb-1">Título original</p>
              <p class="text-white font-bold">CDB 110% CDI</p>
              <p class="text-gray-400 text-xs">Vence em 18 meses</p>
              <p class="text-gray-400 text-xs">Valor justo: R$ 25.000</p>
            </div>
            <div class="bg-red-900/30 rounded-lg p-3 border border-red-800/50">
              <p class="text-red-400 text-xs mb-1">Vendedor (urgência)</p>
              <p class="text-white font-bold">Vende por R$ 23.800</p>
              <p class="text-red-400 text-xs">Desconto de 4,8%</p>
              <p class="text-gray-400 text-xs">Necessidade de liquidez</p>
            </div>
            <div class="bg-green-900/30 rounded-lg p-3 border border-green-800/50">
              <p class="text-green-400 text-xs mb-1">Comprador (você)</p>
              <p class="text-white font-bold">Recebe R$ 25.000</p>
              <p class="text-green-400 text-xs">+R$ 1.200 de ganho extra</p>
              <p class="text-gray-400 text-xs">≈ 130–140% CDI efetivo</p>
            </div>
          </div>
        </div>

        <div class="bg-yellow-900/20 border border-yellow-800/50 rounded-xl p-4 text-sm text-yellow-300 space-y-2">
          <p class="font-semibold">⚠️ O que analisar antes de comprar no secundário:</p>
          <ul class="space-y-1 text-yellow-200/80 list-none">
            <li>✦ <strong>Solidez do emissor:</strong> o FGC cobre até R$ 250k por CPF por instituição — mas o FGC só paga após a decretação de intervenção ou liquidação. Há um intervalo de meses sem acesso ao capital.</li>
            <li>✦ <strong>Prazo restante:</strong> prefira vencimentos dentro do seu horizonte de investimento (≤ 24 meses no cenário atual).</li>
            <li>✦ <strong>IR já incorrido:</strong> o IR é cobrado sobre o ganho total desde a emissão original — não apenas sobre o período que você ficou com o papel.</li>
            <li>✦ <strong>Liquidez de saída:</strong> se você precisar vender antes do vencimento, também entrará no secundário como vendedor. Quanto mais diversificado (muitos títulos pequenos), menor o impacto de um eventual deságio de saída.</li>
          </ul>
        </div>
      </div>

      <!-- Por que diversificar dentro de B e C -->
      <div class="card space-y-4">
        <h3 class="font-semibold text-white">Por que comprar muitos CDBs pequenos em vez de um grande?</h3>
        <div class="grid sm:grid-cols-2 gap-4 text-sm">
          <div class="bg-red-900/20 border border-red-800/40 rounded-xl p-4 space-y-2">
            <p class="text-red-300 font-semibold">❌ Concentração: 1 CDB de R$ 250k</p>
            <ul class="text-gray-400 space-y-1 list-none">
              <li>• Se você precisar de R$ 50k de volta, precisa vender o título inteiro</li>
              <li>• Deságio calculado sobre R$ 250k — perda maior em valor absoluto</li>
              <li>• Se o emissor tiver problema: R$ 250k travados até o FGC pagar</li>
              <li>• Nenhuma flexibilidade de gestão</li>
            </ul>
          </div>
          <div class="bg-green-900/20 border border-green-800/40 rounded-xl p-4 space-y-2">
            <p class="text-green-300 font-semibold">✓ Diversificação: 10 CDBs de R$ 25k cada</p>
            <ul class="text-gray-400 space-y-1 list-none">
              <li>• Precisa de R$ 50k? Vende apenas 2 títulos, os outros continuam rendendo</li>
              <li>• Deságio de saída sobre R$ 25k — impacto percentualmente equivalente, mas controlável</li>
              <li>• Pode escalonar vencimentos: alguns em 6 m, outros em 12 m, 18 m, 24 m</li>
              <li>• Maior liquidez real na prática</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Resultados projetados -->
      <div class="card space-y-4">
        <h3 class="font-semibold text-white">Resultados projetados — Estratégia I</h3>
        <div class="grid sm:grid-cols-2 gap-6">
          <div class="space-y-3">
            <p class="text-gray-500 text-xs uppercase tracking-wider font-semibold">12 meses</p>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between border-b border-gray-800 pb-1">
                <span class="text-gray-400">Banco A (R$100k, R$4k/mês)</span>
                <span class="text-blue-400 font-semibold">{{ fmtRS(simI.bankA12) }}</span>
              </div>
              <div class="flex justify-between border-b border-gray-800 pb-1">
                <span class="text-gray-400">Bancos B+C (R$500k, s/ retirada)</span>
                <span class="text-amber-400 font-semibold">{{ fmtRS(simI.bankBC12) }}</span>
              </div>
              <div class="flex justify-between border-b border-gray-800 pb-1">
                <span class="text-gray-400">Saques realizados</span>
                <span class="text-red-400 font-semibold">−R$ 48.000</span>
              </div>
              <div class="flex justify-between pt-1">
                <span class="text-white font-semibold">Total patrimonial</span>
                <span class="text-amber-300 font-black text-base">{{ fmtRS(simI.total12) }}</span>
              </div>
            </div>
          </div>
          <div class="space-y-3">
            <p class="text-gray-500 text-xs uppercase tracking-wider font-semibold">24 meses (ao final)</p>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between border-b border-gray-800 pb-1">
                <span class="text-gray-400">Banco A (esgotado ~mês 24)</span>
                <span class="text-blue-400 font-semibold">{{ fmtRS(simI.bankA24) }}</span>
              </div>
              <div class="flex justify-between border-b border-gray-800 pb-1">
                <span class="text-gray-400">Bancos B+C (sem retiradas)</span>
                <span class="text-amber-400 font-semibold">{{ fmtRS(simI.bankBC24) }}</span>
              </div>
              <div class="flex justify-between border-b border-gray-800 pb-1">
                <span class="text-gray-400">Total sacado em 24 meses</span>
                <span class="text-red-400 font-semibold">−{{ fmtRS(simI.totalRetirado24) }}</span>
              </div>
              <div class="flex justify-between pt-1">
                <span class="text-white font-semibold">Total patrimonial</span>
                <span class="text-amber-300 font-black text-base">{{ fmtRS(simI.total24) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Comparação vs estratégia simples -->
        <div class="border-t border-gray-700 pt-4">
          <p class="text-gray-500 text-xs uppercase tracking-wider mb-3 font-semibold">Estratégia I vs abordagem simples (tudo em CDB 109% CDI com saques)</p>
          <div class="grid sm:grid-cols-3 gap-3 text-center text-sm">
            <div class="bg-gray-800/60 rounded-lg p-3">
              <p class="text-gray-500 text-xs mb-1">CDB 109% c/ saques</p>
              <p class="text-white font-bold">{{ fmtRS(simI.simpleAll12) }}</p>
              <p class="text-gray-500 text-xs">em 12 meses</p>
            </div>
            <div class="bg-amber-900/30 rounded-lg p-3 border border-amber-800/40">
              <p class="text-amber-400 text-xs mb-1">Estratégia I (total)</p>
              <p class="text-amber-300 font-bold">{{ fmtRS(simI.total12) }}</p>
              <p class="text-gray-500 text-xs">em 12 meses</p>
            </div>
            <div class="bg-green-900/30 rounded-lg p-3 border border-green-800/40">
              <p class="text-green-400 text-xs mb-1">Vantagem do deságio</p>
              <p class="text-green-300 font-bold">+{{ fmtRS(simI.advantage12) }}</p>
              <p class="text-gray-500 text-xs">ganho adicional em 12 m</p>
            </div>
          </div>
        </div>

        <!-- Chart I -->
        <div class="border-t border-amber-700/40 pt-4 space-y-1">
          <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider">📈 Projeção 12 meses — Estratégia I (total) vs CDB simples vs Banco A</p>
          <MiniLineChart :series="chartI" :x-labels="xLabels" />
        </div>
      </div>

      <!-- Nota: quanto de deságio esperar na prática -->
      <div class="bg-gray-900 border border-gray-700 rounded-2xl p-5 space-y-4">
        <p class="text-gray-300 font-semibold text-sm">📌 Nota: quanto deságio você pode realmente encontrar no secundário?</p>
        <p class="text-gray-400 text-sm leading-relaxed">
          O deságio no mercado secundário não é uniforme — ele depende de <strong class="text-white">duas variáveis independentes</strong>:
          o <em>risco de crédito do emissor</em> e a <em>urgência de quem está vendendo</em>.
          Entendê-las evita expectativas irreais sobre a rentabilidade efetiva.
        </p>

        <div class="grid sm:grid-cols-2 gap-4 text-sm">
          <!-- Variável 1: risco do emissor -->
          <div class="space-y-3">
            <p class="text-white font-semibold text-xs uppercase tracking-wider">Variável 1 — Risco do emissor</p>
            <div class="bg-green-900/20 border border-green-800/40 rounded-xl p-3 space-y-1">
              <p class="text-green-300 font-semibold">Bancos grandes e sólidos</p>
              <p class="text-gray-400 text-xs leading-relaxed">
                Muitos compradores disponíveis → pouca necessidade de desconto para atrair interesse.
                Deságio típico: <strong class="text-white">0,1% a 0,5% ao ano</strong> sobre o prazo restante.
                Em títulos com 12 meses para vencer: desconto total de ~0,5% a 2% sobre o valor do papel.
              </p>
            </div>
            <div class="bg-yellow-900/20 border border-yellow-800/40 rounded-xl p-3 space-y-1">
              <p class="text-yellow-300 font-semibold">Bancos médios (risco moderado)</p>
              <p class="text-gray-400 text-xs leading-relaxed">
                Base de compradores menor. O mercado exige prêmio para absorver o risco.
                Deságio típico: <strong class="text-white">2% a 8%</strong> sobre o valor de face,
                dependendo do prazo restante e das condições de mercado.
                Pode chegar a ~130% CDI efetivo para o comprador.
              </p>
            </div>
            <div class="bg-red-900/20 border border-red-800/40 rounded-xl p-3 space-y-1">
              <p class="text-red-300 font-semibold">Bancos pequenos / em stress</p>
              <p class="text-gray-400 text-xs leading-relaxed">
                Poucos compradores dispostos. O desconto precisa compensar o risco de crédito.
                Deságio pode atingir <strong class="text-white">20% a 40%</strong> do valor original —
                com yields chegando a 160–175% do CDI para o comprador.
                <span class="text-red-400">(Dado real: crise de banco médio em 2025 — yields subiram de IPCA+19% para IPCA+31,75% em 24 horas)</span>
              </p>
            </div>
          </div>

          <!-- Variável 2: urgência do vendedor -->
          <div class="space-y-3">
            <p class="text-white font-semibold text-xs uppercase tracking-wider">Variável 2 — Urgência do vendedor</p>
            <div class="bg-blue-900/20 border border-blue-800/40 rounded-xl p-3 space-y-1">
              <p class="text-blue-300 font-semibold">Vendedor sem pressa</p>
              <p class="text-gray-400 text-xs leading-relaxed">
                Coloca o papel no secundário com preço próximo ao justo e espera o comprador certo.
                Mesmo para bancos sólidos, pode conseguir desconto mínimo.
                A <strong class="text-white">oportunidade de compra aqui é rara</strong> — papéis bons raramente entram no secundário com pressa.
              </p>
            </div>
            <div class="bg-orange-900/20 border border-orange-800/40 rounded-xl p-3 space-y-1">
              <p class="text-orange-300 font-semibold">Vendedor com urgência real</p>
              <p class="text-gray-400 text-xs leading-relaxed">
                Precisa do dinheiro em horas ou dias. Aceita qualquer desconto para fechar.
                Mesmo títulos de <strong class="text-white">bancos sólidos</strong> podem aparecer com
                5–15% de deságio quando o vendedor está em aperto financeiro pessoal.
                <span class="text-orange-400">Essa é a oportunidade que o Cenário I busca nos Bancos B e C.</span>
              </p>
            </div>
            <div class="bg-gray-800/60 rounded-xl p-3 space-y-1">
              <p class="text-gray-300 font-semibold">Combinação ideal para o comprador</p>
              <p class="text-gray-400 text-xs leading-relaxed">
                Banco emissor sólido <strong class="text-white">+</strong> vendedor em urgência financeira.
                Risco baixo para você + deságio alto = rentabilidade excepcional.
                É infrequente, mas ocorre — e exige monitoramento ativo do secundário.
              </p>
            </div>
          </div>
        </div>

        <!-- Alerta sobre a estimativa 130% CDI -->
        <div class="bg-amber-900/20 border border-amber-800/50 rounded-xl p-3 text-xs text-amber-300 space-y-1">
          <p class="font-semibold">⚡ Sobre a estimativa de 130% CDI usada neste cenário:</p>
          <p class="text-gray-400 leading-relaxed">
            Os cálculos acima usam 130% CDI como taxa efetiva para os Bancos B e C.
            Esse valor é <strong class="text-white">alcançável em papéis de bancos médios com deságio razoável</strong>
            (5–10% sobre o valor de face), mas <em>não é garantido</em>.
            Em bancos grandes, o deságio típico provavelmente resulta em 110–120% CDI efetivo.
            Em bancos pequenos em stress, pode superar 140% CDI — mas o risco aumenta proporcionalmente.
            <strong class="text-white">A diversificação em muitos títulos pequenos existe exatamente para não depender de uma única aposta.</strong>
          </p>
        </div>
      </div>

      <!-- Riscos e cuidados -->
      <div class="bg-red-950/30 border border-red-800/50 rounded-2xl p-5 space-y-3">
        <p class="text-red-300 font-bold text-base">⚠️ Riscos que esta estratégia não elimina</p>
        <div class="grid sm:grid-cols-2 gap-4 text-sm text-gray-400">
          <div class="space-y-1">
            <p class="text-white font-medium">Risco de timing do FGC</p>
            <p>O FGC não é imediato. Em caso de intervenção, o capital fica bloqueado por meses. Bancos B e C não devem ser os únicos suportes de liquidez — por isso o Banco A é essencial.</p>
          </div>
          <div class="space-y-1">
            <p class="text-white font-medium">Risco de análise do emissor</p>
            <p>CDBs no secundário com deságio grande podem sinalizar stress financeiro do emissor. Avalie o rating, o porte e as notícias recentes antes de comprar — não compre só pelo rendimento.</p>
          </div>
          <div class="space-y-1">
            <p class="text-white font-medium">Risco de IR acumulado</p>
            <p>O IR sobre CDB no secundário incide sobre o ganho total desde a emissão original. Se o papel foi emitido há poucos meses, a alíquota pode ser 22,5% — mesmo que você compre faltando 20 meses para vencer.</p>
          </div>
          <div class="space-y-1">
            <p class="text-white font-medium">Risco de liquidez de saída</p>
            <p>Se você precisar vender antes do vencimento, entrará como vendedor no secundário e sofrerá deságio. A diversificação em muitos títulos pequenos reduz — mas não elimina — esse risco.</p>
          </div>
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

    <!-- ── Referências ─────────────────────────────────────────────────────── -->
    <section class="space-y-6 border-t border-gray-800 pt-10">
      <div>
        <p class="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-1">Fontes e referências</p>
        <h2 class="text-xl font-bold text-white">Dados analisados e monitorados diariamente</h2>
        <p class="text-gray-500 text-sm mt-1">
          Todos os valores exibidos nesta página — taxas, projeções, IPCA, CDI, Selic, IR — são atualizados com base
          nestas fontes oficiais e verificadas. Clique em qualquer link para acessar os dados originais.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 gap-4">

        <!-- ANBIMA -->
        <a href="https://data.anbima.com.br" target="_blank" rel="noopener noreferrer"
           class="group block bg-gray-900 border border-gray-800 hover:border-blue-700/60 rounded-2xl p-5 space-y-2 transition-all">
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-blue-400 bg-blue-900/40 border border-blue-800/50 px-2 py-0.5 rounded-full">[1]</span>
                <p class="text-white font-semibold group-hover:text-blue-300 transition-colors">ANBIMA Data</p>
              </div>
              <p class="text-blue-400 text-xs font-mono">data.anbima.com.br</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 group-hover:text-blue-400 shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p class="text-gray-400 text-xs leading-relaxed">
            Estoque total de investimentos de pessoas físicas no Brasil (R$8,58 tri).
            Volume por categoria: LCI/LCA, CDB, Fundos, Poupança. Base para dimensionamento do mercado de renda fixa.
          </p>
          <p class="text-gray-600 text-[10px]">Monitoramento: diário · Dados usados: estoque por produto, spread de taxas</p>
        </a>

        <!-- E-Investidor Estadão -->
        <a href="https://einvestidor.estadao.com.br" target="_blank" rel="noopener noreferrer"
           class="group block bg-gray-900 border border-gray-800 hover:border-blue-700/60 rounded-2xl p-5 space-y-2 transition-all">
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-blue-400 bg-blue-900/40 border border-blue-800/50 px-2 py-0.5 rounded-full">[2]</span>
                <p class="text-white font-semibold group-hover:text-blue-300 transition-colors">E-Investidor — Estadão</p>
              </div>
              <p class="text-blue-400 text-xs font-mono">einvestidor.estadao.com.br</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 group-hover:text-blue-400 shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p class="text-gray-400 text-xs leading-relaxed">
            Dados sobre a base de 60,6 milhões de investidores ativos no Brasil. Caderneta de Poupança: R$961,4 bi.
            Análises de tendência em renda fixa e comparativos entre produtos financeiros.
          </p>
          <p class="text-gray-600 text-[10px]">Monitoramento: semanal · Dados usados: base de investidores, estoque Poupança</p>
        </a>

        <!-- Tesouro Nacional -->
        <a href="https://www.tesourodireto.com.br" target="_blank" rel="noopener noreferrer"
           class="group block bg-gray-900 border border-gray-800 hover:border-green-700/60 rounded-2xl p-5 space-y-2 transition-all">
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-green-400 bg-green-900/40 border border-green-800/50 px-2 py-0.5 rounded-full">[3]</span>
                <p class="text-white font-semibold group-hover:text-green-300 transition-colors">Tesouro Direto — Tesouro Nacional</p>
              </div>
              <p class="text-green-400 text-xs font-mono">tesourodireto.com.br · thot-arquivos.tesouro.gov.br</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 group-hover:text-green-400 shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p class="text-gray-400 text-xs leading-relaxed">
            Taxas diárias de todos os títulos públicos: Tesouro Selic, IPCA+, Pré-fixado.
            Relatórios mensais da Dívida Pública Federal (DPF). Composição de detentores da dívida.
            Base para os Cenários F, G e H desta página.
          </p>
          <p class="text-gray-600 text-[10px]">Monitoramento: diário · Dados usados: taxas dos títulos públicos, DPF mensal</p>
        </a>

        <!-- Economia UOL / Banco Central -->
        <a href="https://economia.uol.com.br" target="_blank" rel="noopener noreferrer"
           class="group block bg-gray-900 border border-gray-800 hover:border-blue-700/60 rounded-2xl p-5 space-y-2 transition-all">
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-blue-400 bg-blue-900/40 border border-blue-800/50 px-2 py-0.5 rounded-full">[4]</span>
                <p class="text-white font-semibold group-hover:text-blue-300 transition-colors">Economia UOL</p>
              </div>
              <p class="text-blue-400 text-xs font-mono">economia.uol.com.br</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 group-hover:text-blue-400 shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p class="text-gray-400 text-xs leading-relaxed">
            Vantagens competitivas do Tesouro Direto no contexto macro. Análise de juros reais brasileiros
            em comparação global. Histórico da quitação com o FMI (2005) e formação da dívida doméstica.
          </p>
          <p class="text-gray-600 text-[10px]">Monitoramento: semanal · Dados usados: contexto macro, histórico da dívida</p>
        </a>

        <!-- Governo Federal / Receita Federal -->
        <a href="https://www.gov.br/receitafederal" target="_blank" rel="noopener noreferrer"
           class="group block bg-gray-900 border border-gray-800 hover:border-yellow-700/60 rounded-2xl p-5 space-y-2 transition-all">
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-yellow-400 bg-yellow-900/40 border border-yellow-800/50 px-2 py-0.5 rounded-full">[5]</span>
                <p class="text-white font-semibold group-hover:text-yellow-300 transition-colors">Receita Federal — gov.br</p>
              </div>
              <p class="text-yellow-400 text-xs font-mono">gov.br/receitafederal</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 group-hover:text-yellow-400 shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p class="text-gray-400 text-xs leading-relaxed">
            Tabela regressiva de IR para renda fixa (Lei nº 11.033/2004): 22,5% → 20% → 17,5% → 15%.
            IOF sobre resgates nos primeiros 30 dias. Arrecadação de IRRF sobre rendimentos de capital
            (R$40–55 bi/ano). Base legal de todas as simulações tributárias desta página.
          </p>
          <p class="text-gray-600 text-[10px]">Monitoramento: contínuo · Dados usados: tabela IR, IOF, alíquotas vigentes</p>
        </a>

        <!-- G1 Globo -->
        <a href="https://g1.globo.com/economia" target="_blank" rel="noopener noreferrer"
           class="group block bg-gray-900 border border-gray-800 hover:border-red-700/60 rounded-2xl p-5 space-y-2 transition-all">
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-red-400 bg-red-900/40 border border-red-800/50 px-2 py-0.5 rounded-full">[6]</span>
                <p class="text-white font-semibold group-hover:text-red-300 transition-colors">G1 Globo — Economia</p>
              </div>
              <p class="text-red-400 text-xs font-mono">g1.globo.com/economia</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 group-hover:text-red-400 shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p class="text-gray-400 text-xs leading-relaxed">
            Carga tributária bruta do Brasil: 32,40% do PIB (recorde histórico). Contexto sobre o paradoxo fiscal:
            queda de 1% na Selic economiza ~R$40 bi em despesas de juros ao governo.
            Cenário da dívida bruta acima de R$10,3 tri (78–80% do PIB).
          </p>
          <p class="text-gray-600 text-[10px]">Monitoramento: semanal · Dados usados: carga tributária, custo da dívida</p>
        </a>

        <!-- Banco Central do Brasil -->
        <a href="https://www.bcb.gov.br/estatisticas/tabelahistoricametas" target="_blank" rel="noopener noreferrer"
           class="group block bg-gray-900 border border-gray-800 hover:border-green-700/60 rounded-2xl p-5 space-y-2 transition-all">
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-green-400 bg-green-900/40 border border-green-800/50 px-2 py-0.5 rounded-full">[7]</span>
                <p class="text-white font-semibold group-hover:text-green-300 transition-colors">Banco Central do Brasil — BCB</p>
              </div>
              <p class="text-green-400 text-xs font-mono">bcb.gov.br · SGS série 4389 (CDI)</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 group-hover:text-green-400 shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p class="text-gray-400 text-xs leading-relaxed">
            Taxa CDI histórica (SGS série 4389) — base de todas as simulações de CDB desta página.
            Taxa Selic meta e efetiva definida pelo Copom. Projeções FOCUS (IPCA, Selic).
            A taxa de 14,65% a.a. usada nos Cenários A–H vem diretamente desta base.
          </p>
          <p class="text-gray-600 text-[10px]">Monitoramento: diário · Dados usados: CDI atual (14,65%), Selic meta, FOCUS IPCA</p>
        </a>

        <!-- CMN / CVM -->
        <a href="https://www.gov.br/fazenda/pt-br/orgaos/cmn" target="_blank" rel="noopener noreferrer"
           class="group block bg-gray-900 border border-gray-800 hover:border-purple-700/60 rounded-2xl p-5 space-y-2 transition-all">
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-purple-400 bg-purple-900/40 border border-purple-800/50 px-2 py-0.5 rounded-full">[8]</span>
                <p class="text-white font-semibold group-hover:text-purple-300 transition-colors">CMN — Conselho Monetário Nacional</p>
              </div>
              <p class="text-purple-400 text-xs font-mono">gov.br/fazenda · Resolução CMN 5.215/2025</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 group-hover:text-purple-400 shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p class="text-gray-400 text-xs leading-relaxed">
            Resolução CMN 5.215/2025 — regras atualizadas de carência mínima para LCI e LCA:
            6 meses (CDI/pré), 12 meses (LCA IPCA+), 36 meses (LCI IPCA+).
            Base legal das restrições de liquidez exibidas nos Cenários D e E desta página.
          </p>
          <p class="text-gray-600 text-[10px]">Monitoramento: quando há alteração regulatória · Dados usados: prazos de carência obrigatórios</p>
        </a>

      </div>

      <!-- Nota metodológica -->
      <div class="bg-gray-800/40 border border-gray-700 rounded-2xl p-5 space-y-3 text-xs">
        <p class="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Nota metodológica</p>
        <div class="grid sm:grid-cols-2 gap-4 text-gray-500 leading-relaxed">
          <div class="space-y-1.5">
            <p><strong class="text-gray-300">CDI utilizado:</strong> 14,65% a.a. (última leitura disponível, BCB SGS série 4389, abril/2026).</p>
            <p><strong class="text-gray-300">IPCA projetado:</strong> 5,5% a.a. (mediana FOCUS/BCB para 2026).</p>
            <p><strong class="text-gray-300">Tesouro IPCA+:</strong> taxa real de 7,8% a.a. (leitura média dos títulos IPCA+ 2035 disponíveis em maio/2026).</p>
            <p><strong class="text-gray-300">Tesouro Pré-fixado:</strong> 13,5% a.a. (leitura dos títulos Pré 2027 em maio/2026).</p>
          </div>
          <div class="space-y-1.5">
            <p><strong class="text-gray-300">IR aplicado:</strong> 22,5% uniformemente nas simulações de saques mensais (≤ 180 dias por retirada). Tabela regressiva vigente (Lei 11.033/2004).</p>
            <p><strong class="text-gray-300">Poupança:</strong> 0,5%/mês + TR ≈ 6,17% a.a., isenta de IR para pessoa física.</p>
            <p><strong class="text-gray-300">Frequência de atualização:</strong> os valores são revisados sempre que o Copom altera a Selic ou quando o FOCUS/BCB divulga nova mediana de IPCA.</p>
          </div>
        </div>
        <p class="text-gray-600 border-t border-gray-700 pt-3">
          Esta página tem finalidade educacional. As simulações são baseadas em dados históricos e projeções — não constituem oferta de investimento nem garantia de rentabilidade futura.
          Os resultados reais podem variar conforme a instituição financeira, o produto específico contratado e as condições de mercado na data do investimento.
        </p>
      </div>

    </section>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import MathFormula from '../components/MathFormula.vue'
import MiniLineChart from '../components/MiniLineChart.vue'
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
      { sigla: 'CDB', desc: 'Certificado de Depósito Bancário — pós, pré ou híbrido' },
    ],
  },
  {
    nome: 'Bancários isentos de IR',
    isento: true,
    nota: 'Prazo mínimo LCI/LCA: 6 meses (CDI/prefixado) ou 12-36 meses (IPCA). CMN Res. maio/2025. Poupança isenta sem carência.',
    produtos: [
      { sigla: 'LCI',      desc: 'Letra de Crédito Imobiliário' },
      { sigla: 'LCA',      desc: 'Letra de Crédito do Agronegócio' },
      { sigla: 'Poupança', desc: 'Isenta de IR, mas rende apenas 0,5%/mês + TR — a pior opção de renda fixa' },
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

const simE = (() => {
  const principal  = 600_000
  const cdiAa      = 14.65 / 100
  const retirada   = 4_000

  const capCDB     = principal * 0.08   // caixa de saques — liquidez imediata
  const capLCA     = principal * 0.92   // motor de crescimento — isento IR
  const taxaCDB_aa = cdiAa * 1.15       // 115% CDI
  const taxaLCA_aa = cdiAa * 0.97       // 97% CDI
  const rateCDB_pm = Math.pow(1 + taxaCDB_aa, 1 / 12) - 1
  const rateLCA_pm = Math.pow(1 + taxaLCA_aa, 1 / 12) - 1

  // Mês 1
  const rendCDB_bruto = capCDB * rateCDB_pm
  const rendCDB_ir    = rendCDB_bruto * 0.225
  const rendCDB_net   = rendCDB_bruto - rendCDB_ir
  const rendLCA       = capLCA * rateLCA_pm
  const totalNetM1    = rendCDB_net + rendLCA
  const surplusM1     = totalNetM1 - retirada

  // Simulação 12 meses — estratégia híbrida
  let bCDB = capCDB, bLCA = capLCA, irAnual = 0
  for (let m = 0; m < 12; m++) {
    const eb   = bCDB * rateCDB_pm
    const eir  = eb * 0.225
    const elca = bLCA * rateLCA_pm
    irAnual += eir
    bCDB += eb - eir - retirada
    if (bCDB < 0) { bLCA += bCDB; bCDB = 0 }
    bLCA += elca
  }
  const capital12 = bCDB + bLCA

  // Comparação: 100% CDB 115% CDI tributado
  let bCDB2 = principal, irAnual2 = 0
  for (let m = 0; m < 12; m++) {
    const eb  = bCDB2 * rateCDB_pm
    const eir = eb * 0.225
    irAnual2 += eir
    bCDB2 += eb - eir - retirada
  }
  const capital12_cdb = bCDB2

  // Equivalência LCA 97% CDI isento × CDB tributado por faixa de IR
  const equiv225 = +((taxaLCA_aa / 0.775 / cdiAa) * 100).toFixed(1)
  const equiv200 = +((taxaLCA_aa / 0.800 / cdiAa) * 100).toFixed(1)
  const equiv175 = +((taxaLCA_aa / 0.825 / cdiAa) * 100).toFixed(1)
  const equiv150 = +((taxaLCA_aa / 0.850 / cdiAa) * 100).toFixed(1)

  return {
    principal, retirada, capCDB, capLCA,
    taxaCDB_pct: +(taxaCDB_aa * 100).toFixed(2),
    taxaLCA_pct: +(taxaLCA_aa * 100).toFixed(2),
    rendCDB_bruto, rendCDB_ir, rendCDB_net, rendLCA,
    totalNetM1, surplusM1,
    capital12, irAnual,
    capital12_cdb, irAnual2,
    economiaIR: irAnual2 - irAnual,
    difCapital: capital12 - capital12_cdb,
    totalRetirado: retirada * 12,
    mesesCDB: Math.floor(capCDB / retirada),
    equiv225, equiv200, equiv175, equiv150,
  }
})()

// ── Gráficos preditivos — 12 meses ───────────────────────────────────────
const xLabels = ['Hoje','M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12']

function buildSim(start, rPm, irRate, months, wFn = () => 0) {
  let b = start
  const pts = [b]
  for (let m = 1; m <= months; m++) {
    const gross = b * rPm
    b = b + gross * (1 - irRate) - wFn(m)
    if (b < 0) b = 0
    pts.push(b)
  }
  return pts
}

const _r109 = Math.pow(1 + 14.65 / 100 * 1.09, 1 / 12) - 1
const _r115 = Math.pow(1 + 14.65 / 100 * 1.15, 1 / 12) - 1
const _r120 = Math.pow(1 + 14.65 / 100 * 1.20, 1 / 12) - 1
const _r97  = Math.pow(1 + 14.65 / 100 * 0.97, 1 / 12) - 1

// Cenário A — capital após retirada parcial de R$3k no mês 1
const chartA = [
  { label: 'Sem retirada (ref.)', color: '#4b5563', dashed: true, data: buildSim(600_000, _r109, 0.225, 12) },
  { label: 'Com retirada R$3k',   color: '#22c55e', area: true,   data: buildSim(600_000, _r109, 0.225, 12, m => m === 1 ? 3_000 : 0) },
]

// Cenário B — impacto permanente do haircut ao vender no mês 1
const chartB = (() => {
  const simH = h => {
    const d1 = 600_000 * (1 + _r109)
    const sold = d1 * (1 - h)
    const profit = sold - 600_000
    const net = sold - (profit > 0 ? profit * 0.225 : 0)
    return [600_000, ...buildSim(net, _r109, 0.225, 11)]
  }
  return [
    { label: 'Sem haircut (ref.)', color: '#6b7280', dashed: true, data: simH(0) },
    { label: 'Haircut 1,5%',       color: '#f97316',               data: simH(0.015) },
    { label: 'Haircut 3%',         color: '#ef4444', area: true,   data: simH(0.03) },
  ]
})()

// Cenário C — liq. diária vs. mercado secundário com haircut
const chartC = (() => {
  const stayInvested = buildSim(600_000, _r109, 0.225, 12)
  const liqDiaria = (() => {
    const d1 = 600_000 * (1 + _r109)
    const net = d1 - (d1 - 600_000) * 0.225
    return [600_000, ...buildSim(net, _r109, 0.225, 11)]
  })()
  const secH2 = (() => {
    const d1 = 600_000 * (1 + _r109)
    const sold = d1 * 0.98
    const profit = sold - 600_000
    const net = sold - (profit > 0 ? profit * 0.225 : 0)
    return [600_000, ...buildSim(net, _r109, 0.225, 11)]
  })()
  return [
    { label: 'Permanece investido',     color: '#6b7280', dashed: true, data: stayInvested },
    { label: 'Liq. diária (Cenário C)', color: '#3b82f6', area: true,   data: liqDiaria },
    { label: 'Sec. 2% haircut',          color: '#ef4444',               data: secH2 },
  ]
})()

// Cenário D — custo do lock-up: saída forçada no mês 6 com 2,5% haircut
const chartD = (() => {
  const locked = (() => {
    let b = 600_000
    const pts = [b]
    for (let m = 1; m <= 12; m++) { b += b * _r120; pts.push(b) }
    return pts
  })()
  const liquid = buildSim(600_000, _r109, 0.225, 12)
  const forced = (() => {
    let b = 600_000
    const pts = [b]
    for (let m = 1; m <= 12; m++) {
      if (m <= 6) {
        b += b * _r120
        if (m === 6) {
          const sold = b * (1 - 0.025)
          const profit = sold - 600_000
          b = sold - (profit > 0 ? profit * 0.225 : 0)
        }
      } else {
        b += b * _r109 * (1 - 0.225)
      }
      pts.push(b)
    }
    return pts
  })()
  return [
    { label: 'Permanece (bloqueado)', color: '#eab308', area: true,   data: locked },
    { label: 'Liq. diária (ref.)',    color: '#6b7280', dashed: true, data: liquid },
    { label: 'Saída forçada mês 6',   color: '#ef4444',               data: forced },
  ]
})()

// Cenário E — retirada de R$4k/mês: capital ainda cresce
const chartE = (() => {
  const hybrid = (() => {
    let bCDB = 600_000 * 0.08, bLCA = 600_000 * 0.92
    const pts = [600_000]
    for (let m = 1; m <= 12; m++) {
      const eb = bCDB * _r115, eir = eb * 0.225, elca = bLCA * _r97
      bCDB += eb - eir - 4_000
      if (bCDB < 0) { bLCA += bCDB; bCDB = 0 }
      bLCA += elca
      pts.push(bCDB + bLCA)
    }
    return pts
  })()
  const allCDB = buildSim(600_000, _r115, 0.225, 12, () => 4_000)
  return [
    { label: 'Híbrida CDB+LCA',    color: '#14b8a6', area: true,   data: hybrid },
    { label: '100% CDB tributado',  color: '#6b7280', dashed: true, data: allCDB },
  ]
})()

// ── Tesouro Direto — Cenários F · G · H ──────────────────────────────────
const _tSelicPm    = Math.pow(1 + 14.65 / 100, 1 / 12) - 1           // Tesouro Selic ≈ 100% Selic
const _ipca55      = 5.5  / 100
const _real78      = 7.8  / 100
const _tIPCAplusAa = (1 + _ipca55) * (1 + _real78) - 1               // ≈ 13,41% nominal
const _tIPCAplusPm = Math.pow(1 + _tIPCAplusAa, 1 / 12) - 1
const _tPre135Aa   = 13.5 / 100
const _tPre135Pm   = Math.pow(1 + _tPre135Aa, 1 / 12) - 1
const _poupPm      = Math.pow(1 + 0.0617, 1 / 12) - 1                // Poupança ≈ 6,17% a.a.

const simF = (() => {
  const principal = 600_000, retirada = 4_000, ir = 0.225
  const rendNet = principal * _tSelicPm * (1 - ir)
  const pts     = buildSim(principal, _tSelicPm, ir, 12, () => retirada)
  return { rendNet, surplus: rendNet - retirada, taxaAa: 14.65, capital12: pts[12], varCapital: pts[12] - principal }
})()

const simG = (() => {
  const principal = 600_000, retirada = 4_000, ir = 0.225
  const rendNet = principal * _tIPCAplusPm * (1 - ir)
  const pts     = buildSim(principal, _tIPCAplusPm, ir, 12, () => retirada)
  return { rendNet, surplus: rendNet - retirada,
           taxaAaNom: +(_tIPCAplusAa * 100).toFixed(2), taxaReal: +(_real78 * 100).toFixed(1),
           capital12: pts[12], varCapital: pts[12] - principal }
})()

const simH = (() => {
  const principal = 600_000, retirada = 4_000, ir = 0.225
  const rendNet = principal * _tPre135Pm * (1 - ir)
  const pts     = buildSim(principal, _tPre135Pm, ir, 12, () => retirada)
  return { rendNet, surplus: rendNet - retirada, taxaAa: 13.5, capital12: pts[12], varCapital: pts[12] - principal }
})()

// Chart F — Tesouro Selic: referência vs saques vs Poupança
const chartF = [
  { label: 'T. Selic (ref.)',    color: '#6b7280', dashed: true,
    data: buildSim(600_000, _tSelicPm, 0.225, 12) },
  { label: 'T. Selic R$4k/mês', color: '#6366f1', area: true,
    data: buildSim(600_000, _tSelicPm, 0.225, 12, () => 4_000) },
  { label: 'Poupança R$4k/mês', color: '#9ca3af',
    data: buildSim(600_000, _poupPm, 0, 12, () => 4_000) },
]

// Chart G — Tesouro IPCA+ vs CDB 109% CDI com saques
const chartG = [
  { label: 'IPCA+ (ref.)',       color: '#6b7280', dashed: true,
    data: buildSim(600_000, _tIPCAplusPm, 0.225, 12) },
  { label: 'IPCA+ R$4k/mês',    color: '#a855f7', area: true,
    data: buildSim(600_000, _tIPCAplusPm, 0.225, 12, () => 4_000) },
  { label: 'CDB 109% R$4k/mês', color: '#f59e0b',
    data: buildSim(600_000, _r109, 0.225, 12, () => 4_000) },
]

// Chart H — Tesouro Pré-fixado 13,5% vs CDB 109% CDI com saques
const chartH = [
  { label: 'Pré 13,5% (ref.)',   color: '#6b7280', dashed: true,
    data: buildSim(600_000, _tPre135Pm, 0.225, 12) },
  { label: 'Pré 13,5% R$4k/mês',color: '#10b981', area: true,
    data: buildSim(600_000, _tPre135Pm, 0.225, 12, () => 4_000) },
  { label: 'CDB 109% R$4k/mês', color: '#f59e0b',
    data: buildSim(600_000, _r109, 0.225, 12, () => 4_000) },
]

// ─── Cenário I: FGC + Mercado Secundário ────────────────────────────────────
// CDB de mercado secundário com deságio → rentabilidade efetiva ~130% CDI
const _r130 = Math.pow(1 + 14.65 / 100 * 1.30, 1 / 12) - 1

const simI = (() => {
  const bankAstart  = 100_000   // fundo de saques — líquido, 24 meses
  const bankBCstart = 500_000   // mercado secundário — R$250k Banco B + R$250k Banco C
  const retirada    = 4_000
  const ir          = 0.225

  const bankA12pts  = buildSim(bankAstart,  _r109, ir, 12, () => retirada)
  const bankBC12pts = buildSim(bankBCstart, _r130, ir, 12)
  const simpleAll12 = buildSim(600_000,     _r109, ir, 12, () => retirada)

  const bankA24pts  = buildSim(bankAstart,  _r109, ir, 24, () => retirada)
  const bankBC24pts = buildSim(bankBCstart, _r130, ir, 24)

  const bankA12  = bankA12pts[12]
  const bankBC12 = bankBC12pts[12]
  const total12  = bankA12 + bankBC12

  const bankA24  = bankA24pts[24]
  const bankBC24 = bankBC24pts[24]
  const total24  = bankA24 + bankBC24

  return {
    bankAstart, bankBCstart,
    bankA12, bankBC12, total12,
    simpleAll12: simpleAll12[12],
    advantage12: total12 - simpleAll12[12],
    bankA24, bankBC24, total24,
    bankANetMes:  bankAstart  * _r109 * (1 - ir),
    bankBCNetMes: bankBCstart * _r130 * (1 - ir),
    totalRetirado24: retirada * 24,
  }
})()

const chartI = (() => {
  const bankA     = buildSim(100_000, _r109, 0.225, 12, () => 4_000)
  const bankBC    = buildSim(500_000, _r130, 0.225, 12)
  const total     = bankA.map((v, i) => v + bankBC[i])
  const simpleAll = buildSim(600_000, _r109, 0.225, 12, () => 4_000)
  return [
    { label: 'Estratégia I (total)',   color: '#f59e0b', area: true,   data: total },
    { label: 'CDB 109% c/ R$4k/mês',  color: '#6b7280', dashed: true, data: simpleAll },
    { label: 'Banco A (caixa liq.)',   color: '#3b82f6',               data: bankA },
  ]
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
