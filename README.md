# Analisador de Investimentos em Renda Fixa

> **Planejamento de aplicativo web para análise real de rentabilidade líquida anualizada de investimentos de renda fixa no Brasil**
>
> Documento elaborado em 27/05/2026 com base em dados reais de carteira (AVIN/BTG Pactual), pesquisa em fontes públicas (InfoMoney, B3, Nubank, BTG, XP, Banco Central) e análise tributária detalhada.

---

## Sumário

1. [Contexto e Motivação](#1-contexto-e-motivação)
2. [O Problema: A Ilusão da Taxa Anunciada](#2-o-problema-a-ilusão-da-taxa-anunciada)
3. [Conceitos Fundamentais de Renda Fixa](#3-conceitos-fundamentais-de-renda-fixa)
4. [Sistema Tributário Brasileiro para Investimentos](#4-sistema-tributário-brasileiro-para-investimentos)
5. [Panorama do Mercado — Maio de 2026](#5-panorama-do-mercado--maio-de-2026)
6. [Carteira Real do Usuário (Referência)](#6-carteira-real-do-usuário-referência)
7. [Fórmulas Matemáticas Detalhadas](#7-fórmulas-matemáticas-detalhadas)
8. [Exemplos Práticos de Cálculo](#8-exemplos-práticos-de-cálculo)
9. [Especificação do Aplicativo Web](#9-especificação-do-aplicativo-web)
10. [Comparação entre Produtos — Metodologia](#10-comparação-entre-produtos--metodologia)
11. [Fontes de Dados em Tempo Real](#11-fontes-de-dados-em-tempo-real)
12. [Roadmap e Próximos Passos](#12-roadmap-e-próximos-passos)
13. [Referências e Fontes Consultadas](#13-referências-e-fontes-consultadas)

---

## 1. Contexto e Motivação

### 1.1 Origem do Projeto

Este projeto nasce de uma constatação prática ao analisar uma carteira real de investimentos em renda fixa gerida pelo banco AVIN/BTG Pactual no período de **01/05/2025 a 30/04/2026**. O relatório da proposta (PDF fornecido) apresenta as seguintes informações:

| Métrica | Valor |
|---|---|
| Rentabilidade anualizada estimada | **15,11%** |
| Volatilidade anualizada estimada | 0,01% |
| Valor da carteira (principal) | R$ 600.000,00 |
| Patrimônio acumulado | R$ 690.640,50 |
| Índice Sharpe | 27,93 |
| % CDI (comparativo benchmark) | **101,88%** |

**Produtos na carteira BTG Pactual:**

| Produto | Rent. 12m | % CDI 12m | Liquidez | Vencimento | Valor |
|---|---|---|---|---|---|
| CDB Liquidez Diária – 100% CDI | 14,89% | 100% | D+0 | Sem vencimento | R$ 250.000,00 |
| CDB Liquidez 100,6% CDI (Carência 90 dias) | 14,98% | 100,64% | D+366 | Sem vencimento | R$ 250.000,00 |
| CDB – Banco Digimais – 109,0% CDI | 16,33% | 109,70% | D+179 | **23/11/2026** | R$ 100.000,00 |

> **Nota crítica:** Todas as rentabilidades acima são **brutas**, antes da incidência do Imposto de Renda. O relatório do BTG não exibe a rentabilidade líquida real após impostos.

### 1.2 Dados do Nubank do Usuário

Além da carteira BTG, o usuário possui conta no **Nubank** com:
- **Saldo disponível:** R$ 627.393,41 (em 27/05/2026)
- **Rendimentos brutos em maio/2026:** R$ 5.869,71
- **Imposto de Renda retido em maio/2026:** R$ 1.181,26
- **Rendimento líquido em maio/2026:** R$ 4.688,45
- **IOF em maio/2026:** R$ 0,00

**Produtos avistados no Nubank (screenshots — maio 2026):**

| Produto | Taxa | IR Aplicável | Vencimento | Mínimo | Emissor |
|---|---|---|---|---|---|
| CDB Nubank (selecionado) | 102,5% CDI | **20%** (até 360 dias) | 24 NOV 2026 | R$ 100,00 | Nubank |
| CDB Realize Cfi | 104% CDI | **17,5%** (361-720 dias) | 27 MAI 2027 | R$ 1.000,00 | Realize Cfi |
| CDB PicPay Bank | 104,75% CDI | **17,5%** | 27 MAI 2027 | R$ 1.000,00 | PicPay Bank |
| CDB Banco BMG | 99% CDI | **17,5%** | 27 MAI 2027 | R$ 1.000,00 | Banco BMG |

> **Ponto crítico identificado pelo usuário:** O CDB Nubank a 102,5% CDI com vencimento em 24/NOV/2026 — partindo de hoje (27/05/2026) — tem apenas **~181 dias** até o vencimento. Isso faz com que a alíquota de IR seja **20%** (faixa de 181-360 dias), e não 17,5%. O Nubank já mostra o IR de 20% na tela, o que é correto — mas o usuário médio não percebe que a taxa anunciada (102,5% CDI) é *bruta*, e que o prazo curto impacta diretamente o ganho real.

---

## 2. O Problema: A Ilusão da Taxa Anunciada

### 2.1 Como os Bancos Anunciam

Os bancos anunciam produtos de renda fixa com a **taxa bruta anual**:
- "102,5% do CDI"
- "14,17% ao ano"
- "109% do CDI"

Esses valores são atraentes, mas **não representam o ganho real do investidor** pelos seguintes motivos:

1. **A taxa é bruta** — o IR ainda não foi descontado
2. **O prazo determina o IR** — quanto menor o prazo de permanência, maior a alíquota
3. **O vencimento do produto limita o prazo efetivo** — se um produto vence em 5 meses, mesmo que você queira ficar 2 anos, o prazo para fins de IR é de 5 meses
4. **Juros compostos atuam diferente em prazos curtos** — a taxa anualizada real líquida cai significativamente em prazos curtos

### 2.2 Exemplo Ilustrativo — O Caso do CDB de 14,17% a.a.

Considere um CDB anunciado a **14,17% ao ano bruto** com prazo efetivo de **97 dias** (< 180 dias, IR = 22,5%):

```
Rendimento bruto no período:
  R_bruto = (1 + 0,1417)^(97/365) - 1 = 3,578%

IR pago (22,5% sobre rendimento):
  IR = 3,578% × 0,225 = 0,805%

Rendimento líquido no período:
  R_liq = 3,578% × (1 - 0,225) = 2,773%

Rentabilidade líquida anualizada:
  i_liq = (1 + 0,02773)^(365/97) - 1 = 10,83% a.a.
```

**Resultado:** Embora anunciado a 14,17% a.a., o investidor recebe **10,83% a.a. líquido** — uma diferença de 3,34 pontos percentuais (redução de ~23,5%).

### 2.3 Comparação por Cenário de Prazo (taxa bruta = 14,17% a.a.)

| Prazo (dias) | IR (%) | Rend. Bruto | Rend. Líquido | **Taxa Anual Líquida** |
|---|---|---|---|---|
| 30 | 22,5% | 1,12% | 0,87% | **11,04% a.a.** |
| 90 | 22,5% | 3,31% | 2,57% | **10,71% a.a.** |
| 180 | 22,5% | 6,75% | 5,23% | **10,81% a.a.** |
| 181 | **20%** | 6,79% | 5,43% | **11,28% a.a.** |
| 270 | 20% | 10,34% | 8,27% | **11,42% a.a.** |
| 360 | 20% | 14,17% | 11,34% | **11,34% a.a.** |
| 361 | **17,5%** | 14,21% | 11,72% | **11,83% a.a.** |
| 540 | 17,5% | 22,08% | 18,22% | **12,07% a.a.** |
| 720 | 17,5% | 30,27% | 24,97% | **11,88% a.a.** |
| 721 | **15%** | 30,31% | 25,76% | **12,07% a.a.** |
| 1080 | 15% | 47,39% | 40,28% | **12,32% a.a.** |

> **Conclusão:** Para uma mesma taxa bruta de 14,17% a.a., a taxa líquida anualizada real varia de **10,71%** (em 90 dias) a **12,32%** (em 1080 dias). O máximo é atingido com prazos acima de 720 dias.

### 2.4 A Armadilha do Produto de Curto Prazo

Quando um banco oferece um CDB a "109% do CDI" com vencimento em 6 meses, e o CDI está a 14,65%:

```
Taxa bruta anual = 109% × 14,65% = 15,97% a.a.

Prazo: ~180 dias → IR = 22,5%

Rendimento bruto 180 dias = (1,1597)^(180/365) - 1 = 7,39%
Rendimento líquido = 7,39% × 0,775 = 5,73%
Taxa anualizada líquida = (1,0573)^(365/180) - 1 = 11,87% a.a.

Versus um CDB simples de 100% CDI por 2 anos:
Taxa bruta anual = 14,65%
Rendimento bruto 720 dias = (1,1465)^(720/365) - 1 = 31,80%
Rendimento líquido = 31,80% × 0,85 = 27,03%
Taxa anualizada líquida = (1,2703)^(365/720) - 1 = 12,58% a.a.
```

**Surpreendente:** O CDB a "109% CDI" por 6 meses (11,87% a.a. líquido) **perde** para um simples CDB a "100% CDI" por 2 anos (12,58% a.a. líquido) mesmo com taxa bruta maior.

---

## 3. Conceitos Fundamentais de Renda Fixa

### 3.1 CDB — Certificado de Depósito Bancário

**O que é:** Título de renda fixa emitido por bancos para captar recursos. O investidor empresta dinheiro ao banco e recebe juros.

**Tipos:**
- **Pré-fixado:** Taxa definida na contratação (ex.: 14% a.a.). O investidor sabe exatamente quanto vai receber no vencimento.
- **Pós-fixado:** Atrelado ao CDI (ex.: 102,5% do CDI). O rendimento acompanha as variações do CDI ao longo do período.
- **Híbrido:** Combinação de taxa fixa + índice (ex.: IPCA + 5,5% a.a.).

**Características:**
- Cobertura do FGC (Fundo Garantidor de Crédito) até **R$ 250.000** por CPF por instituição
- IR regressivo sobre os rendimentos (tabela de 22,5% a 15%)
- IOF nos primeiros 30 dias de aplicação
- Liquidez: pode ser diária (D+0) ou apenas no vencimento
- Convenção de cálculo: **252 dias úteis** para pós-fixado; **365 dias corridos** para pré-fixado

**Convenção matemática:**
- CDI pós-fixado: CDI_diário = (1 + CDI_anual)^(1/252) - 1, acumulado dia a dia útil
- Pré-fixado: taxa_diária = (1 + taxa_anual)^(1/365) - 1, acumulado dia a dia corrido

**Onde encontrar:**
- Nubank: min. R$ 100, liquidez diária até produtos com carência
- BTG Pactual: min. R$ 1.000, ampla oferta de emissores
- XP Investimentos/Rico: min. R$ 1.000, marketplace com bancos médios
- Inter, C6 Bank, PicPay Bank: fintechs com taxas competitivas
- Bancos grandes (Itaú, Bradesco, Santander): 100% CDI com liquidez diária

### 3.2 LCI — Letra de Crédito Imobiliário

**O que é:** Título emitido por instituições financeiras para financiar o setor imobiliário.

**Vantagem principal:** **ISENTO de IR para pessoa física** (mantido em 2026, MP 1.303/2025 caducou sem aprovação).

**Características atuais (2026):**
- **Prazo mínimo:** 6 meses (180 dias) para versões pós-fixadas (CDI) e pré-fixadas — Resolução CMN maio/2025
- **Prazo mínimo para IPCA:** 36 meses para LCI
- Cobertura FGC até R$ 250.000
- **Sem IOF** após 30 dias
- Liquidez restrita: geralmente sem resgate antecipado (ou com penalidade)
- Taxas típicas maio 2026: **80% a 95% do CDI** (pós-fixado); pré-fixado até 11,34% a.a.

**Ponto de atenção:** Como são isentas de IR, as taxas brutas são menores que as de CDB. A comparação deve ser feita em termos de rendimento **líquido**.

### 3.3 LCA — Letra de Crédito do Agronegócio

**O que é:** Similar à LCI, mas voltada ao financiamento do setor agrícola.

**Características:**
- **ISENTA de IR** para pessoa física (mesmo status da LCI)
- **Prazo mínimo:** 6 meses para CDI/pré-fixado; 12 meses para IPCA — Resolução CMN 2025
- Cobertura FGC até R$ 250.000
- Taxas típicas maio 2026: **85% a 92% do CDI**; pré-fixado até 11,34% a.a.
- **LCA Original (XP):** 92% CDI, vencimento maio 2029

**Situação legislativa (2026):**
A Medida Provisória 1.303/2025 propunha tributar LCI/LCA a 5% de IR para novas emissões a partir de 01/01/2026. A MP caducou em outubro/2025 (120 dias sem aprovação do Congresso). As LCIs e LCAs **continuam isentas de IR em 2026**.

### 3.4 CRI — Certificado de Recebíveis Imobiliários

**O que é:** Título lastreado em créditos imobiliários, emitido por securitizadoras.

**Características:**
- Isento de IR para PF
- **Não tem cobertura do FGC** — risco maior
- Prazo geralmente longo (3-15 anos)
- Taxas: IPCA+ 7% a 9%, CDI+ 1,5% a 3%
- Investimento mínimo: geralmente R$ 1.000 a R$ 10.000
- Liquidez: mercado secundário (pode ter baixa liquidez)

### 3.5 CRA — Certificado de Recebíveis do Agronegócio

**O que é:** Semelhante ao CRI, mas lastreado em créditos do agronegócio.

**Características:**
- Isento de IR para PF
- **Não tem cobertura do FGC**
- Taxas: IPCA+ 5,5% a 8%, CDI+ 1,5% a 2,5%
- Liquidez via mercado secundário

### 3.6 Debêntures Incentivadas

- Isentas de IR para PF (debêntures de infraestrutura — Lei 12.431/2011)
- Sem FGC
- Taxas: CDI+ 1% a 5%, IPCA+ 5% a 9%
- Risco corporativo — necessário análise de crédito

### 3.7 Tesouro Direto

**Tipos disponíveis (maio 2026):**

| Título | Taxa | Características |
|---|---|---|
| Tesouro Selic | Selic + 0,0823% | Liquidez diária, referência sem risco de marcação |
| Tesouro Prefixado 2028 | ~14,03% a.a. | Taxa fixa, risco de marcação a mercado |
| Tesouro IPCA+ 2035 | IPCA + 7,68% | Proteção contra inflação, longo prazo |
| Tesouro IPCA+ 2029 | IPCA + 7,20% | Médio prazo |

**IR:** Tabela regressiva (mesmo que CDB) — 22,5% a 15%
**IOF:** Primeiros 30 dias
**Liquidez:** Diária (compra/venda todo dia útil pelo Tesouro)
**FGC:** Não tem, mas é garantia soberana do governo federal

### 3.8 Poupança (Comparação)

**Rentabilidade atual (CDI > 8,5% a.a.):**
- Poupança = 0,5% ao mês + TR = ~6,17% a.a. bruto
- **Isenta de IR** para PF

**Conclusão:** Com CDI a 14,65%, a poupança rende menos de metade do CDI. Nunca é a melhor opção no cenário atual.

---

## 4. Sistema Tributário Brasileiro para Investimentos

### 4.1 Imposto de Renda — Tabela Regressiva

Aplicável a: CDB, Tesouro Direto, LF (Letras Financeiras), Fundos de Renda Fixa e Multimercado, RDB, Debêntures comuns.

| Prazo de Aplicação | Alíquota IR |
|---|---|
| Até 180 dias corridos | **22,5%** |
| De 181 a 360 dias corridos | **20,0%** |
| De 361 a 720 dias corridos | **17,5%** |
| Acima de 720 dias corridos | **15,0%** |

**Regras importantes:**
- O IR incide **exclusivamente sobre o rendimento**, nunca sobre o principal
- O IR é retido na fonte (o banco desconta automaticamente no resgate)
- O prazo conta a partir da **data de aplicação** (não da compra no mercado secundário)
- Para pós-fixados, o IR é calculado sobre o CDI acumulado no período
- **Fato gerador:** resgate, cessão ou liquidação
- O prazo que conta é o da **aplicação efetiva**, não o prazo anunciado do produto

**Cálculo passo a passo:**
```
1. Determine o prazo (d) em dias corridos
2. Calcule o rendimento bruto: R_bruto = (1 + taxa_anual)^(d/365) - 1
3. Aplique a alíquota de IR conforme a tabela
4. Rendimento líquido: R_liq = R_bruto × (1 - alíquota_IR)
5. Anualizar: i_liq_anual = (1 + R_liq)^(365/d) - 1
```

### 4.2 IOF — Imposto sobre Operações Financeiras

O IOF incide em resgates realizados **antes de 30 dias** da aplicação. Incide apenas sobre rendimentos.

**Tabela IOF completa (dia por dia):**

| Dia | IOF % | Dia | IOF % | Dia | IOF % |
|---|---|---|---|---|---|
| 1 | 96% | 11 | 63% | 21 | 30% |
| 2 | 93% | 12 | 60% | 22 | 26% |
| 3 | 90% | 13 | 56% | 23 | 23% |
| 4 | 86% | 14 | 53% | 24 | 20% |
| 5 | 83% | 15 | 50% | 25 | 16% |
| 6 | 80% | 16 | 46% | 26 | 13% |
| 7 | 76% | 17 | 43% | 27 | 10% |
| 8 | 73% | 18 | 40% | 28 | 6% |
| 9 | 70% | 19 | 36% | 29 | 3% |
| 10 | 66% | 20 | 33% | **≥ 30** | **0%** |

**Exemplo de IOF:** Resgate no dia 15 → IOF = 50% do rendimento bruto (antes do IR)

**Cálculo com IOF:**
```
Rendimento após IOF = R_bruto × (1 - IOF_alíquota)
Depois aplica-se o IR sobre o rendimento após IOF
```

**Isentos de IOF:** LCI, LCA, CRI, CRA, Debêntures incentivadas — não há IOF para esses produtos.

### 4.3 Produtos Isentos de IR

| Produto | Isento de IR | Isento de IOF | FGC |
|---|---|---|---|
| LCI | Sim (PF) | Sim (após 30 dias) | Sim |
| LCA | Sim (PF) | Sim (após 30 dias) | Sim |
| CRI | Sim (PF) | Sim | Não |
| CRA | Sim (PF) | Sim | Não |
| Debêntures incentivadas | Sim (PF) | Sim | Não |
| Poupança | Sim (PF) | Não aplicável | Sim |
| CDB | **Não** | Não (30 dias) | Sim |
| Tesouro Direto | **Não** | Não (30 dias) | Não |
| Fundos RF | **Não** | Não | Não |

### 4.4 Proposta de Mudança Tributária (2025-2026) — Status

A **MP 1.303/2025** propunha:
- Alíquota única de 17,5% para CDB (eliminando a tabela regressiva)
- 5% de IR sobre LCI/LCA, CRI, CRA, debêntures incentivadas para emissões a partir de 01/01/2026

**Status atual:** A MP caducou em outubro/2025 sem ser aprovada pelo Congresso. As regras atuais permanecem vigentes em maio/2026.

> **Risco regulatório:** Nova proposta legislativa pode surgir. O aplicativo deve ser configurado para suportar alterações nas alíquotas.

---

## 5. Panorama do Mercado — Maio de 2026

### 5.1 Taxas de Referência

| Indicador | Valor (Maio/2026) | Fonte |
|---|---|---|
| Taxa Selic | **14,50% a.a.** | BACEN (atualizado 19/05/2026) |
| CDI | **~14,65% a.a.** | ANBIMA/B3 |
| IPCA (últimos 12m) | ~5,5% a.a. (estimado) | IBGE |
| CDI mensal | ~1,14% ao mês | — |
| CDI acumulado 2026 (até maio) | ~5,49% | — |

> **Relação Selic/CDI:** O CDI fica aproximadamente 0,10 p.p. abaixo da meta Selic, pois representa a taxa de empréstimo interbancário overnight.

### 5.2 CDBs Disponíveis por Plataforma

**Nubank (plataforma aberta — produtos de terceiros):**

| Emissor | Taxa | IR previsto | Vencimento | Mín. | Risco |
|---|---|---|---|---|---|
| Nubank (próprio) | 102,5% CDI | 20% | 24/11/2026 | R$ 100 | Baixo |
| Realize CFI | 104% CDI | 17,5% | 27/05/2027 | R$ 1.000 | Moderado |
| PicPay Bank | 104,75% CDI | 17,5% | 27/05/2027 | R$ 1.000 | Baixo |
| Banco BMG | 99% CDI | 17,5% | 27/05/2027 | R$ 1.000 | Baixo |
| Banco Rendimento | Não especificado | — | Curto prazo | R$ 1.000 | — |

**BTG Pactual (carteira atual):**

| Produto | Taxa | Liquidez | Vencimento | Valor |
|---|---|---|---|---|
| CDB Liquidez Diária | 100% CDI | D+0 | Sem vencimento | R$ 250.000 |
| CDB 100,6% CDI | 100,6% CDI | D+366 | Sem vencimento | R$ 250.000 |
| CDB Banco Digimais | 109% CDI | D+179 | 23/11/2026 | R$ 100.000 |

**XP Investimentos / Rico (mercado — maio 2026):**

| Produto | Taxa | Prazo |
|---|---|---|
| CDB prefixado | até 14,25% a.a. | >12 meses |
| CDB inflação | até IPCA + 8,40% | >12 meses |
| CDB pós-fixado | até 108% CDI | >12 meses |
| CDB Banco C6 | 103% CDI | até 2032 |
| CDB Banco BMG | 99% CDI | até 2027 |

**Fintechs e bancos médios:**

| Instituição | Oferta típica | Observação |
|---|---|---|
| Sofisa Direto | 105-115% CDI | Bancos médios, FGC até R$ 250k |
| Banco Inter | 100-107% CDI | App digital, liquidez variada |
| C6 Bank | 100-103% CDI | |
| Neon | 100-108% CDI | |
| Mercado Pago | 100-105% CDI | |

**Grandes bancos (taxa de balcão):**

| Instituição | Oferta típica | Característica |
|---|---|---|
| Itaú | 100% CDI | Liquidez diária (produto padrão) |
| Bradesco | 100% CDI | Liquidez diária |
| Santander | 100% CDI | Liquidez diária |
| Caixa Econômica | 100% CDI | Liquidez variável |
| Banco do Brasil | 100% CDI | Liquidez variável |

> **Conclusão:** Os grandes bancos tradicionais oferecem apenas 100% CDI com liquidez diária. Para obter taxas acima de 100% CDI, é necessário recorrer a bancos médios, fintechs ou plataformas de investimento como BTG, XP e Nubank (como marketplace).

### 5.3 LCI e LCA Disponíveis

**XP Investimentos:**

| Produto | Taxa | Prazo | Mínimo |
|---|---|---|---|
| LCA Original | 92% CDI | Maio/2029 (~36m) | — |
| LCI diversas | 80-85% CDI | 6-12 meses | — |
| LCA diversas | 85-92% CDI | 6-12 meses | — |
| LCI/LCA IPCA | IPCA + 5,8% | >12 meses | — |
| LCI/LCA prefixado | até 11,34% a.a. | >6 meses | — |

**Meelion (comparador — 228 produtos LCI em maio 2026):**
- LCI pós-fixado: 80% a 95% CDI
- LCA pós-fixado: 85% a 94,5% CDI (conforme Seu Dinheiro)
- Prazo mínimo: 6 meses (resolução CMN de maio/2025)

### 5.4 Tesouro Direto

| Título | Taxa | Vencimento | Observação |
|---|---|---|---|
| Tesouro Selic 2031 | Selic + 0,0823% | 2031 | Liquidez diária, referência |
| Tesouro Prefixado | ~14,03% a.a. | 2028 | Semestral com juros |
| Tesouro IPCA+ 2029 | IPCA + 7,20% | 2029 | Proteção inflação |
| Tesouro IPCA+ 2035 | IPCA + 7,68% | 2035 | Longo prazo |
| Tesouro IPCA+ 2045 | IPCA + 6,95% | 2045 | Muito longo prazo |

---

## 6. Carteira Real do Usuário (Referência)

### 6.1 Resumo Consolidado (27/05/2026)

| Instituição | Valor Aproximado | Observação |
|---|---|---|
| BTG Pactual | R$ 600.000,00 | Conforme relatório AVIN/BTG |
| Nubank | R$ 627.393,41 | Saldo disponível no app |
| **Total estimado** | **~R$ 1.227.393,41** | Renda fixa consolidada |

### 6.2 Análise da Carteira BTG (com IR)

O relatório BTG exibe rentabilidade **bruta**. Estimando o impacto do IR:

**CDB Liquidez Diária – 100% CDI – R$ 250.000**
- Rentabilidade bruta 12m: 14,89%
- IR: 15% (>720 dias se ativo há mais de 2 anos) ou 17,5% (361-720 dias)
- Estimativa líquida: ~12,66% a.a. (IR 15%) ou ~12,28% a.a. (IR 17,5%)

**CDB 100,6% CDI (Carência 90 dias) – R$ 250.000**
- Rentabilidade bruta 12m: 14,98%
- IR: dependente do prazo acumulado desde a aplicação
- Se aplicado há mais de 2 anos: 15% → líquido ~12,73%
- Se aplicado há 1-2 anos: 17,5% → líquido ~12,36%

**CDB Banco Digimais – 109% CDI – R$ 100.000 – Vencimento 23/11/2026**
- Rentabilidade bruta 12m: 16,33%
- Vencimento: 23/11/2026
- Prazo desde hoje até vencimento: ~180 dias
- **IR aplicável no vencimento: 22,5%** (se prazo total desde aplicação ≤ 180 dias)
- **IR aplicável no vencimento: 20%** (se prazo total desde aplicação está entre 181-360 dias)
- Estimativa líquida anualizada (cenário IR 20%): **~13,00% a.a.**

> **Conclusão sobre o Digimais:** Mesmo com 109% CDI, a taxa líquida anualizada (~13%) é próxima ao CDB de 100% CDI por mais de 2 anos (~12,66%). A vantagem da taxa maior é parcialmente absorvida pelo IR maior (20% vs 15%).

### 6.3 Rendimentos Nubank — Maio 2026 (26 dias)

```
Rendimento bruto:   R$ 5.869,71
IR retido:         -R$ 1.181,26  (equivale a ~20,13% sobre rendimento)
IOF:               -R$ 0,00
Rendimento líquido: R$ 4.688,45

Saldo:    R$ 627.393,41
Bruto %:  5.869,71 / 627.393,41 ≈ 0,936% (26 dias)
Anualizado bruto: (1,00936)^(365/26) - 1 ≈ 15,17% a.a.
Líquido %: 4.688,45 / 627.393,41 ≈ 0,748% (26 dias)
Anualizado líquido: (1,00748)^(365/26) - 1 ≈ 11,98% a.a.
```

> A rentabilidade líquida anualizada estimada do Nubank em maio/2026 é de aproximadamente **12% a.a.** — mesmo com saldo exposto principalmente a 100% CDI (14,65% bruto).

---

## 7. Fórmulas Matemáticas Detalhadas

### 7.1 Nomenclatura

| Símbolo | Significado |
|---|---|
| `i` | Taxa bruta anual (decimal). Ex: 14,17% → `i = 0,1417` |
| `pct_cdi` | Percentual do CDI (decimal). Ex: 102,5% CDI → `pct_cdi = 1,025` |
| `cdi` | CDI anual atual (decimal). Ex: 14,65% → `cdi = 0,1465` |
| `d` | Prazo em dias corridos |
| `R_bruto` | Rendimento bruto no período (decimal) |
| `alpha` | Alíquota de IR (decimal) |
| `R_liq` | Rendimento líquido no período (decimal) |
| `i_liq` | Rentabilidade líquida anualizada (decimal) |
| `P` | Principal investido (R$) |
| `IOF` | Alíquota IOF conforme tabela (decimal) |

### 7.2 Determinação da Taxa Bruta Anual

**Para pré-fixado:**
```
i = taxa_anunciada / 100
Ex: 14,17% a.a. → i = 0,1417
```

**Para pós-fixado (% do CDI):**
```
i = (pct_cdi / 100) × cdi_atual
Ex: 102,5% do CDI, CDI = 14,65% → i = 1,025 × 0,1465 = 0,15016 (15,02%)
```

**Para híbrido (IPCA + spread):**
```
i = ((1 + ipca_anual) × (1 + spread) - 1)
Ex: IPCA 5,5% + 7,20% → i = 1,055 × 1,072 - 1 = 0,130960 (13,10%)
```

> **Nota sobre convenção de dias:** Para CDB pós-fixado, o cálculo oficial usa 252 dias úteis e CDI diário acumulado. Para planejamento e simulação com taxa projetada, usamos 365 dias corridos como aproximação razoável e suficiente para comparação.

### 7.3 Rendimento Bruto no Período

```
R_bruto = (1 + i)^(d / 365) - 1
```

**Exemplo:** i = 0,1502 (pós-fixado 102,5% CDI), d = 181 dias:
```
R_bruto = (1 + 0,1502)^(181/365) - 1 = 1,1502^0,4959 - 1 ≈ 7,15%
```

### 7.4 Determinação da Alíquota de IR

```
Se d ≤ 180:  alpha = 0.225   (22,5%)
Se d ≤ 360:  alpha = 0.200   (20,0%)
Se d ≤ 720:  alpha = 0.175   (17,5%)
Se d > 720:  alpha = 0.150   (15,0%)
```

### 7.5 Determinação da Alíquota de IOF

```
Tabela IOF (dia → alíquota sobre rendimento):
Dia 1: 96%  | Dia 2: 93%  | Dia 3: 90%  | Dia 4: 86%  | Dia 5: 83%
Dia 6: 80%  | Dia 7: 76%  | Dia 8: 73%  | Dia 9: 70%  | Dia 10: 66%
Dia 11: 63% | Dia 12: 60% | Dia 13: 56% | Dia 14: 53% | Dia 15: 50%
Dia 16: 46% | Dia 17: 43% | Dia 18: 40% | Dia 19: 36% | Dia 20: 33%
Dia 21: 30% | Dia 22: 26% | Dia 23: 23% | Dia 24: 20% | Dia 25: 16%
Dia 26: 13% | Dia 27: 10% | Dia 28: 6%  | Dia 29: 3%  | Dia 30+: 0%

Se produto isento (LCI, LCA, CRI, CRA): IOF = 0% independente do prazo
```

### 7.6 Rendimento Líquido com IOF e IR

**Quando há IOF (d < 30, produto não isento):**
```
R_apos_iof = R_bruto × (1 - IOF_alíquota)
R_liq = R_apos_iof × (1 - alpha_IR)
```

**Quando não há IOF (d >= 30 ou produto isento):**
```
R_liq = R_bruto × (1 - alpha_IR)
```

**Produto isento de IR (LCI, LCA, CRI, CRA):**
```
R_liq = R_bruto   (sem desconto)
```

### 7.7 Rentabilidade Líquida Anualizada — Fórmula Central do Aplicativo

```
i_liq_anual = (1 + R_liq)^(365 / d) - 1
```

**Fórmula direta consolidada (produto tributado, sem IOF):**
```
i_liq_anual = [1 + (1 - alpha) × ((1 + i)^(d/365) - 1)]^(365/d) - 1
```

Onde:
- `i` = taxa bruta anual (pré-fixado direto ou pct_CDI × CDI_atual para pós-fixado)
- `d` = prazo efetivo em dias corridos
- `alpha` = alíquota IR conforme tabela regressiva

### 7.8 Cálculo do Valor Monetário

```
Lucro_bruto = P × R_bruto
IOF_valor   = Lucro_bruto × iof_aliq   (se d < 30 e não isento, senão 0)
IR_valor    = (Lucro_bruto - IOF_valor) × alpha  (se não isento IR, senão 0)
Lucro_líquido = Lucro_bruto - IOF_valor - IR_valor
Valor_final   = P + Lucro_líquido
```

### 7.9 Prazo Efetivo — Regra do Produto vs Investidor

**Regra fundamental do aplicativo:**

```
data_efetiva_resgate = min(data_fim_desejado_pelo_investidor, data_vencimento_produto)
prazo_efetivo_dias   = (data_efetiva_resgate - data_inicio).days
```

- Se `data_fim_investidor > data_vencimento_produto`: prazo limitado pelo produto (fator limitante = PRODUTO)
- Se `data_fim_investidor < data_vencimento_produto`: prazo limitado pelo investidor (fator limitante = INVESTIDOR)
- Se `data_vencimento_produto` não informado: prazo = data_fim_investidor

### 7.10 Comparação CDB vs LCI/LCA

Para comparar um CDB tributado com uma LCI/LCA isenta no mesmo prazo:

**CDB equivalente para competir com LCI/LCA:**
```
CDB_pct_CDI_equivalente = LCI_pct_CDI / (1 - alpha_IR)

Ex: LCA 90% CDI, prazo 181-360 dias (IR 20%):
CDB_equiv = 90% / (1 - 0,20) = 90% / 0,80 = 112,5% CDI

→ Só vale o CDB se render mais de 112,5% CDI no mesmo prazo.
```

**LCI/LCA equivalente para competir com CDB:**
```
LCI_pct_CDI_equivalente = CDB_pct_CDI × (1 - alpha_IR)

Ex: CDB 104% CDI, prazo 361-720 dias (IR 17,5%):
LCI_equiv = 104% × (1 - 0,175) = 104% × 0,825 = 85,8% CDI

→ A LCI só é melhor se pagar mais de 85,8% CDI.
```

---

## 8. Exemplos Práticos de Cálculo

### 8.1 Exemplo 1 — CDB Nubank 102,5% CDI (vencimento 24/11/2026)

**Dados:**
- Início: 27/05/2026
- Vencimento produto: 24/11/2026
- Prazo efetivo: 181 dias
- CDI atual: 14,65% a.a.
- Taxa bruta: 102,5% × 14,65% = 15,02% a.a.

**Cálculo:**
```
R_bruto = (1,1502)^(181/365) - 1 = 7,14%
IR: d = 181 dias → alpha = 20%
R_liq = 7,14% × 0,80 = 5,71%
i_liq_anual = (1,0571)^(365/181) - 1 = 11,80% a.a.
```

**Em R$ (investimento de R$ 100.000):**
```
Lucro bruto: R$ 7.140
IR (20%): -R$ 1.428
Lucro líquido: R$ 5.712
Valor final: R$ 105.712
Taxa anual líquida equivalente: 11,80% a.a.
```

**Versus CDI puro (100%) pelo mesmo prazo:**
```
i_bruto = 14,65% a.a. → R_bruto = (1,1465)^(181/365) - 1 = 6,97%
R_liq = 6,97% × 0,80 = 5,58% → i_liq = 11,51% a.a.
```

**Conclusão:** O diferencial de 2,5% CDI na taxa bruta se traduz em apenas **0,29 p.p.** de ganho líquido anualizado (11,80% vs 11,51%).

---

### 8.2 Exemplo 2 — CDB Digimais 109% CDI (vencimento 23/11/2026)

**Dados:**
- Início hipotético: 27/05/2026
- Vencimento produto: 23/11/2026
- Prazo efetivo: 180 dias
- Taxa bruta: 109% × 14,65% = 15,97% a.a.

**Cálculo:**
```
R_bruto = (1,1597)^(180/365) - 1 = 7,37%
IR: d = 180 dias → alpha = 22,5%
R_liq = 7,37% × 0,775 = 5,71%
i_liq_anual = (1,0571)^(365/180) - 1 = 11,83% a.a.
```

**Versus LCA 92% CDI pelo mesmo prazo:**
```
i_lca = 92% × 14,65% = 13,48% a.a.
R_bruto_lca = (1,1348)^(180/365) - 1 = 6,39%
R_liq_lca = 6,39% (isento)
i_liq_lca = (1,0639)^(365/180) - 1 = 13,37% a.a.
```

**Conclusão surpreendente:** A LCA a 92% CDI (**13,37% a.a. líquido**) supera o CDB Digimais a 109% CDI (**11,83% a.a. líquido**) pelo mesmo prazo. Diferença: **+1,54 p.p.** em favor da LCA.

---

### 8.3 Exemplo 3 — Comparação Longa Duração (720 dias)

**CDB 109% CDI por 2 anos:**
```
i = 15,97% a.a.
R_bruto = (1,1597)^(720/365) - 1 = 36,53%
IR: 17,5% (faixa 361-720 dias)
R_liq = 36,53% × 0,825 = 30,14%
i_liq_anual = (1,3014)^(365/720) - 1 = 13,62% a.a.
```

**LCA 92% CDI por 2 anos:**
```
i = 13,48% a.a.
R_bruto = (1,1348)^(720/365) - 1 = 29,68%
R_liq = 29,68% (isenta)
i_liq_anual = (1,2968)^(365/720) - 1 = 13,37% a.a.
```

**Conclusão:** Com prazo de 2 anos, o CDB a 109% CDI (13,62% líquido) supera levemente a LCA a 92% CDI (13,37% líquido). A vantagem do CDB cresce com o prazo (IR menor) e com taxas brutas mais altas.

> **Ponto de equilíbrio (break-even):**
> - Prazo 361-720 dias (IR 17,5%): CDB precisa de **≥ 111,5% CDI** para superar LCA 92% CDI
> - Prazo > 720 dias (IR 15%): CDB precisa de **≥ 108,2% CDI** para superar LCA 92% CDI

---

### 8.4 Exemplo 4 — Carteira do Usuário: CDB 109% CDI Digimais, data real de aplicação

Supondo que o produto foi aplicado há ~180 dias (data de aplicação: ~27/11/2025):

```
Prazo real (data aplicação → vencimento 23/11/2026): ~361 dias
IR: 17,5% (faixa 361-720 dias)

Taxa bruta: 109% × CDI_médio_período ≈ 109% × 14,89% = 16,23% a.a.
R_bruto = (1,1623)^(361/365) - 1 = 16,00%
R_liq = 16,00% × 0,825 = 13,20%
i_liq_anual = (1,1320)^(365/361) - 1 = 13,35% a.a.
```

**Versus CDB Liquidez Diária 100% CDI por 2 anos:**
```
i = 14,89% a.a.
R_bruto = (1,1489)^(730/365) - 1 = 32,00%
IR: 15% (>720 dias)
R_liq = 32,00% × 0,85 = 27,20%
i_liq_anual = (1,2720)^(365/730) - 1 = 12,77% a.a.
```

**Conclusão:** O Digimais (13,35% a.a. líquido) supera o CDB diário (12,77% a.a. líquido) em 0,58 p.p. — mas apenas porque o prazo de 361 dias cai na faixa de 17,5% de IR.

---

## 9. Especificação do Aplicativo Web

### 9.1 Visão Geral

**Nome sugerido:** `RentaReal` — Calculadora de Rentabilidade Líquida Anualizada

**Missão:** Revelar a taxa real, líquida de impostos e anualizada, de qualquer investimento de renda fixa no Brasil, comparando produtos de diferentes bancos em base igualitária.

**Público-alvo:** Investidores pessoa física com carteiras acima de R$ 50.000 que desejam otimizar a alocação em renda fixa.

**Plataforma:** Aplicativo web responsivo (funciona em mobile e desktop)

---

### 9.2 Módulos do Aplicativo

#### Módulo 1 — Calculadora Individual

**Inputs do usuário:**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| Tipo de Produto | Select | Sim | CDB / LCI / LCA / CRI / CRA / Debênture Incentivada / Tesouro Selic / Tesouro Prefixado / Tesouro IPCA+ |
| Modalidade | Select | Sim | Pré-fixado / Pós-fixado (% CDI) / Híbrido (IPCA+) |
| Taxa bruta anual | Número | Sim | Ex: 14,17% a.a. ou 102,5% do CDI |
| CDI atual | Número | Auto-preenchido | Via API BACEN — editável manualmente |
| IPCA projetado | Número | Auto-preenchido | Para cálculo de produtos híbridos |
| Valor investido | Número | Não | Para calcular ganho em R$ |
| Data de início | Data | Sim | Data de aplicação |
| Data de resgate desejada | Data | Sim | Quando pretende resgatar |
| Data de vencimento do produto | Data | Não | Data limite do produto (se houver) |
| Produto isento de IR? | Toggle | Auto | Auto-detectado pelo tipo; editável pelo usuário |

**Lógica automática:**
- CDI e Selic buscados da API BACEN na abertura
- Tipo de produto define automaticamente se é isento de IR/IOF
- Prazo efetivo calculado com `min(data_resgate, data_vencimento)` se vencimento informado
- Alíquotas IR e IOF calculadas automaticamente com base no prazo efetivo

**Outputs exibidos:**

```
╔═══════════════════════════════════════════════════╗
║     TAXA ANUAL EQUIVALENTE LÍQUIDA                ║
║               12,07% a.a.                         ║
║   (versus 14,17% a.a. bruto anunciado)            ║
║   Você ganhou 2,10 p.p. a menos do anunciado      ║
╚═══════════════════════════════════════════════════╝

Prazo efetivo:              97 dias (limitado pelo: INVESTIDOR)
Alíquota IR aplicável:      22,5% (prazo ≤ 180 dias)
Alíquota IOF aplicável:     0% (prazo ≥ 30 dias)
Taxa bruta anual:           14,17% a.a.
Rendimento bruto período:   3,578%
IR descontado período:      0,805%
Rendimento líquido período: 2,773%
Taxa anual líquida equiv.:  10,83% a.a.   ← DESTAQUE PRINCIPAL

─── Se informou valor: ────────────────────────────
Principal investido:   R$ 600.000,00
Ganho bruto período:   R$ 21.468,00
IR pago:              -R$ 4.830,30
Ganho líquido:         R$ 16.637,70
Valor final:           R$ 616.637,70

─── Comparativo: ──────────────────────────────────
vs. CDI puro 100%:     11,51% a.a. líq. (você ganhou +0,29 p.p.)
vs. Tesouro Selic:     12,29% a.a. líq. (você perdeu -0,22 p.p.)
vs. Poupança:          5,32% a.a. líq.  (você ganhou +5,49 p.p.)
```

**Alertas automáticos:**
- Amarelo: "IOF incide! Aguarde mais X dias para zero IOF"
- Laranja: "Se aguardar mais 3 dias (passando para 181 dias), o IR cai de 22,5% para 20% — ganho adicional de R$ XXX"
- Azul: "Produto vence antes da data de resgate desejada — prazo foi ajustado para 23/11/2026"
- Verde: "LCA a 92% CDI seria equivalente a um CDB de 112% CDI neste prazo"

---

#### Módulo 2 — Comparador de Produtos

Permite comparar até 10 produtos simultaneamente.

**Input:** Lista de produtos (formulário para cada um)
**Output:** Ranking por taxa líquida anual, tabela e gráfico de barras

**Exemplo de saída:**

```
RANKING — DO MELHOR AO PIOR (taxa líquida anual equivalente)

#  | Produto               | Taxa Bruta    | Prazo | IR    | Taxa Líquida | Ganho R$*
---|----------------------|---------------|-------|-------|--------------|----------
1  | LCA Original XP       | 92% CDI       | 36m   | 0%    | 13,37% a.a. | R$ 102.300
2  | CDB PicPay Bank       | 104,75% CDI   | 12m   | 17,5% | 12,65% a.a. | R$ 88.520
3  | CDB Digimais          | 109% CDI      | 12m   | 17,5% | 13,05% a.a. | R$ 91.100
4  | CDB Nubank            | 102,5% CDI    | 6m    | 20%   | 11,80% a.a. | R$ 42.840
5  | CDB Liquidez Diária   | 100% CDI      | 1m    | 22,5% | 11,04% a.a. | R$ 6.240

* Baseado em principal de R$ 100.000
```

---

#### Módulo 3 — Minha Carteira

Portfólio pessoal do usuário.

**Funcionalidades:**
- CRUD de produtos (adicionar, editar, excluir)
- Visualização consolidada: total investido, rentabilidade média ponderada bruta e líquida
- Alerta de vencimentos próximos (7, 30 e 90 dias)
- Sugestão no vencimento: "Este produto vence em 30 dias. Reinvistindo em LCA 92% CDI, sua taxa líquida passaria de X% para Y%"
- Importação de relatório PDF (BTG, XP, etc.)
- Gráfico de distribuição por faixa de IR (prazo)
- Gráfico de distribuição por tipo (CDB, LCI, LCA)

**Métricas consolidadas:**
- Total investido e patrimônio estimado no vencimento
- Rentabilidade bruta da carteira (% a.a.)
- Rentabilidade líquida estimada da carteira (% a.a.)
- IR estimado total a pagar nos vencimentos
- % CDI da carteira (bruto e líquido)
- Distribuição de liquidez: D+0, até 180 dias, 180-365 dias, >365 dias

---

#### Módulo 4 — Varredura de Mercado em Tempo Real

Busca automaticamente os melhores produtos disponíveis e calcula taxa líquida real.

**Configuração do usuário:**
- Valor a investir (para filtrar mínimo)
- Prazo desejado (slider)
- Tolerância ao risco (FGC obrigatório / Aceito sem FGC)
- Tipo preferido (qualquer / LCI+LCA apenas / CDB apenas)

**Resultado:**

```
TOP PRODUTOS DO MERCADO HOJE — 27/05/2026
(ordenados por taxa líquida real)

Tipo | Emissor         | Taxa Bruta    | Prazo    | IR    | TAXA LÍQUIDA REAL
-----|-----------------|---------------|----------|-------|------------------
LCA  | Original (XP)   | 92% CDI       | 36 meses | 0%    | 13,37% a.a.  ★
CDB  | Banco Daycoval  | 113% CDI      | 24 meses | 15%   | 13,32% a.a.
LCI  | Banco Pan       | 91% CDI       | 12 meses | 0%    | 12,59% a.a.
CDB  | Sofisa Direto   | 111% CDI      | 12 meses | 17,5% | 12,88% a.a.
CDB  | PicPay Bank     | 104,75% CDI   | 12 meses | 17,5% | 12,65% a.a.
TD   | Tesouro IPCA+35 | IPCA+7,68%    | 9 anos   | 15%   | IPCA+6,53%*
CDB  | Digimais (BTG)  | 109% CDI      | 6 meses  | 22,5% | 11,83% a.a.
CDB  | Nubank          | 102,5% CDI    | 6 meses  | 20%   | 11,80% a.a.
CDB  | Liquidez Diária | 100% CDI      | Qualquer | 22,5% | 11,04% a.a.**

* Assume IPCA projetado de 5,5%
** Taxa para resgate mensal; melhora com prazos maiores
```

---

### 9.3 Interface de Usuário (UX/UI)

**Design Principles:**
- Mobile-first — usuário opera no celular como visto nas screenshots
- Clareza absoluta — a taxa líquida anualizada em destaque (grande, verde)
- Contexto — sempre comparar com CDI puro e Tesouro Selic como benchmark
- Sem jargão — tooltips explicativos para IR, IOF, CDI, FGC
- Dark mode (inspirado no Nubank)

**Hierarquia visual na calculadora:**

```
[Menor prioridade visual]
  → Inputs (formulário discreto)
  → Breakdown detalhado (colapsável)
  → Comparativos (secundário)
[Maior prioridade visual]
  → TAXA ANUAL LÍQUIDA EQUIVALENTE (destaque absoluto, fonte grande)
```

**Fluxo principal da calculadora (mobile):**

```
Passo 1: Tipo de Produto
  [CDB] [LCI] [LCA] [Tesouro] [Outros]

Passo 2: Modalidade + Taxa
  ( ) Pré-fixado: ___% ao ano
  (•) Pós-fixado: ___% do CDI  [CDI atual: 14,65%]
  ( ) Híbrido:   IPCA + ___% ao ano

Passo 3: Datas
  Data de início:   [27/05/2026]
  Data de resgate:  [__/__/____]
  Vencimento prod.: [__/__/____] (opcional)

Passo 4: Valor (opcional)
  Quanto vai investir? [R$ ___________]

                    [CALCULAR]

══════════════════════════════════
  TAXA ANUAL LÍQUIDA EQUIVALENTE
           12,07% a.a.
  (anunciado: 14,17% a.a. bruto)
══════════════════════════════════
  [Ver detalhes ▼]
```

---

### 9.4 Regras de Negócio Críticas

| # | Regra | Descrição |
|---|---|---|
| 1 | Prazo efetivo | `min(data_resgate_desejada, data_vencimento_produto)` |
| 2 | Produto isento | LCI, LCA, CRI, CRA, Debêntures incentivadas → IR = 0%, IOF = 0% |
| 3 | IOF | Apenas se prazo < 30 dias E produto não isento |
| 4 | CDI pós-fixado | `taxa_bruta = pct_CDI × CDI_atual` para projeção |
| 5 | IPCA híbrido | `taxa_bruta = (1 + IPCA) × (1 + spread) - 1` |
| 6 | Alerta faixa IR | Mostrar ganho adicional se esperar mais X dias |
| 7 | CDI automático | API BACEN na abertura; fallback: último valor salvo |
| 8 | FGC | Avisar se produto sem FGC (CRI, CRA, Debêntures) |
| 9 | Vencimento antes | Avisar se produto vence antes da data desejada de resgate |
| 10 | Equivalência | Mostrar qual % CDI um LCI equivale a CDB tributado e vice-versa |

---

### 9.5 Stack Tecnológico Sugerido

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR, SEO, deploy simples, TypeScript nativo |
| Linguagem | TypeScript | Tipagem para cálculos financeiros precisos |
| Estilo | Tailwind CSS | Rápido, responsivo, mobile-first |
| Gráficos | Recharts | Gráficos reativos leves |
| Backend | Next.js API Routes | Proxy para APIs BACEN (evitar CORS) |
| Deploy | Vercel | Gratuito para MVP, CDN global |
| Cálculos | Decimal.js | Evitar erros de ponto flutuante em R$ |
| Estado | Zustand ou useState | Leve para MVP |
| Cache | SWR + localStorage | CDI e dados de mercado (atualização diária) |

---

## 10. Comparação entre Produtos — Metodologia

### 10.1 Princípio da Comparação Justa

Todo produto deve ser comparado na mesma base:
- **Mesmo prazo efetivo**
- **Mesmo principal investido**
- **Após dedução de todos os impostos (IR + IOF)**
- **Taxa anualizada** (para prazos diferentes serem comparáveis)

### 10.2 Tabela de Equivalência CDB × LCI/LCA (CDI = 14,65%)

Para um CDB ser equivalente a uma LCI/LCA, o CDB precisa pagar:

| Prazo efetivo | Faixa IR CDB | LCI/LCA taxa | CDB mín. equivalente |
|---|---|---|---|
| ≤ 180 dias | 22,5% | 85% CDI | **109,7% CDI** |
| ≤ 180 dias | 22,5% | 90% CDI | **116,1% CDI** |
| ≤ 180 dias | 22,5% | 92% CDI | **118,7% CDI** |
| 181-360 dias | 20,0% | 85% CDI | **106,3% CDI** |
| 181-360 dias | 20,0% | 90% CDI | **112,5% CDI** |
| 181-360 dias | 20,0% | 92% CDI | **115,0% CDI** |
| 361-720 dias | 17,5% | 85% CDI | **103,0% CDI** |
| 361-720 dias | 17,5% | 90% CDI | **109,1% CDI** |
| 361-720 dias | 17,5% | 92% CDI | **111,5% CDI** |
| > 720 dias | 15,0% | 85% CDI | **100,0% CDI** |
| > 720 dias | 15,0% | 90% CDI | **105,9% CDI** |
| > 720 dias | 15,0% | 92% CDI | **108,2% CDI** |

> **Insight chave:** Uma LCA a 85% CDI por mais de 720 dias equivale exatamente a um CDB de 100% CDI — mesma rentabilidade líquida anualizada. Uma LCA a 92% CDI requer um CDB de 108% CDI para ser igualada em prazos longos.

### 10.3 Quando o LCI/LCA Ganha vs CDB

```
LCI/LCA GANHA se:
  lca_pct_cdi > cdb_pct_cdi × (1 - alpha_IR)

CDB GANHA se:
  cdb_pct_cdi × (1 - alpha_IR) > lca_pct_cdi

EMPATE (break-even):
  lca_pct_cdi = cdb_pct_cdi × (1 - alpha_IR)
  → cdb_break_even = lca_pct_cdi / (1 - alpha_IR)
```

---

## 11. Fontes de Dados em Tempo Real

### 11.1 APIs Públicas — BACEN

| Dado | Serie | Endpoint |
|---|---|---|
| CDI diário | 4391 | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.4391/dados/ultimos/1?formato=json` |
| Selic diário | 11 | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json` |
| IPCA mensal | 13522 | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.13522/dados/ultimos/12?formato=json` |
| CDI acumulado | 4391 | Acumular série histórica para período |
| Selic meta | 432 | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json` |

**Exemplo resposta CDI:**
```json
[{"data": "27/05/2026", "valor": "0.057573"}]
// CDI diário = 0,057573% → anualizado: (1,00057573)^252 - 1 ≈ 15,71% (base 252 dias úteis)
// OU: (1,00057573)^365 - 1 ≈ 22,9% (base 365 — NÃO usar diretamente)
// O CDI anual é divulgado separadamente pela ANBIMA
```

### 11.2 Tesouro Direto

```
GET https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/model/dto/TesouroDiretoDto.json
```

Retorna taxas e preços de todos os títulos disponíveis em tempo real.

### 11.3 Fontes de Comparação de Mercado

| Fonte | URL | Tipo de Acesso | Dados |
|---|---|---|---|
| InfoMoney | infomoney.com.br/onde-investir | Público | CDB/LCI/LCA diário na XP |
| Meelion | meelion.com/renda-fixa/comparar | Público (scraping) | 200+ produtos |
| Investidor10 | investidor10.com.br/renda-fixa | Público | Rankings CDB |
| IDinheiro | idinheiro.com.br/investimentos | Público | Comparadores |
| BTG Comparador | investimentos.btgpactual.com/comparador | Público | Produtos BTG |
| B3 / ANBIMA | anbima.com.br | API pública | Índices oficiais |
| BACEN Open Finance | openfinance.bcb.gov.br | OAuth2 | Portfólio real autenticado |

### 11.4 Estratégia de Atualização

- **CDI e Selic:** Atualização diária automática via API BACEN
- **Produtos de bancos:** Atualização diária (scraping agendado) com cache de 24h
- **Fallback:** Últimos valores salvos se API indisponível
- **Cache cliente:** localStorage para CDI e última lista de produtos

---

## 12. Roadmap e Próximos Passos

### Fase 1 — MVP: Calculadora Individual (prioridade máxima)

**Entregável:** Calculadora web funcional com 1 produto

**Requisitos mínimos:**
- [ ] Input de tipo, modalidade, taxa, datas
- [ ] Auto-preenchimento do CDI via API BACEN
- [ ] Cálculo correto de prazo efetivo (min entre resgate e vencimento)
- [ ] Tabela IR e IOF implementadas
- [ ] Exibição clara da taxa anual líquida equivalente
- [ ] Breakdown detalhado (IR, IOF, bruto, líquido)
- [ ] Cálculo em R$ quando informado valor
- [ ] Alertas de faixa IR e IOF
- [ ] Comparativo com CDI 100% e Tesouro Selic

**Prompt para Claude implementar:** Ver `app_specification.json`

### Fase 2 — Comparador Simultâneo

- [ ] Interface de múltiplos produtos (até 10)
- [ ] Gráfico de barras comparativo
- [ ] Ranking automático por taxa líquida
- [ ] Exportação para PDF/CSV

### Fase 3 — Minha Carteira

- [ ] Persistência (localStorage inicialmente, depois Firebase)
- [ ] CRUD de produtos
- [ ] Dashboard consolidado da carteira
- [ ] Alertas de vencimento
- [ ] Importação de PDF BTG/XP

### Fase 4 — Varredura de Mercado

- [ ] Integração API BACEN completa
- [ ] Scraping diário de comparadores
- [ ] Banco de dados de produtos atualizados
- [ ] Ranking automático de melhores taxas líquidas
- [ ] Filtros por valor mínimo, prazo, risco, tipo

### Fase 5 — Open Finance

- [ ] Integração Open Finance (BACEN)
- [ ] Importação automática BTG, Nubank, XP, Inter
- [ ] Sincronização de saldo em tempo real
- [ ] Notificações de oportunidade

---

## 13. Referências e Fontes Consultadas

### Documentos e Relatórios
- **PDF:** Relatório da Proposta AVIN/BTG Pactual — período 01/05/2025–30/04/2026, gerado em 27/05/2026
- **Screenshots:** Aplicativo Nubank — telas de CDB marketplace, Taxas & Impostos, Rendimentos Maio/2026 (R$ 4.688,45 líquido)

### Sites e Artigos Consultados (27/05/2026)

| Fonte | Tópico |
|---|---|
| [Nubank Blog — IR em investimentos](https://blog.nubank.com.br/imposto-de-renda-investimentos/) | Tabela IR, isenções |
| [Nubank LCI/LCA](https://nubank.com.br/nu/investimentos/lci-lca) | Características LCI/LCA Nubank |
| [B3 Bora Investir — Tributação FII, LCI, LCA, CDB](https://borainvestir.b3.com.br/noticias/imposto-de-renda/taxacao-de-fii-lci-lca-cdb-e-outros-veja-como-ficam-os-impostos-sobre-investimentos/) | Impostos completos |
| [InfoMoney — Renda Fixa Hoje XP 06/05/2026](https://www.infomoney.com.br/onde-investir/renda-fixa-hoje-06052026/) | Taxas XP maio 2026 |
| [Tax Group — Tabela IOF para Investimentos](https://www.taxgroup.com.br/intelligence/tabela-iof-para-investimentos/) | Tabela IOF completa |
| [Numerando — CDI Hoje](https://www.numerando.com.br/cdi-hoje) | CDI 14,40% maio 2026 |
| [Meelion — Selic](https://www.meelion.com/indicadores-financeiros/selic/) | Selic 14,50% (19/05/2026) |
| [InfinitePay — Tabela IR CDB](https://www.infinitepay.io/blog/tabela-ir-cdb) | Alíquotas detalhadas |
| [BTG Pactual Blog](https://content.btgpactual.com/blog/investimentos/) | Produtos BTG |
| [B3 — MP 1.303/2025 e LCI/LCA](https://borainvestir.b3.com.br/noticias/lcis-e-lcas-tributacao-da-renda-fixa-jcp-como-a-mp-1303-afeta-seus-investimentos/) | Status tributação LCI/LCA |
| [Investidor10 — Top CDBs](https://investidor10.com.br/renda-fixa/cdb/) | Rankings CDB 2026 |
| [Gazeta Mercantil — CDB vs LCI vs LCA](https://gazetamercantil.com/cdb-vs-lci-lca-qual-rende-mais-2026) | Comparação maio 2026 |
| [XP Conteúdos — CDB vs LCI](https://conteudos.xpi.com.br/aprenda-a-investir/relatorios/cdb-ou-lci/) | Metodologia comparação |
| [Seu Dinheiro — LCA rentáveis](https://www.seudinheiro.com/2026/renda-fixa/renda-fixa-lcas-mais-rentaveis-de-fevereiro-pagam-ate-94-do-cdi-sem-imposto-de-renda-veja-prazos-e-emissores-mlim/) | LCA até 94,5% CDI |
| [Tesouro Direto](https://www.tesourodireto.com.br) | Taxas oficiais maio 2026 |
| [BACEN](https://www.bcb.gov.br) | CDI, Selic, calculadora oficial |
| [Investnews — LCI/LCA regras](https://investnews.com.br/investimentos/isencao-de-ir-nas-lci-e-lca-o-que-realmente-esta-valendo-nas-regras-dos-titulos-bancarios/) | Prazos mínimos vigentes |

---

## Anexo A — Tabelas de Referência Rápida

### IR Regressivo

| Prazo (dias corridos) | Alíquota IR |
|---|---|
| 1 – 180 | **22,5%** |
| 181 – 360 | **20,0%** |
| 361 – 720 | **17,5%** |
| 721 + | **15,0%** |

### IOF Completo (sobre rendimento bruto)

| Dia | IOF | Dia | IOF | Dia | IOF |
|---|---|---|---|---|---|
| 1 | 96% | 11 | 63% | 21 | 30% |
| 2 | 93% | 12 | 60% | 22 | 26% |
| 3 | 90% | 13 | 56% | 23 | 23% |
| 4 | 86% | 14 | 53% | 24 | 20% |
| 5 | 83% | 15 | 50% | 25 | 16% |
| 6 | 80% | 16 | 46% | 26 | 13% |
| 7 | 76% | 17 | 43% | 27 | 10% |
| 8 | 73% | 18 | 40% | 28 | 6% |
| 9 | 70% | 19 | 36% | 29 | 3% |
| 10 | 66% | 20 | 33% | ≥30 | **0%** |

### Taxas de Referência — Maio 2026

| Indicador | Valor |
|---|---|
| Selic | 14,50% a.a. |
| CDI | ~14,65% a.a. |
| IPCA (12m estimado) | ~5,5% a.a. |
| Tesouro Selic 2031 | Selic + 0,0823% |
| Tesouro Prefixado | ~14,03% a.a. |
| Tesouro IPCA+ 2029 | IPCA + 7,20% a.a. |
| Tesouro IPCA+ 2035 | IPCA + 7,68% a.a. |

### Guia Rápido — Melhor Produto por Horizonte de Tempo

| Horizonte | Melhor opção | Taxa líquida est. |
|---|---|---|
| < 1 mês (emergência) | CDB Liquidez Diária 100% CDI | ~11,4% a.a. (IOF + IR) |
| 1-6 meses | CDB Liquidez Diária ou Tesouro Selic | ~11,5-12,3% a.a. |
| 6-12 meses | LCA 88%+ CDI | ~12,8% a.a. |
| 1-2 anos | LCA 90%+ CDI ou CDB 110%+ CDI | ~13,0-13,4% a.a. |
| 2-3 anos | CDB 108%+ CDI ou LCA 85%+ CDI | ~12,5-13,3% a.a. |
| > 3 anos (com inflação) | Tesouro IPCA+ | IPCA + 6,5% est. |

---

*Documento criado em 27/05/2026. Taxas e regras sujeitas a alterações sem aviso prévio. Este documento não constitui recomendação de investimento. Rentabilidade passada não representa garantia de rentabilidade futura.*
