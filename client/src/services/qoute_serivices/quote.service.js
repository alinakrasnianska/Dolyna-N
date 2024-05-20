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



const makequote = async (cart,nav) => {
   const token = document.cookie

   if (token) {
      if (token.split("=")[0] === "dolyna-n") {
         await axios.post(url + "/requestaquote", {
            cart: JSON.stringify(cart)
         }, {
            headers: { 'Authorization': token.split("=")[1] }
         })
         return get_updates()
      }
   } else {
      console.log("Make login")
      nav("/authorization")
   }
  
}
 
const quote = {
   makequote
}  

export default quote