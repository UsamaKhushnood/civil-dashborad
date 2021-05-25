<template>
  <div class="site-settings">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Gallery</strong></h5>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-3 p-3">
                <label for="filter"><strong>Type</strong></label>
                <select class="form-control" v-model="data.image_for">
                  <option value="all">All</option>
                   <option value="cars">Cars</option>
                  <option value="students">Students</option>
                  <option value="exam">Exam</option>
                   <option value="classroom">Classroom</option>
                </select>
              </div>
              <div class="col-12 p-3">
                <label for="upload"><strong>Upload Images</strong></label>
                <br />
                <input
                  type="file"
                  class="btn btn-primary"
                  accept="image/*"
                  @change="uploadImage"
                  ref="AvatarInput"
                />
              </div>
              <div class="col-12 col-md-12 text-right">
                <div class="form-group">
                  <button class="btn btn-primary" @click="saveGallery()">
                    Save
                  </button>
                </div>
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
  name: "Gallery",
  data() {
    return {
      APIServer: process.env.VUE_APP_SERVER_ADDRESS,
      data : {
        image : null,
        image_for : 'all'
      },
      trainerStatus: true,
      trainserSub: null,
      studentSub: null,
      studentStatus: true,
      adminComission: null,
      adminStatus: true,
      promotionCharge: null,
      promotionStatus: true,
    };
  },
  created() {
    // this.getSiteSettings();
  },
  methods: {
    uploadImage(event) {
      let img = new Image()
      img.src = window.URL.createObjectURL(event.target.files[0])
      img.onload = () => {
        if(!(img.width > 800 && img.height > 600)){
            this.openNotificationWithIcon(
              "error",
              "Please upload image with minimum size 800px * 600px",
              "bottomRight"
            );
          return;
        }
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
            this.data.image = response.data.secure_url;
            this.openNotificationWithIcon(
              "success",
              "Document uploaded to cloudinary",
              "bottomRight"
            );
          })
          .catch((e) => {
            console.log("API failed");
            console.log(e);
            this.openNotificationWithIcon(
              "error",
              "Document upload failed",
              "bottomRight"
            );
            // return null;
          });
      }
      }
    },
    saveGallery() {
     if(!this.data.image){
        this.openNotificationWithIcon(
            "error",
            "Please upload Image.",
            "bottomRight"
        );
          return;
      }
      axios
        .post(
          this.APIServer + "front/gallery/add",
          this.data,
          {
            headers: { Authorization: this.$store.state.token },
          }
        )
        .then((response) => {
          this.openNotificationWithIcon(
            "success",
            response.data.data,
            "bottomRight"
          );
          this.data = {
            image : null,
            image_for : 'all'
          }
        })
        .catch((e) => {
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },

    openNotificationWithIcon(type, message, place) {
      this.$notification[type]({
        message: "Response",
        description: message,
        place,
      });
    },
  },
  // components: {
  //   TheHeaderDropdownAccnt
  // }
};
</script>