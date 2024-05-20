
const EmailValidator =(email) =>{ 
   if(email.trim() !== ''){
      if(email.includes("@")){
         if(email.length > 5){
            return email
         }else{
            return "too short email"
         }
      }else{
         return "this is not real email"
      }
   }else{
      return "email can not be empty"
   }
}

const PasswordValidator =(password) =>{
   if(password.trim() !== ''){
      if (password.length > 7) {
         if(/[0-9]/.test(password)){
            return password
         }else{
            return "password must include at least one number"
         }
      }else{
         return "password must be at least 8 characters"
      }
   }else{
      return "password can not be empty"
   }
}

const nameValidator = (name) =>{
   if(name.trim() !== ''){
      if(name.length > 1 && name.length < 101){
         return name
      }else{
         return "its not ur name"
      }
   }else{
      return "name can not be empty"
   }
}


const evalid = {
   EmailValidator,
   PasswordValidator,
   nameValidator

}

export default evalid