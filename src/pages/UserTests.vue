<template>
  <div class="users">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>User Tests</strong></h5>
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
              <div class="col-12 col-md-4">
                <label for="filter"><strong>Filter By Status</strong></label>
                <select class="form-control" @change="filterUserTestList()" v-model="filterObject.is_passed">
                  <option :value="null">Filter Tests By Status</option>
                  <option value="all">All</option>
                  <option value="passed">Pass</option>
                  <option value="failed">Fail</option>
                </select>
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Student</strong></label>
                <input
                  type="text"
                  placeholder="Search By Student"
                  class="form-control"
                 
                 
                />
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Trainer</strong></label>
                <input
                  type="text"
                  placeholder="Search By Trainer"
                  class="form-control"
                  xs
                  v-model = "filterObject.trainer"
                />
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Course</strong></label>
                <input
                  type="text"
                  placeholder="Search By Course"
                  class="form-control"
                  
                   v-model = "search"
                />
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Date</strong></label>
                <a-range-picker class="date-input" size="default" @change="filterUserTestList()" v-model = "dateRange"/>
              </div>
            </div>

             <div class="row"> 
            <div class="ml-3 mr-3 table-responsive">

                    <table class=" table table-striped overflow-auto"  style="
                    margin-bottom: 1rem;
                    color: black; 
                    display: inline-table;
                    ">
                      <thead class=""> 
                      <tr>
                          <th>id</th>
                          <th>Title</th>
                        
                          <th>Passing Percentage</th>
                        
                          <th>Questions Limit</th>
                          <th>Test Duration</th>
                           <th>Test Type</th>
                            <th>Action</th>
                          <!-- <th>Action</th> -->
                        </tr>
                      </thead>
                      <tbody class="">
                      <tr v-for="(item, itemIndex) in FilterTest" :key="itemIndex">
                        <td>{{item.title}}</td>
                      <td>{{item.course.substring(0,6)+".." }} </td>

                     <td>{{item.passingPercentage}}</td>
                      <td>{{item.questionsLimit}}</td>
                      <td>{{item.testType}}</td>
                      <td> <span class="badge badge-secondary">{{item.status}}</span></td>
                    
                      <td class="action-button"><span icons-s>
                        <i  @click="viewUserData(item)" class="fa fa-eye" aria-hidden="true"></i>
                      

                        <i   v-if=" currentUserRole =='read,write,update,delete' "  @click="deleteModal=true;storeRecord=item;" class="fa fa-trash" aria-hidden="true"></i>  
                         </span>
                         </td>


                    
                      <tr>
                       
                      </tr>
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
                  <span slot="image">
                    <b-img
                      v-bind="mainProps1"
                      src="https://ptetutorials.com/images/user-profile.png"
                    ></b-img>
                  </span>
                  <span slot="result" slot-scope="id, record">
                    <b-badge
                      :variant="record.result == 'passed' ? 'success' : 'danger'"
                      >{{ record.result }}</b-badge
                    >
                  </span>
                  <span slot="actions" slot-scope="id, record">
                    <i class="fa fa-eye" @click="viewModal = !viewModal"></i>
                    <i class="fa fa-pencil" @click="move('/edit-user/1')"></i>
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

    <b-modal v-model="viewModal" hide-footer title="User Details">
      <div class="row">
        
        <div class="col-12 text-center mt-2 mb-3">
          <p>
            <strong class="text-main"
              >Last Edited By Admin 20, July 2020 11:00 AM</strong
            >
          </p>
        </div>
        <!-- <div class="col-12 text-center mt-2 mb-3">
                    <b-img v-bind="mainProps" src="https://ptetutorials.com/images/user-profile.png"></b-img>
                </div> -->
        <div class="col-12 col-md-6 mt-2">
          <label for="first_name"><strong>Title</strong></label>
          <p>{{this.view.title}}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="last_name"><strong>Cource</strong></label>
          <p>{{this.view.course}}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="email"><strong>Passing Percentage</strong></label>
          <p>{{this.view.passingPercentage}}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="mobile"><strong>Test Type</strong></label>
          <p>{{this.view.testType}}</p>
        </div>
       
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import jsPDF from 'jspdf';
import moment from 'moment';
import 'jspdf-autotable';
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
      filterObject : {
        trainer : '',
        student: '',
        is_passed: null,
        course: '',
        date_from: '',
        date_to: ''
      },
      search: '',
      currentUserRole:'',
      APIServer: process.env.VUE_APP_SERVER_ADDRESS,
      mainProps: { blank: false, blankColor: "#777", width: 80, height: 80 },
      mainProps1: { blank: false, blankColor: "#777", width: 30, height: 30 },
      editUser: null,
      image: null,
      editModal: false,
      viewModal: false,
      pagination: {},
      loading: false,
      visible: false,
      items : [],
      view: {
        title: null,
        passingPercentage: null,
        questionsLimit: null,
        testDuration: null,
        testType: null,
        title: null,
      
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
      data: [{
        id : 1,
        created_at: "01-101-1998",
        student : "st1",
        trainer : "tr1",
        course : "eng",
        score : 20,
        result : "pass"
      }],
      columns: [
        {
          title: "ID",
          dataIndex: "course",
        },
         {
          title: "Title",
          dataIndex: "title",
        },
          {
          title: "Passing Percentage",
          dataIndex: "passingPercentage",
        },
        {
          title: "User Test Dte",
          dataIndex: "created_at",
          width: "20%",
          sorter: (a, b) => {
            if(!a.created_at){
              a.created_at = '';
            }
            if(!b.created_at){
              b.created_at = '';
            }
            return  a.created_at.localeCompare(b.created_at);
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
          title: "Course",
          dataIndex: "course",
          sorter: (a, b) => a.course.localeCompare(b.course),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Score",
          dataIndex: "score",
          sorter: (a, b) => {
              if(!a.score){
                a.score = 0;
              }
              if(!b.score){
                b.score = 0;
              }
              return  (a.score - b.score);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Result",
          dataIndex: "result",
          sorter: (a, b) => (a.result.localeCompare(b.result)),
          sortDirections: ["descend", "ascend"],
          scopedSlots: { customRender: "result" },
        },
        // {
        //     title: 'Actions',
        //     scopedSlots: { customRender: 'actions' },
        // },
      ],
    };
  },
  created() {
     this.currentUserRole=sessionStorage.getItem("currentUserRole")
      
      console.log(this.currentUserRole);
    this.getAllTransactionsHistory();
  },
     computed:{
    FilterTest:function(){
      return this.items.filter((item) => {
        return (item.course || '').toLowerCase().indexOf((this.search || '').toLowerCase()) > -1
      });

      
    }

  },
  methods: {
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
      link.setAttribute("download", "User_Tests.csv");
      link.click();
    },

    exportPDF() {
      var vm = this;
      let columns = [];
      columns.push(...this.columns);
      columns.forEach((item) => {
        item.dataKey = item.dataIndex;
      });
      var doc = new jsPDF('p', 'pt');
      doc.text('User Tests', 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: {cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: {cellPadding: 6 },
        body: vm.data,
        columns: columns,
      })
      doc.save('User_Tests.pdf');
    },
     viewUserData(items) {
     
      this.view = items;
      this.viewModal = true;
    
    },
    filterUserTestList() {
      if(this.dateRange && this.dateRange.length!==0 ){
          this.filterObject.date_from = moment(JSON.parse(JSON.stringify(this.dateRange[0]))).format('yyyy-MM-DD');
          this.filterObject.date_to = moment(JSON.parse(JSON.stringify(this.dateRange[1]))).format('yyyy-MM-DD');
      }
      else{
        this.filterObject.date_from = null;
        this.filterObject.date_to = null;
      }
      axios
        .post(this.APIServer + "admin/testresult/filter", this.filterObject, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.data = [];
          if (response.data.status == "success") {
            console.log("response of transaction");
            let data = response.data.data;
            if(!this.filterObject.is_passed || this.filterObject.is_passed==='all'){
              data = data;
            }
            else{
              data = data.filter(val => val.is_passed === this.filterObject.is_passed);
            }
            data.forEach((item) => {
              let response = {
                id : item.id,
                created_at: item.created_at.replace('T',' ').substring(0, 19),
                student: item.student_name.first_name,
                trainer: item.trainer_name.first_name,
                course: item.course_name,
                score: item.result_percentage,
                result: item.is_passed
              }
              this.data = [...this.data, response];
            });
            this.data.reverse();
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
    getAllTransactionsHistory() {
      this.data = [];
      console.log("user test fetching");
      this.loading = true;
      axios
        .get(this.APIServer + "admin/getTests", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log(response)
          if (response.data != '') {
            console.log("response of transaction");
            this.data = response.data
            this.items = response.data
         
          
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
    pickAvatar() {
      this.$refs.AvatarInput.click();
    },
    openNotificationWithIcon(type, message, place) {
      this.$notification[type]({
        message: "Response",
        description: message,
        place,
      });
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