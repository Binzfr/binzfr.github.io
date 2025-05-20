<template>
  <v-main class="main-bg">
    <Header />
    
    <section class="form-section">
      <v-container max-width="800" class="py-12">
        <h1 class="titreH1">Me Contacter</h1>
        
        <v-card class="form-card mx-auto">
          <v-form ref="formRef" @submit.prevent="sendEmail" v-model="isFormValid">
            <v-card-text>
              <!-- Affichage du succès après envoi -->
              <v-alert
                v-if="formSubmitted"
                color="success"
                icon="fa:fas fa-check-circle"
                title="Message envoyé !"
                text="Merci pour votre message. Je vous répondrai dès que possible."
                class="mb-6"
              ></v-alert>
              
              <!-- Affichage de l'erreur -->
              <v-alert
                v-if="formError"
                color="error"
                icon="fa:fas fa-exclamation-circle"
                title="Erreur"
                :text="errorMessage"
                class="mb-6"
              ></v-alert>
            
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.name"
                    label="Nom"
                    :rules="nameRules"
                    required
                    variant="outlined"
                    prepend-inner-icon="fa:fas fa-user"
                    name="name"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                    :rules="emailRules"
                    required
                    variant="outlined"
                    prepend-inner-icon="fa:fas fa-envelope"
                    name="email"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12">
                  <v-text-field
                    v-model="form.subject"
                    label="Objet"
                    :rules="subjectRules"
                    required
                    variant="outlined"
                    prepend-inner-icon="fa:fas fa-heading"
                    name="title"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12">
                  <v-textarea
                    v-model="form.message"
                    label="Message"
                    :rules="messageRules"
                    required
                    variant="outlined"
                    rows="5"
                    prepend-inner-icon="fa:fas fa-comment"
                    name="message"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
            
            <v-card-actions class="px-4 pb-4">
              <v-spacer></v-spacer>
              <Bouton
                BoutonType="Orange"
                type="submit"
                :loading="loading"
                :disabled="loading || !isFormValid"
              >
                Envoyer le message
              </Bouton>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
    </section>
  </v-main>
</template>

<script setup>
import { ref } from 'vue';
import emailjs from '@emailjs/browser';
import Header from '@/components/Header.vue';
import Bouton from '@/components/Bouton.vue';

// Définition des règles de validation
const nameRules = [(v) => !!v || 'Le nom est requis'];
const emailRules = [
  (v) => !!v || 'L\'email est requis',
  (v) => /.+@.+\..+/.test(v) || 'L\'email doit être valide'
];
const subjectRules = [(v) => !!v || 'L\'objet est requis'];
const messageRules = [(v) => !!v || 'Le message est requis'];

// Initialisation des variables réactives
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const isFormValid = ref(false);
const formSubmitted = ref(false);
const formError = ref(false);
const errorMessage = ref('');
const loading = ref(false);

// Référence au formulaire pour validation
const formRef = ref(null);

// Fonction d'envoi d'email
const sendEmail = async () => {
  // Vérification manuelle de la validité du formulaire
  if (!isFormValid.value) {
    return;
  }
  
  loading.value = true;
  formSubmitted.value = false;
  formError.value = false;
  
  try {
    // Remplacez par vos identifiants EmailJS
    const serviceID = 'service_ciqqj4v';
    const templateID = 'template_3qpcl8u';
    const publicKey = 'IdtjY2g23qRuoQrvv';
    
    const templateParams = {
    name: form.value.name,
    email: form.value.email,
    title: form.value.subject,
    message: form.value.message
    };


    
    await emailjs.send(serviceID, templateID, templateParams, publicKey);
    
    formSubmitted.value = true;
    // Réinitialiser le formulaire
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
    
  } catch (error) {
    console.error('EmailJS error:', error);
    formError.value = true;
    errorMessage.value = "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.main-bg {
  background-color: rgb(var(--v-theme-background));
  min-height: 100vh;
}

.form-section {
  padding: 60px 0;
  margin-top: 40px;
}

.titreH1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  color: rgb(var(--v-theme-on-background));
}

.form-card {
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

@media (max-width: 768px) {
  .form-section {
    padding: 30px 0;
    margin-top: 20px;
  }
  
  .titreH1 {
    font-size: 2rem;
    margin-bottom: 30px;
  }
}
</style>