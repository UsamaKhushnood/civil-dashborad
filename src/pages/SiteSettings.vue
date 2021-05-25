<template>
  <div class="site-settings">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Site Settings</strong></h5>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12 col-md-4 mt-3">
                <div class="border p-3">
                  <div class="form-group">
                    <label for=""
                      ><strong>Trainer Subscription Charges</strong></label
                    >
                    <input
                      type="text"
                      v-model="trainserSub"
                      class="form-control"
                      placeholder="$"
                    />
                    <span class="visiblePass"><i class="fa fa-usd"></i></span>
                  </div>
                  <div class="form-group">
                    <label for=""><strong>Status</strong></label> <br />
                    <a-switch
                      :checked="trainerStatus"
                      @click="changeStatus('trainer')"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4 mt-3">
                <div class="border p-3">
                  <div class="form-group">
                    <label for=""
                      ><strong>Student Subscription Charges</strong></label
                    >
                    <input
                      type="text"
                      v-model="studentSub"
                      class="form-control"
                      placeholder="$"
                    />
                    <span class="visiblePass"><i class="fa fa-usd"></i></span>
                  </div>
                  <div class="form-group">
                    <label for=""><strong>Status</strong></label> <br />
                    <a-switch
                      :checked="studentStatus"
                      @click="changeStatus('student')"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4 mt-3">
                <div class="border p-3">
                  <div class="form-group">
                    <label for=""><strong>Promotion Charges</strong></label>
                    <input
                      type="text"
                      v-model="promotionCharge"
                      class="form-control"
                      placeholder="$"
                    />
                    <span class="visiblePass"><i class="fa fa-usd"></i></span>
                  </div>
                  <div class="form-group">
                    <label for=""><strong>Status</strong></label> <br />
                    <a-switch
                      :checked="promotionStatus"
                      @click="changeStatus('promotion')"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4 mt-3">
                <div class="border p-3">
                  <div class="form-group">
                    <label for=""
                      ><strong
                        >Admin Commision On Course Purchase</strong
                      ></label
                    >
                    <input
                      type="text"
                      v-model="adminComission"
                      class="form-control"
                      placeholder="$"
                    />
                    <span class="visiblePass"><i class="fa fa-usd"></i></span>
                  </div>
                  <div class="form-group">
                    <label for=""><strong>Status</strong></label> <br />
                    <a-switch
                      :checked="adminStatus"
                      @click="changeStatus('admin')"
                    />
                  </div>
                </div>
              </div>

              <!-- New Fields -->
              <div class="col-12 col-md-4 mt-3">
                <div class="border p-3">
                  <div class="form-group">
                    <label for=""><strong>Aadvance test charges</strong></label>
                    <input
                      type="text"
                      v-model="advanceTestCharges"
                      class="form-control"
                      placeholder="$"
                    />
                    <span class="visiblePass"><i class="fa fa-usd"></i></span>
                  </div>
                  <div class="form-group">
                    <label for=""><strong>Status</strong></label> <br />
                    <a-switch
                      :checked="advanceTestChargesStatus"
                      @click="changeStatus('admin')"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4 mt-3">
                <div class="border p-3">
                  <div class="form-group">
                    <label for=""
                      ><strong>questions per test (advance)</strong></label
                    >
                    <input
                      type="text"
                      v-model="questionsPerTest"
                      class="form-control"
                      placeholder="$"
                    />
                    <span class="visiblePass"><i class="fa fa-usd"></i></span>
                  </div>
                  <div class="form-group">
                    <label for=""><strong>Status</strong></label> <br />
                    <a-switch
                      :checked="questionsPerTestStatus"
                      @click="changeStatus('admin')"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4 mt-3">
                <div class="border p-3">
                  <div class="form-group">
                    <label for=""
                      ><strong>questions per test (basic)</strong></label
                    >
                    <input
                      type="text"
                      v-model="questionsPerTestBasic"
                      class="form-control"
                      placeholder="$"
                    />
                    <span class="visiblePass"><i class="fa fa-usd"></i></span>
                  </div>
                  <div class="form-group">
                    <label for=""><strong>Status</strong></label> <br />
                    <a-switch
                      :checked="questionsPerTestBasicStatus"
                      @click="changeStatus('admin')"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4 mt-3">
                <div class="border p-3">
                  <div class="form-group">
                    <label for=""
                      ><strong
                        >Passing percentage advance &amp; basic</strong
                      ></label
                    >
                    <input
                      type="text"
                      v-model="passingPercentage"
                      class="form-control"
                      placeholder="$"
                    />
                    <span class="visiblePass"><i class="fa fa-usd"></i></span>
                  </div>
                  <div class="form-group">
                    <label for=""><strong>Status</strong></label> <br />
                    <a-switch
                      :checked="passingPercentageStatus"
                      @click="changeStatus('admin')"
                    />
                  </div>
                </div>
              </div>

              <!-- end here  -->

              <div class="col-12 col-md-12 text-right">
                <div class="form-group">
                  <button class="btn btn-primary" @click="saveSiteSettings()">
                    Save
                  </button>
                </div>
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
export default {
  name: "SiteSettings",
  data() {
    return {
      APIServer: process.env.VUE_APP_SERVER_ADDRESS,
      trainerStatus: true,
      trainserSub: null,
      studentSub: null,
      studentStatus: true,
      adminComission: null,
      adminStatus: true,
      promotionCharge: null,
      promotionStatus: true,
      advanceTestCharges: null,
      advanceTestChargesStatus: true,
      passingPercentage: null,
      passingPercentageStatus: true,
      questionsPerTest: null,
      questionsPerTestStatus: true,
      questionsPerTestBasic: null,
      questionsPerTestBasicStatus: true,
    };
  },
  created() {
    this.getSiteSettings();
  },
  methods: {
    getSiteSettings() {
      axios
        .get(this.APIServer + "front/site/settings/get", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log("response hrere",response);
          if (response.data.status) {
            this.trainserSub = response.data.data[0].charge_value;
            this.trainerStatus =
              response.data.data[0].status == "true" ? true : false;
            this.studentSub = response.data.data[1].charge_value;
            this.studentStatus =
              response.data.data[1].status == "true" ? true : false;
            this.adminComission = response.data.data[2].charge_value;
            this.adminStatus =
              response.data.data[2].status == "true" ? true : false;
            this.promotionCharge = response.data.data[3].charge_value;
            this.promotionStatus =
              response.data.data[3].status == "true" ? true : false;
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
    saveSiteSettings() {
      axios
        .post(
          this.APIServer + "front/site/settings/save",
          {
            trainer_subscription: this.trainserSub,
            trainer_status: this.trainerStatus + "",
            student_subscription: this.studentSub,
            student_status: this.studentStatus + "",
            admin_commission: this.adminComission,
            admin_status: this.adminStatus + "",
            promotion_charge: this.promotionCharge,
            promotion_status: this.promotionStatus + "",
          },
          {
            headers: { Authorization: this.$store.state.token },
          }
        )
        .then((response) => {
          this.openNotificationWithIcon(
            "success",
            response.data.data,
            "bottomRight"
          );
          this.getSiteSettings();
        })
        .catch((e) => {
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
    changeStatus(category) {
      if (category == "trainer") this.trainerStatus = !this.trainerStatus;
      else if (category == "promotion")
        this.promotionStatus = !this.promotionStatus;
      else if (category == "student") this.studentStatus = !this.studentStatus;
      else if (category == "admin") this.adminStatus = !this.adminStatus;
    },
    openNotificationWithIcon(type, message, place) {
      this.$notification[type]({
        message: "Response",
        description: message,
        place,
      });
    },
  },
  // components: {
  //   TheHeaderDropdownAccnt
  // }
};
</script>
<style scoped>
label {
  text-transform: capitalize;
}
</style>
