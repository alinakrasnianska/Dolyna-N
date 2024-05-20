import React from 'react';
import './dist/profile.css';
import AccountHeader from '../../components/accountHeader/acountheader';
import Overview from '../../components/accountoverview/acc_overview';
import AccData from '../../components/acc_data/acc_data';
import { jwtDecode } from "jwt-decode";

export default class Profile extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         account_data: undefined,
         token:undefined,
         prevToken:undefined,
         email:""
      }
   }

   setEmailProps = (email)=>{
      this.setState({email: email})
   }


   setPrevToken = (token)=>{
      this.setState({prevToken:token},()=>{
      })
   } 

   jwtUncode = () =>{
      if(this.state.token){
         if (this.state.token.split("=")[0] === "dolyna-n") {
            const uncoded = jwtDecode(this.state.token.split("=")[1]);
            this.setState({account_data: uncoded})
         }
      }
   }
   token_stater = () =>{
         const token_cookie = document.cookie
         this.setState({token:token_cookie},()=>{
            this.jwtUncode()
            this.setState({prevToken:this.state.token})
         })
   }
   componentDidUpdate(prevProps, prevState) {
      if(this.state.token !== prevState.token || this.state.token === undefined || this.state.token !== this.state.prevToken){
         this.token_stater()
      }
   }


   componentDidMount(){
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
      this.token_stater()
   }
   render() { return(
      <main className="profile_con">
         <AccountHeader  account_data={this.state.account_data} page_slider={this.page_slider} />
         <section className="profile_main">
            <Overview languageRed={this.props.languageRed}  setEmailProps={this.setEmailProps} account_data={this.state.account_data} />
            <AccData email={this.state.email} setPrevToken={this.setPrevToken} account_data={this.state.account_data} />

         </section>
      </main>
   )}
}