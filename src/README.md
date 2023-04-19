useReducer

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
CounterApp.js

- Importamos hook useReducer
  import React, { useReducer } from "react";
  otra opción:
  import { useReducer } from "react";
- Declaramos hook
  const [counter, dispatch] = useReducer(reducer, initialState);
  counter: estate
  dispatch: función disparadora de acciones para actualizar nuestro estado
  reducer: es una función pura. 
  initialState: estado inicial
  
  en caso de tener varios reducer utilizandoce en el mismo lugar podriamos definirlo 
  const [counter, counterDispatch] = useReducer(reducer, initialState);

  - reducer: Dijimos que es una funcion pura. 
  No va a interactuar con estados externos por lo que podemos crearla fuera del componente, incluso podemos crearla en un archivo externo.
  Va a recibír un estado y una accion, y va a retornar un nuevo estado de acuerdo a la congifuración que le asignemos para la acción recibida. 
  const reducer = (state, action) => {
		return newState
	}
  'state' va a ser el estado actual, cuando se actualice ese estado, state va a tomar ese nuevo valor.

- En el boton vamos a asignar un evento onClick al cual le vamos a pasar una función flecha (que se ejecute unicamente cuando se de click) nos va a retornar una función dispatch() para disparar la acción requerida.
Esta función va a recibir una 'action', y está acción va a ser un objeto 
{type: "", payload: ""}.
Vamos a definir el tipo de acción que queremos llamar dentro del reducer, ejemplo 'increment'.
Recordar que este objeto que estoy pasando como parametro de la función dispatch es una 'action', que es la se va a leer como segundo argumento de la función 'reducer', la estamos pasando diretamente como un objeto {type: '',payload: ''}.
  <h1>Clicks: {counter}</h1>
  <button onClick={() => dispatch({type:'increment'})}>Increment</button>
  <button onClick={() => dispatch({type: 'decrement'})}>Descrement</button>
  <button onClick={() => dispatch({type: 'reset'})}>Reset</button>
  
Luego debemos configurar la acción dentro de la función reductora:
	const reducer = (state, action) => {
		if(action.type === 'increment'){
			return state + 1; 
      // retorna estado previo + 1
		}
		if(action.type === 'decrement'){
			return state - 1;
      // retorna estado previo - 1
		}
		if(action.type === 'reset'){
			return initialState;
      // retorna estado inicial
		}
    return state;
    // retorna estado previo
	}

Valor por defecto: Tenemos que asignar un valor por defecto cuando la acción no coincida con ninguna de las acciones configuradas, ya que si no tenemos un valor por defecto definido el valos retornado va a ser 'undefined'.
Por este motivo es muy importante dejar como valor por defecto el estado previo para que en caso que se llame a una acción que no exista el estado no se modifique.

- SWITCH: para tener un código más ordenado, más limpio utilizaremos la sentencia switch en lugar de if:
	const reducer = (state, action) => {
		switch (action.type) {
			case 'increment': return state +1;
			case 'decrement': return state -1;
			case 'reset': return initialState; 
			default: return state;
		}
	}  

- TYPES: algo muy común cuando se trabaja con reducer es colocar los TYPES 'types' en una constante que va a ser un objeto con el nómbre de cada acción. Se crea con mayuscula como buena práctica (indica que es una constante que no va a cambiar su valor).
	const TYPES = {
		INCREMENT: 'INCREMENT',
		DECREMENT: 'DECREMENT',
		RESET: 'RESET'
	}

O si quisieramos simplificar más aún nuestro código podríamos definirla como:
	const TYPES = {
		INCREMENT,
		DECREMENT,
		RESET
	}

Ahora en en el dispatch llamariamos a la propiedad del objeto TYPES:
  <button onClick={() => dispatch({type: TYPES.INCREMENT})}>Increment</button>
  <button onClick={() => dispatch({type: TYPES.DECREMENT})}>Descrement</button>
  <button onClick={() => dispatch({type: TYPES.RESET})}>Reset</button>

Lo mismo para la función reducer:
	const reducer = (state, action) => {
		switch (action.type) {
			case TYPES.INCREMENT: return state +1;
			case TYPES.DECREMENT: return state -1;
			case TYPES.RESET: return initialState; 
			default: return state;
		}
	}

Motivo por el cual se define en un objeto las acciones:
  - Evitar errores de sintaxis, ortografía, etc.
  - Cuando tenemos varios reducers (por ejemplo un contador, y uno de usuarios)podemos utilizar los mismos 'types' para llamar a las acciones diretamente desde este objeto TYPES unico.

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
TodoApp.jsx
Definimos las funciones que queremos programar
  - DELETE: eliminar
  - UPDATE: crear
  - ADD: añadir

Realizamos la estructura inicial:
import React, { useReducer } from "react";

const TYPES = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

const initialTodos = [
  { id: 1, title: "Todo #1" },
  { id: 2, title: "Todo #2" },
];

const reducer = (state, action) => {
  switch(action.type) {
    default: return state;
  }
}

const TodoApp = () => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  
  return (
    <div>
      <h2>Todo App</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            Titulo
            <button onClick={() => dispatch({types: TYPES.DELETE})}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

------------------------------
FUNCION ELIMINAR: TYPES.DELETE
JS ofrece varias formas de eliminar un elemento de un arreglo, sin embargo alguna de ellas realizan mutaciones del estado y otras no lo hacen. ES MUY IMPORTANTE QUE NO REALICEMOS MUTACIONES DEL ESTADO, ES DECIR, NO LO MODIFIQUEMOS, Y QUE SIMPLEMENTE LAS FUNCIONES QUE UTILICEMOS RETORNES UN VALOR.
FUNCIONES COMO 
  - map
  - filter
  - find
  - reduce
SON MUY UTILES CUANDO TRABAJAMOS AQUI, EN GENERAL CUANDO TRABAJAMOS CON REACT.

En este caso vamos a eliminar mediante un 'filter' ne la funcion 'reducer':
  const reducer = (state, action) => {
    switch(action.type) {
      case TYPES.DELETE: return state.filter(todo => todo.id !== action.payload);
      default: return state;
    }
  }

Y en el evento vamos a definir como segunda propiedad del parametro action de la función 'dispacht' la propiedad 'payload': todo.id:
  <button onClick={() => dispatch({type: TYPES.DELETE, payload: todo.id})}>Eliminar {todo.id}</button>

------------------------------
FUNCION CREAR: TYPES.ADD
Vamos a crear un nuevo campo de texto, para ello vamos a crear un nuevo campo de estado, un useState(), ya que no hace falta utilizar un reducer en un estado tan sencillo:
  const [text, setTetxt] = useState('')
Importamos el estado, y creamos un campo de texto, dentro del input definimos value={text} y onChange={e => setText(e.target.value)}.
Además deberiamos controlar el 'submit', para ello deberiamos anidar el input dentro de un 'form' con el evento 'onSubmit' donde definimos la función 'handleSubmit:
  <form onSubmit={handleSubmit}>
    <input
      type='text'
      plaveholder='Todo'
      // Para enlazar este 'input' con el estado tenemos que hacer dos cosas, asignar un 'value' y controlar el 'onChange'
      value={text}
      onChange={e => setText(e.target.value)}
    />
  </form>

Función handlesubmit: disparamos una acción de tipo añadir (TYPES.ADD), y definimos el texto de la nueva tarea por medio de 'payload'= text 
  const handleSubmit = (e) => {
    e.preventDefault(); // Esta linea la colocamos para evitar que la pagina se recargue por defecto 
    dispatch({type: TYPES.ADD, payload: text})
  } 

En 'reducer' vamos a añadir un nuevo elemento, vamos a utilizar el operador spread y un nuevo elemento ([...objeto, {nuevoObjeto}]):
Vamos a setear este tipo de acción añadir, y lo que añadimos es el texto de la propiedad 'action.payload'.
  const reducer = (state, action) => {
    switch(action.type) {
      case TYPES.DELETE: return state.filter(todo => todo.id !== action.payload);
      case TYPES.ADD: return [...state, {id: 3, title: action.payload}]
      default: return state;
    }
  }

Lo siguiente que debemos hacer es darle dinamismo al id:
  id: Date.now()
Pero esto no lo debemos definir dentro de 'reducer' ya que debe mantenerse como una función pura y no debe utilizar ninguna función con conportamiento aleatorio como lo es Date.now(), por lo tanto lo que debemos hacer es definirlo en 'payload' donde en lugar de enviar el texto, enviaremos el objeto completo:

--------------------------------
FUNCION ACTUALIZAR: TYPES.UPDATE
- Creamos un boton similar a 'Eliminar' para actualizar.
Vamos a despachar la acción 'TYPES.UPDATE', y en payload vamos a necesitar envíar el 'id' y además el 'text' que debemos actualizas por lo que vamos a tener que definir dentro de payload el objeto 'todo' actualizando la propiedad 'title' con el nuevo texto ingresado 'onSubmit':
  <button onClick={() => dispatch({type: TYPES.UPDATE, payload: {...todo, title: text}})}>Actualizar</button>

- Una vez despachada la acción debemos configurar el 'reducer'.
Vamos a mapear 'state' (sería el objeto guardado en el estado 'todos'), y si validar si el id es estrictamente igual al id ingresado en el payload, en dicho caso vamos a devolver el nuevo objeto donde la propiedad 'title' sea el valor 'onSubmit' por el usuario:
  case TYPES.UPDATE: return state.map(todo => todo.id === action.payload.id ? action.payload : todo);

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
ProductApp.jsx
- Consideraciones:
  - Vamos a tratar al reducer como si tuvieramos varios reducer en nuestra aplicación.
  - Dentro del reducer vamos a tener varios parametros. Pero dichos parametros estarán relacionados.
  - Por lo general los reducers se hacen extensos por lo que es muy conveniente sacarlos en un archivo aparte, y también podriamos tener varios reducers entonces sería conveniente tambien crear una carpeta aparte para almacenarlos. Esto corresponde al tipo de arquitectura que quieras utilizar para organizar tu proyecto de acuerdo a la complejidad del mismo.
  En este caso vamos a crear una carpeta 'reducers' donde vamos a almacenar los reducers.

- Creamos el archivo 'productReducer.jsx' dentro de 'reducers'
  1 - Creamos funcion 'productReducer'
    const productReducer = (state, action) => {
    switch(action.types){
        default: return state;
      }
    } 

  2 - Creamos estado inicial 'initialProductState', este va a ser un objeto que va a tener varias propiedades: 
    1 - Lista de productos 
    2 - Información de carrito
    3 - Valor activo: para simular que estamos visualizando un articulo en una ventana modal 

    const initialProductState = {
      products: [
          {id: 1, title: 'Product #1'},
          {id: 2, title: 'Product #2'}
      ],
      carts: [
          {id: 1, title: 'Product #1', quantity: 1} // El title no se deberia colocar ya que al colocar el id podriamos buscar dentro del arregle los productos que tengan el id especifico    
      ],
      activeProducts: {id: 2, title: 'Product #2'} // Aqui simplemente se podria colocar el id 
    }
  Exportamos valor inicial para llamarlo dentro del hook.
    export { initialProductState };

- ProductApp.jsx:
  - Creamos estructura inicial.
  - Vamos a utilizar el reducer mediante el hook 'useReducers'
    - Importamos hook.
      import productReducer, { initialProductState } from "../reducers/productReducer"
    - Inicializamos el hook.
      const [productState, dispatch] = useReducer(productReducer, initialProductState)
    - Destructuramos estado:
      const { products, carts, activeProducts } = productState;
    - Completamos iterfaz (etiquetas jsx).
    - Iteramos sobre 'products', y 'carts' para renderizar las listas de los productos. Metodo map:
    |<h2>Products</h2>
      <ul>
        {products.map(product => {
          return(
            <li key={product.id}>
              {product.title}
              <button>Show</button>
              <button>Add to cart</button>
            </li>
          )
        })}
      </ul>

      <h2>Cart</h2>
      <ul>
        {carts.map(product => {
          return(
            <li key={product.id}>
              {product.title}
              <button>Remove from cart</button>
            </li>
          )
        })}
      </ul>
    - Finalmente, en 'Preview' colocamos {activeProducts.title}.
    
    *** Primera acción - 'action': PREVIEW
    Cuando demos click en 'Show', cambie el producto que estamos previsualizando. 
    - Vamos a comenzar creando los 'TYPES', podría crearse dentro del reducer, otra opción es colocarlos en un archivo general como en este ejemplo para que puedan ser utilizados por varios reducers en caso de que sean necesarios.
    Y debemos importarlo dentro de 'ProductApp.jsx' y 'productReducer.jsx'.
    - Definivos evento 'onClick' para boton 'Show', que dispara una acción 'dispatch', donde el tipo de acción será mostrar producto 'types.productShow', y 'payload' será el 'id' del producto: 'product.id', pero vamos a enviar el 'product' completo en este caso:
      <button onClick={() => dispatch({
        type: types.productShow,
        payload: product 
        })}>
        Show
      </button>  
    - En la función 'productReducer' vamos a setear un 'case' que reciba el tipo de acción 'types.productShow' para que retone el siguiente estado del objeto 'activeProduct':
      const productReducer = (state, action) => {
        switch (action.type) {
          case types.productShow:
            return {
              ...state, // Mediante el operador spead traemos el producto con todas sus propiedades
              activeProducts: action.payload // Y unicamente vamos a modificar la propiedad del objeto 'activeProduct'
              // Si en la función 'dispatch' hubieramos indicado 'product.id' deberiamos definir:
              // state.product.find(product => product.id === action.payload)
            };
          default:
            return state;
        }
      };
    - 

    *** Segunda acción: ADD TO CART 
    - Añadimos el tipo de acctión en la constante 'types' (recordar que el unico requisito es que no hayan types iguales, deben ser todos diferentes):
      productAddToCart: 'product - add to cart'
    - En 'ProductApp' configuramos 'button' 'Add to cart':
      <button onClick={() => dispatch({
        type: types.productAddToCart,
        payload: product
      })}>
        Add to cart
      </button>
    - En 'productReducer' vamos a setear el retorno cuando se reciba este tipo de acción:
      case types.productAddToCart:
        return {
          ...state,
          cart: [
            ...state.cart,
            action.payload
          ]
        }
    El problema con esta solución es que se estarían agregando más de una vez un producto con igual 'key', y lo que deberiamos hacer es que la cantidad de productos aumente si es que el producto ya se encuentra agregado al carrito:

    - Vamos a agregar la cantidad en el carrito:
      <li key={product.id}>
        {product.title} - Quantity: {product.quantity} 
        <button onClick={() => dispatch({
          type: types.productRemoveFromCart,
          payload: product.id
        })}>
          Remove from cart
        </button>
      </li>
    - En la función 'productReducer.jsx', en 'productAddToCart' debemos retornar dentro de la propiedad 'cart':
      case types.productAddToCart:
        return {
          ...state,
          cart: [
            ...state.cart,
            {...action.payload, quantity: 1}
          ]
        }
    - Ahora debemos aplicar la logica de que si el producto se encuentre agregado al carrito se debe sumar una unidad, y si no se encuentra agregado al carrito se deberá agregar.
    'productReducer.jsx':

      case types.productAddToCart: {
        const newProduct = action.payload;
        
        const cartContainProduct = state.cart.find(
          (product) => product.id === action.payload.id
        ); // Validación => el producto se encuentra en el carrito? 

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
    
    
      case types.productAddToCart: {
        const newProduct = action.payload;
        const cartContainProduct = state.cart.find(product => product.id === newProduct.id); // Validación => producto se encuentra en el carrito? si esta busqueda arroja un valor quiere decir que el producto ya estaba en el carrito por lo que debemos aumentar la cantidad, de lo contrario debemos agregar el producto 

        return cartContainProduct
        ? {
          ...state,
          cart: state.cart.map(product => 
            product.id === newProduct.id 
            ? {...product, quantity: product.quantity + 1} 
            : product)
        } 
        : {
          ...state,
          cart: [
            ...state.cart,
            {...action.payload, quantity: 1}
          ]
        }}


    *** Tercera acción: REMOVE ALL
    - Agregamos tipo de funcionalidad en 'types':
      productRemoveFromCart: 'product - remove from cart'
    - Seteamos boton 'Remove from cart':
      <button onClick={() => dispatch({
        type: types.productRemoveFromCart,
        payload: product.id
      })}>
        Remove from cart
      </button> 
    - Por ultimo configuramos función 'productReducer' para este tipo de acción:
      case types.productRemoveFromCart:
        return {
          ...state,
          cart: state.cart.filter(product => product.id != action.payload)
        }
    Hasta acá seguimos con un problema, y es que cuando removemos un elemento, se eliminan todos los elementos con ese mismo 'id', vamos a necesitar realizar algunas validaciones.

    *** Cuarta acción: REDUCE ONE PRODUCT
    - Definimos tipo de acción en archivo 'types.jsx'
      const types = {
        productShow: 'product - show',
        productAddToCart: 'product - add to cart',
        productRemoveOneFromCart: 'product - remove one from cart',
        productRemoveFromCart: 'product - remove from cart'
      }
      
    - Definimos el boton dentro del mapeado sobre el arreglo de objetos 'cart':
      <button onClick={() => dispatch({
        type: types.productRemoveOneFromCart,
        payload: product.id
      })}>
        Remove One
      </button>

    - Definimos case dentro de la función 'productReducer':
      case types.productRemoveOneFromCart:{
        
        const productDelete = state.cart.find(product => product.id === action.payload) // Obtenemos elemento 

        return productDelete.quantity > 1 // Validamos cantidad
        ? { // En caso de que cantidad sea mayor a 1 restamos 1
          ...state,
          cart: state.cart.map(product => product.id === action.payload
            ? {...product, quantity: product.quantity -1}
            : product
            )
        }
        : { // En caso de que la cantidad sea igual a 1 filtramos para eliminar produco
          ...state,
          cart: state.cart.filter(product => product.id !== action.payload)
        }
      }


--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
PARAMETRO INIT: TERCER ARGUMENTO QUE RECIBE EL USEREDUCER, PARAMETRO INIT, ES UNA FUNCION
- Es un mutador del estado inicial.
- Vamos a utilizar el ejemplo del 'Counter.jsx'
- Definimos el tercer argumento que recibe el useReducer como init (nombre por convención, pero puede ser cualquier nombre):
  const [counter, dispatch] = useReducer(reducer, initialState, init);
- Definimos funcion 'init':
	const init = (value) => {
		return value + 10;
	}
  Al recargar página tomara este valor como valor inicial.
- Definimos acción en funcion 'reducer':
	const reducer = (state, action) => {
		switch (action.type) {
			case TYPES.INCREMENT: return state +1;
			case TYPES.DECREMENT: return state -1;
			case TYPES.RESET: return init(initialState); 
			default: return state;
		}
	}

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
CONCEPTOS IMPORTANTES
  - FUNCION PURA: Son aquellas que operan utilizando solo los parámetros de entrada sin recurrir o afectar a ningún otro elemento fuera de ellas.
  Deben cumplir dos condiciones:
    1 - Dado unos parámetros de entrada de idéntico valor, la función siempre devolverá el mismo resultado.
    2 - El cómputo de la función, su lógica, no implica ingún efecto observable colateral fuera de ella. 
      - No debe alterar el DOM.
      - No debe realizar mutaciones en variables externas.
      - No debe agregar eventos-
    Debe operar sobre los parametros de entrada unicamente y devolver un resultado.
    
    Ejemplo:
    Función pura:
    function suma (a, b) {
      return a + b
    }
    suma(1,2) // 3
    suma(2,1) // 3
    ** cumple las dos condiciones 

    function one() {
      return 1
    }

    Funciónes que no son puras:
    function documentModify() {
      document.write("Hola");
    } // Modifica el DOM no cumple segunda condición y por lo tanto no es una función pura

    function randomSum(a,b) {
      return a+b+Math.random()
    } // Retorna un valor distinto aunque los parametros sean identicos, no cumple primer condicion y por lo tanto no es una función pura

    function addNumberToArray(arr, n){
      arr.push(n)
      return arr;
    }
    const numbers = [1,2,3];
    console.log(numbers); // [1,2,3]
    console.log(addNumberToArray(numbers)); // [1,2,3,4]
    console.log(numbers); // [1,2,3,4] => modifca el exterior y por lo tanto no es una funcion pura
    Esta función la podriamos transformar en una función pura con el spread operator:
    function addNumberToArray(arr, n){
      return [...arr, n];
    }
    const numbers = [1,2,3];
    console.log(numbers); // [1,2,3]
    console.log(addNumberToArray(numbers)); // [1,2,3,4]
    console.log(numbers); // [1,2,3]

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
REGLAS REDUCER PURO
- Retornará el mismo estado, si se dispara la misma acción, con el mismo payload.
- Los parámetros de entrada (state, action) no deben ser mutados (Alterados). Debes utilizar funciones que no modifiquen el valor original, como 'push' sino que retornen uno nuevo valor, como 'filter', 'find', 'map', 'reduce'.

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
¿CUANDO UTILIZAR USEREDUCER?
Cuando el estado es sencillo como un 'input' no tiene sentido construir un 'reducer', se utiliza el 'useState'.
Lo utilizamos cuando:
  - Se tiene una lógica compleja  que involucra subvalores, donde podamos tener todo centralizado, e incluso que los parametros que estén dentro del 'useReducer' puedan interactuar o yo pueda buscar información de un parámetro para poder modificar otro.
  - Cuando el próximo estado depende del anterior.
  - Cuando sobre un estado se realizan muchas acciones distintas para actualizarlo. 


