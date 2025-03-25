import React from "react";
import axios from 'axios';
import Hero from '../components/Hero'
import heroImage from "../assets/home-hero.webp";
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductDetail = ({ products, addToCart }) => {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));
    const headline = "Fashion Boutique";
    const subheadline = "React Store";
    const introText = "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.";


  if (!product) return <>
    <Loader />
    <p className="text-center mb-12">No product found</p>
  </>;

  return (
    <>
        <Hero 
            heroImage={heroImage}
            subheadline={subheadline}
            headline={headline}
            introText={introText} 
        />
        <div className="container max-w-[1080px] mx-auto mt-20 mb-40 px-4">
        <div id="content">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="sm:col-span-1 text-center col-span-2 rounded-lg">
                    <a href={product.image} target="_blank">
                    <img className="max-h-[300px] rounded mx-auto" 
                        src={product.image} 
                        alt={product.title} 
                    />
                    </a>
                    <p className="mt-2 italic text-redish font-semibold">{product.rating.count} in stock!</p>
                </div>
                <div className="sm:col-span-2 col-span-3">
                    <h1 className="text-3xl">{product.title}</h1>
                    <p className="capitalize text-sm mt-2 ">{product.category}</p>
                    <p className="my-2">{product.description}</p>
                    <p className="text-2xl">${product.price.toFixed(2)}</p>
                    <button className="mt-4 cursor-pointer min-w-[10rem] p-4 text-center button bg-primary text-white rounded hover:brightness-90 transition duration-300" onClick={() => addToCart(product)}>Add To Cart</button>
                </div>
            </div>
    </div>
      </div>
    </>
  );
};

export default ProductDetail;