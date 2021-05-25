<template>
  <div class="reviews">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Jobs</strong></h5>
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
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Student</strong></label>
                <input
                  type="text"
                  placeholder="Enter Student Name"
                  class="form-control"
                  @keyup="filterJobList()"
                  v-model="filterObject.studentFirstName"
                />
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Trainer</strong></label>
                <input
                  type="text"
                  placeholder="Enter Trainer Name"
                  class="form-control"
                  @keyup="filterJobList()"
                  v-model="filterObject.trainer"
                />
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Date</strong></label>
                <a-range-picker
                  class="date-input"
                  size="default"
                  @change="filterJobList()"
                  v-model="dateRange"
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
                      <th>id</th>
                      <th>Crearted At</th>

                      <th>Student</th>
                      <th>Trainer</th>
                      <th>Status</th>
                      <th>Action</th>
                      <!-- <th>Action</th> -->
                    </tr>
                  </thead>
                  <tbody class="">
                    <tr
                      v-for="(item, itemIndex) in FilterCategory"
                      :key="itemIndex"
                    >
                      <td>{{ item._id.substring(0, 6) + ".." }}</td>

                      <td>{{ item.createdAt | formatDate }}</td>
                      <td>{{ item.student }}</td>
                      <td>{{ item.trainer }}</td>
                      <td>
                        <span class="badge badge-secondary">{{
                          item.status
                        }}</span>
                      </td>

                      <td class="action-button">
                        <span icons-s>
                          <i
                            @click="viewUserData(item)"
                            class="fa fa-eye"
                            aria-hidden="true"
                          ></i>

                          <i
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
                  :scroll="{ x: 1500 }"
                  :loading="loading"
                >
                  <span slot="image" slot-scope="id, record">
                    <b-img v-bind="mainProps1" :src="record.image"></b-img>
                  </span>
                  <span slot="student" slot-scope="id, record" rowKey="id">
                    <p>{{ record.booking_student.first_name }}</p>
                  </span>
                  <span slot="status" slot-scope="id, record">
                    <b-badge :variant="getColor(record.status)">{{
                      record.status
                    }}</b-badge>
                  </span>

                  <span slot="actions" slot-scope="id, record">
                    <i class="fa fa-trash" @click="deleteItem(record)"></i>
                  </span>
                </a-table>
              </div>
            </div> -->
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
import Vue from "vue";
import moment from "moment";
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY");
  }
});
export default {
  name: "users",
  computed: {
    rows() {
      return this.items.length;
    },
  },

  data() {
    return {
      dateRange: null,
      filterObject: {
        studentFirstName: "",
        trainer: "",
        dateFrom: "",
        dateTo: "",
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
      value: null,
      currentUserRole: "",
      firstName: null,

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
      data: [],
      items: [],
      columns: [
        // {
        //   title: "Image",
        //   scopedSlots: { customRender: "image" },
        // },
        {
          title: "ID",
          dataIndex: "_id",
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
          title: "Student",
          dataIndex: "student",
          sorter: (a, b) => a.student.localeCompare(b.student),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Trainer",
          dataIndex: "trainer",
          sorter: (a, b) => a.trainer.localeCompare(b.trainer),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
          width: "20%",
          sorter: (a, b) => a.created_at.localeCompare(b.created_at),
          sortDirections: ["descend", "ascend"],
        },
        // {
        //   title: "Course",
        //   dataIndex: "course",
        // },
        {
          title: "Status",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        // {
        //     title: 'Actions',
        //     scopedSlots: { customRender: 'actions' },
        // },
      ],
    };
  },
  created() {
    this.currentUserRole = sessionStorage.getItem("currentUserRole");

    console.log(this.currentUserRole);
    this.getAllMyJobs();
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
      link.setAttribute("download", "Jobs.csv");
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
      var doc = new jsPDF("p", "pt");
      doc.text("Jobs List", 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: { cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: { cellPadding: 6 },
        body: vm.data,
        columns: columns,
      });
      doc.save("Jobs.pdf");
    },
    filterJobList() {
      if (this.dateRange && this.dateRange.length !== 0) {
        this.filterObject.dateTo = moment(
          JSON.parse(JSON.stringify(this.dateRange[0]))
        ).format("yyyy-MM-DD");
        this.filterObject.dateTo = moment(
          JSON.parse(JSON.stringify(this.dateRange[1]))
        ).format("yyyy-MM-DD");
      } else {
        this.filterObject.date_from = null;
        this.filterObject.date_to = null;
      }
      axios
        .get(this.APIServer + "admin/searchJob?" + this.filterObject, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log(response);
          if (response.data.status == "success") {
            this.data = [];
            console.log(response.data.data);
            debugger;
            response.data.data.forEach((d) => {
              let object = {
                image: d.image,
                id: d.id,
                student:
                  d.booking_student.first_name +
                  " " +
                  d.booking_student.last_name,
                trainer:
                  d.course_trainer.first_name +
                  " " +
                  d.course_trainer.last_name,
                created_at: d.created_at,
                course: d.booking_course.title_en,
                status: d.status,
              };
              this.data = [...this.data, object];
            });
          }
          console.log(this.data);
          this.data.reverse();
          this.loading = false;
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.loading = false;
        });
    },
    getAllMyJobs() {
      this.data = [];
      this.loading = true;
      axios
        .get(this.APIServer + "admin/getJobs", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log(response);
          if (response.data != "") {
            this.checkAlready = true;
            console.log("this", response.data);
            this.data = response.data;
            this.items = response.data;
            // response.data.forEach((d) => {
            //   let object = {
            //     image: d.image,
            //     _id: d.id,
            //     student:
            //       d.booking_student.first_name +
            //       " " +
            //       d.booking_student.last_name,
            //     trainer:
            //       d.course_trainer.first_name +
            //       " " +
            //       d.course_trainer.last_name,
            //     createdAt: d.created_at,
            //     course: d.booking_course.title_en,
            //     status: d.status,
            //   };
            //   this.data.push(object);
            //  // console.log('ddwsd',this.data.push(object))
            // });
          }
          console.log(this.data);
          this.data.reverse();
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
    getColor(status) {
      if (status == "In Progress") {
        return "primary";
      }
      if (status == "Completed") {
        return "success";
      }
      if (status == "Cancelled") {
        return "danger";
      }
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
