<template>
    <div class="reviews">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                                <h5><strong>Course Reviews</strong></h5>
                                <span class="back" @click="move('/courses')"><i class="fa fa-user"></i> <strong class="back">Courses</strong></span> <i class="fa fa-chevron-right"></i><strong>Course Reviews</strong>
                            </div>
                            <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6 text-right">
                                <b-dropdown id="dropdown-left" text="Download" variant="primary" class="m-2">
                                    <b-dropdown-item @click="csvExport()">CSV</b-dropdown-item>
                                    <b-dropdown-item @click="exportPDF()">PDF</b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-12 col-md-4 mt-md-0 mt-3">
                                <label for="filter"><strong>Search By Name</strong></label>
                                <input type="text" placeholder="Search By Name" class="form-control" @keyup="filterCourseList()" v-model="filterObject.name">
                            </div>
                            <!-- <div class="col-12 col-md-4 mt-md-0 mt-3">
                                <label for="filter"><strong>Search By Rating</strong></label>
                                <input type="text" placeholder="Search By Rating" class="form-control" @keyup="filterCourseList()" v-model="filterObject.rating">
                            </div>-->
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
                                        <b-form-rating id="rating-sm-no-border" v-model="record.rating" no-border color="#ff8800" size="sm" style="pointer-events: none;"></b-form-rating>
                                        <!-- <a-rate :default-value="record.stars" disabled></a-rate> -->
                                    </span>
                                    <span slot="actions" slot-scope="id, record">
                                        <i class="fa fa-trash" @click="deleteModal=true;storeRecord=record;"></i>
                                    </span>
                                </a-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
    created() {
    //    this.getAllReviews(); 
    },
    data() {
        return {
            deleteModal:false,
            storeRecord:{
                id: null
            },
            filterObject : {
                name: '',
                // rating: null,
                course_id:this.$route.params.id
            },
            APIServer: process.env.VUE_APP_SERVER_ADDRESS,
            mainProps: { blank: false, blankColor: '#777', width: 80, height: 80},
            mainProps1: { blank: false, blankColor: '#777', width: 30, height: 30},
            editUser: null,
            image: null,
            editModal: false,
            createModal: false,
            viewModal: false,
            pagination: {},
            loading: false,
            visible: false,
            user:{
                first_name: null,
                last_name: null,
                email: null,
                mobile: null,
                nationality: null,
                image: null,
                job_title: null,
                status: 'active'
            },
            data: [{
                image : null,
                id : 1,
                name : 'reuiy',
                rating : 5,
                comment: 'dsfsjdlkfk',
          }],
            columns: [
                {
                    title: 'Image',
                    scopedSlots: { customRender: 'image' },
                },
                {
                    title: 'ID',
                    dataIndex: 'id',
                    sorter: (a, b) => a.id - b.id,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Rating',
                    dataIndex: 'rating',
                    sorter: (a, b) => a.stars - b.stars,
                    scopedSlots: { customRender: 'stars' },
                },
                {
                    title: 'Feedback',
                    dataIndex: 'comment',
                },
                {
                    title: 'Actions',
                    scopedSlots: { customRender: 'actions' },
                },
            ]
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
            link.setAttribute("download", "Course_Reviews.csv");
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
            var doc = new jsPDF('p', 'pt');
            doc.text('Course Reviews', 40, 50);
            doc.autoTable({
                margin: { top: 70 },
                headStyles: {cellPadding: 9, fillColor: [236, 142, 43] },
                bodyStyles: {cellPadding: 6 },
                body: vm.data,
                columns: columns,
            })
            doc.save('Course_Reviews.pdf');
        },
        filterCourseList() {
            this.data = [];
            this.loading = true;
            axios
            .post(this.APIServer + "course/reviews/filter", this.filterObject, {
            headers: { Authorization: this.$store.state.token },
            })
            .then((response) => {
              if (response.data.status == "success") {
                let array = response.data.data;
                this.data = [];
                array.forEach((item) => {
                    let data = {
                        id : item.id,
                        rating: item.rating,
                        comment: item.comment,
                        name: item.user_review.first_name,
                        image: item.user_review.image
                    }
                    this.data = [...this.data, data];
                });
                this.data.reverse();
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
            .get(this.APIServer + "course/reviews/delete/" + record.id, {
            headers: { Authorization: this.$store.state.token },
            })
            .then((response) => {
            this.filterCourseList();
            if (response.data.status == "success") {
                this.openNotificationWithIcon(
                "success",
                "Course Review deleted successfully"
                );
                this.filterCourseList();
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
            this.editUser = record
            this.editModal = true
        },
        update() {
            this.editModal = false
        },
        getAllReviews() {
            this.data = [];
            this.loading = true;
            axios
            .get(this.APIServer + "course/reviews/" + this.$route.params.id)
            .then((response) => {
              if (response.data.status == "success") {
                let array = response.data.data;
                array.forEach((item) => {
                    let data = {
                        id : item.id,
                        rating: item.rating,
                        comment: item.comment,
                        name: item.user_review.first_name,
                        image: item.user_review.image
                    }
                    this.data = [...this.data, data];
                });
                this.data.reverse();
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
        // view(record) {

        // },
        // deleteItem(record) {
        //     let index = this.data.indexOf(record);
        //     if(index !== -1) {
        //         this.data.splice(index, 1)
        //     }
        // },
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
        }
    }
}
</script>