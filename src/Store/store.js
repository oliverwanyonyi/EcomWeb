import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../Routes/reducers/cartReducers";

const Store = createContext();

const AppProvider = ({ children }) => {
  let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const [state, dispatch] = useReducer(cartReducer, {
    cart: cart,
  });

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export default AppProvider;

export const AppState = () => {
  return useContext(Store);
};
