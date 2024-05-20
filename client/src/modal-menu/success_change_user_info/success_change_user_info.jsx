import React from "react";
import './dist/success_change_user_info.css'

export default function SuccessChangeUserInfo(){
   return (
      <div className="success-change-user-info_con">
          <div className="success_icon_con">
            <img className="success_icon" src={process.env.PUBLIC_URL + '/img/cart/success.svg'} alt="" />
         </div>
         <div className="success_add_text">
            Success : Infomation updated
         </div>

      </div>
   )
}