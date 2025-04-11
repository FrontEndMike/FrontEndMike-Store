import React from "react";
import heroImage from "../assets/category-hero.webp";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const CheckOut = () => {
  const headline = "404 Error";

  return (
    <>
      <Hero heroImage={heroImage} headline={headline} />
      <Loader />

      <div id="" className="text-center max-w-[600px] p-4 mx-auto my-12 ">
        <h2>
          You may have gotten a little lost. Try returning home
          <Link to="/">
            <i className="ml-1 text-4xl text-secondary fa-solid fa-shop">
              <span className="sr-only">Home</span>
            </i>
          </Link>
        </h2>
      </div>
    </>
  );
};

export default CheckOut;
