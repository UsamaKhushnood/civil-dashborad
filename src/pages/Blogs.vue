<template>
  <div class="blogs">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Blog Posts</strong></h5>
              </div>
              <div
                class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6 text-right"
              >
                <b-dropdown
                  id="dropdown-left"
                  text="Download"
                  variant="primary"
                  class="m-2"
                >
                  <b-dropdown-item @click="csvExport()">CSV</b-dropdown-item>
                  <b-dropdown-item @click="exportPDF()">PDF</b-dropdown-item>
                </b-dropdown>
                <button
                  class="btn btn-primary"
                  @click="createModal = !createModal"
                >
                  <i class="fa fa-plus"></i> Create Post
                </button>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Title</strong></label>
                <input
                  type="text"
                  placeholder="Search By Title"
                  class="form-control"
                  @keyup = "filterBlogs()"
                  v-model = "filterObject.title"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <a-table
                  class="table"
                  :columns="columns"
                  :dataSource="data"
                  :scroll="{ x: 900 }"
                  :loading="loading"
                >
                  <span slot="image">
                    <b-img
                      v-bind="mainProps1"
                      src="https://ptetutorials.com/images/user-profile.png"
                    ></b-img>
                  </span>
                  <span slot="status" slot-scope="id, record">
                    <a-switch
                      :checked="record.status == 'active'"
                      @change="onChangeStatus(record)"
                    />
                  </span>
                  <span slot="actions" slot-scope="id, record">
                    <i class="fa fa-pencil" @click="editModalOpen(record)"></i>
                    <i class="fa fa-trash" @click="deleteModal=true;storeRecord=record;"></i>
                  </span>
                </a-table>
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
                <h5><strong>Copyright Section</strong></h5>
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="col-12 col-md-12 col-lg-12 col-xl-6">
                <div class="content-area">
                  <h5 class="text-center"><strong>English</strong></h5>
                  <div class="form-group">
                    <label for="title"><strong>English Heading*</strong></label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter English Heading"
                      required
                      v-model = "copyright.title_en"
                    />
                  </div>
                  <div class="form-group">
                    <label for="title"><strong>English Content*</strong></label>
                    <vue-editor  v-model = "copyright.content_en"></vue-editor>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-12 col-lg-12 col-xl-6">
                <div class="content-area">
                  <h5 class="text-center"><strong>Arabic</strong></h5>
                  <div class="form-group">
                    <label for="title"><strong>Arabic Heading*</strong></label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Arabic Heading"
                      required
                       v-model = "copyright.title_ar"
                    />
                  </div>
                  <div class="form-group">
                    <label for="title"><strong>Arabic Content*</strong></label>
                    <vue-editor v-model = "copyright.content_ar"></vue-editor>
                  </div>
                </div>
                <div class="col-12 text-right mt-3">
                  <button class="btn btn-primary" @click="saveCopyright()">
                    Save Information
                  </button>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12 my-3">
                <h5><strong>Instgram Gallery Section</strong></h5>
                <div class="form-group mt-4">
                  <label><strong>Upload Images</strong></label> <br />
                  <input
                  type="file"
                  class="btn btn-primary"
                  accept="image/*"
                  @change="uploadImageInsta"
                  ref="AvatarInput"
                />
                </div>
              </div>
              <div class="col-12 col-md-12 col-lg-12 col-xl-6">
                <div class="content-area">
                  <h5 class="text-center"><strong>English</strong></h5>
                  <div class="form-group">
                    <label for="title"><strong>English Heading*</strong></label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter English Heading"
                      required
                      v-model = "insta.title_en"
                    />
                  </div>
                  <div class="form-group">
                    <label for="title"><strong>English Content*</strong></label>
                    <vue-editor v-model = "insta.content_en"></vue-editor>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-12 col-lg-12 col-xl-6">
                <div class="content-area">
                  <h5 class="text-center"><strong>Arabic</strong></h5>
                  <div class="form-group">
                    <label for="title"><strong>Arabic Heading*</strong></label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Arabic Heading"
                      required
                      v-model = "insta.title_ar"
                    />
                  </div>
                  <div class="form-group">
                    <label for="title"><strong>Arabic Content*</strong></label>
                    <vue-editor v-model = "insta.content_ar"></vue-editor>
                  </div>
                </div>
                <div class="col-12 text-right mt-3">
                  <button class="btn btn-primary" @click="saveInstagram()">
                    Save Information
                  </button>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="editModal" hide-footer title="Update Post">
      <form @submit.prevent>
        <div class="row">
          <div class="col-12">
            <div class="form-group"><strong>Upload Post Image</strong></div>
            <input
              type="file"
              @change="uploadImage($event, 'edit')"
              class="btn btn-primary"
            />
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""><strong>Post Title</strong></label>
              <input
                type="text"
                v-model="editBlog.title"
                class="form-control"
                placeholder="Enter Post Title"
                required
              />
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""><strong>Post Content</strong></label>
              <vue-editor v-model="editBlog.content"></vue-editor>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary btn-block" @click="updateBlog()">
              Update Post
            </button>
          </div>
        </div>
      </form>
    </b-modal>
    <b-modal title="Delete Confirmation" modal-class="myclass" :hide-footer="true" v-model="deleteModal">
      <form @submit.prevent>
        <div class="row">
          <div class="col-12 mt-3">
            <div class="form-group">
              <h5 class="d-block text-center"><strong>Are you sure you want to delete it?</strong></h5> <br />
            </div>
          </div>
          <div class="col-12 mt-10"><span>
            <button class="btn btn-secondary mr-4" @click="deleteModal=false;">Cancel</button>
            <button class="btn btn-primary" @click="deleteItem(storeRecord);">Delete</button></span>
          </div>
        </div>
      </form>
    </b-modal>

    <b-modal v-model="createModal" hide-footer title="Create Post">
      <form @submit.prevent>
        <div class="row">
          <div class="col-12">
            <div class="form-group"><strong>Upload Post Image</strong></div>
            <input
              type="file"
              @change="uploadImage($event, 'new')"
              class="btn btn-primary"
            />
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""><strong>Post Title</strong></label>
              <input
                type="text"
                v-model="newBlog.title"
                class="form-control"
                placeholder="Enter Post Title"
                required
              />
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""><strong>Post Content</strong></label>
              <vue-editor v-model="newBlog.content"></vue-editor>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary btn-block" @click="saveNewBlog()">
              Create Post
            </button>
          </div>
        </div>
      </form>
    </b-modal>

    <b-modal v-model="viewModal" hide-footer title="Category Details">
      <div class="row">
        <!-- <div class="col-12 text-center mt-2 mb-3">
                    <b-img v-bind="mainProps" src="https://ptetutorials.com/images/user-profile.png"></b-img>
                </div> -->
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { VueEditor } from "vue2-editor";
export default {
  name: "blogs",
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
      insta: {
        title_en : null,
        title_ar : null,
        content_en: null,
        content_ar: null
      },
      copyright: {
        title_en : null,
        title_ar : null,
        content_en: null,
        content_ar: null
      },
      deleteModal:false,
      storeRecord:{
        id: null
      },
      filterObject : {
        title : ''
      },
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
      isFileUploaded: false,
      editBlog: {
        image: null,
        title: null,
        content: null,
        id: null,
      },
      newBlog: {
        image: null,
        title: null,
        content: null,
      },
      data: [],
      columns: [
        // {
        //     title: 'Image',
        //     scopedSlots: { customRender: 'image' },
        // },
        {
          title: "ID",
          dataIndex: "id",
          sorter: (a, b) => a.key - b.key,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Name",
          dataIndex: "title",
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Content",
          dataIndex: "content",
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
    this.getAllBlogsList();
    this.getCopyright();
    this.getInsta();
  },
  methods: {
    filterBlogs() {
      this.loading = true;
      let blog = new FormData();
      blog.append("title", this.filterObject.title);
      axios
        .post(this.APIServer + "front/blog/filter", blog, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.data = response.data.data;
            console.log(this.data);
          } else {
            this.openNotificationWithIcon(
              "warning",
              response.data.code,
              "bottomRight"
            );
          }
          this.loading = false;
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.loading = false;
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
    csvExport() {
      let arrData = [];
      arrData.push(...this.data);
      arrData.forEach((item) => {
        delete item.image;
      });
      let csvContent = "data:text/csv;charset=utf-8,";
      if(arrData.length > 0){
        csvContent += [
        Object.keys(arrData[0]).join(";"),
        ...arrData.map(item => Object.values(item).join(";"))
        ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      }
      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "Blogs.csv");
      link.click();
    },

    getCopyright(){
      axios
        .get(this.APIServer + "front/copyright/get", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
            this.copyright = response.data.data;
        })
        .catch((e) => {
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },

    saveCopyright(){
      axios
        .post(this.APIServer + "front/copyright/save", this.copyright, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.openNotificationWithIcon(
            "success",
            "Copyright section save Successfully",
            "bottomRight"
          );
        })
        .catch((e) => {
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },


    uploadImageInsta(event) {
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
            this.insta.image.push(response.data.secure_url);
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

    saveInstagram(){
      axios
        .post(this.APIServer + "front/insta-gallery/save", this.insta, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.openNotificationWithIcon(
            "success",
            "Instagram gallery section saved Successfully",
            "bottomRight"
          );
        })
        .catch((e) => {
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },

    getInsta(){
      axios
        .get(this.APIServer + "front/insta-gallery/get", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
            this.insta = response.data.data;
            this.insta.image = [];
        })
        .catch((e) => {
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },

    exportPDF() {
      var vm = this;
      let columns = [];
      columns.push(...this.columns);
      columns.forEach((item) => {
        item.dataKey = item.dataIndex;
      });
      columns.pop();
      var doc = new jsPDF('p', 'pt');
      doc.text('Blogs', 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: {cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: {cellPadding: 6 },
        body: vm.data,
        columns: columns,
      })
      doc.save('Blogs.pdf');
    },
    editModalOpen(record) {
      this.editBlog = record;
      this.editModal = true;
    },
    updateBlog() {
      // if (this.isFileUploaded == true) {
        axios
          .post(
            this.APIServer + "front/blog/update/" + this.editBlog.id,
            this.editBlog,
            {
              headers: { Authorization: this.$store.state.token },
            }
          )
          .then((response) => {
            console.log(response.data);
            this.editModal = false;
            this.openNotificationWithIcon(
              "success",
              "Blog updated successfully",
              "bottomRight"
            );
            this.getAllBlogsList();
          })
          .catch((e) => {
            this.editModal = false;
            this.openNotificationWithIcon(
              "error",
              "Internal server error",
              "bottomRight"
            );
          });
      // } else {
      //   this.openNotificationWithIcon(
      //     "warning",
      //     "File is being uploaded, try again",
      //     "bottomRight"
      //   );
      // }
    },
    saveNewBlog() {
      axios
        .post(this.APIServer + "front/blog/save", this.newBlog, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log(response.data);
          this.createModal = false;
          this.openNotificationWithIcon(
            "success",
            "Blog created successfully",
            "bottomRight"
          );
          this.getAllBlogsList();
          this.newBlog= {
            image: null,
            title: null,
            content: null,
          };
        })
        .catch((e) => {
          this.createModal = false;
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
    uploadImage(event, type) {
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
            console.log(response.data);
            if (type == "new") this.newBlog.image = response.data.secure_url;
            else if (type == "edit")
              this.editBlog.image = response.data.secure_url;
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
    deleteItem(record) {
      this.deleteModal = false;
      axios
        .get(this.APIServer + "front/blog/delete/" + record.id, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status == "success") {
            this.openNotificationWithIcon(
              "success",
              "Blog deleted successfully",
              "bottomRight"
            );
            this.getAllBlogsList();
          } else {
            this.openNotificationWithIcon(
              "warning",
              "Blog delete failed",
              "bottomRight"
            );
          }
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
    getAllBlogsList() {
      this.loading = true;
      this.data = [];
      axios
        .get(this.APIServer + "front/blog/list", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.data = response.data.data;
            console.log(this.data);
          } else {
            this.openNotificationWithIcon(
              "warning",
              response.data.code,
              "bottomRight"
            );
          }
          this.loading = false;
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.loading = false;
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
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