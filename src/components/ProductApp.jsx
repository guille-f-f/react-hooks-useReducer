import React, { useReducer } from "react"
import productReducer, { initialProductState } from "../reducers/productReducer"
import types from "./types";

const ProductApp = () => {
  const [productState, dispatch] = useReducer(productReducer, initialProductState)
  const { products, cart, activeProducts } = productState; // Desestructuramos el estado para extraer propiedad como variables individuales.
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => {
          return(
            <li key={product.id}>
              {product.title}
              <button onClick={() => dispatch({
                type: types.productShow,
                payload: product
              })}>
                Show
              </button>
              <button onClick={() => dispatch({
                type: types.productAddToCart,
                payload: product
              })}>
                Add to cart
              </button>
            </li>
          )
        })}
      </ul>

      <h2>Cart</h2>
      <ul>
        {cart.map(product => {
          return(
            <li key={product.id}>
              {product.title} - Quantity: {product.quantity} 
              
              <button onClick={() => dispatch({
                type: types.productRemoveOneFromCart,
                payload: product.id
              })}>
                Remove One
              </button>
              
              <button onClick={() => dispatch({
                type: types.productRemoveFromCart,
                payload: product.id
              })}>
                Remove All
              </button>
              
            </li>
          )
        })}
      </ul>

      <h2>Preview</h2>
      <p>{activeProducts.title}</p>
    </div>
  );
};

export default ProductApp;
