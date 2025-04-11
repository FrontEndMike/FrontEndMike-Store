import React from 'react';
import { Link } from 'react-router-dom';
import { useCartActions, useCartState } from '../context/useCartHook';

const SideCart = () => {
  const { addToCart, removeFromCart } = useCartActions();
  const { cart, totalPrice, totalItems, isCartActive, toggleCart } = useCartState();

  const slideOut = () => {
    const cartModal = document.getElementById('sidecart');
    cartModal.classList.add('slide-out', 'right-0');
    cartModal.classList.remove('slide-in', 'right-4');
    toggleCart();
  };

  if (!isCartActive) return null;

  return (
    <div
      id="sidecart"
      className={`transition-all duration-500 ease-in-out fixed top-24 z-50 w-[90%] md:w-1/2 max-h-[80%] overflow-y-scroll rounded-2xl p-4 bg-white shadow-2xl md:max-w-md
        ${isCartActive ? 'translate-x-0 right-4' : 'translate-x-full right-0'}
      `}
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl text-secondary font-semibold">Bag ({totalItems} items)</p>
        <button
          onClick={() => slideOut()}
          className="text-xl cursor-pointer text-black px-2 py-1 transition-transform duration-300 hover:translate-x-1"
        >
          <i className="fa-solid fa-arrow-right">
            <span className="sr-only">Hide Cart</span>
          </i>
        </button>
      </div>
      {cart.map((product) => (
        <div key={product.id} className="grid grid-cols-5">
          <div className="col-span-1 cart-preview">
            <Link to={`/product/${product.id}`}>
              <img className="mx-auto" src={product.image} alt={product.title} />
            </Link>
          </div>
          <div key={product.id} className="col-span-4 relative mb-8">
            <p className="my-1 text-secondary text-md md:text-lg/5">
              <Link to={`/product/${product.id}`}>{product.title}</Link>
            </p>
            <div className="mt-3 flex justify-between items-center pl-2">
              <p className="text-md">
                ${product.price.toFixed(2)}
                {product.quantity > 1 && (
                  <span className="ml-1 text-sm text-gray-500">x {product.quantity}</span>
                )}
              </p>
              <div className="additional-items flex gap-2 ">
                <button
                  onClick={() => addToCart(product)}
                  className="text-sm cursor-pointer bg-black text-white px-2 py-1"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
                <button
                  onClick={() => removeFromCart(product)}
                  className="text-sm cursor-pointer bg-black text-white px-2 py-1"
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {totalPrice > 0 && <p className="my-1 font-semibold">Total : ${totalPrice.toFixed(2)}</p>}
      <Link
        to="/checkout/"
        onClick={() => slideOut()}
        className="mt-4 block p-4 text-center button bg-primary text-white rounded hover:brightness-90 transition duration-300"
      >
        Checkout
      </Link>
    </div>
  );
};

export default SideCart;
