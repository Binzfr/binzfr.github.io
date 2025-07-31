<template>
  <!-- Header -->
  <Header />

  <!-- Hero Section -->
  <v-main class="main-bg">
    <section id="accueil" class="hero">
      <v-container max-width="1600" class="py-12 pa-12">
        <v-row align="center" justify="space-between" class="py-12">
          <v-col cols="12" md="7">
            <div class="hero-text-inner">
              <h2 class="text-h4 text-md-h4 mb-2 bienvenueH2">Bienvenue ! 😊 Je suis</h2>
              <h1 class="text-h1 text-md-h1 mb-4 mgH1">Melih Gencler</h1>
              <p class="text-body-1 text-md-h4 mb-14 moiP">
                Étudiant en 2ᵉ année de cycle préparatoire à CESI École d'Ingénieurs, passionné par l'informatique et le développement.
              </p>
              <div class="d-flex flex-wrap align-center" style="gap:1.2rem;">
                <Bouton
                  BoutonType="Orange"
                  to="/formulaire"
                >
                  Me Contacter
                </Bouton>
                <div class="bouton-avec-badge">
                  <Bouton
                    BoutonType="Outlined"
                    href="/assets/CV_Melih_Gencler.pdf"
                    target="_blank"
                  >
                    Télécharger mon CV
                  </Bouton>
                </div>
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
      <v-container max-width="1600" class="py-12 pa-12">
        <h1 class="titreH1">À propos de moi</h1>
        <v-row align="stretch" justify="space-between" class="about-row">
          <v-col cols="12" md="7" class="d-flex flex-column justify-space-between">
            <div class="textItem mt-12">
              <v-icon icon="md:code" size="5rem" class="itemIcon mr-8" color="accent" />
              <p class="itemP text-h4">
                Développement Web et Mobile avec Vue.JS, Typescript/Javascript, HTML, CSS, Twig . bases en Flutter, PHP, C++, C (Arduino), Python.
              </p>
            </div>
            <div class="textItem">
              <v-icon icon="md:draw" size="5rem" class="itemIcon mr-8" color="accent" />
              <p class="itemP text-h4">
                Utilisation de Figma pour la création de maquettes statique de site Web et design. Bases en Webflow pour la création de sites web vitrine. 
              </p>
            </div>
            <div class="textItem mb-12">
              <v-icon icon="md:golf_course" size="5rem" class="itemIcon mr-8" color="accent" />
              <p class="itemP text-h4">
                Pratique de la musculation depuis 5 ans. Je suis curieux et aime m'informer ainsi qu'apprendre (Finance, musique, nouvelles technologies...) et jouer aux jeux vidéo (multijoueur ou solo).
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="5" class="cvImg d-flex align-center">
            <div class="cv-tilt-container" ref="tiltContainer">
              <div class="cv-glow"></div>
              <a href="/assets/CV_Melih_Gencler.pdf" target="_blank" class="cv-link">
                <img src="/assets/CV.png" alt="CV" class="cv-image" />
              </a>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Projects Section -->
    <section id="projets" class="projets-section">
      <v-container max-width="1600" class="py-12">
        <h1 class="titreH1">Mes Projets</h1>
        <v-row>
          <v-col cols="12" v-for="projet in projets" :key="projet.id">
            <Projet 
              :titre="projet.titre"
              :description="projet.description"
              :image="projet.image"
              :tags="projet.tags"
              :lien="projet.lien"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Réseaux Section -->
    <section id="reseaux" class="reseaux-section">
      <v-container max-width="1600" class="py-12">
        <h1 class="titreH1">Mes Réseaux</h1>
        <v-row justify="center">
          <v-col cols="12">
            <div class="reseaux-container">
              <!-- LinkedIn -->
              <div class="reseau-item">
                <a href="https://www.linkedin.com/in/melih-gencler-6052792ab/" target="_blank" class="reseau-link">
                  <v-icon icon="fa:fab fa-linkedin" size="7rem" color="accent" />
                  <p class="reseau-text">Melih Gencler</p>
                </a>
              </div>
              
              <!-- GitHub -->
              <div class="reseau-item">
                <a href="https://github.com/binzfr" target="_blank" class="reseau-link">
                  <v-icon icon="fa:fab fa-square-github" size="7rem" color="accent" />
                  <p class="reseau-text">binzfr</p>
                </a>
              </div>
              
              <!-- Email -->
              <div class="reseau-item">
                <a href="mailto:melihgenclerpro@gmail.com" class="reseau-link">
                  <v-icon icon="fa:fas fa-envelope" size="7rem" color="accent" />
                  <p class="reseau-text">melihgenclerpro@gmail.com</p>
                </a>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    
  </v-main>
</template>


<script>
import Header from '@/components/Header.vue'
import Bouton from '@/components/Bouton.vue'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useTheme } from 'vuetify'
import Projet from '@/components/Projet.vue';
import projets from '@/data/projets.json';

export default {
  components: { Header, Bouton, Projet },
  setup() {
    const theme = useTheme();
    const tiltContainer = ref(null);
    
    // Valeurs configurables pour l'effet tilt
    const tiltSettings = {
      max: 15, // degrés maximum de rotation
      perspective: 1000, // perspective CSS pour l'effet 3D
      scale: 1.05, // léger zoom au survol
      speed: 500, // vitesse de transition en ms
      glareOpacity: 0.3, // opacité de l'effet reflet
    };
    
    // Variables pour le suivi de la souris
    let rect = null;
    let width = 0;
    let height = 0;
    
    // Fonction d'initialisation du tilt
    const initTilt = () => {
      if (!tiltContainer.value) return;
      
      rect = tiltContainer.value.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
    };
    
    // Fonction de gestion de la souris
    const handleMouseMove = (e) => {
      if (!tiltContainer.value || !rect) return;
      
      // Position relative de la souris (de -1 à 1)
      const mouseX = (e.clientX - rect.left) / width - 0.5;
      const mouseY = (e.clientY - rect.top) / height - 0.5;
      
      // Calculer la rotation en fonction de la position de la souris
      const tiltX = Math.tanh(mouseY) * tiltSettings.max * -1;
      const tiltY = Math.tanh(mouseX) * tiltSettings.max;

      // Appliquer la transformation
      tiltContainer.value.style.transform = `
        perspective(${tiltSettings.perspective}px) 
        rotateX(${tiltX}deg) 
        rotateY(${tiltY}deg) 
        scale3d(${tiltSettings.scale}, ${tiltSettings.scale}, ${tiltSettings.scale})
      `;
      
      // Déplacer l'effet de lueur pour suivre la souris
      const glareElement = tiltContainer.value.querySelector('.cv-glow');
      if (glareElement) {
        glareElement.style.transform = `
          translate(${mouseX * 25}px, ${mouseY * 25}px)
        `;
        glareElement.style.opacity = tiltSettings.glareOpacity;
      }
    };
    
    // Fonction de réinitialisation à la sortie de la souris
    const handleMouseLeave = () => {
      if (!tiltContainer.value) return;
      
      // Reset à la position initiale avec une transition douce
      tiltContainer.value.style.transform = `
        perspective(${tiltSettings.perspective}px) 
        rotateX(0deg) 
        rotateY(0deg) 
        scale3d(1, 1, 1)
      `;
      
      // Réinitialiser la lueur
      const glareElement = tiltContainer.value.querySelector('.cv-glow');
      if (glareElement) {
        glareElement.style.transform = 'translate(0, 0)';
        glareElement.style.opacity = 0.1;
      }
    };
    
    // Réinitialiser les mesures lors du redimensionnement
    const handleResize = () => {
      initTilt();
    };
    
    onMounted(() => {
      // Initialiser l'effet une fois que le composant est monté
      initTilt();
      
      // Ajouter les écouteurs d'événements
      if (tiltContainer.value) {
        tiltContainer.value.addEventListener('mousemove', handleMouseMove);
        tiltContainer.value.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', handleResize);
      }
    });
    
    onBeforeUnmount(() => {
      // Nettoyer les écouteurs d'événements
      if (tiltContainer.value) {
        tiltContainer.value.removeEventListener('mousemove', handleMouseMove);
        tiltContainer.value.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('resize', handleResize);
      }
    });

    const melihImg = computed(() => {
      return theme.global.name.value === 'dark'
        ? '/assets/melih.png'
        : '/assets/melihLight.png'
    });

    return { melihImg, projets, tiltContainer };
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

.about-row {
  min-height: 600px;
}

.titreH1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
}

.textItem {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  flex: 1;
  padding: 15px 0;
}

.itemImg {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
}

.itemIcon {
  margin-top: 6px;
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
  height: 100%;
}

.cv-tilt-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.2s ease-out;
  padding: 20px; /* Ajout d'un padding pour laisser de la place au glow */
}

.cv-glow {
  position: absolute;
  width: 80%;
  height: 80%;
  background: rgb(var(--v-theme-accent));
  border-radius: 50%;
  filter: blur(10px);
  z-index: -1;
  top: 10%;
  left: 10%;
  opacity: 0.5; /* Augmenté pour être plus visible */
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
  animation: pulseGlow 3s infinite alternate;
}

@keyframes pulseGlow {
  0% {
    transform: translate(5px, -5px) scale(1.05);
    opacity: 0.3;
    filter: blur(60px);
  }
  25% {
    transform: translate(-7px, 0) scale(1.1);
    filter: blur(70px);
  }
  50% {
    transform: translate(0, 7px) scale(1.2);
    opacity: 0.5;
    filter: blur(75px);
  }
  75% {
    transform: translate(7px, -3px) scale(1.05);
    filter: blur(65px);
  }
  100% {
    transform: translate(-5px, 5px) scale(1.3);
    opacity: 0.35;
    filter: blur(80px);
  }
}

.cv-image {
  max-width: 100%;
  border-radius: 15px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.1s ease-out;
  transform-style: preserve-3d;
  transform: translateZ(40px);
  position: relative;
  z-index: 2;
}

.cv-link {
  display: block;
  transition: transform 0.1s ease;
}

.cv-link:hover {
  transform: translateZ(0);
}

.cv-tilt-container:hover {
  transform: rotateY(10deg) rotateX(10deg);
}

.cv-tilt-container:active {
  transform: rotateY(0deg) rotateX(0deg);
}

.bouton-avec-badge {
  position: relative;
  display: inline-block;
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
  top: -20px;
  right: -150px;
  transform: rotate(15deg);
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
    top: -15px;
    right: -100px;
  }
}

/* Responsivité améliorée pour très petits écrans (450px et moins) */
@media (max-width: 450px) {
  /* Hero Section */
  .mgH1 {
    font-size: 2.5rem !important; /* Réduction de la taille du H1 principal */
    margin-bottom: 10px;
  }
  
  .bienvenueH2 {
    font-size: 1.2rem !important; /* Plus petit pour le texte d'introduction */
  }
  
  .moiP {
    font-size: 1.1rem !important; /* Plus petit pour la description */
    margin-bottom: 2rem !important;
  }
  
  /* Boutons dans Hero */
  :deep(.bouton-orange),
  :deep(.bouton-outlined) {
    height: 45px !important;
    min-width: 160px !important;
    font-size: 1rem !important; 
    padding-inline: 15px !important;
    margin-bottom: 1.1rem !important;
  }
  
  /* Section à propos */
  .itemIcon {
    font-size: 4rem !important; /* Icônes plus petites sur mobile */
    margin-right: 10px !important;
  }
  
  .itemP {
    font-size: 1rem !important; /* Texte descriptif plus petit */
  }
  
  .textItem {
    padding: 10px 0; /* Moins d'espace vertical */
  }
  
  /* Titres de section */
  .titreH1 {
    font-size: 2rem;
    margin-bottom: 25px;
  }
  
  /* L'espacement de la grille */
  .py-12 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }
  
  .pa-12 {
    padding: 1.5rem !important;
  }
  
  /* Badge d'alternance */
  .alternanceBadge {
    font-size: 0.65rem !important;
    top: -12px;
    right: -80px;
  }

}

/* Ajustements spécifiques pour les très petits écrans */
@media (max-width: 350px) {
  .mgH1 {
    font-size: 2.2rem !important;
  }
  
  .reseau-item :deep(.v-icon) {
    font-size: 4rem !important;
  }
  
  .reseaux-container {
    gap: 60px;
  }
  
  :deep(.bouton-orange),
  :deep(.bouton-outlined) {
    height: 40px !important;
    min-width: 140px !important;
    font-size: 0.9rem !important;
  }
}

/* Section Réseaux */
.reseaux-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 80px;
  margin: 40px 0;
}

.reseau-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  width: 200px;
}

.reseau-item:hover {
  transform: translateY(-5px);
}

.reseau-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.reseau-text {
  margin-top: 15px;
  color: rgb(var(--v-theme-on-background));
  font-size: 1.2rem;
  text-align: center;
  width: 100%;
  overflow-wrap: break-word;
}

/* Responsivité améliorée pour très petits écrans (450px et moins) */
@media (max-width: 500px) {
  /* ... Autres styles mobiles ... */
  
  /* Section Réseaux ajustée */
  .reseaux-container {
    gap: 30px;
    flex-direction: row; /* Force l'affichage horizontal */
    justify-content: center;
    align-items: flex-start;
  }
  
  .reseau-item {
    width: 90px; /* Largeur fixe plus petite */
    margin-bottom: 20px;
  }
  
  .reseau-item :deep(.v-icon) {
    font-size: 4rem !important; /* Encore plus petit sur mobile étroit */
    height: 4rem !important;
  }
  
  .reseau-text {
    font-size: 0.8rem !important;
    margin-top: 8px;
  }
}

/* Ajustements spécifiques pour les très petits écrans */
@media (max-width: 380px) {
  /* ... Autres styles pour très petits écrans ... */
  
  .reseaux-container {
    gap: 15px; /* Espacement réduit */
  }
  
  .reseau-item {
    width: 80px; /* Encore plus étroit */
  }
  
  .reseau-item :deep(.v-icon) {
    font-size: 3rem !important;
  }
  
  .reseau-text {
    font-size: 0.7rem !important;
  }
}
</style>