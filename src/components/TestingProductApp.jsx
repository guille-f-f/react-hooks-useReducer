import React, { useReducer } from "react";
import "../estilos/TestingProductApp.css";
import { useState } from "react";
import Data from "../data/Productos.json";
import { Card, Button, Modal, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const types = {
  show: "show",
  add: "add",
  remove: "remove",
  removeAll: "remove all",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.show:
      return {
        ...state,
        preview: action.payload,
      };

    case types.add:
      const validationOfCart = state.carts.find(
        (product) => product.id === action.payload.id
      );

      return validationOfCart
        ? {
            ...state,
            carts: state.carts.map((product) =>
              product.id === action.payload.id
                ? { ...product, quantity: product.quantity + 1 }
                : product
            ),
          }
        : {
            ...state,
            carts: [...state.carts, { ...action.payload, quantity: 1 }],
          };

    case types.remove:
      // Si hay más de una unidad disminuir una unidad, si hay una unidad eliminar el producto
      const validationOfQuantity = action.payload.quantity > 1;
      return validationOfQuantity
        ? {
            ...state,
            carts: state.carts.map((product) =>
              product.id === action.payload.id
                ? { ...product, quantity: product.quantity - 1 }
                : product
            ),
          }
        : {
            ...state,
            carts: state.carts.filter(
              (product) => product.id !== action.payload.id
            ),
          };

    case types.removeAll:
      return {
        ...state,
        carts: state.carts.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
const initialProductState = {
  products: Data,
  carts: [],
  preview: "",
};

const TestingProductApp = () => {
  const [productState, dispatch] = useReducer(reducer, initialProductState);
  const { products, carts, preview } = productState;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
  const [fullscreen, setFullscreen] = useState(true);
  const [showCart, setShowCart] = useState(false);

  function handleShowCart(breakpoint) {
    setFullscreen(breakpoint);
    setShowCart(true);
  }

  return (
    <div className="container text-center">
      <h1 className="title">Show Room</h1>
      <ul className="list-unstyled d-flex justify-content-between gap-3 flex-wrap">
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={product["imagen-1"]} />
                <Card.Body>
                  <Card.Title>{product.nombre}</Card.Title>
                  <Card.Text>{product.descripcion}</Card.Text>
                  <Button
                    variant="info"
                    onClick={() => {
                      return (
                        dispatch({ type: types.show, payload: product }),
                        handleShow()
                      );
                    }}
                  >
                    Ver
                  </Button>

                  <Button
                    className="ms-2"
                    variant="primary"
                    onClick={() =>
                      dispatch({ type: types.add, payload: product })
                    }
                  >
                    Agregar
                  </Button>
                </Card.Body>
              </Card>
            </li>
          );
        })}
      </ul>

      <Button className="cart-icon" onClick={() => handleShowCart(values[5])}>
        <FontAwesomeIcon icon={faCartShopping} />
        <h2 className="cart-price">2</h2>
      </Button>
      <Modal
        show={showCart}
        fullscreen={fullscreen}
        onHide={() => setShowCart(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-unstyled">
            {carts.map((product) => {
              return (
                <li key={product.id}>
                  {product.descripcion} - Unidades: {product.quantity}
                  <Button
                    variant="light"
                    className="ms-2"
                    onClick={() =>
                      dispatch({ type: types.remove, payload: product })
                    }
                  >
                    Remover una unidad
                  </Button>
                  <Button
                    variant="light"
                    className="ms-2"
                    onClick={() =>
                      dispatch({ type: types.removeAll, payload: product })
                    }
                  >
                    Remover todo
                  </Button>
                </li>
              );
            })}
          </ul>
        </Modal.Body>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {preview.nombre} {preview.marca}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            {preview.descripcion} - $ {preview.precio}
          </h5>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={preview["imagen-1"]}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={preview["imagen-2"]}
                alt="Second slide"
              />
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TestingProductApp;
