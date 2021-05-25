<template>
  <div class="transaction-history">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Transaction History</strong></h5>
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
              <div class="col-12 col-md-4 col-lg-3">
                <label for="filter"><strong>Filter By Status</strong></label>
                <select class="form-control"  @change="filterTransactionsHistoryList()" v-model="filterObject.status">
                  <option :value="null">Filter Transactions By Status</option>
                  <option value="all">All</option>
                  <option value=0>Pending</option>
                  <option value=1>Done</option>
                  <option value=3>Cancelled</option>
                </select>
              </div>
              <div class="col-12 col-md-4 col-lg-3 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Student</strong></label>
                <input
                  type="text"
                  placeholder="Enter Student Name"
                  class="form-control"
                   @keyup = "filterTransactionsHistoryList()"
                  v-model = "filterObject.student"
                />
              </div>
              <div class="col-12 col-md-4 col-lg-3 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Trainer</strong></label>
                <input
                  type="text"
                  placeholder="Enter Trainer Name"
                  class="form-control"
                   @keyup = "filterTransactionsHistoryList()"
                  v-model = "filterObject.trainer"
                />
              </div>
              <div class="col-12 col-md-4 col-lg-3 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Date</strong></label>
                <a-range-picker class="date-input" size="default" @change="filterTransactionsHistoryList()" v-model = "dateRange"/>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <a-table
                  class="table"
                  :columns="columns"
                  :dataSource="data"
                  :scroll="{ x: 1600 }"
                  :loading="loading"
                >
                  <span slot="image">
                    <b-img
                      v-bind="mainProps1"
                      src="https://ptetutorials.com/images/user-profile.png"
                    ></b-img>
                  </span>
                  <span slot="status" slot-scope="id, record">
                    <b-badge :variant="getColor(record.status)">{{
                      record.status
                    }}</b-badge>
                  </span>
                  <span slot="actions" slot-scope="id, record">
                    <i class="fa fa-eye" @click="view(record)"></i>
                    <i
                      class="fa fa-pencil"
                      @click="editStatusModel(record)"
                    ></i>
                  </span>
                </a-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="viewModal" hide-footer title="Transaction History Detail">
      <div class="row">
      <div class="col-12 text-center mt-2 mb-3">
          <img v-bind="mainProps1" :src="transaction.image" height="150" width="150">
        </div>
      <!-- <div class="col-12 text-center mt-2 mb-3">
                    <b-img v-bind="mainProps" src="https://ptetutorials.com/images/user-profile.png"></b-img>
                </div> -->
        <div class="col-12 col-md-6 mt-2">
          <label for="id"><strong>Transaction Id</strong></label>
          <p>{{ transaction.id }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="student_id"><strong>Student Id</strong></label>
          <p>{{ transaction.student_id }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="student"><strong>Student Name</strong></label>
          <p>{{ transaction.student }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="trainer"><strong>Trainer Name</strong></label>
          <p>{{ transaction.trainer }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="student"><strong>Student Email</strong></label>
          <p>{{ transaction.student_email }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="trainer"><strong>Trainer Email</strong></label>
          <p>{{ transaction.trainer_email }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="course_id"><strong>Course Id</strong></label>
          <p>{{ transaction.course_id }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="course"><strong>Course</strong></label>
          <p>{{ transaction.course }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="status"><strong>Status</strong></label>
          <p>{{ transaction.status}}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="amount"><strong>Amount</strong></label>
          <p>{{ transaction.amount }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="amount"><strong>Description</strong></label>
          <p>{{ transaction.description }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="payment_mode"><strong>Payment Mode</strong></label>
          <p>{{ transaction.payment_mode }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="created_at"><strong>Created At</strong></label>
          <p>{{ transaction.created_at }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="updated_at"><strong>Updated At</strong></label>
          <p>{{ transaction.updated }}</p>
        </div>
      </div>
    </b-modal>
    <b-modal title="Update Status" v-model="editModal" :hide-footer="true">
      <form @submit.prevent>
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <label for="filter"><strong>Update Status</strong></label>
              <select class="form-control" v-model="currentStatus">
                <option :value="null">Select Status</option>
                <option value="0">Pending</option>
                <option value="1">Completed</option>
                <option value="3">Cancelled</option>
              </select>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <button
                class="btn btn-primary btn-block"
                @click="updateStatusOfTransaction()"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment'
export default {
  name: "users",
  computed: {
    rows() {
      return this.items.length;
    },
  },
  data() {
    return {
      transaction: {
        id:null,
        student : '',
        trainer: '',
        course: '',
        status: null,
        amount: null,
        created_at: '',
        student_id : null,
        course_id : null,
        student_email : null,
        trainer_email : null,
        updated : null,
        description : null,
        payment_mode: null,
        image:null
      },
      filterObject : {
        student : '',
        trainer: '',
        status: null,
        date_from: '',
        date_to: ''
      },
      dateRange : null,
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
      editRecord: null,
      currentStatus: null,
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
        student : "test123",
        trainer : "trainer",
        created_at : "01-1-2020",
        course : "eng",
        amount : 201,
        status : true
      }],
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          sorter: (a, b) => {
              if(!a.id){
                a.id = 0;
              }
              if(!b.id){
                b.id = 0;
              }
              return  (a.id - b.id);
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
          dataIndex: "created_at",
          width: "20%",
          sorter: (a, b) => a.created_at.localeCompare(b.created_at),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Course",
          dataIndex: "course",
        },
        {
          title: "Amount",
          dataIndex: "amount",
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
    // this.getAllTransactionsHistory();
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
      link.setAttribute("download", "Transaction_History.csv");
      link.click();
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
      doc.text('Transaction History', 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: {cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: {cellPadding: 6 },
        body: vm.data,
        columns: columns,
      })
      doc.save('Transaction_History.pdf');
    },
    filterTransactionsHistoryList() {
      this.data=[];
      if(this.dateRange && this.dateRange.length!==0 ){
          this.filterObject.date_from = moment(JSON.parse(JSON.stringify(this.dateRange[0]))).format('yyyy-MM-DD');
          this.filterObject.date_to = moment(JSON.parse(JSON.stringify(this.dateRange[1]))).format('yyyy-MM-DD');
      }
      else{
        this.filterObject.date_from = null;
        this.filterObject.date_to = null;
      }
      axios
        .post(this.APIServer + "admin/transactions/filter", this.filterObject, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            console.log("response of transaction");
            response.data.data.forEach((d) => {
              let object = {
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
                status: d.transaction_history.status,
                amount: d.transaction_history.price,
                student_id : d.student_id,
                course_id : d.course_id,
                student_email : d.booking_student.email,
                trainer_email : d.course_trainer.email,
                updated : d.updated_at,
                description : d.description,
                payment_mode: d.transaction_history.payment_mode,
                image:d.image
              };
              this.data.push(object);
            });
            this.data.reverse();
            // this.data = response.data.data;
            console.log(response.data.data);
            // this.coursesData = response.data.data;
          }
          this.loading = false;
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.loading = false;
        });
    },
    view(record){
      this.transaction = record;
      this.viewModal = true;
    },
    editStatusModel(record) {
      //   console.log(record);
      this.editRecord = record;
      if (record.status == "pending") this.currentStatus = 0;
      else if (record.status == "completed") this.currentStatus = 1;
      else if (record.status == "cancelled") this.currentStatus = 3;
      this.editModal = true;
    },
    updateStatusOfTransaction() {
        console.log(this.editRecord)
      axios
        .post(
          this.APIServer +
            "admin/transactions/change-status/" +
            this.editRecord.id,
          {
            status: this.currentStatus,
          },
          {
            headers: { Authorization: this.$store.state.token },
          }
        )
        .then((response) => {
          if (response.data.status == "success") {
              this.editModal=false;
            this.openNotificationWithIcon(
              "success",
              response.data.data.message,
              "bottomRight"
            );
            this.getAllTransactionsHistory();
          } else {
            this.openNotificationWithIcon(
              "warning",
              response.data.data.message,
              "bottomRight"
            );
          }
          console.log(response.data);
        })
        .catch((e) => {
             this.editModal=false;
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
    getAllTransactionsHistory() {
      this.loading = true;
      this.data=[];
      axios
        .get(this.APIServer + "admin/transactions/get", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            console.log("response of transaction");
            response.data.data.forEach((d) => {
              let object = {
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
                status: d.transaction_history.status,
                amount: d.transaction_history.price,
                student_id : d.student_id,
                course_id : d.course_id,
                student_email : d.booking_student.email,
                trainer_email : d.course_trainer.email,
                updated : d.updated_at,
                description : d.description,
                payment_mode: d.transaction_history.payment_mode,
                image:d.image
              };
              this.data.push(object);
            });
            // this.data = response.data.data;
            console.log(response.data.data);
            // this.coursesData = response.data.data;
          }
          this.loading = false;
          this.data.reverse();
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.loading = false;
        });
    },
    convertStatus(stat) {
      if (stat == 0) return "pending";
      else if (stat == 1) return "completed";
      else if (stat == 2) return "cancelled";
    },
    move(to) {
      this.$router.push({ path: to });
    },
    pickAvatar() {
      this.$refs.AvatarInput.click();
    },
    getColor(status) {
      if (status == "pending") {
        return "primary";
      }
      if (status == "done") {
        return "success";
      }
      if (status == "cancelled") {
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
    openNotificationWithIcon(type, message, place) {
      this.$notification[type]({
        message: "Response",
        description: message,
        place,
      });
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