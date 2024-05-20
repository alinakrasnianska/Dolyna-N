import React,{useEffect,useCallback} from "react";
import './dist/admin.css'
import AddCereals from "../../components/add_cereals/add_cereals";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import admin_user  from "../../config/config.js"
import admin from "../../services/admin_services/admin.service.js";


export default function Admin() {

   const navigate = useNavigate();

   const nav = useCallback((name) => {
      navigate(name);
   },[navigate]) ;



   const verify = useCallback(async (key_sync) => {
      const isAdmin = await admin.admin_compare(key_sync)
      if(isAdmin.data.request){  
         return 0
      }else{
         nav('/wrongUncough')
      }
   },[nav]) 

 

   useEffect(()=>{
      let data = sessionStorage.getItem("dolynan-super_inf"); 
      if(data){
         verify(data)
      }else{
         nav('/admincheker')
      }

   },[verify,nav]) 
   useEffect(() => {
      const token = document.cookie
      if(token){
         if (token.split("=")[0] === "dolyna-n") {
            const uncoded = jwtDecode(token.split("=")[1]);
            if(uncoded.email !== admin_user.admin_email && uncoded.exp !== 
               admin_user.admin_code){
               nav('/main')
            }
         }
      }else{
         nav('/main')
      }
      
   },[nav]);
   return (
      <div className="adminPanel">
         <AddCereals />   
      </div>
   )
}