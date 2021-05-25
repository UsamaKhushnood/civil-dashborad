import axios from "axios";
import vueCountryRegionSelect from 'vue-country-region-select'
export default {
    methods: {
        uploadImage(file) {
            const url = "https://api.cloudinary.com/v1_1/dz5fltj9r/image/upload";
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "hammad");
            axios.post(url, data).then(response => {
                console.log("image uploaded successfully");
                console.log(response.data);
                return response.data;
            }).catch(e => {
                console.log("API failed");
                console.log(e);
                return null;
            })
        }
    }
}

//  cloudinry;