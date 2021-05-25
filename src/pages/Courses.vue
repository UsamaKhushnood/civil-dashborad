<template>
  <div class="courses">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Courses </strong></h5>
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
                <button class="btn btn-primary" @click="move('/create-course')">
                  <i class="fa fa-plus"></i> Create Course
                </button>
              </div>
            </div>

            <div class="row my-3">
              <div class="col-12 col-md-4">
                <label for="filter"><strong>Filter By Status</strong></label>
                <select
                  class="form-control"
                  @change="filterCourseList()"
                  v-model="filterObject.status"
                >
                  <option :value="null">Filter Courses By Status</option>
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
                  v-model="searchName"
                />
              </div>
            </div>

            <div class="row">
              <div class="ml-3 mr-3 table-responsive">
                <table
                  class=" table table-striped overflow-auto"
                  style="  width: 100%;
                    margin-bottom: 1rem;
                    color: black; 
                    table-layout: fixed;"
                >
                  <thead class="">
                    <tr>
                      <th>Image</th>
                      <th>Id</th>
                      <th>Created at</th>
                      <th>Price</th>
                      <th>Cource English</th>
                      <th>Course Arabic</th>
                      <th>Summary</th>
                      <th>Institue</th>

                      <th>Category</th>
                      <th>Trainer</th>
                      <th>Company Logo</th>
                      <th>Status</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody class="">
                    <tr
                      v-for="(item, itemIndex) in FilterCourse"
                      :key="itemIndex"
                    >
                      <td>
                        <img
                          src="https://civil-dashboard.netlify.app/img/logo.dfe8adc9.png"
                          height="50"
                          width="50"
                        />
                      </td>

                      <td>{{ item._id.substring(0, 6) + ".." }}</td>
                      <td>{{ item.createdAt | formatDate }}</td>
                      <td>{{ item.price }}</td>
                      <td>{{ item.nameEnglish }}</td>
                      <td>{{ item.nameArabic }}</td>
                      <td>{{ item.summary }}</td>
                      <td>{{ item.institue }}</td>

                      <td>
                        <span
                          v-for="(name, nameKey) in item.category"
                          :key="nameKey"
                        >
                          {{ name }}
                        </span>
                      </td>
                      <td>
                        {{ item.trainer.firstName }} {{ item.trainer.lastName }}
                      </td>
                      <td>
                        <img
                          src="https://civil-dashboard.netlify.app/img/logo.dfe8adc9.png"
                          height="50"
                          width="50"
                        />
                      </td>
                      <td>
                        <label class="switch">
                          <input
                            type="checkbox"
                            :checked="item.activeStatus == true"
                            @change="onChangeStatus(item)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>

                      <td>
                        <b-dropdown>
                          <template v-slot:button-content> Actions </template>
                          <b-dropdown-item @click="move('/course/' + item._id)"
                            ><i class="fa fa-eye"></i> View
                            Course</b-dropdown-item
                          >
                          <b-dropdown-item
                            @click="move('/edit-course/' + item._id)"
                            ><i class="fa fa-pencil"></i> Update
                            Course</b-dropdown-item
                          >
                          <b-dropdown-item
                            @click="move('/course/' + item._id + '/reviews')"
                            ><i class="fa fa-star"></i> Reviews</b-dropdown-item
                          >
                          <b-dropdown-item
                            @click="move('/course/' + item._id + '/tests')"
                            ><i class="fa fa-file"></i> Tests</b-dropdown-item
                          >
                          <b-dropdown-item
                            ><i class="fa fa-certificate"></i>
                            Certificate</b-dropdown-item
                          >
                          <!-- <b-dropdown-item @click="deleteModal=true;storeRecord=record;"
                        ><i class="fa fa-trash"></i> Delete
                        Course</b-dropdown-item
                      >-->
                        </b-dropdown>
                      </td>

                      <span slot="actions" slot-scope="id, record">
                        <i class="fa fa-eye" @click="viewUserData(i)"></i>
                        <i
                          v-if="currentUserRole == 'read,write,update,delete'"
                          class="fa fa-pencil"
                          @click="move('/edit-user/' + record._id)"
                        ></i>
                        <i
                          v-if="currentUserRole == 'read,write,update,delete'"
                          class="fa fa-trash"
                          @click="deleteme(record)"
                        ></i>
                      </span>
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
                  :dataSource="coursesData"
                  :scroll="{ x: 900 }"
                  :loading="loading"
                >
                  <span slot="image" slot-scope="id, record">
                    <b-img
                      v-bind="mainProps1"
                      :src="record.image"
                    ></b-img>
                  </span>
                  <span slot="status" slot-scope="id, record">
                    <a-switch
                      :checked="getBoolVal(record.status)"
                      @click="onChangeStatus(record.id)"
                    />
                  </span>
                  <span slot="actions" slot-scope="id, record">
                    <b-dropdown>
                      <template v-slot:button-content> Actions </template>
                      <b-dropdown-item @click="move('/course/' + record.id)"
                        ><i class="fa fa-eye"></i> View Course</b-dropdown-item
                      >
                      <b-dropdown-item
                        @click="move('/edit-course/' + record.id)"
                        ><i class="fa fa-pencil"></i> Update
                        Course</b-dropdown-item
                      >
                      <b-dropdown-item
                        @click="move('/course/' + record.id + '/reviews')"
                        ><i class="fa fa-star"></i> Reviews</b-dropdown-item
                      >
                      <b-dropdown-item
                        @click="move('/course/' + record.id + '/tests')"
                        ><i class="fa fa-file"></i> Tests</b-dropdown-item
                      >
                      <b-dropdown-item
                        ><i class="fa fa-certificate"></i>
                        Certificate</b-dropdown-item
                      >
                     <b-dropdown-item @click="deleteModal=true;storeRecord=record;"
                        ><i class="fa fa-trash"></i> Delete
                        Course</b-dropdown-item
                      >
                    </b-dropdown>
                  </span>
                </a-table>
              </div>
            </div> -->
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
                      <button
                        class="btn btn-primary"
                        @click="deleteItem(storeRecord)"
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                </div>
              </form>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  name: "courses",
  computed: {
    rows() {
      return this.items.length;
    },
  },
  data() {
    return {
      items: [],
      searchName: "",
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
        status: "active",
      },
      coursesData: [
        {
          image: null,
          id: 1,
          title_en: "reuiy",
          organized: "organized",
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
          sorter: (a, b) => a.id - b.id,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Name",
          dataIndex: "title_en",
          sorter: (a, b) => a.title_en.localeCompare(b.title_en),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Organized By",
          dataIndex: "organized",
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Created At",
          dataIndex: "created_at",
          width: "20%",
          sorter: (a, b) => a.created_at.localeCompare(b.created_at),
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
    this.getAllMyCourses();
  },
  computed: {
    FilterCourse: function() {
      return this.items.filter((item) => {
        return (
          (item.nameEnglish || "")
            .toLowerCase()
            .indexOf((this.searchName || "").toLowerCase()) > -1
        );
      });
    },
  },

  methods: {
    csvExport() {
      let arrData = [];
      arrData.push(...this.coursesData);
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
      link.setAttribute("download", "Courses.csv");
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
      doc.text("Courses List", 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: { cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: { cellPadding: 6 },
        body: vm.coursesData,
        columns: columns,
      });
      doc.save("Courses.pdf");
    },
    getBoolVal(val) {
      if (val === 1) {
        return true;
      } else {
        return false;
      }
    },
    filterCourseList() {
      axios
        .post(this.APIServer + "course/filter", this.filterObject, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            console.log(response.data.data);
            this.coursesData = response.data.data;
            this.coursesData.reverse();
          }
          this.loading = false;
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.loading = false;
        });
    },
    getAllMyCourses() {
      this.loading = true;
      axios
        .get(this.APIServer + "admin/getCourses", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          // this.userList = response.data;
          this.items = response.data;

          // if (response.data.activeStatus == true) {
          //   console.log(response.data.data);

          //   this.coursesData = response.data.data;
          //   this.coursesData.forEach(item=>{
          //     item.organized = item.organized_by.first_name + ' '+ item.organized_by.last_name;
          //     item.image = item.images[0]?item.images[0].image : undefined;
          //   })
          // }
          this.coursesData.reverse();
          this.loading = false;
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.loading = false;
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
    openNotificationWithIcon(type, message, place) {
      this.$notification[type]({
        message: "Response",
        description: message,
        place,
      });
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
      this.deleteModal = false;
      axios
        .get(this.APIServer + "course/location/delete/" + record.id, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.openNotificationWithIcon(
              "success",
              "Course deleted successfully"
            );
            this.filterCourseList();
          } else {
            this.openNotificationWithIcon("error", response.data.code);
          }
        })
        .catch((e) => {
          console.log("API failed");
          this.openNotificationWithIcon("error", "Course deleting failed");
          console.log(e);
        });
    },
    onChangeStatus(item) {
      axios
        .patch(
          this.APIServer + "admin/acivateCourse",
          {
            courseId: item._id,
          },
          {
            headers: { Authorization: this.$store.state.token },
          }
        )
        .then((response) => {
          if (response.data) {
            console.log("status", item);
            this.openNotificationWithIcon(
              "success",
              response.data.data,
              "bottomRight"
            );
            // this.filterCourseList();
          }
        })
        .catch((e) => {
          console.log("API failed");
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
          console.log(e);
        });
      // let index = this.coursesData.indexOf(record);
      // if (index !== -1) {
      //   let status = this.coursesData[index].course_category.status;
      //   if (status == 1) {
      //     this.coursesData[index].course_category.status = 0;
      //   } else {
      //     this.coursesData[index].course_category.status = 1;
      //   }
      // }
    },
  },
};
</script>
<style scoped>
.table {
  width: 1700px !important;
}
</style>
