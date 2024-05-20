import React from "react";
import './dist/product_card.css'

import { useNavigate } from "react-router-dom";

import { useSelector } from 'react-redux';

export default function ProductCard(props) {
   const languageRed = useSelector((state) => state.language.value);
   const navigate = useNavigate();

   const nav = (name) => {
      navigate(name);
   };


   return (
      <div className={`product-card ${props.index % 2 === 0 ? "cardStyle1" : "cardStyle2"}`}>
         <div className="card_img_container">
            <img className="product-card_img" src={props.product.imageUrl} alt="product img" />
         </div>
         <div className="card_text_con">
            <div className="card_title">
               “{languageRed === "UA" ? props.product.name_ua : props.product.name_en}”
            </div>
            <div className="card_description">
               {languageRed === "UA" ? props.product.description_ua : props.product.description_en}
            </div>
            <div onClick={() => nav(`/products/${props.product.id}`)} className="card_button_request">
               REQUEST
            </div>
         </div>
      </div>
   )
}