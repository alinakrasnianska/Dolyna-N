import React from "react";
import './dist/passwordreset.css'
import BlackBlock from "../blackBlock/blackBlock";
import SuccessModalReset from "../success_reset/successReset"
import password from "../../services/recoverPass/recover.service.js"

export default class ResetPassword extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         success: false
      }
   }

   send = async () => {
      if (this.state.email !== '' && this.state.email.includes("@")) {
         const response = await password.recover(this.state.email)
         this.setState({ success: true }, () => {
            setTimeout(() => {
               let success_con = document.getElementById("success_con")
               success_con.style.top = "0"
               setTimeout(() => {
                  success_con.style.top = "-20vh"
                  setTimeout(() => {
                     this.setState({ success: false }, () => { this.props.ResetPasswords() })
                  }, 250);
               }, 3000);
            }, 50);
            return response
         })
      }
   }


   render() {
      return (
         <div className="reset_password_con">
            {this.state.success ? <SuccessModalReset /> : ""}
            <div className="reset_modal">
               <div className="reset_sizer">
                  <div className="reset_forgot">Forgot your password?</div>
                  <div className="reset_fields_con">
                     <input value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} placeholder="Email" id='reset_field' name='reset_field' className='dynamicInputreset' type="text" required />
                     <label htmlFor="reset_field" className="dynamicLabelreset">Email</label>
                  </div>
                  <div className="reset_button_con">
                     <button onClick={() => { this.props.ResetPasswords() }} className="reset_btn_text reset_btn_close">Close</button>
                     <button onClick={() => { this.send() }} className="reset_btn_text reset_btn_send">Send</button>
                  </div>

               </div>
            </div>
            <BlackBlock ResetPasswords={this.props.ResetPasswords} />
         </div>
      )
   }
}