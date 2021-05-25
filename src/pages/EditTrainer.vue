<template>
    <div class="create-user">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h5><strong>Edit Trainer</strong></h5>
                                <span class="back" @click="move('/trainers')"><i class="fa fa-user"></i> <strong class="back">Trainers</strong></span> <i class="fa fa-chevron-right"></i><strong>Edit Trainer</strong>
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
                                                <label for="mobile"><strong>Phone*</strong></label>
                                                <input type="tel" class="form-control" v-model="user.phone" placeholder="Enter Phone" required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="job_title"><strong>Country*</strong></label>
                                                <select
                                                    class="form-control"
                                                    v-model="user.country"
                                                    required
                                                 >
                                                    <option :value="item.name" v-for="(item, index) in countries" :key="index">{{item.name}}</option>
                                                </select> 
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="job_title"><strong>Residence*</strong></label>
                                                <input type="text" class="form-control" v-model="user.residence" placeholder="Enter Residence" required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="job_title"><strong>Organization Name*</strong></label>
                                                <input type="text" class="form-control" v-model="user.organization" placeholder="Enter Organization Name" required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="job_title"><strong>Years of Experience*</strong></label>
                                                <input type="text"  class="form-control" v-model="user.experience" placeholder="Enter Years of Experience" required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="gender"><strong>Gender*</strong></label>
                                                <select class="form-control" required v-model="user.gender" >
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="gender"><strong>Courses Offered*</strong></label>
                                                <select class="form-control" required v-model="user.course_offered" >
                                                    <option value="manual">Manual</option>
                                                    <option value="automated">Automated</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-12 mt-3 text-right">
                                            <button class="btn btn-primary" @click="updateTrainer">Edit Trainer</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h5><strong>Reset Password</strong></h5>
                            </div>
                        </div>
                        <form @submit.prevent>
                            <div class="row mt-3 mx-md-3">
                                <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                    <div class="form-group">
                                        <label for="current-password"><strong>Current Password*</strong></label>
                                        <input :type="showCurrentPassword?'text':'password'" class="form-control" placeholder="Enter Current Password" v-model="updatePassword.current_password" required>
                                        <span class="visiblePass"><i :class="showCurrentPassword?'fa fa-eye':'fa fa-eye-slash'" @click="showCurrentPassword=!showCurrentPassword;"></i></span>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                    <div class="form-group">
                                        <label for="new-password"><strong>New Password*</strong></label>
                                        <input :type="showNewPassword?'text':'password'" class="form-control" placeholder="Enter New Password"  v-model="updatePassword.password" required>
                                        <span class="visiblePass"><i :class="showNewPassword?'fa fa-eye':'fa fa-eye-slash'" @click="showNewPassword=!showNewPassword;"></i></span>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                    <div class="form-group">
                                        <label for="confirm-password"><strong>Confirm Password*</strong></label>
                                        <input :type="showConfirmPassword?'text':'password'" class="form-control" placeholder="Confirm Password"  v-model="updatePassword.c_password" required>
                                        <span class="visiblePass"><i :class="showConfirmPassword?'fa fa-eye':'fa fa-eye-slash'" @click="showConfirmPassword=!showConfirmPassword;"></i></span>
                                    </div>
                                </div>
                                <div class="col-12 mt-2 text-right">
                                    <div class="form-group">
                                        <button @click="updateTrainerPassword()" class="btn btn-primary">Reset Password</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixin from "../containers/mixin";
import axios from "axios";
import countries from '../assets/countries.json'

export default {
    name: "EditUser",
    created() {
        this.getTrainerDetails(this.$route.params.id);
    },
    methods: {
        move(to) {
            this.$router.push({path: to})
        },
        pickAvatar() {
            this.$refs.AvatarInput.click();
        },
        getTrainerDetails(id) {
        axios
            .get(this.APIServer + "admin/trainer/show/" + id, {
            headers: { Authorization: this.$store.state.token },
            })
            .then((response) => {
            if (response.data.status == "success") {
                this.user = response.data.data;
                this.user.course_offered=this.user.trainer.course_offered;
                this.user.experience=this.user.trainer.experience;
                this.user.organization=this.user.trainer.organization;
                this.user.residence=this.user.trainer.residence;
            }
            console.log(this.user)
            })
            .catch((e) => {
            console.log("API failed");
            console.log(e);
            });
        },
        onAvatarSelected(event) {
            let file = event.target.files[0];
            if(file) {
                this.image = URL.createObjectURL(file)
            }
        },
         updateTrainer() {
            let newUser = new FormData();
            newUser.append("first_name", this.user.first_name);
            newUser.append("last_name", this.user.last_name);
            newUser.append("email", this.user.email);
            newUser.append("phone", Number(this.user.phone));
            newUser.append("gender", this.user.gender);
            newUser.append("country", this.user.country);
            newUser.append("nationality", this.user.country);
            newUser.append("experience", this.user.experience);
            newUser.append("residence", this.user.residence);
            newUser.append("course_offered", this.user.course_offered);
            axios
            .post(
            this.APIServer + "admin/trainer/update-trainer/" + this.$route.params.id,
            newUser,
            {
                headers: { Authorization: this.$store.state.token },
            }
            )
            .then((response) => {
            if (response.data.status == "success") {
                this.$router.push({ path: "/trainers" });
                this.openNotificationWithIcon(
                "success",
                "Trainer updated successfully",
                "bottomRight"
                );
            } else {
                if(response.data.message==="Trainer Profile updated successfully!"){
                this.$router.push({ path: "/trainers" });
                this.openNotificationWithIcon(
                    "success",
                    "Trainer updated successfully",
                    "bottomRight"
                );
                }
                else{
                    this.openNotificationWithIcon(
                    "warning",
                    response.data.message,
                    "bottomRight"
                    );
                }
            }
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
        },
        updateTrainerPassword() {
          console.log("updating password");
          let updatedPassword = new FormData();
          updatedPassword.append("current_password", this.updatePassword.current_password);
          updatedPassword.append("password", this.updatePassword.password);
          updatedPassword.append("c_password", this.updatePassword.c_password);
          axios
            .post(this.APIServer + "admin/trainer/update-password/" + this.$route.params.id, updatedPassword, {
              headers: { Authorization: this.$store.state.token },
            })
            .then((response) => {
                if (response.data.message != null) {
                    if(response.data.message === "password do not match"){
                    this.openNotificationWithIcon(
                        "error",
                        "Current Password is Incorrect",
                        "bottomRight"
                    );
                    }
                    if(response.data.message === "The given data was invalid."){
                    if(response.data.errors.current_password && response.data.errors.current_password.length>0){
                        this.openNotificationWithIcon(
                        "error",
                        response.data.errors.current_password[0],
                        "bottomRight"
                        );
                    }
                    if(response.data.errors.c_password && response.data.errors.c_password.length>0){
                        this.openNotificationWithIcon(
                        "error",
                        response.data.errors.c_password[0],
                        "bottomRight"
                        );
                    }
                    if(response.data.errors.password && response.data.errors.password.length>0){
                        this.openNotificationWithIcon(
                        "error",
                        response.data.errors.password[0],
                        "bottomRight"
                        );
                    }
                    }
                    if(response.data.message === "Password changed successfully!"){
                        this.openNotificationWithIcon(
                        "success",
                        response.data.message,
                        "bottomRight"
                        );
                        this.$router.push({ path: "/users" });
                    }
                }
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
            countries: countries,
            showNewPassword:false,
            showConfirmPassword:false,
            showCurrentPassword: false,
            APIServer: process.env.VUE_APP_SERVER_ADDRESS,
            image: null,
            user:{
                first_name: null,
                last_name: null,
                email: null,
                phone: null,
                country: null,
                residence: null,
                course_offered: null,
                organization:null,
                experience:null,
                gender:null,
            },
             updatePassword:{
              password: null,
              current_password: null,
              c_password: null
            }
        }
    }
}
</script>

<style scoped>

</style>