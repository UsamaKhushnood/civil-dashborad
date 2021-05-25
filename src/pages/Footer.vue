<template>
  <div class="contact">
    <div class="row">
      <div class="col-12">
       
        <div class="card">
          <div class="card-body">
            <form @submit.prevent>
              <div class="row">
                <div class="col-12">
                  <h5><strong>Footer Details</strong></h5>
                  <hr />
                </div>
                <div class="col-12">
                  <h5><strong>About Civil Section</strong></h5>
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
                        class="form-control"
                        v-model="items.headingEnglish"
                        placeholder="Enter English Heading"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="title"
                        ><strong>English Content*</strong></label
                      >
                      <vue-editor v-model="items.contentEnglish"></vue-editor>
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
                        v-model="items.headingArabic"
                        placeholder="Enter Arabic Heading"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="title"
                        ><strong>Arabic Content*</strong></label
                      >
                      <vue-editor v-model="items.contentArabic"></vue-editor>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>Facebook URL*</strong></label>
                    <input
                      type="url"
                      v-model="items.facebookUrl"
                      placeholder="Enter Facebook URL"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>Twitter URL*</strong></label>
                    <input
                      type="url"
                      v-model="items.twitterUrl"
                      placeholder="Enter Twitter URL"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>LinkedIn URL*</strong></label>
                    <input
                      type="url"
                      v-model="items.linkedinUrl"
                      placeholder="Enter LinkedIn URL"
                      class="form-control"
                      required
                    />
                  </div>
                </div>

                <div class="col-12 text-right mt-3">
                  <button class="btn btn-primary" @click="saveInformation()">
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
import axios from "axios";
import { VueEditor } from "vue2-editor";
export default {
  name: "users",
  components: {
    VueEditor,
  },
  created() {
    this.getFooter();
    // this.saveInformation();
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  data() {
    return {
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
      titleEn: null,
      titleAr: null,
      contentEn: null,
      contentAr: null,
      facebook: null,
      twitter: null,
      linkedin: null,
      items: [],
      checkAlready:false,

      contentArabic:null,
      contentEnglish:null,
      facebookUrl:null,
      headingArabic:null,
      headingEnglish:null,
      linkedinUrl:null,
      twitterUrl:null,

      user: {
        first_name: null,
        last_name: null,
        email: null,
        mobile: null,
        nationality: null,
        image: null,
        job_title: null,
        status: "active",
      },
      data: [],
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

  methods: {
    saveInformation() {
      console.log('createcc')
      console.log(this.items);
      
          if(this.checkAlready == false){
            console.log("epmty");
       let fotter = new FormData();
      fotter.append("headingEnglish", this.items.headingEnglish);
      fotter.append("contentEnglish", this.items.contentEnglish);
      fotter.append("headingArabic", this.items.headingArabic);
      fotter.append("contentArabic", this.items.contentArabic);
      fotter.append("facebookUrl", this.items.facebookUrl);
      fotter.append("twitterUrl", this.items.twitterUrl);
      fotter.append("linkedinUrl", this.items.linkedinUrl);
     
      console.log(fotter);
    
      
      axios
        .post(
          this.APIServer + "admin/createFooter",fotter,
          {
            headers: { Authorization: this.$store.state.token },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data != null) {
            this.openNotificationWithIcon(
              "success",
              response.data.data,
              "bottomRight"
            );
            this.getFooter();
          } else {
            this.openNotificationWithIcon(
              "warning",
              response.data.data,
              "bottomRight"
            );
          }
        })
        .catch((e) => {
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    }else {
     
      console.log(this.items._id)
                  console.log("not empo");
      
       let fotter = new FormData();
        fotter.append("headingEnglish", this.items.headingEnglish);
      fotter.append("contentEnglish", this.items.contentEnglish);
      fotter.append("headingArabic", this.items.headingArabic);
      fotter.append("contentArabic", this.items.contentArabic);
      fotter.append("facebookUrl", this.items.facebookUrl);
      fotter.append("twitterUrl", this.items.twitterUrl);
      fotter.append("linkedinUrl", this.items.linkedinUrl);
       fotter.append("footerId", this.items._id);
       
     
        axios
        .patch(
          this.APIServer + "admin/updateFooter",fotter,
          {
            headers: { Authorization: this.$store.state.token },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.status == true) {
            this.openNotificationWithIcon(
              "success",
              response.data.data,
              "bottomRight"
            );
            this.getFooter();
          } else {
            this.openNotificationWithIcon(
              "warning",
              response.data.data,
              "bottomRight"
            );
          }
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
    getFooter(){
      //console.log('get')
      
      this.loading = true;
      axios
        .get(this.APIServer + "admin/getFooter", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log(response)
          if(response.data != ""){
            this.checkAlready = true;
            console.log('dsdsdsdsd',response.data)

            // this.items.response.data
            //console.log(this.items)
            this.items = response.data;
            this._id = response.data._id

            // this.titleEn = response.data.data.title_en;
            // this.titleAr = response.data.data.title_ar;
            // this.contentEn = response.data.data.content_en;
            // this.contentAr = response.data.data.content_ar;
            // this.facebook = response.data.data.footer_facebook.value;
            // this.twitter = response.data.data.footer_twitter.value;
            // this.linkedin = response.data.data.footer_linkedin.value;
            // this.userList = response.data.data;
          }
          this.loading = false;
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.loading = false;
          this.openNotificationWithIcon("error", "Internal server error");
        });
    },
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