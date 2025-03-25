import React from "react";
import { Link } from 'react-router-dom';

const ProductRow = ({ category, products, addToCart }) => {

    return(
      <div id={category} className="mb-4">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl capitalize  text-secondary">Shop Now</h2>
        </div>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
            <div key={product.id} className="product relative relative mb-8">
              <div className="isolate relative image-parent p-4 rounded-lg border-solid border-primary justify-center ">
                <Link className="text-center" to={`/product/${product.id}`}>
                  <img className="rounded mx-auto max-h-[250px] sm:max-w-[200px] sm:max-h-[170px]" 
                    src={product.image} 
                    alt={product.title} 
                    />
                </Link>
              </div>
              <div className="flex gap-1 my-4 sm:my-0 icon-parent flex-col">
                <button className="w-auto cursor-pointer mt-2 px-4 py-2 bg-primary text-white rounded hover:brightness-90 transition duration-300" onClick={() => addToCart(product)}><i className="fa-solid fa-plus"><span className="sr-only">Add To Cart</span></i></button>
                <Link to={`/product/${product.id}`}>
                  <button className="w-auto cursor-pointer mt-2 px-4 py-2 bg-tangerine text-black rounded hover:brightness-90 transition duration-300">
                    <i className="fa-solid fa-eye"><span className="sr-only">View Item</span>
                    </i></button>
                </Link>
              </div>
              <Link to={`/product/${product.id}`}>
                <h3 className="my-1 text-lg/5 text-secondary">{product.title}</h3>
              </Link>
              <p className="capitalize text-sm mb-1 ">{product.category}</p>
              {/* <p>{product.description}</p> */}
              <p>${product.price.toFixed(2)}</p>
              
            </div>
        ))}
        </div>
      </div>
    )
}

export default ProductRow;