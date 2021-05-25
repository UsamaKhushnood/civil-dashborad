<template>
  <div class="create-user">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Update User</strong></h5>
                <span class="back" @click="move('/users')"
                  ><i class="fa fa-user"></i>
                  <strong class="back">Users</strong></span
                >
                <i class="fa fa-chevron-right"></i><strong>Update User</strong>
              </div>
            </div>
            <div class="row mt-5 mx-md-3">
         
              <div class="col-12">
                <form @submit.prevent>
                  <div class="row">
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="first_name"
                          ><strong>Title*</strong></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="title"
                          :placeholder="this.document.title"
                          required
                        />
                     
                      </div>
                        <div class="form-group">
                        <label for="upload"><strong>Upload Document</strong></label>
                        <br />
                        <input
                        type="file"
                        class="btn btn-primary"
                        @change="uploadImage"
                        ref="AvatarInput"
                        />
                        </div>
                    </div>
                  
                    <!-- <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
<div class="form-group">
<label for="password"><strong>Password*</strong></label>
<input
type="text"
class="form-control"
placeholder="Enter Password"
required
v-model="user.password"
/>
</div>
</div> -->
                  
                    <div class="col-12 mt-3 text-right">
                      <button class="btn btn-primary" @click="updateDocument()">
                        Update Document
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
import axios from "axios";
import countries from "../assets/countries.json";
export default {
  name: "EditUser",
  created() {
    this.getUserDetails(this.$route.params.id);
  },
  methods: {
    phoneno(e) {
      let a = [];
      let k = e.which;
      let i;
      for (i = 48; i < 58; i++) a.push(i);

      if (!(a.indexOf(k) >= 0)) e.preventDefault();
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
   
    getUserDetails(id) {
      console.log(id);
     
    
      axios
        .get(this.APIServer + "admin/getDocument?id=" + id, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
           
          console.log("ll");
          console.log(response.data);
          if (response.data != null) {
            this.document = response.data;
            
            // console.log("user updated");
          }
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
        });
    },
    updateDocument(){
       // console.log('update')
       
       console.log(this.title)
       return
        
          axios
        .patch(this.APIServer + "admin/updateDocument", this.document, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.openNotificationWithIcon(
            "success",
            response.data.data,
            "bottomRight"
          );
          this.data = {
            url: null,
            title: null,
          };
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
  },
  data() {
    return {
      countries: countries,
      showNewPassword: false,
      showConfirmPassword: false,
      showCurrentPassword: false,
      image: null,
      APIServer:
        `https://cryptic-gorge-79265.herokuapp.com/api/` ||
        process.env.VUE_APP_SERVER_ADDRESS,
      currentPassword: null,
      newPassword: null,
      cPassword: null,
      // user: null,
      document:[],
      
          title: null,
          documentFilePath:null,
          documentId:null,
      
      
    };
  },
};
</script>

<style scoped>
</style>