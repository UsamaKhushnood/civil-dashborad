<template>
  <div class="create-user">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Create User</strong></h5>
                <span class="back" @click="move('/users')"
                  ><i class="fa fa-user"></i>
                  <strong class="back">Users</strong></span
                >
                <i class="fa fa-chevron-right"></i><strong>Create User</strong>
              </div>
            </div>
            <div class="row mt-5 mx-md-3">
              <div class="col-12">
                <label for="first_name"><strong>Upload Image</strong></label>
                <br />
                <!-- <input
                  type="file"
                  class="btn btn-primary"
                  @change="onChangeFileUpload"
                  ref="AvatarInput"
                /> -->
                <b-form-file
                  v-model="user.image"
                  class="btn"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  required
                ></b-form-file>
              </div>
              <div class="col-12">
                <form @submit.prevent>
                  <div class="row">
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="first_name"
                          ><strong>First Name*</strong></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.first_name"
                          placeholder="Enter First Name"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="last_name"
                          ><strong>Last Name*</strong></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.last_name"
                          placeholder="Enter Last Name"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="email"><strong>Email*</strong></label>
                        <input
                          type="email"
                          class="form-control"
                          v-model="user.email"
                          placeholder="Enter Email"
                          required
                        />
                      </div>
                    </div>
                    <!--<div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="password"><strong>Password*</strong></label>
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Enter Password"
                          required
                          v-model="user.password"
                        />
                      </div>
                    </div>-->
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="job_title"><strong>Country*</strong></label>
                        <select
                          class="form-control"
                          v-model="user.nationality"
                          required
                        >
                          <option
                            :value="item.name"
                            v-for="(item, index) in countries"
                            :key="index"
                            >{{ item.name }}</option
                          >
                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="mobile"><strong>Phone*</strong></label>
                        <div class="row">
                          <div class="col-5">
                            <select
                              class="form-control"
                              v-model="user.nationality"
                              disabled
                            >
                              <option
                                :value="item.name"
                                v-for="(item, index) in countries"
                                :key="index"
                                >{{ item.dial_code }}</option
                              >
                            </select>
                          </div>
                          <div class="col-7">
                            <input
                              type="text"
                              class="form-control"
                              v-model="user.phoneNo"
                              maxlength="10"
                              @keypress="phoneno"
                              placeholder="Enter Phone"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="gender"><strong>Gender*</strong></label>
                        <select
                          class="form-control"
                          v-model="user.gender"
                          required
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="job_title"
                          ><strong>Residence*</strong></label
                        >

                        <select
                          class="form-control"
                          v-model="user.residence"
                          required
                        >
                          <option
                            :value="item.name"
                            v-for="(item, index) in countries"
                            :key="index"
                            >{{ item.name }}</option
                          >
                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="gender"><strong>Role*</strong></label>
                        <select
                          class="form-control"
                          v-model="user.role"
                          required
                        >
                          <option>Select User Role</option>
                          <option value="read">Read</option>
                          <option value="read,write">Write, Write</option>
                          <option value="read,write,update,delete"
                            >Modify</option
                          >
                        </select>
                      </div>
                    </div>

                    <div class="col-12 mt-3 text-right">
                      <button class="btn btn-primary" @click="saveNewUser()">
                        Create User
                      </button>
                    </div>
                  </div>
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
import mixin from "../containers/mixin";
import axios from "axios";
import countries from "../assets/countries.json";
export default {
  components: {},
  mixins: [mixin],
  name: "CreateUser",
  created() {},
  methods: {
    phoneno(e) {
      let a = [];
      let k = e.which;
      let i;
      for (i = 48; i < 58; i++) a.push(i);

      if (!(a.indexOf(k) >= 0)) e.preventDefault();
    },
    onChangeFileUpload($event) {
      this.user.image = $event.files[0];
      this.encodeImage(this.user.image);
    },
    saveNewUser() {
      //   this.loading = true;
      console.log("saving user");
      let newUser = new FormData();
      newUser.append("firstName", this.user.first_name);
      newUser.append("lastName", this.user.last_name);
      newUser.append("email", this.user.email);
      newUser.append("phoneNo", Number(this.user.phoneNo));
      newUser.append("residenceCountry", this.user.residence);
      newUser.append("gender", this.user.gender);
      newUser.append("country", this.user.country);
      newUser.append("nationality", this.user.nationality);
      newUser.append("userImage", this.user.image);
      newUser.append("role", this.user.role);
      console.log(newUser);
      axios
        .post(this.APIServer + "admin/createUser", newUser, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log("response", response.data);
          if (response.data.status == true) {
            this.$router.push({ path: "users" });
            this.openNotificationWithIcon(
              "success",
              "User added successfully",
              "bottomRight"
            );
          } else {
            this.openNotificationWithIcon(
              "warning",
              response.data.message,
              "bottomRight"
            );
          }
          console.log(response.data);
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.openNotificationWithIcon(
            "error",
            response.data.message,
            "bottomRight"
          );
        });
    },
    move(to) {
      this.$router.push({ path: to });
    },
    pickAvatar() {
      this.$refs.AvatarInput.click();
    },

    uploadImage(event) {
      let file = event.target.files[0];
      if (file) {
        const url = "https://api.cloudinary.com/v1_1/dz5fltj9r/image/upload";
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "hammad");
        axios
          .post(url, data)
          .then((response) => {
            console.log(response.data);
            this.image = response.data.secure_url;
            this.resetUserData();
            this.openNotificationWithIcon(
              "success",
              "Image uploaded to cloudinary",
              "bottomRight"
            );
          })
          .catch((e) => {
            console.log("API failed");

            console.log(e);
            this.openNotificationWithIcon(
              "error",
              "Image upload failed",
              "bottomRight"
            );
            // return null;
          });
      }
    },
    resetUserData() {
      (this.user.first_name = ""),
        (this.user.last_name = ""),
        (this.user.email = ""),
        (this.user.phoneNo = ""),
        (this.user.residence = ""),
        (this.user.gender = ""),
        (this.user.country = ""),
        (this.user.image = "");
      this.user.nationality = "";
    },

    openNotificationWithIcon(type, message, placement) {
      this.$notification[type]({
        message: "Response",
        description: message,
        placement,
      });
    },
  },
  data() {
    return {
      countries: countries,
      image: null,
      APIServer:
        `https://cryptic-gorge-79265.herokuapp.com/api/` ||
        process.env.VUE_APP_SERVER_ADDRESS,
      user: {
        first_name: null,
        last_name: null,
        email: null,
        phoneNo: null,
        residence: null,
        gender: null,
        country: null,
        image: null,
        nationality: null,
        // password: null,
      },
    };
  },
};
</script>

<style scoped></style>
