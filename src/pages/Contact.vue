<template>
  <div class="contact">
   
   
    <!-- <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Contact Queries</strong></h5>
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
                <label for="filter"><strong>Search By Name</strong></label>
                <input
                  type="text"
                  placeholder="Search By Name"
                  class="form-control"
                  @keyup = "filterContact()"
                  v-model = "filterObject.name"
                />
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Email</strong></label>
                <input
                  type="text"
                  placeholder="Search By Email"
                  class="form-control"
                  @keyup = "filterContact()"
                  v-model = "filterObject.email"
                />
              </div>
            </div>
            <div class="row">
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
                  <span slot="status" slot-scope="id, record">
                    <a-switch
                      :checked="record.status == 'active'"
                      @change="onChangeStatus(record)"
                    />
                  </span>
                  <span slot="actions" slot-scope="id, record">
                    <i class="fa fa-eye" @click="viewContact(record)"></i>
                    <i class="fa fa-trash" @click="deleteModal=true;storeRecord=record;"></i>
                  </span>
                </a-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent>
              <div class="row">
                <div class="col-12">
                  <h5><strong>Contact Page Details</strong></h5>
                  <hr />
                </div>
                <div class="col-12 my-3">
                  <h5><strong>Call Us</strong></h5>
                </div>
                <div class="col-12 col-md-12 col-lg-12 col-xl-6">
                  <div class="content-area">
                    <h5 class="text-center"><strong>English</strong></h5>
                    <div class="form-group">
                      <label for="title"
                        ><strong>English Heading*</strong></label
                      >
                      <input
                        type="text"
                        v-model="callHeadingEnglish"
                        class="form-control"
                        placeholder="Enter English Heading"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="title"
                        ><strong>English Content*</strong></label
                      >
                      <vue-editor
                        v-model="callContentEnglish"
                      ></vue-editor>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-12 col-lg-12 col-xl-6">
                  <div class="content-area">
                    <h5 class="text-center"><strong>Arabic</strong></h5>
                    <div class="form-group">
                      <label for="title"
                        ><strong>Arabic Heading*</strong></label
                      >
                      <input
                        type="text"
                        v-model="callHeadingArabic"
                        class="form-control"
                        placeholder="Enter Arabic Heading"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="title"
                        ><strong>Arabic Content*</strong></label
                      >
                      <vue-editor
                        v-model="callContentArabic"
                      ></vue-editor>
                    </div>
                  </div>
                </div>

                <div class="col-12 my-3">
                  <h5><strong>Our Location</strong></h5>
                </div>
                <div class="col-12 col-md-12 col-lg-12 col-xl-6">
                  <div class="content-area">
                    <h5 class="text-center"><strong>English</strong></h5>
                    <div class="form-group">
                      <label for="title"
                        ><strong>English Heading*</strong></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="locationHeadingEnglish"
                        placeholder="Enter English Heading"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="title"
                        ><strong>English Content*</strong></label
                      >
                      <vue-editor
                        v-model="locationContentEnglish"
                      ></vue-editor>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-12 col-lg-12 col-xl-6">
                  <div class="content-area">
                    <h5 class="text-center"><strong>Arabic</strong></h5>
                    <div class="form-group">
                      <label for="title"
                        ><strong>Arabic Heading*</strong></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="locationHeadingArabic"
                        placeholder="Enter Arabic Heading"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="title"
                        ><strong>Arabic Content*</strong></label
                      >
                      <vue-editor
                        v-model="locationContentArabic"
                      ></vue-editor>
                    </div>
                  </div>
                </div>

                <div class="col-12 my-3">
                  <h5><strong>Our Address</strong></h5>
                </div>
                <div class="col-12 col-md-12 col-lg-12 col-xl-6">
                  <div class="content-area">
                    <h5 class="text-center"><strong>English</strong></h5>
                    <div class="form-group">
                      <label for="title"
                        ><strong>English Heading*</strong></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="addressHeadingEnglish"
                        placeholder="Enter English Heading"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="title"
                        ><strong>English Content*</strong></label
                      >
                      <vue-editor
                        v-model="addressContentEnglish"
                      ></vue-editor>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-12 col-lg-12 col-xl-6">
                  <div class="content-area">
                    <h5 class="text-center"><strong>Arabic</strong></h5>
                    <div class="form-group">
                      <label for="title"
                        ><strong>Arabic Heading*</strong></label
                      >
                      <input
                        type="text"
                        v-model="addressHeadingArabic"
                        class="form-control"
                        placeholder="Enter Arabic Heading"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="title"
                        ><strong>Arabic Content*</strong></label
                      >
                      <vue-editor
                        v-model="addressContentArabic"
                      ></vue-editor>
                    </div>
                  </div>
                </div>

                <div class="col-12 text-right mt-3">
                  <button class="btn btn-primary" @click="saveContactDetails()">Save Information</button>
                </div>
              </div>
            </form>
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

    <b-modal v-model="viewModal" hide-footer title="Contact Detials">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for=""><strong>Name</strong></label>
            <p>{{ viewContact.name }}</p>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for=""><strong>Email</strong></label>
            <p>{{ viewContact.email }}</p>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for=""><strong>Message</strong></label>
            <p>{{ viewContact.message }}</p>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Vue from "vue";
import moment from "moment";

import { VueEditor } from "vue2-editor";
export default {
  name: "users",
  components: {
    VueEditor,
  },
  // computed: {
  //   rows() {
  //     return this.items.length;
  //   },
  // },
  data() {
    return {
     items: [
          
        ],
      search:'',
      currentUserRole:'',
      
      deleteModal:false,
      storeRecord:{
        id: null
      },
      filterObject : {
        email : '',
        name: ''
      },
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
      callHeadingEnglish: null,
      callHeadingArabic: null,
      callContentEnglish: null,
      callContentArabic: null,
      locationHeadingEnglish: null,
      locationHeadingArabic: null,
      locationContentEnglish: null,
      locationContentArabic: null,
      addressHeadingEnglish: null,
      addressHeadingArabic: null,
      addressContentEnglish: null,
      addressContentArabic: null,
      contactId: null,
      contact: {
        
      },
      contactView: {
        name: null,
        email: null,
        message: null,
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
      data: [],
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
          title: "Name",
          dataIndex: "name",
          sorter: (a, b) => {
            if(!a.name){
              a.name = '';
            }
            if(!b.name){
              b.name = '';
            }
            return  a.name.localeCompare(b.name);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Email",
          dataIndex: "email",
          sorter: (a, b) => a.email.localeCompare(b.email),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Message",
          dataIndex: "message",
          sorter: (a, b) => a.email.localeCompare(b.message),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Created At",
          dataIndex: "created_at",
           sorter: (a, b) => a.created_at.localeCompare(b.created_at),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Actions",
          scopedSlots: { customRender: "actions" },
        },
      ],
    };
  },
  created() {
    this.getAllContactList();
    //this.getAllContactDetails();
    this.currentUserRole=sessionStorage.getItem("currentUserRole")
      
      console.log(this.currentUserRole);
  },
  //   computed:{
  //   FilterContactData:function(){
  //     return this.items.filter((item) => {
  //       return (item.nameEnglish || '').toLowerCase().indexOf((this.search || '').toLowerCase()) > -1
  //     });

      
  //   }

  // },
  methods: {
    // filterContact() 
    // {
    //   this.loading = true;
    //   let contact = new FormData();
    //   contact.append("name", this.filterObject.name);
    //   contact.append("email", this.filterObject.email);
    //   axios
    //     .post(this.APIServer + "contact-us/filter", contact, {
    //       headers: { Authorization: this.$store.state.token },
    //     })
    //     .then((response) => {
    //       if (response.data.status == "success") {
    //         this.data = response.data.data;
    //         console.log(this.data);
    //       } else {
    //         this.openNotificationWithIcon(
    //           "warning",
    //           response.data.code,
    //           "bottomRight"
    //         );
    //       }
    //       this.loading = false;
    //     })
    //     .catch((e) => {
    //       console.log("API failed");
    //       console.log(e);
    //       this.loading = false;
    //       this.openNotificationWithIcon(
    //         "error",
    //         "Internal server error",
    //         "bottomRight"
    //       );
    //     });
    // },
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
      link.setAttribute("download", "Contact.csv");
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
      doc.text('Contact', 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: {cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: {cellPadding: 6 },
        body: vm.data,
        columns: columns,
      })
      doc.save('Contact.pdf');g
    },
    // getAllContactDetails() {
    //   axios
    //     .get(this.APIServer + "contact-detail/get", {
    //       headers: { Authorization: this.$store.state.token },
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //       this.contact.call_title_en = response.data.data.call.title_en;
    //       this.contact.call_title_ar = response.data.data.call.title_ar;
    //       this.contact.call_content_en = response.data.data.call.content_en;
    //       this.contact.call_content_ar = response.data.data.call.content_ar;

    //       this.contact.location_title_en = response.data.data.location.title_en;
    //       this.contact.location_title_ar = response.data.data.location.title_ar;
    //       this.contact.location_content_en =
    //         response.data.data.location.content_en;
    //       this.contact.location_content_ar =
    //         response.data.data.location.content_ar;

    //       this.contact.address_title_en = response.data.data.address.title_en;
    //       this.contact.address_title_ar = response.data.data.address.title_ar;
    //       this.contact.address_content_en =
    //         response.data.data.address.content_en;
    //       this.contact.address_content_ar =
    //         response.data.data.address.content_ar;
    //     });
    // },
    // deleteItem(record) {
    //   this.deleteModal = false;
    //   axios
    //     .get(this.APIServer + "contact-us/delete/" + record.id, {
    //       headers: { Authorization: this.$store.state.token },
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //       if (response.data.status == "success") {
    //         this.openNotificationWithIcon(
    //           "success",
    //           response.data.data,
    //           "bottomRight"
    //         );
    //         this.getAllContactList();
    //       } else {
    //         this.openNotificationWithIcon(
    //           "warning",
    //           response.data.data,
    //           "bottomRight"
    //         );
    //       }
    //     })
    //     .catch((e) => {
    //       console.log("API failed");
    //       console.log(e);
    //       this.openNotificationWithIcon(
    //         "error",
    //         "Internal server error",
    //         "bottomRight"
    //       );
    //     });
    // },
    saveContactDetails() {
              
     
      let temContact = {
        callHeadingEnglish:this.callHeadingEnglish,
        callHeadingArabic:this.callHeadingArabic,
        callContentEnglish:this.callContentEnglish,
        callContentArabic:this.callContentArabic,
        locationHeadingEnglish:this.locationHeadingEnglish,
        locationHeadingArabic:this.locationHeadingArabic,
         locationContentEnglish:this.locationContentEnglish,
          addressContentArabic:this.addressContentArabic,
          addressHeadingEnglish:this.addressHeadingEnglish,
           addressHeadingArabic:this.addressHeadingArabic,
          addressContentEnglish:this.addressContentEnglish,
        
      }
      console.log(temContact)
      
      if(this.items == 0){
        
      axios
        .post(this.APIServer + "admin/createContact", this.temContact, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.openNotificationWithIcon(
            "success",
            response.data.data,
            "bottomRight"
          );
         // this.getAllContactDetails();
          console.log(response.data);
        }).catch(e => {
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        })
      }
      else{
        
console.log("ff");
console.log(this.callHeadingEnglish);
       axios
        .patch(this.APIServer + "admin/updateContact", {
           callHeadingEnglish:this.callHeadingEnglish,
        callHeadingArabic:this.callHeadingArabic,
        callContentEnglish:this.callContentEnglish,
        callContentArabic:this.callContentArabic,
        locationHeadingEnglish:this.locationHeadingEnglish,
        locationHeadingArabic:this.locationHeadingArabic,
         locationContentEnglish:this.locationContentEnglish,
          addressContentArabic:this.addressContentArabic,
          addressHeadingEnglish:this.addressHeadingEnglish,
           addressHeadingArabic:this.addressHeadingArabic,
          addressContentEnglish:this.addressContentEnglish,
          contactId:this.items._id,

        },

        
        
         {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log("responseddd");
          console.log(response);
          this.openNotificationWithIcon(
            "success",
            response.data.data,
            "bottomRight"
          );
          //this.getAllContactDetails();
          console.log(response.data);
        }).catch(e => {
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        }) 
      }
    },
    viewContact(record) {
      this.viewContact = record;
      this.viewModal = true;
    },
    getAllContactList() {
      this.loading = true;
      axios
        .get(this.APIServer + "admin/getContact", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log('sdsds',response)
          if (response.data != null)  {
            //this.data = response.data.data;
            this.items = response.data;
            
              this.callHeadingEnglish=this.items.callHeadingEnglish
              this.callHeadingArabic=this.items.callHeadingArabic
              this.callContentEnglish=this.items.callContentEnglish
              this.callContentArabic=this.items.callContentArabic
              this.locationHeadingEnglish=this.items.locationHeadingEnglish
              this.locationHeadingArabic=this.items.locationHeadingArabic
              this.locationContentEnglish=this.items.locationContentEnglish
              this.addressContentArabic=this.items.addressContentArabic
              this.addressHeadingEnglish=this.items.addressHeadingEnglish
              this.addressHeadingArabic=this.items.addressHeadingArabic
              this.addressContentEnglish=this.items.addressContentEnglish

            
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
    openNotificationWithIcon(type, message, place) {
      this.$notification[type]({
        message: "Response",
        description: message,
        place,
      });
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

<style scoped>
.content-area {
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 20px 30px;
}
</style>