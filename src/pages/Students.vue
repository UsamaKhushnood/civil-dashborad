<template>
  <div class="users">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Students</strong></h5>
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
                <label for="filter"><strong>Search By Residence</strong></label>

                <country-select
                  v-model="residenceCountry"
                  :country="country"
                  type="text"
                  placeholder="Search By Residence"
                  class="form-control"
                />
              </div>
              <div class="col-12 col-md-4">
                <label for="filter"><strong>Filter By Status</strong></label>
                <select class="form-control" v-model="selectedType">
                  <option :value="null">Filter Students By Status</option>
                  <option value="all">All</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"
                  ><strong>Search By Name/Phone</strong></label
                >
                <input
                  type="text"
                  placeholder="Search By Name/Phone"
                  class="form-control"
                  v-model="searchName"
                />
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"
                  ><strong>Search By Nationality</strong></label
                >

                <country-select
                  v-model="nationality"
                  :country="country"
                  type="text"
                  placeholder="Search By Nationality"
                  class="form-control"
                />
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Date</strong></label>
                <div>
                  <a-range-picker
                    class="date-input"
                    size="default"
                    v-model="dateRangeFilter"
                  />
                </div>
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Email</strong></label>
                <input
                  type="text"
                  placeholder="Search By Email"
                  class="form-control"
                  v-model="searchEmail"
                />
              </div>
            </div>

            <div class="row">
              <div class="ml-3 mr-3 table-responsive">
                <table
                  class="table table-striped overflow-auto"
                  style="width: 1900px;
                    margin-bottom: 1rem;
                    color: black; 
                    display: inline-table;
                    "
                >
                  <thead class="">
                    <tr>
                      <th>Image</th>
                      <th>Id</th>
                      <th>Date of Birth</th>
                      <th>First Name</th>
                      <th>Last Name</th>

                      <th>Email</th>
                      <th>Phone</th>
                      <th>Country</th>
                      <th>Residence</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody class="">
                    <tr
                      v-for="(item, itemIndex) in FilterStudent"
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
                      <td>{{ item.user.dateOfBirth | formatDate }}</td>
                      <td>{{ item.user.firstName }}</td>
                      <td>{{ item.user.lastName }}</td>
                      <td>{{ item.user.email }}</td>
                      <td>{{ item.user.phoneNo }}</td>
                      <td>{{ item.user.nationality }}</td>
                      <td>{{ item.user.residenceCountry }}</td>
                      <td>
                        <label class="switch">
                          <input
                            type="checkbox"
                            :checked="item.accountActive == true"
                            @click="onChangeStatus(item)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>

                      <td class="action-button">
                        <span icons-s
                          ><i
                            @click="viewStudent(item)"
                            class="fa fa-eye"
                            aria-hidden="true"
                          ></i
                          ><i
                            class="fa fa-pencil"
                            v-if="currentUserRole == 'read,write,update,delete'"
                            @click="edit(item)"
                            aria-hidden="true"
                          ></i>
                          <!-- <i   v-if=" currentUserRole =='read,write,update,delete' "  @click="deleteItem(item)" class="fa fa-trash" aria-hidden="true"></i>  -->
                          <button
                            class="btn btn-primary btn-sm"
                            @click="
                              remarksModal = true;
                              remarksId = id.id;
                            "
                          >
                            Remarks
                          </button>
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
                  :scroll="{ x: 2300 }"
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
                      @click="onChangeStatus(record)"
                    />
                  </span>
                  <span slot="actions" slot-scope="id, record">
                    <i class="fa fa-eye" @click="viewStudent(record)"></i>
                   <i
                      class="fa fa-pencil"
                      @click="edit(id)"
                    ></i>
                    <button
                      class="btn btn-primary btn-sm"
                      @click="remarksModal=true;remarksId=id.id"
                    >
                      Remarks
                    </button>
                     <i class="fa fa-trash" @click="deleteItem(record)"></i>
                  </span>
                </a-table>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- <b-modal v-model="editModal" hide-footer title="Edit User">
            <div class="row mb-3">
                <div class="col-12 text-center">
                    <div class="image" @click="pickAvatar" v-bind:style="{ 'background-image': 'url(' + image + ')' }">
                        <div v-if="!image">
                            <i class="fa fa-camera" ></i>
                            <p>Upload Image</p>
                        </div> 
                    </div>
                    <input type="file" class="btn btn-primary" style="display:none" accept="image/*"  @change="onAvatarSelected" ref="AvatarInput">
                </div>
            </div>
            <form @submit.prevent="update">
                <div class="row" v-if="editUser">
                    <div class="col-6 mt-2">
                        <div class="form-group">
                            <label for="first_name"><strong>First Name*</strong></label>
                            <input type="text" class="form-control" v-model="editUser.first_name" placeholder="Enter First Name" required>
                        </div>
                    </div>
                    <div class="col-6 mt-2">
                        <div class="form-group">
                            <label for="last_name"><strong>Last Name*</strong></label>
                            <input type="text" class="form-control" v-model="editUser.last_name" placeholder="Enter Last Name" required>
                        </div>
                    </div>
                    <div class="col-6 mt-2">
                        <div class="form-group">
                            <label for="email"><strong>Email*</strong></label>
                            <input type="email" class="form-control" v-model="editUser.email" placeholder="Enter Email" required>
                        </div>
                    </div>
                    <div class="col-6 mt-2">
                        <div class="form-group">
                            <label for="mobile"><strong>Mobile*</strong></label>
                            <input type="tel" class="form-control" v-model="editUser.mobile" placeholder="Enter Mobile" required>
                        </div>
                    </div>
                    <div class="col-6 mt-2">
                        <div class="form-group">
                            <label for="job_title"><strong>Job Title*</strong></label>
                            <input type="text" class="form-control" v-model="editUser.job_title" placeholder="Enter Job Title" required>
                        </div>
                    </div>
                    <div class="col-6 mt-2">
                        <div class="form-group">
                            <label for="nationality"><strong>Nationality*</strong></label>
                            <input type="text" class="form-control" v-model="editUser.nationality" placeholder="Enter Nationality" required>
                        </div>
                    </div>
                    <div class="col-12 mt-3">
                        <button class="btn btn-primary btn-block">Edit User</button>
                    </div>
                </div>
            </form>
            
        </b-modal> -->
    <b-modal v-model="remarksModal" hide-footer title="Add Remarks">
      <form @submit.prevent>
        <div class="row">
          <div class="col-12 mt-3">
            <div class="form-group">
              <h5 class="d-block text-center">
                <strong>
                  <textarea
                    class="form-control"
                    required
                    placeholder="Enter Remarks here..."
                    rows="6"
                    v-model="remarks"
                  ></textarea
                ></strong>
              </h5>
              <br />
            </div>
          </div>
          <div class="col-12 mt-10 fr">
            <span>
              <button
                class="btn btn-secondary mr-4"
                @click="remarksModal = false"
              >
                Cancel
              </button>
              <button class="btn btn-primary" @click="sendRemarks()">
                Send
              </button>
            </span>
          </div>
        </div>
      </form>
    </b-modal>
    <b-modal v-model="viewModal" hide-footer title="Student Details">
      <div class="row">
        <div class="col-12 text-center mt-2 mb-3">
          <img
            v-bind="mainProps1"
            :src="userRecord.image"
            height="150"
            width="150"
          />
        </div>
        <div class="col-12 text-center mt-2 mb-3">
          <p>
            <strong class="text-main"
              >Last Edited By Admin {{ userRecord.updated_at }}</strong
            >
          </p>
        </div>
        <!-- <div class="col-12 text-center mt-2 mb-3">
                    <b-img v-bind="mainProps" src="https://ptetutorials.com/images/user-profile.png"></b-img>
                </div> -->

        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="id"><strong>Student Id</strong></label>
          <p>{{ userRecord._id }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="id"><strong>Registration Date</strong></label>
          <p>{{ userRecord.user.registrationTime }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="first_name"><strong>First Name</strong></label>
          <p>{{ userRecord.user.firstName }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="last_name"><strong>Last Name</strong></label>
          <p>{{ userRecord.user.lastName }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="email"><strong>Email</strong></label>
          <p>{{ userRecord.user.email }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="mobile"><strong>Mobile</strong></label>
          <p>{{ userRecord.user.phoneNo }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="status"><strong>Status</strong></label>
          <p>{{ userRecord.accountActive ? "Active" : "Inactive" }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="gender"><strong>Gender</strong></label>
          <p>{{ userRecord.user.gender }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="job"><strong>Residence</strong></label>
          <p>{{ userRecord.user.nationality }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="nationality"><strong>Country</strong></label>
          <p>{{ userRecord.user.residenceCountry }}</p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";
import moment from "moment";
import Vue from "vue";
import "jspdf-autotable";
import vueCountryRegionSelect from "vue-country-region-select";
export default {
  name: "users",
  computed: {
    rows() {
      return this.items.length;
    },
  },
  data() {
    return {
      startData: "",
      endDate: "",
      itemData: "",
      dateRangeFilter: "",
      items: [],
      selectedType: "",
      residenceCountry: "",
      nationality: "",
      currentUserRole: "",
      searchName: "",
      searchEmail: "",
      remarksId: null,
      remarks: null,
      country: null,
      remarksModal: false,
      dateRange: null,

      filterObject: {
        email: "",
        name_phone: "",
        status: null,
        date_from: "",
        date_to: "",
      },
      APIServer:
        `https://cryptic-gorge-79265.herokuapp.com/api/` ||
        process.env.VUE_APP_SERVER_ADDRESS,
      mainProps: { blank: false, blankColor: "#777", width: 80, height: 80 },
      mainProps1: { blank: false, blankColor: "#777", width: 45, height: 45 },
      editUser: null,
      image: null,
      editModal: false,
      viewModal: false,
      pagination: {},
      loading: false,
      visible: false,
      userRecord: {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        nationality: null,
        image: null,
        role: null,
        updated_at: null,
        status: "active",
      },
      data: [
        {
          image: null,
          id: 1,
          created_at: "01-01-2021",
          first_name: "test",
          last_name: "last",
          email: "test@test.com",
          phone: 9090909090,
          country: "India",
          residence: "indai",
        },
      ],
      columns: [
        {
          title: "Image",
          dataIndex: "user.imagePath",

          width: "6%",
          scopedSlots: { customRender: "user.imagePath" },
        },
        {
          title: "Id",
          dataIndex: "_id",
          width: "6%",
          sorter: (a, b, sortOrder) => a.id - b.id,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Registration Date",
          dataIndex: "created_at",
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
          title: "First Name",
          dataIndex: "user.firstName",
          sorter: (a, b) => a.first_name.localeCompare(b.first_name),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Last Name",
          dataIndex: "user.lastName",
          sorter: (a, b) => {
            if (!a.last_name) {
              a.last_name = "";
            }
            if (!b.last_name) {
              b.last_name = "";
            }
            return a.last_name.localeCompare(b.last_name);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Email",
          dataIndex: "user.email",
          sorter: (a, b) => a.email.localeCompare(b.email),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Phone",
          dataIndex: "user.phoneNo",
          sorter: (a, b) => a.phone.localeCompare(b.phone),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Nationality",
          dataIndex: "user.nationality",
          sorter: (a, b) => {
            if (!a.country) {
              a.country = "";
            }
            if (!b.country) {
              b.country = "";
            }
            return a.country.localeCompare(b.country);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Residence",
          dataIndex: "user.residenceCountry",
          dataIndex: "user.residenceCountry",
          sorter: (a, b) => {
            if (!a.residence) {
              a.residence = "";
            }
            if (!b.residence) {
              b.residence = "";
            }
            return a.residence.localeCompare(b.residence);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Status",
          dataIndex: "user.accountActive",
          width: "6%",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "Actions",
          width: "13%",
          scopedSlots: { customRender: "actions" },
        },
      ],
    };
  },
  created() {
    console.log("lllddd");
    this.currentUserRole = sessionStorage.getItem("currentUserRole");

    console.log(this.currentUserRole);
    this.getAllStudents();
  },
  computed: {
    FilterStudent: function() {
      console.log(this.dateRangeFilter);
      if (this.dateRangeFilter && this.dateRangeFilter.length !== 0) {
        this.startDate = moment(
          JSON.parse(JSON.stringify(this.dateRangeFilter[0]))
        ).format("MM/DD/YYYY");
        this.endDate = moment(
          JSON.parse(JSON.stringify(this.dateRangeFilter[1]))
        ).format("MM/DD/YYYY");
      }
      if (this.startDate != "" && this.endDate != "") {
        let start = this.startDate;
        let end = this.endDate;
        this.startDate = "";
        this.endDate = "";
        return this.items.filter((item) => {
          let date = moment(
            JSON.parse(JSON.stringify(item.user.dateOfBirth))
          ).format("MM/DD/YYYY");

          return date >= start && date <= end;
        });
      } else {
        console.log("aaa");
        return this.items.filter((item) => {
          let filtered = true;
          if (this.selectedType == 1) {
            filtered = item.accountActive == true;
          }
          if (this.selectedType == 0) {
            filtered = item.accountActive == false;
          }
          if (this.selectedType == "") {
            filtered =
              item.accountActive == true || item.accountActive == false;
          }
          return (
            (item.user.firstName || "")
              .toLowerCase()
              .indexOf((this.searchName || "").toLowerCase()) > -1 &&
            (item.user.email || "")
              .toLowerCase()
              .indexOf((this.searchEmail || "").toLowerCase()) > -1 &&
            (item.user.residenceCountry || "")
              .toLowerCase()
              .indexOf((this.residenceCountry || "").toLowerCase()) > -1 &&
            (item.user.nationality || "")
              .toLowerCase()
              .indexOf((this.nationality || "").toLowerCase()) > -1 &&
            filtered
          );
        });
      }
    },
  },

  methods: {
    csvExport() {
      let arrData = [];
      arrData.push(...this.data);
      arrData.forEach((item) => {
        delete item.image;
        delete item.id;
        delete item.nationality;
        delete item.created_at;
        delete item.updated_at;
        delete item.dob;
        delete item.email_verified_at;
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
      link.setAttribute("download", "Students.csv");
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
      doc.text("Students List", 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: { cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: { cellPadding: 6 },
        body: vm.data,
        columns: columns,
      });
      doc.save("Students.pdf");
    },
    getBoolVal(val) {
      if (val === 1) {
        return true;
      } else {
        return false;
      }
    },
    filterStudentList() {
      console.log("dsds", this.filterObject);
      if (this.dateRange && this.dateRange.length !== 0) {
        this.filterObject.dateFrom = moment(
          JSON.parse(JSON.stringify(this.dateRange[0]))
        ).format("yyyy-MM-DD");
        this.filterObject.dateTo = moment(
          JSON.parse(JSON.stringify(this.dateRange[1]))
        ).format("yyyy-MM-DD");
      } else {
        this.filterObject.dateFrom = null;
        this.filterObject.dateTo = null;
      }
      console.log(filterObject);
      axios.get(this.APIServer + "admin/searchStudent/", this.filterObject, {
        headers: { Authorization: this.$store.state.token },
      });
      console
        .log(response)
        .then((response) => {
          console.log(response.data);
          if (response.data.status == "success") {
            console.log(response.data);
            this.data = response.data.data;
            this.data.forEach((item) => {
              item.created_at = item.created_at
                .replace("T", " ")
                .substring(0, 19);
              item.residence = item.trainer.residence;
            });

            this.loading = false;
            this.data.reverse();
          }
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.loading = false;
        });
    },
    getAllStudents() {
      if (this.dateRange && this.dateRange.length !== 0) {
        this.filterObject.dateFrom = moment(
          JSON.parse(JSON.stringify(this.dateRange[0]))
        ).format("yyyy-MM-DD");
        this.filterObject.dateTo = moment(
          JSON.parse(JSON.stringify(this.dateRange[1]))
        ).format("yyyy-MM-DD");
      } else {
        this.filterObject.dateFrom = null;
        this.filterObject.dateTo = null;
      }
      this.loading = true;
      axios
        .get(this.APIServer + "admin/getStudents/", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log(response);
          console.log(response.data, "student");

          if (response.data) {
            console.log(response.data, "dddd");
            this.items = response.data;
            this.data = response.data;

            console.log(response.data);
            this.data = response.data;

            this.data.forEach((item) => {
              item.created_at = item.created_at
                .replace("T", " ")
                .substring(0, 19);
            });

            this.loading = false;
            this.data.reverse();
          }
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.loading = false;
        });
    },

    sendRemarks() {
      axios
        .post(
          this.APIServer + "admin/dashboard/add-remark",
          {
            user_id: this.remarksId,
            remarks: this.remarks,
          },
          {
            headers: { Authorization: this.$store.state.token },
          }
        )
        .then((response) => {
          if (response.data.status == "success") {
            console.log(response.data);
            this.remarksModal = false;
            this.openNotificationWithIcon(
              "success",
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
    createUser() {
      let last = this.data[this.data.length - 1];
      this.user.key = last.key + 1;
      this.data.push(this.user);
      this.viewModal = false;
    },
    edit(student) {
      this.editUser = student;
      this.move("/edit-student/" + student._id);
      this.editModal = true;
    },
    update() {
      this.editModal = false;
    },
    // view(record) {

    // },
    viewStudent(record) {
      this.userRecord = record;
      this.viewModal = true;
    },
    deleteItem(item) {
      let index = this.data.indexOf(item);
      if (index !== -1) {
        this.data.splice(index, 1);
      }
    },
    onChangeStatus(item) {
      console.log("dd");

      axios
        .patch(
          this.APIServer + "admin/activeStudentAccount",
          {
            studentId: item._id,
          },

          {
            headers: { Authorization: this.$store.state.token },
          }
        )
        .then((response) => {
          if (response.data) {
            console.log(response.data);
            this.openNotificationWithIcon(
              "success",
              response.data.data,
              "bottomRight"
            );
            this.getAllStudents();
          }
          // console.log(response.data);
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
    },
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
td {
  white-space: normal !important;
  word-wrap: break-word;
}
table {
  table-layout: fixed;
}

.icons-s i {
  margin-top: 10px;
}
</style>
