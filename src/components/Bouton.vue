<template>
  <v-btn
    v-if="BoutonType === 'Orange'"
    color="#FB773C"
    class="bouton-orange"
    rounded
    height="50"
    min-width="180"
    :href="href"
    :target="target"
    elevation="0"
    :ripple="false"
  >
    <slot>Orange</slot>
  </v-btn>

  <v-btn
    v-else-if="BoutonType === 'Outlined'"
    color="white"
    class="bouton-outlined"
    :class="{ 'light-mode': isLightTheme }"
    rounded
    height="50"
    min-width="180"
    :href="href"
    :target="target"
    elevation="0"
    variant="outlined"
    :ripple="false"
  >
    <slot>Outlined</slot>
  </v-btn>

  <v-btn
    v-else
    color="grey"
    rounded
    height="50"
    min-width="180"
    :href="href"
    :target="target"
    elevation="0"
    :ripple="false"
  >
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps<{
  BoutonType?: 'Orange' | 'Outlined'
  href?: string
  target?: string
}>()

const { global } = useTheme()
const isLightTheme = computed(() => global.name.value === 'light')
</script>

<style scoped>
.bouton-orange {
  color: white !important;
  background-color: #FB773C !important;
  font-weight: 600;
  font-size: 1.25rem;
  border-radius: 10px !important;
  padding-inline: 20px !important;
  box-shadow: none !important;
  letter-spacing: 0.5px;
}

.bouton-outlined {
  background: transparent !important;
  border: 2px solid white !important;
  color: white !important;
  font-weight: 600;
  font-size: 1.25rem;
  border-radius: 10px !important;
  padding-inline: 20px !important;
  box-shadow: none !important;
  letter-spacing: 0.5px;
}

/* 👇 Style en mode clair */
.bouton-outlined.light-mode {
  border: 2px solid black !important;
  color: black !important;
}
</style>
