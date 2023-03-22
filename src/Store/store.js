import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cartReducer } from "../Routes/reducers/cartReducers";

const Store = createContext();

const AppProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [showCategories, setShowCategories] = useState(false);
  const [authenticated, setIsAuthenticated] = useState(false);
  const authFromStorage = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;
  let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const [state, dispatch] = useReducer(cartReducer, {
    cart: cart,
  });

  useEffect(() => {
    if (authFromStorage) {
      setAuth(authFromStorage);
    }
  }, []);
  return (
    <Store.Provider
      value={{
        state,
        dispatch,
        auth,
        setAuth,
        showCategories,
        setShowCategories,
        setIsAuthenticated,
        authenticated,
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default AppProvider;

export const AppState = () => {
  return useContext(Store);
};
