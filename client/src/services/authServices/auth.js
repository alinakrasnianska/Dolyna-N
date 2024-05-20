import axios from "axios";

const url = 'http://localhost:8000';

const singin = async (email, password) => {
   try {
      const response = await axios.post(url + '/authorizeUser', {
         email: email,
         password: password
      })
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

const singon = async (name, surname, password, email) => {
   try {
      const response = await axios.post(url + '/createUser', {
         name: name,
         surname: surname,
         password: password,
         email: email,
         phone: "",
         company_name: "",
         last_order: {}
      })
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


const auth = {
   singin,
   singon
}

export default auth