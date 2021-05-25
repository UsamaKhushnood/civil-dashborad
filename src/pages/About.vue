<template>

<div class="contact">

<div class="row">
<div class="col-12">
<div class="card">
<div class="card-body">
<form @submit.prevent>
<div class="row">
<div class="col-12">
<h5><strong>About Page Details</strong></h5>
<hr />
</div>
<div class="col-12 my-3">
<h5><strong>Company Profile</strong></h5>
<div class="form-group mt-4">
<label><strong>Upload Company Images</strong></label> <br />
<b-form-file
v-model="aboutinfo.companyImages"
class="btn"
placeholder="Choose a file or drop it here..."
drop-placeholder="Drop file here..."
required
></b-form-file>
</div>
</div>
<div class="col-12 col-md-12 col-lg-12 col-xl-6">
<div class="content-area">
<h5 class="text-center"><strong>English</strong></h5>
<div class="form-group">
<label for="title"
><strong>English Heading*</strong></label
>
<input
type="text"
v-model="aboutinfo.companyHeadingEnglish"
class="form-control"
placeholder="Enter English Heading"
required
/>
</div>
<div class="form-group">
<label for="title"
><strong>English Content*</strong></label
>
<vue-editor
v-model="aboutinfo.companyContentEnglish"
></vue-editor>
</div>
</div>
</div>
<div class="col-12 col-md-12 col-lg-12 col-xl-6">
<div class="content-area">
<h5 class="text-center"><strong>Arabic</strong></h5>
<div class="form-group">
<label for="title"
><strong>Arabic Heading*</strong></label
>
<input
type="text"
v-model="aboutinfo.companyHeadingArabic"
class="form-control"
placeholder="Enter Arabic Heading"
required
/>
</div>
<div class="form-group">
<label for="title"
><strong>Arabic Content*</strong></label
>
<vue-editor
v-model="aboutinfo.companyContentArabic"
></vue-editor>
</div>
</div>
</div>

<div class="col-12 my-3">
<h5><strong>Our Mission</strong></h5>
<div class="form-group mt-4">
<label><strong>Upload Mission Images</strong></label> <br />
<b-form-file
v-model="aboutinfo.missionImages"
class="btn"
placeholder="Choose a file or drop it here..."
drop-placeholder="Drop file here..."
required
></b-form-file>

</div>
</div>
<div class="col-12 col-md-12 col-lg-12 col-xl-6">
<div class="content-area">
<h5 class="text-center"><strong>English</strong></h5>
<div class="form-group">
<label for="title"
><strong>English Heading*</strong></label
>
<input
type="text"
v-model="aboutinfo.missionHeadingEnglish"
class="form-control"
placeholder="Enter English Heading"
required
/>
</div>
<div class="form-group">
<label for="title"
><strong>English Content*</strong></label
>
<vue-editor
v-model="aboutinfo.missionContentEnglish"
></vue-editor>
</div>
</div>
</div>
<div class="col-12 col-md-12 col-lg-12 col-xl-6">
<div class="content-area">
<h5 class="text-center"><strong>Arabic</strong></h5>
<div class="form-group">
<label for="title"
><strong>Arabic Heading*</strong></label
>
<input
type="text"
v-model="aboutinfo.missionHeadingArabic"
class="form-control"
placeholder="Enter Arabic Heading"
required
/>
</div>
<div class="form-group">
<label for="title"
><strong>Arabic Content*</strong></label
>
<vue-editor
v-model="aboutinfo.missionContentArabic"
></vue-editor>
</div>
</div>
</div>

<div class="col-12 my-3">
<h5><strong>Our Vision</strong></h5>
<div class="form-group mt-4">
<label><strong>Upload Vision Images</strong></label> <br />
<b-form-file
v-model="aboutinfo.visionImages"
class="btn"
placeholder="Choose a file or drop it here..."
drop-placeholder="Drop file here..."
required
></b-form-file>
</div>
</div>
<div class="col-12 col-md-12 col-lg-12 col-xl-6">
<div class="content-area">
<h5 class="text-center"><strong>English</strong></h5>
<div class="form-group">
<label for="title"
><strong>English Heading*</strong></label
>
<input
type="text"
v-model="aboutinfo.visionHeadingEnglish"
class="form-control"
placeholder="Enter English Heading"
required
/>
</div>
<div class="form-group">
<label for="title"
><strong>English Content*</strong></label
>
<vue-editor
v-model="aboutinfo.visionContentEnglish"
></vue-editor>
</div>
</div>
</div>
<div class="col-12 col-md-12 col-lg-12 col-xl-6">
<div class="content-area">
<h5 class="text-center"><strong>Arabic</strong></h5>
<div class="form-group">
<label for="title"
><strong>Arabic Heading*</strong></label
>
<input
type="text"
class="form-control"
v-model="aboutinfo.visionHeadingArabic"
placeholder="Enter Arabic Heading"
required
/>
</div>
<div class="form-group">
<label for="title"
><strong>Arabic Content*</strong></label
>
<vue-editor
v-model="aboutinfo.visionContentArabic"
></vue-editor>
</div>
</div>
</div>

<!-- <div class="col-12 my-3">
<h5><strong>Accreditation &amp; Membership</strong></h5>
<div class="form-group mt-4">
<label><strong>Upload Images</strong></label> <br />
<input
type="file"
multiple
class="btn btn-primary btn-sm"
/>
</div>
</div> -->

<div class="col-12 my-3">
<h5><strong>Our Clients</strong></h5>
<div class="form-group mt-4">
<label><strong>Upload Clients Images</strong></label> <br />
<b-form-file
v-model="aboutinfo.clientImages"
class="btn"
placeholder="Choose a file or drop it here..."
drop-placeholder="Drop file here..."
required
></b-form-file>
</div>
</div>
<div class="col-12 col-md-12 col-lg-12 col-xl-6">
<div class="content-area">
<h5 class="text-center"><strong>English</strong></h5>
<div class="form-group">
<label for="title"
><strong>English Heading*</strong></label
>
<input
type="text"
v-model="aboutinfo.clientHeadingEnglish"
class="form-control"
placeholder="Enter English Heading"
required
/>
</div>
<div class="form-group">
<label for="title"
><strong>English Content*</strong></label
>
<vue-editor
v-model="aboutinfo.clientContentEnglish"
></vue-editor>
</div>
</div>
</div>
<div class="col-12 col-md-12 col-lg-12 col-xl-6">
<div class="content-area">
<h5 class="text-center"><strong>Arabic</strong></h5>
<div class="form-group">
<label for="title"
><strong>Arabic Heading*</strong></label
>
<input
type="text"
v-model="aboutinfo.clientHeadingArabic"
class="form-control"
placeholder="Enter Arabic Heading"
required
/>
</div>
<div class="form-group">
<label for="title"
><strong>Arabic Content*</strong></label
>
<vue-editor
v-model="aboutinfo.clientContentArabic"
></vue-editor>
</div>
</div>
</div>

<div class="col-12 text-right mt-3">
<button class="btn btn-primary" @click="saveAboutData()">
Save Information
</button>
</div>
</div>
</form>
</div>
</div>
</div>
</div>

<b-modal v-model="viewModal" hide-footer title="Contact Detials">
<div class="row">
<div class="col-6">
<div class="form-group">
<label for=""><strong>Name</strong></label>
<p>Arslan</p>
</div>
</div>
<div class="col-6">
<div class="form-group">
<label for=""><strong>Email</strong></label>
<p>arslan@gmail.com</p>
</div>
</div>
<div class="col-6">
<div class="form-group">
<label for=""><strong>Message</strong></label>
<p>Hello</p>
</div>
</div>
</div>
</b-modal>
</div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
export default {
name: "users",
components: {
VueEditor,
},
computed: {
rows() {
return this.items.length;
},
},
data() {
return {
search: '',
items: [],
currentUserRole:'',
aboutinfo: {
companyHeadingEnglish: null,
companyContentEnglish: null,
companyHeadingArabic: null,
companyContentArabic: null,
missionHeadingEnglish: null,
missionContentEnglish: null,
missionHeadingArabic: null,
missionContentArabic: null,
visionHeadingEnglish: null,
visionContentEnglish: null,
visionHeadingArabic: null,
visionContentArabic: null,
clientHeadingEnglish: null,
clientHeadingArabic: null,
clientContentEnglish: null,
clientContentArabic: null,
missionImages: null,
visionImages: null,
clientImages: null,
companyImages: null,
_id:null,
status: "active",
},
checkAlready:false,
APIServer: process.env.VUE_APP_SERVER_ADDRESS,
mainProps: { blank: false, blankColor: "#777", width: 80, height: 80 },
mainProps1: { blank: false, blankColor: "#777", width: 30, height: 30 },
editUser: null,
image: null,
editModal: false,
createModal: false,
viewModal: false,
pagination: {},
loading: false,
visible: false,
user: {
first_name: null,
last_name: null,
email: null,
mobile: null,
nationality: null,
image: null,
job_title: null,
isUploaded: false,
status: "active",
},
data: {
about_client: {
content_ar: null,
content_en: null,
title_ar: null,
title_en: null,
images: [],
},
about_mission: {
content_ar: null,
content_en: null,
title_ar: null,
title_en: null,
images: [],
},
about_profile: {
content_ar: null,
content_en: null,
title_ar: null,
title_en: null,
images: [],
},
about_vision: {
content_ar: null,
content_en: null,
title_ar: null,
title_en: null,
images: [],
},
},
columns: [
{
title: "ID",
dataIndex: "key",
sorter: (a, b) => a.key - b.key,
sortDirections: ["descend", "ascend"],
},
{
title: "Name",
dataIndex: "name",
sorter: (a, b) => a.name.length - b.name.length,
sortDirections: ["descend", "ascend"],
},
{
title: "Email",
dataIndex: "email",
sorter: (a, b) => a.email.length - b.email.length,
sortDirections: ["descend", "ascend"],
},
{
title: "Message",
dataIndex: "message",
sorter: (a, b) => a.message.length - b.message.length,
sortDirections: ["descend", "ascend"],
},
{
title: "Created At",
dataIndex: "created_at",
sorter: (a, b) => a.created_at.length - b.created_at.length,
sortDirections: ["descend", "ascend"],
},
{
title: "Actions",
scopedSlots: { customRender: "actions" },
},
],
};
},
created() {
this.currentUserRole=sessionStorage.getItem("currentUserRole")

console.log(this.currentUserRole);
this.getAboutData();
},
methods: {
getAboutData() {

axios
.get(this.APIServer + "admin/getAbout", {
headers: { Authorization: this.$store.state.token },
})

.then((response) => {
console.log('dsds',response)
console.log(response.data);
// this.data.about_client = response.data.data[3];
// this.data.about_client.images =[];
// this.data.about_mission = response.data.data[1];
// this.data.about_mission.images = [];
// this.data.about_profile = response.data.data[0];
// this.data.about_profile.images = [];
// this.data.about_vision = response.data.data[2];
// this.data.about_vision.images = [];
});
},
saveAboutData() {

console.log("savimg about data");
console.log(this.aboutinfo);
  if(this.checkAlready == false){
    console.log("lll");
let newAbout = new FormData();
newAbout.append("companyHeadingEnglish", this.aboutinfo.companyHeadingEnglish);
newAbout.append("companyHeadingArabic", this.aboutinfo.companyHeadingArabic);
newAbout.append("companyContentEnglish", this.aboutinfo.companyContentEnglish);
newAbout.append("companyContentArabic", this.aboutinfo.companyContentArabic);
newAbout.append("missionHeadingEnglish", this.aboutinfo.missionHeadingEnglish);
newAbout.append("missionContentEnglish", this.aboutinfo.missionContentEnglish);
newAbout.append("missionHeadingArabic", this.aboutinfo.missionHeadingArabic);
newAbout.append("missionContentArabic", this.aboutinfo.missionContentArabic);
newAbout.append("visionHeadingEnglish", this.aboutinfo.visionHeadingEnglish);
newAbout.append("visionContentEnglish", this.aboutinfo.visionContentEnglish);
newAbout.append("visionHeadingArabic", this.aboutinfo.visionHeadingArabic);
newAbout.append("visionContentArabic", this.aboutinfo.visionContentArabic);
newAbout.append("clientHeadingEnglish", this.aboutinfo.clientHeadingEnglish);
newAbout.append("clientContentEnglish", this.aboutinfo.clientContentEnglish);
newAbout.append("clientContentArabic", this.aboutinfo.clientContentArabic);
newAbout.append("clientHeadingArabic", this.aboutinfo.clientHeadingArabic);
newAbout.append("missionImages", this.aboutinfo.missionImages);
newAbout.append("visionImages", this.aboutinfo.visionImages);
newAbout.append("clientImages", this.aboutinfo.clientImages);
newAbout.append("companyImages", this.aboutinfo.companyImages);
console.log(newAbout);
console.log("lldd");
axios
.post(this.APIServer + "admin/createAbout", newAbout,{
headers: { Authorization: this.$store.state.token },
})

.then((response) => {
if(response.data.status == true)
console.log(response.data);
this.openNotificationWithIcon(
"success",
response.data.data,
"bottomRight"
);
this.getAboutData();
})
.catch((e) => {
this.openNotificationWithIcon(
"error",
"Internal server error",
"bottomRight"
);
});
  }
  else {
    let newAbout = new FormData();
newAbout.append("companyHeadingEnglish", this.aboutinfo.companyHeadingEnglish);
newAbout.append("companyHeadingArabic", this.aboutinfo.companyHeadingArabic);
newAbout.append("companyContentEnglish", this.aboutinfo.companyContentEnglish);
newAbout.append("companyContentArabic", this.aboutinfo.companyContentArabic);
newAbout.append("missionHeadingEnglish", this.aboutinfo.missionHeadingEnglish);
newAbout.append("missionContentEnglish", this.aboutinfo.missionContentEnglish);
newAbout.append("missionHeadingArabic", this.aboutinfo.missionHeadingArabic);
newAbout.append("missionContentArabic", this.aboutinfo.missionContentArabic);
newAbout.append("visionHeadingEnglish", this.aboutinfo.visionHeadingEnglish);
newAbout.append("visionContentEnglish", this.aboutinfo.visionContentEnglish);
newAbout.append("visionHeadingArabic", this.aboutinfo.visionHeadingArabic);
newAbout.append("visionContentArabic", this.aboutinfo.visionContentArabic);
newAbout.append("clientHeadingEnglish", this.aboutinfo.clientHeadingEnglish);
newAbout.append("clientContentArabic", this.aboutinfo.clientContentArabic);
newAbout.append("clientContentEnglish", this.aboutinfo.clientContentEnglish);
newAbout.append("clientHeadingArabic", this.aboutinfo.clientHeadingArabic);
newAbout.append("missionImages", this.aboutinfo.missionImages);
newAbout.append("visionImages", this.aboutinfo.visionImages);
newAbout.append("clientImages", this.aboutinfo.clientImages);
newAbout.append("companyImages", this.aboutinfo.companyImages);
newAbout.append("aboutId", this.aboutinfo._id);
axios
.patch(this.APIServer + "admin/updateAbout", newAbout,{
headers: { Authorization: this.$store.state.token },
})

.then((response) => {
if(response.data.status == true)
console.log(response.data);
this.openNotificationWithIcon(
"success",
response.data.data,
"bottomRight"
);
this.getAboutData();
})
.catch((e) => {
this.openNotificationWithIcon(
"error",
"Internal server error",
"bottomRight"
);
});
  }

},
uploadImage(event, type) {
this.isUploaded = false;
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
if (type == "profile")
this.data.about_profile.images.push(response.data.secure_url);
else if (type == "mission")
this.data.about_mission.images.push(response.data.secure_url);
else if (type == "vision")
this.data.about_vision.images.push(response.data.secure_url);
else if (type == "client")
this.data.about_client.images.push(response.data.secure_url);
console.log("type : " + type);
this.isUploaded = true;
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
move(to) {
this.$router.push({ path: to });
},
openNotificationWithIcon(type, message, place) {
this.$notification[type]({
message: "Response",
description: message,
place,
});
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
createUser() {
let last = this.data[this.data.length - 1];
this.user.key = last.key + 1;
this.data.push(this.user);
this.viewModal = false;
},
edit(record) {
this.editUser = record;
this.editModal = true;
},
update() {
this.editModal = false;
},
// view(record) {

// },
deleteItem(record) {
let index = this.data.indexOf(record);
if (index !== -1) {
this.data.splice(index, 1);
}
},
onChangeStatus(record) {
let index = this.data.indexOf(record);
if (index !== -1) {
let status = this.data[index].status;
if (status == "active") {
this.data[index].status = "inactive";
} else {
this.data[index].status = "active";
}
}
},
},
};
</script>

<style scoped>
.content-area {
border: 1px solid #eee;
border-radius: 5px;
padding: 20px 30px;
}
</style>