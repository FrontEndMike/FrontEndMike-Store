import { useContext } from 'react';
import { CartStateContext, CartActionsContext } from './CartContext';

export const useCartState = () => useContext(CartStateContext);
export const useCartActions = () => useContext(CartActionsContext);
