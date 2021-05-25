<template>
    <div class="questions">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                                <h5><strong>Course Questions</strong></h5>
                                <span class="back" @click="move('/courses')"><i class="fa fa-user"></i> <strong class="back">Courses</strong></span> <i class="fa fa-chevron-right"></i> <span class="back" @click="move('/course/1/tests')"><i class="fa fa-user"></i> <strong class="back">Course Tests</strong></span> <i class="fa fa-chevron-right"></i><strong>Test Questions</strong>
                            </div>
                            <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6 text-right">
                                <b-dropdown id="dropdown-left" text="Download" variant="primary" class="m-2">
                                    <b-dropdown-item @click="csvExport()">CSV</b-dropdown-item>
                                    <b-dropdown-item @click="exportPDF()">PDF</b-dropdown-item>
                                </b-dropdown>
                                <button class="btn btn-primary" 
                                 @click="createModal = !createModal"
                                 @change="uploadImage"
                                 ><i class="fa fa-plus"></i> Create Question</button>
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-12 col-md-4">
                                <label for="filter"><strong>Filter By Status</strong></label>
                                <select class="form-control" @change="filterCourseList()" v-model="filterObject.status">
                                    <option :value="null">Filter Questions By Status</option>
                                    <option value="all">All</option>
                                    <option value=1>Active</option>
                                    <option value=0>Inactive</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-4 mt-md-0 mt-3">
                                <label for="filter"><strong>Search By Question</strong></label>
                                <input type="text" placeholder="Search By Question" class="form-control" @keyup="filterCourseList()" v-model="filterObject.question">
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
                                    <span slot="status" slot-scope="id, record">
                                        <a-switch :checked="record.status == 'active'"  @change="onChangeStatus(record)" />
                                    </span>
                                    <span slot="actions" slot-scope="id, record">
                                        <b-dropdown>
                                            <template v-slot:button-content>
                                                Actions
                                            </template>
                                            <b-dropdown-item @click="editModal = !editModal; edit(id);"><i class="fa fa-pencil"></i> Update Question</b-dropdown-item>
                                            <b-dropdown-item @click="deleteModal=true;storeRecord=record;"><i class="fa fa-trash"></i> Delete Question</b-dropdown-item>
                                        </b-dropdown>
                                    </span>
                                </a-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal title="Create Question" v-model="createModal" :hide-footer="true">
            <form @submit.prevent>
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Upload Question Image*</strong></label> <br>
                            <input
                                type="file"
                                class="btn btn-primary"
                                accept="image/*"
                                @change="uploadImage"
                                ref="AvatarInput"
                                />
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Upload Audio*</strong></label> <br>
                            <input
                                type="file"
                                accept="audio/*"
                                class="btn btn-primary"
                                @change="uploadAudio"
                                ref="AvatarInput2"
                                />
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Enter Question*</strong></label>
                            <input type="text" v-model="question.question" class="form-control" placeholder="Enter Question">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Enter Option A*</strong></label>
                            <input type="text" v-model="question.option_a" class="form-control" placeholder="Enter Option A">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Enter Option B*</strong></label>
                            <input type="text" v-model="question.option_b" class="form-control" placeholder="Enter Option B">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Enter Option C*</strong></label>
                            <input type="text" v-model="question.option_c" class="form-control" placeholder="Enter Option C">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Enter Option D*</strong></label>
                            <input type="text" v-model="question.option_d" class="form-control" placeholder="Enter Option D">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Enter Answer*</strong></label>
                            <input type="text" v-model="question.answer" class="form-control" placeholder="Enter Answer">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <button @click="saveNewQuestion()" class="btn btn-primary btn-block">Create Question</button>
                        </div>
                    </div>
                </div>
            </form>
        </b-modal>

        <b-modal title="Update Question" v-model="editModal" :hide-footer="true">
            <form @submit.prevent>
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Upload Question Image*</strong></label> <br>
                            <input
                                type="file"
                                class="btn btn-primary"
                                accept="image/*"
                                @change="uploadImage"
                                ref="AvatarInput"
                                />
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Upload Audio*</strong></label> <br>
                            <input
                                type="file"
                                accept="audio/*"
                                class="btn btn-primary"
                                @change="uploadAudio"
                                ref="AvatarInput2"
                                />
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Enter Question*</strong></label>
                            <input type="text" v-model="editQuestion.question" class="form-control" placeholder="Enter Question">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Enter Option A*</strong></label>
                            <input type="text" v-model="editQuestion.option_a" class="form-control" placeholder="Enter Option A">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Enter Option B*</strong></label>
                            <input type="text" v-model="editQuestion.option_b" class="form-control" placeholder="Enter Option B">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Enter Option C*</strong></label>
                            <input type="text" v-model="editQuestion.option_c" class="form-control" placeholder="Enter Option C">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Enter Option D*</strong></label>
                            <input type="text" v-model="editQuestion.option_d" class="form-control" placeholder="Enter Option D">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label><strong>Enter Answer*</strong></label>
                            <input type="text" v-model="editQuestion.answer" class="form-control" placeholder="Enter Answer">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <button class="btn btn-primary btn-block" @click="updateQuestion()">Update Question</button>
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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from "axios";
export default {
    name: "users",
    computed: {
      rows() {
        return this.data.length
      }
    },
    mounted() {
        // console.log(this.$route.params.id);
        // this.getAllQuestions();
    },
    data() {
        return {
            deleteModal:false,
            storeRecord:{
                id: null
            },
            filterObject : {
                status : null,
                question: '',
                test_id: this.$route.params.id
            },
            APIServer: process.env.VUE_APP_SERVER_ADDRESS,
            mainProps: { blank: false, blankColor: '#777', width: 80, height: 80},
            mainProps1: { blank: false, blankColor: '#777', width: 30, height: 30},
            editQuestion: Object,
            image: null,
            editModal: false,
            createModal: false,
            viewModal: false,
            pagination: {},
            audio:null,
            loading: false,
            visible: false,
            question:{
                course_test_id: null,
                image: null,
                question: null,
                option_a: null,
                option_b: null,
                option_c: null,
                option_d: null,
                answer: null
            },
            data: [{
                image : null,
                id : 1,
                question : "sdjfh",
                option_a : 'a',
                option_b : "b",
                option_c: "c",
                option_d: "d",
                answer: "a"
            }],
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'id',
                    sorter: (a, b) => {
                        if(!a.id){
                            a.id = 0;
                        }
                        if(!b.id){
                            b.id = 0;
                        }
                        return  (a.id - b.id);
                    },
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Question',
                    dataIndex: 'question',
                    sorter: (a, b) => a.question.localeCompare(b.question),
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Option A',
                    dataIndex: 'option_a',
                    sorter: (a, b) => a.option_a.localeCompare(b.option_a),
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Option B',
                    dataIndex: 'option_b',
                    sorter: (a, b) => a.option_b.localeCompare(b.option_b),
                    sortDirections: ['descend', 'ascend'],
                },{
                    title: 'Option C',
                    dataIndex: 'option_c',
                    sorter: (a, b) => a.option_c.localeCompare(b.option_c),
                    sortDirections: ['descend', 'ascend'],
                },{
                    title: 'Option D',
                    dataIndex: 'option_d',
                    sorter: (a, b) => a.option_d.localeCompare(b.option_d),
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Answer',
                    dataIndex: 'answer',
                    sorter: (a, b) => a.answer.localeCompare(b.answer),
                },
                {
                    title: 'Actions',
                    scopedSlots: { customRender: 'actions' },
                },
            ]
        }
    },


    methods: {
        filterCourseList() {
            axios
            .post(this.APIServer + "test/question/filter", this.filterObject, {
            headers: { Authorization: this.$store.state.token },
            })
            .then((response) => {
                this.data = response.data.data;
                this.data.reverse();
              if (response.data.status == "success") {
                this.loading = false;
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
        deleteItem(record) {
        this.deleteModal=false;
        axios
            .get(this.APIServer + "test/question/delete/" + record.id, {
            headers: { Authorization: this.$store.state.token },
            })
            .then((response) => {
            this.filterCourseList();
            if (response.data.status == "success") {
                this.openNotificationWithIcon(
                "success",
                "Question deleted successfully"
                );
            }
            else{
                this.openNotificationWithIcon(
                "error",
                response.data.code
                );
            }
            })
            .catch((e) => {
            console.log("API failed");
            this.openNotificationWithIcon("error", "Course deleting failed");
            console.log(e);
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
            link.setAttribute("download", "Course_Questions.csv");
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
            doc.text('Course Questions', 40, 50);
            doc.autoTable({
                margin: { top: 70 },
                headStyles: {cellPadding: 9, fillColor: [236, 142, 43] },
                bodyStyles: {cellPadding: 6 },
                body: vm.data,
                columns: columns,
            })
            doc.save('Course_Questions.pdf');
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
            this.editQuestion = record
            this.editModal = true
        },
        update() {
            this.editModal = false
        },
        openNotificationWithIcon(type, message, placement) {
          this.$notification[type]({
            message: "Response",
            description: message,
            placement,
          });
        },
        // view(record) {

        // },
        // deleteItem(record) {
            // let index = this.data.indexOf(record);
            // if(index !== -1) {
            //     this.data.splice(index, 1)
            // }
        //},
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
       uploadAudio(e){
            const files = e.target.files;
            console.log(files);
            const data = new FormData();
            data.append("file", files[0]);
            data.append("upload_preset", "hammad");
                axios
                .post("https://api.cloudinary.com/v1_1/dz5fltj9r/upload", data)
                .then((response) => {
                    console.log(response.data);
                    this.audio = response.data.secure_url;
                    this.openNotificationWithIcon(
                    "success",
                    "Audio uploaded to cloudinary",
                    "bottomRight"
                    );
                })
                .catch((e) => {
                    console.log("API failed");
                    console.log(e);
                    this.openNotificationWithIcon(
                    "error",
                    "Audio upload failed",
                    "bottomRight"
                    );
                    // return null;
                });
        },
        uploadImage(event) {
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
                this.image = response.data.secure_url;
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
        getAllQuestions() {
            this.loading = true;
            axios
            .get(this.APIServer + "test/question/list/" + this.$route.params.id)
            .then((response) => {
                this.data = response.data.data;
                this.data.reverse();
              if (response.data.status == "success") {
                this.loading = false;
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
        saveNewQuestion() {
            console.log("saving question");
          let newQuestion = new FormData();
          newQuestion.append("course_test_id", this.$route.params.id);
          newQuestion.append("image", this.image);
          newQuestion.append("audio", this.audio);
          newQuestion.append("question", this.question.question);
          newQuestion.append("option_a", this.question.option_a);
          newQuestion.append("option_b", this.question.option_b);
          newQuestion.append("option_c", this.question.option_c);
          newQuestion.append("option_d", this.question.option_d);
          newQuestion.append("answer", this.question.answer);
          this.loading = true;

          axios
            .post(this.APIServer + "test/question/save", newQuestion)
            .then((response) => {
              if (response.data.status == "success") {
                this.createModal = false;
                this.loading = false;
                this.openNotificationWithIcon(
                  "success",
                  "Question added successfully",
                  "bottomRight"
                );
                this.question={
                    course_test_id: null,
                    image: null,
                    question: null,
                    option_a: null,
                    option_b: null,
                    option_c: null,
                    option_d: null,
                    answer: null
                },
                this.filterCourseList();
                this.image = null;
                this.audio = null;
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
        updateQuestion() {
            console.log("updating question");
          let newQuestion = new FormData();
          newQuestion.append("course_test_id", this.$route.params.id);
          newQuestion.append("image", this.image);
          newQuestion.append("audio", this.audio);
          newQuestion.append("question", this.editQuestion.question);
          newQuestion.append("option_a", this.editQuestion.option_a);
          newQuestion.append("option_b", this.editQuestion.option_b);
          newQuestion.append("option_c", this.editQuestion.option_c);
          newQuestion.append("option_d", this.editQuestion.option_d);
          newQuestion.append("answer", this.editQuestion.answer);
          this.loading = true;

          axios
            .post(this.APIServer + "test/question/update/" + this.editQuestion.id, newQuestion)
            .then((response) => {
                 this.editModal = false;
                this.loading = false;
              if (response.data.status == "success") {
               
                this.openNotificationWithIcon(
                  "success",
                  "Question updated successfully",
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
              this.filterCourseList();
              this.image = null;
              this.audio = null;
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
        deleteQuestion(question) {
            console.log("Deleting question");
          this.loading = true;

          axios
            .get(this.APIServer + "test/question/delete/" + question.id)
            .then((response) => {
              if (response.data.status == "success") {
                this.loading = false;
                this.openNotificationWithIcon(
                  "success",
                  "Question deleted successfully",
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