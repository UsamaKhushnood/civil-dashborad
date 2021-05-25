<template>
    <div class="create-user">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h5><strong>Create Student</strong></h5>
                                <span class="back" @click="move('/students')"><i class="fa fa-user"></i> <strong class="back">Students</strong></span> <i class="fa fa-chevron-right"></i><strong>Create Student</strong>
                            </div>
                        </div>
                        <div class="row mt-5 mx-md-3">
                            <!-- <div class="col-12 ">
                                <label for="first_name"><strong>Upload Image</strong></label> <br>
                                <input type="file" class="btn btn-primary" accept="image/*"  @change="onAvatarSelected" ref="AvatarInput">
                            </div>          -->
                            <div class="col-12">
                                <form @submit.prevent>
                                    <div class="row">
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="first_name"><strong>First Name*</strong></label>
                                                <input type="text" class="form-control" v-model="user.first_name" placeholder="Enter First Name" required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="last_name"><strong>Last Name*</strong></label>
                                                <input type="text" class="form-control" v-model="user.last_name" placeholder="Enter Last Name" required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="email"><strong>Email*</strong></label>
                                                <input type="email" class="form-control" v-model="user.email" placeholder="Enter Email" required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="password"><strong>Password*</strong></label>
                                                <input type="password" class="form-control" placeholder="Enter Password" v-model="user.password" required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="mobile"><strong>Phone*</strong></label>
                                                <input type="tel" class="form-control" v-model="user.phone" placeholder="Enter Phone" required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="job_title"><strong>Country*</strong></label>
                                                <input type="text" class="form-control" placeholder="Enter Country" v-model="user.country" required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="job_title"><strong>Date of Birth*</strong></label>
                                                <input type="date" v-model="user.dob" class="form-control" required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="gender"><strong>Gender*</strong></label>
                                                <select v-model="user.gender" class="form-control" required>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="gender"><strong>Course Learning*</strong></label>
                                                <select v-model="user.course_learning" class="form-control" required>
                                                    <option value="manual">Manual</option>
                                                    <option value="automated">Automated</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="gender"><strong>Test Type*</strong></label>
                                                <select v-model="user.test_type" class="form-control" required>
                                                    <option value="basic">Basic</option>
                                                    <option value="advanced">Advanced</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="gender"><strong>Course Selection*</strong></label>
                                                <select v-model="user.course_selection" class="form-control" required>
                                                    <option value="car driving">Car Driving</option>
                                                    <option value="truck driving">Truck Driving</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div class="col-12 mt-3 text-right">
                                            <button @click="saveNewStudent" class="btn btn-primary">Create Student</button>
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

export default {
    name: "CreateUser",
    methods: {
        move(to) {
            this.$router.push({path: to})
        },
        pickAvatar() {
            this.$refs.AvatarInput.click();
        },
        onAvatarSelected(event) {
            let file = event.target.files[0];
            if(file) {
                this.image = URL.createObjectURL(file)
            }
        },
        saveNewStudent() {
            console.log("saving student");
          let newStudent = new FormData();
          newStudent.append("first_name", this.user.first_name);
          newStudent.append("last_name", this.user.last_name);
          newStudent.append("email", this.user.email);
          newStudent.append("password", this.user.password);
          newStudent.append("c_password", this.user.password);
          newStudent.append("phone", this.user.phone);
          newStudent.append("gender", this.user.gender);
          newStudent.append("country", this.user.country);
          newStudent.append("nationality", this.user.country + 'i');
          newStudent.append("dob", this.user.dob);
          newStudent.append("course_learning", this.user.course_learning);
          newStudent.append("test_type", this.user.test_type);
          newStudent.append("course_selection", this.user.course_selection);
          newStudent.append("image", this.user.image);
          axios
            .post(this.APIServer + "admin/student/create-student", newStudent, {
              headers: { Authorization: this.$store.state.token },
            })
            .then((response) => {
              if (response.data.status == "success") {
                this.openNotificationWithIcon(
                  "success",
                  "Student added successfully",
                  "bottomRight"
                );
                this.move('/students');
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
            user:{
                first_name: null,
                last_name: null,
                email: null,
                password: null,
                c_password: null,
                phone: null,
                country: null,
                nationality: null,
                dob: null,
                gender: null,
                course_learning: null,
                test_type: null,
                course_selection: null,
                image: 'https://www.w3schools.com/howto/img_avatar.png'
            }
        }
    }
}
</script>

<style scoped>

</style>