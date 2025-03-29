import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navigation'
import SideCart from './components/SideCart'
import Footer from './components/Footer'
import Loader from './components/Loader'
import HomePage from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import CheckOut from './pages/Checkout'
import NotFound from './pages/NotFound'

import './App.css'

const CART_KEY = 'user-cart';

const fetchProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


function App() {
  //Products fetched ae considered fresh for a week before refetching
  const { data: products, isLoading: loading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    cacheTime: 1000 * 60 * 60 * 24 * 7,  // Cached for a week even if no components are using
  });

  // Initialize cart state from local storage for persistence across page reloads
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
    const addToCart = (product) => {
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
    };

      // Decrease quantity of product or remove it from cart if quantity is 0
      const removeFromCart = (product) => {
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
      };


  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  if (loading) return <Loader />;
  if (error) return <p>Error loading products.</p>;

  return (
    <>
        <BrowserRouter>
          <ScrollToTop /> 
          <Navbar totalItems={totalItems} />
          <SideCart 
            cart={cart} 
            totalItems={totalItems} 
            addToCart={addToCart} 
            totalPrice={totalPrice}
            removeFromCart={removeFromCart} 
          />
          <Routes>
            <Route path="/" element={<HomePage products={products} addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
            <Route path="/checkout" 
              element={<CheckOut 
                cart={cart} 
                totalItems={totalItems} 
                addToCart={addToCart} 
                totalPrice={totalPrice}
                removeFromCart={removeFromCart} 
              />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    

    </>
  )
}

export default App
