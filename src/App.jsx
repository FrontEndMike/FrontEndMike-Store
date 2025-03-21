import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navigation'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const excludedCategories = ["electronics", "string", "miscellaneous"];

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
      <div id="content" className="px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <>
            <div key={product.id} className="product relative relative mb-8">
              <div className="image-parent mb-4 p-8 border-solid border-gray-400 border-1 p-1 ">
                <img className="rounded mx-auto" 
                  src={product.image} 
                  alt={product.name} 
                  />
              </div>
              <div className="flex gap-1 icon-parent flex-col">
                <button className="w-auto cursor-pointer mt-2 px-4 py-2 bg-primary text-white rounded hover:brightness-90 transition duration-300" onClick={() => addToCart(product)}><i className="fa-solid fa-plus"></i></button>
                <button className="w-auto cursor-pointer mt-2 px-4 py-2 bg-tangerine text-white rounded hover:brightness-90 transition duration-300"><i className="fa-solid fa-eye"></i></button>
              </div>
              <p className="capitalize text-sm">{product.category}</p>
              <h3 className="my-1 text-lg/5">{product.title}</h3>
              {/* <p>{product.description}</p> */}
              <p>${product.price}</p>
              
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default App
