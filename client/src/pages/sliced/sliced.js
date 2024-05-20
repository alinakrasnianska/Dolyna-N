import React, { useCallback, useEffect, useState } from 'react';
import './dist/sliced.css'

import { useNavigate } from "react-router-dom";


export default function Sliser(){
   const [counter,setCounter] = useState(3)

   const navigate = useNavigate();

   const nav = useCallback((name) => {
      navigate(name);
    },[navigate]) 
    
   useEffect(()=>{
      setTimeout(()=>{
         setCounter(counter - 1)
      },1000)
      if(counter < 0){
         nav('/')
      }
   },[counter,nav])
   return(
      <div className="banned_cont">
         <div className='red_banned'>WRONG USER or PASSCODE</div>
         <div className='counter_text_banned'>Redirect in <span className='yellow_banned'>{counter}</span></div>
      </div>
   )
}