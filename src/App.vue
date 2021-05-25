<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';

  html {
  scroll-behavior: smooth;
}
th {
  font-weight: bold !important;
  background: #EC8E2B !important;
  color: #fff !important;
}

.table td{
  vertical-align: baseline !important;
}


// th:first-child {
//   border-top-left-radius: 8px !important;
//   border-bottom-left-radius: 8px !important;
// }
// th:last-child {
//   border-top-right-radius: 8px !important;
//   border-bottom-right-radius: 8px !important;
// }

.ant-table-thead > tr:first-child > th:first-child, .ant-table-thead > tr:first-child > th:last-child {
    border-radius: 0 !important;
}

.ant-switch-checked {
  background: #EC8E2B !important;
}
.custom-control-input:checked ~ .custom-control-label::before {
  background: #EC8E2B !important;
  border-color: #EC8E2B !important;
}
.btn-primary {
  background: #EC8E2B !important;
  border: 1px #EC8E2B !important;
}
.moving-arrow {
  top: 120px !important;
}
.back:hover {
  color: #EC8E2B;
  cursor: pointer;
}
.btn-secondary {
  background: #fff !important;
  color: #EC8E2B !important;
  border: 1px solid #EC8E2B !important;
  box-shadow: none !important;
}
.btn-secondary:hover {
  background: #EC8E2B !important;
  color: #fff !important;
  border: 1px solid #EC8E2B !important;
}
.text-main {
  color: #EC8E2B !important;
}
.wrapper .sidebar[data-active-color="success"] .nav .nav-item.active > .nav-link {
  color: #EC8E2B !important;
}
.ant-pagination-item-active {
  border-color: #EC8E2B !important;
  background: #EC8E2B !important;
}
.ant-pagination-item-active a {
  color: #fff !important;
}
input, select, textarea {
  border: 1px solid #EC8E2B !important;
  background: #fff !important;
  box-shadow: none !important;
}
.date-input input  {
  border: 0px solid #EC8E2B !important;
  background: #fff !important;
  box-shadow: none !important;
}
.ant-calendar-input {
  border: none !important;
}
.ant-calendar-range .ant-calendar-selected-start-date .ant-calendar-date, .ant-calendar-range .ant-calendar-selected-end-date .ant-calendar-date {
  background: #EC8E2B !important;
}
.ant-calendar-range .ant-calendar-in-range-cell::before {
  background: #e699467a !important;
}
.b-form-tags-button {
  display: none !important;
}
.b-form-tags {
  border: 1px solid #EC8E2B !important;
  background: #fff !important;
  outline: none !important;
}
.c-active, .c-sidebar-nav-item a:hover, .c-sidebar-nav-dropdown-toggle:hover {
  background: #EC8E2B !important;
}
.fc-event, .fc-event-dot {
  background: #EC8E2B !important;
  color: #fff !important;
}
.fc-event, .ui.selection.dropdown {
  border: 1px solid #EC8E2B !important;
}
.ant-calendar-picker, .ant-calendar-picker-default {
  border: 1px solid #EC8E2B !important;
  box-shadow: none !important;
  outline: none !important;
  border-radius: 5px;
}
i {
  margin: 0 5px;
}
i:hover {
  cursor: pointer;
}
.c-sidebar {
  background: #2E3192 !important;
}
.ant-rate-star:not(:last-child) {
  margin: 0 !important;
}
</style>
