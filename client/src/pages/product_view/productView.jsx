import React, { useState, useEffect } from "react";
import './dist/productView.css'
import { useParams } from 'react-router-dom';
import Cart from "../../modal-menu/cart/cart";
import { useNavigate } from "react-router-dom";

import { useSelector } from 'react-redux';
export default function ProductView(props) {
   const languageRed = useSelector((state) => state.language.value);
   const { id } = useParams();
   const [quantity, setQuantity] = useState('')
   const [item, setItem] = useState(null)

   const [cart, setCart] = useState("hidden")


   const navigate = useNavigate();

   const nav = (name) => {
      navigate(name);
   };

   const quantity_change = (e) => {
      let filter_val = e.target.value;
      filter_val = filter_val.replace(/[^0-9.]/g, '');

      const dotCount = (filter_val.match(/\./g) || []).length;
      if (dotCount > 1) {
         filter_val = filter_val.substring(0, filter_val.lastIndexOf('.'));
      }

      if (filter_val.length > 1 && filter_val[0] === '0' && filter_val[1] !== '.') {
         filter_val = filter_val.substring(0, 1) + "." + filter_val.substring(1);
      }
      setQuantity(filter_val);
   }

   const cart_visible = () => {
      if (cart === "hidden") {
         setCart("visible")
      } else {
         setCart("hidden")
      }
   }


   useEffect(() => {
      let add_to_card = document.querySelector(".add_to_cart")

      if (quantity.length === 0 || quantity === '0' || quantity === '0.') {
         add_to_card.style.opacity = '40%';
      } else {
         add_to_card.style.opacity = '100%';
      }
   }, [quantity]);


   useEffect(() => {
      Promise.resolve(props.data).then(data => {
         if (Array.isArray(data) && data.length > 0) {
            let fitem = data.find(e => {
               if (e.id.toString() === id) {
                  return e
               } else {
                  return 0
               }
            })

            if (fitem !== 0) {
               setItem(fitem)
            }
         }
      }).catch(error => {
         console.error('Error with array:', error);
      });
   }, [props.data, id]);

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   }, [])

   const request_cart = () => {
      if (!item || quantity.length === 0 || quantity === '0' || quantity === '0.') {
         return 1
      } else {
         let element = {
            id: item.id,
            name: item.name_en,
            description: item.description_en,
            imageUrl: item.imageUrl,
            quantity: quantity
         }
         props.addtocart(element)
         cart_visible()
         setQuantity('')
      }
   }


   return (
      <section className="product-view_con">
         <main className="product-view">
            <div className="view_content">
               <header className="view-title">{item ? languageRed === "UA" ? item.name_ua : languageRed === "EN" ? item.name_en : 'Loading' : 'Loading'}</header>
               <main className="view-form">
                  <input id="form_title" name="form_title" value={quantity} onChange={e => quantity_change(e)} type="text" maxLength="10" className="view_form_input" />
                  <label htmlFor="form_title" className="form_title_label">Quantity in kilograms*</label>
                  <div className="view_form_input_icon">kg</div>
                  <button onClick={() => request_cart()} className="add_to_cart">Request</button>
               </main>
            </div>

            <div className="view_picture">
               <img className="view_picture_img" src={item ? item.imageUrl ? item.imageUrl : "Loading" : "Loading"} alt="request img" />
            </div>
         </main>
         {cart !== "hidden" ? <Cart delete_from_cart={props.delete_from_cart} cartData={props.cartData} cart_visible={cart_visible} /> : ''}
         <div onClick={() => { nav("/products") }} className="arrow_back_to_cereals">
            <div className="arrow_back_button"></div>
         </div>
      </section>
   )
}