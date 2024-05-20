import React from 'react';
import './dist/footer.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


export default function Footer() {
   const navigate = useNavigate();
   const languageRed = useSelector((state) => state.language.value);
   const nav = (name) => {
      navigate(name);
   };

   const aboutUs = () => {
      if (window.location.pathname !== '/main') {
         nav('/main')
      }

      setTimeout(() => {
         const element = document.querySelector('.faf_con');
         if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
         }
      }, 500);
   }

   const ContactUs = () => {
      if (window.location.pathname !== '/main') {
         nav('/main')
      }

      setTimeout(() => {
         const element = document.querySelector('.send_form_con');
         if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
         }
      }, 500);
   }


   return (
      <div className="footer_block">
         <div className="footer_con">
            <div className="footer_top">
               <div className="short_logo_con">
                  <img className="short_logo" src={process.env.PUBLIC_URL + '/img/short_logo.svg'} alt="" />
               </div>
               <div className="location_con">
                  <div className="location"><div>{languageRed === "EN" ? "Location" : "Місцезнаходження"}:</div>
                     <div>{languageRed === "EN" ? "24413, Balanivka v., Vinnytsia r." : "24413, с. Баланівка, обл. Вінниця"}</div>
                  </div>
                  <div className="contact">
                     <div>{languageRed === "EN" ? "Contact" : "Контакти"}</div>
                     <a className='user_links' href="tel:+380961126340"><div>+380961126340</div></a>
                     <div>dolynan.grainsupplier@gmail.com</div>
                  </div>
               </div>
               <div className="footer_navigator">
                  <div onClick={() => { aboutUs() }} className="footer_navigator_e">{languageRed === "EN" ? "About us" : "Про нас"}</div>
                  <div onClick={() => { nav('/products') }} className="footer_navigator_e">{languageRed === "EN" ? "Our products" : "Наші продукти"}</div>
                  <div onClick={() => { ContactUs() }} className="footer_navigator_e">{languageRed === "EN" ? "Our products" : "Написати нам"}</div>
                  <div onClick={() => { nav('/account') }} className="footer_navigator_e">{languageRed === "EN" ? "My account" : "Мій акаунт"}</div>
               </div>
               <div className="footer_contactus">
                  <div className="footer_contactus_title">{languageRed === "EN" ? "Follow us:" : "Стежте за нами:"}</div>
                  <div className="media_net">
                     <img className="links_img" src={process.env.PUBLIC_URL + '/img/links/inst.svg'} alt="" />
                     <img className="links_img" src={process.env.PUBLIC_URL + '/img/links/facebook.svg'} alt="" />
                     <img className="links_img" src={process.env.PUBLIC_URL + '/img/links/linkedin.svg'} alt="" />
                  </div>
               </div>
            </div>
         </div>
         <div className="footer_line">

         </div>
         <div className="footer_bottom">
            <div>© 2024 Dolyna-N. All rights reserved.</div>
            <div>Cookies Policy</div>
         </div>
      </div>
   )
   
}
