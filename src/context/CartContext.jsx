import { createContext, useContext, useReducer } from "react";
import { sumProducts } from "../helpers/helpers";

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.selectedItems.find(item => item.id === action.payload.id);
      let newItems;
      if (!exists) {
        newItems = [...state.selectedItems, { ...action.payload, quantity: 1 }];
      } else {
        newItems = [...state.selectedItems];
      }
      return {
        ...state,
        selectedItems: newItems,
        ...sumProducts(newItems),
        checkout: false,
      };
    }

    case "REMOVE_ITEM": {
      const newItems = state.selectedItems.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        selectedItems: newItems,
        ...sumProducts(newItems),
      };
    }

    case "INCREASE": {
      const newItems = state.selectedItems.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        selectedItems: newItems,
        ...sumProducts(newItems),
      };
    }

    case "DECREASE": {
      const newItems = state.selectedItems.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return {
        ...state,
        selectedItems: newItems,
        ...sumProducts(newItems),
      };
    }

    case "CHECKOUT":
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: true,
      };

    default:
      throw new Error("Invalid Action!");
  }
};

const CartContext = createContext();

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  return [state, dispatch];
};

export default CartProvider;
export { useCart };
