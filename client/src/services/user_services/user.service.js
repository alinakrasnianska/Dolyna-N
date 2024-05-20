import axios from "axios";

const url = 'http://localhost:8000';

const get_updates = async () => {
   const token = document.cookie

   if (token) {
      if (token.split("=")[0] === "dolyna-n") {
         const response = await axios.get(url + '/getUser', {
            headers: { 'Authorization': token.split("=")[1] }
         })
         return response
      } else {
         console.log("Not verified token")
      }

   } else {
      console.log("Token not exist")
   }
}


const update_user = async (name, surname, phone, company_name, email,nav) => {
   try {
      const token = document.cookie
      if(token){
         if (token.split("=")[0] === "dolyna-n"){
            await axios.put(url + '/updateUser', {
               name: name,
               surname: surname,
               phone: phone,
               company_name: company_name,
               email: email
           },{
             headers: { 'Authorization': token.split("=")[1] }
          });
    
           return get_updates();
         }
      }
   } catch (error) {
       console.error('Something gone wrong:', error.response.data);
       if(error.response.data === "Server error: jwt expired"){
         nav('/authorization')
       }
   }
}


const users = {
   update_user,
   get_updates
}

export default users