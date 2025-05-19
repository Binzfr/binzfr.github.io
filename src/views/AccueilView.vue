<template>
  <!-- Header -->
  <Header />

  <!-- Hero Section -->
  <v-main class="main-bg">
    <section id="accueil" class="hero">
      <v-container>
        <v-row align="center" justify="space-between" class="py-12">
          <v-col cols="12" md="7">
            <div class="hero-text-inner">
              <h2 class="text-h5 text-md-h4 mb-2 bienvenueH2">Bienvenue ! 😊 Je suis</h2>
              <h1 class="text-h2 text-md-h1 mb-4 mgH1">Melih Gencler</h1>
              <p class="text-body-1 text-md-h5 mb-14 moiP">
                Étudiant en 2ᵉ année de cycle préparatoire à CESI École d'Ingénieurs, passionné par l’informatique et le développement.
              </p>
              <div class="d-flex flex-wrap align-center" style="gap:1.2rem; position:relative;">
                <Bouton
                  BoutonType="Orange"
                  href="mailto:contact@melihgencler.fr"
                  target="_blank"
                >
                  Me Contacter
                </Bouton>
                <Bouton
                  BoutonType="Outlined"
                  href="/assets/CV_Melih_Gencler.pdf"
                  target="_blank"
                >
                  Télécharger mon CV
                </Bouton>
                <span class="alternanceBadge">
                  En recherche d'alternance !
                </span>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="5" class="d-flex justify-end">
            <v-img
              :src="melihImg"
              alt="Melih Gencler"
              max-width="400"
              class="rounded-lg hero-img"
              style="margin-right: 0;"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- About Section -->
    <section class="aboutSection" id="about">
      <v-container>
        <h1 class="titreH1">À propos de moi</h1>
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="7">
            <div class="textItem">
              <img src="/assets/code.svg" alt="Code" class="itemImg" />
              <p class="itemP">
                Maîtrise des bases en C/C++, développement web (HTML, CSS, JavaScript) et Python.
              </p>
            </div>
            <div class="textItem">
              <img src="/assets/crayon.svg" alt="Crayon" class="itemImg" />
              <p class="itemP">
                Utilisation de Figma et Webflow pour la création de sites web.
              </p>
            </div>
            <div class="textItem">
              <img src="/assets/pacman.svg" alt="Pacman" class="itemImg" />
              <p class="itemP">
                Pratique de la musculation depuis 5 ans et apprentissage autodidacte du japonais.
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="5" class="cvImg">
            <a href="/assets/CV_Melih_Gencler.pdf" target="_blank">
              <img src="/assets/CV.png" alt="CV" style="max-width:100%;border-radius:15px;box-shadow:0 0 40px 5px #fff;" />
            </a>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-main>
</template>


<script>
import Header from '@/components/Header.vue'
import Bouton from '@/components/Bouton.vue'
import { computed } from 'vue'
import { useTheme } from 'vuetify'

export default {
  components: { Header, Bouton },
  setup() {
    const theme = useTheme()

    const melihImg = computed(() => {
      return theme.global.name.value === 'dark'
        ? '/assets/melih.png'
        : '/assets/melihLight.png'
    })

    return { melihImg }
  }
}
</script>



<style scoped>
.main-bg {
  background-color: rgb(var(--v-theme-background));
  min-height: 100vh;
}

.hero {
  background-color: rgb(var(--v-theme-hero));
  color: rgb(var(--v-theme-on-background));
}

.hero-img {
  border-radius: 16px;
  box-shadow: none !important;
  filter: none !important;
  max-width: 100%;
}

.bienvenueH2 {
  font-weight: 600;
  margin-top: 0;
}

.mgH1 {
  font-weight: 700;
  line-height: 1.1;
}

.moiP {
  font-weight: 600;
  line-height: 1.2;
}

.bouton-orange {
  background-color: rgb(var(--v-theme-accent)) !important;
}

.aboutSection {
  padding: 60px 0;
  background-color: rgb(var(--v-theme-background));
}

.titreH1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
}

.textItem {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.itemImg {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
}
.itemP {
  color: rgb(var(--v-theme-on-background));
  font-size: 1.125rem;
  line-height: 1.6;
}

.cvImg {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cvImg img {
  max-width: 100%;
  border-radius: 15px;
  box-shadow: 0 0 40px 5px rgba(255, 255, 255, 0.7);
}

.alternanceBadge {
  color: rgb(var(--v-theme-badge));
  font-family: 'Monocraft', monospace;
  font-size: 1.1rem;
  animation: growShrink 2s infinite;
  white-space: nowrap;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  position: absolute;
  top: -2.5vh;
  right: -1vw;
}

@keyframes growShrink {
  0%, 100% { transform: scale(1) rotate(15deg);}
  50% { transform: scale(1.1) rotate(15deg);}
}

/* Responsive uniquement pour le badge animé */
@media (max-width: 940px) {
  .alternanceBadge {
    font-size: 0.95rem;
  }
}
@media (max-width: 650px) {
  .alternanceBadge {
    font-size: 0.7rem;
  }
}
</style>