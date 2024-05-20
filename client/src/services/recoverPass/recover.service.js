import axios from "axios";

const url = 'http://localhost:8000';


const recover = async (email) => {
   return await axios.post(url + "/passrecover", {
      email: email
   })

}
const decypher = async (cypher) => {
   return axios.post(url + "/setnewpass", {
      cypher: cypher
   })
}

const set_pass = async (pass) => {
   try {
      const token = document.cookie
      if (token) {
         if (token.split("=")[0] === "dolyna-n") {
            const response = await axios.put(url + '/changepass', {
               new_pass: pass,
            }, {
               headers: { 'Authorization': token.split("=")[1] }
            });

            return response;
         }
      }
   } catch (error) {
      console.error('Something gone wrong:', error.response.data);
   }
}

const password = {
   recover,
   decypher,
   set_pass
}

export default password
