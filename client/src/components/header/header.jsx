import React,{useState} from 'react';
import './dist/header.css';
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { setEn, setUa } from '../../reducers/languageReducer';



export default function Header(){
   const [language,setLanguage] = useState('EN')
   const dispatch = useDispatch();
   const languageRed = useSelector((state) => state.language.value);


   const navigate = useNavigate();

   const nav = (name) => {
      navigate(name);
    };

   const changeLanguage = ()=>{
      if(language !== "EN"){
         document.querySelector("#UAlanguage").style.color = 'black'
         document.querySelector("#ENlanguage").style.color = '#FFB75E'
         setLanguage("EN")
         dispatch(setEn());
      }else{
         document.querySelector("#ENlanguage").style.color = 'black'
         document.querySelector("#UAlanguage").style.color = '#FFB75E'
         setLanguage("UA")
         dispatch(setUa());
      }
   }

   const aboutUs = () =>{
      if(window.location.pathname !== '/main'){
         nav('/main')
      }

      setTimeout(() => {
         const element = document.querySelector('.faf_con');
         if(element){
            element.scrollIntoView({ behavior: 'smooth' });
         } 
       }, 500);
   }

   const ContactUs = () =>{
      if(window.location.pathname !== '/main'){
         nav('/main')
      }

      setTimeout(() => {
         const element = document.querySelector('.send_form_con');
         if(element){
            element.scrollIntoView({ behavior: 'smooth' });
         } 
       }, 500);
   }

   return (
      <div className="header_con">
         <div className="header">
            <div onClick={()=>{nav('/main')}} className="logo_con">
               <img className="logo" src={process.env.PUBLIC_URL + '/img/big_logo.svg'} alt="sd" />
            </div>
            <nav className="nav">
               <div onClick={()=>{aboutUs()}} className="nav_element">{languageRed === "EN"?"About us":"Про нас"}</div>
               <div onClick={()=>{nav('/products')}} className="nav_element">{languageRed === "EN"?"Products":"Продукти"}</div>
               <div onClick={()=>{ContactUs()}} className="nav_element">{languageRed === "EN"?"Contacts":"Контакти"}</div>
               <div onClick={()=>{nav('/account')}} className="nav_element">{languageRed === "EN"?"My account":"Мій аккаунт"}</div>
               <div onClick={()=>{changeLanguage()}} className="nav_element"><span id="UAlanguage" style={{transition:'0.2s' }}>UA</span>|<span id="ENlanguage" style={{ color: '#FFB75E', transition:'0.2s' }}>EN</span></div>
            </nav>
         </div>
         <div className="line"></div>
      </div>
    );
}