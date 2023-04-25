import React from 'react'
import { Button } from 'react-bootstrap'

const Item = (props) => {
  const {id, nombre, imagen, precio, cantidad} = props.data
  const removeItem = props.removeItem
  // const removeAllItem = props.removeAllItem

  return (
    <div className='d-flex align-items-baseline gap-3 m-2'>
      <h4>{nombre}</h4>
      <h5>$ {precio} x {cantidad}ud.</h5>
      <h5>$ {precio * cantidad}</h5>
      <Button variant='danger' onClick={() => removeItem(id, false)}>Eliminar uno</Button>
      {/* <Button variant='danger' onClick={() => removeAllItem(id)}>Eliminar todos</Button> */}
      <Button variant='danger' onClick={() => removeItem(id, true)}>Eliminar todos</Button>

    </div>
  )
}

export default Item