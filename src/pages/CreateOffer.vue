<template>
  <div class="create-offer">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Create Offer</strong></h5>
                <span class="back" @click="move('/special-offers')"
                  ><i class="fa fa-user"></i>
                  <strong class="back">Special Offers</strong></span
                >
                <i class="fa fa-chevron-right"></i><strong>Create Offer</strong>
              </div>
            </div>
            <div class="row mx-md-3">
              <div class="col-12 mt-3 col-md-4">
                <label for="images"><strong>Upload Image</strong></label>
                <!-- <input
                  type="file"
                  class="btn btn-primary"
                  accept="image/*"
                  ref="AvatarInput"
                  @change="uploadImage"
                /> -->
                 <b-form-file
                  v-model="specialOffer.offerImage"
                  class="btn"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  required
                ></b-form-file>
              </div>
            </div>
            
            <div class="row mx-md-3">
              <div class="col-12 mt-3">
                <form @submit.prevent>
                  <div class="row">
                    <div class="col-6 col-md-4">
                      <div class="form-group">
                        <label><strong>Course*</strong></label>
                          <select v-model="specialOffer.courseId" class="form-control" required @change="setBeforePrice()">
                            <option v-for="(course, courseIndex) in coursesData" :value="course.id" :key="courseIndex">{{ course.nameEnglish }}</option>
                          </select>
                        </div>
                      </div>
                    <div class="col-6 col-md-4">
                      <div class="form-group">
                        <label><strong>Price Before*</strong></label>
                        <input
                          type="number"
                          class="form-control"
                          min="0"
                          v-model="specialOffer.priceBefore"
                          placeholder="Enter Price Before"
                          required
                          disabled
                        />
                      </div>
                    </div>
                    <div class="col-6 col-md-4">
                      <div class="form-group">
                        <label><strong>Price After*</strong></label>
                        <input
                          type="number"
                          class="form-control"
                          min="0"
                          placeholder="Price After Discount"
                          v-model="specialOffer.priceAfter"
                          required
                          disabled
                        />
      
      
                      </div>
                    </div>
                    <div class="col-6 col-md-4">
                      <div class="form-group">
                        <label><strong>Discount*</strong></label>
                        <b-input-group append="%">
                          <b-form-input
                            placeholder="Enter Discount"
                            type="number"
                            min="0"
                            v-model="specialOffer.discount"
                            @keyup="calculateDiscount()"
                            required
                          ></b-form-input>
                        </b-input-group>
                      </div>
                    </div>
                    <div class="col-6 col-md-4">
                      <div class="form-group">
                        <label><strong>Promotion Code*</strong></label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="pro8020"
                          v-model="specialOffer.promoCode"
                        />
                      </div>
                    </div>
                    <div class="col-6 col-md-4">
                      <div class="form-group">
                        <label><strong>Promotion Date*</strong></label>
                        <a-range-picker
                          v-model="dateRange"
                          @change="setDates"
                          class="date-input"
                          size="default"
                        />
                      </div>
                    </div>
            
                    <!-- <div class="col-6 col-md-3">
                      <p><strong>Status</strong></p>
                      <a-switch default-checked />
                    </div> -->
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-6 mt-3">
                      <div class="content-area">
                        <h5 class="text-center"><strong>English</strong></h5>
                        <div class="form-group">
                          <label for="title"><strong>Title*</strong></label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter English Title"
                             v-model="specialOffer.nameEnglish"
                          />
                                  
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Description*</strong></label
                          >
                          <vue-editor  v-model="specialOffer.descriptionEnglish"></vue-editor>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <div class="content-area">
                        <h5 class="text-center"><strong>Arabic</strong></h5>
                        <div class="form-group">
                          <label for="title"><strong>Title*</strong></label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter Arabic Title"
                             v-model="specialOffer.nameArabic"
                          />
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Description*</strong></label
                          >
                          <vue-editor  v-model="specialOffer.descriptionArabic"></vue-editor>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 mt-3 text-right">
                      <button @click="saveNewSpecialOffer()" class="btn btn-primary">
                        Create Offer
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

import mixin from "../containers/mixin";
import { VueEditor } from "vue2-editor";
export default {
  name: "CreateOffer",
  components: {
    VueEditor,
  },
  mounted() {
    this.getCoursesDropdownData();
  },
  methods: {
    calculateDiscount(){
      this.specialOffer.priceAfter = (Number(this.specialOffer.priceBefore)-((Number(this.specialOffer.priceBefore)*Number(this.specialOffer.discount))/100)).toFixed(0);
    },
    setBeforePrice(){
      this.specialOffer.priceBefore =this.coursesData.filter(val=>val.id===this.specialOffer.courseId)[0].price;
    },
    setDates() {
      console.log("CreateOffer");
      let date=new Date(this.dateRange[0]._d);
      let date2=new Date(this.dateRange[1]._d);
      this.specialOffer.startDate = new Date().toISOString().split('T')[0];
      this.specialOffer.endDate = new Date().toISOString().split('T')[0];
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
    getCoursesDropdownData() {
      this.loading = true;
      axios
        .get(this.APIServer + "admin/getCourses", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data != '') {
            console.log(response.data)
            // console.log(response.data.data);
            this.coursesData = response.data;
          }
          this.loading = false;
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.loading = false;
        });
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
            this.specialOffer.image = response.data.secure_url;
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
    saveNewSpecialOffer() {
      if(!this.specialOffer.nameEnglish){
        this.openNotificationWithIcon(
            "warning",
             "English Title is Required",
            "bottomRight"
          );
      return;
      }
      console.log("saving special offer");
      let newSpecialOffer = new FormData();
      newSpecialOffer.append("discount", this.specialOffer.discount);
      newSpecialOffer.append("startDate", this.specialOffer.startDate);
      newSpecialOffer.append("endDate", this.specialOffer.endDate);
      newSpecialOffer.append("courseId", this.specialOffer.courseId);
      newSpecialOffer.append("offerImage", this.specialOffer.offerImage);
      newSpecialOffer.append("descriptionArabic", this.specialOffer.descriptionArabic);
      newSpecialOffer.append("descriptionEnglish", this.specialOffer.descriptionEnglish);
      newSpecialOffer.append("nameArabic", this.specialOffer.nameArabic);
      newSpecialOffer.append("nameEnglish", this.specialOffer.nameEnglish);
      newSpecialOffer.append("promoCode", this.specialOffer.promoCode);
      newSpecialOffer.append("priceBefore", this.specialOffer.priceBefore);
      newSpecialOffer.append("priceAfter", this.specialOffer.priceAfter);

      console.log(newSpecialOffer);
      
      axios
      .post(this.APIServer + "admin/createOffer", newSpecialOffer,{
          headers: { Authorization: this.$store.state.token },
        })
      .then((response) => {
        console.log('re')

        if (response.data.status == "success") {
          if(response.data.data==="Promotion has been Added"){
            this.$router.push({ path: "/special-offers" });
            this.openNotificationWithIcon(
              "success",
               response.data.data,
              "bottomRight"
            );
          }
          else{
            this.openNotificationWithIcon(
            "success",
             response.data.data,
            "bottomRight"
            );
          }
        } else {
          console.log(response.data);
          this.openNotificationWithIcon(
            "warning",
            response.data.message,
            "bottomRight"
          );
        }
        // console.log(response.data);
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
      openNotificationWithIcon(type, message, placement) {
      this.$notification[type]({
        message: "Response",
        description: message,
        placement,
      });
    }
  },
  data() {
    return {
      APIServer: process.env.VUE_APP_SERVER_ADDRESS,
      image: null,
      coursesData: [],
      dateRange: [],
  
  specialOffer: {
        discount: null,
        startDate:null,
        endDate:null,
        courseId:null,
        descriptionArabic:null,
        descriptionEnglish:null,
        nameArabic:null,
        nameEnglish:null,
        promoCode: null,
        priceBefore: null,
        priceAfter: null,
        offerImage:null,
        
      },
    };
  },
};
</script>

<style scoped>
.content-area {
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 20px 30px;
}
.add-label {
  visibility: hidden;
}

a {
  color: #fff !important;
}
</style>