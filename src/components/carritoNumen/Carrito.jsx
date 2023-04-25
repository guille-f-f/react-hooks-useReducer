import React from "react";
import { Button } from "react-bootstrap";
import Producto from "./Producto";
import Item from "./Item";
import { useReducer } from "react";
import { carritoReducer, carritoInitialState } from './carritoReducer'
import { TYPES } from "./actions";

const Carrito = () => {

  const [state, dispatch] = useReducer(carritoReducer, carritoInitialState)
  
  const { productos, carrito } = state

  const addToCart = (id) => {dispatch({type: TYPES.ADD_TO_CART, payload: id})}
  const removeItem = (id, removeAll) => {
    return removeAll  
    ? dispatch({type: TYPES.REMOVE_ALL_ITEM, payload: id})
    : dispatch({type: TYPES.REMOVE_ITEM, payload: id})
  }
  const removeAllItem = (id) => {dispatch({type: TYPES.REMOVE_ALL_ITEM, payload: id})}
  const clearCart = () => {dispatch({type: TYPES.CLEAR_CART})}

  return (
    <div>
      <h1>Carrito</h1>
      <h2>Productos</h2>
      {/* Mapear productos */}
      <div className="d-flex gap-2">{productos.map(producto => <Producto key={producto.id} data={producto} addToCart={addToCart} />)}</div>
      
      <h2>Carrito</h2>
      {/* Mapear carrito */}
      {carrito.map(item => <Item key={item.id} data={item} removeItem={removeItem} removeAllItem={removeAllItem} />)}
      
      <Button variant="warning" onClick={() => clearCart()}>Limpiar carrito</Button>
    </div>
  );
};

export default Carrito;
