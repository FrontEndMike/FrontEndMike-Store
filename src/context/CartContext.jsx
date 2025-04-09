import { createContext, useContext } from 'react';
import useCart from '../hooks/useCart';

const CartStateContext = createContext();
const CartActionsContext = createContext();

export function CartProvider({ children }) {
  const { cart, totalItems, totalPrice, addToCart, removeFromCart } = useCart();

  return (
    <CartStateContext.Provider value={{ cart, totalItems, totalPrice }}>
      <CartActionsContext.Provider value={{ addToCart, removeFromCart }}>
        {children}
      </CartActionsContext.Provider>
    </CartStateContext.Provider>
  );
}

export const useCartState = () => useContext(CartStateContext);
export const useCartActions = () => useContext(CartActionsContext);
