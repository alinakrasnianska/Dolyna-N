class Password{
   validate = (password)=>{
      if(password.length > 6 && /[a-zA-Z]/.test(password)){
         return password
      }else{
         return false
      }
   }
}

module.exports = new Password(); 