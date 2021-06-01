<template>
  <div class="contact">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-12">
                  <h5><strong>Chat History</strong></h5>
                  <hr />
                </div>
              </div>
            </form>
            <div class="row">
              <div class="container-fluid">
                <CDataTable
                  :items="items"
                  :fields="[
                    'ID',
                    'Image',
                    'First Name',
                    'Last Name',
                    'Date',
                    'LastMessage',
                  ]"
                  column-filter
                  table-filter
                  items-per-page-select
                  :items-per-page="5"
                  hover
                  sorter
                  pagination
                  class="w-100"
                >
                <template #Image> 
                 <td>  <b-avatar variant="info" src="https://placekitten.com/300/300"></b-avatar></td>
                </template>
                  <template #ID="{ index }">
                   <td>
                      {{ index + 1 }}
                   </td>
                  </template>
                  <template #LastMessage="{ item }">
                    <td>
                      {{ item.LastMessage }}
                    </td>
                  </template>
                </CDataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        Image: "",
        "First Name": "John",
        "Last Name": "Doe",
        Date: "5/2/2021",
        LastMessage:
          "In publishing and graphic design,In publishing and graphic design,In publishing and graph",
      },
      {
        Image: "",
        "First Name": "John",
        "Last Name": "Doe",
        Date: "5/2/2021",
        LastMessage:
          "In publishing and graphic design,In publishing and graphic design,In publishing and graph",
      },
      {
        Image: "",
        "First Name": "fdsfdsfds",
        "Last Name": "Doe",
        Date: "5/2/2021",
        LastMessage:
          "In publishing and graphic design,In publishing and graphic design,In publishing and graph",
      },
      {
        Image: "",
        "First Name": "John",
        "Last Name": "Doe",
        Date: "5/2/2021",
        LastMessage:
          "In publishing and graphic design,In publishing and graphic design,In publishing and graph",
      },
      {
        Image: "",
        "First Name": "John",
        "Last Name": "Doe",
        Date: "5/2/2021",
        LastMessage:
          "In publishing and graphic design,In publishing and graphic design,In publishing and graph",
      },
    ],
  }),
};
</script>
<style scoped>
.username {
  text-transform: capitalize;
}
.chat_card {
  cursor: pointer;
}
</style>
