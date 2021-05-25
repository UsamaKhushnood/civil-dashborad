<template>
  <div class="category-requests">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>New Category Requests</strong></h5>
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
                <label for="filter"><strong>Search By Category</strong></label>
                <input
                  type="text"
                  placeholder="Search By Category"
                  class="form-control"
                />
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Trainer</strong></label>
                <input
                  type="text"
                  placeholder="Search By Trainer"
                  class="form-control"
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
                  <span slot="image" slot-scope="id, record">
                    <b-img v-bind="mainProps1" :src="record.image"></b-img>
                  </span>
                  <span slot="status" slot-scope="id, record">
                    <a-switch
                      :checked="record.status == 'active'"
                      @change="onChangeStatus(record)"
                    />
                  </span>
                  <span slot="actions" slot-scope="id, record">
                    <button
                      class="btn btn-primary btn-sm"
                      @click="updateStatusOfRequest(1, record.id)"
                    >
                      Approve
                    </button>
                    <button
                      class="btn btn-danger btn-sm ml-2"
                      @click="updateStatusOfRequest(3, record.id)"
                    >
                      Reject
                    </button>
                  </span>
                </a-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      return this.items.length;
    },
  },
  data() {
    return {
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
          title: "Category",
          dataIndex: "category",
          sorter: (a, b) => {
            if(!a.category){
              a.category = '';
            }
            if(!b.category){
              b.category = '';
            }
            return  a.category.localeCompare(b.category);
          },
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Trainer",
          dataIndex: "trainer",
          sorter: (a, b) => {
            if(!a.trainer){
              a.trainer = '';
            }
            if(!b.trainer){
              b.trainer = '';
            }
            return  a.trainer.localeCompare(b.trainer);
          },
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
    this.getAllCategoryRequests();
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
      link.setAttribute("download", "Category_Request.csv");
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
      doc.text('Category Request List', 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: {cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: {cellPadding: 6 },
        body: vm.data,
        columns: columns,
      })
      doc.save('Category_Request.pdf');
    },
    updateStatusOfRequest(status, id) {
      axios
        .post(
          this.APIServer + "admin/categoryrequest/change-status/" + id,
          {
            status: status,
          },
          {
            headers: { Authorization: this.$store.state.token },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.status == "success") {
            this.openNotificationWithIcon(
              "success",
              response.data.data.message,
              "bottomRight"
            );
            this.getAllCategoryRequests();
          } else {
            this.openNotificationWithIcon(
              "warning",
              response.data.data.message,
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
        });
    },
    getAllCategoryRequests() {
      this.loading = true;
      this.data = [];
      axios
        .get(this.APIServer + "admin/categoryrequest/get-list", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            // this.data = response.data.data;
            response.data.data.forEach((d) => {
              let object = {
                id: d.id,
                category: d.title_en,
                trainer: d.by_trainer.first_name + " " + d.by_trainer.last_name,
              };
              this.data.push(object);
            });
            console.log(this.data);
            // this.coursesData = response.data.data;
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
    openNotificationWithIcon(type, message, place) {
      this.$notification[type]({
        message: "Response",
        description: message,
        place,
      });
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