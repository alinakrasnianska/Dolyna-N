import React, { useEffect, useState } from "react";
import './dist/acc_data.css'
import users from "../../services/user_services/user.service";
import { useNavigate } from "react-router-dom";
import SuccessChangeUserInfo from "../../modal-menu/success_change_user_info/success_change_user_info";
import { useSelector } from 'react-redux';


export default function AccData(props) {
   const languageRed = useSelector((state) => state.language.value);

   const [acc_data, setAccData] = useState(undefined)
   const [fname, setFirstName] = useState("")
   const [lname, setLastName] = useState("")
   const [cname, setCompanyName] = useState("")
   const [phone, setPhone] = useState("")

   const [fnameStatic, setFirstNameStatic] = useState("")
   const [lnameStatic, setLastNameStatic] = useState("")
   const [cnameStatic, setCompanyNameStatic] = useState("")
   const [phoneStatic, setPhoneStatic] = useState("")


   const navigate = useNavigate();

   const nav = (name) => {
      navigate(name);
    };

   const update_user = async(name, surname, phone, company_name, email)=>{
      const response = await users.update_user(name, surname, phone, company_name, email,nav)
      if(response){
         document.querySelector(".success-change-user-info_con").style.opacity = "1";
         document.querySelector(".success-change-user-info_con").style.right = "0";
         setTimeout(() => {
            document.querySelector(".success-change-user-info_con").style.opacity = "0";
            document.querySelector(".success-change-user-info_con").style.right = "-20vw";
         }, 3000);
         props.setPrevToken(document.cookie.split("=")[1])
         document.cookie ="dolyna-n=" + response.data.token
      }else{
         document.cookie = "dolyna-n=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
   }
   const post_update = ()=>{
      update_user(fname, lname, phone, cname, props.email)
   }

   useEffect(() => {
      if (props.account_data) {
         setAccData(props.account_data)
      }
   }, [props.account_data]);

   useEffect(() => {
      if (acc_data) {
         setFirstName(acc_data.name)
         setLastName(acc_data.surname)
         setCompanyName(acc_data.company_name)
         setPhone(acc_data.phone)

         setFirstNameStatic(acc_data.name)
         setLastNameStatic(acc_data.surname)
         setCompanyNameStatic(acc_data.company_name)
         setPhoneStatic(acc_data.phone)
      }
   }, [acc_data])


   const clearChanges = ()=>{
      setFirstName(fnameStatic)
      setLastName(lnameStatic)
      setCompanyName(cnameStatic)
      setPhone(phoneStatic)
   }

   return (
      <div className="acc_data">
         <header className="personal_data"> Personal Data </header>
         <main className="change_data_form">

            <div className="acc_data_fields_con">
               <input value={fname} onChange={(e) => { setFirstName(e.target.value) }} placeholder="Email" id='first_name_field' name='first_name_field' className='dynamicInputacc_data' type="text" required />
               <label htmlFor="first_name_field" className="dynamicLabeldata">{languageRed==="EN"?"First name":"Ім’я"}</label>
            </div>
            <div className="acc_data_fields_con register_fields">
               <input value={lname} onChange={(e) => { setLastName(e.target.value) }} placeholder="Email" id='last_name_field' name='last_name_field' className='dynamicInputacc_data' type="text" required />
               <label htmlFor="last_name_field" className="dynamicLabeldata">{languageRed==="EN"?"Last name":"Прізвище"}</label>
            </div>
            <div className="acc_data_fields_con register_fields">
               <input value={phone} onChange={(e) => { setPhone(e.target.value) }} placeholder="Email" id='acc_phone_field' name='acc_phone_field' className='dynamicInputacc_data' type="text" required />
               <label htmlFor="acc_phone_field" className="dynamicLabeldata">{languageRed==="EN"?"Phone number":"Номер телефону"}</label>
            </div>
            <div className="acc_data_fields_con register_fields">
               <input value={cname} onChange={(e) => { setCompanyName(e.target.value) }} placeholder="Email" id='company_name_acc_field' name='company_name_acc_field' className='dynamicInputacc_data' type="text" required />
               <label htmlFor="company_name_acc_field" className="dynamicLabeldata">{languageRed==="EN"?"Company name":"Назва компанії"}</label>
            </div>

            <div className="acc_data_btn_con">
               <button onClick={()=>{clearChanges()}} className="acc_data_btn acc_data_cancel">{languageRed==="EN"?"Cancel":"Скасувати"}</button>
               <button onClick={()=>{post_update()}} className="acc_data_btn acc_data_save">{languageRed==="EN"?"Save":"Зберегти"}</button>
            </div>
         </main>
         <SuccessChangeUserInfo />
      </div>
   )
} 