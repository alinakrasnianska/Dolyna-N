import React from "react";
import './dist/acc_overview.css'

export default class Overview extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         phone: "",
         email: '',
         last_req:['wheet','corn'],
         quantity: 2,
         cart : [],
         total_q : 0
      }
   }

   totalQ = ()=>{
      let total = 0 ;
      if(this.state.cart.length > 0){
         this.state.cart.map(e=>(
            total += parseFloat(e.quantity) 
         ))

      }
     
      this.setState({total_q: total})
   }


   phone_stabilizatior = (e) => {
      let input = e.target.value
      input = input.replace(/[^0-9+-]/g, '');
      if (input[0] !== '+') {
         input = '+' + input
      }
      input = input.replace(/(\+{2,})|(-{2,})/g, m => m[0]);
      input = input.replace(/(.+)\+/g, '$1');
      this.setState({ phone: input });
   }
   componentDidUpdate(prevProp,prevState){
      if(this.props.account_data !== prevProp.account_data){
         this.setState({email: this.props.account_data.email , phone: this.props.account_data.phone},()=>{
            this.props.setEmailProps(this.state.email)
         })
         this.setState({cart : this.props.account_data.last_order },()=>{
            this.totalQ() 
         })
      }
   }

   render() {
      return (
         <div className="acc_overview">
            <section className="acc_general_info">
               <div className="general_info_title">{this.props.languageRed === "EN"?"General contact":"Головна інформація"}</div>
               <div className="general_info_input_con">
                  <div className="general_input_con">
                     <input value={this.state.phone} onChange={this.phone_stabilizatior} className="general_info_input" type="text" maxLength="17" />
                     <img className="general_call_icon" src={process.env.PUBLIC_URL + '/img/call.svg'} alt="" />
                  </div>
                  <div className="general_input_con">
                     <input value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value },()=>{this.props.setEmailProps(this.state.email)}) }} className="general_info_input" type="email" />
                     <img className="general_call_icon" src={process.env.PUBLIC_URL + '/img/email.svg'} alt="" />
                  </div>
               </div>
            </section>
            <section className="acc_general_info">
               <div className="general_info_title">{this.props.languageRed === "EN"?"Your last requests for quotation":"Ваші останні запити:"}</div>
               <div className="general_info_request">
               {this.state.cart.length > 0?
                  this.state.cart.map(e => (
                     <main key={e.id} className="last_request">
                     <div className="last_req_text">
                     <div> {e.name} </div>
                     <div> {this.props.languageRed === "EN"?"Quantity":"Кількість"} {e.quantity} kg</div>
   
                     </div>
                     <div className="last_req_img_con">
                        <img className="last_req_img" src={e.imageUrl} alt="" />
                     </div>
                  </main>

                  ))
                  :''
               }

               <div className="total_quote_quntity">
               {this.props.languageRed === "EN"?"Total":"Загалом"} {this.state.total_q}
               </div>
               </div>
               
             
              
            </section>
         </div>
      )
   }
}