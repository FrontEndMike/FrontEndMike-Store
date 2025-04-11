import React, { useMemo, useState } from "react";
import { CartStateContext, CartActionsContext } from "./CartContext";
import useCart from "../hooks/useCart"; // or wherever your logic is

const CartProvider = ({ children }) => {
  const { cart, totalItems, totalPrice, addToCart, removeFromCart } = useCart();

  const [isCartActive, setIsCartActive] = useState(false);
  const toggleCart = () => setIsCartActive((prev) => !prev);

  const stateValue = useMemo(
    () => ({
      cart,
      totalItems,
      totalPrice,
      isCartActive,
      toggleCart,
    }),
    [cart, totalItems, totalPrice, isCartActive],
  );

  const actionsValue = useMemo(
    () => ({
      addToCart,
      removeFromCart,
    }),
    [addToCart, removeFromCart],
  );

  return (
    <CartStateContext.Provider value={stateValue}>
      <CartActionsContext.Provider value={actionsValue}>
        {children}
      </CartActionsContext.Provider>
    </CartStateContext.Provider>
  );
};

export default CartProvider;
