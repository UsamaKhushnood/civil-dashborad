<template>
    <div class="edit-offer">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h5><strong>Update Offer</strong></h5>
                                <span class="back" @click="move('/special-offers')"><i class="fa fa-user"></i> <strong class="back">Special Offers</strong></span> <i class="fa fa-chevron-right"></i><strong>Update Offer</strong>
                            </div>
                        </div>
                        <div class="row mx-md-3">
                            <div class="col-12 mt-3 col-md-4">
                                <label for="images"><strong>Upload Image</strong></label>
                                <input
                                type="file"
                                class="btn btn-primary"
                                accept="image/*"
                                ref="AvatarInput"
                                @change="uploadImage"
                                />
                            </div>
                        </div>
                        <div class="row mx-md-3">
                            <div class="col-12 mt-3">
                                <form @submit.prevent>
                                <div class="row">
                                    <div class="col-6 col-md-4">
                                    <div class="form-group">
                                        <label><strong>Course*</strong></label>
                                        <select v-model="specialOffer.course_id" class="form-control" required  @change="setBeforePrice()">
                                            <option v-for="(course, courseIndex) in coursesData" :key="courseIndex" :value="course.id">{{ course.title_en }}</option>
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
                                            v-model="specialOffer.before_price"
                                            placeholder="Enter Price Before"
                                            required
                                            disabled
                                        />
                                        <span class="visiblePass"><i class="fa fa-usd"></i></span>
                                    </div>
                                    </div>
                                    <div class="col-6 col-md-4">
                                    <div class="form-group">
                                        <label><strong>Price After*</strong></label>
                                        <input
                                            type="number"
                                            class="form-control"
                                            min="0"
                                            placeholder="Enter Price After"
                                            v-model="specialOffer.after_price"
                                            required
                                            disabled
                                        />
                                        <span class="visiblePass"><i class="fa fa-usd"></i></span>
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
                                                required
                                                @keyup="calculateDiscount()"
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
                                            v-model="specialOffer.promotion_code"
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
                                            v-model="specialOffer.title_en"
                                        />
                                        </div>
                                        <div class="form-group">
                                        <label for="title"
                                            ><strong>Description*</strong></label
                                        >
                                        <vue-editor  v-model="specialOffer.description_en"></vue-editor>
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
                                            v-model="specialOffer.title_ar"
                                        />
                                        </div>
                                        <div class="form-group">
                                        <label for="title"
                                            ><strong>Description*</strong></label
                                        >
                                        <vue-editor  v-model="specialOffer.description_ar"></vue-editor>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="col-12 mt-3 text-right">
                                    <button @click="editOffer()" class="btn btn-primary">
                                        Update Offer
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
import moment from 'moment'
export default {
    name: "CreateOffer",
    components: {
        VueEditor
    },
    mounted() {
        this.getCoursesDropdownData();
        this.getOffer(this.$route.params.id);
    },
    methods: {
        calculateDiscount(){
            this.specialOffer.after_price = (Number(this.specialOffer.before_price)-((Number(this.specialOffer.before_price)*Number(this.specialOffer.discount))/100)).toFixed(0);
        },
        setBeforePrice(){
            this.specialOffer.before_price =this.coursesData.filter(val=>val.id===this.specialOffer.course_id)[0].price;
        },
        setDates() {
            console.log("CreateOffer",this.dateRange);
            let date=new Date(this.dateRange[0]._d);
            let date2=new Date(this.dateRange[1]._d);
            this.specialOffer.promotion_start_date = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate();
            this.specialOffer.promotion_end_date = date.getFullYear() +'-'+ (date2.getMonth()+1) +'-'+ date2.getDate();
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
        getOffer(id){
        axios
            .get(this.APIServer + "special-offer/show/" + id, {
            headers: { Authorization: this.$store.state.token },
            })
            .then((response) => {
            if (response.data.status == "success") {
                this.specialOffer = response.data.data;
                this.dateRange= [moment(this.specialOffer.promotion_start_date),moment(this.specialOffer.promotion_end_date)]
            }
            console.log(this.specialOffer)
            })
            .catch((e) => {
            console.log("API failed");
            console.log(e);
            });
        },
        getCoursesDropdownData() {
        this.loading = true;
        axios
            .get(this.APIServer + "course/list", {
            headers: { Authorization: this.$store.state.token },
            })
            .then((response) => {
            if (response.data.status == "success") {
                // console.log(response.data.data);
                this.coursesData = response.data.data;
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
        editOffer() {
            console.log("edit special offer");
            let newSpecialOffer = new FormData();
            newSpecialOffer.append("discount", this.specialOffer.discount);
            newSpecialOffer.append("promotion_start_date", this.specialOffer.promotion_start_date);
            newSpecialOffer.append("promotion_end_date", this.specialOffer.promotion_end_date);
            newSpecialOffer.append("course_id", this.specialOffer.course_id);
            newSpecialOffer.append("image", this.specialOffer.image);
            newSpecialOffer.append("description_ar", this.specialOffer.description_ar);
            newSpecialOffer.append("description_en", this.specialOffer.description_en);
            newSpecialOffer.append("title_ar", this.specialOffer.title_ar);
            newSpecialOffer.append("promotion_code", this.specialOffer.promotion_code);
            newSpecialOffer.append("title_en", this.specialOffer.title_en);
            newSpecialOffer.append("before_price", this.specialOffer.before_price);
            newSpecialOffer.append("after_price", this.specialOffer.after_price);
            axios
            .post(this.APIServer + "special-offer/update/"+this.$route.params.id, newSpecialOffer)
            .then((response) => {
                if (response.data.status == "success") {
                if(response.data.data==="Promotion has been Updated"){
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
                description_ar:null,
                description_en:null,
                title_ar:null,
                title_en:null,
                before_price:null,
                after_price:null,
                promotion_start_date: null,
                promotion_end_date: null,
                course_id: null,
                image: null,
                promotion_code:null
            },
        }
    },
}
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