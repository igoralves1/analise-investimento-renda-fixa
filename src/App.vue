<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-50 bg-gray-900/90 backdrop-blur border-b border-gray-800">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2">
          <span class="text-green-400 font-black text-xl tracking-tight">Renda Fixa</span><span class="text-white font-black text-xl tracking-tight">Market</span><span class="text-green-400 font-black text-xl tracking-tight">Place</span>
        </RouterLink>
        <div class="flex items-center gap-1">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            :class="$route.path === link.to
              ? 'bg-green-900/50 text-green-400'
              : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </nav>
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <footer class="border-t border-gray-800 py-6 text-center text-xs text-gray-600">
      Dados educacionais. Não constitui recomendação de investimento. Verifique sempre as condições atuais.
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'

const links = [
  { to: '/',           label: 'Início' },
  { to: '/calculadora',label: 'Calculadora' },
  { to: '/produtos',   label: 'Produtos' },
]
</script>
