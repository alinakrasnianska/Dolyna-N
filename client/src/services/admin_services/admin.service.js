import axios from "axios";

const url = 'http://localhost:8000';

const admin_compare = async (key) => {
   try {
      const response = await axios.post(url + '/verify', {
         key: key,
      })
      return response
   } catch (error) {
      console.log(error)
   }
}


const add_cereal = async (name_ua,name_en, description_ua,description_en, image) => {
   try {
      const formData = new FormData();
      formData.append('name_ua', name_ua);
      formData.append('name_en', name_en);
      formData.append('description_ua', description_ua);
      formData.append('description_en', description_en);
      formData.append('image', image);

      const response = await axios.post(url + '/createCereal', formData, {
         headers: {
           'Content-Type': 'multipart/form-data'
         }
       });
      return response
   } catch (error) {
      if (error.response) {
         console.error('Error: ', error.response.data);
         return error.response.data;
      } else if (error.request) {
         console.error('input Error', error.request);
      } else {
         console.error('axios Error: ', error.message);
      }
   }
}

const admin = {
   admin_compare,
   add_cereal
}
export default admin