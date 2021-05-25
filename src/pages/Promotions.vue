<template>
  <div class="promotions">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Promotions</strong></h5>
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
                <button
                  class="btn btn-primary"
                  @click="createModal = !createModal"
                >
                  <i class="fa fa-plus"></i> New Promotion
                </button>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 col-md-4">
                <label for="filter"><strong>Filter By Status</strong></label>
                <select class="form-control" @change = "filterPromotionsList()"
                  v-model = "filterObject.status">
                  <option :value="null">Filter Categories By Status</option>
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
                  @keyup = "filterPromotionsList()"
                  v-model = "filterObject.title"
                />
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Subject</strong></label>
                <input
                  type="text"
                  placeholder="Search By Subject"
                  class="form-control"
                  @keyup = "filterPromotionsList()"
                  v-model = "filterObject.subject"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <a-table
                  class="table"
                  :columns="columns"
                  :dataSource="data"
                  :scroll="{ x: 1500 }"
                  :loading="loading"
                >
                  <span slot="status" slot-scope="id, data">
                    <a-switch
                      :checked="getBoolVal(data.status)"
                      @click="onChangeStatus(data)"
                    />
                  </span>
                  <span slot="send" slot-scope="id, data">
                    <button
                      class="btn btn-primary btn-sm"
                      @click="sendPromotion(data)"
                    >
                      Send
                    </button>
                  </span>
                  <span slot="actions" slot-scope="id, record">
                    <i class="fa fa-eye" @click="view(record)"></i>
                    <i
                      class="fa fa-pencil"
                      @click="editPromotionData(record)"
                    ></i>
                    <i class="fa fa-trash" @click="deleteModal=true;storeRecord=record;"></i>
                  </span>
                </a-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="editModal" scrollable hide-footer title="Update Promotion">
      <form @submit.prevent>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label for=""><strong>Send By Gender</strong></label>
              <select class="form-control" v-model="editPromotion.gender">
                <option :value="null">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for=""><strong>Send By Country</strong></label>
              <select class="form-control" v-model="editPromotion.country">
                <option :value="null">Select Country</option>
                <option :value="item.name" v-for="(item, index) in countries" :key="index">{{item.name}}</option>
              </select>
            </div>
          </div>
          <input type="hidden" name="promotionId" v-model="editPromotion._id">
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Send By User Role</strong></label>
              <select class="form-control" v-model="editPromotion.userRole">
                <option :value="null">Select User Role</option>
                <option value="all">All</option>
                <option value="trainers">Trainers</option>
                <option value="students">Students</option>
              </select>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Title (English)</strong></label>
              <input
                type="text"
                v-model="editPromotion.titleEnglish"
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
                v-model="editPromotion.subjectEnglish"
                class="form-control"
                placeholder="Enter Title"
                required
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Message (English)</strong></label>
              <vue-editor v-model="editPromotion.messageEnglish"></vue-editor>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Title (Arabic)</strong></label>
              <input
                type="text"
                v-model="editPromotion.titleArabic"
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
                v-model="editPromotion.subjectArabic"
                class="form-control"
                placeholder="Enter Title"
                required
              />
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""><strong>Message (Arabic)</strong></label>
              <vue-editor v-model="editPromotion.messageArabic"></vue-editor>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary btn-block" @click="updatePromotion()">Update Promotion</button>
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
            <button class="btn btn-primary" @click="deleteItem(storeRecord)">Delete</button>
          </span>
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
          <div class="col-6">
            <div class="form-group">
              <label for=""><strong>Send By Gender</strong></label>
              <select class="form-control" v-model="promotion.gender">
                <option :value="null">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for=""><strong>Send By Country</strong></label>
              <select class="form-control" v-model="promotion.country">
                <option :value="null">Select Country</option>
                <option :value="item.name" v-for="(item, index) in countries" :key="index">{{item.name}}</option>
              </select>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Send By User Role</strong></label>
              <select class="form-control" v-model="promotion.userRole">
                <option :value="null">Select User Role</option>
                <option value="all">All</option>
                <option value="trainers">Trainers</option>
                <option value="students">Students</option>
              </select>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Title (English)</strong></label>
              <input
                type="text"
                v-model="promotion.titleEnglish"
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
                v-model="promotion.subjectEnglish"
                class="form-control"
                placeholder="Enter Title"
                required
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Message (English)</strong></label>
              <vue-editor v-model="promotion.messageEnglish"></vue-editor>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for=""><strong>Title (Arabic)</strong></label>
              <input
                type="text"
                v-model="promotion.titleArabic"
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
                v-model="promotion.subjectArabic"
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
              <vue-editor v-model="promotion.messageArabic"></vue-editor>
            </div>
          </div>
          <div class="col-12">
            <button
              class="btn btn-primary btn-block"
              @click="saveNewPromotion()"
            >
              Create Promotion
            </button>
          </div>
        </div>
      </form>
    </b-modal>

    <b-modal v-model="viewModal" hide-footer title="Promotion Details">
      <div class="row">
        <div class="col-12 col-md-6 mt-2">
          <label for="id"><strong>Id</strong></label>
          <p>{{ pRecord._id }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="from"><strong>Title</strong></label>
          <p>{{ pRecord.titleEnglish }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="to"><strong>Subject</strong></label>
          <p>{{ pRecord.subjectEnglish }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="to"><strong>User Role</strong></label>
          <p>{{ pRecord.userRole }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="status"><strong>Message</strong></label>
          <p>{{ pRecord.messageEnglish}}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="gender"><strong>Created At</strong></label>
          <p>{{ pRecord.createdAt }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="title"><strong>Country</strong></label>
          <p>{{ pRecord.country }}</p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from 'jspdf';
import countries from '../assets/countries.json'
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
      pRecord:{
        id: null,
        title_en: null,
        subject_en: null,
        message_en: null,
        created_at: null,
        title_ar: null,
        subject_ar: null,
        message_ar: null,
        status: null,
        gender: null,
        country: null,
        user_role: null,
      },
      deleteModal:false,
      storeRecord:{
        id: null
      },
      countries: countries,
      filterObject : {
        subject : '',
        title: '',
        status: null,
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

       gender: null,
        country: null,
        userRole: null,
        titleArabic: null,
        messageEnglish: null,
        titleEnglish: null,
        subjectArabic: null,
        subjectEnglish:null,
        messageArabic: null,
        promotionId: null,
      
      editPromotion: {
        gender: null,
        country: null,
        userRole: null,
        titleArabic: null,
        messageEnglish: null,
        titleEnglish: null,
        subjectArabic: null,
        subjectEnglish:null,
        messageArabic: null,
        _id: null,
        
      },
      promotion: {
        gender: null,
        country: null,
        userRole: null,
        titleArabic: null,
        messageEnglish: null,
        titleEnglish: null,
        subjectArabic: null,
        subjectEnglish:null,
        messageArabic: null,
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
      // data: [{
      //   id : 1,
      //   title_en : "title",
      //   subject_en : "title",
      //   message_en : "title",
      //  created_at: "01-09-2020",
      //   status : true
      // }],
      columns: [
        {
          title: "Country",
          dataIndex: "country",
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
          title: "Create at",
          dataIndex: "createdAt",
          sorter: (a, b) => a.title.localeCompare(b.title),
          sortDirections: ["descend", "ascend"],
        },
      
        {
          title: "Subject Arabic",
          dataIndex: "subjectArabic",
          width: "21%",
          sorter: (a, b) => a.created_at.localeCompare(b.created_at),
          sortDirections: ["descend", "ascend"],
        },
         {
          title: "Subject Arabic",
          dataIndex: "subjectEnglish",
          width: "21%",
          sorter: (a, b) => a.created_at.localeCompare(b.created_at),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Status",
          dataIndex: "activeStatus",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "Send",
          scopedSlots: { customRender: "send" },
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
   this.getAllPromotions();
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
      link.setAttribute("download", "Promotions.csv");
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
      doc.text('Promotions', 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: {cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: {cellPadding: 6 },
        body: vm.data,
        columns: columns,
      })
      doc.save('Promotions.pdf');
    },
    getBoolVal(val){
      if(val===1){
        return true;
      }
      else{
        return false;
      }
    },
    filterPromotionsList() {
      axios
        .post(this.APIServer + "admin/promotions/filter", this.filterObject, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log(response.data);
          this.data = [];
          response.data.data
            .forEach((d) => {
              let object = {
                id: d.id,
                title_en: d.title_en,
                subject_en: d.subject_en,
                message_en: d.message_en,
                created_at: d.created_at,
                title_ar: d.title_ar,
                subject_ar: d.subject_ar,
                message_ar: d.message_ar,
                status: d.status,
                gender: d.gender,
                country: d.country,
                user_role: d.user_role,
              };
              this.data.push(object);
            })
            this.data.reverse();
            this.loading = false;
        }).catch((e) => {
              this.loading = false;
        });
    },
    updatePromotion() {
      console.log('sdd',this.editPromotion)
      
      axios
        .patch(
          this.APIServer + "admin/updatePromotion",
          {
            gender: this.editPromotion.gender,
            country: this.editPromotion.country,
            userRole: this.editPromotion.userRole,
            titleArabic: this.editPromotion.titleArabic,
            messageEnglish: this.editPromotion.messageEnglish,
            titleEnglish: this.editPromotion.titleEnglish,
            subjectArabic: this.editPromotion.subjectArabic,
            subjectEnglish: this.editPromotion.subjectEnglish,
            messageArabic: this.editPromotion.messageArabic,
            promotionId: this.editPromotion._id,

          },
          {
            headers: { Authorization: this.$store.state.token },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.editModal = false;
          this.openNotificationWithIcon(
            "success",
            response.data.data,
            "bottomRight"
          );
          this.filterPromotionsList();
        })
        .catch((e) => {
          this.editModal = false;
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
    editPromotionData(data) {
      console.log(data);
      this.editPromotion = data;
      this.editModal = true;
    },
    sendPromotion(item) {
      axios
        .get(this.APIServer + "admin/promotions/send/" + items,_id, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log(response.data);
          this.openNotificationWithIcon(
            "success",
            response.data.data,
            "bottomRight"
          );
          this.filterPromotionsList();
        })
        .catch((e) => {
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
    getAllPromotions() {
       this.data = [];
       this.loading = true;
      axios
        .get(this.APIServer + "admin/getPromotions/", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log('dsdsds',response.data);
          this.data = response.data
       
            this.loading = false;
        }).catch((e) => {
              this.loading = false;
        });
    },
    saveNewPromotion() {
      axios
        .post(this.APIServer + "admin/createPromotion", this.promotion, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log(response.data);
          this.createModal = false;
          this.openNotificationWithIcon(
            "success",
            response.data.data,
            "bottomRight"
          );
          this.filterPromotionsList();
        })
        .catch((e) => {
          this.createModal = false;
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
    view(record) {
      this.pRecord = record;
      this.viewModal = true;
    },
    deleteItem(record) {
      this.deleteModal=false;
      axios
        .get(this.APIServer + "admin/promotions/delete/" + record.id, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.openNotificationWithIcon(
            "success",
            response.data.data,
            "bottomRight"
          );
          this.filterPromotionsList();
        })
        .catch((e) => {
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
    onChangeStatus(record) {
      axios
        .get(this.APIServer + "admin/promotions/toggle-status/" + record.id, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.openNotificationWithIcon(
            "success",
            response.data.data,
            "bottomRight"
          );
          this.filterPromotionsList();
        })
        .catch((e) => {
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
  },
};
</script>