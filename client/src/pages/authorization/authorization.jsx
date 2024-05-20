import React, { useState } from 'react';
import './dist/authorization.css';
import ResetPassword from '../../modal-menu/passwordreset/passwordrese';
import { useNavigate } from "react-router-dom";
import auth from '../../services/authServices/auth.js';
import evalid from '../../validators/emailValidator.js';

export default function Authorization() {
   const [title, setTitle] = useState("My account");
   const [resetModal, setResetModal] = useState(false)

   const [emailLog, setEmailLog] = useState('')
   const [passLog, setPassLog] = useState('')

   const [fnReg,setFNReg] = useState('')
   const [lnReg,setLNReg] = useState('')
   const [passReg,setPassReg] = useState('')
   const [emailReg,setEmailReg] = useState('')

   const [errorLog, setErrorLog] = useState('')




   const navigate = useNavigate();

   const nav = (name) => {
      navigate(name);
   };

   const login = async () => {
      if (evalid.EmailValidator(emailLog) === emailLog) {
         await login_request(emailLog, passLog)
      } else {
         setErrorLog(evalid.EmailValidator(emailLog))
      }
   }


   const login_request = async (email, password) => {
      try {
         const response = await auth.singin(email, password)
         document.cookie = "dolyna-n=" + response.data.token
         nav('/main')
         return response
      } catch (error) {
         const input_email = document.querySelector('#login_name')
         const input_pass = document.querySelector('#password_field')
         input_email.style.borderBottom = "2px solid #d86d6d"
         input_pass.style.borderBottom = "2px solid #d86d6d"
         input_email.onclick = () => {
            input_email.style.borderBottom = "2px solid #d9d9d9"
            input_pass.style.borderBottom = "2px solid #d9d9d9"
            input_email.value = ''
            input_pass.value = ''
            setEmailLog("")
            setErrorLog("")

         }
         input_pass.onclick = () => {
            input_email.style.borderBottom = "2px solid #d9d9d9"
            input_pass.style.borderBottom = "2px solid #d9d9d9"
            setPassLog("")
            setErrorLog("")

         }
         setErrorLog("incorrect data entry")

      }

   }

   const register = async()=>{
      console.log(emailReg)
      if(evalid.EmailValidator(emailReg) === emailReg) {
         if(evalid.PasswordValidator(passReg) === passReg) {
            if(evalid.nameValidator(fnReg) === fnReg) {
               if(evalid.nameValidator(lnReg) === lnReg) {
                  await register_request(fnReg,lnReg,passReg,emailReg)
               }else{
                  setErrorLog(evalid.nameValidator(lnReg))
               }
            }else{
               setErrorLog(evalid.nameValidator(fnReg))
            }
         }else{
            setErrorLog(evalid.PasswordValidator(passReg))
         }
      }else{
         setErrorLog(evalid.EmailValidator(emailReg)) 
      }
   }

   const register_request = async(name, surname, password, email)=>{
      try {
         const response = await auth.singon(name, surname, password, email)
         authSwitch('login')
         return response         
      } catch (error) {
         const nameinp = document.querySelector("#first_name_field")
         const lnameinp = document.querySelector("#last_name_field")
         const passinp = document.querySelector("#email_adress_field")
         const emailinp = document.querySelector("#pass_field")

         nameinp.style.borderBottom = "2px solid #d9d9d9"
         lnameinp.style.borderBottom = "2px solid #d9d9d9"
         passinp.style.borderBottom = "2px solid #d9d9d9"
         emailinp.style.borderBottom = "2px solid #d9d9d9"


         nameinp.onclick = () => {
            nameinp.style.borderBottom = "2px solid #d9d9d9"
            lnameinp.style.borderBottom = "2px solid #d9d9d9"
            passinp.style.borderBottom = "2px solid #d9d9d9"
            emailinp.style.borderBottom = "2px solid #d9d9d9"
            nameinp.value = ''
            setFNReg("")
            setErrorLog("")
         }
         lnameinp.onclick = () => {
            nameinp.style.borderBottom = "2px solid #d9d9d9"
            lnameinp.style.borderBottom = "2px solid #d9d9d9"
            passinp.style.borderBottom = "2px solid #d9d9d9"
            emailinp.style.borderBottom = "2px solid #d9d9d9"
            lnameinp.value = ''
            setLNReg("")
            setErrorLog("")
         }
         passinp.onclick = () => {
            nameinp.style.borderBottom = "2px solid #d9d9d9"
            lnameinp.style.borderBottom = "2px solid #d9d9d9"
            passinp.style.borderBottom = "2px solid #d9d9d9"
            emailinp.style.borderBottom = "2px solid #d9d9d9"
            passinp.value = ''
            setPassReg("")
            setErrorLog("")
         }
         emailinp.onclick = () => {
            nameinp.style.borderBottom = "2px solid #d9d9d9"
            lnameinp.style.borderBottom = "2px solid #d9d9d9"
            passinp.style.borderBottom = "2px solid #d9d9d9"
            emailinp.style.borderBottom = "2px solid #d9d9d9"
            emailinp.value = ''
            setEmailReg("")
            setErrorLog("")
         }
        
         setErrorLog("incorrect data entry")
      }

   }

   const authSwitch = (action) => {
      const login = document.querySelector('.login')
      const register = document.querySelector('.register')
      const title = document.querySelector('.login_title')
      if (action === 'register') {
         setTitle("Register")

         title.style.margin = "6.9vh 0 2.9vh 0"

         login.style.height = "0"
         login.style.padding = "0"
         login.style.boxShadow = "none"
         login.style.border = "none"


         register.style.height = "74.3vh"
         register.style.padding = "1.35% 0 0 0"
         register.style.boxShadow = "0.247vw 0.39vh 1.38vw rgba(0, 0, 0, 0.164)"
         register.style.border = "1px solid #D9D9D9"
      } else if (action === "login") {
         setTitle("My account")

         title.style.margin = "6.9vh 0"

         register.style.height = "0"
         register.style.padding = "0"
         register.style.boxShadow = "none"
         register.style.border = "none"


         login.style.height = "63.7vh"
         login.style.padding = "2.35% 0 0 0"
         login.style.boxShadow = "0.247vw 0.39vh 1.38vw rgba(0, 0, 0, 0.164)"
         login.style.border = "1px solid #D9D9D9"

      }
   }

   const ResetPasswords = () => {
      if (resetModal !== true) {
         setResetModal(true)
      } else {
         setResetModal(false)
      }

   }

   return (
      <div className="login_con">
         <div className="login_title">{title}</div>
         <div className='auth_con'>
            <div className='Error_'>{errorLog}</div>

            <div className="login">

               <div className="login_fields_con">
                  <input value={emailLog} onChange={(e) => { setEmailLog(e.target.value) }} placeholder="Email" id='login_name' name='login_name' className='dynamicInput' type="text" title='enter yours email' required />
                  <label htmlFor="login_name" className="dynamicLabel">Email address</label>
               </div>
               <div className="login_fields_con register_fields">
                  <input value={passLog} onChange={(e) => { setPassLog(e.target.value) }} placeholder="Email" id='password_field' name='password_field' className='dynamicInput' type="text" title='enter yours pass)' required />
                  <label htmlFor="password_field" className="dynamicLabel">Password</label>
               </div>
               <div className="forgot"> <div className="forgot_text" onClick={() => { ResetPasswords() }}>Forgot your password?</div> </div>

               <div onClick={() => { login() }} className="button_container">
                  <button className="login_btn">Login</button>
                  <button className="login_btn_hover">Login</button>
               </div>
               <div className="new_cus"><div className="new_cus_text">New customer ?</div> </div>
               <div className="reg_btn_con"><button onClick={() => { authSwitch("register") }} className='register_btn'>Register</button></div>
            </div>
            <div className="register">
               <div className="register_fields_con">
                  <input value={fnReg} onChange={(e)=>{setFNReg(e.target.value);}} placeholder="Email" id='first_name_field' name='first_name_field' className='dynamicInputreg' type="text" title='enter yours first name)' required />
                  <label htmlFor="first_name_field" className="dynamicLabelr">First name*</label>
               </div>
               <div className="register_fields_con register_fields">
                  <input value={lnReg} onChange={(e)=>{setLNReg(e.target.value)}} placeholder="Email" id='last_name_field' title='enter yours last name)' name='last_name_field' className='dynamicInputreg' type="text" required />
                  <label htmlFor="last_name_field" className="dynamicLabelr">Last name*</label>
               </div>
               <div className="register_fields_con register_fields">
                  <input value={emailReg} onChange={(e)=>{setEmailReg(e.target.value)}} placeholder="Email" id='email_adress_field' title='enter yours email)' name='email_adress_field' className='dynamicInputreg' type="text" required />
                  <label htmlFor="email_adress_field" className="dynamicLabelr">Email adress*</label>
               </div>
               <div className="register_fields_con register_fields">
                  <input value={passReg} onChange={(e)=>{setPassReg(e.target.value)}} placeholder="Email" title='enter yours password)' id='pass_field' name='pass_field' className='dynamicInputreg' type="text" required />
                  <label htmlFor="pass_field" className="dynamicLabelr">Password*</label>
               </div>
               <div onClick={()=>{register()}} className="button_containerR">
                  <button className="login_btn">Register</button>
                  <button className="login_btn_hover">Register</button>
               </div>
               <div className='back_to_login'><div>You already have an account? To <span className="back_to_login_text" onClick={() => { authSwitch('login') }}>login</span></div> </div>


            </div>

         </div>

         {
            resetModal && (
               <ResetPassword ResetPasswords={ResetPasswords} />
            )
         }
      </div>
   )
}