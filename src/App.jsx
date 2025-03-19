import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const excludedCategories = ["electronics", "string", "miscellaneous"];

  useEffect(() => {
    axios.get('https://fakestoreapi.in/api/products')
    .then(response => {
      setProducts(response.data.products);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
            <div key={product.id} className="hover:scale-102 transition-transform duration-300 ease-in-out isolate relative border-solid border-black border-1 p-1 rounded-lg relative mb-8">
                <img className="rounded" 
                  src={product.image} 
                  alt={product.name} 
                  onError={(e) => {
                    e.target.onerror = null; // Prevents infinite loop if fallback also fails
                    e.target.src = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
                  }}
                  />
              <h2 className="my-4 text-2xl">{product.title} - ${product.price}</h2>
              <p>{product.description}</p>
              <p className="">{product.category.name}</p>
            </div>
        ))}
      </div>
    </>
  )
}

export default App
