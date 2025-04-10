import { useState, useEffect, useCallback, useMemo } from 'react';

const CART_KEY = 'user-cart';

export default function useCart() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(CART_KEY);
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      localStorage.removeItem(CART_KEY);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.reduce((acc, item) => {
        if (item.id === product.id) {
          acc.push({ ...item, quantity: item.quantity + 1 });
        } else {
          acc.push(item);
        }
        return acc;
      }, []);

      if (!prevCart.some(item => item.id === product.id)) {
        updatedCart.push({ ...product, quantity: 1 });
      }

      return updatedCart;
    });
  }, []);

  const removeFromCart = useCallback((product) => {
    setCart((prevCart) =>
      prevCart.reduce((acc, item) => {
        if (item.id === product.id) {
          const updatedQuantity = item.quantity - 1;
          if (updatedQuantity > 0) {
            acc.push({ ...item, quantity: updatedQuantity });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  }, []);

  const totalItems = useMemo(() =>
    cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(() =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  // ✅ MEMOIZE THE RETURN OBJECT
  return useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    totalItems,
    totalPrice,
  }), [cart, addToCart, removeFromCart, totalItems, totalPrice]);
}
