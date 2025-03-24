import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Navbar from './components/Navigation'
import SideCart from './components/SideCart'
import Footer from './components/Footer'
import Loader from './components/Loader'
import HomePage from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import CheckOut from './pages/Checkout'

import './App.css'

const CART_KEY = 'user-cart';

const fetchProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};


function App() {
  const { data: products, isLoading: loading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    cacheTime: 1000 * 60 * 60 * 24 * 7,
  });

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

    const addToCart = (product) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
      // console.log(`${product.title} added to cart`);
    };

      const removeFromCart = (product) => {
      setCart((prevCart) =>
        prevCart
          .map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)
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
          </Routes>
          <Footer />
      </BrowserRouter>
    

    </>
  )
}

export default App
