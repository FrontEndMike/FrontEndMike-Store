import { createContext, useContext, useMemo } from 'react';
import useCart from '../hooks/useCart';

const CartStateContext = createContext();
const CartActionsContext = createContext();

export function CartProvider({ children }) {
  const { cart, totalItems, totalPrice, addToCart, removeFromCart } = useCart();

    const stateValue = useMemo(() => ({
    cart,
    totalItems,
    totalPrice
  }), [cart, totalItems, totalPrice]);

  const actionsValue = useMemo(() => ({
    addToCart,
    removeFromCart
  }), [addToCart, removeFromCart]);
  console.log('CartProvider rendered');

  return (
    <CartStateContext.Provider value={stateValue}>
      <CartActionsContext.Provider value={actionsValue}>
        {children}
      </CartActionsContext.Provider>
    </CartStateContext.Provider>
  );
}

export const useCartState = () => useContext(CartStateContext);
export const useCartActions = () => useContext(CartActionsContext);
