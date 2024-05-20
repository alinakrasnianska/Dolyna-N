import React from "react";
import './dist/cardSuccess.css'

export default function SuccessCartAdd(){
   return (
      <div className="success_con_add">
         <div className="success_icon_con">
            <img className="success_icon" src={process.env.PUBLIC_URL + '/img/cart/success.svg'} alt="" />
         </div>
         <div className="success_add_text">
            Product successfully added
         </div>
      </div>
   )
}