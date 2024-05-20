import React from "react";
import './dist/our_products.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


export default function OurProducts(){
   const navigate = useNavigate();
   const languageRed = useSelector((state) => state.language.value);

   const nav = (name) => {
      navigate(name);
    };

   return(
      <div className="OurProdBlock">
         <div className="Our_prod_Title">{languageRed === "EN"?"Our products":"Наші продукти"}</div>
         <div className="Our_prod_Description">{languageRed === "EN"?<span>At Dolyna-N, our mission is to provide our customers, partners, <br/>and stakeholders with the best grain available. With a commitment<br/>to quality and sustainability, we aim to be <br/>the go-to platform for your grain needs.</span>:<span>Наша місія в компанії "Долина-Н" полягає в тому, щоб забезпечити наших <br/> клієнтів і партнерів найкращим зерном. З прихильністю до якості та <br/> сталого розвитку, ми прагнемо бути  <br/>
платформою для задоволення ваших потреб у зерні.</span>}</div>
         <button onClick={()=>{nav("/products")}} className="nav_to_prod">{languageRed === "EN"?"TO OUR PRODUCTS":"ДО НАШИХ ПРОДУКТІВ"} </button>
      </div>
   )
}