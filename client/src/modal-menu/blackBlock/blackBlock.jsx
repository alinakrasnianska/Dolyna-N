import React from "react";
import './dist/blackBlock.css'

function BlackBlock(props){

   const closer = ()=>{
      if(window.location.pathname === "/authorization"){
         props.ResetPasswords()
      }else if(window.location.pathname.includes("/products/")){
         props.cart_visible()
      }
   }
   return(
      <div onClick={() => closer()} className="BlackBlock"></div>
   )
}

export default BlackBlock