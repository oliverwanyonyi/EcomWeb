export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemExists = state.cart.find(
        (item) => item.id === action.payload.item.id
      );
      let cart = itemExists
        ? state.cart.map((item) =>
            item.id === action.payload.item.id ? action.payload.item : item
          )
        : [...state.cart, action.payload.item];
      localStorage.setItem("cart", JSON.stringify(cart));
      return { cart: [...cart] };
    case "REMOVE_FROM_CART":
      const newCart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newCart));

      return { cart: newCart };
    default:
      return state;
  }
};
