<template>
  <div class="users">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Categories</strong></h5>
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
                  <i class="fa fa-plus"></i> Create Category
                </button>
              </div>
            </div>

            <div class="row my-3">
              <div class="col-12 col-md-4">
                <label for="filter"><strong>Filter By Status</strong></label>
                <select
                  class="form-control"
                  @change="filterCategoryList()"
                  v-model="filterObject.status"
                >
                  <option :value="null">Filter Categories By Status</option>
                  <option value="all">All</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Name</strong></label>
                <input
                  type="text"
                  placeholder="Search By Name"
                  class="form-control"
                  v-model="search"
                />
              </div>
            </div>
            <div class="row">
              <div class="ml-3 mr-3 table-responsive">
                <table
                  class=" table table-striped overflow-auto"
                  style="
                    margin-bottom: 1rem;
                    color: black; 
                    display: inline-table;
                    "
                >
                  <thead class="">
                    <tr>
                      <th>Image</th>
                      <th>Crearted At</th>

                      <th>Name English</th>
                      <th>Name Arabic</th>
        

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody class="">
                    <tr
                      v-for="(item, itemIndex) in FilterCategory"
                      :key="itemIndex"
                    >
                      <td>
                        <img
                          src="https://civil-dashboard.netlify.app/img/logo.dfe8adc9.png"
                          height="50"
                          width="50"
                        />
                      </td>

                      <td>{{ item.createdAt }}</td>
                      <td>{{ item.nameEnglish }}</td>
                      <td>{{ item.nameArabic }}</td>
                      <!-- <td>
                        <label class="switch">
                          <input
                            type="checkbox"
                            :checked="item.accountActive == true"
                             @change="onChangeStatus(item)"
                            
                          />
                          <span class="slider round"></span>
                        </label>
                      </td> -->

                      <td class="action-button">
                        <span icons-s>
                          <!-- <i  @click="viewStudent(item)" class="fa fa-eye" aria-hidden="true"></i> -->
                          <i
                            class="fa fa-pencil"
                            v-if="currentUserRole == 'read,write,update,delete'"
                            @click="editModelView(item)"
                            aria-hidden="true"
                          ></i
                          ><i
                            v-if="currentUserRole == 'read,write,update,delete'"
                            @click="
                              deleteModal = true;
                              storeRecord = item;
                            "
                            class="fa fa-trash"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </td>
                    </tr>

                    <tr></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- <div class="row">
              <div class="col-md-12">
                <a-table
                  class="table"
                  :columns="columns"
                  :dataSource="data"
                  :scroll="{ x: 900 }"
                  :loading="loading"
                >
                  <span slot="image" slot-scope="id, record">
                    <b-img v-bind="mainProps1" :src="record.image"></b-img>
                  </span>
                  <span slot="status" slot-scope="id, record">
                    <a-switch
                      :checked="getBoolVal(record.status)"
                      @change="onChangeStatus(record)"
                    />
                  </span>
                  <span slot="actions" slot-scope="id, record">
                    <i class="fa fa-pencil" @click="editModelView(record)"></i>
                    <i class="fa fa-trash" @click="deleteModal=true;storeRecord=record;"></i>
                  </span>
                </a-table>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="editModal" scrollable hide-footer title="Update Category">
      <!-- <form @submit.prevent> -->
      <div class="row">
        <!-- <div class="col-12">
            <div class="form-group"><strong>Upload Category Image</strong></div>
            <input type="file" class="btn btn-primary" />
          </div> -->
        <div class="col-12 mt-3">
          <div class="form-group">
            <label for=""><strong>Category Name (English)</strong></label>
            <input
              type="text"
              class="form-control"
              v-model="editRecord.nameEnglish"
              placeholder="Enter Category Name"
              required
            />
          </div>
        </div>
        <!-- <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""
                ><strong>Category Description (English)</strong></label
              >
              <vue-editor></vue-editor>
            </div>
          </div> -->
        <div class="col-12 mt-3">
          <div class="form-group">
            <label for=""><strong>Category Name (Arabic)</strong></label>
            <input
              type="text"
              class="form-control"
              v-model="editRecord.nameArabic"
              placeholder="Enter Category Name"
              required
            />
          </div>
        </div>
        <!-- <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""
                ><strong>Category Description (Arabic)</strong></label
              >
              <vue-editor></vue-editor>
            </div>
          </div> -->
        <div class="col-12">
          <button class="btn btn-primary btn-block" @click="updateCategory()">
            Update Category
          </button>
        </div>
      </div>
      <!-- </form> -->
    </b-modal>
    <b-modal
      title="Delete Confirmation"
      modal-class="myclass"
      :hide-footer="true"
      v-model="deleteModal"
    >
      <form @submit.prevent>
        <div class="row">
          <div class="col-12 mt-3">
            <div class="form-group">
              <h5 class="d-block text-center">
                <strong>Are you sure you want to delete it?</strong>
              </h5>
              <br />
            </div>
          </div>
          <div class="col-12 mt-10">
            <span>
              <button
                class="btn btn-secondary mr-4"
                @click="deleteModal = false"
              >
                Cancel
              </button>
              <button class="btn btn-primary" @click="deleteItem(storeRecord)">
                Delete
              </button>
            </span>
          </div>
        </div>
      </form>
    </b-modal>
    <b-modal
      v-model="createModal"
      scrollable
      hide-footer
      title="Create Category"
    >
      <form @submit.prevent>
        <div class="row">
          <div class="col-12">
            <div class="form-group"><strong>Upload Category Image</strong></div>
            <b-form-file
              v-model="newCategory.categoryImage"
              class="btn"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              required
            ></b-form-file>
            <!-- <input type="file"  @change="uploadImage" class="btn btn-primary" /> -->
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""><strong>Category Name (English)</strong></label>
              <input
                type="text"
                class="form-control"
                v-model="newCategory.nameEnglish"
                placeholder="Enter Category Name"
                required
              />
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""
                ><strong>Category Description (English)</strong></label
              >
              <vue-editor v-model="newCategory.descriptionEnglish"></vue-editor>
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""><strong>Category Name (Arabic)</strong></label>
              <input
                type="text"
                v-model="newCategory.nameArabic"
                class="form-control"
                placeholder="Enter Category Name"
                required
              />
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""
                ><strong>Category Description (Arabic)</strong></label
              >
              <vue-editor v-model="newCategory.descriptionArabic"></vue-editor>
            </div>
          </div>
          <div class="col-12">
            <button
              class="btn btn-primary btn-block"
              @click="saveNewCategory()"
            >
              Create Category
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
import jsPDF from "jspdf";
import "jspdf-autotable";
import { VueEditor } from "vue2-editor";
export default {
  name: "categories",
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
      items: [],
      search: "",
      currentUserRole: "",
      deleteModal: false,
      storeRecord: {
        id: null,
      },
      filterObject: {
        status: null,
        name: "",
      },
      APIServer: process.env.VUE_APP_SERVER_ADDRESS,
      mainProps: { blank: false, blankColor: "#777", width: 80, height: 80 },
      mainProps1: { blank: false, blankColor: "#777", width: 45, height: 45 },
      editUser: null,
      image: null,
      titleEng: null,
      titleArb: null,
      DescriptionEng: null,
      DescriptionArb: null,
      editModal: false,
      createModal: false,
      viewModal: false,
      isFileUploaded: false,
      pagination: {},
      loading: false,
      visible: false,
      content: null,
      newCategory: {
        descriptionArabic: null,
        nameEnglish: null,
        descriptionEnglish: null,
        nameArabic: null,
        categoryImage: null,
      },

      editRecord: {
        nameEnglish: null,
        nameArabic: null,
        _id: null,
      },
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
      data: [
        {
          image: null,
          id: 980,
          title_en: "iuoi",
          created_at: "09-09-2021",
          status: true,
        },
      ],
      columns: [
        {
          title: "Image",
          scopedSlots: { customRender: "image" },
        },
        {
          title: "ID",
          dataIndex: "id",
          sorter: (a, b) => {
            if (!a.id) {
              a.id = 0;
            }
            if (!b.id) {
              b.id = 0;
            }
            return a.id - b.id;
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Name",
          dataIndex: "title_en",
          sorter: (a, b) => {
            if (!a.title_en) {
              a.title_en = "";
            }
            if (!b.title_en) {
              b.title_en = "";
            }
            return a.title_en.localeCompare(b.title_en);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Created At",
          dataIndex: "created_at",
          width: "25%",
          sorter: (a, b) => {
            if (!a.created_at) {
              a.created_at = "";
            }
            if (!b.created_at) {
              b.created_at = "";
            }
            return a.created_at.localeCompare(b.created_at);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Status",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "Actions",
          scopedSlots: { customRender: "actions" },
        },
      ],
    };
  },

  created() {
    console.log("lllddd");
    this.currentUserRole = sessionStorage.getItem("currentUserRole");

    console.log(this.currentUserRole);
    this.getAllCategories();
  },
  computed: {
    FilterCategory: function() {
      return this.items.filter((item) => {
        return (
          (item.nameEnglish || "")
            .toLowerCase()
            .indexOf((this.search || "").toLowerCase()) > -1
        );
      });
    },
  },
  methods: {
    csvExport() {
      let arrData = [];
      arrData.push(...this.data);
      arrData.forEach((item) => {
        delete item.image;
        delete item.description_en;
        delete item.description_ar;
        delete item.title_ar;
        delete item.updated_at;
      });

      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        Object.keys(arrData[0]).join(";"),
        ...arrData.map((item) => Object.values(item).join(";")),
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "Categories.csv");
      link.click();
    },

    exportPDF() {
      var vm = this;
      let columns = [];
      columns.push(...this.columns);
      columns.forEach((item) => {
        item.dataKey = item.dataIndex;
      });
      columns.shift();
      columns.pop();
      var doc = new jsPDF("p", "pt");
      doc.text("Categories List", 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: { cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: { cellPadding: 6 },
        body: vm.data,
        columns: columns,
      });
      doc.save("Categories.pdf");
    },
    getBoolVal(val) {
      if (val === 1) {
        return true;
      } else {
        return false;
      }
    },
    filterCategoryList() {
      axios
        .post(this.APIServer + "category/filter", this.filterObject, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.data = response.data.data;
            this.data.reverse();
            // console.log("user updated");
          }
          console.log(response.data.data);
          this.loading = false;
        })
        .catch((e) => {
          console.log("API failed");
          this.loading = false;
          console.log(e);
        });
    },
    // saveNewCategory() {
    //   console.log("file uploaded :" + this.isFileUploaded);
    //   if (this.isFileUploaded == true) {

    //     console.log('dsdss');
    //     axios
    //       .post(this.APIServer + "admin/createCategory", this.newCategory, {
    //         headers: { Authorization: this.$store.state.token },
    //       })
    //       .then((response) => {
    //         console.log(response.data);
    //         if (response.data.status == "success") {
    //           this.createModal = false;
    //           this.openNotificationWithIcon(
    //             "success",
    //             "Category created successfully",
    //             "bottomRight"
    //           );
    //           this.getAllCategories();
    //           this.newCategory= {
    //             title_en: null,
    //             title_ar: null,
    //             description_en: null,
    //             description_ar: null,
    //             image: null,
    //           }
    //         } else {
    //           this.createModal = false;
    //           this.openNotificationWithIcon(
    //             "warning",
    //             "Category create failed",
    //             "bottomRight"
    //           );
    //         }

    //       })
    //       .catch((e) => {
    //         console.log("API failed");
    //         this.createModal = false;
    //         this.openNotificationWithIcon(
    //           "error",
    //           "Internal server error",
    //           "bottomRight"
    //         );
    //       });
    //   } else {
    //     this.openNotificationWithIcon(
    //       "warning",
    //       "Image is not uploaded yet, please wait save after few seconds",
    //       "bottomRight"
    //     );
    //   }
    // },
    uploadImage(event) {
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
            this.newCategory.image = response.data.secure_url;
            console.log("Secure url:" + this.newCategory.image);
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
    editModelView(item) {
      console.log(item);
      this.editRecord.nameEnglish = item.nameEnglish;
      this.editRecord.nameArabic = item.nameArabic;
      this.editRecord._id = item._id;
      console.log(this.editRecord);
      this.editModal = true;
    },
    updateCategory() {
      console.log("saving user");
      let newUser = new FormData();
      newUser.append("nameEnglish", this.editRecord.nameEnglish);
      newUser.append("nameArabic", this.editRecord.nameArabic);
      newUser.append("categoryId", this.editRecord._id);

      axios
        .patch(this.APIServer + "admin/updateCategory/", newUser, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == true) {
            this.editModal = false;
            this.openNotificationWithIcon(
              "success",
              "Category updated successfully",
              "bottomRight"
            );
            // this.data = response.data.data;
            this.getAllCategories();
          } else {
            this.editModal = false;
            this.openNotificationWithIcon(
              "warning",
              "Category update failed",
              "bottomRight"
            );
          }
          console.log(response.data);
        })
        .catch((e) => {
          console.log("API failed");
          this.editModal = false;
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
    saveNewCategory() {
      //   this.loading = true;

      console.log("saving user");
      let newUser = new FormData();
      newUser.append("nameEnglish", this.newCategory.nameEnglish);
      newUser.append("nameArabic", this.newCategory.nameArabic);
      newUser.append("descriptionEnglish", this.newCategory.descriptionEnglish);
      newUser.append("descriptionArabic", this.newCategory.descriptionArabic);
      newUser.append("categoryImage", this.newCategory.categoryImage);
      axios
        .post(this.APIServer + "admin/createCategory", newUser, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == true) {
            this.createModal = false;
            this.openNotificationWithIcon(
              "success",
              "Category created successfully",
              "bottomRight"
            );
            this.getAllCategories();
          } else {
            this.createModal = false;
            this.openNotificationWithIcon(
              "warning",
              "Category create failed",
              "bottomRight"
            );
          }
          console.log(response.data);
        })
        .catch((e) => {
          console.log("API failed");
          this.createModal = false;
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
    getAllCategories() {
      console.log("here");
      axios
        .get(this.APIServer + "admin/getCategories", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log("response:", response);
          this.userList = response.data;
          this.items = response.data;

          this.userList.reverse();

          this.loading = false;
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.loading = false;
          ///this.openNotificationWithIcon("error", "Internal server error");
        });

      // axio
      //   .get(this.APIServer + "admin/getCategories", {
      //     headers: { Authorization: this.$store.state.token },
      //   })

      //   .then((response) => {

      //     if (response.data.status == true) {
      //        this.items = response.data
      //        console.log('dsdsds')
      //       //console.log(items)
      //      // this.data = response.data.data;
      //      // this.data.reverse();
      //       // console.log("user updated");
      //     }
      //     console.log(response.data.data);
      //     this.loading = false;
      //   })
      //   .catch((e) => {
      //     console.log("API failed");
      //     this.loading = false;
      //     console.log(e);
      //   });

      // .get(this.APIServer + "category/list", {
      //   headers: { Authorization: this.$store.state.token },
      // })
      // .then((response) => {
      //   if (response.data.status == "success") {
      //     this.data = response.data.data;
      //     this.data.reverse();
      //     // console.log("user updated");
      //   }
      //   console.log(response.data.data);
      //   this.loading = false;
      // })
      // .catch((e) => {
      //   console.log("API failed");
      //   this.loading = false;
      //   console.log(e);
      // });
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
    onAvatarSelected(event) {
      let file = event.target.files[0];
      if (file) {
        this.image = URL.createObjectURL(file);
      }
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
      this.deleteModal = false;
      console.log("deleting item : " + record.id);
      axios
        .get(this.APIServer + "category/delete/" + record.id, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.message != null) {
            this.openNotificationWithIcon(
              "success",
              response.data.message,
              "bottomRight"
            );
            this.filterCategoryList();
          }
        })
        .catch((e) => {
          console.log("API failed");
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
    // onChangeStatus(record) {
    //   axios
    //     .patch(
    //       this.APIServer + "admin/activeCategory",
    //       {
    //         categoryId: record._id,
    //       },
    //       {
    //         headers: { Authorization: this.$store.state.token },
    //       }
    //     )
    //     .then((response) => {
    //       if (response.data.status == "success") {
    //          console.log('failirer', record);
    //         this.openNotificationWithIcon(
    //           "success",
    //           response.data.data,
    //           "bottomRight"
    //         );
    //         this.filterCategoryList();
    //       }
    //     })
    //     .catch((e) => {
    //       console.log("API failed");
    //       console.log('failirer', record);
    //       this.openNotificationWithIcon(
    //         "error",
    //         "Internal server error",
    //         "bottomRight"
    //       );
    //     });
    // },
    openNotificationWithIcon(type, message, place) {
      this.$notification[type]({
        message: "Response",
        description: message,
        place,
      });
    },
  },
};
</script>
<style scoped>
.action-button span {
  display: flex;
}

.table tr > td {
  padding: 16px 16px;
  overflow-wrap: break-word;
}

/*Header*/
.thead tr th {
  float: left;
  background-color: #00b3ee;
  border-color: #00b3ee;
}
</style>
