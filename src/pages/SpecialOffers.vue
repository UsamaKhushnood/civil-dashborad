<template>
  <div class="special-offers">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Special Offers</strong></h5>
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
                <button class="btn btn-primary" @click="move('/create-offer')">
                  <i class="fa fa-plus"></i> New Offer
                </button>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 col-md-4">
                <label for="filter"><strong>Filter By Status</strong></label>
                <select class="form-control" @change="filterSpecialOfferList()" v-model="filterObject.status">
                  <option :value="null">Filter Offers By Status</option>
                  <option value="all">All</option>
                  <option value=1>Active</option>
                  <option value=0>Inactive</option>
                </select>
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Title</strong></label>
                <input
                  type="text"
                  placeholder="Search By Title"
                  class="form-control"
                   @keyup="filterSpecialOfferList()" 
                   v-model="filterObject.title"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <a-table
                  class="table"
                  :columns="columns"
                  :dataSource="data"
                  :scroll="{ x: 2500 }"
                  :loading="loading"
                >
                  <span slot="image" slot-scope="id, record">
                    <b-img
                      v-bind="mainProps1"
                      :src="record.images? record.images[0].image: null"
                    ></b-img>
                  </span>
                  <span slot="status" slot-scope="id, record">
                    <a-switch
                      :checked="getBoolVal(record.status)"
                      @change="onChangeStatus(record)"
                    />
                  </span>
                  <span slot="send">
                    <button class="btn btn-primary btn-sm">Send</button>
                  </span>
                  <span slot="actions" slot-scope="id, record">
                  <i class="fa fa-eye" @click="view(record)"></i>
                    <i class="fa fa-pencil" @click="move(`/edit-offer/${record.id}`)"></i>
                    <i class="fa fa-trash" @click="deleteModal=true;storeRecord=record;"></i>
                  </span>
                </a-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="editModal" scrollable hide-footer title="Update Special Offer">
      <form @submit.prevent>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label for=""><strong>Send By Gender</strong></label>
              <select class="form-control">
                <option :value="null">Select Gender</option>
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for=""><strong>Send By Country</strong></label>
              <select class="form-control">
                <option :value="null">Select Country</option>
                <option value="all">UAE</option>
                <option value="male">India</option>
                <option value="female">United Kingdom</option>
              </select>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Send By User Role</strong></label>
              <select class="form-control">
                <option :value="null">Select User Role</option>
                <option value="all">All</option>
                <option value="male">Trainers</option>
                <option value="female">Students</option>
              </select>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Title (English)</strong></label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Title"
                required
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Subject (English)</strong></label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Title"
                required
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Message (English)</strong></label>
              <vue-editor></vue-editor>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Title (Arabic)</strong></label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Title"
                required
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Subject (Arabic)</strong></label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Title"
                required
              />
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""><strong>Message (Arabic)</strong></label>
              <vue-editor></vue-editor>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary btn-block">Update Special Offer</button>
          </div>
        </div>
      </form>
    </b-modal>

    <b-modal
      v-model="createModal"
      scrollable
      hide-footer
      title="Create Promotion"
    >
      <form @submit.prevent>
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Upload Image</strong></label>
              <input type="file" class="btn btn-primary" required />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Subject (English)</strong></label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Title"
                required
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Message (English)</strong></label>
              <vue-editor></vue-editor>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Title (Arabic)</strong></label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Title"
                required
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Subject (Arabic)</strong></label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Title"
                required
              />
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""><strong>Message (Arabic)</strong></label>
              <vue-editor></vue-editor>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary btn-block">Create Promotion</button>
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

    <b-modal v-model="viewModal" hide-footer title="Special Offer Details">
      <div class="row">
      <div class="col-12 text-center mt-2 mb-3">
          <img v-bind="mainProps1" :src="sorecord.images? sorecord.images[0].image: null" height="150" width="150">
        </div>
        <!-- <div class="col-12 text-center mt-2 mb-3">
                    <b-img v-bind="mainProps" src="https://ptetutorials.com/images/sorecord-profile.png"></b-img>
                </div> -->
        <div class="col-12 col-md-6 mt-2">
          <label for="course_id"><strong>Course Id</strong></label>
          <p>{{ sorecord.course_id }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="title_en"><strong>Course Title</strong></label>
          <p>{{ sorecord.title_en }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="description_en"><strong>Description</strong></label>
          <p>{{ sorecord.description_en }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="before_price"><strong>Price Before</strong></label>
          <p>{{ sorecord.before_price }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="after_price"><strong>Price After</strong></label>
          <p>{{ sorecord.after_price }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="discount"><strong>Discount</strong></label>
          <p>{{ sorecord.discount }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="trainer_id"><strong>Trainer Id</strong></label>
          <p>{{ sorecord.trainer_id }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="promotion_code"><strong>PromoCode</strong></label>
          <p>{{ sorecord.promotion_code }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="status"><strong>Status</strong></label>
          <p>{{ sorecord.status?'Active':'Inactive' }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="trainer_id"><strong>Valid Upto</strong></label>
          <p>{{ sorecord.promotion_end_date }}</p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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
      sorecord: {
        images: null,
        course_id: null,
        title_en: null,
        description_en: null,
        before_price: null,
        after_price: null,
        discount: null,
        promotion_code:null,
        trainer_id:null,
        promotion_end_date:null,
        status: "active",
      },
      deleteModal:false,
      storeRecord:{
        id: null
      },
      filterObject : {
        status: null,
        title: ''
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
      data: [{
        id : 1,
        title_en : "title",
        description_en : "title",
        before_price : "67",
        created_at : '01-10-2020',
       after_price: "89",
       discount : 10,
       promotion_end_date : '01-10-2020',
       promotion_code : "9302khj",
        status : true
      }],
      columns: [
        {
          title: "Image",
          scopedSlots: { customRender: "image" },
        },
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
          title: "Title",
          dataIndex: "title_en",
          sorter: (a, b) => {
            if(!a.title_en){
              a.title_en = '';
            }
            if(!b.title_en){
              b.title_en = '';
            }
            return  a.title_en.localeCompare(b.title_en);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Description",
          dataIndex: "description_en",
          sorter: (a, b) => {
            if(!a.description_en){
              a.description_en = '';
            }
            if(!b.description_en){
              b.description_en = '';
            }
            return  a.description_en.localeCompare(b.description_en);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Price Before",
          dataIndex: "before_price",
          sorter: (a, b) => {
            if(!a.before_price){
              a.before_price = 0;
            }
            if(!b.before_price){
              b.before_price = 0;
            }
            return  (a.before_price - b.before_price);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Price After",
          dataIndex: "after_price",
          sorter: (a, b) => {
            if(!a.after_price){
              a.after_price = 0;
            }
            if(!b.after_price){
              b.after_price = 0;
            }
            return  (a.after_price - b.after_price);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Discount",
          dataIndex: "discount",
          sorter: (a, b) => {
            if(!a.discount){
              a.discount = 0;
            }
            if(!b.discount){
              b.discount = 0;
            }
            return  (a.discount - b.discount);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Validity",
          dataIndex: "promotion_end_date",
          sorter: (a, b) => {
            if(!a.promotion_end_date){
              a.promotion_end_date = '';
            }
            if(!b.promotion_end_date){
              b.promotion_end_date = '';
            }
            return  a.promotion_end_date.localeCompare(b.promotion_end_date);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Promotion Code",
          dataIndex: "promotion_code",
          sorter: (a, b) => {
            if(!a.code){
              a.code = '';
            }
            if(!b.code){
              b.code = '';
            }
            return  a.code.localeCompare(b.code);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Created At",
          dataIndex: "created_at",
          width: "15%",
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
          dataIndex: "actions",
          scopedSlots: { customRender: "actions" },
        },
      ],
    };
  },

  created() {
    // this.getAllSpecialOffers();
  },
  methods: {
    view(data){
      console.log(data)
      this.sorecord = data;
      this.viewModal = true;
    },
    csvExport() {
      let arrData = [];
      arrData.push(...this.data);
      arrData.forEach((item) => {
        delete item.images;
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
      link.setAttribute("download", "Special_Offers.csv");
      link.click();
    },
    openNotificationWithIcon(type, message, placement) {
      this.$notification[type]({
        message: "Response",
        description: message,
        placement,
      });
    },
    exportPDF() {
      var vm = this;
      let columns = [];
      columns.push(...this.columns);
      columns.forEach((item) => {
        item.dataKey = item.dataIndex;
      });
      columns.pop();
      columns.shift();
      var doc = new jsPDF('p', 'pt');
      doc.text('Special Offers', 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: {fontSize : 10, cellPadding: 9, fillColor: [236, 142, 43]},
        bodyStyles: {cellPadding: 6 },
        body: vm.data,
        columns: columns,
      })
      doc.save('Special_Offers.pdf');
    },
    getBoolVal(val){
      if(val===1){
        return true;
      }
      else{
        return false;
      }
    },
    filterSpecialOfferList() {
      axios
        .post(this.APIServer + "special-offer/filter", this.filterObject, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.data = response.data.data;
            console.log(this.data);
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
    getAllSpecialOffers() {
      this.loading = true;
      axios
        .get(this.APIServer + "special-offer/list", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.data = response.data.data;
            console.log(this.data);
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
      this.deleteModal=false;
      axios
        .get(this.APIServer + "special-offer/delete/" + record.id, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.openNotificationWithIcon(
              "success",
              "Special offer deleted successfully"
            );
            this.filterSpecialOfferList();
          }
        })
        .catch((e) => {
          console.log("API failed");
          this.openNotificationWithIcon("error", "Special offer deleting failed");
          console.log(e);
        });
    },
    onChangeStatus(record) {
      axios
        .get(this.APIServer + "special-offer/toggle-status/" + record.id, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log(response.data)
          if (response.data.status == "success") {
            console.log(response.data.data);
            this.filterSpecialOfferList();
          }
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
        });
    },
  },
};
</script>