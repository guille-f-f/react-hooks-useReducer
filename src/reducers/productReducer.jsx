import types from "../components/types";

const initialProductState = {
  products: [
    { id: 1, title: "Product #1" },
    { id: 2, title: "Product #2" },
  ],
  cart: [
    { id: 1, title: "Product #1", quantity: 1 }, // El title no se deberia colocar ya que al colocar el id podriamos buscar dentro del arregle los productos que tengan el id especifico
  ],
  activeProducts: { id: 2, title: "Product #2" }, // Aqui simplemente se podria colocar el id
};

const productReducer = (state, action) => {
  switch (action.type) {

    case types.productShow:
      return {
        ...state, // Mediante el operador spead traemos el producto con todas sus propiedades
        activeProducts: action.payload, // Y unicamente vamos a modificar la propiedad del objeto 'activeProduct'
        // Si en la función 'dispatch' hubieramos indicado 'product.id' deberiamos definir:
        // state.product.find(product => product.id === action.payload)
      };

    case types.productAddToCart: {
      const newProduct = action.payload;
      const cartContainProduct = state.cart.find(
        (product) => product.id === action.payload.id
      );
      return cartContainProduct
        ? {
            ...state,
            cart: state.cart.map((product) =>
              product.id === newProduct.id
                ? { ...product, quantity: product.quantity + 1 }
                : product
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...action.payload, quantity: 1 }],
          };
    }

    case types.productRemoveOneFromCart:{

      const productDelete = state.cart.find(product => product.id === action.payload)

      return productDelete.quantity > 1
      ? {
        ...state,
        cart: state.cart.map(product => product.id === action.payload
          ? {...product, quantity: product.quantity -1}
          : product
          )
      }
      : {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload)
      }
    }

    case types.productRemoveFromCart:
      return {
        ...state,
        cart: state.cart.filter((product) => product.id != action.payload),
      };
    default:
      return state;
  }
};

export { initialProductState };
export default productReducer;
