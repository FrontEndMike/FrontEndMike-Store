import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navigation'
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
    setCart((prevCart) => [...prevCart, product]);
    console.log(`${product.title} added to bag!`);
    console.log(cart);
  };

  return (
    <>
    <Navbar cart={cart} />
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
    </>
  )
}

export default App
