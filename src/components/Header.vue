<template>
  <header class="header-navbar">
    <v-container class="d-flex align-center justify-end" fluid>
      <!-- Menu hamburger pour mobile -->
      <div class="d-md-none">
        <v-btn
          icon
          variant="text"
          @click="toggleMobileMenu"
          class="burger-btn"
        >
          <v-icon :icon="mobileMenuOpen ? 'fa:fas fa-times' : 'fa:fas fa-bars'" size="20" />
        </v-btn>
      </div>

      <!-- Navigation pour desktop -->
      <nav class="navbar-nav d-none d-md-block" ref="navbarRef" @mouseleave="onNavLeave">
        <ul class="navbar">
          <li
            v-for="(item, i) in navItems"
            :key="item.name"
            class="navbar-item"
            @mouseenter="onNavHover(i, $event)"
            @mouseleave="onNavItemLeave"
          >
            <a
              :href="item.href"
              @click.prevent="scrollToSection(item.href)"
            >
              <span class="navbar-text">{{ item.name }}</span>
            </a>
          </li>
          <li class="navbar-item theme-toggle">
            <v-btn
              icon
              class="theme-btn"
              :style="{ backgroundColor: isDark ? '#fff' : '#0E003B' }"
              @click="toggleTheme"
              elevation="2"
            >
              <v-icon icon="md:dark_mode" v-if="!isDark" :color="'#fff'" size="28" />
              <v-icon icon="md:light_mode" v-else :color="'#0E003B'" size="28" />
            </v-btn>
          </li>
        </ul>
        <!-- Underline animé -->
        <span
          v-if="underline.show"
          class="navbar-underline"
          :style="{
            width: underline.width + 'px',
            left: underline.left + 'px',
          }"
        ></span>
      </nav>
    </v-container>

    <!-- Menu mobile (affiché quand ouvert) -->
    <transition name="slide-right">
      <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu">
        <div class="mobile-menu" @click.stop>
          <ul class="mobile-navbar">
            <li
              v-for="(item, i) in navItems"
              :key="item.name"
              class="mobile-navbar-item"
            >
              <a
                :href="item.href"
                @click.prevent="mobileNavigate(item.href)"
                class="mobile-link"
              >
                <span class="mobile-navbar-text">{{ item.name }}</span>
              </a>
            </li>
            <li class="mobile-navbar-item theme-toggle-mobile">
              <div class="d-flex align-center justify-center">
                <v-btn
                  icon
                  class="theme-btn"
                  :style="{ backgroundColor: isDark ? '#fff' : '#0E003B' }"
                  @click="toggleTheme"
                  elevation="2"
                >
                  <v-icon icon="md:dark_mode" v-if="!isDark" :color="'#fff'" size="20" />
                  <v-icon icon="md:light_mode" v-else :color="'#0E003B'" size="20" />
                </v-btn>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    
    <!-- Halo orange pour l'effet glow -->
    <div class="halo-orange"></div>
  </header>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router'

const router = useRouter()
const mobileMenuOpen = ref(false)

const navItems = [
  { name: 'Accueil', href: '/#accueil' },
  { name: 'Projets', href: '/#projets' },
  { name: 'Mes Réseaux', href: '/#reseaux' }
]

// Underline state
const underline = ref({
  show: false,
  left: 0,
  width: 0,
})

const navbarRef = ref<HTMLElement | null>(null)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function mobileNavigate(href: string) {
  scrollToSection(href)
  mobileMenuOpen.value = false
}

function onNavHover(i: number, e: MouseEvent) {
  const a = (e.currentTarget as HTMLElement).querySelector('a')
  const textSpan = a?.querySelector('.navbar-text')
  const nav = navbarRef.value
  if (textSpan && nav) {
    const navRect = nav.getBoundingClientRect()
    const spanRect = textSpan.getBoundingClientRect()
    underline.value = {
      show: true,
      left: spanRect.left - navRect.left,
      width: spanRect.width,
    }
  }
}

function onNavItemLeave() {
  underline.value.show = false
}

function onNavLeave() {
  underline.value.show = false
}

// Scroll smooth
function scrollToSection(href: string) {
  underline.value.show = false

  // Vérifier si le lien pointe vers une autre page
  if (href.startsWith('/') && !href.includes('#')) {
    // Navigation vers une autre page sans ancre
    router.push(href)
    return
  }

  // Si nous sommes sur une page différente et qu'on veut revenir à l'accueil
  if (href.includes('/#') && window.location.pathname !== '/') {
    // Naviguer vers la page d'accueil avec l'ancre
    window.location.href = href
    return
  }

  // Navigation sur la même page avec ancre
  const anchorId = href.split('#')[1]
  const el = document.getElementById(anchorId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// THEME toggle
const theme = useTheme()
const isDark = ref(theme.global.current.value.dark)

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
  isDark.value = !isDark.value
}

// Fonction pour fermer le menu en cliquant à l'extérieur
function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.header-navbar {
  background: rgb(var(--v-theme-hero));
  width: 100%;
  z-index: 10;
  top: 0;
  position: relative;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-accent));
  margin: 0;
}

.navbar-nav {
  position: relative;
  margin-right: 5vw;
  width: fit-content;
}

.navbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.navbar-item {
  position: relative;
  margin: 0 10px;
  cursor: pointer;
}

.navbar-item a {
  display: block;
  padding: 8px 20px;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  color: rgb(var(--v-theme-on-hero));
}

.theme-toggle {
  margin-left: 20px;
}

.theme-btn {
  border-radius: 0.625rem !important;
  width: 1.75rem !important;
  height: 1.75rem !important;
  min-width: 1.75rem !important;
  min-height: 1.75rem !important;
  transition: background 0.3s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.theme-btn .v-icon {
  transition: color 0.3s;
}

.navbar-underline {
  position: absolute;
  bottom: 8px;
  height: 2.5px;
  background: rgb(var(--v-theme-accent));
  border-radius: 2px;
  pointer-events: none;
  transition: left 0.25s cubic-bezier(.4,0,.2,1), width 0.25s cubic-bezier(.4,0,.2,1);
}

/* Styles pour le menu mobile */
.burger-btn {
  color: rgb(var(--v-theme-on-hero));
  padding: 6px;
  border-radius: 6px;
  z-index: 101;
}

.burger-btn .v-icon {
  font-size: 20px; /* Taille réduite */
}

.mobile-menu {
  position: relative;
  width: 80%;
  height: 100%;
  background-color: rgb(var(--v-theme-background));
  box-shadow: -2px 0 15px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  padding: 40px 0 20px;
  display: flex;
  flex-direction: column;
}

.mobile-menu-overlay {
  display: flex;
  justify-content: flex-end; /* Cette seule ligne change pour aligner à droite */
}

.mobile-navbar {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
  margin: 0;
  align-items: center;
  text-align: center;
}

.mobile-navbar-item {
  padding: 12px 0;
  width: 100%;
  text-align: center;
}

.mobile-link {
  text-decoration: none !important;
  color: rgb(var(--v-theme-on-background)) !important;
  display: block;
  transition: color 0.2s ease;
  padding: 8px 0;
}

.mobile-link:hover .mobile-navbar-text {
  color: rgb(var(--v-theme-accent));
}

.mobile-navbar-text {
  font-size: 1.2rem;
  font-weight: 500;
  transition: color 0.3s ease;
  display: block;
  text-align: center;
  color: inherit;
}

.theme-toggle-mobile {
  margin-top: 30px;
}

/* Amélioration de l'animation */
.slide-right-enter-active {
  transition: all 0.25s ease-out;
}

.slide-right-leave-active {
  transition: all 0.25s ease-in;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Je préserve le halo-orange pour l'effet glow */
.halo-orange {
  position: absolute;
  top: -110vh;
  left: -50vw;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  border-radius: 50%;
  background: transparent;
  box-shadow: 0px 0px 300px 120px rgba(var(--v-theme-accent),0.9);
  animation: haloPulse 3s infinite alternate;
  overflow: hidden;
}

@keyframes haloPulse {
  0% {
    box-shadow: 0 0 20vw 7vw rgba(var(--v-theme-accent),0.9);
    transform: scale(1);
  }
  100% {
    box-shadow: 0 0 26vw 10vw rgba(var(--v-theme-accent),0.7);
    transform: scale(1.05);
  }
}

@media (max-width: 480px) {
  .halo-orange {
    top: -50vh;
    left: -80vw;
    width: 90vw;
    height: 50vh;
    box-shadow: 0px 0px 150px 90px rgba(var(--v-theme-accent),1);
  }
  
  @keyframes haloPulse {
    0% {
      box-shadow: 0 0 15vw 8vw rgba(var(--v-theme-accent),1);
      transform: scale(1.25);
    }
    100% {
      box-shadow: 0 0 20vw 13vw rgba(var(--v-theme-accent),0.9);
      transform: scale(1.27);
    }
  }
}
</style>