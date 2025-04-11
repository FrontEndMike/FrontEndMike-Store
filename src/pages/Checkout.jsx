import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/checkout-hero.webp";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import { useCartActions, useCartState } from "../context/useCartHook";

const CheckOut = () => {
  const { addToCart, removeFromCart } = useCartActions();
  const { cart, totalPrice } = useCartState();
  const headline = "Checkout";
  const subheadline = "React Store";
  const introText =
    "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.";
  if (!cart)
    return (
      <>
        <Loader />
      </>
    );
  return (
    <>
      <Hero
        heroImage={heroImage}
        subheadline={subheadline}
        headline={headline}
        introText={introText}
      />

      <div
        id=""
        className="checkout-container max-w-[600px] p-4 mx-auto my-12 "
      >
        <div className="mb-4 items-center text-white bg-black rounded-xl px-8 py-4">
          <h2 className="text-4xl text-center font-semibold">Checkout</h2>
        </div>

        {!cart.length && (
          <h3 className="text-center text-2xl my-8">Cart is currently empty</h3>
        )}

        {cart.map((product) => (
          <div key={product.id} className="px-8 bg-white ">
            <div className="grid items-center grid-cols-5 border-b py-4  border-primary">
              <div className="col-span-1 cart-preview">
                <Link to={`/product/${product.id}`}>
                  <img
                    className="mx-auto"
                    src={product.image}
                    alt={product.title}
                  />
                </Link>
              </div>
              <div key={product.id} className="col-span-4 relative">
                <p className="my-1 text-secondary text-md md:text-lg/5">
                  <Link to={`/product/${product.id}`}>{product.title}</Link>
                </p>
                <div className="mt-3 flex justify-between items-center pl-2">
                  <p className="text-md">
                    ${product.price.toFixed(2)}
                    {product.quantity > 1 && (
                      <span className="ml-1 text-sm text-gray-500">
                        x {product.quantity}
                      </span>
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
          </div>
        ))}
        {totalPrice > 0 && (
          <div className="my-6 bg-white rounded-b-xl">
            <div className="my-8">
              <p className="text-center">Total</p>
              <p className="text-4xl text-center font-semibold">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        )}
        {cart.length > 0 && (
          <div>
            <a
              href="#"
              className="flex items-center gap-2 justify-center text-xl mt-4 p-3 text-center button bg-black text-white rounded hover:brightness-90 transition duration-300"
            >
              Pay with{" "}
              <i className="fa-brands text-4xl fa-apple-pay">
                <span className="sr-only">Apple Pay</span>
              </i>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 justify-center text-xl mt-4 p-4 text-center button bg-[#0079C1] text-white rounded hover:brightness-90 transition duration-300"
            >
              Pay with <i className="fa-brands fa-cc-paypal"></i>
              <span className="sr-only">PayPal</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 justify-center text-xl mt-4 p-4 text-center button bg-primary text-white rounded hover:brightness-90 transition duration-300"
            >
              Pay with Credit/Debit <i className="fa-solid fa-credit-card"></i>
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckOut;
