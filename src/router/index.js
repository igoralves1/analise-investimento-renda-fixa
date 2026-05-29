import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView       from '../views/HomeView.vue'
import CalculadoraView from '../views/CalculadoraView.vue'
import ProdutosView   from '../views/ProdutosView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',           component: HomeView,        meta: { title: 'Início' } },
    { path: '/calculadora',component: CalculadoraView, meta: { title: 'Calculadora' } },
    { path: '/produtos',   component: ProdutosView,    meta: { title: 'Produtos' } },
  ],
  scrollBehavior: (to) => to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0 },
})
