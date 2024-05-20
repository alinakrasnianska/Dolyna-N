import React, { useState } from "react";
import './dist/add_cereals.css'
import admin from "../../services/admin_services/admin.service";
import evalid from "../../validators/emailValidator";
import ivalid from "../../validators/imageValidator";

export default function AddCereals(props) {
   const [name_ua, setName_ua] = useState("")
   const [name_en, setName_en] = useState("")
   const [decription_ua, setDecription_ua] = useState("")
   const [decription_en, setDecription_en] = useState("")
   const [image, setImage] = useState(undefined)

   const [adminError, setAdminError] = useState("")

   const clear_ua = () => {
      setName_ua('')
      setDecription_ua('')
   }
   const clear_en = () => {
      setName_en('')
      setDecription_en('')
   }


   const allRed = () => {

      let nameInt = document.querySelector('#admin_name_cereals')
      let description = document.querySelector('#admin_decription_cereals')

      nameInt.style.borderBottom = '2px solid red'
      description.style.borderBottom = '2px solid red'

      nameInt.onclick = () => {
         nameInt.style.borderBottom = '2px solid #D9D9D9'
         description.style.borderBottom = '2px solid #D9D9D9'
         setName_ua('')
         setName_en('')
      }
      description.onclick = () => {
         nameInt.style.borderBottom = '2px solid #D9D9D9'
         description.style.borderBottom = '2px solid #D9D9D9'
         setDecription_ua('')
         setDecription_en('')

      }
   }



   const systemAddCereal = async () => {
      try {
         if (evalid.nameValidator(name_ua) === name_ua && evalid.nameValidator(name_en) === name_en) {
            if (ivalid.imageValidator(image) === image) {
               if (ivalid.descriptionValidator(decription_ua) === decription_ua && ivalid.descriptionValidator(decription_en) === decription_en) {
                  const response = await admin.add_cereal(name_ua, name_en, decription_ua, decription_en, image)
                  console.log(response.data.message);
                  setName_en('')
                  setName_ua('')
                  setDecription_en('')
                  setDecription_ua('')
                  setImage(undefined)
                  setAdminError('')
               } else {
                  setAdminError(ivalid.descriptionValidator(decription_en))
                  allRed()
               }
            } else {
               setAdminError(ivalid.imageValidator(image))
               allRed()
            }
         } else {
            setAdminError(evalid.nameValidator(name_en))
            allRed()
         }
      } catch (error) {
         setAdminError("Request Error " + error)
      }

   }
   return (
      <div className="add_cereals-block">
         <header className="add_cereals-title">Add Cereal</header>
         <div className="admin_alert">{adminError}</div>
         <div className="main_con">
            <main className="add_cereals-main">
               <div className="lang_mark">EN</div>
               <div className="admin_fields_con">
                  <input value={name_en} onChange={(e) => { setName_en(e.target.value) }} placeholder="admin_name_cereal" id='admin_name_cereals' name='admin_name_cereals' className='adminInput' type="text" title='enter yours email' required />
                  <label htmlFor="admin_name_cereals" className="adminLabel">Name/Title*</label>
               </div>
               <div className="admin_fields_con second_admin_con">
                  <input value={decription_en} onChange={(e) => { setDecription_en(e.target.value) }} placeholder="admin_decription_cereal" id='admin_decription_cereals' name='admin_decription_cereals' className='adminInput' type="text" title='enter yours email' required />
                  <label htmlFor="admin_decription_cereals" className="adminLabel">Decription*</label>
                  <div className={decription_en.length > 0 ? "description_counter" : "description_counter_zero"}>{decription_en.length}</div>
               </div>
               <div className="addImg_cereal_con">
                  <label className={image ? "adminLabel_accepted" : "adminLabel_accept"} htmlFor="admin_cereal_img">{image ? image.name : "Додати фото(формати: png, jpeg, jpg)"}</label>
                  <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id="admin_cereal_img" name="admin_cereal_img" accept="image/png, image/jpeg" className="img_input" />
               </div>
               <div className="admin_buttons_block">
                  <button onClick={() => { clear_en() }} className="admin_buttons admin_clear_cereal">Clear</button>
                  <button onClick={() => { systemAddCereal() }} className="admin_buttons admin_add_cereal">ADD</button>
               </div>
            </main>
            <main className="add_cereals-main">
               <div className="lang_mark">UA</div>
               <div className="admin_fields_con">
                  <input value={name_ua} onChange={(e) => { setName_ua(e.target.value) }} placeholder="admin_name_cereal" id='admin_name_cereals' name='admin_name_cereals' className='adminInput' type="text" title='enter yours email' required />
                  <label htmlFor="admin_name_cereals" className="adminLabel">Name/Title*</label>
               </div>
               <div className="admin_fields_con second_admin_con">
                  <input value={decription_ua} onChange={(e) => { setDecription_ua(e.target.value) }} placeholder="admin_decription_cereal" id='admin_decription_cereals' name='admin_decription_cereals' className='adminInput' type="text" title='enter yours email' required />
                  <label htmlFor="admin_decription_cereals" className="adminLabel">Decription*</label>
                  <div className={decription_ua.length > 0 ? "description_counter" : "description_counter_zero"}>{decription_ua.length}</div>
               </div>
               <div className="admin_buttons_block">
                  <button onClick={() => { clear_ua() }} className="admin_buttons admin_clear_cereal">Clear</button>
               </div>
            </main>

         </div>


      </div>
   )
}