import axios from "axios";

const url = 'http://localhost:8000';


const contactUs = async (name,email,company,phone,message)=>{
   return await axios.post(url+"/contactUsData",{
      name:name,
      email:email,
      company:company,
      phone:phone,
      message:message
  })
}

const form = {
   contactUs
}

export default form