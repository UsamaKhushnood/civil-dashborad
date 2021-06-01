<template>
  <div class="contact">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent>
              <div class="row">
                <div class="col-12">
                  <h5><strong>Header Details</strong></h5>
                  <hr />
                </div>
                <div class="col-12 col-md-4">
                  <div class="form-group mt-4">
                    <label><strong>Upload Logo</strong></label> <br />
                    <input
                      type="file"
                      class="btn btn-primary btn-block btn-sm"
                      @change="uploadImage($event, 'logo')"
                    />
                  </div>
                </div>
                <div class="col-12 col-md-4">
                  <div class="form-group mt-4">
                    <label><strong>Upload Favicon</strong></label> <br />
                    <input
                      type="file"
                      class="btn btn-primary btn-block btn-sm"
                      @change="uploadImage($event, 'favicon')"
                    />
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
                        class="form-control"
                        placeholder="Enter English Heading"
                        v-model="newHeader.title_en"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="title"
                        ><strong>English Content*</strong></label
                      >
                      <vue-editor v-model="newHeader.content_en"></vue-editor>
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
                        placeholder="Enter Arabic Heading"
                        v-model="newHeader.title_ar"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="title"
                        ><strong>Arabic Content*</strong></label
                      >
                      <vue-editor v-model="newHeader.content_ar"></vue-editor>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>Email*</strong></label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      class="form-control"
                      v-model="newHeader.email"
                      required
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>Mobile Number*</strong></label>
                    <input
                      type="tel"
                      placeholder="Enter Mobile Number"
                      class="form-control"
                      v-model="newHeader.mobile"
                      required
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>Twitter URL*</strong></label>
                    <input
                      type="url"
                      placeholder="Enter Twitter URL"
                      class="form-control"
                      v-model="newHeader.twitter_url"
                      required
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>Telephone Number*</strong></label>
                    <input
                      type="tel"
                      placeholder="Enter Telephone Number"
                      class="form-control"
                      v-model="newHeader.telephone"
                      required
                    />
                  </div>
                </div>

                <div class="col-12 text-right mt-3">
                  <button @click="saveHeaderDetails()" class="btn btn-primary">
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
import mixin from "../containers/mixin";

import { VueEditor } from "vue2-editor";
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
      checkAlready: false,
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
      faviconImage: null,
      logoImage: null,
      newHeader: {
        image: [],
        logo: null,
        favicon: null,
        title_en: null,
        title_ar: null,
        content_en: null,
        content_ar: null,
        mobile: null,
        twitter_url: null,
        telephone: null,
        email: null,
        _id: null,
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
  created() {
    this.getHeaderData();
  },
  methods: {
    getHeaderData() {
      axios
        .get(this.APIServer + "admin/getHeader", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log("response");
          console.log(response.data.contentArabic);
          if (response.data != "") {
            this.checkAlready = true;
            (this.newHeader = {
              image: [],
              logo: response.data.logoFilePath,
              favicon: response.data.favIconFilePath,
              title_en: response.data.nameEnglish,
              title_ar: response.data.nameArabic,
              content_en: response.data.contentEnglish,
              content_ar: response.data.contentArabic,
              mobile: response.data.mobileNo ? response.data.mobileNo : null,
              twitter_url: response.data.twitterUrl
                ? response.data.twitterUrl
                : null,
              telephone: response.data.telephoneNo
                ? response.data.telephoneNo
                : null,
              email: response.data.email ? response.data.email : null,
              _id: response.data._id,
            }),
              console.log("llflf");
            console.log(response.data);
          }
        });
    },
    openNotificationWithIcon(type, message, placement) {
      this.$notification[type]({
        message: "Response",
        description: message,
        placement,
      });
    },
    uploadImage(event, image_type) {
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
              case "images":
                this.newHeader.image.push(response.data.secure_url);
                break;
              case "logo":
                this.newHeader.logo = response.data.secure_url;
                this.logoImage = event.target.files[0];

                break;
              case "favicon":
                this.newHeader.favicon = response.data.secure_url;
                this.faviconImage = event.target.files[0];
                console.log(this.newHeader.favicon);
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
    saveHeaderDetails() {
      console.log(this.checkAlready);
      console.log(this.newHeader);
      if (this.checkAlready == false) {
        console.log("saving header");
        let newHeader = new FormData();
        newHeader.append("logoImage", this.logoImage);
        newHeader.append("favIcon", this.faviconImage);
        newHeader.append("email", this.newHeader.email);
        newHeader.append("nameEnglish", this.newHeader.title_en);
        newHeader.append("nameArabic", this.newHeader.title_ar);
        newHeader.append("contentEnglish", this.newHeader.content_en);
        newHeader.append("contentArabic", this.newHeader.content_ar);
        newHeader.append("mobileNo", this.newHeader.mobile);
        newHeader.append("twitterUrl", this.newHeader.twitter_url);
        newHeader.append("telephoneNo", this.newHeader.telephone);

        axios
          .patch(this.APIServer + "admin/updateHeader",
          {
            nameEnglish: this.newHeader.title_en,
            nameArabic: this.newHeader.title_ar,
            contentEnglish: this.newHeader.content_en,
            contentArabic: this.newHeader.content_ar,
            email: this.newHeader.email,
            twitterUrl: this.newHeader.twitter_url,
            telephoneNo: this.newHeader.telephone,
            mobileNo: this.newHeader.mobile,
            logoImage: this.newHeader.logo,
            favIcon: this.newHeader.favicon,
            headerId: this.newHeader._id

          }, {
            headers: { Authorization: this.$store.state.token },
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.status == true) {
              this.openNotificationWithIcon(
                "success",
                "Header updated successfully",
                "bottomRight"
              );
            } else {
              this.openNotificationWithIcon(
                "warning",
                response.data.message,
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
      } else {
        console.log("saving header");
        let newHeader = new FormData();
        newHeader.append("logoImage", this.logoImage);
        newHeader.append("favIcon", this.faviconImage);
        newHeader.append("email", this.newHeader.email);
        newHeader.append("nameEnglish", this.newHeader.title_en);
        newHeader.append("nameArabic", this.newHeader.title_ar);
        newHeader.append("contentEnglish", this.newHeader.content_en);
        newHeader.append("contentArabic", this.newHeader.content_ar);
        newHeader.append("mobileNo", this.newHeader.mobile);
        newHeader.append("twitterUrl", this.newHeader.twitter_url);
        newHeader.append("telephoneNo", this.newHeader.telephone);
        newHeader.append("headerId", this.newHeader._id);

        axios
          .patch(this.APIServer + "admin/updateHeader", newHeader, {
            headers: { Authorization: this.$store.state.token },
          })
          .then((response) => {
            console.log(response.data);
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
                response.data.message,
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
      }

      //   this.loading = true;
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
