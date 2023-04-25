import React from 'react'
import { Button } from 'react-bootstrap'

const Producto = (props) => {

  const {id, nombre, precio, imagen} = props.data
  const addToCart = props.addToCart

  return (
    <div>
      <h4>{nombre}</h4>
      <img src={imagen} alt="Imagen" className='w-100' />
      <h5>$ {precio}</h5>
      <Button variant='success' onClick={() => addToCart(id)}>Agregar</Button>
    </div>
  )
}

export default Producto;