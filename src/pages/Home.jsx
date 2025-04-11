import React, { useMemo } from "react";
import Hero from "../components/Hero";
import SingleProduct from "../components/SingleProduct";
import heroImage from "../assets/category-hero.webp";

const HomePage = ({ products }) => {
  const headline = "Fashion Boutique";
  const subheadline = "React Store";
  const introText =
    "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.";

  const productList = useMemo(() => {
    console.log("⚡️ productList rebuilt");
    return products.map((product) => (
      <SingleProduct key={product.id} product={product} />
    ));
  }, [products]);

  return (
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
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl capitalize text-secondary">Shop Now</h2>
            </div>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {productList}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
