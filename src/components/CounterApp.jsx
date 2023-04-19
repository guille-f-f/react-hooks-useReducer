import React, { useReducer } from "react";

	const initialState = 0;

	const init = (value) => {
		return value + 10;
	}
	
	const TYPES = {
		INCREMENT: 'INCREMENT',
		DECREMENT: 'DECREMENT',
		RESET: 'RESET'
	}

	const reducer = (state, action) => {
		switch (action.type) {
			case TYPES.INCREMENT: return state +1;
			case TYPES.DECREMENT: return state -1;
			case TYPES.RESET: return init(initialState); 
			default: return state;
		}
	}

const CounterApp = () => {
	
  const [counter, dispatch] = useReducer(reducer, initialState, init);

  return (
    <div>
      <h1>Clicks: {counter}</h1>
      <button onClick={() => dispatch({type: TYPES.INCREMENT})}>Increment</button>
      <button onClick={() => dispatch({type: TYPES.DECREMENT})}>Descrement</button>
      <button onClick={() => dispatch({type: TYPES.RESET})}>Reset</button>
    </div>
  );
};

export default CounterApp;
