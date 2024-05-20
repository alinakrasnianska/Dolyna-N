import React, { useEffect, useState, useRef } from "react";
import botMSG from "../../services/bot/bot.service.js";
import './dist/chat.css';


export default function ChatAI({ chat, open_chat }) {

   const [scrollY, setScrollY] = useState(0);
   const [text_msg, setText_msg] = useState("")
   const [msg_arr, setMsgArr] = useState([])
   const scroll_controller = useRef(null)
   const [isLoading, setIsLoading] = useState(false);


   const documentScroll = () => {
      setScrollY(window.scrollY);
   };


   const send_message = async () => {

      if (text_msg.trim() !== "") {
         const user_message = {
            role: "user",
            type: "res",
            content: text_msg,
            content_type: "text"
         }
         setMsgArr(prevState => [...prevState, user_message]);
         setIsLoading(true);
         const response = await botMSG.send_message(text_msg)
         if (response.msg === "success") {
            const assistantMessage = response.messages.find(message => message.role === "assistant" && message.type === "answer");
            if (assistantMessage) {
               setMsgArr(prevState => [...prevState, assistantMessage]);
            }
         }
         setText_msg("")
         setIsLoading(false);
         return response
      }
   }

   useEffect(() => {
      scroll_controller.current = 0
      window.addEventListener('scroll', documentScroll);
      return () => {
         window.removeEventListener('scroll', documentScroll);
      };
   }, []);

   useEffect(() => {
      if (scrollY > 13) {
         if (scroll_controller.current === 0) {
            scroll_controller.current = 1
            let chatBox = document.querySelector('.chatAI-box')
            chatBox.style.top = '0.5vh'
            chatBox.style.height = '99vh'
         }
      } else {
         scroll_controller.current = 0
         let chatBox = document.querySelector('.chatAI-box')
         chatBox.style.top = '11.5vh'
         chatBox.style.height = '87.46vh'

      }
   }, [scrollY])





   useEffect(() => {
      let chatBox = document.querySelector('.chatAI-box')
      if (chat === 1) {
         chatBox.style.width = '39.44vw'
         chatBox.style.padding = '0 13px '
      } else {
         chatBox.style.width = '0'
         chatBox.style.padding = '0'
      }
   }, [chat])
   return (
      <div className="chatAI-box">
         <header className="chatAI-header">
            <div className="chatAI-title">
               Dolyna-n Bot
            </div>
            <div onClick={() => open_chat()} className="chatAI-arrow-back">
               <div className="chatAI-arrow"></div>
            </div>
         </header>
         <main className="message_con">


            {msg_arr.map(e => (
               <div key={e.content} className={`msg_con ${e.role === 'assistant' ? 'bot_msg_con' : 'user_msg_con'}`}>
                  <div className={`${e.role === 'assistant' ? 'bot_msg' : 'user_msg'}`}>
                     {e.content}
                  </div>
               </div>

            ))}
         </main>
         <footer className="input_field_message">
            <textarea value={text_msg} onChange={(e) => { setText_msg(e.target.value) }} className="input_message" type="text" disabled={isLoading} />
            <div onClick={() => send_message()} className="send_msg_con">
               <div className="send_msg_arr"></div>
            </div>
         </footer>
         {isLoading &&
            <div className="msg_loader">
               <img className="msg_loader_gif" src={process.env.PUBLIC_URL + '/img/grain_load.gif'} alt="" />
            </div>
         }
         <div className="chatAI-background">
            <img src={process.env.PUBLIC_URL + '/img/big_logo.png'} alt="" />
         </div>
      </div>
   )
}