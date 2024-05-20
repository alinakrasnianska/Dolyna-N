import React, { useState } from "react";
import './dist/adminCheker.css'
import admin from "../../services/admin_services/admin.service";
import { useNavigate } from "react-router-dom";


export default function AdminCheker() {
   const [key, setKey] = useState('')

   
   const navigate = useNavigate();

   const nav = (name) => {
      navigate(name);
   }

   const verify = async (key_sync) => {
      const isAdmin = await admin.admin_compare(key_sync)
      if(isAdmin.data.request){  
         sessionStorage.setItem("dolynan-super_inf", key_sync);
         nav('/adminPanel')
      }else{
         nav('/wrongUncough')
      }
   }

   return (
      <div className="admin_cheker_key_con">
         <div className="admin_cheker_key">
            <div className="admin_cheker_title">Enter a secret code:</div>
            <div className="admin_cheker_input_con">
               <input value={key} onChange={(e) => { setKey(e.target.value) }} className="admin_cheker_input" type="text" />
            </div>
            <div className="admin_cheker_button_con">
               <button onClick={() => { verify(key) }} className="admin_cheker_button">Submit</button>
            </div>


         </div>

      </div>
   )
}