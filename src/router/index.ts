import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from '@/views/AccueilView.vue'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: AccueilView,
  },
  {
    path: '/formulaire',
    name: 'Formulaire',
    component: () => import('../views/FormulaireView.vue')
  }
  // Tu pourras ajouter d'autres routes ici plus tard
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router