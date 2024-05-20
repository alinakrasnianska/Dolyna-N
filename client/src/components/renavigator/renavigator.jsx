import React ,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Renavigator(){
   const navigate = useNavigate();

   const nav = (name) => {
      navigate(name);
    };

    useEffect(() => {
      if(window.location.pathname === '/'){
         nav('/main')
      }
    });  


   return(
      <div>Renavigation</div>
   )
}

export default Renavigator