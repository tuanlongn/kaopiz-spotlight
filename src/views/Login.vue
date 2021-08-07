<template>
  <div class="login-page">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="Email">
        <a-input
          v-decorator="[
            'email',
            { rules: [{ required: true, message: 'Please input your email' }] },
          ]"
          placeholder="your email"
        ></a-input>
      </a-form-item>
      <a-form-item label="Password">
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your password' },
              ],
            },
          ]"
          placeholder="******"
        ></a-input>
      </a-form-item>
      <a-button block :loading="loading" type="primary" html-type="submit"
        >Login</a-button
      >
    </a-form>
  </div>
</template>

<script>
import { loginApi, setAccessToken } from "../services/api";
import storage from "../services/storage";

export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "login_form" }),
      loading: false,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.loading = true;
          const res = await loginApi({
            email: values.email,
            password: values.password,
          });
          this.loading = false;
          if (res.status === 200) {
            setAccessToken(res.data.token);
            storage.set("token", res.data.token);
            this.$store.dispatch("user/getInfo");
            this.$router.push("/");
          } else if (res.data.message) {
            this.$message.error(res.data.message);
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-page {
  position: fixed;
  top: 40%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 30px;
  width: 400px;
}
</style>
