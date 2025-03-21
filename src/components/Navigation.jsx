import React from "react";
import { useEffect } from "react";
import storeLogo from "../assets/store-logo.png";

const Navbar = ({ cart }) => {
      useEffect(() => {
            const handleScroll = () => {
            const header = document.querySelector("header");
            if (window.scrollY > 50) {
                header.classList.add("py-2", "small-header");
                header.classList.remove("p-4", "full-header");
            } else {
                header.classList.add("p-4", "full-header");
                header.classList.remove("py-2", "small-header");
            }
            };

            window.addEventListener("scroll", handleScroll);

            return () => {
            window.removeEventListener("scroll", handleScroll);
            };
        }, []);

    return(
        <>
        <header className="main-header full-header p-2">
            <a href="#content" className="skip-link">Skip to Main Content</a>
                <div className="mx-auto container">
                    <div className="lg:flex md:flex md:justify-between lg:justify-between md:items-center lg:items-center ">
                        <div className="flex justify-between items-center">    
                            <img src={storeLogo} alt="" />                        
                        </div>
                        <div className="flex items-center">
                        <div className="cart relative">
                            <span className="absolute inset-0 flex font-bold items-center justify-center text-white text-sm">
                                {cart.length}
                            </span>
                        </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="h-18"></div>
        </>
    )
}

export default Navbar;