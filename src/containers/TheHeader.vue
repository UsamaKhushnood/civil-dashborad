<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <img src="../assets/logo.png" width="30%" alt="" />
      <!-- <CIcon name="logo" height="48" alt="Logo"/> -->
    </CHeaderBrand>
    <!-- <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/dashboard">
          Dashboard
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/users" exact>
          Users
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink>
          Settings
        </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav> -->
    <CHeaderNav class="ml-auto">
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <!-- <CIcon name="cil-bell"/> -->
          <i class="fa fa-bell"></i>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mr-5">
        <a @click="logout()">Logout</a>
        <!-- <CHeaderNavLink>
          <CIcon name="cil-power-standby"/> Logout
        </CHeaderNavLink> -->
      </CHeaderNavItem>
      <!-- <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-list"/>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-envelope-open"/>
        </CHeaderNavLink>
      </CHeaderNavItem> -->
      <!-- <TheHeaderDropdownAccnt/> -->
    </CHeaderNav>
    <!-- <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader> -->
  </CHeader>
</template>

<script>
// import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import axios from "axios";
export default {
  name: "TheHeader",
  data() {
    return {
      APIServer: process.env.VUE_APP_SERVER_ADDRESS,
    };
  },
  methods: {
    logout() {
      axios
        .get(this.APIServer + "auth/logout", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          sessionStorage.setItem("setToken", null);
          console.log(response.data);
        });
      this.$store.commit("setToken", null);
      this.$router.push({ path: "/login" });
    },
  },
  // components: {
  //   TheHeaderDropdownAccnt
  // }
};
</script>
<style scoped>
.c-header.c-header-fixed {
       z-index: 20;
}
</style>