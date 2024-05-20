import React from 'react';
import './dist/main.css'
import Slider from '../../components/img_slider/slider';
import FactsAndFeatures from '../../components/facts_and_figures/faf';
import OurProducts from '../../components/our_products/our_products';
import SendForm from '../../components/send_form/send_form';


export default class Main extends React.Component {
   render() {
      return(
         <main className="main_component">
            <Slider />
            <FactsAndFeatures />
            <OurProducts />
            <SendForm />
         </main>
      )
   }
}