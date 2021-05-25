<template>
  <div class="course">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Course Details</strong></h5>
                <span class="back" @click="move('/courses')"
                  ><i class="fa fa-user"></i>
                  <strong class="back">Courses</strong></span
                >
                <i class="fa fa-chevron-right"></i
                ><strong>Course Details</strong>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-12 mb-3">
                <label><strong class="text-main">Course Images</strong></label>
                <div class="d-flex">
                  <img src="https://civil-dashboard.netlify.app/img/logo.dfe8adc9.png" />
                  <!-- <img
                    v-for="image in course.companyLogoImagePath"
                    :key="image.id"
                    class="image"
                    :src="image.image"
                  /> -->
                  <!-- <div class="image"></div>
                  <div class="image"></div> -->
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <label><strong class="text-main">English Name</strong></label>
                <p>{{ course.nameEnglish }}</p>
              </div>
              <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <label><strong class="text-main">Arabic Name</strong></label>
                <p>{{ course.nameArabic }}</p>
              </div>
              <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <label><strong class="text-main">Price</strong></label>
                <p>$ {{ course.price }}</p>
              </div>
              <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <label><strong class="text-main">Status</strong></label>
                <p v-if="course.activeStatus == 1">Active</p>
                <p v-if="course.activeStatus == 0">InActive</p>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12">
                <label
                  ><strong class="text-main">English Description</strong></label
                >
                <p>{{ course.RegistrationProcedureEnglish }}</p>
              </div>
              <div class="col-12">
                <label
                  ><strong class="text-main">Arabic Description</strong></label
                >
                <p>{{ course.RegistrationProcedureArabic }}</p>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12 pb-4">
                <label
                  ><strong class="text-main"
                    >Course Reviews ({{total}})</strong
                  ></label
                >
              </div>
              <div class="col-12">
                <div
                  class="row"
                  v-for="review in course.reviews"
                  :key="review.id"
                >
                  <div class="col-12">
                    <div class="d-flex">
                      <b-img
                        v-bind="mainProps1"
                        src="https://ptetutorials.com/images/user-profile.png"
                      ></b-img>
                      <p class="pl-3 pt-2">
                        <strong>{{ review.user_id }}</strong>
                        <i class="fa fa-star star-icon"></i> ({{
                          review.rating
                        }})
                      </p>
                    </div>
                    <div class="review pt-2">
                      <p>{{ review.comment }}</p>
                    </div>
                  </div>
                </div>
                <hr />
                <!-- <div class="row">
                  <div class="col-12">
                    <div class="d-flex">
                      <b-img
                        v-bind="mainProps1"
                        src="https://ptetutorials.com/images/user-profile.png"
                      ></b-img>
                      <p class="pl-3 pt-2">
                        <strong>Arslan Ahmed</strong>
                        <i class="fa fa-star star-icon"></i> (5)
                      </p>
                    </div>
                    <div class="review pt-2">
                      <p>Very good Course. I learnt alot from this course.</p>
                    </div>
                  </div>
                </div> -->
                <!-- <hr /> -->
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
  name: "Course",
  data() {
    return {
      totalReviews:0,
      total:0,
      APIServer: process.env.VUE_APP_SERVER_ADDRESS,
      mainProps1: { blank: false, blankColor: "#777", width: 40, height: 40 },
      course: [],
    };
  },
  created() {
    // console.log(this.$route.params.id);
    this.getCourseDetails(this.$route.params.id);
  },
  methods: {
    getCourseDetails(id) {
      
      this.totalReviews=0;
      this.total=0;
      axios
        .get(this.APIServer + "admin/getCourse?id=" + id,{
          data: {id: id},
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log('dsdsa',response)
          
          if (response.data) {
            // console.log(response.data.data);
            this.course = response.data;
            console.log(this.course);
            this.course.reviews.forEach((item) => {
              this.totalReviews=this.totalReviews+Number(item.rating);
            });
            if(this.course.reviews.length>0){
              this.total = this.totalReviews/this.course.reviews.length;
            }
            // this.coursesData = response.data.data;
          }
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
        });
    },
    move(to) {
      this.$router.push({ path: to });
    },
  },
};
</script>

<style scoped>
.star-icon {
  margin-top: 4px !important;
  color: gold;
}
.image {
  /* background: url("../assets/image.jpg"); */
  width: 150px;
  height: 120px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 5px;
}
</style>