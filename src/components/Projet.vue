<template>
  <div class="projet-container">    
    <div class="projet-content">
      <!-- Conteneur gauche avec le texte -->
      <div class="projet-text-container">
        <div class="corner top-left"></div>
        <div class="corner bottom-right"></div>
        <div class="projet-description">
          <p class="text-h5">{{ description }}</p>
        </div>
      </div>
      
      <!-- Conteneur droit avec l'image -->
      <div class="projet-image-container">
        <img :src="image" :alt="titre" class="projet-image" />
        <div class="gradient-overlay"></div>
      </div>
    </div>
    
    <!-- Section en dessous avec tags et titre -->
    <div class="projet-footer">
      <div class="tags-container">
        <span v-for="(tag, index) in tags" :key="index" class="tag">{{ tag }}</span>
      </div>
      <div class="projet-titre-container">
        <a :href="lien" target="_blank" rel="noopener noreferrer" class="titre-link">
          <h3 class="projet-titre">{{ titre }}</h3>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: () => [],
  },
  skills: {
    type: Array,
    default: () => [],
  },
  lien: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.projet-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  position: relative;
  overflow: visible;
}

.projet-content {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  min-height: 320px;
}

.projet-text-container {
  flex: 0 0 25%;
  background-color: rgba(var(--v-theme-surface), 0.9);
  padding: 30px 25px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
}

.corner {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 7px solid rgb(var(--v-theme-accent));
}

.top-left {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
}

.bottom-right {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}

.projet-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 20px;
}

.projet-image-container {
  flex: 0 0 75%;
  position: relative;
  overflow: hidden;
  border-radius: 0 8px 8px 0;
}

.projet-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  z-index: 1; /* assure qu'elle est sous les tags */
  position: relative;
}


.projet-container:hover .projet-image {
  transform: scale(1.05);
}

/* Gradient pour l'image */
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to left,
    rgba(var(--v-theme-surface), 0.7) 0%,
    rgba(var(--v-theme-surface), 0) 50%
  );
  z-index: 1;
}

/* Nouvelle structure pour le footer */
.projet-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-start;
  flex: 0 0 30%; /* Prend la même largeur que le conteneur de texte */
  padding-right: 15px;
}

.tag {
  background-color: rgba(var(--v-theme-accent), 0.2);
  color: rgb(var(--v-theme-accent));
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Le conteneur du titre conserve sa position */
.projet-titre-container {
  flex: 0 0 70%;
  text-align: right;
}

.titre-link {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;
  display: inline-block;
}

.titre-link:hover .projet-titre {
  color: rgb(var(--v-theme-accent));
}

.projet-titre {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-background));
  display: inline-block;
  position: relative;
  transition: color 0.3s ease;
}

.projet-titre::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: rgb(var(--v-theme-accent));
}

@media (max-width: 768px) {
  .projet-content {
    flex-direction: column;
  }

  .projet-text-container, 
  .projet-image-container {
    flex: 1 1 auto;
  }
  
  .projet-footer {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .tags-container {
    flex: 0 0 100%;
    margin-bottom: 10px;
  }
  
  .projet-titre-container {
    flex: 0 0 100%;
    text-align: left;
    padding-top: 5px;
  }
  
  .projet-text-container {
    order: 3;
  }
  
  .projet-image-container {
    order: 2;
    min-height: 220px;
    border-radius: 8px;
  }
  
  /* Ajustement du gradient pour le mobile */
  .gradient-overlay {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0) 70%
    );
  }
}
</style>