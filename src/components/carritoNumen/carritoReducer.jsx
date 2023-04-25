import { TYPES } from "./actions";

export const carritoInitialState = {
  productos: [
    {
      id: "001",
      nombre: "Pantalon",
      imagen: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/051ffa60c80a486f9e6eaf15008c0b4f_9366/Pantalon_TRAINICONS_Woven_3_Tiras_Verde_HS2367_21_model.jpg",
      precio: 21599,
    },
    {
      id: "002",
      nombre: "Campera",
      imagen: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ae2aa0208364e7aa111a805007f738b_9366/Campera_de_Plumas_VARILITE_Hooded_Negro_BQ1968_01_laydown.jpg",
      precio: 68999,
    },
    {
      id: "003",
      nombre: "Campera",
      imagen: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1e07fc7528f0462eb307ad11010ba5f3_9366/Rompevientos_Liviano_FARM_Rio_Print_Relaxed_Azul_GS6301_21_model.jpg",
      precio: 23399,
    },
    {
      id: "004",
      nombre: "Campera",
      imagen: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8bbb24b258384c678f17ae5300f40976_9366/Rompevientos_Half-Zip_Negro_HS2627_21_model.jpg",
      precio: 50999,
    },
    {
      id: "005",
      nombre: "Campera",
      imagen: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/17c77740a79542dca52cace700b2f335_9366/Rompevientos_Liviano_FARM_Rio_Print_Relaxed_Negro_GS6302_01_laydown.jpg",
      precio: 23399,
    },
    {
      id: "006",
      nombre: "Campera",
      imagen: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c27c7e9636f3435c8709af1c01179354_9366/Campera_Denim_Universitaria_Azul_HL9069_01_laydown.jpg",
      precio: 72999,
    }
  ],
  carrito: [],
};

export const carritoReducer = (state, action) => {
  switch(action.type){
    case TYPES.ADD_TO_CART: 
      let nuevoItem = state.productos.find(producto => producto.id === action.payload)
      let itemEnCarrito = state.carrito.find(item => item.id === action.payload)
      return itemEnCarrito 
      ? {
        ...state,
        carrito: state.carrito.map(item => item.id === nuevoItem.id ? {...item, cantidad: item.cantidad + 1} : item)
      }
      : {
        ...state,
        carrito: [
          ...state.carrito, {...nuevoItem, cantidad: 1}
        ]
      }
      
      return {
        ...state, carrito: [...state.carrito, nuevoItem]
      }
    
    case TYPES.REMOVE_ITEM: 
      let itemAEliminar = state.carrito.find(item => item.id === action.payload)
      return itemAEliminar.cantidad > 1 
      ? {
        ...state,
        carrito: state.carrito.map(item => item.id === itemAEliminar.id ? {...item, cantidad: item.cantidad - 1} : item)
      }
      : {
        ...state,
        carrito: state.carrito.filter(item => item.id !== itemAEliminar.id)
      }

    case TYPES.REMOVE_ALL_ITEM: 
      return {
        ...state,
        carrito: state.carrito.filter(item => item.id !== action.payload)
      }
    
    case TYPES.CLEAR_CART:
      return {
        ...state,
        carrito: []
      }

    default: return state;
  }
}