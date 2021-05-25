<template>
    <div class="create-user">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h5><strong>Edit Student</strong></h5>
                                <span class="back" @click="move('/students')"><i class="fa fa-user"></i> <strong class="back">Students</strong></span> <i class="fa fa-chevron-right"></i><strong>Edit Student</strong>
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
                                                <input type="text" class="form-control" v-model="user.firstName" :placeholder="this.user.firstName"  required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="last_name"><strong>Last Name*</strong></label>
                                                <input type="text" class="form-control" v-model="user.lastName" :placeholder="this.user.lastName" required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="email"><strong>Email*</strong></label>
                                                <input type="email" class="form-control" v-model="user.email" :placeholder="this.user.email" required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="mobile"><strong>Phone*</strong></label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    v-model="user.phoneNo"
                                                    maxlength="10"
                                                    
                                                    @keypress="phoneno"
                                                    :placeholder="this.user.phoneNo"
                                                    required
                                                    />
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                            <label for="job_title"><strong>Country*</strong></label>
                                                <select
                                                    class="form-control"
                                                    v-model="user.nationality"
                                                    required
                                                    >
                                                <option :value="item.name" v-for="(item, index) in countries" :key="index">{{item.name}}</option>
                                            </select>
                                            </div>
                                        </div>
                                     <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                            <label for="job_titlex"><strong>Residence*</strong></label>
                                                <select
                                                    class="form-control"
                                                    v-model="user.residenceCountry"
                                                    required
                                                    >
                                                <option :value="item.name" v-for="(item, index) in countries" :key="index">{{item.name}}</option>
                                            </select>
                                            </div>
                                        </div>
                                      
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="job_title"><strong>Date of Birth*</strong></label>
                                                 <p>{{ user.dateOfBirth  | formatDate}}</p>
                                                <input type="date" class="form-control" v-model="user.dateOfBirth" required>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                                            <div class="form-group">
                                                <label for="gender"><strong>Gender*</strong></label>
                                                <select class="form-control" v-model="user.gender" required>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                         <div class="col-12 mt-3 text-right">
                                            <button class="btn btn-primary" @click="updateStudent">Edit Student</button>
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
                                        <button @click="updateStudentPassword()" class="btn btn-primary">Reset Password</button>
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
import countries from '../assets/countries.json'
import axios from "axios";
import Vue from 'vue'
import moment from 'moment'
import { cifNr } from '@coreui/icons';

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
});



export default {
    name: "EditUser",
    created() {
        this.getStudentDetails(this.$route.params.id);
    },
    methods: {
        phoneno(e){
            let a = [];
            let k = e.which;
            let i;
            for (i = 48; i < 58; i++)
                a.push(i);

            if (!(a.indexOf(k)>=0))
                e.preventDefault();
        },
        updateStudent() {
            let newUser = new FormData();
            newUser.append("firstName", this.user.firstName);
            newUser.append("lastName", this.user.lastName);
            newUser.append("email", this.user.email);
            newUser.append("residenceCountry", this.user.residenceCountry);
            newUser.append("phoneNo", Number(this.user.phoneNo));
            newUser.append("gender", this.user.gender);
            newUser.append("nationality", this.user.nationality);
           // newUser.append("nationality", this.user.nationality);
            newUser.append("dateOfBirth", this.user.dateOfBirth);
            newUser.append("userId", this.user._id);
            //console.log(newUser)
            

            axios
            .patch(
            this.APIServer + "admin/updateStudent", newUser,
            {
                headers: { Authorization: this.$store.state.token },
            }
            )
            .then((response) => {
                console.log(response);
            if (response.data.status == true) {
                this.$router.push({ path: "/students" });
                this.openNotificationWithIcon(
                "success",
                "Student updated successfully",
                "bottomRight"
                );
            } else {
                if(response.data.message==="Student updated successfully!"){
                this.$router.push({ path: "/students" });
                this.openNotificationWithIcon(
                    "success",
                    "Student updated successfully",
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
        getStudentDetails(id) {
        axios
            .get(this.APIServer + "admin/getStudent?id=" + id, {
            headers: { Authorization: this.$store.state.token },
            })
            .then((response) => {
                console.log(response)
             if (response.data != null) {
             this.user = response.data.user;
            // console.log("user updated");
           }
            })
            .catch((e) => {
            console.log("API failed");
            console.log(e);
            });
        },
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
        openNotificationWithIcon(type, message, placement) {
          this.$notification[type]({
            message: "Response",
            description: message,
            placement,
          });
        },
        updateStudentPassword() {
          console.log("updating password");
          let updatedPassword = new FormData();
          updatedPassword.append("current_password", this.updatePassword.current_password);
          updatedPassword.append("password", this.updatePassword.password);
          updatedPassword.append("c_password", this.updatePassword.c_password);
          axios
            .post(this.APIServer + "admin/student/update-password/" + this.$route.params.id, updatedPassword, {
              headers: { Authorization: this.$store.state.token },
            })
            .then((response) => {
                 if (response.data.message != null) {
                    if(response.data.message === "password do not match"){
                    this.openNotificationWithIcon(
                        "error",
                        "Current Password is Incorrect.",
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
                        this.$router.push({ path: "/students" });
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
            formatDate: '',
            coursesData : [],
            showNewPassword:false,
            showConfirmPassword:false,
            showCurrentPassword: false,
            APIServer:  `http://cryptic-gorge-79265.herokuapp.com/api/` || process.env.VUE_APP_SERVER_ADDRESS,
            image: null,
            user:{
                firstName: null,
                lastName: null,
                email: null,
                residence: null,
                phoneNo: null,
                country: null,
                nationality: null,
                dateOfBirth: null,
                gender: null,
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