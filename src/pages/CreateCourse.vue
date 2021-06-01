<template>
  <div class="create-course">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Create Course</strong></h5>
                <span class="back" @click="move('/courses')"
                  ><i class="fa fa-user"></i>
                  <strong class="back">Courses</strong></span
                >
                <i class="fa fa-chevron-right"></i
                ><strong>Create Course</strong>
              </div>
            </div>
            <div class="row mx-md-3">
              <div class="col-12 mt-3 col-md-6">
                <label for="images"><strong>Upload Images</strong></label>
                <br />
                <input
                  type="file"
                  class="btn btn-primary"
                  accept="image/*"
                  multiple
                  ref="AvatarInput"
                  @change="uploadImage"
                />
              </div>
              <div class="col-12 mt-3 col-md-6">
                <label for="images"><strong>Upload Compnay Logo</strong></label>
                <br />
                <input
                  type="file"
                  class="btn btn-primary"
                  accept="image/*"
                  ref="AvatarInput"
                  @change="uploadLogo"
                />
              </div>
            </div>
            <div class="row mx-md-3">
              <div class="col-12 mt-3">
                <form @submit.prevent>
                  <div class="row">
                    <div class="col-6 col-md-3">
                      <div class="form-group">
                        <label><strong>Select Category*</strong></label>
                        <select
                          v-model="course.category_id"
                          class="form-control"
                          required
                        >
                          <option
                            :value="item.id"
                            v-for="(item, index) in categories"
                            :key="index"
                            >{{ item.title_en }}</option
                          >
                        </select>
                      </div>
                    </div>
                    <div class="col-6 col-md-3">
                      <div class="form-group">
                        <label><strong>Price*</strong></label>
                        <input
                          type="number"
                          class="form-control"
                          min="0"
                          placeholder="Enter Price"
                          required
                          v-model="course.price"
                        />
                      </div>
                    </div>
                    <div class="col-6 col-md-3">
                      <div class="form-group">
                        <label><strong>Organized By*</strong></label>
                        <select
                          v-model="course.organized_by"
                          class="form-control"
                          required
                        >
                          <option
                            :value="item.id"
                            v-for="(item, index) in trainers"
                            :key="index"
                            >{{ item.first_name }}</option
                          >
                        </select>
                      </div>
                    </div>
                    <div class="col-6 col-md-3">
                      <p><strong>Status</strong></p>
                      <a-switch v-model="course.status" />
                    </div>
                  </div>
                  <div
                    class="row"
                    v-for="(item, index) in addresses"
                    :key="index"
                  >
                    <div class="col-6 col-md-3">
                      <div class="form-group">
                        <label><strong>Country*</strong></label>
                        <select class="form-control" v-model="item.country">
                          <option :value="null">Select Country</option>
                          <option
                            :value="item.name"
                            v-for="(item, index) in countries"
                            :key="index"
                            >{{ item.name }}</option
                          >
                        </select>
                      </div>
                    </div>
                    <div class="col-6 col-md-3">
                      <div class="form-group">
                        <label><strong>Address*</strong></label>
                        <input
                          type="text"
                          v-model="item.address"
                          class="form-control"
                          min="0"
                          placeholder="Enter Address"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-6 col-md-3">
                      <div class="form-group">
                        <label><strong>State*</strong></label>
                        <input
                          type="text"
                          v-model="item.state"
                          class="form-control"
                          min="0"
                          placeholder="Enter State"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-6 col-md-3">
                      <div class="form-group">
                        <label><strong>Area*</strong></label
                        ><i
                          class="fa fa-trash pull-right"
                          @click="removeAddress(index)"
                        ></i>
                        <input
                          type="text"
                          v-model="item.area"
                          class="form-control"
                          min="0"
                          placeholder="Enter Area"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <a class="btn btn-primary" @click="addAddress"
                        >Add Location</a
                      >
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-6 mt-3 ">
                      <div class="content-area">
                        <h5 class="text-center"><strong>English</strong></h5>
                        <div class="form-group">
                          <label for="title"><strong>Name*</strong></label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter English Name"
                            v-model="course.title_en"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Course Information*</strong></label
                          >
                          <vue-editor
                            v-model="course.description_en"
                          ></vue-editor>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Documents Required*</strong></label
                          >
                          <vue-editor v-model="course.document_en"></vue-editor>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Registration Proceedure*</strong></label
                          >
                          <vue-editor
                            v-model="course.registeration_procedure_en"
                          ></vue-editor>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Lecture Details*</strong></label
                          >
                          <vue-editor
                            v-model="course.lecturer_detail_en"
                          ></vue-editor>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Fees Details*</strong></label
                          >
                          <vue-editor
                            v-model="course.fee_detail_en"
                          ></vue-editor>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Test Details*</strong></label
                          >
                          <vue-editor
                            v-model="course.test_detail_en"
                          ></vue-editor>
                        </div>
                        <div class="form-group">
                          <label
                            ><strong
                              >Refund Policy For Online Payments</strong
                            ></label
                          >
                          <vue-editor
                            v-model="course.payment_refund_policy_en"
                          ></vue-editor>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 mt-3 ">
                      <div class="content-area">
                        <h5 class="text-center"><strong>Arabic</strong></h5>
                        <div class="form-group">
                          <label for="title"><strong>Name*</strong></label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter Arabic Name"
                            v-model="course.title_ar"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Course Information*</strong></label
                          >
                          <vue-editor
                            v-model="course.description_ar"
                          ></vue-editor>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Documents Required*</strong></label
                          >
                          <vue-editor v-model="course.document_ar"></vue-editor>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Registration Proceedure*</strong></label
                          >
                          <vue-editor
                            v-model="course.registeration_procedure_ar"
                          ></vue-editor>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Lecture Details*</strong></label
                          >
                          <vue-editor
                            v-model="course.lecturer_detail_ar"
                          ></vue-editor>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Fees Details*</strong></label
                          >
                          <vue-editor
                            v-model="course.fee_detail_ar"
                          ></vue-editor>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Test Details*</strong></label
                          >
                          <vue-editor
                            v-model="course.test_detail_ar"
                          ></vue-editor>
                        </div>
                        <div class="form-group">
                          <label
                            ><strong
                              >Refund Policy For Online Payments</strong
                            ></label
                          >
                          <vue-editor
                            v-model="course.payment_refund_policy_ar"
                          ></vue-editor>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 mt-3 text-right">
                      <button @click="saveNewCourse()" class="btn btn-primary">
                        Create Course
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
import { VueEditor } from "vue2-editor";
import axios from "axios";
import countries from "../assets/countries.json";
import mixin from "../containers/mixin";

export default {
  name: "CreateCourse",
  components: {
    VueEditor,
  },
  created() {
    this.getAllTrainers();
    this.getAllCategories();
  },

  methods: {
    getAllCategories() {
      axios
        .get(this.APIServer + "category/list", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.categories = response.data.data;
            // console.log("user updated");
          }
          console.log(response.data.data);
        })
        .catch((e) => {
          console.log("API failed");
          this.loading = false;
          console.log(e);
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
    addAddress() {
      const add = {
        address: null,
        country: null,
        area: null,
        state: null,
      };
      this.addresses.push(add);
    },
    removeAddress(index) {
      this.addresses.splice(index, 1);
    },
    getAllTrainers() {
      this.loading = true;
      axios
        .get(this.APIServer + "admin/trainer/list", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.trainers = response.data.data;
            // console.log("user updated");
          }
          this.loading = false;
          console.log(response.data);
        })
        .catch((e) => {
          console.log("API failed");
          this.loading = false;
          console.log(e);
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
            this.course.images.push(response.data.secure_url);
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
            return null;
          });
      }
    },
    uploadLogo(event) {
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
            this.course.logo = response.data.secure_url;
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
            return null;
          });
      }
    },
    openNotificationWithIcon(type, message, placement) {
      this.$notification[type]({
        message: "Response",
        description: message,
        placement,
      });
    },
    saveNewCourse() {
      console.log("saving course", this.addresses);
      let newCourse = new FormData();
      this.addresses.forEach((item, index) => {
        newCourse.append(`locations[${index}][country]`, item.country);
        newCourse.append(`locations[${index}][address]`, item.address);
        newCourse.append(`locations[${index}][area]`, item.area);
        newCourse.append(`locations[${index}][state]`, item.state);
      });
      this.course.images.forEach((item, index) => {
        console.log(item);
        newCourse.append(`images[${index}]`, item);
      });
      newCourse.append("title_en", this.course.title_en);
      newCourse.append("organized_by", this.course.organized_by);
      newCourse.append("title_ar", this.course.title_ar);
      newCourse.append("category_id", this.course.category_id);
      newCourse.append("price", this.course.price);
      newCourse.append("course_learning", this.course.course_learning);
      newCourse.append("logo", this.course.logo);
      newCourse.append("description_en", this.course.description_en);
      newCourse.append("description_ar", this.course.description_ar);
      newCourse.append("document_en", this.course.document_en);
      newCourse.append("document_ar", this.course.document_ar);
      newCourse.append(
        "registeration_procedure_en",
        this.course.registeration_procedure_en
      );
      newCourse.append(
        "registeration_procedure_ar",
        this.course.registeration_procedure_ar
      );
      newCourse.append("status", this.course.status ? 1 : 0);
      newCourse.append("lecturer_detail_en", this.course.lecturer_detail_en);
      newCourse.append("lecturer_detail_ar", this.course.lecturer_detail_ar);
      newCourse.append("fee_detail_en", this.course.fee_detail_en);
      newCourse.append("fee_detail_ar", this.course.fee_detail_ar);
      newCourse.append("test_detail_en", this.course.test_detail_en);
      newCourse.append("test_detail_ar", this.course.test_detail_ar);
      newCourse.append(
        "payment_refund_policy_en",
        this.course.payment_refund_policy_en
      );
      newCourse.append(
        "payment_refund_policy_ar",
        this.course.payment_refund_policy_ar
      );

      axios
        .post(this.APIServer + "course/save", newCourse)
        .then((response) => {
          if (response.data.status == "success") {
            console.log(response);
            this.openNotificationWithIcon(
              "success",
              "Course added successfully",
              "bottomRight"
            );
            this.move("/courses");
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
  },
  data() {
    return {
      categories: [],
      countries: countries,
      trainers: [],
      image: null,
      APIServer: process.env.VUE_APP_SERVER_ADDRESS,
      course: {
        title_en: null,
        organized_by: null,
        title_ar: null,
        category_id: null,
        price: null,
        course_learning: null,
        logo: null,
        locations: [],
        images: [],
        description_en: null,
        description_ar: null,
        document_en: null,
        document_ar: null,
        registeration_procedure_en: null,
        registeration_procedure_ar: null,
        status: false,
        lecturer_detail_en: null,
        lecturer_detail_ar: null,
        fee_detail_en: null,
        fee_detail_ar: null,
        test_detail_en: null,
        test_detail_ar: null,
        payment_refund_policy_en: null,
        payment_refund_policy_ar: null,
      },

      addresses: [],
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
