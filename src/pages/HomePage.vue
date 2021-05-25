<template>
    <div class="home-page">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                                <h5><strong>Home Page</strong></h5>
                            </div>
                            <div class="col-12 mt-3">
                                <h6><strong>Slider Section</strong></h6>
                            </div>
                            <div class="col-12 mt-3">
                            <label for=""><strong>Upload Slider Images</strong></label> <br>
                                <input type="file" class="btn btn-primary btn-sm" 
                                @change="uploadImage($event,'home',null)" multiple>
                            </div>
                            <div class="col-12 col-md-6 mt-3 ">
                                <div class="content-area">
                                    <h6 class="text-center"><strong>English</strong></h6>
                                    <div class="form-group">
                                        <label for="title"><strong>Slider Text*</strong></label>
                                        <vue-editor v-model="data.sliderTextEnglish"></vue-editor>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 mt-3 ">
                                <div class="content-area">
                                    <h6 class="text-center"><strong>Arabic</strong></h6>
                                    <div class="form-group">
                                        <label for="title"><strong>Slider Text*</strong></label>
                                        <vue-editor v-model="data.sliderTextArabic"></vue-editor>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 mt-5">
                                <h6><strong>Well come to civil group &amp; institutes section</strong></h6>
                            </div>
                            <div class="col-12 col-md-6 mt-3 ">
                                <div class="content-area">
                                    <h6 class="text-center"><strong>English</strong></h6>
                                    <div class="form-group">
                                        <label for="title"><strong>Enter Title*</strong></label>
                                        <input type="text"  v-model="data.titleEnglish" class="form-control mb-3" placeholder="Enter Title">
                                    </div>
                                    <div class="form-group">
                                        <label for="title"><strong>Tagline*</strong></label>
                                        <input type="text"  v-model="data.taglineEnglish" class="form-control mb-3" placeholder="Tagline">
                                    </div>
                                    <div class="form-group">
                                        <label for="title"><strong>Description*</strong></label>
                                        <vue-editor  v-model="data.descriptionEnglish"></vue-editor>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 mt-3 ">
                                <div class="content-area">
                                    <h6 class="text-center"><strong>Arabic</strong></h6>
                                    <div class="form-group">
                                        <label for="title"><strong>Enter Title*</strong></label>
                                        <input type="text" v-model="data.titleArabic"  class="form-control mb-3" placeholder="Enter Title">
                                    </div>
                                    <div class="form-group">
                                        <label for="title"><strong>Tagline*</strong></label>
                                        <input type="text"  v-model="data.taglineArabic" class="form-control mb-3" placeholder="Tagline">
                                    </div>
                                    <div class="form-group">
                                        <label for="title"><strong>Description*</strong></label>
                                        <vue-editor v-model="data.descriptionArabic"></vue-editor>
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="col-12 mt-5">
                                <h6><strong>Our Features Section</strong></h6>
                            </div> -->
                           
                            <!-- <div class="col-12 mt-3" v-for="(item, i) in features" :key="i">
                                <div class="row">
                                    <div class="col-6 pb-3">
                                        <label for=""><strong>Pick Icon</strong></label> <br>
                                        <input type="file"  @change="uploadImage($event,'feature',i)"  class="btn btn-primary btn-sm">
                                    </div>
                                    <div class="col-6 text-right pb-3">
                                        <button v-if="i>0" class="btn btn-danger btn-sm" @click="deleteFeature(item, i)"><i class="fa fa-trash"></i> Delete Feature</button>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <div class="content-area">
                                            <h6 class="text-center"><strong>English</strong></h6>
                                            <div class="form-group">
                                                <label for=""><strong>Enter Title</strong></label>
                                                <input type="text" class="form-control" placeholder="Enter Title" v-model="item.english.title">
                                            </div>
                                            <div class="form-group">
                                                <label for=""><strong>Enter Tagline</strong></label>
                                                <input type="text" class="form-control" placeholder="Enter Tagline" v-model="item.english.tagline">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <div class="content-area">
                                            <h6 class="text-center"><strong>Arabic</strong></h6>
                                            <div class="form-group">
                                                <label for=""><strong>Enter Title</strong></label>
                                                <input type="text" class="form-control" placeholder="Enter Title" v-model="item.arabic.title">
                                            </div>
                                            <div class="form-group">
                                                <label for=""><strong>Enter Tagline</strong></label>
                                                <input type="text" class="form-control" placeholder="Enter Tagline" v-model="item.arabic.tagline">
                                            </div>
                                            </div>
                                        </div>
                                         <div class="col-12 mt-3">
                                            <button v-if="i==0" class="btn btn-primary" @click="addFeature">Add Feature</button>
                                        </div>
                                    </div>
                                </div> -->
<!--
                                <div class="col-12 mt-5">
                                    <h6><strong>Course Category Section</strong></h6>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="content-area">
                                        <h6 class="text-center"><strong>English</strong></h6>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Title</strong></label>
                                            <input type="text" class="form-control" placeholder="Enter Title">
                                        </div>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Tagline</strong></label>
                                            <input type="text" placeholder="Enter Tagline" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="content-area">
                                        <h6 class="text-center"><strong>Arabic</strong></h6>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Title</strong></label>
                                            <input type="text" class="form-control" placeholder="Enter Title">
                                        </div>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Tagline</strong></label>
                                            <input type="text" placeholder="Enter Tagline" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mt-3">
                                    <button class="btn btn-primary" @click="addCourseCategory">Add Course Category</button>
                                </div>
                                <div class="col-12 mt-3" v-for="(item, i) in courseCategories" :key="i">
                                    <div class="row">
                                        <div class="col-6 pb-3">
                                            <label for=""><strong>Pick Icon</strong></label> <br>
                                            <input type="file" :value="item.icon" class="btn btn-primary btn-sm">
                                        </div>
                                        <div class="col-6 text-right pb-3">
                                            <button class="btn btn-danger btn-sm" @click="deleteCourseCategory(item, i)"><i class="fa fa-trash"></i> Delete Course Category</button>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="content-area">
                                                <h6 class="text-center"><strong>English</strong></h6>
                                                <div class="form-group">
                                                    <label for=""><strong>Enter Title</strong></label>
                                                    <input type="text" class="form-control" placeholder="Enter Title" v-model="item.english.title">
                                                </div>
                                                <div class="form-group">
                                                    <label for=""><strong>Enter Tagline</strong></label>
                                                    <input type="text" class="form-control" placeholder="Enter Tagline" v-model="item.english.tagline">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="content-area">
                                                <h6 class="text-center"><strong>Arabic</strong></h6>
                                                <div class="form-group">
                                                    <label for=""><strong>Enter Title</strong></label>
                                                    <input type="text" class="form-control" placeholder="Enter Title" v-model="item.arabic.title">
                                                </div>
                                                <div class="form-group">
                                                    <label for=""><strong>Enter Tagline</strong></label>
                                                    <input type="text" class="form-control" placeholder="Enter Tagline" v-model="item.arabic.tagline">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mt-5">
                                    <h6><strong>Golden Gallery Section</strong></h6>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="content-area">
                                        <h6 class="text-center"><strong>English</strong></h6>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Title</strong></label>
                                            <input type="text" class="form-control" placeholder="Enter Title">
                                        </div>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Tagline</strong></label>
                                            <input type="text" placeholder="Enter Tagline" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="content-area">
                                        <h6 class="text-center"><strong>Arabic</strong></h6>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Title</strong></label>
                                            <input type="text" class="form-control" placeholder="Enter Title">
                                        </div>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Tagline</strong></label>
                                            <input type="text" placeholder="Enter Tagline" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mt-3">
                                    <button class="btn btn-primary" @click="addGoldenGallery">Add Gallery Item</button>
                                </div>
                                <div class="col-12 mt-3" v-for="(item, i) in goldenGallery" :key="i">
                                    <div class="row">
                                        <div class="col-6 pb-3">
                                            <label for=""><strong>Pick Image</strong></label> <br>
                                            <input type="file" :value="item.image" class="btn btn-primary btn-sm">
                                        </div>
                                        <div class="col-6 text-right pb-3">
                                            <button class="btn btn-danger btn-sm" @click="deleteGoldenGallery(item, i)"><i class="fa fa-trash"></i> Delete Gallery Item</button>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="content-area">
                                                <h6 class="text-center"><strong>English</strong></h6>
                                                <div class="form-group">
                                                    <label for=""><strong>Enter Category Name</strong></label>
                                                    <input type="text" class="form-control" placeholder="Enter Title" v-model="item.english.category">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="content-area">
                                                <h6 class="text-center"><strong>Arabic</strong></h6>
                                                <div class="form-group">
                                                    <label for=""><strong>Enter Category Name</strong></label>
                                                    <input type="text" class="form-control" placeholder="Enter Title" v-model="item.english.category">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mt-5">
                                    <h6><strong>Golden Gallery Slider</strong></h6>
                                    <div class="form-group">
                                        <label for=""><strong>Pick Images</strong></label> <br>
                                        <input type="file" class="btn btn-primary btn-sm" multiple>
                                    </div>
                                </div>
                                <div class="col-12 mt-5">
                                    <h6><strong>Course Instructors</strong></h6>
                                    <div class="form-group">
                                        <label for=""><strong>Pick Images</strong></label> <br>
                                        <input type="file" class="btn btn-primary btn-sm" multiple>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="content-area">
                                        <h6 class="text-center"><strong>English</strong></h6>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Title</strong></label>
                                            <input type="text" class="form-control" placeholder="Enter Title">
                                        </div>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Tagline</strong></label>
                                            <input type="text" placeholder="Enter Tagline" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Description</strong></label>
                                            <vue-editor></vue-editor>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="content-area">
                                        <h6 class="text-center"><strong>Arabic</strong></h6>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Title</strong></label>
                                            <input type="text" class="form-control" placeholder="Enter Title">
                                        </div>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Tagline</strong></label>
                                            <input type="text" placeholder="Enter Tagline" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Description</strong></label>
                                            <vue-editor></vue-editor>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-12 mt-5">
                                    <h6><strong>Pricing Section</strong></h6>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="content-area">
                                        <h6 class="text-center"><strong>English</strong></h6>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Title</strong></label>
                                            <input type="text" class="form-control" placeholder="Enter Title">
                                        </div>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Tagline</strong></label>
                                            <input type="text" placeholder="Enter Tagline" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="content-area">
                                        <h6 class="text-center"><strong>Arabic</strong></h6>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Title</strong></label>
                                            <input type="text" class="form-control" placeholder="Enter Title">
                                        </div>
                                        <div class="form-group">
                                            <label for=""><strong>Enter Tagline</strong></label>
                                            <input type="text" placeholder="Enter Tagline" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mt-3">
                                    <button class="btn btn-primary" @click="addPackage">Add Package</button>
                                </div>
                                <div class="col-12 mt-3" v-for="(item, i) in packages" :key="i">
                                    <div class="row">
                                        <div class="col-12 text-right pb-3">
                                            <button class="btn btn-danger btn-sm" @click="deletePackage(item, i)"><i class="fa fa-trash"></i> Delete Package</button>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label for=""><strong>Title*</strong></label>
                                                <input type="text" placeholder="Enter Title" class="form-control" v-model="item.title">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label for=""><strong>Price*</strong></label>
                                                <input type="number" min="0" placeholder="Enter Price" class="form-control" v-model="item.price">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label for=""><strong>Classes*</strong></label>
                                                <input type="number" min="0" placeholder="Enter Classes" class="form-control" v-model="item.classes">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label for=""><strong>Urgent Tests*</strong></label>
                                                <input type="number" min="0" placeholder="Enter Urgent Tests" class="form-control" v-model="item.urgent_tests">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label for=""><strong>Normal Tests*</strong></label>
                                                <input type="number" min="0" placeholder="Enter Normal Tests" class="form-control" v-model="item.normal_tests">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label for=""><strong>Theory Classes*</strong></label>
                                                <input type="number" min="0" placeholder="Enter Theory Classes" class="form-control" v-model="item.theory_classes">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label for=""><strong>Driving License*</strong></label> <br>
                                                <a-switch v-model="item.driving_license" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 text-right">
                                            <button class="btn btn-primary">Save Information</button>
                                        </div>
                                    </div>
                                </div>-->
                                <div class="col-12 text-right mt-3">
                                <button @click="saveHomeDetails()" class="btn btn-primary">Save Information</button>
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
export default {
    name: "HomePage",
    components: {
        VueEditor
    },
    created() {
        this.getHomePageData();
    },
    data() {
        return {
            isFileUploaded:false,
            APIServer: process.env.VUE_APP_SERVER_ADDRESS,
            features: [],
            courseCategories: [],
            goldenGallery: [],
            packages: [],
            data : {
                sliderTextEnglish:'',
                sliderTextArabic:'',
                sliderImages:[],
                titleEnglish:'',
                titleArabic:'',
                taglineEnglish:'',
                taglineArabic:'',
                descriptionArabic:'',
                descriptionEnglish:'',
               
            }
        }
    },
    methods: {
        saveHomeDetails(){
            // this.data.feature_image=[];
            // this.features.forEach((item) => {
            //     this.data.feature_image.push(item.image);
            //     this.data.feature_title_en.push(item.english.title);
            //     this.data.feature_title_ar.push(item.arabic.title);
            //     this.data.feature_tagline_ar.push(item.arabic.tagline);
            //     this.data.feature_tagline_en.push(item.english.tagline);
            // });
            // console.log(this.data,this.features)
            console.log('saving')
            axios
            .post(this.APIServer + "admin/createHome", 
            this.data, {
             headers: { Authorization: this.$store.state.token },
              })
            .then((response) => {
                if (response.data.status == true) {
                this.openNotificationWithIcon(
                    "success",
                    "Header updated successfully",
                    "bottomRight"
                );
                } else {
                console.log(response.data);
                this.openNotificationWithIcon(
                    "warning",
                    "Error",
                    "bottomRight"
                );
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
        getHomePageData(){
             axios
                .get(this.APIServer + "front/home-slider/get", {
                headers: { Authorization: this.$store.state.token },
                })
                .then((response) => {
                    this.data = {
                        home_content_en:response.data.data.home_slider_content.content_en,
                        home_content_ar:response.data.data.home_slider_content.content_ar,
                        home_image:[],
                        insti_title_en:response.data.data.home_institutes.title_en,
                        insti_title_ar:response.data.data.home_institutes.title_ar,
                        insti_content_en:response.data.data.home_institutes.content_en,
                        insti_content_ar:response.data.data.home_institutes.content_ar,
                        insti_tagline_en:response.data.data.home_institutes.tagline_en,
                        insti_tagline_ar:response.data.data.home_institutes.tagline_ar,
                        feature_image : [],
                        feature_title_en:[],
                        feature_title_ar :[],
                        feature_tagline_ar:[],
                        feature_tagline_en:[]
                    }
                    this.features = [];
                    response.data.data.feature.forEach(data=>{
                        const feature = {
                                            english: {
                                                title: data.title_en,
                                                tagline: data.tagline_en,
                                            },
                                            arabic: {
                                                title: data.title_ar,
                                                tagline: data.tagline_ar,
                                            }
                                        }

                    this.features = [...this.features,feature];
                    console.log(feature)
                    })
                });
                if(this.features.length===0){
                    this.addFeature();
                }
        },
        openNotificationWithIcon(type, message, placement) {
        this.$notification[type]({
            message: "Response",
            description: message,
            placement,
        });
        },
         uploadImage(event, image_type,index) {
            this.isFileUploaded = false;

            let file = event.target.files[0];
            if (file) {
                const url = "https://api.cloudinary.com/v1_1/dz5fltj9r/image/upload";
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "hammad");
                axios
                .post(url, data)
                .then((response) => {
                    // this.newCategory.image = response.data.secure_url;
                    // console.log(response.data);
                    switch (image_type) {
                    case 'home': 
                        this.data.home_image.push(response.data.secure_url);
                        break;
                    case 'feature':
                        this.features[index].image = response.data.secure_url;
                        break;
                    }
                    this.isFileUploaded = true;
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
        addPackage() {
            const pricing = {
                title: null,
                price: null,
                classes: null,
                urgent_tests: null,
                normal_tests: null,
                theory_classes: null,
                driving_license: false
            }

            this.packages.push(pricing)
        },
        deletePackage(index) {
            this.packages.splice(index, 1)
        },
        addFeature() {
            const feature = {
                english: {
                    title: null,
                    tagline: null,
                },
                arabic: {
                    title: null,
                    tagline: null,
                },
                image:null
            }

            this.features.push(feature)
        },
        deleteFeature(index) {
            this.features.splice(index, 1)
        },
        addCourseCategory() {
            const feature = {
                english: {
                    title: null,
                    tagline: null,
                },
                arabic: {
                    title: null,
                    tagline: null,
                },
                icon: null
            }

            this.courseCategories.push(feature)
        },
        deleteCourseCategory(index) {
            this.courseCategories.splice(index, 1)
        },
        addGoldenGallery() {
            const feature = {
                english: {
                    category: null,
                },
                arabic: {
                    category: null,
                },
                image: null
            }

            this.goldenGallery.push(feature)
        },
        deleteGoldenGallery(index) {
            this.goldenGallery.splice(index, 1)
        }
    }

}
</script>

<style scoped>
.content-area {
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 20px 30px;
}
</style>