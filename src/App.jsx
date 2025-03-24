import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navigation'
import SideCart from './components/SideCart'
import Footer from './components/Footer'
import Loader from './components/Loader'
import HomePage from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import CheckOut from './pages/Checkout'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const cached = localStorage.getItem('cached-products');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cached) {
      try{
        setProducts(JSON.parse(cached));
      } catch(err){
        console.error('Invalid JSON:', err);
        localStorage.removeItem('cached-products');
      }
      setLoading(false);
    } else {
      axios.get('https://fakestoreapi.com/products')
      .then(response => {
        const data = response.data
        localStorage.setItem('cached-products', JSON.stringify(data));
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('API Error:', error);
        setLoading(false);
      });
    }
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      //Check if the id of the product already exists in the array
      if (existingItem) {
        return prevCart.map((item) =>  // If it exists loop through the current array
          item.id === product.id //If id match
            ? { ...item, quantity: item.quantity + 1 }  //Create a copy of that item with the quantity property increased by 1
            : item //Else return item unchanged
        );
      } else {
        // If it doesnt exist, add the product to the cart with the quantity property of 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    console.log(`${product.title} added to cart`);
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      return prevCart
        .map(item =>
          item.id === product.id //Find the item in the with the id that matches the current product
            ? { ...item, quantity: item.quantity - 1 } //Create a copy of that array with the quantity reduced by 1
            : item
        )
        .filter(item => item.quantity > 0); // Remove completely if 0
    });
        console.log(`${product.title} removed from cart`);
  };

const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  if (loading) return <>
    <Loader />
  </>;
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
            <Route path="/checkout" element={<CheckOut 
              cart={cart} 
              totalItems={totalItems} 
              addToCart={addToCart} 
              totalPrice={totalPrice}
              removeFromCart={removeFromCart} 
            />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    

    </>
  )
}

export default App
