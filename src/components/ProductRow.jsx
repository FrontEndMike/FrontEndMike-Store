import React from "react";


const ProductRow = ({ category, products, addToCart }) => {

    return(
      <div id="{category}" className="container px-4 mb-4">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl capitalize  text-secondary">{category}</h2>
            <a className="right-caret group" href="">View All <i className="transition-transform duration-300 group-hover:translate-x-1  fa-solid fa-chevron-right"></i></a>
        </div>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
            <div key={product.id} className="product relative relative mb-8">
              <div className="image-parent mb-4 p-8 rounded-lg border-solid border-primary  p-1 ">
                <img className="rounded mx-auto" 
                  src={product.image} 
                  alt={product.name} 
                  />
              </div>
              <div className="flex gap-1 icon-parent flex-col">
                <button className="w-auto cursor-pointer mt-2 px-4 py-2 bg-primary text-white rounded hover:brightness-90 transition duration-300" onClick={() => addToCart(product)}><i className="fa-solid fa-plus"></i></button>
                <button className="w-auto cursor-pointer mt-2 px-4 py-2 bg-tangerine text-white rounded hover:brightness-90 transition duration-300"><i className="fa-solid fa-eye"></i></button>
              </div>
              <h3 className="my-1 text-lg/5 text-secondary">{product.title}</h3>
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