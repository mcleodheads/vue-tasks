<template>
  <div class="col-md-12 ">
    <div class="card card-container align-items-lg-center justify-content-center">
      <Form @submit="handleSubmit">
        <div class="form-group">
          <label htmlFor="username">Username</label>
          <Field
            class="form-control "
            type="text"
            v-model="username"
            name="username"/>
        </div>
        <div class="form-group">
          <label htmlFor="password">Password</label>
          <Field
            class="form-control "
            type="password"
            v-model="password"
            name="password"/>
        </div>
        <div class="form-group ">
          <button class="btn btn-primary btn-block">
            Login
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field } from 'vee-validate';

export default {
  name: 'AuthorizationComponent',
  components: {
    Form,
    Field,
  },
  data() {
    return {
      username: '',
      password: '',
      language: 'en',
      submitted: false,
    };
  },
  computed: {
    loggingIn() {
      return this.$store.state.authentication.isAuth;
    },
  },
  created() {
    this.$store.dispatch('authentication/logout');
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      const {
        username,
        password,
      } = this;
      const { dispatch } = this.$store;
      if (username && password) {
        dispatch('authentication/login', {
          username,
          password,
        });
      }
    },
  },
};
</script>

<style scoped>
.form-group {
  padding-bottom: 30px
}
</style>
