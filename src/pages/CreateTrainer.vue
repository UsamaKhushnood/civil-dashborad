<template>
  <div class="create-user">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Create Trainer</strong></h5>
                <span class="back" @click="move('/trainers')"
                  ><i class="fa fa-user"></i>
                  <strong class="back">Trainers</strong></span
                >
                <i class="fa fa-chevron-right"></i
                ><strong>Create Trainer</strong>
              </div>
            </div>
            <div class="row mt-5 mx-md-3">
              <div class="col-12">
                <label for="first_name"
                  ><strong
                    >Upload Documents (trade license, certificates, emirates
                    id)</strong
                  ></label
                >
                <br />
                <input
                  type="file"
                  class="btn btn-primary"
                  multiple
                  @change="uploadFile"
                  ref="AvatarInput"
                />
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
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="password"><strong>Password*</strong></label>
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Enter Password"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="mobile"><strong>Phone*</strong></label>
                        <input
                          type="tel"
                          class="form-control"
                          v-model="user.mobile"
                          placeholder="Enter Phone"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="job_title"
                          ><strong>Nationality*</strong></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Nationality"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="job_title"
                          ><strong>Residence*</strong></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Residence"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="job_title"
                          ><strong>Organization Name*</strong></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Organization Name"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="job_title"
                          ><strong>Years of Experience*</strong></label
                        >
                        <input
                          type="number"
                          min="0"
                          class="form-control"
                          placeholder="Enter Years of Experience"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="gender"><strong>Gender*</strong></label>
                        <select class="form-control" required>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="gender"
                          ><strong>Courses Offered*</strong></label
                        >
                        <select class="form-control" required>
                          <option value="manual">Manual</option>
                          <option value="automated">Automated</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 mt-3 text-right">
                      <button class="btn btn-primary">Create Trainer</button>
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
import axios from "axios";
export default {
  name: "CreateUser",
  methods: {
    move(to) {
      this.$router.push({ path: to });
    },
    pickAvatar() {
      this.$refs.AvatarInput.click();
    },
    onAvatarSelected(event) {
      let file = event.target.files[0];
      if (file) {
        this.image = URL.createObjectURL(file);
      }
    },
    uploadFile(event,name) {
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
            // this.image = response.data.secure_url;
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
          });
      }
    },
  },
  data() {
    return {
      image: null,
      APIServer: process.env.VUE_APP_SERVER_ADDRESS,
      user: {
        first_name: null,
        last_name: null,
        email: null,
        mobile: null,
        nationality: null,
        image: null,
        job_title: null,
        status: "active",
      },
    };
  },
};
</script>

<style scoped>
</style>