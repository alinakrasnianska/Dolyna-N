import React from 'react'
import './dist/products.css'
import ProductCard from '../../components/product_card/product_card'

export default class Products extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         products_data: []
      }
   }

   async componentDidMount() {
      if (this.state.products_data.length === 0) {
         this.setState({ products_data: await this.props.products_data }, () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });

         })
      }
   }
   async componentDidUpdate() {
      if (this.state.products_data.length === 0 && this.props.products_data.length !== 0) {
         this.setState({ products_data: await this.props.products_data }, () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
         })
      }
   }
   render() {
      return (
         <div className="products_con">
            <header className="products_title">
               {this.props.languageRed === "EN"?"Cereals":"Зерно"}
            </header>
            <main className="products_list">
               {this.state.products_data.length > 0 ?this.state.products_data.map((product, index) =>
                  <ProductCard key={index} index={index} product={product} />
               ):""}
            </main>
            <div className="product_margin"></div>
         </div>
      )
   }
}