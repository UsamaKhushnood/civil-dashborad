<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-md-6 col-12 col-xl-4 col-lg-4 col-xs-12 col-sm-12 mt-3">
        <div class="card">
          <div class="card-body py-4">
            <div class="row align-items-center">
              <div class="col-md-8 col-8">
                <div class="title text-main align-middle">
                  <i class="fa fa-user"></i> <span class="ml-2">Users</span>
                </div>
              </div>
              <div class="col-md-4 col-4 text-right">
                <div class="number align-middle">{{ totalUsers }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-12 col-xl-4 col-lg-4 col-xs-12 col-sm-12 mt-3">
        <div class="card">
          <div class="card-body py-4">
            <div class="row align-items-center">
              <div class="col-md-8 col-8">
                <div class="title text-main align-middle">
                  <i class="fa fa-list-alt"></i>
                  <span class="ml-2">Categories</span>
                </div>
              </div>
              <div class="col-md-4 col-4 text-right">
                <div class="number align-middle">{{ totalCategories }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-12 col-xl-4 col-lg-4 col-xs-12 col-sm-12 mt-3">
        <div class="card">
          <div class="card-body py-4">
            <div class="row align-items-center">
              <div class="col-md-8 col-8">
                <div class="title text-main align-middle">
                  <i class="fa fa-tag"></i> <span class="ml-2">Courses</span>
                </div>
              </div>
              <div class="col-md-4 col-4 text-right">
                <div class="number align-middle">{{ totalCourses }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 col-xl-4 col-lg-12 col-12 mt-3">
        <h4 class="text-center">Users</h4>
        <apexchart
          type="line"
          height="350"
          :options="chartOptions"
          :series="userSeries"
        ></apexchart>
      </div>
      <div class="col-md-12 col-xl-4 col-lg-12 col-12 mt-3">
        <h4 class="text-center">Trainers</h4>
        <apexchart
          type="line"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
      <div class="col-md-12 col-xl-4 col-lg-12 col-12 mt-3">
        <h4 class="text-center">Students</h4>
        <apexchart
          type="line"
          height="350"
          :options="chartOptions"
          :series="studentSeries"
        ></apexchart>
      </div>
    </div>
  <br><br><br><br>
  <div class="row mb-5">
       <!--  <div class="col-12 mt-3">
        <h5><strong>Todo List</strong></h5>
        <div class="col-12 text-right">
          <button class="btn btn-primary" @click="taskModal = !taskModal">
            <i class="fa fa-plus"></i> Add Task
          </button>
        </div>
        <a-table
          class="table mt-4"
          :columns="columns"
          :dataSource="data"
          :scroll="{ x: 1 }"
        >
          <span slot="actions" slot-scope="id, record">
            <i class="fa fa-pencil" @click="editTaskModal = !editTaskModal"></i>
            <i class="fa fa-trash" @click="deleteItem(record)"></i>
          </span>
        </a-table>
      </div> -->
      <div class="col-12 mt-3">
        <h5 class="mb-4"><strong>Task Calendar</strong></h5>
        <full-calendar :config="config" :events="events" @event-selected="showEvent"/>
      </div>
    </div>
    <b-modal title="Detailed Info" :hide-footer="true" v-model="eventModal">
      <div class="row">
      <div class="col-12 text-center mt-2 mb-3">
          <img :src="course.image" height="150" width="150">
        </div>
        <!-- <div class="col-12 text-center mt-2 mb-3">
                    <b-img v-bind="mainProps" src="https://ptetutorials.com/images/user-profile.png"></b-img>
                </div> -->
        <div class="col-12 col-md-6 mt-2">
          <label for="first_name"><strong>Course Title</strong></label>
          <p>{{ course.booking_course }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="last_name"><strong>Student Name</strong></label>
          <p>{{ course.name }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="email"><strong>Student Email</strong></label>
          <p>{{ course.email }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="mobile"><strong>Trainer Name</strong></label>
          <p>{{ course.tname }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="mobile"><strong>Trainer Email</strong></label>
          <p>{{ course.temail }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="status"><strong>Status</strong></label>
          <p>{{ course.status}}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="gender"><strong>Description</strong></label>
          <p>{{ course.description }}</p>
        </div>
       </div>
    </b-modal>
     <b-modal size="xl" title="Event List" :hide-footer="true" v-model="eventListModal">
      <div class="row">
              <div class="col-md-12">
                <a-table
                  class="table"
                  :columns="columns"
                  :dataSource="eventdata"
                  :scroll="{ x: 900 }"
                >

                <span slot="actions" slot-scope="id, record">
                    <i class="fa fa-eye" @click="getDetail(record.detail_id)"></i>
                  </span>
                </a-table>
              </div>
            </div>
    </b-modal>
<!--
    <b-modal title="Add Task" :hide-footer="true" v-model="taskModal">
      <form @submit.prevent="assigntask">
        <div class="row">
          <div class="col-12 mt-3">
            <div class="form-group">
              <label><strong>Upload Files*</strong></label> <br />
              <input type="file" multiple class="btn btn-primary" />
            </div>
          </div>
          <div class="col-md-6 col-12 mt-3">
            <div class="form-group">
              <label><strong>Task Name*</strong></label>
              <input
                type="text"
                placeholder="Enter Task name"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="col-md-6 col-12 mt-3">
            <div class="form-group">
              <label><strong>Assign To*</strong></label>
              <model-select
                :options="options2"
                v-model="item2"
                placeholder="Select User"
              >
              </model-select>
            </div>
          </div>
          <div class="col-md-6 col-12 mt-1">
            <div class="form-group">
              <label><strong>Start Date*</strong></label>
              <input type="date" class="form-control" required />
            </div>
          </div>
          <div class="col-md-6 col-12 mt-1">
            <div class="form-group">
              <label><strong>End Date*</strong></label>
              <input type="date" class="form-control" required />
            </div>
          </div>
          <div class="col-md-12 col-12 mt-1">
            <div class="form-group">
              <label><strong>Notes*</strong></label>
              <textarea
                class="form-control"
                required
                placeholder="Enter Task Notes..."
              ></textarea>
            </div>
          </div>
          <div class="col-12 mt-2">
            <button class="btn btn-primary btn-block">Add Task</button>
          </div>
        </div>
      </form>
    </b-modal>

    <b-modal title="Edit Task" :hide-footer="true" v-model="editTaskModal">
      <form @submit.prevent="assigntask">
        <div class="row">
          <div class="col-12 mt-3">
            <div class="form-group">
              <label><strong>Upload Files*</strong></label> <br />
              <input type="file" multiple class="btn btn-primary" />
            </div>
          </div>
          <div class="col-md-6 col-12 mt-3">
            <div class="form-group">
              <label><strong>Task Name*</strong></label>
              <input
                type="text"
                placeholder="Enter Task name"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="col-md-6 col-12 mt-3">
            <div class="form-group">
              <label><strong>Assign To*</strong></label>
              <model-select
                :options="options2"
                v-model="item2"
                placeholder="Select User"
              >
              </model-select>
            </div>
          </div>
          <div class="col-md-6 col-12 mt-1">
            <div class="form-group">
              <label><strong>Start Date*</strong></label>
              <input type="date" class="form-control" required />
            </div>
          </div>
          <div class="col-md-6 col-12 mt-1">
            <div class="form-group">
              <label><strong>End Date*</strong></label>
              <input type="date" class="form-control" required />
            </div>
          </div>
          <div class="col-md-12 col-12 mt-1">
            <div class="form-group">
              <label><strong>Notes*</strong></label>
              <textarea
                class="form-control"
                required
                placeholder="Enter Task Notes..."
              ></textarea>
            </div>
          </div>
          <div class="col-12 mt-2">
            <button class="btn btn-primary btn-block">Edit Task</button>
          </div>
        </div>
      </form>
    </b-modal>-->
  </div>
</template>
<script>
import axios from "axios";
import moment from 'moment'
import { ModelSelect } from "vue-search-select";
import mixin from "../containers/mixin";
export default {
  name: "Dashboard",
  components: {
    ModelSelect,
  },
  mixins: [mixin],
  created() {
      //this.trainerChart();
      // this.userChart();
      // this.getDashboardStats();
      // this.studentChart();
      // this.getDashboardEvents();
    // let text = this.uploadImage("calling from dashboard created");
  },
  mounted() {
    this.dashboardInterval = setInterval(()=>{
      // this.trainerChart();
      this.userChart();
      this.getDashboardStats();
      this.studentChart();
      this.getDashboardEvents();
    },10000);
  },
  destroyed(){
    console.log("Destroyed");
    clearInterval(this.dashboardInterval);
  },
  methods: {
    // studentChart(){
    //   axios
    //     .get(this.APIServer + "admin/student/list", {
    //       headers: { Authorization: this.$store.state.token },
    //     })
    //     .then((response) => {
    //       if (response.data.status == "success") {
    //           let firstArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[0]);
    //           let secArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[1]);
    //           let thirdArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[2]);
    //           let fourArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[3]);
    //           let fiveArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[4]);
    //           let sixArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[5]);
    //           let sevenArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[6]);
    //           this.studentSeries = [
    //             {
    //               name: "Students",
    //               data: [firstArr.length, secArr.length, thirdArr.length, fourArr.length, fiveArr.length, sixArr.length, sevenArr.length],
    //             },
    //           ]
    //         }
    //     })
    //     .catch((e) => {
    //       console.log("API failed");
    //       console.log(e);
    //       this.loading = false;
    //     });

    // },
    // userChart(){
    //   axios
    //     .get(this.APIServer + "admin/user/list", {
    //       headers: { Authorization: this.$store.state.token },
    //     })
    //     .then((response) => {
    //       if (response.data.status == "success") {
    //           let firstArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[0]);
    //           let secArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[1]);
    //           let thirdArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[2]);
    //           let fourArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[3]);
    //           let fiveArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[4]);
    //           let sixArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[5]);
    //           let sevenArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[6]);
    //           this.userSeries = [
    //             {
    //               name: "Users",
    //               data: [firstArr.length, secArr.length, thirdArr.length, fourArr.length, fiveArr.length, sixArr.length, sevenArr.length],
    //             },
    //           ]
    //         }
    //     })
    //     .catch((e) => {
    //       console.log("API failed");
    //       console.log(e);
    //       this.loading = false;
    //     });

    // },
    // trainerChart(){
    //   axios
    //     .get(this.APIServer + "admin/trainer/list", {
    //       headers: { Authorization: this.$store.state.token },
    //     })
    //     .then((response) => {
    //       if (response.data.status == "success") {
    //           let firstArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[0]);
    //           let secArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[1]);
    //           let thirdArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[2]);
    //           let fourArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[3]);
    //           let fiveArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[4]);
    //           let sixArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[5]);
    //           let sevenArr = response.data.data.filter(val => val.created_at.split('T')[0] === this.weekArray[6]);
    //           this.series = [
    //             {
    //               name: "Trainers",
    //               data: [firstArr.length, secArr.length, thirdArr.length, fourArr.length, fiveArr.length, sixArr.length, sevenArr.length],
    //             },
    //           ]
    //         }
    //     })
    //     .catch((e) => {
    //       console.log("API failed");
    //       console.log(e);
    //       this.loading = false;
    //     });

    // },
    // getDetail(id){
    //   axios
    //     .get(this.APIServer + "admin/dashboard/get-event-calender-detail/"+id, {
    //       headers: { Authorization: this.$store.state.token },
    //     })
    //     .then((response) => {
    //       if (response.data.status == "success") {
    //         this.course = response.data.data;
    //         this.course.booking_course = this.course.booking_course.title_en;
    //         this.course.name = this.course.booking_student.first_name + " " + this.course.booking_student.last_name;
    //         this.course.email = this.course.booking_student.email;
    //         this.course.tname = this.course.course_trainer.first_name + " " + this.course.course_trainer.last_name;
    //         this.course.temail = this.course.course_trainer.email;
    //         this.eventModal = true;
    //       }
    //     })
    //     .catch((e) => {
    //       console.log("API failed");
    //       console.log(e);
    //     });
    // },
    // deleteItem(record) {
    //   let index = this.data.indexOf(record);
    //   if (index !== -1) {
    //     this.data.splice(index, 1);
    //   }
    // },
    showEvent(event, jsEvent, view){
      this.eventdata = [];
      this.event.title = event.title;
      this.event.start = event.start;
      this.event.end = event.end;
      let response = this.events.filter(val => val.date === event.date )[0];
      console.log(response.event)
      response.event.forEach(item=>{
        let data = {
          id : item.event_id,
          description:item.event_description,
          title:item.event_title,
          detail_id : item.id,
          added_by:item.added_by.first_name+" "+item.added_by.last_name,
          created_date:item.created_at
        }
        this.eventdata = [...this.eventdata,data];
      })
      this.eventListModal= true;
    },
    getDashboardStats() {
      axios
        .get(this.APIServer + "admin/dashboard/get", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.message == "Success") {
            this.totalCategories = response.data.total_categories;
            this.totalUsers = response.data.total_users;
            this.totalCourses = response.data.total_course;
          }
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
        });
    },
    getDashboardEvents() {
      axios
        .get(this.APIServer + "admin/dashboard/get-event-calender", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            console.log(response.data.data);
            this.events = response.data.data;
            this.events.forEach((item) => {
              item.start = item.date;
              item.title = item.event.length + " Courses Booked";
            });
          }
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
        });
    },
  },
  data() {
    return {
      dashboardInterval:null,
      userMax : 5,
      userSeries: [],
      studentSeries:[],
      weekArray : [
        moment().subtract(6, 'days').format('yyyy-MM-DD'),
        moment().subtract(5, 'days').format('yyyy-MM-DD'),
        moment().subtract(4, 'days').format('yyyy-MM-DD'),
        moment().subtract(3, 'days').format('yyyy-MM-DD'),
        moment().subtract(2, 'days').format('yyyy-MM-DD'),
        moment().subtract(1, 'days').format('yyyy-MM-DD'),
        moment().format('yyyy-MM-DD')
        ],
      eventdata : [],
      course : Object,
      eventListModal : false,
      event:{
        title : null,
        description:null,
        start: null,
        end: null
      },
      eventModal:false,
      APIServer: process.env.VUE_APP_SERVER_ADDRESS,
      totalCategories: null,
      totalUsers: null,
      totalCourses: null,
      taskModal: false,
      editTaskModal: false,
      options2: [
        { value: "1", text: "John Doe" },
        { value: "2", text: "Mark Wood" },
        { value: "3", text: "David Hussey" },
        { value: "4", text: "Peter Moore" },
      ],
      item2: "",
      data: [
        {
          key: "1",
          task_name: "New Task",
          assigned_to: "John Doe",
          start_date: "2020-7-16",
          end_date: "2020-7-20",
        },
        {
          key: "2",
          task_name: "New Task",
          assigned_to: "John Doe",
          start_date: "2020-7-16",
          end_date: "2020-7-20",
        },
        {
          key: "3",
          task_name: "New Task",
          assigned_to: "John Doe",
          start_date: "2020-7-16",
          end_date: "2020-7-20",
        },
      ],
      columns: [
        {
          title: "Event Id",
          dataIndex: "id",
        },
        {
          title: "Event Title",
          dataIndex: "title",
        },
        {
          title: "Description",
          dataIndex: "description",
        },
        {
          title: "Created Date",
          dataIndex: "created_date",
        },
        {
          title: "Added By",
          dataIndex: "added_by",
        },
        {
          title: "Actions",
          scopedSlots: { customRender: "actions" },
        },
      ],
      events: [],
      color: 'yellow',   // an option!
      textColor: 'black',
      config: {
        defaultView: "month",
        eventRender: function (event, element) {
          console.log(event, element);
        },
      },

      series: [],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          y: {
            formatter: function(value){
            return value.toFixed();
            }
        }
        },
        stroke: {
          width: 7,
          curve: "smooth",
        },
        xaxis: {
          type: "category",
          tickPlacement: 'on',
          categories: [
            moment().subtract(6, 'days').format('DD MMM'),
            moment().subtract(5, 'days').format('DD MMM'),
            moment().subtract(4, 'days').format('DD MMM'),
            moment().subtract(3, 'days').format('DD MMM'),
            moment().subtract(2, 'days').format('DD MMM'),
            moment().subtract(1, 'days').format('DD MMM'),
            moment().format('DD MMM')
        ]
        },
        title: {
          text: "",
          align: "left",
          style: {
            fontSize: "16px",
            color: "#666",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
        markers: {
          size: 4,
          colors: ["#FFA41B"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7,
          },
        },
        yaxis: {
          min: 0,
          tickAmount: 6,
          title: {
            text: "Count",
          },
        },
      },
    };
  },
};
</script>
<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  vertical-align: middle;
}
.number {
  font-size: 30px;
  font-weight: bold;
}
</style>