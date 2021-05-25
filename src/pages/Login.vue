<template>
  <div class="login">
    <div class="row no-gutters">
      <div class="col-md-12">
        <div class="row align-items-center">
          <div
            class="col-md-12 col-xl-6 col-lg-12 offset-xl-3 col-12 text-center px-5 mt-5"
          >
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <img src="../assets/logo.png" width="100" alt="" />
                <h2 class="heading text-uppercase pt-3">Admin Login</h2>
                <form class="mt-3" @submit.prevent>
                  <input
                    type="email"
                    v-model="email"
                    placeholder="Email"
                    class="form-control input"
                  />
                  <input
                    :type="showCurrentPassword ? 'text' : 'password'"
                    placeholder="Password"
                    v-model="password"
                    class="form-control mt-3 input"
                  />
                  <span class="visiblePass"
                    ><i
                      :class="
                        showCurrentPassword ? 'fa fa-eye' : 'fa fa-eye-slash'
                      "
                      @click="showCurrentPassword = !showCurrentPassword"
                    ></i
                  ></span>
                  <button
                    class="form-control btn btn-primary my-3"
                    @click="login()"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      showCurrentPassword: false,
      APIServer: `https://cryptic-gorge-79265.herokuapp.com/api/`,
      email: null,
      password: null,
    };
  },
  methods: {
    login() {
      const url = this.APIServer + "admin/login";
      const data = new FormData();
      data.append("email", this.email);
      data.append("password", this.password);

      axios
        .post(url, data)
        .then((response) => {
          console.log("response:", response.data.role);
          if (
            response.data.success &&
            response.data.admin_login_token != null
          ) {
            sessionStorage.setItem("currentUserRole", response.data.role);
            sessionStorage.setItem(
              "setToken",
              "Bearer " + response.data.admin_login_token
            );
            this.$store.commit(
              "setToken",
              "Bearer " + response.data.admin_login_token
            );
            this.$store.commit("currentUserRole", response.data.role);
            this.$router.push({ name: "Home" });
          } else {
            this.openNotificationWithIcon(
              "warning",
              response.data.code,
              "bottomRight"
            );
          }
        })
        .catch((e) => {
          console.log(e);
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });

      // sessionStorage.setItem("setToken", "Bearer "+'hghjghhj');
      // this.$store.commit("setToken", "Bearer "+'hghjghhj');
      // this.$router.push({ path: "/" });

      // let obj = {
      //   email: this.email,
      //   password: this.password,
      // }
      // let headers = {
      //   'Content-Type': 'application/json'
      // }
      // axios
      //   .post(this.APIServer + "admin/login?email="+this.email+"&password="+this.password)
      //   .then((response) => {
      //     console.log('response:', response.data)
      //     if (
      //       response.data.success  &&
      //       response.data.admin_login_token != null
      //     ) {
      //       sessionStorage.setItem("setToken", "Bearer "+response.data.admin_login_token);
      //       this.$store.commit("setToken", "Bearer "+response.data.admin_login_token);
      //       this.$router.push({ name: "Home" });
      //     } else {
      //       this.openNotificationWithIcon(
      //         "warning",
      //         response.data.code,
      //         "bottomRight"
      //       );
      //     }
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //     this.openNotificationWithIcon(
      //       "error",
      //       "Internal server error",
      //       "bottomRight"
      //     );
      //   });
    },
    openNotificationWithIcon(type, message, place) {
      this.$notification[type]({
        message: "Response",
        description: message,
        place,
      });
    },
  },
};
</script>

<style scoped>
.login {
  overflow: hidden !important;
}
.black {
  background: #000;
  min-height: 100vh;
  overflow: hidden !important;
}
.visiblePass {
  float: right;
  margin-right: 6px;
  margin-top: -33px;
  position: relative;
  z-index: 2;
}

p {
  font-size: 14px;
  margin-top: 10px;
}
.log:hover {
  cursor: pointer;
}

.input {
  border: 1px solid #eee !important;

  height: 50px !important;
  background: #eee;
}
.btn {
  height: 50px !important;
  color: #fff;
  background: #ec8e2b !important;
}
.input:focus {
  border: 1px solid #eee !important;

  height: 50px !important;
  background: #eee;
}
@media screen and (max-width: 411px) {
  .login {
    padding-top: 0px;
  }

  .black {
    min-height: 45vh !important;
    max-height: 45vh !important;
  }
}
@media screen and (max-width: 576px) {
  .login {
    padding-top: 0px;
  }

  .black {
    min-height: 45vh !important;
    max-height: 45vh !important;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .black {
    min-height: 50vh !important;
    max-height: 50vh !important;
  }
}

@media (min-width: 320px) and (max-width: 480px) {
  .black {
    min-height: 45vh !important;
    max-height: 45vh !important;
  }
}
</style>
