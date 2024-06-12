<template>
  <form class="auth-form" @submit.prevent="onSubmit">
    <p class="auth-form__title">Sign in</p>
    <input class="auth-form__input" type="text" placeholder="Username" v-model="fields.userName" />
    <input class="auth-form__input" type="text" placeholder="Phone Number" v-model="fields.phone" />
    <button class="form__submit-btn" type="submit">Login</button>
  </form>
</template>
<script>
export default {
  name: 'SignInForm',
  data () {
    return {
      fields: {
        userName: null,
        phone: null
      }
    }
  },
  methods: {
    onSubmit () {
      this.$emit('submit-form', this.fields)
    }
  }
}
</script>