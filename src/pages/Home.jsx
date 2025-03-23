import React from "react";
import Hero from '../components/Hero'
import ProductRow from '../components/ProductRow'
import heroImage from "../assets/category-hero.png";

const HomePage = ({ products, addToCart }) => {
    const headline = "Fashion Boutique";
    const subheadline = "React Store";
    const introText = "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.";
    return(
        <>
        <Hero 
            heroImage={heroImage}
            subheadline={subheadline}
            headline={headline}
            introText={introText} 
            buttons
        />
        <div className="container max-w-[1280px] mx-auto my-8 px-8">
            <div id="content">
            <ProductRow 
                products={products.slice(0, 12)}
                addToCart={addToCart}
            />
            </div>
        </div>  
        </>
    )
}

export default HomePage;