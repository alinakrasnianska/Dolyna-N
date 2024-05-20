import React, { useState } from "react";
import './dist/send_form.css';
import form from "../../services/form-services/form.service";
import { useSelector } from 'react-redux';


export default function SendForm() {
   const languageRed = useSelector((state) => state.language.value);

   const [formData, setFormData] = useState({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      errorMessage: ""
   });

   const allRed = () => {
      const fields = ["name", "email", "company", "phone", "message"];
      fields.forEach(field => {
         const input = document.getElementById(`contact_${field}`);
         if (input) input.style.borderBottom = 'solid 2px red';
      });

      setTimeout(() => {
         fields.forEach(field => {
            const input = document.getElementById(`contact_${field}`);
            if (input) input.style.borderBottom = 'solid 2px #D9D9D9';
         });
         setFormData({ ...formData, errorMessage: "" });
      }, 4000);
   };

   const sendForm = async (name, email, company, phone, message) => {
      if (name !== '' && email !== '' && company !== '' && phone !== '' && message !== '') {
         if (name.length > 1) {
            if (email.includes('@')) {
               if (/[0-9]+/.test(phone)) {
                  const response = await form.contactUs(name, email, company, phone, message);
                  setFormData({ name: '', email: '', company: '', phone: '', message: '' });
                  return response;
               } else {
                  setFormData({ errorMessage: "Remove letters from number" });
                  allRed();
               }
            } else {
               setFormData({ errorMessage: "Email must have @" });
               allRed();
            }
         } else {
            setFormData({ errorMessage: "Name is too short" });
            allRed();
         }
      } else {
         setFormData({ errorMessage: "data can not be empty" });
         allRed();
      }
   };

   return (
      <div className="send_form_con">
         <div className="send_form">
            <div className="send_form_title"><div>{languageRed==="EN"?"Contact us":"Написати нам"}</div> </div>
            <div className="send_form_first_row">
               <div className="contact_fields_con">
                  <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" id='contact_name' name='contact_name' className='dynamicInputLittle' type="text" required />
                  <label htmlFor="contact_name" className="dynamicLabelLittle">{languageRed==="EN"?"Name*":"Ім'я"}</label>
               </div>
               <div className="contact_fields_con">
                  <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" id='contact_email' name='contact_email' className='dynamicInputLittle' type="email" required />
                  <label htmlFor="contact_email" className="dynamicLabelLittle">{languageRed==="EN"?"E-mail*":"Ел.пошта"}</label>
               </div>
            </div>
            <div className="send_form_first_row ">
               <div className="contact_fields_con">
                  <input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Company" id='contact_company' name='contact_company' className='dynamicInputLittle' type="text" required />
                  <label htmlFor="contact_company" className="dynamicLabelLittle">{languageRed==="EN"?"Company":"Компанія"}</label>
               </div>
               <div className="contact_fields_con">
                  <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Number" id='contact_phone' name='contact_phone' className='dynamicInputLittle' type="number" required />
                  <label htmlFor="contact_phone" className="dynamicLabelLittle">{languageRed==="EN"?"Phone Nubmer":"Номер телефону"}</label>
               </div>
            </div>
            <div className="contact_fields_con_full">
               <input value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Message" id='contact_message' name='contact_message' className='dynamicInputBig' type="text" required />
               <label htmlFor="contact_message" className="dynamicLabelBig">{languageRed==="EN"?"Message*":"Повідомлення*"}</label>
            </div>
            <div className="error_message_send_form">{formData.errorMessage}</div>
            <div onClick={() => sendForm(formData.name, formData.email, formData.company, formData.phone, formData.message)} className="button_container_send">
               <button className="send_contact_form_hover">{languageRed==="EN"?"Send*":"Надіслати*"}</button>
               <button className="send_contact_form">{languageRed==="EN"?"Send*":"Надіслати*"}</button>
            </div>
         </div>
         <div className="map_con">
            <iframe
               src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d84736.52543485665!2d29.363457314976472!3d48.417829080938226!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cda35fdb2775af%3A0x441d91c06f0d93aa!2z0JHQsNC70LDQvdC-0LLQutCwLCDQktC40L3QvdC40YbQutCw0Y8g0L7QsdC70LDRgdGC0YwsIDI0NDEz!5e0!3m2!1sua!2sen!4v1709903860704!5m2!1sua!2sen"
               width="100%"
               height="100%"
               style={{ border: 0 }}
               title="googleMap" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
         </div>
      </div>
   );
}
