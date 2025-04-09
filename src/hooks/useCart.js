import { useState, useEffect, useCallback } from 'react';

const CART_KEY = 'user-cart';

// Initialize cart state from local storage for persistence across page reloads
export default function useCart(){
    const [cart, setCart] = useState(() => {
      const saved = localStorage.getItem(CART_KEY);
      try {
        return saved ? JSON.parse(saved) : [];
      } catch {
        localStorage.removeItem(CART_KEY);
        return [];
      }
    });
  
    // Sync cart state to localStorage whenever it changes
    useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

    // Add product to cart or increase quantity if it already exists
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

        // If product wasn't found in cart, add it
        const isInCart = prevCart.some((item) => item.id === product.id);
        if (!isInCart) {
          updatedCart.push({ ...product, quantity: 1 });
        }

        return updatedCart;
      });
      // console.log(`${product.title} added to cart`);
    });

      // Decrease quantity of product or remove it from cart if quantity is 0
      const removeFromCart = useCallback((product) => {
        setCart((prevCart) =>
          prevCart.reduce((acc, item) => {
            if (item.id === product.id) {
              const updatedQuantity = item.quantity - 1;
              if (updatedQuantity > 0) {
                acc.push({ ...item, quantity: updatedQuantity });
              }
              // Don't add it at all if quantity would be 0
            } else {
              acc.push(item);
            }
            return acc;
          }, [])
        );
        // console.log(`${product.title} removed from cart`);
      }, []);


  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { cart, addToCart, removeFromCart, totalItems, totalPrice };
}