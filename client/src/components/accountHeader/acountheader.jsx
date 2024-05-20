import React, { useState, useEffect } from "react";
import './dist/accountheader.css'
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


export default function AccountHeader(props) {
   const [slider_pos, setSlider] = useState("acc_data")
   const navigate = useNavigate();
   const [acc_data,setAccData] = useState(undefined)
   const languageRed = useSelector((state) => state.language.value);

   const nav = useCallback((name) => {
      navigate(name);
   },[navigate]) ;

   useEffect(() => {
      if (props.account_data) {
         setAccData(props.account_data)
      } else {
         const token = document.cookie
         if (token) {
            if (token.split("=")[0] === "dolyna-n") {
               return
            }
         }
         else{
            nav('/authorization')
         }
      }
   }, [props.account_data,nav]);

   const slide = useCallback(() => {
      let slider = document.querySelector(".header_line_slider")
      let acc_data = document.querySelector(".acc_data")
      let overview = document.querySelector(".acc_overview")
      if (slider_pos !== "acc_data") {
         slider.style.left = "8.4vw"
         slider.style.width = "7.4vw"
         overview.style.width = "0"
         acc_data.style.width = "100%"
         acc_data.style.height = "102.734375vh"
         overview.style.height = "102.734375vh"

      } else {
         slider.style.width = "5vw"
         slider.style.left = "0"
         acc_data.style.width = "0"
         overview.style.width = "100%"
         overview.style.height = "53.3203125vh"
         acc_data.style.height = "53.3203125vh"

      }
   }, [slider_pos])

   const logout = () => {
      document.cookie = `dolyna-n=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      nav("/authorization")
   }

   useEffect(() => {
      slide()
   }, [slider_pos, slide]);


   return (
      <header className="accountheader">
         <div className="accountheader_title">{languageRed === "EN"?"Welcome":"Доброго дня"}, {acc_data?acc_data.name +" " + acc_data.surname:"LOGIN"}</div>
         <div className="header_slider_menu">
            <div className="slider_menu_con">
               <div onClick={() => { setSlider("acc_data"); }} className="header_point">{languageRed === "EN"?"Overview":"Огляд"}</div>
               <div onClick={() => { setSlider("overview") }} className="header_point">{languageRed === "EN"?"Account Data":"Дані облікового запису"}</div>
               <div className="header_line_slider"></div>
            </div>
            <div onClick={() => { logout() }} className="log_out_btn">{languageRed === "EN"?"Logout":"Вийти"}</div>

         </div>
      </header>
   )
}