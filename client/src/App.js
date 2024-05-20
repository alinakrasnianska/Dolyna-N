import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Authorization from './pages/authorization/authorization';
import Renavigator from './components/renavigator/renavigator';
import Main from './pages/main/main';
import Products from './pages/products/products';
import Profile from './pages/profile/profile';
import ProductView from './pages/product_view/productView';
import { useState, useEffect } from 'react';
import Admin from './pages/admin/admin';
import Sliser from './pages/sliced/sliced';
import AdminCheker from './pages/adminCheker/adminCheker';
import cereal from './services/cerealsServices/cereal.service';
import RecoverMenu from './components/recover_menu/recover_menu';

import { useSelector } from 'react-redux';

function App() {
   const [data, setProductsData] = useState([])
   const [cartData, setCartData] = useState([])
   const languageRed = useSelector((state) => state.language.value);

  
   const addtocart = (item) => {
      setTimeout(() => {
         let succes_menu = document.querySelector(".success_con_add")
         succes_menu.style.opacity = "100%"
         setTimeout(() => {
            succes_menu.style.opacity = "0"

         }, 2000);
      }, 300);

      if (cartData.some(e => e.id === item.id)) {
         setCartData(prevCartData => prevCartData.map(e =>
            e.id === item.id ? { ...e, quantity: (parseFloat(e.quantity) + parseFloat(item.quantity)).toString() } : e
         ));
      } else {
         setCartData(prevCartData => [...prevCartData, item]);
      }
   }

   const delete_from_cart = (id) => {
      let new_cart = cartData.filter(item => item.id !== id)
      setCartData(new_cart)
   }

   const await_cereals = async () => {
      const response = await cereal.getCereal()
      if (response) {
         return response.data.cereals
      } else {
         return []
      }

   }

   useEffect(() => {
      setProductsData(await_cereals())
   }, []);



   return (
      <div className="App">
         <Router basename="/">
            <Header />
            <Routes>
               <Route exact path='/' element={<Renavigator />} />
               <Route exact path='/authorization' element={<Authorization />} />
               <Route exact path='/main' element={<Main />} />
               <Route exact path='/products' element={<Products languageRed={languageRed} products_data={data} />} />
               <Route exact path="/products/:id" element={<ProductView delete_from_cart={delete_from_cart} cartData={cartData} addtocart={addtocart} data={data} />} />
               <Route exact path='/account' element={<Profile languageRed={languageRed}  />} />
               <Route exact path='/adminpanel' element={<Admin />} />
               <Route exact path='/admincheker' element={<AdminCheker />} />
               <Route exact path='/wrongUncough' element={<Sliser />} />
               <Route exact path='/recover/*' element={<RecoverMenu />} />



            </Routes>
            <Footer />
         </Router>
      </div>


   );
}

export default App;
