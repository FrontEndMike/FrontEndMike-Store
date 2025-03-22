import React from "react";
import { useEffect } from "react";
import storeLogo from "../assets/store-logo.png";

const Navbar = ({ cart }) => {
      window.addEventListener('scroll', () => {
        const headerContent = document.getElementById('header-content');
            if (window.scrollY > 10) {
                headerContent.classList.add('scroll');
            } else {
                headerContent.classList.remove('scroll');
            }
        });

        return(
            <>
            <header id="site-header" className="shadow fixed top-0 left-0 w-full bg-white z-50 transition-transform duration-300 origin-top">
                <a href="#content" className="skip-link">Skip to Main Content</a>
                <div id="header-content" className="max-w-[1280px] mx-auto flex items-center justify-between transition-transform duration-300 transform">
                    <div>
                        <a href="/">
                            <img src={storeLogo} alt="" /> 
                        </a>
                    </div>
                    <div className="relative inline-block">
                        <button className="cursor-pointer">
                        <i className="fas fa-shopping-bag"></i>
                        {cart.length > 0 && (
                        <span id="cart-count"
                                className="absolute -bottom-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                            {cart.length}
                        </span>
                        )}
                        </button>
                    </div>
                </div>
            </header>

            <div className="h-18"></div>
        </>
    )
}

export default Navbar;