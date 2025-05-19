<template>
  <header class="header-navbar">
    <v-container class="d-flex align-center justify-end" fluid>
      <nav class="navbar-nav" ref="navbarRef" @mouseleave="onNavLeave">
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
    <div class="halo-orange"></div>
  </header>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useTheme } from 'vuetify'

const navItems = [
  { name: 'Accueil', href: '#accueil' },
  { name: 'Projets', href: '#projets' },
  { name: 'Contact', href: '#contact' },
]

// Underline state
const underline = ref({
  show: false,
  left: 0,
  width: 0,
})

const navbarRef = ref<HTMLElement | null>(null)

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
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  underline.value.show = false
}

// THEME toggle
const theme = useTheme()
const isDark = ref(theme.global.current.value.dark)

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
  isDark.value = !isDark.value
}
</script>

<style scoped>
.header-navbar {
  background: rgb(var(--v-theme-hero));
  width: 100%;
  z-index: 10;
  top: 0;
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

.halo-orange {
  position: absolute;
  top: -600px;
  left: -300px;
  width: 55vw;
  height: 55vh;
  pointer-events: none;
  z-index: 0;
  border-radius: 50%;
  background: transparent;
  box-shadow: 0px 0px 300px 120px rgba(var(--v-theme-accent),0.9);
  animation: haloPulse 3s infinite alternate;
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
</style>