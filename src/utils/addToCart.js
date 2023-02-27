
export const addToCart = (product,state,dispatch) =>{
   
    let cartItem = {
        title: product.name,
        thumb: product.Product_Images[0].url,
        id: product.id,
        price: product.price,
      };
      const itemExists = state.cart.find((item) => item.id === product.id);
  
      if (itemExists) {
        console.log(itemExists.quantity);
        cartItem = { ...itemExists, quantity: itemExists.quantity + 1 };
      } else {
        cartItem = { ...cartItem, quantity: 1 };
      }
  
      dispatch({ type: "ADD_TO_CART", payload: { item: cartItem } });
}