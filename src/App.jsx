import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navigation";
import SideCart from "./components/SideCart";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import HomePage from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CheckOut from "./pages/Checkout";
import NotFound from "./pages/NotFound";

import "./App.css";

const fetchProducts = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  //Products fetched is considered fresh for a week before refetching
  const {
    data: products,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    cacheTime: 1000 * 60 * 60 * 24 * 7, // Cached for a week even if no components are using
  });

  if (loading) return <Loader />;
  if (error) return <p>Error loading products.</p>;

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <SideCart />
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route
            path="/product/:id"
            element={<ProductDetail products={products} />}
          />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
