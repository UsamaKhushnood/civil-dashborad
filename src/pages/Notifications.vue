<template>
  <div class="notifications">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Notifications</strong></h5>
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
                <select class="form-control" @change = "filterNotificationsList()"
                  v-model = "filterObject.status">
                  <option :value="null">Filter Notifications By Status</option>
                  <option value="all">All</option>
                  <option value=1>Read</option>
                  <option value=0>Unread</option>
                </select>
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Title</strong></label>
                <input
                  type="text"
                  placeholder="Search By Title"
                  class="form-control"
                  @keyup = "filterNotificationsList()"
                  v-model = "filterObject.title"
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
                  <span slot="status" slot-scope="id, record">
                    <b-badge
                      :variant="record.status ? 'success' : 'danger'"
                      >{{ record.status?'read':'unread' }}</b-badge
                    >
                  </span>
                  <span slot="actions" slot-scope="id, record">
                    <i class="fa fa-eye" @click="view(record)"></i>
                  </span>
                </a-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="editModal" scrollable hide-footer title="Update Category">
      <form @submit.prevent>
        <div class="row">
          <div class="col-12">
            <div class="form-group"><strong>Upload Category Image</strong></div>
            <input type="file" class="btn btn-primary" />
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""><strong>Category Name (English)</strong></label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Category Name"
                required
              />
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""
                ><strong>Category Description (English)</strong></label
              >
              <vue-editor></vue-editor>
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""><strong>Category Name (Arabic)</strong></label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Category Name"
                required
              />
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""
                ><strong>Category Description (Arabic)</strong></label
              >
              <vue-editor></vue-editor>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary btn-block">Update Notification</button>
          </div>
        </div>
      </form>
    </b-modal>

    <b-modal
      v-model="createModal"
      scrollable
      hide-footer
      title="Create Category"
    >
      <form @submit.prevent>
        <div class="row">
          <div class="col-12">
            <div class="form-group"><strong>Upload Category Image</strong></div>
            <input type="file" class="btn btn-primary" />
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""><strong>Category Name (English)</strong></label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Category Name"
                required
              />
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""
                ><strong>Category Description (English)</strong></label
              >
              <vue-editor></vue-editor>
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""><strong>Category Name (Arabic)</strong></label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Category Name"
                required
              />
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for=""
                ><strong>Category Description (Arabic)</strong></label
              >
              <vue-editor></vue-editor>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary btn-block">Create Category</button>
          </div>
        </div>
      </form>
    </b-modal>

    <b-modal v-model="viewModal" hide-footer title="Notification Details">
      <div class="row">
       <div class="col-12 col-md-6 mt-2">
          <label for="id"><strong>Id</strong></label>
          <p>{{ notificationData.id }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="from"><strong>From</strong></label>
          <p>{{ notificationData.from }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="to"><strong>To</strong></label>
          <p>{{ notificationData.to }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="status"><strong>Status</strong></label>
          <p>{{ notificationData.status ?'Unread':'Read'}}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="gender"><strong>Created At</strong></label>
          <p>{{ notificationData.created_at }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="title"><strong>Title</strong></label>
          <p>{{ notificationData.title }}</p>
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
      notificationData : {
        id: null,
        title: null,
        from: null,
        to: null,
        created_at: null,
        status: null
      },
      filterObject : {
        title : '',
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
        title : "title",
        from : "01-10-2020",
        to : "01-09-2020",
        created_at: "01-09-2020",
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
          title: "Title",
          dataIndex: "title",
          sorter: (a, b) => a.title.localeCompare(b.title),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "From",
          dataIndex: "from",
          sorter: (a, b) => a.from.localeCompare(b.from),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "To",
          dataIndex: "to",
          sorter: (a, b) => a.to.localeCompare(b.to),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Created At",
          dataIndex: "created_at",
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
        }
      ],
    };
  },
  created() {
    // this.getAllNotifications();
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
      link.setAttribute("download", "Notification.csv");
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
      doc.text('Notification List', 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: {cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: {cellPadding: 6 },
        body: vm.data,
        columns: columns,
      })
      doc.save('Notification.pdf');
    },
    filterNotificationsList() {
      axios
        .post(this.APIServer + "admin/notification/filter", this.filterObject, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.data = [];
          if (response.data.status == "success") {
            response.data.data.forEach((d) => {
              let object = {
                id: d.id,
                title: d.message,
                from: d.from_user.first_name + " " + d.from_user.last_name,
                to: d.to_user.first_name + " " + d.to_user.last_name,
                created_at: d.created_at,
                status: d.read,
                // status: this.convertStatus(d.status),
              };
              this.data.push(object);
            });
            // console.log(this.data);
            // this.coursesData = response.data.data;
          }
          this.data.reverse();
          this.loading = false;
        })
    },
    getAllNotifications() {
      this.loading = true;
      this.data = [];
      axios
        .get(this.APIServer + "admin/notification/get-notification", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status == "success") {
            response.data.data.forEach((d) => {
              let object = {
                id: d.id,
                title: d.message,
                from: d.from_user.first_name + " " + d.from_user.last_name,
                to: d.to_user.first_name + " " + d.to_user.last_name,
                created_at: d.created_at,
                status: d.read,
                // status: this.convertStatus(d.status),
              };
              this.data.push(object);
            });
            // console.log(this.data);
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
    view(record) {
      this.notificationData = record;
      this.viewModal = true;
    },
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