import React, { useEffect, useState } from 'react';
import './dist/slider.css';
import { useSelector } from 'react-redux';
import ChatAI from '../chat/chat';


export default function Slider() {
   const languageRed = useSelector((state) => state.language.value);
   const [chat, setChat] = useState(0)

   const [state, setState] = useState({
      current_img: 1,
      title: "Dolyna-N: Ukrainian high quality grain supplier",
      description: "Where quality, innovation, and sustainability are our daily business. We establish new benchmarks for products and environmentally conscious practices, always striving for continuous improvement."
   });
   const open_chat = () => {
      if (chat !== 0) {
         setChat(0)
      } else {
         setChat(1)
      }
   }

   useEffect(() => {
      const interval = setInterval(() => {
         setState(prevState => {
            const nextImg = prevState.current_img === 3 ? 1 : prevState.current_img + 1;
            return { ...prevState, current_img: nextImg };
         });
      }, 5000);
      return () => clearInterval(interval);
   }, []);

   useEffect(() => {
      const scroll_by_button = () => {
         let first = document.querySelector('#first_img');
         let second = document.querySelector('#second_img');
         let third = document.querySelector('#third_img');
         if (state.current_img === 1) {
            if (second.style.width !== "0") second.style.width = "0";
            if (third.style.width !== "0") third.style.width = "0";
            first.style.width = "33.3%";
            if (languageRed === "EN") {
               setState(prevState => ({ ...prevState, title: "Dolyna-N: Ukrainian high quality grain supplier", description: "Where quality, innovation, and sustainability are our daily business. We establish new benchmarks for products and environmentally conscious practices, always striving for continuous improvement." }));
            } else {
               setState(prevState => ({ ...prevState, title: "Долина-Н: Український постачальник високоякісного зерна", description: "Де якість, інновації та сталий розвиток є нашим щоденним бізнесом. Ми встановлюємо нові стандарти для продукції та екологічно свідомих практик, завжди прагнучи до постійного вдосконалення. " }));
            }

         }
         if (state.current_img === 2) {
            if (first.style.width !== "0") first.style.width = "0";
            if (third.style.width !== "0") third.style.width = "0";
            second.style.width = "33.3%";
            if (languageRed === "EN") {
               setState(prevState => ({ ...prevState, title: "Our Roots, Our Land", description: "As second-generation farmers, safeguarding our nature and traditions is our paramount commitment. Through sustainable practices and cutting-edge technology, we passionately advocate for the preservation of our environment, driven by our profound love for our land and its heritage." }));
            } else {
               setState(prevState => ({ ...prevState, title: "Наше коріння, наша земля", description: "Для нас, фермерів у другому поколінні, охорона природи та традицій є першочерговим обов'язком. Застосовуючи сталі практики та передові технології, ми пристрасно виступаємо за збереження нашого довкілля, керуючись глибокою любов'ю до нашої землі та її спадщини." }));
            }

         }
         if (state.current_img === 3) {
            if (first.style.width !== "0") first.style.width = "0";
            if (second.style.width !== "0") second.style.width = "0";
            third.style.width = "33.3%";
            if (languageRed === "EN") {
               setState(prevState => ({ ...prevState, title: "Since 1994, our products have shaped the Vinnytsia region", description: "As seasoned experts in the industry and with a relentless pursuit of improvement, our agricultural products epitomize outstanding quality and sustainable cultivation. For three decades, we have continuously raised our standards to meet your needs" }));
            } else {
               setState(prevState => ({ ...prevState, title: "З 1994 року наша продукція формує Вінниччину", description: "Будучи досвідченими експертами в галузі та невпинно прагнучи до вдосконалення, наша сільськогосподарська продукція є втіленням видатної якості та сталого вирощування. Протягом трьох десятиліть ми постійно підвищуємо наші стандарти, щоб задовольнити ваші потреби" }));

            }

         }
      };
      scroll_by_button();
   }, [state.current_img, languageRed]);

   const aboutUs = () => {
      const element = document.querySelector('.faf_con');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
   };

   return (
      <div className="img_slider">
         <div className="imgs_con">
            <div id="first_img" className="img_con">
               <div className="title title1">{state.title}</div>
               <div className="description description1">{state.description}</div>
               <img className="img_con_img" src={process.env.PUBLIC_URL + '/img/slider/first_slider.png'} alt="" />
            </div>
            <div id="second_img" className="img_con">
               <div className="title title2">{state.title}</div>
               <div className="description description2">{state.description}</div>
               <img className="img_con_img" src={process.env.PUBLIC_URL + '/img/slider/second_slider.png'} alt="" />
            </div>
            <div id="third_img" className="img_con">
               <div className="title title3">{state.title}</div>
               <div className="description description3">{state.description}</div>
               <img className="img_con_img" src={process.env.PUBLIC_URL + '/img/slider/third_slider.png'} alt="" />
            </div>
         </div>

         <div className="btn_bar_con">
            <div className="btn_bar">
               <div onClick={aboutUs} className="scroll_bottom">
                  <img src={process.env.PUBLIC_URL + '/img/scroll_down.svg'} alt="" />
               </div>
               <div className="scroll_imgs">
                  {[1, 2, 3].map(num => (
                     <div key={num} onClick={() => setState({ ...state, current_img: num })} className={state.current_img === num ? "scroll_menu active" : "scroll_menu"}></div>
                  ))}
                  <div onClick={() => { open_chat() }} className="connect_to_sap">
                     <img src={process.env.PUBLIC_URL + '/img/aibot.svg'} alt="" />
                  </div>
               </div>
            </div>
         </div>
         <div className="black_block"></div>
         <ChatAI chat={chat} open_chat={open_chat} />
      </div>
   );
}
