import React from "react";
import SingleProduct from "./SingleProduct";

const ProductRow = ({ products }) => {
    return(
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl capitalize  text-secondary">Shop Now</h2>
        </div>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <SingleProduct key={product.id} product={product}/>
        ))}
        </div>
      </div>
    )
}

export default React.memo(ProductRow);