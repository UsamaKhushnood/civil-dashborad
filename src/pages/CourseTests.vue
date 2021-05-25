<template>
    <div class="tests">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                                <h5><strong>Course Tests</strong></h5>
                                <span class="back" @click="move('/courses')"><i class="fa fa-user"></i> <strong class="back">Courses</strong></span> <i class="fa fa-chevron-right"></i><strong>Course Tests</strong>
                            </div>
                            <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6 text-right">
                                <b-dropdown id="dropdown-left" text="Download" variant="primary" class="m-2">
                                    <b-dropdown-item @click="csvExport()">CSV</b-dropdown-item>
                                    <b-dropdown-item @click="exportPDF()">PDF</b-dropdown-item>
                                </b-dropdown>
                                <button class="btn btn-primary" @click="createModal = !createModal"><i class="fa fa-plus"></i> Create Test</button>
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-12 col-md-4 mt-md-0 mt-3">
                                <label for="filter"><strong>Search By Name</strong></label>
                                <input type="text" placeholder="Search By Name" class="form-control" @keyup="filterCourseList()" v-model="filterObject.name">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <a-table
                                    class="table"
                                    :columns="columns"
                                    :dataSource="data"
                                    :scroll="{x:900}"
                                    :loading="loading">
                                    <span slot="image">
                                        <b-img v-bind="mainProps1" src="https://ptetutorials.com/images/user-profile.png"></b-img>
                                    </span>
                                    <span slot="stars" slot-scope="id, record">
                                        <b-form-rating id="rating-sm-no-border" v-model="record.stars" no-border color="#ff8800" size="sm"></b-form-rating>
                                        <!-- <a-rate :default-value="record.stars" disabled></a-rate> -->
                                    </span>
                                    <span slot="actions" slot-scope="id, record">
                                        <b-dropdown>
                                            <template v-slot:button-content="data" :id="data">
                                                Actions
                                            </template>
                                            <b-dropdown-item @click="editModal = !editModal; edit(id)"><i class="fa fa-pencil"></i> Update Test</b-dropdown-item>
                                            <b-dropdown-item @click="viewQuestions(id)"><i class="fa fa-question-circle"></i> Questions</b-dropdown-item>
                                            <b-dropdown-item @click="deleteModal=true;storeRecord=record;"><i class="fa fa-trash"></i> Delete Test</b-dropdown-item>
                                        </b-dropdown>
                                    </span>
                                </a-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal title="Create Test" v-model="createModal" :hide-footer="true">
            <form @submit.prevent>
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Enter Test Title*</strong></label>
                            <input type="text" class="form-control" placeholder="Enter Test Title" v-model="test.title">
                        </div>
                        <div class="form-group">
                            <label><strong>Enter Questions Limit*</strong></label>
                            <input type="number" class="form-control" placeholder="50" v-model="test.question_limit">
                        </div>
                        <div class="form-group">
                            <label><strong>Enter Passing Percentage*</strong></label>
                            <input type="number" class="form-control" placeholder="%" v-model="test.passing_marks">
                        </div>
                        <div class="form-group">
                            <label><strong> Test Duration (in mins)*</strong></label>
                            <input type="number" class="form-control" placeholder="mins" v-model="test.duration">
                        </div>
                        <div class="form-group">
                            <label><strong>Test Status*</strong></label>
                            <select v-model="test.test_type" class="form-control">
                                <option :value="null">Select Status</option>
                                <option value="basic">Basic</option>
                                <option value="advance">Advance</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <button @click="saveNewTest()" class="btn btn-primary btn-block">Create Test</button>
                        </div>
                    </div>
                </div>
            </form>
        </b-modal>
        <b-modal title="Update Test" v-model="editModal" :hide-footer="true">
            <form @submit.prevent>
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Enter Test Title*</strong></label>
                            <input type="text" class="form-control" placeholder="Enter Test Title"
                            v-model="editTest.title" >
                        </div>
                        <div class="form-group">
                            <label><strong>Enter Questions Limit*</strong></label>
                            <input type="number" class="form-control" placeholder="50" v-model="editTest.question_limit" >
                        </div>
                        <div class="form-group">
                            <label><strong>Enter Passing Percentage*</strong></label>
                            <input type="number" class="form-control" placeholder="%" v-model="editTest.passing_marks" >
                        </div>
                        <div class="form-group">
                            <label><strong>Test Duration(in mins)*</strong></label>
                            <input type="number" class="form-control" placeholder="mins" v-model="editTest.duration" >
                        </div>
                        <div class="form-group">
                            <label><strong>Test Type*</strong></label>
                            <select v-model="editTest.test_type" class="form-control">
                                <option :value="null">Select Type</option>
                                <option value="basic">Basic</option>
                                <option value="advance">Advance</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <button @click="updateTestData" class="btn btn-primary btn-block">Update Test</button>
                        </div>
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
                <div class="col-12 mt-10">
                <span>
                  <button class="btn btn-secondary mr-4" @click="deleteModal=false;">Cancel</button>
                  <button class="btn btn-primary" @click="deleteItem(storeRecord);">Delete</button>
                </span>
                </div>
              </div>
            </form>
          </b-modal>
    </div>
</template>

<script>
import mixin from "../containers/mixin";
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export default {
    name: "users",
    computed: {
      rows() {
        return this.items.length
      }
    },
    data() {
        return {
            storeRecord:{
              id: null
            },
            deleteModal : false,
            filterObject : {
                name: '',
                course_id:this.$route.params.id
            },
            APIServer: process.env.VUE_APP_SERVER_ADDRESS,
            mainProps: { blank: false, blankColor: '#777', width: 80, height: 80},
            mainProps1: { blank: false, blankColor: '#777', width: 30, height: 30},
            editTest: Object,
            image: null,
            editModal: false,
            createModal: false,
            viewModal: false,
            pagination: {},
            loading: false,
            visible: false,
            test:{
                title: null,
                test_type: null,
                course_id: null,
                passing_marks: null,
                duration : null,
                question_limit: null,
            },
            data: [{
              id : 1,
              title : 'titel',
              question_limit : 20,
              passing_marks : 20,
              duration : 20
            }],
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'id',
                    sorter: (a, b) => a.id - b.id,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Title',
                    dataIndex: 'title',
                    sorter: (a, b) => a.title.localeCompare(b.title),
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Question Limit',
                    dataIndex: 'question_limit',
                    sorter: (a, b) => a.question_limit - b.question_limit,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'PassingMarks',
                    dataIndex: 'passing_marks',
                    sorter: (a, b) => a.passing_marks - b.passing_marks,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Duration',
                    dataIndex: 'duration',
                    sorter: (a, b) => a.duration - b.duration,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Actions',
                    scopedSlots: { customRender: 'actions' },
                },
            ]
        }
    },
    mounted() {
      //  this.getAllTests(); 
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
            link.setAttribute("download", "Course_Tests.csv");
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
            doc.text('Course Tests', 40, 50);
            doc.autoTable({
                margin: { top: 70 },
                headStyles: {cellPadding: 9, fillColor: [236, 142, 43] },
                bodyStyles: {cellPadding: 6 },
                body: vm.data,
                columns: columns,
            })
            doc.save('Course_Tests.pdf');
        },
         filterCourseList() {
            axios
            .post(this.APIServer + "course/test/filter", this.filterObject, {
            headers: { Authorization: this.$store.state.token },
            })
            .then((response) => {
              if (response.data.status == "success") {
                this.data = response.data.data;
                this.loading = false;
                this.data.reverse();
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
        },
        move(to) {
            this.$router.push({path: to})
        },
        pickAvatar() {
            this.$refs.AvatarInput.click();
        },
        onAvatarSelected(event) {
            let file = event.target.files[0];
            if(file) {
                this.image = URL.createObjectURL(file)
            }
        },
        createUser() {
            let last = this.data[this.data.length-1]
            this.user.key = last.key+1
            this.data.push(this.user)
            this.viewModal = false
        },
        edit(record) {
            this.editTest = record
            console.log(this.editTest);
            this.editModal = true
        },
        update() {
            this.editModal = false
        },
        // view(record) {

        // },
        viewQuestions(test) {
            this.move("/course/"+ test.id +"/questions")
        },
        deleteItem(test) {
          this.deleteModal = false;
            console.log(test);
            // let index = this.data.indexOf(record);
            // if(index !== -1) {
            //     this.data.splice(index, 1)
            // }
             console.log("deleting test");
                this.loading = true;
          axios
            .get(this.APIServer + "course/test/delete/" + test.id)
            .then((response) => {
              if (response.data.status == "success") {
                this.openNotificationWithIcon(
                  "success",
                  "Test Deleted successfully",
                  "bottomRight"
                );
                this.filterCourseList();
              } else {
                this.openNotificationWithIcon(
                  "warning",
                  response.data.message,
                  "bottomRight"
                );
              }
              console.log(response.data);
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
        },
        onChangeStatus(record) {
            let index = this.data.indexOf(record);
            if(index !== -1) {
                let status = this.data[index].status
                if(status == 'active') {
                    this.data[index].status = 'inactive'
                }
                else {
                    this.data[index].status = 'active'
                }
            }
        },
        getAllTests() {
            this.loading = true;
            axios
            .get(this.APIServer + "course/test/" + this.$route.params.id)
            .then((response) => {
              if (response.data.status == "success") {
                this.data = response.data.data;
                this.loading = false;
                this.data.reverse();
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
        },
        saveNewTest() {
            console.log("saving test");
          let newTest = new FormData();
          newTest.append("title", this.test.title);
          newTest.append("test_type", this.test.test_type);
          newTest.append("course_id", this.$route.params.id);
          newTest.append("passing_marks", this.test.passing_marks);
          newTest.append("duration", this.test.duration);
          newTest.append("question_limit", this.test.question_limit);
          this.loading = true;

          axios
            .post(this.APIServer + "course/test/save", newTest, {
              headers: { Authorization: this.$store.state.token },
            })
            .then((response) => {
              if (response.data.status == "success") {
                this.createModal = false;
                this.openNotificationWithIcon(
                  "success",
                  "Test added successfully",
                  "bottomRight"
                );
                this.test = {
                    title: null,
                    test_type: null,
                    course_id: null,
                    passing_marks: null,
                    duration: null,
                    question_limit: null,
                },
                this.getAllTests();
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
        },
        openNotificationWithIcon(type, message, placement) {
          this.$notification[type]({
            message: "Response",
            description: message,
            placement,
          });
        },
        updateTestData() {
          console.log("updating test");
          let newTest = new FormData();
          newTest.append("title", this.editTest.title);
          newTest.append("test_type", this.editTest.test_type);
          newTest.append("course_id", this.editTest.course_id);
          newTest.append("passing_marks", this.editTest.passing_marks);
          newTest.append("duration", this.editTest.duration);
          newTest.append("question_limit", this.editTest.question_limit);
          
          axios
            .post(this.APIServer + "course/test/update/" + this.editTest.id, newTest)
            .then((response) => {
              if (response.data.status == "success") {
                this.editModal = false;
                this.openNotificationWithIcon(
                  "success",
                  "Test Updated successfully",
                  "bottomRight"
                );
                this.getAllTests();
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
        }
    }
}
</script>