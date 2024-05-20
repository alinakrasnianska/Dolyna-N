

class UserValidator {
   emailValidator = (email) => {
      const new_email = email.toLowerCase();
      if(new_email.includes("@")){
         return new_email
      }else{
         return false
      }
   }
   anone = (name, surname, password, email) => {
      if(name.trim() !== "" && 
      surname.trim() !== "" &&
      password.trim() !== "" &&
      email.trim() !== "" &&
      
      /^[a-zA-Z]+$/.test(name) &&
      /^[a-zA-Z]+$/.test(surname) &&
      password.length > 6 ){
         return {name ,surname , password , email}
      }else{
         return 0
      }
   }
   namesValidator = (name,surname)=>{
      if(name.trim() !== "" &&
      surname.trim() !== "" &&
      name.length > 1 && 
      surname.length > 1 &&
      
      /^[a-zA-Z]+$/.test(name) &&
      /^[a-zA-Z]+$/.test(surname)){
         return {name ,surname}
      }else{
         return false
      }
   }
   companyValidator = (company_name)=>{
      if(company_name.trim() !== "" &&
         company_name.length > 2 &&
         /^[a-zA-Z\s]+$/.test(company_name)){
         return {company_name}
      }else{
         return false
      }
   }
   phoneValidator = (phone=>{
      if(phone.trim() !== "" &&
      phone.length > 6 &&
      phone.length <25 &&
      /^[\d+-]+$/.test(phone)){
      return {phone}
   }else{
      return false
   }
   })
}


module.exports = new UserValidator(); 