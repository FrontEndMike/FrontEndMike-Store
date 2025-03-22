import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navigation'
import Hero from './components/Hero'
import SideCart from './components/SideCart'
import ProductRow from './components/ProductRow'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
    .then(response => {
      setProducts(response.data);
    })
    .catch(error => {
      console.error(error);
    });
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



  return (
    <>
    <Navbar totalItems={totalItems} />
    <Hero />
    <SideCart 
      cart={cart} 
      totalItems={totalItems} 
      addToCart={addToCart} 
      totalPrice={totalPrice}
      removeFromCart={removeFromCart} 
    />
    <div className="container max-w-[1280px] mx-auto my-8">
    <div id="content">
      <ProductRow 
        category="men's clothing"
        products={products.filter(p => p.category === "men's clothing").slice(0, 4)}
        addToCart={addToCart}
      />
      <ProductRow 
        category="womens's clothing"
        products={products.filter(p => p.category === "women's clothing").slice(0, 4)}
        addToCart={addToCart}
      />
      <ProductRow 
        category="electronics"
        products={products.filter(p => p.category === "electronics").slice(0, 4)}
        addToCart={addToCart}
      />
    </div>
    </div>
    </>
  )
}

export default App
