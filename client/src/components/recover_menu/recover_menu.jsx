import React, { useState, useEffect, useCallback } from "react";
import './dist/recover_menu.css'
import password from "../../services/recoverPass/recover.service";
import { useNavigate } from "react-router-dom";

export default function RecoverMenu() {
   const navigate = useNavigate();

   const nav = useCallback(
      (name) => {
         navigate(name);
      }, [navigate])

   const [new_pass, setNew_Pass] = useState('')
   const [new_passCon, setNewPassCon] = useState('')
   const [cypher, setCypher] = useState('')

   const [isDate, setIsDate] = useState(true)

   const raw_data = () => {
      const cyphere = window.location.pathname.replace('/recover/', '')
      setCypher(cyphere)
   }
   const set_pass = async (pass) => {
      if (pass.length > 6) {
         const response = await password.set_pass(pass)
         if (response) {
            console.log(response.data.token)
            document.cookie = "dolyna-n=" + response.data.token
            return response
         }
      }
   }
   const allRed = () => {
      let pass = document.querySelector('#new_pass')
      let passCon = document.querySelector('#new_pass_field')

      pass.style.borderBottom = "solid 3px red"
      passCon.style.borderBottom = "solid 3px red"
      setTimeout(() => {
         pass.style.borderBottom = "solid 3px #D9D9D9"
         passCon.style.borderBottom = "solid 3px #D9D9D9"
      }, 5000);

   }
   const set_pass_boofer = useCallback(async () => {
      if (new_pass !== new_passCon) {
         allRed()
      } else {
         if (new_pass.length < 7) {
            allRed()
         } else {
            await set_pass(new_pass)

            setTimeout(() => {
               nav('/authorization')

            }, 500);
         }
      }

   }, [new_pass, new_passCon, nav])



   const change_pass = useCallback(async () => {
      try { 
         raw_data()
         const response = await password.decypher(cypher)
         if (response) {
            document.cookie = "dolyna-n=" + response.data.token
            return response
         }

      } catch (error) {
         if (error.response.data.message === "403 date is banned") {
            setIsDate(false)
         }
      }

   }, [cypher])

   useEffect(() => {
      raw_data()
      if (cypher !== '') {
         change_pass()
      }
   }, [cypher, change_pass]);


   return (
      <div className="recover_menu_con">
         {isDate ?
            <div className="recover_menu">

               <div className="recover_menu_fields_con">
                  <input value={new_pass} onChange={(e) => { setNew_Pass(e.target.value) }} placeholder="new_pass" id='new_pass' name='new_pass' className='dynamicInputRecover' type="text" title='enter new password' required />
                  <label htmlFor="new_pass" className="dynamicLabelRecover">New Password</label>
               </div>
               <div className="recover_menu_fields_con register_fields">
                  <input value={new_passCon} onChange={(e) => { setNewPassCon(e.target.value) }} placeholder="confirm" id='new_pass_field' name='new_pass_field' className='dynamicInputRecover' type="text" title='enter yours pass)' required />
                  <label htmlFor="new_pass_field" className="dynamicLabelRecover">Password</label>
               </div>

               <div onClick={() => { set_pass_boofer() }} className="button_container_recover">
                  <button className="login_btn_recover">Confirm</button>
                  <button className="login_btn_recover_hover">Confirm</button>
               </div>
            </div>
            :
            <div className="expired_date">
               <div className="expired_text">
                  Expired...
               </div>
               <div onClick={() => { nav('/authorization') }} className="expired_link" >
                  back to authorization
               </div>
            </div>}


      </div>
   )
}