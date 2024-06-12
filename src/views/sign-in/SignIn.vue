<template>
  <div class="auth">
    <div class="auth__container">
      <div class="auth-container__title">
        <h1>Nux Game</h1>
      </div>
      <SignInForm @submit-form="signIn"/>
    </div>
    <ModalWindow :isOpen="isModalOpened" @modal-close="closeModal">
      <template #header>
        <h2>Error!</h2>
      </template>
      <template #content>
        <p>{{ modalContent }}</p>
      </template>
    </ModalWindow>
  </div>
</template>
<script>
import SignInForm from './form'
import ModalWindow from '@/components/modal-window'
import { defaultRedirect } from '@/router'
import api from '@/services/client'

export default {
  name: 'SignIn',
  components: {
    SignInForm,
    ModalWindow
  },
  data () {
    return {
      users: [],
      isModalOpened: false
    }
  },
  methods: {
    async signIn (userCredentials) {
      if (!this.validationRules(userCredentials)) return
      const { data} = await api.getUsers()
      this.users = data
      if (!this.users.length) return
      const currentUser = this.users.find((user) => (user.username === userCredentials.userName && user.phone === userCredentials.phone))
      if (currentUser) {
        localStorage.setItem('user', JSON.stringify(currentUser))
      } else {
        this.modalContent = 'Invalid credentials!'
        this.isModalOpened = true
        return
      }
      
      try {
        const redirectPath = this.$route.query.redirect
          const route = redirectPath ? { path: this.$route.query.redirect } : { name: defaultRedirect() }
          this.$router.push(route).catch(e => {
            console.error(e)
          })
      } catch (e) {
        console.error(e)
      }
    },
    closeModal () {
      this.isModalOpened = false
    },
    validationRules (formData) {
      const regexPhone = /^[^a-zA-Z]*$/
      const regexUserName = /^[a-zA-Z]+$/

      if (!formData.userName || !regexUserName.test(formData.userName)) {
        this.isModalOpened = true
        this.modalContent = 'Invalid user name!'
        return false
      }
      if (!formData.phone || !regexPhone.test(formData.phone)) {
        this.modalContent = 'Invalid phone number!'
        this.isModalOpened = true
        return false
      }
      return true
    }
  }
}
</script>